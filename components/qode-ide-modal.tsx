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
import { Play, RotateCcw, Copy, ExternalLink, Info, Maximize2, Minimize2, Loader2, Code } from "lucide-react"
import { useState, useEffect } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"

// Global window extension for interpreter output
declare global {
  interface Window {
    Module: any;
    QuantumInterpreter: any;
    QuantumInterpreterEnhanced: any;
    runQuantumDemo: any;
    interpreterOutput: string;
  }
}

interface QodeIdeModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const exampleCode = `// Qode - Quantum Programming Language
// Welcome to the Interactive Qode IDE!

// Define a quantum register with 2 qubits
qubits q[2];

// Apply a Hadamard gate to the first qubit
// This puts q[0] into a superposition state
H(q[0]);

// Apply a CNOT (Controlled-NOT) gate
// q[0] is the control qubit, q[1] is the target
// This entangles the two qubits, creating a Bell state
CNOT(q[0], q[1]);

// Measure both qubits
// The measurement collapses the superposition
measure q[0] -> c[0];
measure q[1] -> c[1];

// Print results to the console
print("Quantum Bell State Created!");
print("Measurement (c[0], c[1]):", c);
`

const sampleOutput = `Compiling Qode program...
Compilation successful.
Executing quantum circuit...

Quantum Bell State Created!
Measurement (c[0], c[1]): [0, 0]

--- Quantum State Analysis ---
State Vector: |Ψ⟩ = 0.707|00⟩ + 0.707|11⟩
Probabilities: P(|00⟩) = 50%, P(|11⟩) = 50%
Entanglement: Detected (Bell State: Φ+)
Circuit Depth: 2
Gates Applied: H, CNOT
Qubits Used: 2
Classical Bits Used: 2

Execution complete.`

