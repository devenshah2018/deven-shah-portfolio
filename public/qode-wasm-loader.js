// Qode WASM Interpreter Integration
// This module provides a complete interface for the Qode quantum programming language WASM interpreter

// Global output storage
window.qodeOutput = '';
window.qodeErrors = '';
window.qodeInterpreterReady = false;

// Enhanced WASM Module loader for Qode interpreter
window.createQodeInterpreter = function () {
  return new Promise((resolve, reject) => {
    // Initialize output capture
    window.qodeOutput = '';
    window.qodeErrors = '';

    // Check if interpreter is already loaded
    if (window.qodeInterpreterReady && window.executeQode) {
      console.log('Qode interpreter already loaded');
      resolve({
        executeQode: window.executeQode,
        executeQodeCode: window.executeQodeCode || window.executeQode,
        FS: window.Module ? window.Module.FS : null,
        ready: true,
      });
      return;
    }

    // Load the quantum interpreter JavaScript
    const script = document.createElement('script');
    script.src = '/quantum_interpreter.js';
    script.onload = async function () {
      console.log('Quantum interpreter script loaded');

      try {
        // Instantiate the Emscripten module with output capture
        console.log('Instantiating QuantumInterpreter module...');

        // Set up output capture before instantiating the module
        let capturedOutput = '';
        let capturedErrors = '';

        const module = await QuantumInterpreter({
          print: function (text) {
            console.log('WASM stdout:', text);
            capturedOutput += text + '\n';
            window.qodeOutput = capturedOutput;
          },
          printErr: function (text) {
            console.error('WASM stderr:', text);
            capturedErrors += text + '\n';
            window.qodeErrors = capturedErrors;
          },
        });

        console.log('QuantumInterpreter module instantiated:', module);

        // Set up global functions expected by the loader
        window.executeQode = function (code) {
          return new Promise(resolve => {
            try {
              // Reset output capture
              capturedOutput = '';
              capturedErrors = '';
              window.qodeOutput = '';
              window.qodeErrors = '';

              // Write the code to a file in the WASM filesystem
              if (module.FS) {
                // Ensure tmp directory exists
                try {
                  module.FS.mkdir('/tmp');
                } catch (e) {
                  // Directory might already exist
                }

                module.FS.writeFile('/tmp/program.qode', code);
                console.log('Code written to WASM filesystem');

                // Call the main function with the program file
                const result = module.callMain ? module.callMain(['/tmp/program.qode']) : 0;
                console.log('WASM callMain result:', result);

                // Get the captured output
                const output =
                  capturedOutput || window.qodeOutput || 'Program executed (no output captured)';
                const errors = capturedErrors || window.qodeErrors || '';

                console.log('Captured output:', output);
                console.log('Captured errors:', errors);

                resolve({
                  success: result === 0,
                  output: output,
                  errors: errors,
                  exitCode: result,
                });
              } else {
                throw new Error('WASM filesystem not available');
              }
            } catch (error) {
              console.error('WASM execution error:', error);
              resolve({
                success: false,
                output: capturedOutput || '',
                errors: error.toString(),
                exitCode: 1,
              });
            }
          });
        };

        window.executeQodeCode = window.executeQode;
        window.Module = module;
        window.qodeInterpreterReady = true;

        console.log('Qode interpreter is ready');
        resolve({
          executeQode: window.executeQode,
          executeQodeCode: window.executeQodeCode,
          FS: module.FS,
          ready: true,
          simulation: false, // Real WASM mode
        });
      } catch (error) {
        console.error('Failed to instantiate QuantumInterpreter:', error);
        // Fall back to simulation mode
        const fallbackModule = createFallbackModule();
        window.qodeInterpreterReady = true;
        resolve(fallbackModule);
      }
    };

    script.onerror = function (error) {
      console.error('Failed to load quantum interpreter script:', error);

      // Provide fallback simulation mode
      const fallbackModule = createFallbackModule();
      window.qodeInterpreterReady = true;
      resolve(fallbackModule);
    };

    document.head.appendChild(script);

    // Timeout fallback
    setTimeout(() => {
      if (!window.qodeInterpreterReady) {
        console.warn('Qode interpreter loading timeout, using fallback');
        const fallbackModule = createFallbackModule();
        window.qodeInterpreterReady = true;
        resolve(fallbackModule);
      }
    }, 10000); // 10 second timeout
  });
};

