interface DemoEntry {
  project?: string;
  title: string;
  timestamp: string; // ISO 8601 format
  path: string; // Path to the demo video file
  public_url?: string; // Public URL to the demo (e.g., tweet link)
}

export const DEMO_REGISTRY: DemoEntry[] = [
  {
    project: 'ares',
    title: 'Ares - End to End Demo',
    timestamp: '2024-11-03T20:41:00Z',
    path: '/demos/ares-demo-1.mp4',
    public_url: 'https://x.com/devenshah2018/status/1853296427549733029',
  },
  {
    title: 'Gumball - My Big Red Button',
    timestamp: '2025-08-24T01:05:00Z',
    path: '/demos/gumball-demo-1.mp4',
  },
  {
    project: 'model-distribution-server',
    title: 'Model Distribution Server - Demo #1',
    timestamp: '2025-08-20T22:36:00Z',
    path: '/demos/model-distribution-server-demo-1.mp4',
    public_url: 'https://x.com/devenshah2018/status/1958327432982982723',
  },
  {
    project: 'model-distribution-server',
    title: 'Model Distribution Server - Demo #2',
    timestamp: '2025-08-21T20:27:00Z',
    path: '/demos/model-distribution-server-demo-2.mp4',
  },
  {
    title: 'Orbit - AI Agent Builder',
    timestamp: '2025-01-10T17:45:00Z',
    path: '/demos/orbit-demo-1.mp4',
    public_url: 'https://x.com/devenshah2018/status/1877894635378598235',
  },
];