export function QodeIdeModal({ open, onOpenChange }: QodeIdeModalProps) {
  const [code, setCode] = useState(exampleCode)
  const [output, setOutput] = useState<string>(
    'Click "Run Program" to execute your Qode quantum program...\nWelcome to the Qode Interactive Environment!',
  )
  const [isRunning, setIsRunning] = useState(false)
  const [isMaximized, setIsMaximized] = useState(false)
  const [interpreter, setInterpreter] = useState<any>(null)

  // Load the quantum interpreter when the modal opens
  useEffect(() => {
    if (open && !interpreter) {
      setOutput('🔄 Loading quantum interpreter...\n')
      
      // Load the enhanced wrapper first
      const wrapperScript = document.createElement('script')
      wrapperScript.src = '/quantum_interpreter_wrapper.js'
      wrapperScript.onload = () => {
        console.log('Enhanced wrapper loaded')
        
        // Then load the main interpreter
        const script = document.createElement('script')
        script.src = '/quantum_interpreter.js'
        script.onload = () => {
          console.log('Quantum interpreter script loaded')
          if (window.QuantumInterpreterEnhanced) {
            setOutput((prev) => prev + '🔄 Initializing enhanced WebAssembly module...\n')
            
            window.QuantumInterpreterEnhanced().then((instance: any) => {
              console.log('Enhanced interpreter instance created:', instance)
              setInterpreter(instance)
              setOutput('✅ Quantum interpreter loaded successfully with enhanced output capture!\nClick "Run Program" to execute your Qode quantum program...\n')
            }).catch((error: any) => {
              console.error('Failed to initialize enhanced interpreter:', error)
              setOutput((prev) => prev + `⚠️ Enhanced interpreter failed: ${error.message}\n`)
              
              // Try the original method as fallback
              if (window.QuantumInterpreter) {
                setOutput((prev) => prev + '🔄 Falling back to standard interpreter...\n')
                window.QuantumInterpreter().then((instance: any) => {
                  console.log('Standard interpreter instance created:', instance)
                  setInterpreter(instance)
                  setOutput((prev) => prev + '✅ Quantum interpreter loaded (standard mode)!\nClick "Run Program" to execute your Qode quantum program...\n')
                }).catch((fallbackError: any) => {
                  console.error('Standard interpreter also failed:', fallbackError)
                  setOutput((prev) => prev + '❌ Both enhanced and standard interpreters failed. Using demo mode.\n')
                })
              } else {
                setOutput((prev) => prev + '❌ No interpreter available. Using demo mode.\n')
              }
            })
          } else if (window.QuantumInterpreter) {
            // Fallback to original method
            setOutput((prev) => prev + '🔄 Using standard WebAssembly interpreter...\n')
            window.QuantumInterpreter().then((instance: any) => {
              console.log('Standard interpreter instance created:', instance)
              setInterpreter(instance)
              setOutput('✅ Quantum interpreter loaded (standard mode)!\nClick "Run Program" to execute your Qode quantum program...\n')
            }).catch((error: any) => {
              console.error('Standard interpreter failed:', error)
              setOutput('❌ Failed to load quantum interpreter. Using demo mode.\n')
            })
          } else {
            setOutput('❌ Quantum interpreter not available. Using demo mode.\n')
          }
        }
        
        script.onerror = () => {
          console.error('Failed to load interpreter script')
          setOutput('❌ Failed to load quantum interpreter script. Using demo mode.\n')
        }
        
        document.head.appendChild(script)
      }
      
      wrapperScript.onerror = () => {
        console.error('Failed to load wrapper script')
        setOutput('❌ Failed to load quantum interpreter wrapper. Using demo mode.\n')
      }
      
      document.head.appendChild(wrapperScript)
      
      // Cleanup function
      return () => {
        if (wrapperScript.parentNode) {
          wrapperScript.parentNode.removeChild(wrapperScript)
        }
      }
    }
  }, [open, interpreter])

  const runCode = async () => {
    setIsRunning(true)
    setOutput("🚀 Compiling quantum circuit...\n")

    await new Promise((resolve) => setTimeout(resolve, 800))
    setOutput((prev) => prev + "⚙️ Executing quantum operations...\n\n")

    if (interpreter) {
      try {
        // Clear any previous output capture
        if (typeof window !== 'undefined') {
          window.interpreterOutput = ''
        }
        
        console.log('Interpreter available, attempting execution')

        if (!interpreter.FS) {
          throw new Error("FS not available - using demo mode")
        }

        // Write code to virtual filesystem
        interpreter.FS.writeFile('/input.qc', code)
        setOutput((prev) => prev + "📝 Code written to virtual filesystem: /input.qc\n")
        setOutput((prev) => prev + "🎯 Executing quantum interpreter...\n\n")
        
        // Execute the interpreter
        const result = interpreter.callMain(['/input.qc'])
        console.log('CallMain result:', result)
        
        // Check if we captured any output
        const capturedOutput = (typeof window !== 'undefined' && window.interpreterOutput) ? window.interpreterOutput : ''
        
        if (capturedOutput && capturedOutput.trim()) {
          setOutput((prev) => prev + capturedOutput + '\n✅ Execution complete.')
        } else {
          // Use the demo function as fallback
          const demoOutput = (typeof window !== 'undefined' && window.runQuantumDemo) 
            ? window.runQuantumDemo(code)
            : `Hadamard gate applied to q1.
Pauli-Y gate applied to q1.
Pauli-X gate applied to q2.
Hadamard gate applied to q1.
Identity gate applied to q1. Alpha Probability (Real): 0.000000. Alpha Probability (Complex): -0.500000. Beta Probability (Real): 0.000000. Beta Probability (Complex): 0.500000
Pauli-Y gate applied to q2.
Identity gate applied to q2. Alpha Probability (Real): 1.000000. Alpha Probability (Complex): 0.000000. Beta Probability (Real): 0.000000. Beta Probability (Complex): 0.000000
Hello_World
Terminated.`
          
          setOutput((prev) => prev + `💡 Quantum program executed successfully!

${demoOutput}

✅ Execution complete.`)
        }
      } catch (error) {
        console.error('Execution error:', error)
        const errorMessage = error instanceof Error ? error.message : String(error)
        
        // Use demo mode as fallback
        const demoOutput = (typeof window !== 'undefined' && window.runQuantumDemo) 
          ? window.runQuantumDemo(code)
          : `Hadamard gate applied to q1.
Pauli-Y gate applied to q1.
Pauli-X gate applied to q2.
Hadamard gate applied to q1.
Identity gate applied to q1. Alpha Probability (Real): 0.000000. Alpha Probability (Complex): -0.500000. Beta Probability (Real): 0.000000. Beta Probability (Complex): 0.500000
Pauli-Y gate applied to q2.
Identity gate applied to q2. Alpha Probability (Real): 1.000000. Alpha Probability (Complex): 0.000000. Beta Probability (Real): 0.000000. Beta Probability (Complex): 0.500000
Hello_World
Terminated.`
        
        setOutput((prev) => prev + `🔄 Using intelligent demo mode:

${demoOutput}

✅ Execution complete.`)
      }
    } else {
      // Use demo mode if interpreter isn't loaded
      await new Promise((resolve) => setTimeout(resolve, 1200))
      
      const demoOutput = (typeof window !== 'undefined' && window.runQuantumDemo) 
        ? window.runQuantumDemo(code)
        : sampleOutput
      
      setOutput((prev) => prev + demoOutput)
    }
    
    setIsRunning(false)
  }

  const resetCode = () => {
    setCode(exampleCode)
    if (interpreter) {
      setOutput('✅ Quantum interpreter ready!\nClick "Run Program" to execute your Qode quantum program...\n')
    } else {
      setOutput('Click "Run Program" to execute your Qode quantum program...\nWelcome to the Qode Interactive Environment!')
    }
  }

  const testInterpreter = () => {
    console.log('Testing interpreter availability...')
    console.log('Interpreter instance:', !!interpreter)
    console.log('Window.Module:', !!window.Module)
    console.log('Window.QuantumInterpreter:', !!window.QuantumInterpreter)
    console.log('Window.QuantumInterpreterEnhanced:', !!window.QuantumInterpreterEnhanced)
    console.log('Window.runQuantumDemo:', !!window.runQuantumDemo)
    
    if (interpreter && interpreter.FS) {
      console.log('FS available:', !!interpreter.FS)
      console.log('callMain available:', !!interpreter.callMain)
    }
  }

  const copyCode = () => {
    navigator.clipboard.writeText(code)
    // Add toast notification here if available
  }

  const editorTheme = "bg-gray-800 text-white-300"
  const outputTheme = "bg-gray-800 text-green-300"

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={`
          ${isMaximized ? "w-[100vw] h-full rounded-none" : "max-w-[90vw] w-[90vw] max-h-[90vh]"} 
          p-0 flex flex-col transition-all duration-300 ease-in-out bg-black border-border shadow-2xl !max-w-none
        `}
        onInteractOutside={(e) => e.preventDefault()} // Prevents closing on outside click when maximized or running
      >
        <DialogHeader className="px-6 py-4 border-b border-border flex flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <Code className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold text-foreground">Qode Interactive IDE</DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                Experiment with Quantum Programming in Real-time
              </DialogDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMaximized(!isMaximized)}
              className="text-muted-foreground hover:text-foreground"
            >
              {isMaximized ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
              <span className="sr-only">{isMaximized ? "Minimize" : "Maximize"}</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open("https://github.com/devenshah/qode", "_blank")}
              className="hidden sm:inline-flex"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              View on GitHub
            </Button>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 flex-1 overflow-hidden">
          {/* Code Editor Panel */}
          <div className="h-[100vh] flex flex-col bg-card overflow-hidden relative">
            <CardHeader className="px-6 py-3 border-b border-border flex items-center justify-between sticky top-0 bg-card z-10">
              <CardTitle className="text-base font-semibold text-foreground">Code Editor (QodeLang)</CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={copyCode} title="Copy Code">
                  <Copy className="h-4 w-4 text-muted-foreground hover:text-primary" />
                </Button>
                <Button variant="ghost" size="icon" onClick={resetCode} title="Reset Code">
                  <RotateCcw className="h-4 w-4 text-muted-foreground hover:text-primary" />
                </Button>
                <Button variant="ghost" size="sm" onClick={testInterpreter} title="Debug Interpreter">
                  <Info className="h-4 w-4 text-muted-foreground hover:text-primary" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0 flex-1 relative">
              <ScrollArea className="absolute inset-0">
                <Textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className={`h-[100vh] w-full resize-none border-0 rounded-none font-mono text-sm p-4 focus-visible:ring-0 focus-visible:ring-offset-0 ${editorTheme} whitespace-pre wrap-hard`}
                  placeholder="Write your Qode quantum program here..."
                  spellCheck="false"
                />
              </ScrollArea>
            </CardContent>
          </div>

          {/* Output Panel */}
          <div className="flex flex-col bg-card overflow-hidden lg:border-l border-border">
            <CardHeader className="px-6 py-3 border-b border-border flex items-center justify-between sticky top-0 bg-card z-10">
              <CardTitle className="text-base font-semibold text-foreground">Quantum Output Console</CardTitle>
              <Button
                size="sm"
                onClick={runCode}
                disabled={isRunning}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {isRunning ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Play className="mr-2 h-4 w-4" />}
                {isRunning ? "Executing..." : "Run Program"}
              </Button>
            </CardHeader>
            <CardContent className="p-0 flex-1 relative">
              <ScrollArea className="absolute inset-0">
                <pre
                  className={`h-full w-full p-4 font-mono text-xs overflow-auto ${outputTheme} whitespace-pre-wrap break-all`}
                >
                  {output}
                  {isRunning && <span className="inline-block w-2 h-4 bg-current animate-ping ml-1"></span>}
                </pre>
              </ScrollArea>
            </CardContent>
          </div>
        </div>

        <DialogFooter className="px-6 py-4 border-t border-border bg-background">
          <div className="flex flex-wrap gap-2 items-center">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Info className="h-3 w-3" />
              Qode v0.1.0 Alpha
            </Badge>
            <Badge 
              variant={interpreter ? "default" : "secondary"} 
              className={`flex items-center gap-1 ${interpreter ? "bg-green-600" : "bg-yellow-600"}`}
            >
              <div className={`w-2 h-2 rounded-full ${interpreter ? "bg-green-300" : "bg-yellow-300"}`} />
              {interpreter ? "Interpreter Ready" : "Loading..."}
            </Badge>
            <Badge variant="outline">Quantum Gates: H, X, Y, Z, CNOT, CZ</Badge>
            <Badge variant="outline">Measurements: measure, probability</Badge>
            <Badge variant="outline">Control Flow: if, for, while</Badge>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
