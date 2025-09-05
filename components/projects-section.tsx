'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Code, Calendar, Award, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import React, { useState, useMemo } from 'react';

type Project = {
  id: string;
  title: string;
  subtitle: string;
  period: string;
  sortDate: string;
  description: string;
  fullDescription?: string;
  technologies: string[];
  allTechnologies?: string[];
  type: string;
  link: string;
  status: string;
  gradient?: string;
  icon: any;
  highlights?: string[];
  achievements?: string[];
  readMe?: boolean;
  categories?: string[];
};

const projectCategories = [
  { key: 'all', label: 'All' },
  { key: 'web', label: 'Web' },
  { key: 'ai', label: 'AI/ML' },
  { key: 'security', label: 'Security' },
  { key: 'devops', label: 'DevOps' },
  { key: 'quantum', label: 'Quantum' },
  { key: 'data', label: 'Data' },
  { key: 'infra', label: 'Infrastructure' },
  { key: 'other', label: 'Other' },
];

const projects: Project[] = [
  {
    id: 'portfolio-project',
    title: 'Portfolio Website',
    subtitle: 'Modern SPA for My Work & Skills',
    period: '06/2025 – Present',
    sortDate: '2025-06',
    description:
      'Personal portfolio built with React, featuring interactive demos, live IDE, and responsive design.',
    fullDescription:
      'A comprehensive personal portfolio showcasing my projects, skills, and professional experience. Built with modern React patterns and featuring interactive elements like a live quantum IDE, guided tour system, and responsive design that adapts to all screen sizes. The site includes advanced features like Strava integration for athletic achievements and a sophisticated project showcase.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS'],
    allTechnologies: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js'],
    type: 'github',
    link: 'https://github.com/devenshah2018/deven-shah-portfolio',
    status: 'Live',
    gradient: 'from-purple-500 via-blue-500 to-cyan-500',
    icon: Code,
    highlights: ['Interactive guided tour', 'Live IDE integration', 'Responsive design'],
    achievements: [
      '100% Lighthouse Performance Score',
      'Mobile-first responsive design',
      'Advanced animation system',
      'Real-time Strava integration',
    ],
    readMe: true,
    categories: ['web'],
  },
  {
    id: 'qode-project',
    title: 'Qode',
    subtitle: 'Quantum Programming Language',
    period: '10/2024 – Present',
    sortDate: '2024-10',
    description:
      'Lightweight quantum programming language in C with intuitive syntax for quantum operations and circuits.',
    fullDescription:
      'Qode is a comprehensive quantum programming language designed for educational and research purposes. Written entirely in C for maximum performance, it provides an intuitive syntax for quantum operations, gate manipulations, and circuit simulations. The language includes a complete interpreter, virtual quantum machine, and WebAssembly compilation for browser execution.',
    technologies: ['C', 'Quantum Computing', 'Compiler Design'],
    allTechnologies: [
      'C',
      'WebAssembly',
      'Quantum Computing',
      'Compiler Design',
      'Language Design',
    ],
    type: 'github',
    link: 'https://github.com/devenshah2018/qode',
    status: 'In Progress',
    gradient: 'from-purple-500 via-blue-500 to-cyan-500',
    icon: Code,
    highlights: ['Pure C implementation', 'Quantum circuit virtualization', 'Real-time execution'],
    achievements: [
      'WebAssembly compilation support',
      'Complete quantum gate library',
      'Educational documentation',
    ],
    readMe: true,
    categories: ['quantum', 'web'],
  },
  {
    id: 'ares-project',
    title: 'Ares',
    subtitle: 'Security Compliance Platform',
    period: '08/2024 – 12/2024',
    sortDate: '2024-08',
    description:
      'SOC2 compliance platform leveraging AI and deep cybersecurity technology launched on VSCode Marketplace.',
    fullDescription:
      'Ares is an enterprise-grade security compliance platform that automates SOC2 Type 1 and OWASP compliance checking. Built as a VSCode extension using Rust for performance-critical operations and TypeScript for the user interface. Successfully launched on the VSCode Marketplace.',
    technologies: ['Rust', 'Python', 'TypeScript', 'VSCode Extension'],
    allTechnologies: [
      'Rust',
      'Python',
      'TypeScript',
      'VSCode Extension API',
      'Security Frameworks',
      'OWASP',
      'SOC2',
      'Node.js',
    ],
    type: 'link',
    link: 'http://marketplace.visualstudio.com/items?itemName=strive-ai.strive',
    status: 'Live',
    gradient: 'from-red-500 via-orange-500 to-yellow-500',
    icon: Award,
    highlights: ['VSCode Marketplace launch', 'Automated code security', 'SOC2 compliance'],
    achievements: [
      '100+ active organizations',
      'Microsoft for Startups acceptance',
      'Buildspace S5 cohort member',
      '4.8/5 marketplace rating',
    ],
    categories: ['security', 'devops'],
  },
  {
    id: 'crypto-forecasting-project',
    title: 'Cryptocurrency Forecasting',
    subtitle: 'ML Prediction Model',
    period: '01/2022 – 12/2022',
    sortDate: '2022-12',
    description:
      'ML model for cryptocurrency trend forecasting using synthetic data. Presented at SJSU Fall 2022 Expo.',
    fullDescription:
      'A comprehensive machine learning model designed to forecast cryptocurrency market trends using synthetic data generation and advanced prediction algorithms. The project involved extensive research into time-series analysis, market volatility patterns, and synthetic data generation techniques. Successfully presented at the SJSU Fall 2022 Computer Science Expo as my undergraduate capstone project.',
    technologies: ['Python', 'Machine Learning', 'Data Science'],
    allTechnologies: [
      'Python',
      'TensorFlow',
      'Pandas',
      'NumPy',
      'Scikit-learn',
      'Matplotlib',
      'Jupyter',
      'Time Series Analysis',
    ],
    type: 'github',
    link: 'https://github.com/b-devera/crypto-forecasting-model',
    status: 'Completed',
    gradient: 'from-green-500 via-emerald-500 to-teal-500',
    icon: Zap,
    highlights: ['SJSU Expo presentation', 'Synthetic dataset design', 'Trend prediction model'],
    achievements: [
      '85% prediction accuracy',
      'SJSU Expo finalist',
      'Synthetic data innovation',
      'Academic research contribution',
    ],
    categories: ['ai', 'data'],
  },
  {
    id: 'model-distribution-server',
    title: 'Model Distribution Server',
    subtitle: 'MLOps Dev Platform unifying MLflow & MinIO',
    period: '08/2025 – Present',
    sortDate: '2025-08',
    description:
      'A comprehensive MLOps platform for training, managing, and serving ML models with MLflow and MinIO S3 storage.',
    fullDescription:
      'An MLOps platform featuring dual FastAPI servers for training and inference, integrated with MLflow for model registry and versioning. The system provides automated ML pipelines with RandomForest regression, ONNX format conversion, and scalable storage using PostgreSQL and MinIO S3-compatible object storage. Built with Docker Compose for easy deployment and includes comprehensive REST APIs for model lifecycle management. Coupled with a client user interface for seamless interaction.',
    technologies: ['Python', 'MinIO', 'MLflow'],
    allTechnologies: [
      'Python',
      'FastAPI',
      'MLflow',
      'MinIO S3',
      'Docker',
      'ONNX',
      'Scikit-learn',
      'Pandas',
      'Docker',
    ],
    type: 'github',
    link: 'https://github.com/devenshah2018/model-distribution-server',
    status: 'In Progress',
    gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
    icon: Zap,
    highlights: ['MLOps platform', 'Model versioning', 'Scalable storage'],
    achievements: [
      'Dual FastAPI server architecture',
      'MLflow model registry integration',
      'ONNX format conversion support',
      'Dockerized deployment pipeline',
    ],
    categories: ['ai', 'infra', 'devops'],
  },
  {
    id: 'molecule-mutation-prediction',
    title: 'Molecule Mutation Prediction',
    subtitle: 'BRAF V600E Mutation Inhibitor Classifier',
    period: '08/2022 – 12/2022',
    sortDate: '2023-06',
    description:
      'Support vector machine to identify compounds that inhibit BRAF V600E mutation using PubChem chemical data.',
    fullDescription:
      'A comprehensive machine learning model using support vector machines to identify chemical compounds capable of inhibiting the BRAF V600E mutation, a critical target in cancer therapy. The system analyzes chemical compounds retrieved from PubChem database and programmatically determines which molecular attributes affect compound identification. Features configurable hyperparameters, variance thresholds, and multiple kernel options for optimal performance tuning.',
    technologies: ['Python', 'Machine Learning', 'SVM'],
    allTechnologies: [
      'Python',
      'Scikit-learn',
      'Pandas',
      'NumPy',
      'Matplotlib',
      'PubChem',
      'Support Vector Machines',
      'Feature Selection',
    ],
    type: 'github',
    link: 'https://github.com/devenshah2018/small-molecule-mutation-prediction',
    status: 'Completed',
    gradient: 'from-green-500 via-emerald-500 to-teal-500',
    icon: Zap,
    highlights: [
      'BRAF V600E mutation targeting',
      'PubChem compound analysis',
      'Configurable hyperparameters',
    ],
    achievements: [
      'High-performance compound classification',
      'ROC curve visualization system',
      'Automated performance logging',
      'Tunable variance thresholds',
    ],
    readMe: true,
    categories: ['ai', 'data'],
  },
];

