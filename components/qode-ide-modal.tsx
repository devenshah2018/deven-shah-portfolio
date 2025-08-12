"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Play,
  RotateCcw,
  Copy,
  ExternalLink,
  Maximize2,
  Minimize2,
  Loader2,
  Code,
  Save,
  FileText,
  Terminal,
  Upload,
  ChevronRight,
  ChevronDown,
  Activity,
  Cpu,
  Database,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

declare global {
  interface Window {
    QodeModule: any;
    QodeInterpreter: any;
    createQodeInterpreter: any;
    executeQode: any;
    executeQodeCode: any;
    qodeInterpreterReady: boolean;
    qodeOutput: string;
    qodeErrors: string;
  }
}

interface QodeIdeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const qodeExamples = {
  basic: `#> $Basic_Qubit_Operations_Demo

#> $Applying_Pauli_X_Gate
!X q1
#> $Checking_State_After_X
!I q1

#> $Applying_Hadamard_Gate
!H q1
#> $Checking_Superposition_State
!I q1

#> $Basic_Example_Complete
TERM`,

  superposition: `#> $Superposition_And_Phase_Demo

#> $Creating_Superposition_States
!H q1
!H q2

#> $Applying_Phase_Operations
!S q1
!Z q2

#> $Final_State_Analysis
!I q1
!I q2

#> $Superposition_Demo_Complete
TERM`,

  advanced: `#> $Advanced_Multi_Qubit_Circuit

#> $Sequential_Gate_Operations_Q1
!X q1 !H q1 !Y q1
#> $Sequential_Gate_Operations_Q2
!H q2 !S q2
#> $Sequential_Gate_Operations_Q3
!Z q3 !H q3

#> $State_Analysis_Phase
!I q1
!I q2
!I q3

#> $Multi_Qubit_Circuit_Complete
#> $Three_Qubits_Processed
TERM`,

  compact: `#> $Compact_Syntax_Demo
!X q1 !H q1 !I q1 !Y q2 !I q2 #> $Compact_Demo_Complete TERM`,
};

