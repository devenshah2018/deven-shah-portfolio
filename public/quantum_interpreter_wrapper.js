// Enhanced Quantum Interpreter Wrapper with Output Capture
// This wrapper ensures proper output capture for the browser environment

// Global output capture
window.interpreterOutput = '';

// Enhanced Module factory that properly configures output capture
window.QuantumInterpreterEnhanced = function() {
  return new Promise((resolve, reject) => {
    // Reset output capture
    window.interpreterOutput = '';
    
    // Check if the original QuantumInterpreter is available
    if (typeof window.QuantumInterpreter !== 'function') {
      reject(new Error('QuantumInterpreter function not available'));
      return;
    }
    
    // Module configuration with proper output capture
    const moduleConfig = {
      // Output capture functions
      print: function(text) {
        // Convert ASCII codes to readable text if needed
        if (typeof text === 'number') {
          window.interpreterOutput += String.fromCharCode(text);
        } else if (Array.isArray(text)) {
          // Handle array of character codes
          window.interpreterOutput += text.map(code => String.fromCharCode(code)).join('');
        } else if (typeof text === 'string') {
          window.interpreterOutput += String.fromCharCode(+text);
        } else {
          window.interpreterOutput += text;
        }
        console.log("Type of text:", typeof text, "Value:", text);
        console.log('Captured output:', text);
      },
      
      printErr: function(text) {
        if (typeof text === 'number') {
          window.interpreterOutput += String.fromCharCode(text);
        } else if (Array.isArray(text)) {
          window.interpreterOutput += text.map(code => String.fromCharCode(code)).join('');
        } else {
          window.interpreterOutput += text;
        }
        console.error('Captured error:', text);
      },
      
      // Override stdout/stderr
      stdout: function(text) {
        console.log('WebAssembly stdout:', text);
        window.interpreterOutput += text + '\n';
      },
      
      stderr: function(text) {
        console.error('WebAssembly stderr:', text);
        window.interpreterOutput += 'ERROR: ' + text + '\n';
      },
      
      // Ready callback
      onRuntimeInitialized: function() {
        console.log('Quantum Interpreter WebAssembly runtime initialized');
      },
      
      // Error handling
      onAbort: function(what) {
        console.error('WebAssembly aborted:', what);
        window.interpreterOutput += 'ABORT: ' + what + '\n';
        reject(new Error('WebAssembly aborted: ' + what));
      },
      
      // File system configuration
      preRun: [],
      postRun: [],
      
      // Memory and performance settings
      INITIAL_MEMORY: 16777216, // 16MB
      ALLOW_MEMORY_GROWTH: true,
      
      // Emscripten settings
      locateFile: function(path, scriptDirectory) {
        // Ensure WASM file is loaded from correct location
        if (path.endsWith('.wasm')) {
          return '/quantum_interpreter.wasm';
        }
        return scriptDirectory + path;
      }
    };
    
    // Call the original QuantumInterpreter with our enhanced configuration
    try {
      window.QuantumInterpreter(moduleConfig).then((module) => {
        console.log('Enhanced interpreter module loaded:', module);
        
        // Wrap callMain to ensure output capture
        if (module.callMain) {
          const originalCallMain = module.callMain;
          module.callMain = function(args) {
            console.log('Calling main with args:', args);
            window.interpreterOutput = ''; // Reset before execution
            
            try {
              const result = originalCallMain.call(this, args);
              console.log('Main execution completed with result:', result);
              
              // Convert ASCII character codes to readable text
              if (window.interpreterOutput && typeof window.interpreterOutput === 'string') {
                // Check if output contains only numbers separated by newlines (ASCII codes)
                const lines = window.interpreterOutput.split('\n');
                let convertedOutput = '';
                
                for (const line of lines) {
                  const trimmedLine = line.trim();
                  // Check if line is a single number (ASCII code)
                  if (/^\d+$/.test(trimmedLine)) {
                    const charCode = parseInt(trimmedLine);
                    if (charCode >= 32 && charCode <= 126) { // Printable ASCII range
                      convertedOutput += String.fromCharCode(charCode);
                    } else if (charCode === 10) { // Newline
                      convertedOutput += '\n';
                    }
                  } else if (trimmedLine.length > 0) {
                    // Line contains non-ASCII-code content, keep as is
                    continue
                  }
                }
                
                // Update the output with converted text
                if (convertedOutput.length > 0) {
                  window.interpreterOutput = convertedOutput;
                }
              }
              
              console.log('Captured output:', window.interpreterOutput);
              return result;
            } catch (error) {
              console.error('Error in callMain:', error);
              window.interpreterOutput += 'EXECUTION ERROR: ' + error.message + '\n';
              throw error;
            }
          };
        }
        
        resolve(module);
      }).catch((error) => {
        console.error('Failed to initialize QuantumInterpreter:', error);
        reject(error);
      });
    } catch (error) {
      console.error('Failed to call QuantumInterpreter function:', error);
      reject(error);
    }
  });
};

// Fallback function for demo mode
window.runQuantumDemo = function(code) {
  console.log('Running quantum demo with code:', code);
  
  // Simulate quantum execution based on code content
  let output = '';
  
  // Parse the code for different quantum operations
  if (code.includes('H(q[0])') || code.includes('H(q1)')) {
    output += 'Hadamard gate applied to q1.\n';
  }
  
  if (code.includes('Y(q[0])') || code.includes('Y(q1)')) {
    output += 'Pauli-Y gate applied to q1.\n';
  }
  
  if (code.includes('X(q[1])') || code.includes('X(q2)')) {
    output += 'Pauli-X gate applied to q2.\n';
  }
  
  if (code.includes('CNOT')) {
    output += 'CNOT gate applied.\n';
  }
  
  if (code.includes('measure')) {
    output += 'Identity gate applied to q1. Alpha Probability (Real): 0.000000. Alpha Probability (Complex): -0.500000. Beta Probability (Real): 0.000000. Beta Probability (Complex): 0.500000\n';
    output += 'Identity gate applied to q2. Alpha Probability (Real): 1.000000. Alpha Probability (Complex): 0.000000. Beta Probability (Real): 0.000000. Beta Probability (Complex): 0.000000\n';
  }
  
  if (code.includes('print') || code.includes('Hello')) {
    output += 'Hello_World\n';
  }
  
  output += 'Terminated.\n';
  
  return output;
};

console.log('Quantum Interpreter Enhanced Wrapper loaded successfully');
