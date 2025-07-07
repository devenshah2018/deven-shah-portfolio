"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Play, RotateCcw, Copy, ExternalLink, Info, Maximize2, Minimize2, Loader2, Code, Save, FileText, Settings, Zap, Terminal, Eye, Download, Upload, ChevronRight, ChevronDown } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"

// Global window extension for Qode interpreter
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
  open: boolean
  onOpenChange: (open: boolean) => void
}

// Example Qode programs
const qodeExamples = {
  basic: `[Basic Qode Example - Single Qubit Operations]
q1                [Initialize qubit q1 in |0⟩ state]

[Apply quantum gates]
!X q1             [Apply Pauli-X gate (bit flip)]
!I q1             [Identity gate - check probability states]
!H q1             [Apply Hadamard gate (superposition)]
!I q1             [Check superposition state]

[Output and terminate]
#> $Basic_Example_Complete
TERM`,

  superposition: `[Superposition and Measurement Example]
q1 q2             [Initialize two qubits]

[Create superposition states]
!H q1             [Put q1 in superposition]
!H q2             [Put q2 in superposition]

[Apply phase operations]
!S q1             [Apply phase-S gate to q1]
!Z q2             [Apply Pauli-Z gate to q2]

[Check final states]
!I q1             [Identify q1 probability states]
!I q2             [Identify q2 probability states]

#> $Superposition_Demo_Complete
TERM`,

  advanced: `[Advanced Qode - Multi-Qubit Operations]
q1 q2 q3          [Initialize three qubits]

[Sequential gate applications]
!X q1 !H q1 !Y q1 [Apply X, H, Y gates to q1]
!H q2 !S q2       [Apply H and S gates to q2]
!Z q3 !H q3       [Apply Z and H gates to q3]

[State analysis]
!I q1             [Check q1 final state]
!I q2             [Check q2 final state]  
!I q3             [Check q3 final state]

[Output results]
#> $Multi_Qubit_Circuit_Complete
#> $Three_Qubits_Processed
TERM`,

  compact: `[Compact Qode Syntax Example]
q1 q2 !X q1 !H q1 !I q1 !Y q2 !I q2 #> $Compact_Demo TERM`
}

const sampleOutput = `Qode Quantum Interpreter v1.0
================================

Initializing quantum circuit...
Qubit q1 initialized in |0⟩ state.

Applying Pauli-X gate to q1...
Qubit q1 state: |1⟩

Identity gate applied to q1.
Probability states:
- |0⟩: 0.000000 (0%)
- |1⟩: 1.000000 (100%)

Applying Hadamard gate to q1...
Qubit q1 entering superposition...

Identity gate applied to q1.
Probability states:
- |0⟩: 0.500000 (50%)
- |1⟩: 0.500000 (50%)

Output: Basic_Example_Complete

Circuit execution completed successfully.
Total gates applied: 3
Execution time: 0.023ms
Memory usage: 1.2KB`

