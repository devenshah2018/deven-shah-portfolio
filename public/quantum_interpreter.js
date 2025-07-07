// Quantum Interpreter WASM Loader
// Auto-generated glue code for quantum_interpreter.wasm

var Module = typeof Module !== 'undefined' ? Module : {};

// Output capture for Qode IDE
var qodeOutput = '';
var qodeErrors = '';

Module['print'] = function(text) {
  console.log('[Qode]:', text);
  qodeOutput += text + '\n';
  if (typeof window !== 'undefined' && window.qodeOutput !== undefined) {
    window.qodeOutput += text + '\n';
  }
};

Module['printErr'] = function(text) {
  console.error('[Qode Error]:', text);
  qodeErrors += text + '\n';
  if (typeof window !== 'undefined' && window.qodeErrors !== undefined) {
    window.qodeErrors += text + '\n';
  }
};

// WASM loading configuration
Module['locateFile'] = function(path) {
  if (path.endsWith('.wasm')) {
    return '/quantum_interpreter.wasm';
  }
  return path;
};

// Runtime initialization
Module['onRuntimeInitialized'] = function() {
  console.log('Quantum interpreter initialized');
  
  // Initialize file system
  if (Module.FS) {
    try {
      if (!Module.FS.analyzePath('/tmp').exists) {
        Module.FS.mkdir('/tmp');
      }
    } catch (e) {
      console.log('Temp directory setup:', e.message);
    }
  }
  
  // Expose executeQode function globally
  if (typeof window !== 'undefined') {
    window.executeQode = function(code) {
      return new Promise((resolve, reject) => {
        try {
          // Reset output
          qodeOutput = '';
          qodeErrors = '';
          window.qodeOutput = '';
          window.qodeErrors = '';
          
          if (!Module.FS) {
            throw new Error('File system not available');
          }
          
          // Write code to file
          const filename = '/tmp/program.qode';
          Module.FS.writeFile(filename, code);
          
          // Execute the program
          const result = Module.ccall('execute_qode_file', 'number', ['string'], [filename]);
          
          // Collect output
          const output = qodeOutput || window.qodeOutput || '';
          const errors = qodeErrors || window.qodeErrors || '';
          
          resolve({
            success: result === 0,
            output: output,
            errors: errors,
            exitCode: result
          });
          
        } catch (error) {
          console.error('Qode execution error:', error);
          reject({
            success: false,
            output: qodeOutput || window.qodeOutput || '',
            errors: (qodeErrors || window.qodeErrors || '') + '\nExecution Error: ' + error.message,
            exitCode: -1
          });
        }
      });
    };
    
    // Alternative execution method for direct code
    window.executeQodeCode = function(code) {
      return new Promise((resolve, reject) => {
        try {
          // Reset output
          qodeOutput = '';
          qodeErrors = '';
          window.qodeOutput = '';
          window.qodeErrors = '';
          
          // Execute code directly if function is available
          let result;
          if (Module._execute_qode_string) {
            result = Module._execute_qode_string(code);
          } else if (Module.ccall) {
            // Try to execute via string function
            result = Module.ccall('execute_qode_string', 'number', ['string'], [code]);
          } else {
            throw new Error('No execution method available');
          }
          
          const output = qodeOutput || window.qodeOutput || '';
          const errors = qodeErrors || window.qodeErrors || '';
          
          resolve({
            success: result === 0,
            output: output,
            errors: errors,
            exitCode: result
          });
          
        } catch (error) {
          console.error('Direct execution error:', error);
          // Fallback to file-based execution
          window.executeQode(code).then(resolve).catch(reject);
        }
      });
    };
    
    window.qodeInterpreterReady = true;
    console.log('Qode interpreter functions exposed to window');
  }
};

// Error handling
Module['onAbort'] = function(what) {
  console.error('WASM aborted:', what);
  if (typeof window !== 'undefined' && window.qodeErrors !== undefined) {
    window.qodeErrors += 'ABORT: ' + what + '\n';
  }
};

// Memory configuration
Module['INITIAL_MEMORY'] = 16777216; // 16MB
Module['ALLOW_MEMORY_GROWTH'] = true;
Module['noExitRuntime'] = true;

// WebAssembly loading
function loadWasm() {
  return new Promise((resolve, reject) => {
    if (typeof WebAssembly === 'undefined') {
      reject(new Error('WebAssembly not supported'));
      return;
    }
    
    fetch('/quantum_interpreter.wasm')
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to fetch WASM: ${response.status}`);
        }
        return response.arrayBuffer();
      })
      .then(bytes => {
        Module['wasmBinary'] = bytes;
        
        // Create a script element to load the generated JS
        const script = document.createElement('script');
        script.onload = () => resolve(Module);
        script.onerror = () => reject(new Error('Failed to load WASM JS'));
        
        // For this demo, we'll initialize directly
        WebAssembly.instantiate(bytes, {
          env: {
            memory: new WebAssembly.Memory({ initial: 256 }),
            __memory_base: 0,
            __table_base: 0,
            table: new WebAssembly.Table({ initial: 0, element: 'anyfunc' }),
            abort: function() { console.error('WASM abort called'); }
          }
        }).then(wasmModule => {
          Module['asm'] = wasmModule.instance.exports;
          Module['ready'] = true;
          
          // Initialize FS if available
          if (typeof FS !== 'undefined') {
            Module.FS = FS;
          } else {
            // Create minimal FS mock for basic functionality
            Module.FS = {
              writeFile: function(path, data) {
                console.log('Writing file:', path, 'Size:', data.length);
                Module._stored_files = Module._stored_files || {};
                Module._stored_files[path] = data;
              },
              readFile: function(path) {
                Module._stored_files = Module._stored_files || {};
                return Module._stored_files[path] || '';
              },
              analyzePath: function(path) {
                Module._stored_files = Module._stored_files || {};
                return { exists: Module._stored_files.hasOwnProperty(path) };
              },
              mkdir: function(path) {
                console.log('Creating directory:', path);
              }
            };
          }
          
          // Call runtime initialized
          if (Module['onRuntimeInitialized']) {
            Module['onRuntimeInitialized']();
          }
          
          resolve(Module);
        }).catch(reject);
      })
      .catch(reject);
  });
}

// Auto-initialize if in browser
if (typeof window !== 'undefined') {
  window.qodeInterpreterReady = false;
  loadWasm().catch(error => {
    console.error('Failed to load WASM:', error);
    
    // Provide fallback simulation mode
    window.executeQode = function(code) {
      return Promise.resolve({
        success: true,
        output: 'SIMULATION MODE: Qode interpreter not available\nCode would execute:\n' + code + '\n\nSimulated quantum execution completed.',
        errors: '',
        exitCode: 0
      });
    };
    
    window.executeQodeCode = window.executeQode;
    window.qodeInterpreterReady = true;
    console.log('Fallback simulation mode enabled');
  });
}

// Export for Node.js if needed
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Module;
}