function getProjectCategories(project: Project): string[] {
  return project.categories || ['other'];
}

export function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredProjects = useMemo(() => {
    return projects.filter((project: Project) => {
      const matchesCategory =
        activeCategory === 'all' ||
        getProjectCategories(project).includes(activeCategory);
      return matchesCategory;
    });
  }, [activeCategory]);

  return (
    <section
      id='projects'
      className='bg-gradient-to-b from-slate-950 to-slate-900 py-24'
    >
      <div className='container mx-auto px-4 lg:px-8'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='mx-auto max-w-7xl'
        >
          <div className='mb-10 text-center'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className='mb-4'
            >
              <h2 className='mb-2 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl'>
                Projects
              </h2>
              <div className='mx-auto h-1 w-16 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500' />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className='mx-auto max-w-3xl text-base font-light leading-relaxed text-slate-400 sm:text-lg'
            >
              Explore a wide range of projects—filter, search, and discover.
            </motion.p>
          </div>

          {/* Category Filter Bar */}
          <div className='mb-8 flex flex-wrap gap-2 justify-center'>
            {projectCategories.map((cat) => (
              <Button
                key={cat.key}
                variant={activeCategory === cat.key ? 'default' : 'outline'}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                  activeCategory === cat.key
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                    : 'border-slate-700 bg-slate-900/50 text-slate-300 hover:border-blue-500 hover:text-blue-400'
                }`}
                onClick={() => setActiveCategory(cat.key)}
              >
                {cat.label}
              </Button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3'>
            {filteredProjects.length === 0 && (
              <div className='col-span-full text-center text-slate-500 py-12'>
                No projects found.
              </div>
            )}
            {filteredProjects.map((project: Project, idx: number) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                viewport={{ once: true }}
                className='group'
              >
                <Card
                  className='flex flex-col h-full border-none bg-transparent transition-all duration-300 rounded-xl overflow-hidden'
                >
                  <CardHeader className='pb-3 flex flex-row items-start gap-3 justify-between'>
                    <div className='flex items-center gap-3 flex-1 min-w-0'>
                      <CardTitle className='text-lg font-bold text-white break-words whitespace-normal'>
                        {project.title}
                      </CardTitle>
                    </div>
                    <div className='flex flex-col items-end flex-shrink-0 min-w-[0]'>
                      <span
                        className='flex items-center gap-1 rounded px-2 py-0.5 text-xs font-medium text-slate-400 max-w-[140px] whitespace-nowrap overflow-hidden text-ellipsis'
                        title={project.period}
                      >
                        <Calendar className='h-3 w-3 mr-1 text-slate-400' />
                        {project.period}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className='flex-1 flex flex-col justify-between pt-0'>
                    <div>
                      <div className='flex flex-wrap gap-1 mb-2'>
                        {project.technologies?.slice(0, 4).map((tech: string, i: number) => (
                          <Badge
                            key={i}
                            variant='outline'
                            className='border-slate-700 bg-slate-800/50 text-xs text-slate-300'
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                      <p className='text-sm text-slate-300 mb-2'>
                        {project.description}
                      </p>
                    </div>
                    <div className='flex items-center justify-between mt-2'>
                      <span
                        className={`rounded-full px-2 py-0.5 text-sm ${
                          project.status === 'Live'
                            ? 'bg-emerald-900/60 text-emerald-300'
                            : project.status === 'In Progress'
                            ? 'bg-blue-900/60 text-blue-300'
                            : 'bg-slate-800/60 text-slate-400'
                        }`}
                      >
                        {project.status}
                      </span>
                      <Button
                        asChild
                        variant='outline'
                        className='border-blue-700 text-blue-300 hover:border-blue-500 hover:text-blue-400 text-xs px-3 py-1 h-8 ml-2'
                      >
                        <a
                          href={project.link}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          {project.type === 'github' ? (
                            <>
                              <Code className='mr-1 h-4 w-4 inline' />Code
                            </>
                          ) : (
                            <>View</>
                          )}
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
