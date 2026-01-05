'use client';

import { useEffect, useRef, useState } from 'react';

interface MermaidDiagramProps {
  chart: string;
}

export function MermaidDiagram({ chart }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;

    const renderMermaid = async () => {
      if (!containerRef.current) return;
      
      try {
        // Load Mermaid from CDN if not already loaded
        if (!(window as any).mermaid) {
          await new Promise<void>((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js';
            script.onload = () => resolve();
            script.onerror = () => reject(new Error('Failed to load Mermaid from CDN'));
            document.head.appendChild(script);
          });
        }

        const mermaid = (window as any).mermaid;
        
        if (!mermaid || typeof mermaid.initialize !== 'function') {
          throw new Error('Mermaid library not available');
        }
        
        // Initialize mermaid with dark theme (only once, use a global flag)
        const initKey = '__mermaid_initialized__';
        if (!(window as any)[initKey]) {
          // Add minimal CSS for basic styling
          const style = document.createElement('style');
          style.textContent = `
            .mermaid svg {
              max-width: 100%;
              height: auto;
            }
            .mermaid .node rect {
              min-width: 200px;
              min-height: 60px;
            }
            .mermaid .node foreignObject div {
              padding: 10px;
              text-align: center;
            }
          `;
          document.head.appendChild(style);
          
          mermaid.initialize({
            startOnLoad: false,
            theme: 'dark',
            flowchart: {
              useMaxWidth: true,
              htmlLabels: true,
              padding: 20,
              nodeSpacing: 50,
              rankSpacing: 80,
            },
            themeVariables: {
              // Background colors (slate-950, slate-900)
              background: '#020617',
              mainBkg: '#0f172a',
              secondBkg: '#1e293b',
              // Text colors (white, slate-200)
              primaryTextColor: '#ffffff',
              textColor: '#e2e8f0',
              // Border colors (slate-800)
              primaryBorderColor: '#1e293b',
              secondaryColor: '#1e293b',
              tertiaryColor: '#0f172a',
              // Accent colors (cyan-400, cyan-500)
              primaryColor: '#22d3ee',
              defaultLinkColor: '#06b6d4',
              // Cluster/subgraph colors
              clusterBkg: '#1e293b',
              clusterBorder: '#334155',
              // Edge colors
              lineColor: '#475569',
              edgeLabelBackground: '#1e293b',
            },
          });
          (window as any)[initKey] = true;
        }

        // Set the chart content
        containerRef.current.textContent = chart;
        
        // Create a unique ID for this diagram
        const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
        containerRef.current.id = id;
        containerRef.current.className = 'mermaid';
        
        // Render the diagram
        await mermaid.run({
          nodes: [containerRef.current],
          suppressErrors: false,
        });

        setError(null);
        setIsLoading(false);
      } catch (error) {
        console.error('Error rendering Mermaid diagram:', error);
        setError(error instanceof Error ? error.message : String(error));
        setIsLoading(false);
      }
    };

    renderMermaid();
  }, [chart]);

  if (error) {
    return (
      <div className="my-12 rounded-xl border border-red-800/50 bg-red-900/20 p-6">
        <pre className="text-red-400 text-sm">{error}</pre>
      </div>
    );
  }

  return (
    <div className="my-12 w-full">
      <div className="relative flex justify-center">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center rounded-xl border border-slate-800/50 bg-slate-900/40">
            <div className="text-slate-400 text-sm">Loading diagram...</div>
          </div>
        )}
        <div
          ref={containerRef}
          className={`mermaid rounded-xl border border-slate-800/50 bg-slate-900/40 p-8 shadow-xl transition-opacity duration-300 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
          style={{ 
            minWidth: 'min(800px, 100%)',
            maxWidth: '100%',
          }}
        />
      </div>
    </div>
  );
}

