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
          // Add CSS for consistent dark theme styling
          const style = document.createElement('style');
          style.id = 'mermaid-dark-theme-styles';
          style.textContent = `
            .mermaid svg {
              max-width: 100%;
              height: auto;
              background-color: #0a0e27 !important;
            }
            .mermaid .node rect {
              min-width: 200px;
              min-height: 60px;
              fill: #151b2e !important;
              stroke: #2d3748 !important;
              stroke-width: 1.5px !important;
            }
            .mermaid .node foreignObject div {
              padding: 10px;
              text-align: center;
              color: #e2e8f0 !important;
              background-color: transparent !important;
            }
            .mermaid .cluster rect {
              fill: #1e2538 !important;
              stroke: #3b4a6b !important;
              stroke-width: 2px !important;
            }
            .mermaid .cluster text {
              fill: #f8fafc !important;
              font-weight: 600 !important;
            }
            .mermaid .edgePath .path {
              stroke: #4a5568 !important;
              stroke-width: 2px !important;
            }
            .mermaid .edgeLabel {
              background-color: #1e2538 !important;
              color: #e2e8f0 !important;
            }
            .mermaid .edgeLabel text {
              fill: #e2e8f0 !important;
            }
            .mermaid .label {
              color: #e2e8f0 !important;
            }
            .mermaid .nodeLabel {
              color: #e2e8f0 !important;
            }
            .mermaid .arrowheadPath {
              fill: #60a5fa !important;
              stroke: #60a5fa !important;
            }
            .mermaid .flowchart-link {
              stroke: #4a5568 !important;
            }
          `;
          // Remove existing style if present
          const existingStyle = document.getElementById('mermaid-dark-theme-styles');
          if (existingStyle) {
            existingStyle.remove();
          }
          document.head.appendChild(style);
          
          mermaid.initialize({
            startOnLoad: false,
            theme: 'dark',
            securityLevel: 'loose',
            flowchart: {
              useMaxWidth: true,
              htmlLabels: true,
              padding: 20,
              nodeSpacing: 50,
              rankSpacing: 80,
              curve: 'basis',
            },
            themeVariables: {
              // Background colors - deep navy with subtle warmth
              background: '#0a0e27',
              mainBkg: '#151b2e',
              secondBkg: '#1e2538',
              // Text colors - crisp white with subtle blue tint
              primaryTextColor: '#f8fafc',
              textColor: '#e2e8f0',
              secondaryTextColor: '#cbd5e1',
              // Border colors - elegant slate with blue undertone
              primaryBorderColor: '#2d3748',
              secondaryBorderColor: '#3d4758',
              secondaryColor: '#1e2538',
              tertiaryColor: '#151b2e',
              // Accent colors - sophisticated blue-teal gradient
              primaryColor: '#3b82f6',
              defaultLinkColor: '#60a5fa',
              // Cluster/subgraph colors - rich indigo tones
              clusterBkg: '#1e2538',
              clusterBorder: '#3b4a6b',
              // Edge colors - subtle blue-gray
              lineColor: '#4a5568',
              edgeLabelBackground: '#1e2538',
              // Node colors - refined dark blue-gray
              nodeBkg: '#151b2e',
              nodeBorder: '#2d3748',
              // Label colors
              labelBackground: '#1e2538',
              labelTextColor: '#e2e8f0',
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

