"use client"

import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
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
} from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

// Global window extension for Qode interpreter
declare global {
  interface Window {
    QodeModule: any
    QodeInterpreter: any
    createQodeInterpreter: any
    executeQode: any
    executeQodeCode: any
    qodeInterpreterReady: boolean
    qodeOutput: string
    qodeErrors: string
  }
}

interface QodeIdeModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

// Example Qode programs
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
q1 q2 !X q1 !H q1 !I q1 !Y q2 !I q2 #> $Compact_Demo_Complete TERM`,
}

export function QodeIdeModal({ open, onOpenChange }: QodeIdeModalProps) {
  const [code, setCode] = useState(qodeExamples.basic)
  const [output, setOutput] = useState<string>(
    "QODE QUANTUM DEVELOPMENT ENVIRONMENT\n" +
      "=====================================\n\n" +
      "System Status: Ready\n" +
      "Interpreter: Initializing...\n" +
      "Memory: Available\n\n" +
      "Execute your quantum program to begin.\n",
  )
  const [isRunning, setIsRunning] = useState(false)
  const [isMaximized, setIsMaximized] = useState(false)
  const [interpreter, setInterpreter] = useState<any>(null)
  const [interpreterReady, setInterpreterReady] = useState(false)
  const [showExamples, setShowExamples] = useState(false)
  const [currentExample, setCurrentExample] = useState("basic")
  const editorRef = useRef<HTMLTextAreaElement>(null)
  const interpreterLoadedRef = useRef(false)
  const isLoadingRef = useRef(false)

  // Load the Qode WASM interpreter when the modal opens
  useEffect(() => {
    if (open && !interpreterLoadedRef.current && !isLoadingRef.current) {
      interpreterLoadedRef.current = true
      loadQodeInterpreter()
    }
  }, [open])

  const loadQodeWasmLoader = async () => {
    return new Promise((resolve, reject) => {
      // Check if the loader is already available
      if (window.createQodeInterpreter) {
        resolve(true)
        return
      }

      // Load the WASM loader script
      const script = document.createElement("script")
      script.src = "/qode-wasm-loader.js"
      script.onload = () => {
        console.log("Qode WASM loader script loaded")
        resolve(true)
      }
      script.onerror = (error) => {
        console.error("Failed to load WASM loader script:", error)
        reject(error)
      }
      document.head.appendChild(script)
    })
  }

  const loadQodeInterpreter = async () => {
    // Prevent multiple simultaneous loads
    if (isLoadingRef.current || interpreter) {
      console.log('Interpreter already loading or loaded, skipping...')
      return
    }
    
    isLoadingRef.current = true
    console.log('Starting interpreter load...')
    
    // Only set loading message if output is in initial state
    const isInitialState = output.includes("Execute your quantum program to begin") || 
                          output.includes("Interpreter: Initializing...");
    
    if (isInitialState) {
      setOutput("SYSTEM: Loading quantum interpreter...\n" + "STATUS: Initializing WebAssembly module...\n")
    }

    try {
      // Load our new WASM loader
      await loadQodeWasmLoader()

      if (isInitialState) {
        setOutput((prev) => prev + "STATUS: Configuring quantum state vectors...\n")
      }

      // Use the new createQodeInterpreter function
      if (window.createQodeInterpreter) {
        const module = await window.createQodeInterpreter()
        setInterpreter(module)
        setInterpreterReady(true)
        console.log('Interpreter loaded successfully:', module)

        // Only update output if we're in initial state
        if (isInitialState) {
          setOutput(
            "QODE QUANTUM DEVELOPMENT ENVIRONMENT\n" +
              "=====================================\n\n" +
              "SYSTEM STATUS: OPERATIONAL\n" +
              "INTERPRETER: WebAssembly Ready\n" +
              "QUANTUM GATES: H, X, Y, Z, S, I\n" +
              "ANALYSIS: Real-time probability calculation\n" +
              `MODE: ${module.simulation ? "Simulation" : "Hardware"}\n\n` +
              "Ready for quantum program execution.\n",
          )
        }
      } else {
        throw new Error("WASM loader not available")
      }
    } catch (error) {
      console.error("Failed to load Qode interpreter:", error)
      
      // Only update output if we're in initial state
      if (isInitialState) {
        setOutput(
          "SYSTEM WARNING: Hardware interpreter unavailable\n" +
            "FALLBACK: Simulation mode activated\n\n" +
            "AVAILABLE FEATURES:\n" +
            "- Syntax validation\n" +
            "- Gate operation simulation\n" +
            "- Educational output\n\n" +
            "Ready for quantum program simulation.\n",
        )
      }

      // Create a basic fallback interpreter
      const fallbackInterpreter = {
        executeQode: (code: string) =>
          Promise.resolve({
            success: true,
            output: simulateQodeProgram(code),
            errors: "",
            exitCode: 0,
          }),
        simulation: true,
      }
      
      setInterpreter(fallbackInterpreter)
      setInterpreterReady(true)
      console.log('Fallback interpreter created')
    } finally {
      isLoadingRef.current = false
    }
  }

  const runQodeProgram = async () => {
    setIsRunning(true)
    setOutput("EXEC: Compiling quantum circuit...\n")

    await new Promise((resolve) => setTimeout(resolve, 600))
    setOutput((prev) => prev + "INIT: Quantum state initialization...\n")

    await new Promise((resolve) => setTimeout(resolve, 400))
    setOutput((prev) => prev + "RUN:  Executing quantum operations...\n\n")

    try {
      if (interpreter && interpreterReady) {
        // Real WASM execution
        await executeWithWasm()
      } else {
        // Simulation mode
        await executeSimulation()
      }
    } catch (error) {
      console.error("Execution error:", error)
      setOutput((prev) => prev + `ERROR: Execution failed - ${error}\n`)
    }

    setIsRunning(false)
  }

  const executeWithWasm = async () => {
    try {
      // Use the new WASM loader interface
      if (interpreter && interpreter.executeQode) {
        setOutput((prev) => prev + "LOAD: Program loaded into quantum memory\n")
        setOutput((prev) => prev + "EXEC: WebAssembly interpreter active\n\n")

        // Execute the program using the new interface
        const result = await interpreter.executeQode(code)

        if (result.success) {
          setOutput((prev) => prev + result.output + "\n")
          setOutput((prev) => prev + `DONE: Execution completed successfully\n`)
        } else {
          setOutput((prev) => prev + result.output + "\n")
          if (result.errors) {
            setOutput((prev) => prev + "ERRORS:\n" + result.errors + "\n")
          }
          setOutput((prev) => prev + `FAIL: Exit code ${result.exitCode}\n`)
        }
      } else {
        throw new Error("WASM interpreter not properly initialized")
      }
    } catch (error) {
      throw new Error(`WASM execution failed: ${error}`)
    }
  }

  const executeSimulation = async () => {
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Parse and simulate the Qode program
    const simulation = simulateQodeProgram(code)
    setOutput((prev) => prev + simulation + "\nDONE: Simulation complete.\n")
  }

  const simulateQodeProgram = (qodeCode: string): string => {
    const lines = qodeCode
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith("["))
    
    const qubits = new Map<string, { state: string, prob0: number, prob1: number }>()
    const operationLog: string[] = []
    let operations = 0
    let output = ""

    // Process each line for quantum operations
    for (const line of lines) {
      // Parse qubit initialization
      const qubitMatches = line.match(/\bq\d+/g)
      if (qubitMatches) {
        qubitMatches.forEach((qubit) => {
          if (!qubits.has(qubit)) {
            qubits.set(qubit, { state: "|0⟩", prob0: 1.0, prob1: 0.0 })
          }
        })
      }

      // Parse quantum gates with detailed descriptions
      if (line.includes("!H")) {
        const qubit = line.match(/!H\s+(q\d+)/)?.[1]
        if (qubit && qubits.has(qubit)) {
          operations++
          const qubitState = qubits.get(qubit)!
          qubitState.state = "(|0⟩ + |1⟩)/√2"
          qubitState.prob0 = 0.5
          qubitState.prob1 = 0.5
          output += `Hadamard gate applied to qubit ${qubit}: superposition state created\n`
          operationLog.push(`Step ${operations}: Hadamard gate operation to qubit ${qubit}`)
        }
      }

      if (line.includes("!X")) {
        const qubit = line.match(/!X\s+(q\d+)/)?.[1]
        if (qubit && qubits.has(qubit)) {
          operations++
          const qubitState = qubits.get(qubit)!
          const temp = qubitState.prob0
          qubitState.prob0 = qubitState.prob1
          qubitState.prob1 = temp
          qubitState.state = qubitState.prob0 > qubitState.prob1 ? "|0⟩" : "|1⟩"
          output += `Pauli-X gate applied to qubit ${qubit}: computational basis state flipped\n`
          operationLog.push(`Step ${operations}: Pauli-X gate operation to qubit ${qubit}`)
        }
      }

      if (line.includes("!Y")) {
        const qubit = line.match(/!Y\s+(q\d+)/)?.[1]
        if (qubit && qubits.has(qubit)) {
          operations++
          const qubitState = qubits.get(qubit)!
          // Y gate introduces complex phase and bit flip
          const temp = qubitState.prob0
          qubitState.prob0 = qubitState.prob1
          qubitState.prob1 = temp
          qubitState.state = "i|0⟩ - i|1⟩"
          output += `Pauli-Y gate applied to qubit ${qubit}: rotation about Y-axis with phase\n`
          operationLog.push(`Step ${operations}: Pauli-Y gate operation to qubit ${qubit}`)
        }
      }

      if (line.includes("!Z")) {
        const qubit = line.match(/!Z\s+(q\d+)/)?.[1]
        if (qubit && qubits.has(qubit)) {
          operations++
          const qubitState = qubits.get(qubit)!
          qubitState.state = qubitState.prob1 > 0 ? "|0⟩ - |1⟩" : "|0⟩"
          output += `Pauli-Z gate applied to qubit ${qubit}: phase flip on |1⟩ component\n`
          operationLog.push(`Step ${operations}: Pauli-Z gate operation to qubit ${qubit}`)
        }
      }

      if (line.includes("!S")) {
        const qubit = line.match(/!S\s+(q\d+)/)?.[1]
        if (qubit && qubits.has(qubit)) {
          operations++
          const qubitState = qubits.get(qubit)!
          qubitState.state = qubitState.prob1 > 0 ? "|0⟩ + i|1⟩" : "|0⟩"
          output += `Phase-S gate applied to qubit ${qubit}: π/2 phase shift applied\n`
          operationLog.push(`Step ${operations}: Phase-S gate operation to qubit ${qubit}`)
        }
      }

      if (line.includes("!I")) {
        const qubit = line.match(/!I\s+(q\d+)/)?.[1]
        if (qubit && qubits.has(qubit)) {
          operations++
          const qubitState = qubits.get(qubit)!
          output += `Qubit ${qubit} state: |0⟩ probability: ${qubitState.prob0.toFixed(3)}, |1⟩ probability: ${qubitState.prob1.toFixed(3)}\n`
          operationLog.push(`Step ${operations}: Identity gate operation to qubit ${qubit}`)
        }
      }

      // Parse output commands
      if (line.includes("#>")) {
        const textMatch = line.match(/\$([A-Za-z0-9_]+)/)
        if (textMatch) {
          operations++
          output += `${textMatch[1]}\n`
          operationLog.push(`Step ${operations}: Console output to qubit ${textMatch[1]}`)
        }
      }
    }

    // Add comprehensive execution summary
    output += `Quantum circuit execution summary:\n`
    output += `Total quantum operations: ${operations}\n`
    
    // Add step-by-step breakdown
    operationLog.forEach(step => {
      output += `${step}\n`
    })
    
    output += `Quantum circuit execution terminated.\n`

    return output
  }

  const loadExample = (exampleKey: string) => {
    setCurrentExample(exampleKey)
    setCode(qodeExamples[exampleKey as keyof typeof qodeExamples])
    setOutput(`LOAD: Example program loaded [${exampleKey}]\n\nReady for execution.\n`)
  }

  const resetCode = () => {
    setCode(qodeExamples.basic)
    setCurrentExample("basic")
    setOutput("RESET: Code reset to basic example\n\nReady for execution.\n")
  }

  const saveProgram = () => {
    const blob = new Blob([code], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "quantum_program.qc"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    // Don't modify output for simple operations like save
  }

  const loadProgram = () => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = ".qc,.txt"
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const content = e.target?.result as string
          setCode(content)
          setOutput(`LOAD: Program imported [${file.name}]\n\nReady for execution.\n`)
        }
        reader.readAsText(file)
      }
    }
    input.click()
  }

  const copyCode = () => {
    navigator.clipboard.writeText(code)
    // Don't modify output for simple operations like copy
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={`
          ${isMaximized ? "w-[100vw] h-[100vh] rounded-none m-0" : "max-w-[95vw] w-[95vw] max-h-[95vh]"} 
          p-0 flex flex-col transition-all duration-200 bg-slate-950 border-slate-700 shadow-2xl !max-w-none
        `}
        onInteractOutside={(e) => e.preventDefault()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 border-b border-slate-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-slate-800 border border-slate-600 rounded-md flex items-center justify-center">
                <Code className="w-5 h-5 text-slate-300" />
              </div>
              <div>
                <DialogTitle className="text-xl font-mono font-bold text-slate-100 tracking-wide">QODE IDE</DialogTitle>
                <DialogDescription className="text-slate-400 font-mono text-sm">
                  Quantum Development Environment
                </DialogDescription>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1 bg-slate-800 border border-slate-600 rounded-md">
                <div className={`w-2 h-2 rounded-full ${interpreterReady ? "bg-emerald-400" : "bg-amber-400"}`} />
                <span className="text-xs font-mono text-slate-300">{interpreterReady ? "READY" : "INIT"}</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMaximized(!isMaximized)}
                className="text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-700"
              >
                {isMaximized ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open("https://github.com/devenshah2018/qode", "_blank")}
                className="border-slate-600 text-slate-300 hover:bg-slate-800 font-mono text-xs"
              >
                <ExternalLink className="h-3 w-3 mr-2" />
                DOCS
              </Button>
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="px-6 py-3 bg-slate-900/50 border-b border-slate-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={saveProgram}
                className="text-slate-400 hover:text-slate-200 hover:bg-slate-800 font-mono text-xs h-8"
              >
                <Save className="h-3 w-3 mr-2" />
                SAVE
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={loadProgram}
                className="text-slate-400 hover:text-slate-200 hover:bg-slate-800 font-mono text-xs h-8"
              >
                <Upload className="h-3 w-3 mr-2" />
                LOAD
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={copyCode}
                className="text-slate-400 hover:text-slate-200 hover:bg-slate-800 font-mono text-xs h-8"
              >
                <Copy className="h-3 w-3 mr-2" />
                COPY
              </Button>
              <Separator orientation="vertical" className="h-6 bg-slate-700" />
              <Button
                variant="ghost"
                size="sm"
                onClick={resetCode}
                className="text-slate-400 hover:text-slate-200 hover:bg-slate-800 font-mono text-xs h-8"
              >
                <RotateCcw className="h-3 w-3 mr-2" />
                RESET
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowExamples(!showExamples)}
                className="text-slate-400 hover:text-slate-200 hover:bg-slate-800 font-mono text-xs h-8"
              >
                <FileText className="h-3 w-3 mr-2" />
                EXAMPLES
                {showExamples ? <ChevronDown className="h-3 w-3 ml-1" /> : <ChevronRight className="h-3 w-3 ml-1" />}
              </Button>
            </div>
          </div>

          {/* Examples Panel */}
          {showExamples && (
            <div className="mt-3 pt-3 border-t border-slate-700">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {Object.entries(qodeExamples).map(([key, _]) => (
                  <Button
                    key={key}
                    variant={currentExample === key ? "default" : "outline"}
                    size="sm"
                    onClick={() => loadExample(key)}
                    className={`
                      ${
                        currentExample === key
                          ? "bg-slate-700 text-slate-100 border-slate-600"
                          : "border-slate-600 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                      }
                      font-mono text-xs h-8 uppercase
                    `}
                  >
                    {key}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Main IDE Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 flex-1 overflow-hidden">
          {/* Code Editor Panel */}
          <div className="flex flex-col bg-slate-950 overflow-hidden border-r border-slate-700">
            <div className="px-4 py-3 bg-slate-900 border-b border-slate-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-slate-800 border border-slate-600 rounded flex items-center justify-center">
                    <FileText className="w-3 h-3 text-slate-400" />
                  </div>
                  <span className="font-mono text-sm text-slate-300">quantum_program.qc</span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="border-slate-600 text-slate-400 font-mono text-xs px-2 py-0">
                    {code.split("\n").length}L
                  </Badge>
                  <Badge variant="outline" className="border-slate-600 text-slate-400 font-mono text-xs px-2 py-0">
                    {code.length}C
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex-1 relative">
              <ScrollArea className="absolute inset-0">
                <Textarea
                  ref={editorRef}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="h-[70vh] w-full resize-none border-0 rounded-none text-sm p-4 focus-visible:ring-0 focus-visible:ring-offset-0 bg-slate-950 text-slate-200 font-mono leading-relaxed"
                  placeholder="[Write your Qode quantum program]

q1 q2             [Initialize qubits]

!H q1             [Hadamard gate]
!X q2             [Pauli-X gate]
!I q1             [Check state]

#> $Program_Complete
TERM"
                  spellCheck="false"
                  style={{
                    fontFamily: "JetBrains Mono, SF Mono, Consolas, monospace",
                    lineHeight: "1.7",
                  }}
                />
              </ScrollArea>
            </div>
          </div>

          {/* Output Console Panel */}
          <div className="flex flex-col bg-black overflow-hidden">
            <div className="px-4 py-3 bg-slate-900 border-b border-slate-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-slate-800 border border-slate-600 rounded flex items-center justify-center">
                    <Terminal className="w-3 h-3 text-slate-400" />
                  </div>
                  <span className="font-mono text-sm text-slate-300">QUANTUM CONSOLE</span>
                </div>
                <Button
                  size="sm"
                  onClick={runQodeProgram}
                  disabled={isRunning}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 font-mono text-xs px-4 h-8"
                >
                  {isRunning ? (
                    <>
                      <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                      EXEC
                    </>
                  ) : (
                    <>
                      <Play className="mr-2 h-3 w-3" />
                      RUN
                    </>
                  )}
                </Button>
              </div>
            </div>
            <div className="flex-1 relative">
              <ScrollArea className="absolute inset-0">
                <div className="h-[70vh] w-full p-4 text-sm overflow-auto bg-black text-slate-300 font-mono leading-relaxed space-y-1">
                  {output.split('\n').map((line, index) => (
                    <div key={index} className="flex items-start gap-2">
                      {/* Line number */}
                      <span className="text-slate-600 text-xs w-8 text-right select-none flex-shrink-0 mt-0.5">
                        {line.trim() ? String(index + 1).padStart(3, '0') : ''}
                      </span>
                      
                      {/* Content with syntax highlighting */}
                      <div className="flex-1 min-w-0">
                        {line.startsWith('EXEC:') || line.startsWith('INIT:') || line.startsWith('RUN:') || line.startsWith('LOAD:') ? (
                          <span className="text-cyan-400 font-semibold">{line}</span>
                        ) : line.includes('gate applied') || line.includes('Gate applied') ? (
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                            <span className="text-emerald-400">{line}</span>
                          </div>
                        ) : line.includes('Hadamard') ? (
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                            <span className="text-purple-300">{line}</span>
                          </div>
                        ) : line.includes('Pauli-X') ? (
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                            <span className="text-red-300">{line}</span>
                          </div>
                        ) : line.includes('Pauli-Y') ? (
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                            <span className="text-yellow-300">{line}</span>
                          </div>
                        ) : line.includes('Pauli-Z') ? (
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                            <span className="text-blue-300">{line}</span>
                          </div>
                        ) : line.includes('Phase-S') ? (
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
                            <span className="text-indigo-300">{line}</span>
                          </div>
                        ) : line.includes('probability:') || line.includes('state:') ? (
                          <div className="bg-slate-800/50 rounded px-3 py-1 border-l-4 border-orange-400">
                            <span className="text-orange-300 font-medium">{line}</span>
                          </div>
                        ) : line.includes('Step ') ? (
                          <div className="flex items-center gap-2 text-slate-400">
                            <div className="w-1 h-1 bg-slate-500 rounded-full"></div>
                            <span className="text-xs">{line}</span>
                          </div>
                        ) : line.includes('execution summary:') || line.includes('Total quantum operations:') ? (
                          <div className="bg-slate-900/70 rounded px-3 py-2 border border-slate-700 mt-2">
                            <span className="text-slate-200 font-semibold">{line}</span>
                          </div>
                        ) : line.includes('terminated') || line.includes('complete') ? (
                          <div className="flex items-center gap-2 mt-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                            <span className="text-green-400 font-semibold">{line}</span>
                          </div>
                        ) : line.includes('ERROR:') || line.includes('FAIL:') ? (
                          <div className="bg-red-900/30 rounded px-3 py-2 border-l-4 border-red-400">
                            <span className="text-red-300 font-semibold">{line}</span>
                          </div>
                        ) : line.includes('DONE:') ? (
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                            <span className="text-green-400 font-semibold">{line}</span>
                          </div>
                        ) : line.trim().match(/^[A-Z_]+$/) ? (
                          <div className="bg-blue-900/30 rounded px-3 py-2 border-l-4 border-blue-400 mt-1">
                            <span className="text-blue-300 font-bold tracking-wider">{line}</span>
                          </div>
                        ) : line.includes('SYSTEM') || line.includes('STATUS') || line.includes('MODE') ? (
                          <span className="text-slate-400">{line}</span>
                        ) : line.trim() ? (
                          <span className="text-slate-300">{line}</span>
                        ) : null}
                      </div>
                    </div>
                  ))}
                  {isRunning && (
                    <div className="flex items-center gap-2 mt-2">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                      <span className="text-cyan-400 animate-pulse">Executing...</span>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-900 border-t border-slate-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Activity className="h-3 w-3 text-slate-400" />
                <span className="font-mono text-xs text-slate-400">QODE v1.0</span>
              </div>
              <div className="flex items-center gap-2">
                <Cpu className="h-3 w-3 text-slate-400" />
                <span className="font-mono text-xs text-slate-400">WASM</span>
              </div>
              <div className="flex items-center gap-2">
                <Database className="h-3 w-3 text-slate-400" />
                <span className="font-mono text-xs text-slate-400">QUANTUM</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${interpreterReady ? "bg-emerald-400" : "bg-amber-400"}`} />
              <span className="font-mono text-xs text-slate-400">
                {interpreterReady ? "OPERATIONAL" : "INITIALIZING"}
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