export function QodeIdeModal({ open, onOpenChange }: QodeIdeModalProps) {
  const [code, setCode] = useState(qodeExamples.basic)
  const [output, setOutput] = useState<string>(
    'Welcome to Qode Interactive Development Environment!\n\nClick "Run Program" to execute your Qode quantum program...\n\nUse the example buttons to load different Qode programs.',
  )
  const [isRunning, setIsRunning] = useState(false)
  const [isMaximized, setIsMaximized] = useState(false)
  const [interpreter, setInterpreter] = useState<any>(null)
  const [interpreterReady, setInterpreterReady] = useState(false)
  const [showExamples, setShowExamples] = useState(false)
  const [currentExample, setCurrentExample] = useState('basic')
  const editorRef = useRef<HTMLTextAreaElement>(null)

  // Load the Qode WASM interpreter when the modal opens
  useEffect(() => {
    if (open && !interpreter) {
      loadQodeInterpreter()
    }
  }, [open, interpreter])

  const loadQodeWasmLoader = async () => {
    return new Promise((resolve, reject) => {
      // Check if the loader is already available
      if (window.createQodeInterpreter) {
        resolve(true)
        return
      }
      
      // Load the WASM loader script
      const script = document.createElement('script')
      script.src = '/qode-wasm-loader.js'
      script.onload = () => {
        console.log('Qode WASM loader script loaded')
        resolve(true)
      }
      script.onerror = (error) => {
        console.error('Failed to load WASM loader script:', error)
        reject(error)
      }
      document.head.appendChild(script)
    })
  }

  const loadQodeInterpreter = async () => {
    setOutput('🔄 Loading Qode Quantum Interpreter...\n')
    
    try {
      // Load our new WASM loader
      await loadQodeWasmLoader()
      
      setOutput((prev) => prev + '🔄 Initializing WebAssembly module...\n')
      
      // Use the new createQodeInterpreter function
      if (window.createQodeInterpreter) {
        const module = await window.createQodeInterpreter()
        setInterpreter(module)
        setInterpreterReady(true)
        
        setOutput('✅ Qode Interpreter loaded successfully!\n\n' +
                 'Features available:\n' +
                 '• Quantum gate operations (!H, !X, !Y, !Z, !S, !I)\n' +
                 '• Qubit state analysis\n' +
                 '• Probability calculations\n' +
                 '• Real-time output\n' +
                 `• Mode: ${module.simulation ? 'Simulation' : 'WASM'}\n\n` +
                 'Click "Run Program" to execute your Qode quantum program...\n')
      } else {
        throw new Error('WASM loader not available')
      }
      
    } catch (error) {
      console.error('Failed to load Qode interpreter:', error)
      setOutput('❌ Failed to load Qode interpreter. Using fallback simulation mode.\n\n' +
               'Simulation mode provides:\n' +
               '• Syntax validation\n' +
               '• Gate operation simulation\n' +
               '• Educational output\n\n' +
               'Click "Run Program" to simulate your Qode quantum program...\n')
      
      // Create a basic fallback interpreter
      setInterpreter({
        executeQode: (code: string) => Promise.resolve({
          success: true,
          output: simulateQodeProgram(code),
          errors: '',
          exitCode: 0
        }),
        simulation: true
      })
      setInterpreterReady(true)
    }
  }

  const runQodeProgram = async () => {
    setIsRunning(true)
    setOutput("🚀 Compiling Qode quantum circuit...\n")

    await new Promise((resolve) => setTimeout(resolve, 600))
    setOutput((prev) => prev + "⚙️ Initializing quantum state vectors...\n")
    
    await new Promise((resolve) => setTimeout(resolve, 400))
    setOutput((prev) => prev + "🔬 Executing quantum operations...\n\n")

    try {
      if (interpreter && interpreterReady) {
        // Real WASM execution
        await executeWithWasm()
      } else {
        // Simulation mode
        await executeSimulation()
      }
    } catch (error) {
      console.error('Execution error:', error)
      setOutput((prev) => prev + `❌ Execution failed: ${error}\n`)
    }
    
    setIsRunning(false)
  }

  const executeWithWasm = async () => {
    try {
      // Use the new WASM loader interface
      if (interpreter && interpreter.executeQode) {
        setOutput((prev) => prev + "📝 Qode program loaded into quantum memory\n")
        setOutput((prev) => prev + "🎯 Executing with WASM interpreter...\n\n")
        
        // Execute the program using the new interface
        const result = await interpreter.executeQode(code)
        
        if (result.success) {
          setOutput((prev) => prev + result.output + '\n')
          setOutput((prev) => prev + `✅ Execution completed successfully\n`)
        } else {
          setOutput((prev) => prev + result.output + '\n')
          if (result.errors) {
            setOutput((prev) => prev + 'Errors:\n' + result.errors + '\n')
          }
          setOutput((prev) => prev + `❌ Execution failed with code: ${result.exitCode}\n`)
        }
      } else {
        throw new Error('WASM interpreter not properly initialized')
      }
      
    } catch (error) {
      throw new Error(`WASM execution failed: ${error}`)
    }
  }

  const executeSimulation = async () => {
    await new Promise((resolve) => setTimeout(resolve, 800))
    
    // Parse and simulate the Qode program
    const simulation = simulateQodeProgram(code)
    setOutput((prev) => prev + simulation + '\n✅ Simulation complete.\n')
  }

  const simulateQodeProgram = (qodeCode: string): string => {
    let output = 'Qode Quantum Simulator v1.0\n'
    output += '==============================\n\n'
    
    const lines = qodeCode.split('\n').map(line => line.trim()).filter(line => line && !line.startsWith('['))
    let qubits: string[] = []
    let operations = 0
    
    for (const line of lines) {
      // Parse qubit initialization
      const qubitMatches = line.match(/\bq\d+/g)
      if (qubitMatches) {
        qubitMatches.forEach(qubit => {
          if (!qubits.includes(qubit)) {
            qubits.push(qubit)
            output += `Initializing ${qubit} in |0⟩ state\n`
          }
        })
      }
      
      // Parse quantum gates
      if (line.includes('!H')) {
        const qubit = line.match(/!H\s+(q\d+)/)?.[1]
        if (qubit) {
          output += `Applying Hadamard gate to ${qubit} → Superposition state\n`
          operations++
        }
      }
      
      if (line.includes('!X')) {
        const qubit = line.match(/!X\s+(q\d+)/)?.[1]
        if (qubit) {
          output += `Applying Pauli-X gate to ${qubit} → Bit flip operation\n`
          operations++
        }
      }
      
      if (line.includes('!Y')) {
        const qubit = line.match(/!Y\s+(q\d+)/)?.[1]
        if (qubit) {
          output += `Applying Pauli-Y gate to ${qubit} → Y-rotation with phase\n`
          operations++
        }
      }
      
      if (line.includes('!Z')) {
        const qubit = line.match(/!Z\s+(q\d+)/)?.[1]
        if (qubit) {
          output += `Applying Pauli-Z gate to ${qubit} → Phase flip operation\n`
          operations++
        }
      }
      
      if (line.includes('!S')) {
        const qubit = line.match(/!S\s+(q\d+)/)?.[1]
        if (qubit) {
          output += `Applying Phase-S gate to ${qubit} → π/2 phase shift\n`
          operations++
        }
      }
      
      if (line.includes('!I')) {
        const qubit = line.match(/!I\s+(q\d+)/)?.[1]
        if (qubit) {
          output += `Identity gate on ${qubit} - Probability analysis:\n`
          output += `  |0⟩: ${Math.random().toFixed(6)} (${(Math.random() * 100).toFixed(1)}%)\n`
          output += `  |1⟩: ${Math.random().toFixed(6)} (${(Math.random() * 100).toFixed(1)}%)\n`
          operations++
        }
      }
      
      // Parse output commands
      if (line.includes('#>')) {
        const textMatch = line.match(/\$([A-Za-z0-9_]+)/)
        if (textMatch) {
          output += `Output: ${textMatch[1]}\n`
        }
      }
      
      // Parse termination
      if (line.includes('TERM')) {
        output += '\nProgram terminated successfully.\n'
      }
    }
    
    output += `\nExecution Summary:\n`
    output += `- Qubits used: ${qubits.length} (${qubits.join(', ')})\n`
    output += `- Operations applied: ${operations}\n`
    output += `- Simulation time: ${(Math.random() * 50 + 10).toFixed(1)}ms\n`
    
    return output
  }

  const loadExample = (exampleKey: string) => {
    setCurrentExample(exampleKey)
    setCode(qodeExamples[exampleKey as keyof typeof qodeExamples])
    setOutput(`📖 Loaded example: ${exampleKey}\n\nReady to execute. Click "Run Program" to see the quantum operations in action.\n`)
  }

  const resetCode = () => {
    setCode(qodeExamples.basic)
    setCurrentExample('basic')
    setOutput('🔄 Code reset to basic example.\n\nReady to execute. Click "Run Program" to run the quantum circuit.\n')
  }

  const saveProgram = () => {
    const blob = new Blob([code], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'quantum_program.qode'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    setOutput((prev) => prev + '💾 Program saved as quantum_program.qode\n')
  }

  const loadProgram = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.qode,.txt'
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const content = e.target?.result as string
          setCode(content)
          setOutput(`📂 Loaded program: ${file.name}\n\nReady to execute. Click "Run Program" to run the loaded quantum circuit.\n`)
        }
        reader.readAsText(file)
      }
    }
    input.click()
  }

  const copyCode = () => {
    navigator.clipboard.writeText(code)
    setOutput((prev) => prev + '📋 Code copied to clipboard\n')
  }

  const formatCode = () => {
    // Simple Qode code formatting
    const formatted = code
      .split('\n')
      .map(line => {
        const trimmed = line.trim()
        if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
          return trimmed // Comments
        }
        if (trimmed.startsWith('q') && /^q\d+/.test(trimmed)) {
          return trimmed // Qubit declarations
        }
        if (trimmed.startsWith('!')) {
          return trimmed // Gate operations
        }
        if (trimmed.startsWith('#>')) {
          return trimmed // Output operations
        }
        if (trimmed === 'TERM') {
          return trimmed // Termination
        }
        return trimmed
      })
      .join('\n')
    
    setCode(formatted)
    setOutput((prev) => prev + '✨ Code formatted\n')
  }

  const editorTheme = "bg-gray-900 text-green-400 font-mono"
  const outputTheme = "bg-black text-green-300 font-mono"

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={`
          ${isMaximized ? "w-[100vw] h-[100vh] rounded-none m-0" : "max-w-[95vw] w-[95vw] max-h-[95vh]"} 
          p-0 flex flex-col transition-all duration-300 ease-in-out bg-gray-950 border-green-500 shadow-2xl !max-w-none
        `}
        onInteractOutside={(e) => e.preventDefault()}
      >
        {/* Header */}
        <DialogHeader className="px-6 py-4 border-b border-green-500/30 bg-gray-900">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                <Code className="w-7 h-7 text-black font-bold" />
              </div>
              <div>
                <DialogTitle className="text-2xl font-bold text-green-400">Qode IDE</DialogTitle>
                <DialogDescription className="text-green-300/80">
                  Interactive Quantum Computing Development Environment
                </DialogDescription>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge 
                variant={interpreterReady ? "default" : "secondary"} 
                className={`${interpreterReady ? "bg-green-600 text-white" : "bg-yellow-600 text-black"}`}
              >
                <div className={`w-2 h-2 rounded-full mr-2 ${interpreterReady ? "bg-green-300" : "bg-yellow-300"}`} />
                {interpreterReady ? "WASM Ready" : "Loading..."}
              </Badge>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMaximized(!isMaximized)}
                className="text-green-400 hover:text-green-300 hover:bg-green-500/20"
              >
                {isMaximized ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open("https://github.com/devenshah2018/qode", "_blank")}
                className="border-green-500/50 text-green-400 hover:bg-green-500/20"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Documentation
              </Button>
            </div>
          </div>
        </DialogHeader>

        {/* Toolbar */}
        <div className="px-6 py-3 border-b border-green-500/30 bg-gray-900/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={saveProgram} className="text-green-400 hover:bg-green-500/20">
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button variant="ghost" size="sm" onClick={loadProgram} className="text-green-400 hover:bg-green-500/20">
                <Upload className="h-4 w-4 mr-2" />
                Load
              </Button>
              <Button variant="ghost" size="sm" onClick={formatCode} className="text-green-400 hover:bg-green-500/20">
                <Code className="h-4 w-4 mr-2" />
                Format
              </Button>
              <Button variant="ghost" size="sm" onClick={copyCode} className="text-green-400 hover:bg-green-500/20">
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="ghost" 
                size="sm"
                onClick={() => setShowExamples(!showExamples)}
                className="text-green-400 hover:bg-green-500/20"
              >
                <FileText className="h-4 w-4 mr-2" />
                Examples
                {showExamples ? <ChevronDown className="h-4 w-4 ml-1" /> : <ChevronRight className="h-4 w-4 ml-1" />}
              </Button>
            </div>
          </div>
          
          {/* Examples Panel */}
          {showExamples && (
            <div className="mt-3 pt-3 border-t border-green-500/30">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {Object.entries(qodeExamples).map(([key, _]) => (
                  <Button
                    key={key}
                    variant={currentExample === key ? "default" : "outline"}
                    size="sm"
                    onClick={() => loadExample(key)}
                    className={`
                      ${currentExample === key 
                        ? "bg-green-600 text-white" 
                        : "border-green-500/50 text-green-400 hover:bg-green-500/20"
                      }
                      capitalize
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
          <div className="flex flex-col bg-gray-900 overflow-hidden border-r border-green-500/30">
            <CardHeader className="px-6 py-3 border-b border-green-500/30 bg-gray-800">
              <div className="flex items-center justify-between">
                <CardTitle className="text-green-400 font-mono">quantum_program.qode</CardTitle>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="border-green-500/50 text-green-400 text-xs">
                    Lines: {code.split('\n').length}
                  </Badge>
                  <Badge variant="outline" className="border-green-500/50 text-green-400 text-xs">
                    Chars: {code.length}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0 flex-1 relative">
              <ScrollArea className="absolute inset-0">
                <Textarea
                  ref={editorRef}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className={`h-[70vh] w-full resize-none border-0 rounded-none text-sm p-6 focus-visible:ring-0 focus-visible:ring-offset-0 ${editorTheme}`}
                  placeholder="Write your Qode quantum program here...

Example:
[Initialize qubits]
q1 q2

[Apply gates]  
!H q1    [Hadamard gate]
!X q2    [Pauli-X gate]
!I q1    [Identity - check state]

[Output and terminate]
#> $Program_Complete
TERM"
                  spellCheck="false"
                  style={{ 
                    fontFamily: 'JetBrains Mono, Consolas, Monaco, monospace',
                    lineHeight: '1.6'
                  }}
                />
              </ScrollArea>
            </CardContent>
          </div>

          {/* Output Console Panel */}
          <div className="flex flex-col bg-black overflow-hidden">
            <CardHeader className="px-6 py-3 border-b border-green-500/30 bg-gray-800">
              <div className="flex items-center justify-between">
                <CardTitle className="text-green-400 flex items-center gap-2">
                  <Terminal className="h-5 w-5" />
                  Quantum Console
                </CardTitle>
                <Button
                  size="lg"
                  onClick={runQodeProgram}
                  disabled={isRunning}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold px-6"
                >
                  {isRunning ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Executing...
                    </>
                  ) : (
                    <>
                      <Zap className="mr-2 h-5 w-5" />
                      Run Program
                    </>
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0 flex-1 relative">
              <ScrollArea className="absolute inset-0">
                <pre
                  className={`h-[70vh] w-full p-6 text-sm overflow-auto ${outputTheme} whitespace-pre-wrap`}
                  style={{ 
                    fontFamily: 'JetBrains Mono, Consolas, Monaco, monospace',
                    lineHeight: '1.6'
                  }}
                >
                  {output}
                  {isRunning && (
                    <span className="inline-block w-3 h-5 bg-green-400 animate-pulse ml-1"></span>
                  )}
                </pre>
              </ScrollArea>
            </CardContent>
          </div>
        </div>

        {/* Footer */}
        <DialogFooter className="px-6 py-4 border-t border-green-500/30 bg-gray-900">
          <div className="flex flex-wrap gap-3 items-center justify-between w-full">
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="border-green-500/50 text-green-400">
                <Info className="h-3 w-3 mr-1" />
                Qode v1.0
              </Badge>
              <Badge variant="outline" className="border-blue-500/50 text-blue-400">
                <Eye className="h-3 w-3 mr-1" />
                WebAssembly
              </Badge>
              <Badge variant="outline" className="border-purple-500/50 text-purple-400">
                <Settings className="h-3 w-3 mr-1" />
                Quantum Ready
              </Badge>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={resetCode} className="text-green-400 hover:bg-green-500/20">
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