// Create fallback simulation module
function createFallbackModule() {
  console.log('Creating fallback simulation module');

  // Mock file system
  const mockFS = {
    _files: {},
    writeFile: function (filename, content) {
      console.log('Mock FS: Writing file', filename);
      this._files[filename] = content;
    },
    readFile: function (filename) {
      console.log('Mock FS: Reading file', filename);
      return this._files[filename] || '';
    },
    analyzePath: function (path) {
      return { exists: this._files.hasOwnProperty(path) };
    },
    mkdir: function (path) {
      console.log('Mock FS: Creating directory', path);
    },
  };

  // Mock execute function
  const executeQode = function (code) {
    return new Promise(resolve => {
      console.log('Simulating Qode execution...');

      // Reset output
      window.qodeOutput = '';
      window.qodeErrors = '';

      // Simulate quantum execution
      setTimeout(() => {
        const output = simulateQodeExecution(code);
        window.qodeOutput = output;

        resolve({
          success: true,
          output: output,
          errors: '',
          exitCode: 0,
        });
      }, 500); // Simulate processing delay
    });
  };

  // Set global functions
  window.executeQode = executeQode;
  window.executeQodeCode = executeQode;

  return {
    executeQode: executeQode,
    executeQodeCode: executeQode,
    FS: mockFS,
    ready: true,
    simulation: true,
  };
}

// Simulate Qode execution for demo purposes
function simulateQodeExecution(code) {
  const lines = code.split('\n').filter(line => line.trim() && !line.trim().startsWith('['));
  let output = 'QODE SIMULATION MODE\n';
  output += '====================\n\n';

  const qubits = new Map();
  let currentQubit = null;

  lines.forEach((line, index) => {
    const trimmed = line.trim();
    output += `Line ${index + 1}: ${trimmed}\n`;

    if (trimmed.startsWith('q')) {
      // Qubit declaration
      const match = trimmed.match(/q(\w+)/);
      if (match) {
        const qubitName = match[1];
        qubits.set(qubitName, { state: '|0⟩', operations: [] });
        currentQubit = qubitName;
        output += `  → Qubit '${qubitName}' initialized in state |0⟩\n`;
      }
    } else if (trimmed.startsWith('!')) {
      // Quantum gate operation
      const gate = trimmed.substring(1);
      if (currentQubit && qubits.has(currentQubit)) {
        const qubit = qubits.get(currentQubit);
        qubit.operations.push(gate);

        switch (gate) {
          case 'H':
            qubit.state = '(|0⟩ + |1⟩)/√2';
            output += `  → Applied Hadamard gate to qubit '${currentQubit}'\n`;
            output += `  → Qubit '${currentQubit}' is now in superposition: ${qubit.state}\n`;
            break;
          case 'X':
            qubit.state = qubit.state === '|0⟩' ? '|1⟩' : '|0⟩';
            output += `  → Applied Pauli-X gate to qubit '${currentQubit}'\n`;
            output += `  → Qubit '${currentQubit}' state: ${qubit.state}\n`;
            break;
          case 'Y':
            output += `  → Applied Pauli-Y gate to qubit '${currentQubit}'\n`;
            output += `  → Qubit '${currentQubit}' phase rotated\n`;
            break;
          case 'Z':
            output += `  → Applied Pauli-Z gate to qubit '${currentQubit}'\n`;
            output += `  → Qubit '${currentQubit}' phase flipped\n`;
            break;
          case 'S':
            output += `  → Applied S gate to qubit '${currentQubit}'\n`;
            output += `  → Qubit '${currentQubit}' phase shifted by π/2\n`;
            break;
          case 'I':
            output += `  → Applied Identity gate to qubit '${currentQubit}'\n`;
            output += `  → Qubit '${currentQubit}' unchanged\n`;
            break;
          default:
            output += `  → Unknown gate '${gate}'\n`;
        }
      }
    } else if (trimmed.startsWith('#')) {
      // Built-in function
      const func = trimmed.substring(1);
      if (func === 'measure') {
        if (currentQubit && qubits.has(currentQubit)) {
          const measurement = Math.random() < 0.5 ? '0' : '1';
          output += `  → Measuring qubit '${currentQubit}': ${measurement}\n`;
          qubits.get(currentQubit).state = `|${measurement}⟩`;
        }
      } else if (func === 'show') {
        output += `  → Displaying quantum state:\n`;
        qubits.forEach((qubit, name) => {
          output += `    Qubit ${name}: ${qubit.state}\n`;
        });
      }
    } else if (trimmed.startsWith('$')) {
      // Text output
      const text = trimmed.substring(1);
      output += `  → Output: ${text}\n`;
    } else if (trimmed === 'TERM') {
      output += 'Program terminated successfully.\n';
    }

    output += '\n';
  });

  output += '\n=== QUANTUM STATE SUMMARY ===\n';
  if (qubits.size === 0) {
    output += 'No qubits were declared.\n';
  } else {
    qubits.forEach((qubit, name) => {
      output += `Qubit ${name}: ${qubit.state}\n`;
      if (qubit.operations.length > 0) {
        output += `  Operations applied: ${qubit.operations.join(', ')}\n`;
      }
    });
  }

  return output;
}

