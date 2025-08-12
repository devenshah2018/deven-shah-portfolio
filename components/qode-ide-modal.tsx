'use client';

import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Play,
  RotateCcw,
  ExternalLink,
  Loader2,
  Code,
  FileText,
  Terminal,
  ChevronRight,
} from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';

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
  onOpenChange?: (open: boolean) => void;
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
    'QODE QUANTUM DEVELOPMENT ENVIRONMENT\n' +
      '=====================================\n\n' +
      'System Status: Ready\n' +
      'Interpreter: Initializing...\n' +
      'Memory: Available\n\n' +
      'Execute your quantum program to begin.\n'
  );
  const [isRunning, setIsRunning] = useState(false);
  const [interpreter, setInterpreter] = useState<any>(null);
  const [interpreterReady, setInterpreterReady] = useState(false);
  const [showExamples, setShowExamples] = useState(false);
  const [currentExample, setCurrentExample] = useState('basic');
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const interpreterLoadedRef = useRef(false);
  const isLoadingRef = useRef(false);

  const [hotkeyLabel, setHotkeyLabel] = useState<'Cmd' | 'Ctrl'>('Cmd');
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const platform = window.navigator.platform.toLowerCase();
      if (platform.includes('mac')) setHotkeyLabel('Cmd');
      else setHotkeyLabel('Ctrl');
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
      const isMac = hotkeyLabel === 'Cmd';
      if ((isMac ? e.metaKey : e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault();
        if (!isRunning) runQodeProgram();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, isRunning, hotkeyLabel]);

  const loadQodeWasmLoader = async () => {
    return new Promise((resolve, reject) => {
      if (window.createQodeInterpreter) {
        resolve(true);
        return;
      }

      const script = document.createElement('script');
      script.src = '/qode-wasm-loader.js';
      script.onload = () => {
        resolve(true);
      };
      script.onerror = error => {
        console.error('Failed to load WASM loader script:', error);
        reject(error);
      };
      document.head.appendChild(script);
    });
  };

  const loadQodeInterpreter = async () => {
    if (isLoadingRef.current || interpreter) {
      return;
    }

    isLoadingRef.current = true;

    const isInitialState =
      output.includes('Execute your quantum program to begin') ||
      output.includes('Interpreter: Initializing...');

    if (isInitialState) {
      setOutput(
        'SYSTEM: Loading quantum interpreter...\n' + 'STATUS: Initializing WebAssembly module...\n'
      );
    }

    try {
      await loadQodeWasmLoader();

      if (isInitialState) {
        setOutput(prev => prev + 'STATUS: Configuring quantum state vectors...\n');
      }

      if (window.createQodeInterpreter) {
        const createdModule = await window.createQodeInterpreter();
        setInterpreter(createdModule);
        setInterpreterReady(true);

        if (isInitialState) {
          setOutput(
            'QODE QUANTUM DEVELOPMENT ENVIRONMENT\n' +
              '=====================================\n\n' +
              'SYSTEM STATUS: OPERATIONAL\n' +
              'INTERPRETER: WebAssembly Ready\n' +
              'Ready for quantum program execution.\n'
          );
        }
      } else {
        throw new Error('WASM loader not available');
      }
    } catch (error) {
      console.error('Failed to load Qode interpreter:', error);

      if (isInitialState) {
        setOutput(
          'SYSTEM WARNING: Hardware interpreter unavailable\n' +
            'FALLBACK: Simulation mode activated\n\n' +
            'AVAILABLE FEATURES:\n' +
            '- Syntax validation\n' +
            '- Gate operation simulation\n' +
            '- Educational output\n\n' +
            'Ready for quantum program simulation.\n'
        );
      }

      const fallbackInterpreter = {
        executeQode: (code: string) =>
          Promise.resolve({
            success: true,
            output: simulateQodeProgram(code),
            errors: '',
            exitCode: 0,
          }),
        simulation: true,
      };

      setInterpreter(fallbackInterpreter);
      setInterpreterReady(true);
    } finally {
      isLoadingRef.current = false;
    }
  };

  const runQodeProgram = async () => {
    setIsRunning(true);
    setOutput('EXEC: Compiling quantum circuit...\n');

    await new Promise(resolve => setTimeout(resolve, 600));
    setOutput(prev => prev + 'INIT: Quantum state initialization...\n');

    await new Promise(resolve => setTimeout(resolve, 400));
    setOutput(prev => prev + 'RUN:  Executing quantum operations...\n\n');

    try {
      if (interpreter && interpreterReady) {
        await executeWithWasm();
      } else {
        await executeSimulation();
      }
    } catch (error) {
      console.error('Execution error:', error);
      setOutput(prev => prev + `ERROR: Execution failed - ${error}\n`);
    }

    setIsRunning(false);
  };

  const executeWithWasm = async () => {
    try {
      if (interpreter && interpreter.executeQode) {
        setOutput(prev => prev + 'LOAD: Program loaded into quantum memory\n');
        setOutput(prev => prev + 'EXEC: WebAssembly interpreter active\n\n');

        const result = await interpreter.executeQode(code);

        if (result.success) {
          setOutput(prev => prev + result.output + '\n');
          setOutput(prev => prev + `DONE: Execution completed successfully\n`);
        } else {
          setOutput(prev => prev + result.output + '\n');
          if (result.errors) {
            setOutput(prev => prev + 'ERRORS:\n' + result.errors + '\n');
          }
          setOutput(prev => prev + `FAIL: Exit code ${result.exitCode}\n`);
        }
      } else {
        throw new Error('WASM interpreter not properly initialized');
      }
    } catch (error) {
      throw new Error(`WASM execution failed: ${error}`);
    }
  };

  const executeSimulation = async () => {
    await new Promise(resolve => setTimeout(resolve, 800));

    const simulation = simulateQodeProgram(code);
    setOutput(prev => prev + simulation + '\nDONE: Simulation complete.\n');
  };

  const simulateQodeProgram = (qodeCode: string): string => {
    const lines = qodeCode
      .split('\n')
      .map(line => line.trim())
      .filter(line => line && !line.startsWith('['));

    const qubits = new Map<string, { state: string; prob0: number; prob1: number }>();
    const operationLog: string[] = [];
    let operations = 0;
    let output = '';

    for (const line of lines) {
      const qubitMatches = line.match(/\bq\d+/g);
      if (qubitMatches) {
        qubitMatches.forEach(qubit => {
          if (!qubits.has(qubit)) {
            qubits.set(qubit, { state: '|0⟩', prob0: 1.0, prob1: 0.0 });
          }
        });
      }

      if (line.includes('!H')) {
        const qubit = line.match(/!H\s+(q\d+)/)?.[1];
        if (qubit && qubits.has(qubit)) {
          operations++;
          const qubitState = qubits.get(qubit)!;
          qubitState.state = '(|0⟩ + |1⟩)/√2';
          qubitState.prob0 = 0.5;
          qubitState.prob1 = 0.5;
          output += `Hadamard gate applied to qubit ${qubit}\n`;
          operationLog.push(`Hadamard gate operation to qubit ${qubit}`);
        }
      }

      if (line.includes('!X')) {
        const qubit = line.match(/!X\s+(q\d+)/)?.[1];
        if (qubit && qubits.has(qubit)) {
          operations++;
          const qubitState = qubits.get(qubit)!;
          const temp = qubitState.prob0;
          qubitState.prob0 = qubitState.prob1;
          qubitState.prob1 = temp;
          qubitState.state = qubitState.prob0 > qubitState.prob1 ? '|0⟩' : '|1⟩';
          output += `Pauli-X gate applied to qubit ${qubit}\n`;
          operationLog.push(`Pauli-X gate operation to qubit ${qubit}`);
        }
      }

      if (line.includes('!Y')) {
        const qubit = line.match(/!Y\s+(q\d+)/)?.[1];
        if (qubit && qubits.has(qubit)) {
          operations++;
          const qubitState = qubits.get(qubit)!;
          const temp = qubitState.prob0;
          qubitState.prob0 = qubitState.prob1;
          qubitState.prob1 = temp;
          qubitState.state = 'i|0⟩ - i|1⟩';
          output += `Pauli-Y gate applied to qubit ${qubit}\n`;
          operationLog.push(`Pauli-Y gate operation to qubit ${qubit}`);
        }
      }

      if (line.includes('!Z')) {
        const qubit = line.match(/!Z\s+(q\d+)/)?.[1];
        if (qubit && qubits.has(qubit)) {
          operations++;
          const qubitState = qubits.get(qubit)!;
          qubitState.state = qubitState.prob1 > 0 ? '|0⟩ - |1⟩' : '|0⟩';
          output += `Pauli-Z gate applied to qubit ${qubit}\n`;
          operationLog.push(`Pauli-Z gate operation to qubit ${qubit}`);
        }
      }

      if (line.includes('!S')) {
        const qubit = line.match(/!S\s+(q\d+)/)?.[1];
        if (qubit && qubits.has(qubit)) {
          operations++;
          const qubitState = qubits.get(qubit)!;
          qubitState.state = qubitState.prob1 > 0 ? '|0⟩ + i|1⟩' : '|0⟩';
          output += `Phase-S gate applied to qubit ${qubit}\n`;
          operationLog.push(`Phase-S gate operation to qubit ${qubit}`);
        }
      }

      if (line.includes('!I')) {
        const qubit = line.match(/!I\s+(q\d+)/)?.[1];
        if (qubit && qubits.has(qubit)) {
          operations++;
          const qubitState = qubits.get(qubit)!;
          output += `Qubit ${qubit} state: |0⟩ probability: ${qubitState.prob0.toFixed(3)}, |1⟩ probability: ${qubitState.prob1.toFixed(3)}\n`;
          operationLog.push(`Identity gate operation to qubit ${qubit}`);
        }
      }

      if (line.includes('#>')) {
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

    operationLog.forEach(step => {
      output += `${step}\n`;
    });

    output += `Quantum circuit execution terminated.\n`;

    return output;
  };

  const loadExample = (exampleKey: string) => {
    setCurrentExample(exampleKey);
    setCode(qodeExamples[exampleKey as keyof typeof qodeExamples]);
    setOutput(`LOAD: Example program loaded [${exampleKey}]\n\nReady for execution.\n`);
  };

  const resetCode = () => {
    setCode(qodeExamples.basic);
    setCurrentExample('basic');
    setOutput('RESET: Code reset to basic example\n\nReady for execution.\n');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange || (() => {})}>
      <DialogContent
        className='flex max-h-[95vh] w-[95vw] !max-w-none flex-col border-slate-700 bg-slate-950 p-0 shadow-2xl transition-all duration-200'
        onInteractOutside={e => e.preventDefault()}
      >
        <div className='rounded-t-lg bg-slate-900 px-6 py-3'>
          <div className='flex items-center justify-between pr-8'>
            <div className='flex items-center gap-3'>
              <div className='flex h-6 w-6 items-center justify-center rounded bg-blue-600'>
                <Code className='h-3 w-3 text-white' />
              </div>
              <div>
                <DialogTitle className='text-base font-medium text-white'>Qode IDE</DialogTitle>
                <DialogDescription className='text-xs text-slate-400'>
                  Quantum Development Environment
                </DialogDescription>
              </div>
            </div>
            <div className='flex items-center gap-3'>
              <div className='flex items-center gap-2 rounded-md bg-slate-800 px-3 py-1'>
                <div
                  className={`h-2 w-2 rounded-full ${interpreterReady ? 'bg-green-400' : 'bg-yellow-400'}`}
                />
                <span className='text-xs text-slate-300'>
                  {interpreterReady ? 'Ready' : 'Loading'}
                </span>
              </div>
              <Button
                variant='outline'
                size='sm'
                onClick={() => window.open('https://github.com/devenshah2018/qode', '_blank')}
                className='border-slate-600 text-xs text-slate-300 hover:bg-slate-800'
              >
                <ExternalLink className='mr-2 h-3 w-3' />
                Docs
              </Button>
            </div>
          </div>
        </div>

        <div className='bg-slate-900/30 px-6 py-2'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <Button
                variant='ghost'
                size='sm'
                onClick={runQodeProgram}
                disabled={isRunning}
                className='relative h-7 bg-green-600 px-3 text-sm text-white hover:bg-green-700 focus:bg-green-700'
              >
                {isRunning ? (
                  <>
                    <Loader2 className='mr-2 h-3 w-3 animate-spin' />
                    Running...
                  </>
                ) : (
                  <>
                    <Play className='mr-2 h-3 w-3' />
                    Run
                    <span
                      className='ml-2 align-middle font-mono text-xs tracking-tight text-green-100'
                      style={{ fontSize: '11px', marginLeft: '6px' }}
                    >
                      {hotkeyLabel}+Enter
                    </span>
                  </>
                )}
              </Button>
              <Button
                variant='ghost'
                size='sm'
                onClick={resetCode}
                className='h-7 text-sm text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              >
                <RotateCcw className='mr-2 h-3 w-3' />
                Reset
              </Button>
            </div>

            <div className='flex items-center gap-2'>
              <Button
                variant='ghost'
                size='sm'
                onClick={() => setShowExamples(!showExamples)}
                className='h-7 text-sm text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              >
                Examples
                <ChevronRight className='ml-1 h-3 w-3' />
              </Button>
            </div>
          </div>
        </div>

        <div className='relative grid flex-1 grid-cols-1 gap-0 overflow-hidden lg:grid-cols-2'>
          <div className='flex flex-col overflow-hidden border-r border-slate-700 bg-slate-950'>
            <div className='bg-slate-900/20 px-4 py-1'>
              <div className='flex items-center gap-2'>
                <FileText className='h-3 w-3 text-slate-500' />
                <span className='text-xs text-slate-400'>Editor</span>
              </div>
            </div>
            <div className='relative flex-1'>
              <ScrollArea className='absolute inset-0'>
                <Textarea
                  ref={editorRef}
                  value={code}
                  onChange={e => setCode(e.target.value)}
                  className='h-[70vh] w-full resize-none rounded-none border-0 bg-slate-950 p-4 font-mono text-sm leading-relaxed text-slate-200 focus-visible:ring-0 focus-visible:ring-offset-0'
                  placeholder='Write your quantum program here...

                    Example:
                    q1 q2             // Initialize qubits
                    !H q1             // Hadamard gate
                    !X q2             // Pauli-X gate
                    !I q1             // Check state
                    TERM'
                  spellCheck='false'
                  style={{
                    fontFamily: 'JetBrains Mono, SF Mono, Consolas, monospace',
                    lineHeight: '1.6',
                  }}
                />
              </ScrollArea>
            </div>
          </div>

          <div className='flex flex-col overflow-hidden bg-black'>
            <div className='bg-slate-900/20 px-4 py-1'>
              <div className='flex items-center gap-2'>
                <Terminal className='h-3 w-3 text-slate-500' />
                <span className='text-xs text-slate-400'>Output</span>
              </div>
            </div>
            <div className='relative min-h-[200px] flex-1'>
              <ScrollArea className='absolute inset-0 h-full w-full'>
                <div className='h-full min-h-full w-full space-y-1 overflow-auto bg-black p-4 font-mono text-sm leading-relaxed text-slate-300'>
                  {(() => {
                    const lines = output.split('\n');
                    const summaryStart = lines.findIndex(l =>
                      l.startsWith('Quantum circuit execution summary:')
                    );
                    let summaryLines: string[] = [];
                    let mainLines: string[] = lines;
                    if (summaryStart !== -1) {
                      let summaryEnd = lines.findIndex(
                        (l, i) =>
                          i > summaryStart && l.startsWith('Quantum circuit execution terminated.')
                      );
                      if (summaryEnd !== -1) {
                        summaryEnd += 1; // include the terminated line
                        summaryLines = lines.slice(summaryStart, summaryEnd);
                        const afterSummaryLines = lines.slice(summaryEnd);
                        mainLines = lines.slice(0, summaryStart).concat(afterSummaryLines);
                      } else {
                        summaryLines = lines.slice(summaryStart);
                        mainLines = lines.slice(0, summaryStart);
                      }
                    }
                    return (
                      <>
                        {mainLines.map((line, index) => {
                          if (line.startsWith('Hadamard gate applied')) {
                            return (
                              <div
                                key={index}
                                className='flex h-6 items-center rounded border-l-4 border-purple-400 bg-slate-800/30 px-2 py-0.5'
                              >
                                <span className='font-semibold text-purple-300'>{line}</span>
                              </div>
                            );
                          }
                          if (line.startsWith('Pauli-X gate applied')) {
                            return (
                              <div
                                key={index}
                                className='flex h-6 items-center rounded border-l-4 border-purple-400 bg-slate-800/30 px-2 py-0.5'
                              >
                                <span className='font-semibold text-purple-300'>{line}</span>
                              </div>
                            );
                          }
                          if (line.startsWith('Pauli-Y gate applied')) {
                            return (
                              <div
                                key={index}
                                className='flex h-6 items-center rounded border-l-4 border-purple-400 bg-slate-800/30 px-2 py-0.5'
                              >
                                <span className='font-semibold text-purple-300'>{line}</span>
                              </div>
                            );
                          }
                          if (line.startsWith('Pauli-Z gate applied')) {
                            return (
                              <div
                                key={index}
                                className='flex h-6 items-center rounded border-l-4 border-purple-400 bg-slate-800/30 px-2 py-0.5'
                              >
                                <span className='font-semibold text-purple-300'>{line}</span>
                              </div>
                            );
                          }
                          if (line.startsWith('Phase-S gate applied')) {
                            return (
                              <div
                                key={index}
                                className='flex h-6 items-center rounded border-l-4 border-purple-400 bg-slate-800/30 px-2 py-0.5'
                              >
                                <span className='font-semibold text-purple-300'>{line}</span>
                              </div>
                            );
                          }
                          if (line.startsWith('Qubit') && line.includes('state:')) {
                            const match = line.match(
                              /Qubit (q\d+) state: \|0⟩ probability: ([0-9.]+), \|1⟩ probability: ([0-9.]+)/
                            );
                            if (match) {
                              const [, qubit, prob0, prob1] = match;
                              return (
                                <div
                                  key={index}
                                  className='flex h-6 items-center rounded border-l-4 border-orange-400 bg-slate-800/30 px-2 py-0.5'
                                >
                                  <span className='font-semibold text-orange-300'>
                                    {qubit} → |0⟩: {prob0}, |1⟩: {prob1}
                                  </span>
                                </div>
                              );
                            }
                          }
                          if (
                            line.startsWith('EXEC:') ||
                            line.startsWith('INIT:') ||
                            line.startsWith('RUN:') ||
                            line.startsWith('LOAD:')
                          ) {
                            return (
                              <div key={index} className='flex h-6 items-center py-0.5'>
                                <span className='font-semibold text-blue-400'>{line}</span>
                              </div>
                            );
                          }
                          if (line.startsWith('DONE:') || line.includes('complete')) {
                            return (
                              <div key={index} className='flex h-6 items-center py-0.5'>
                                <span className='font-semibold text-green-400'>{line}</span>
                              </div>
                            );
                          }
                          if (line.startsWith('ERROR:') || line.startsWith('FAIL:')) {
                            return (
                              <div
                                key={index}
                                className='flex h-6 items-center rounded border-l-4 border-red-400 bg-red-900/20 px-2 py-0.5'
                              >
                                <span className='font-semibold text-red-300'>{line}</span>
                              </div>
                            );
                          }
                          if (line.startsWith('Quantum circuit execution summary:')) {
                            return (
                              <div
                                key={index}
                                className='flex h-6 items-center rounded border-l-4 border-blue-400 bg-blue-900/30 px-2 py-0.5'
                              >
                                <span className='font-semibold italic text-blue-200'>{line}</span>
                              </div>
                            );
                          }
                          if (line.includes('_') && !line.includes('Console output to')) {
                            const logText = line.replace('#> $', '').replace(/_/g, ' ');
                            return (
                              <div
                                key={index}
                                className='flex h-6 items-center rounded px-2 py-0.5'
                              >
                                <span className='mr-2 text-[13px] font-normal tracking-tight text-blue-200'>
                                  →
                                </span>
                                <span className='text-[13px] font-normal tracking-tight text-blue-200'>
                                  {logText}
                                </span>
                              </div>
                            );
                          }
                          return (
                            <div key={index} className='flex h-6 items-center py-0.5'>
                              <span className='text-slate-300'>{line}</span>
                            </div>
                          );
                        })}
                        {summaryLines.length > 0 && (
                          <div className='mb-2 mt-6 flex flex-col gap-2 rounded-xl border border-slate-700 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-6 py-4 shadow-lg'>
                            <div className='mb-1 flex items-center gap-2'>
                              <span className='text-[15px] tracking-tight text-blue-300'>
                                Execution Summary
                              </span>
                            </div>
                            {summaryLines.map((line, idx) => (
                              <div
                                key={idx}
                                className={
                                  idx === 0
                                    ? 'hidden'
                                    : idx === 1
                                      ? 'mb-1 text-[14px] text-slate-300'
                                      : line.startsWith('Quantum circuit execution terminated.')
                                        ? 'mt-2 text-xs tracking-wide text-slate-400'
                                        : 'font-mono text-[13px] text-slate-200'
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
                    <div className='mt-2 flex items-center gap-2'>
                      <div className='h-2 w-2 animate-pulse rounded-full bg-blue-400'></div>
                      <span className='text-blue-400'>Running...</span>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>
          </div>

          <div
            className={`absolute right-0 top-0 z-50 h-full w-80 transform border-l border-slate-700 bg-slate-900/95 shadow-xl backdrop-blur-sm transition-transform duration-300 ease-in-out ${
              showExamples ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <div className='flex h-full flex-col'>
              <div className='flex items-center justify-between border-b border-slate-700/50 bg-slate-800/50 p-4'>
                <h3 className='text-sm font-semibold text-white'>Code Examples</h3>
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={() => setShowExamples(false)}
                  className='h-6 w-6 rounded-md p-0 text-slate-400 hover:bg-slate-700/50 hover:text-slate-200'
                >
                  ×
                </Button>
              </div>

              <div className='flex-1 space-y-3 overflow-y-auto p-4'>
                {Object.entries({
                  basic: {
                    heading: 'Basic Qubit Operations',
                    summary: 'Init, Pauli-X, Hadamard, state check.',
                  },
                  superposition: {
                    heading: 'Superposition & Phase Gates',
                    summary: 'Create superposition, apply phase ops.',
                  },
                  advanced: {
                    heading: 'Advanced Multi-Qubit Circuit',
                    summary: 'Multi-qubit, sequential gates, analysis.',
                  },
                  compact: {
                    heading: 'Compact Syntax Demo',
                    summary: 'Rapid circuit prototyping syntax.',
                  },
                }).map(([key, { heading, summary }], idx, arr) => (
                  <div key={key} className='w-full'>
                    <button
                      type='button'
                      onClick={() => {
                        loadExample(key);
                        setShowExamples(false);
                      }}
                      className={`group relative flex min-h-[60px] w-full flex-row items-stretch rounded-lg border px-0 py-0 shadow-sm transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                        currentExample === key
                          ? 'border-blue-600 bg-blue-600/90 text-white shadow-lg hover:bg-blue-700/90'
                          : 'border-slate-700 bg-slate-900/80 text-slate-200 hover:border-blue-500 hover:bg-slate-800/90 hover:shadow-md'
                      } `}
                    >
                      <div
                        className={`h-full w-1 rounded-l-lg transition-all duration-150 ${currentExample === key ? 'bg-blue-400' : 'bg-transparent group-hover:bg-blue-300 group-hover:opacity-80'}`}
                      ></div>
                      <div className='flex w-full flex-col justify-center gap-1 px-5 py-2 text-left'>
                        <span className='mb-0.5 truncate text-[15px] font-semibold leading-tight tracking-tight text-slate-100'>
                          {heading}
                        </span>
                        <span
                          className={`truncate text-xs text-slate-400 ${currentExample === key ? 'text-blue-100' : ''}`}
                        >
                          {summary}
                        </span>
                      </div>
                    </button>
                    {idx < arr.length - 1 && <div className='mx-2 border-b border-slate-800' />}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {showExamples && (
            <div
              className='absolute inset-0 z-40 bg-black/30 backdrop-blur-sm transition-opacity duration-300'
              onClick={() => setShowExamples(false)}
            />
          )}
        </div>

        <div className='rounded-b-lg bg-slate-900 px-6 py-2'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-4'>
              <span className='text-xs text-slate-400'>Qode v1.0</span>
            </div>
            <div className='flex items-center gap-2'>
              <div
                className={`h-2 w-2 rounded-full ${interpreterReady ? 'bg-green-400' : 'bg-yellow-400'}`}
              />
              <span className='text-xs text-slate-400'>
                {interpreterReady ? 'Ready' : 'Loading'}
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