export function QodeIdeModal({ open, onOpenChange }: QodeIdeModalProps) {
  const [code, setCode] = useState(qodeExamples.basic);
  const [output, setOutput] = useState<string>(
    "QODE QUANTUM DEVELOPMENT ENVIRONMENT\n" +
      "=====================================\n\n" +
      "System Status: Ready\n" +
      "Interpreter: Initializing...\n" +
      "Memory: Available\n\n" +
      "Execute your quantum program to begin.\n",
  );
  const [isRunning, setIsRunning] = useState(false);
  const [interpreter, setInterpreter] = useState<any>(null);
  const [interpreterReady, setInterpreterReady] = useState(false);
  const [showExamples, setShowExamples] = useState(false);
  const [currentExample, setCurrentExample] = useState("basic");
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const interpreterLoadedRef = useRef(false);
  const isLoadingRef = useRef(false);

  const [hotkeyLabel, setHotkeyLabel] = useState<"Cmd" | "Ctrl">("Cmd");
  useEffect(() => {
    if (typeof window !== "undefined") {
      const platform = window.navigator.platform.toLowerCase();
      if (platform.includes("mac")) setHotkeyLabel("Cmd");
      else setHotkeyLabel("Ctrl");
    }
  }, []);

  useEffect(() => {
    if (open && !interpreterLoadedRef.current && !isLoadingRef.current) {
      interpreterLoadedRef.current = true;
      loadQodeInterpreter();
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      const isMac = hotkeyLabel === "Cmd";
      if ((isMac ? e.metaKey : e.ctrlKey) && e.key === "Enter") {
        e.preventDefault();
        if (!isRunning) runQodeProgram();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, isRunning, hotkeyLabel]);

  const loadQodeWasmLoader = async () => {
    return new Promise((resolve, reject) => {
      if (window.createQodeInterpreter) {
        resolve(true);
        return;
      }

      const script = document.createElement("script");
      script.src = "/qode-wasm-loader.js";
      script.onload = () => {
        console.log("Qode WASM loader script loaded");
        resolve(true);
      };
      script.onerror = (error) => {
        console.error("Failed to load WASM loader script:", error);
        reject(error);
      };
      document.head.appendChild(script);
    });
  };

  const loadQodeInterpreter = async () => {
    if (isLoadingRef.current || interpreter) {
      console.log("Interpreter already loading or loaded, skipping...");
      return;
    }

    isLoadingRef.current = true;
    console.log("Starting interpreter load...");

    const isInitialState =
      output.includes("Execute your quantum program to begin") ||
      output.includes("Interpreter: Initializing...");

    if (isInitialState) {
      setOutput(
        "SYSTEM: Loading quantum interpreter...\n" +
          "STATUS: Initializing WebAssembly module...\n",
      );
    }

    try {
      await loadQodeWasmLoader();

      if (isInitialState) {
        setOutput(
          (prev) => prev + "STATUS: Configuring quantum state vectors...\n",
        );
      }

      if (window.createQodeInterpreter) {
        const module = await window.createQodeInterpreter();
        setInterpreter(module);
        setInterpreterReady(true);
        console.log("Interpreter loaded successfully:", module);

        if (isInitialState) {
          setOutput(
            "QODE QUANTUM DEVELOPMENT ENVIRONMENT\n" +
              "=====================================\n\n" +
              "SYSTEM STATUS: OPERATIONAL\n" +
              "INTERPRETER: WebAssembly Ready\n" +
              "Ready for quantum program execution.\n",
          );
        }
      } else {
        throw new Error("WASM loader not available");
      }
    } catch (error) {
      console.error("Failed to load Qode interpreter:", error);

      if (isInitialState) {
        setOutput(
          "SYSTEM WARNING: Hardware interpreter unavailable\n" +
            "FALLBACK: Simulation mode activated\n\n" +
            "AVAILABLE FEATURES:\n" +
            "- Syntax validation\n" +
            "- Gate operation simulation\n" +
            "- Educational output\n\n" +
            "Ready for quantum program simulation.\n",
        );
      }

      const fallbackInterpreter = {
        executeQode: (code: string) =>
          Promise.resolve({
            success: true,
            output: simulateQodeProgram(code),
            errors: "",
            exitCode: 0,
          }),
        simulation: true,
      };

      setInterpreter(fallbackInterpreter);
      setInterpreterReady(true);
      console.log("Fallback interpreter created");
    } finally {
      isLoadingRef.current = false;
    }
  };

  const runQodeProgram = async () => {
    setIsRunning(true);
    setOutput("EXEC: Compiling quantum circuit...\n");

    await new Promise((resolve) => setTimeout(resolve, 600));
    setOutput((prev) => prev + "INIT: Quantum state initialization...\n");

    await new Promise((resolve) => setTimeout(resolve, 400));
    setOutput((prev) => prev + "RUN:  Executing quantum operations...\n\n");

    try {
      if (interpreter && interpreterReady) {
        await executeWithWasm();
      } else {
        await executeSimulation();
      }
    } catch (error) {
      console.error("Execution error:", error);
      setOutput((prev) => prev + `ERROR: Execution failed - ${error}\n`);
    }

    setIsRunning(false);
  };

  const executeWithWasm = async () => {
    try {
      if (interpreter && interpreter.executeQode) {
        setOutput(
          (prev) => prev + "LOAD: Program loaded into quantum memory\n",
        );
        setOutput((prev) => prev + "EXEC: WebAssembly interpreter active\n\n");

        const result = await interpreter.executeQode(code);

        if (result.success) {
          setOutput((prev) => prev + result.output + "\n");
          setOutput(
            (prev) => prev + `DONE: Execution completed successfully\n`,
          );
        } else {
          setOutput((prev) => prev + result.output + "\n");
          if (result.errors) {
            setOutput((prev) => prev + "ERRORS:\n" + result.errors + "\n");
          }
          setOutput((prev) => prev + `FAIL: Exit code ${result.exitCode}\n`);
        }
      } else {
        throw new Error("WASM interpreter not properly initialized");
      }
    } catch (error) {
      throw new Error(`WASM execution failed: ${error}`);
    }
  };

  const executeSimulation = async () => {
    await new Promise((resolve) => setTimeout(resolve, 800));

    const simulation = simulateQodeProgram(code);
    setOutput((prev) => prev + simulation + "\nDONE: Simulation complete.\n");
  };

  const simulateQodeProgram = (qodeCode: string): string => {
    const lines = qodeCode
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith("["));

    const qubits = new Map<
      string,
      { state: string; prob0: number; prob1: number }
    >();
    const operationLog: string[] = [];
    let operations = 0;
    let output = "";

    for (const line of lines) {
      const qubitMatches = line.match(/\bq\d+/g);
      if (qubitMatches) {
        qubitMatches.forEach((qubit) => {
          if (!qubits.has(qubit)) {
            qubits.set(qubit, { state: "|0⟩", prob0: 1.0, prob1: 0.0 });
          }
        });
      }

      if (line.includes("!H")) {
        const qubit = line.match(/!H\s+(q\d+)/)?.[1];
        if (qubit && qubits.has(qubit)) {
          operations++;
          const qubitState = qubits.get(qubit)!;
          qubitState.state = "(|0⟩ + |1⟩)/√2";
          qubitState.prob0 = 0.5;
          qubitState.prob1 = 0.5;
          output += `Hadamard gate applied to qubit ${qubit}\n`;
          operationLog.push(`Hadamard gate operation to qubit ${qubit}`);
        }
      }

      if (line.includes("!X")) {
        const qubit = line.match(/!X\s+(q\d+)/)?.[1];
        if (qubit && qubits.has(qubit)) {
          operations++;
          const qubitState = qubits.get(qubit)!;
          const temp = qubitState.prob0;
          qubitState.prob0 = qubitState.prob1;
          qubitState.prob1 = temp;
          qubitState.state =
            qubitState.prob0 > qubitState.prob1 ? "|0⟩" : "|1⟩";
          output += `Pauli-X gate applied to qubit ${qubit}\n`;
          operationLog.push(`Pauli-X gate operation to qubit ${qubit}`);
        }
      }

      if (line.includes("!Y")) {
        const qubit = line.match(/!Y\s+(q\d+)/)?.[1];
        if (qubit && qubits.has(qubit)) {
          operations++;
          const qubitState = qubits.get(qubit)!;
          const temp = qubitState.prob0;
          qubitState.prob0 = qubitState.prob1;
          qubitState.prob1 = temp;
          qubitState.state = "i|0⟩ - i|1⟩";
          output += `Pauli-Y gate applied to qubit ${qubit}\n`;
          operationLog.push(`Pauli-Y gate operation to qubit ${qubit}`);
        }
      }

      if (line.includes("!Z")) {
        const qubit = line.match(/!Z\s+(q\d+)/)?.[1];
        if (qubit && qubits.has(qubit)) {
          operations++;
          const qubitState = qubits.get(qubit)!;
          qubitState.state = qubitState.prob1 > 0 ? "|0⟩ - |1⟩" : "|0⟩";
          output += `Pauli-Z gate applied to qubit ${qubit}\n`;
          operationLog.push(`Pauli-Z gate operation to qubit ${qubit}`);
        }
      }

      if (line.includes("!S")) {
        const qubit = line.match(/!S\s+(q\d+)/)?.[1];
        if (qubit && qubits.has(qubit)) {
          operations++;
          const qubitState = qubits.get(qubit)!;
          qubitState.state = qubitState.prob1 > 0 ? "|0⟩ + i|1⟩" : "|0⟩";
          output += `Phase-S gate applied to qubit ${qubit}\n`;
          operationLog.push(`Phase-S gate operation to qubit ${qubit}`);
        }
      }

      if (line.includes("!I")) {
        const qubit = line.match(/!I\s+(q\d+)/)?.[1];
        if (qubit && qubits.has(qubit)) {
          operations++;
          const qubitState = qubits.get(qubit)!;
          output += `Qubit ${qubit} state: |0⟩ probability: ${qubitState.prob0.toFixed(3)}, |1⟩ probability: ${qubitState.prob1.toFixed(3)}\n`;
          operationLog.push(`Identity gate operation to qubit ${qubit}`);
        }
      }

      if (line.includes("#>")) {
        const textMatch = line.match(/\$([A-Za-z0-9_]+)/);
        if (textMatch) {
          operations++;
          output += `${textMatch[1]}\n`;
          operationLog.push(`Console output to qubit ${textMatch[1]}`);
        }
      }
    }

    output += `Quantum circuit execution summary:\n`;
    output += `Total quantum operations: ${operations}\n`;

    operationLog.forEach((step) => {
      output += `${step}\n`;
    });

    output += `Quantum circuit execution terminated.\n`;

    return output;
  };

  const loadExample = (exampleKey: string) => {
    setCurrentExample(exampleKey);
    setCode(qodeExamples[exampleKey as keyof typeof qodeExamples]);
    setOutput(
      `LOAD: Example program loaded [${exampleKey}]\n\nReady for execution.\n`,
    );
  };

  const resetCode = () => {
    setCode(qodeExamples.basic);
    setCurrentExample("basic");
    setOutput("RESET: Code reset to basic example\n\nReady for execution.\n");
  };

  const saveProgram = () => {
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "quantum_program.qc";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const loadProgram = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".qc,.txt";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target?.result as string;
          setCode(content);
          setOutput(
            `LOAD: Program imported [${file.name}]\n\nReady for execution.\n`,
          );
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-[95vw] w-[95vw] max-h-[95vh] p-0 flex flex-col transition-all duration-200 bg-slate-950 border-slate-700 shadow-2xl !max-w-none"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <div className="px-6 py-3 bg-slate-900 rounded-t-lg">
          <div className="flex items-center justify-between pr-8">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                <Code className="w-3 h-3 text-white" />
              </div>
              <div>
                <DialogTitle className="text-base font-medium text-white">
                  Qode IDE
                </DialogTitle>
                <DialogDescription className="text-slate-400 text-xs">
                  Quantum Development Environment
                </DialogDescription>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1 bg-slate-800 rounded-md">
                <div
                  className={`w-2 h-2 rounded-full ${interpreterReady ? "bg-green-400" : "bg-yellow-400"}`}
                />
                <span className="text-xs text-slate-300">
                  {interpreterReady ? "Ready" : "Loading"}
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  window.open("https://github.com/devenshah2018/qode", "_blank")
                }
                className="border-slate-600 text-slate-300 hover:bg-slate-800 text-xs"
              >
                <ExternalLink className="h-3 w-3 mr-2" />
                Docs
              </Button>
            </div>
          </div>
        </div>

        <div className="px-6 py-2 bg-slate-900/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={runQodeProgram}
                disabled={isRunning}
                className="bg-green-600 hover:bg-green-700 focus:bg-green-700 text-white text-sm h-7 px-3 relative"
              >
                {isRunning ? (
                  <>
                    <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                    Running...
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-3 w-3" />
                    Run
                    <span
                      className="ml-2 text-xs text-green-100 font-mono tracking-tight align-middle"
                      style={{ fontSize: "11px", marginLeft: "6px" }}
                    >
                      {hotkeyLabel}+Enter
                    </span>
                  </>
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={resetCode}
                className="text-slate-400 hover:text-slate-200 hover:bg-slate-800 text-sm h-7"
              >
                <RotateCcw className="h-3 w-3 mr-2" />
                Reset
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowExamples(!showExamples)}
                className="text-slate-400 hover:text-slate-200 hover:bg-slate-800 text-sm h-7"
              >
                Examples
                <ChevronRight className="h-3 w-3 ml-1" />
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 flex-1 overflow-hidden relative">
          <div className="flex flex-col bg-slate-950 overflow-hidden border-r border-slate-700">
            <div className="px-4 py-1 bg-slate-900/20">
              <div className="flex items-center gap-2">
                <FileText className="w-3 h-3 text-slate-500" />
                <span className="text-xs text-slate-400">Editor</span>
              </div>
            </div>
            <div className="flex-1 relative">
              <ScrollArea className="absolute inset-0">
                <Textarea
                  ref={editorRef}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="h-[70vh] w-full resize-none border-0 rounded-none text-sm p-4 focus-visible:ring-0 focus-visible:ring-offset-0 bg-slate-950 text-slate-200 font-mono leading-relaxed"
                  placeholder="Write your quantum program here...

                    Example:
                    q1 q2             // Initialize qubits
                    !H q1             // Hadamard gate
                    !X q2             // Pauli-X gate
                    !I q1             // Check state
                    TERM"
                  spellCheck="false"
                  style={{
                    fontFamily: "JetBrains Mono, SF Mono, Consolas, monospace",
                    lineHeight: "1.6",
                  }}
                />
              </ScrollArea>
            </div>
          </div>

          <div className="flex flex-col bg-black overflow-hidden">
            <div className="px-4 py-1 bg-slate-900/20">
              <div className="flex items-center gap-2">
                <Terminal className="w-3 h-3 text-slate-500" />
                <span className="text-xs text-slate-400">Output</span>
              </div>
            </div>
            <div className="flex-1 relative min-h-[200px]">
              <ScrollArea className="absolute inset-0 h-full w-full">
                <div className="min-h-full h-full w-full p-4 text-sm overflow-auto bg-black text-slate-300 font-mono leading-relaxed space-y-1">
                  {(() => {
                    const lines = output.split("\n");
                    const summaryStart = lines.findIndex((l) =>
                      l.startsWith("Quantum circuit execution summary:"),
                    );
                    let summaryLines: string[] = [];
                    let mainLines: string[] = lines;
                    if (summaryStart !== -1) {
                      let summaryEnd = lines.findIndex(
                        (l, i) =>
                          i > summaryStart &&
                          l.startsWith("Quantum circuit execution terminated."),
                      );
                      if (summaryEnd !== -1) {
                        summaryEnd += 1; // include the terminated line
                        summaryLines = lines.slice(summaryStart, summaryEnd);
                        const afterSummaryLines = lines.slice(summaryEnd);
                        mainLines = lines
                          .slice(0, summaryStart)
                          .concat(afterSummaryLines);
                      } else {
                        summaryLines = lines.slice(summaryStart);
                        mainLines = lines.slice(0, summaryStart);
                      }
                    }
                    return (
                      <>
                        {mainLines.map((line, index) => {
                          if (line.startsWith("Hadamard gate applied")) {
                            return (
                              <div
                                key={index}
                                className="h-6 flex items-center py-0.5 bg-slate-800/30 rounded px-2 border-l-4 border-purple-400"
                              >
                                <span className="text-purple-300 font-semibold">
                                  {line}
                                </span>
                              </div>
                            );
                          }
                          if (line.startsWith("Pauli-X gate applied")) {
                            return (
                              <div
                                key={index}
                                className="h-6 flex items-center py-0.5 bg-slate-800/30 rounded px-2 border-l-4 border-purple-400"
                              >
                                <span className="text-purple-300 font-semibold">
                                  {line}
                                </span>
                              </div>
                            );
                          }
                          if (line.startsWith("Pauli-Y gate applied")) {
                            return (
                              <div
                                key={index}
                                className="h-6 flex items-center py-0.5 bg-slate-800/30 rounded px-2 border-l-4 border-purple-400"
                              >
                                <span className="text-purple-300 font-semibold">
                                  {line}
                                </span>
                              </div>
                            );
                          }
                          if (line.startsWith("Pauli-Z gate applied")) {
                            return (
                              <div
                                key={index}
                                className="h-6 flex items-center py-0.5 bg-slate-800/30 rounded px-2 border-l-4 border-purple-400"
                              >
                                <span className="text-purple-300 font-semibold">
                                  {line}
                                </span>
                              </div>
                            );
                          }
                          if (line.startsWith("Phase-S gate applied")) {
                            return (
                              <div
                                key={index}
                                className="h-6 flex items-center py-0.5 bg-slate-800/30 rounded px-2 border-l-4 border-purple-400"
                              >
                                <span className="text-purple-300 font-semibold">
                                  {line}
                                </span>
                              </div>
                            );
                          }
                          if (
                            line.startsWith("Qubit") &&
                            line.includes("state:")
                          ) {
                            const match = line.match(
                              /Qubit (q\d+) state: \|0⟩ probability: ([0-9.]+), \|1⟩ probability: ([0-9.]+)/,
                            );
                            if (match) {
                              const [, qubit, prob0, prob1] = match;
                              return (
                                <div
                                  key={index}
                                  className="h-6 flex items-center py-0.5 bg-slate-800/30 rounded px-2 border-l-4 border-orange-400"
                                >
                                  <span className="text-orange-300 font-semibold">
                                    {qubit} → |0⟩: {prob0}, |1⟩: {prob1}
                                  </span>
                                </div>
                              );
                            }
                          }
                          if (
                            line.startsWith("EXEC:") ||
                            line.startsWith("INIT:") ||
                            line.startsWith("RUN:") ||
                            line.startsWith("LOAD:")
                          ) {
                            return (
                              <div
                                key={index}
                                className="h-6 flex items-center py-0.5"
                              >
                                <span className="text-blue-400 font-semibold">
                                  {line}
                                </span>
                              </div>
                            );
                          }
                          if (
                            line.startsWith("DONE:") ||
                            line.includes("complete")
                          ) {
                            return (
                              <div
                                key={index}
                                className="h-6 flex items-center py-0.5"
                              >
                                <span className="text-green-400 font-semibold">
                                  {line}
                                </span>
                              </div>
                            );
                          }
                          if (
                            line.startsWith("ERROR:") ||
                            line.startsWith("FAIL:")
                          ) {
                            return (
                              <div
                                key={index}
                                className="h-6 flex items-center py-0.5 bg-red-900/20 rounded px-2 border-l-4 border-red-400"
                              >
                                <span className="text-red-300 font-semibold">
                                  {line}
                                </span>
                              </div>
                            );
                          }
                          if (
                            line.startsWith(
                              "Quantum circuit execution summary:",
                            )
                          ) {
                            return (
                              <div
                                key={index}
                                className="h-6 flex items-center py-0.5 bg-blue-900/30 rounded px-2 border-l-4 border-blue-400"
                              >
                                <span className="text-blue-200 font-semibold italic">
                                  {line}
                                </span>
                              </div>
                            );
                          }
                          if (
                            line.includes("_") &&
                            !line.includes("Console output to")
                          ) {
                            const logText = line
                              .replace("#> $", "")
                              .replace(/_/g, " ");
                            return (
                              <div
                                key={index}
                                className="h-6 flex items-center py-0.5 rounded px-2"
                              >
                                <span className="text-blue-200 font-normal text-[13px] tracking-tight mr-2">
                                  →
                                </span>
                                <span className="text-blue-200 font-normal text-[13px] tracking-tight">
                                  {logText}
                                </span>
                              </div>
                            );
                          }
                          return (
                            <div
                              key={index}
                              className="h-6 flex items-center py-0.5"
                            >
                              <span className="text-slate-300">{line}</span>
                            </div>
                          );
                        })}
                        {summaryLines.length > 0 && (
                          <div className="mt-6 mb-2 px-6 py-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-xl border border-slate-700 shadow-lg flex flex-col gap-2">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-[15px] text-blue-300 tracking-tight">
                                Execution Summary
                              </span>
                            </div>
                            {summaryLines.map((line, idx) => (
                              <div
                                key={idx}
                                className={
                                  idx === 0
                                    ? "hidden"
                                    : idx === 1
                                      ? "text-slate-300 text-[14px] mb-1"
                                      : line.startsWith(
                                            "Quantum circuit execution terminated.",
                                          )
                                        ? "mt-2 text-slate-400 text-xs tracking-wide"
                                        : "text-slate-200 text-[13px] font-mono"
                                }
                              >
                                {line}
                              </div>
                            ))}
                          </div>
                        )}
                      </>
                    );
                  })()}
                  {isRunning && (
                    <div className="flex items-center gap-2 mt-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                      <span className="text-blue-400">Running...</span>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>
          </div>

          <div
            className={`absolute top-0 right-0 h-full w-80 bg-slate-900/95 backdrop-blur-sm border-l border-slate-700 transform transition-transform duration-300 ease-in-out z-50 shadow-xl ${
              showExamples ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b border-slate-700/50 bg-slate-800/50">
                <h3 className="text-sm font-semibold text-white">
                  Code Examples
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowExamples(false)}
                  className="text-slate-400 hover:text-slate-200 hover:bg-slate-700/50 h-6 w-6 p-0 rounded-md"
                >
                  ×
                </Button>
              </div>

              <div className="flex-1 p-4 space-y-3 overflow-y-auto">
                {Object.entries({
                  basic: {
                    heading: "Basic Qubit Operations",
                    summary: "Init, Pauli-X, Hadamard, state check.",
                  },
                  superposition: {
                    heading: "Superposition & Phase Gates",
                    summary: "Create superposition, apply phase ops.",
                  },
                  advanced: {
                    heading: "Advanced Multi-Qubit Circuit",
                    summary: "Multi-qubit, sequential gates, analysis.",
                  },
                  compact: {
                    heading: "Compact Syntax Demo",
                    summary: "Rapid circuit prototyping syntax.",
                  },
                }).map(([key, { heading, summary }], idx, arr) => (
                  <div key={key} className="w-full">
                    <button
                      type="button"
                      onClick={() => {
                        loadExample(key);
                        setShowExamples(false);
                      }}
                      className={`
                        w-full flex flex-row items-stretch px-0 py-0 min-h-[60px] rounded-lg border transition-all duration-150 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 relative group
                        ${
                          currentExample === key
                            ? "bg-blue-600/90 border-blue-600 text-white shadow-lg hover:bg-blue-700/90"
                            : "bg-slate-900/80 border-slate-700 text-slate-200 hover:bg-slate-800/90 hover:border-blue-500 hover:shadow-md"
                        }
                      `}
                    >
                      <div
                        className={`h-full w-1 rounded-l-lg transition-all duration-150 ${currentExample === key ? "bg-blue-400" : "group-hover:bg-blue-300 group-hover:opacity-80 bg-transparent"}`}
                      ></div>
                      <div className="flex flex-col justify-center px-5 py-2 w-full text-left gap-1">
                        <span className="text-[15px] font-semibold text-slate-100 tracking-tight leading-tight truncate mb-0.5">
                          {heading}
                        </span>
                        <span
                          className={`text-xs text-slate-400 truncate ${currentExample === key ? "text-blue-100" : ""}`}
                        >
                          {summary}
                        </span>
                      </div>
                    </button>
                    {idx < arr.length - 1 && (
                      <div className="border-b border-slate-800 mx-2" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {showExamples && (
            <div
              className="absolute inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-300"
              onClick={() => setShowExamples(false)}
            />
          )}
        </div>

        <div className="px-6 py-2 bg-slate-900 rounded-b-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-xs text-slate-400">Qode v1.0</span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${interpreterReady ? "bg-green-400" : "bg-yellow-400"}`}
              />
              <span className="text-xs text-slate-400">
                {interpreterReady ? "Ready" : "Loading"}
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