// Qode syntax validation
window.validateQodeCode = function (code) {
  const lines = code.split('\n');
  const errors = [];
  const warnings = [];
  const declaredQubits = new Set();

  lines.forEach((line, index) => {
    const trimmed = line.trim();
    const lineNum = index + 1;

    if (!trimmed || trimmed.startsWith('[')) return; // Skip empty lines and comments

    // Check qubit declarations
    if (trimmed.startsWith('q')) {
      const match = trimmed.match(/^q(\w+)$/);
      if (!match) {
        errors.push(`Line ${lineNum}: Invalid qubit declaration syntax. Use 'qNAME' format.`);
      } else {
        const qubitName = match[1];
        if (declaredQubits.has(qubitName)) {
          warnings.push(`Line ${lineNum}: Qubit '${qubitName}' already declared.`);
        }
        declaredQubits.add(qubitName);
      }
    }
    // Check quantum gates
    else if (trimmed.startsWith('!')) {
      const gate = trimmed.substring(1);
      const validGates = ['H', 'X', 'Y', 'Z', 'S', 'I'];
      if (!validGates.includes(gate)) {
        errors.push(
          `Line ${lineNum}: Unknown quantum gate '${gate}'. Valid gates: ${validGates.join(', ')}`
        );
      }
    }
    // Check built-in functions
    else if (trimmed.startsWith('#')) {
      const func = trimmed.substring(1);
      const validFunctions = ['measure', 'show', 'reset'];
      if (!validFunctions.includes(func)) {
        warnings.push(
          `Line ${lineNum}: Unknown built-in function '${func}'. Valid functions: ${validFunctions.join(', ')}`
        );
      }
    }
    // Check text output
    else if (trimmed.startsWith('$')) {
      // Text output is always valid
    }
    // Check termination
    else if (trimmed === 'TERM') {
      // Termination is valid
    } else {
      warnings.push(`Line ${lineNum}: Unrecognized syntax '${trimmed}'`);
    }
  });

  return {
    isValid: errors.length === 0,
    errors: errors,
    warnings: warnings,
    stats: {
      lines: lines.length,
      qubits: declaredQubits.size,
      operations: lines.filter(line => line.trim().startsWith('!')).length,
    },
  };
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function () {
    console.log('Qode WASM loader ready');
  });
} else {
  console.log('Qode WASM loader ready');
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { createQodeInterpreter };
}
