'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ExternalLink,
  Code,
  Calendar,
  Award,
  Zap,
  ChevronDown,
  ChevronUp,
  Github,
  Globe,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { QodeIdeModal } from '@/components/qode-ide-modal';
import { useState } from 'react';

const projects = [
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
    allTechnologies: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Strava API'],
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
      'ANTLR',
      'CMake',
    ],
    type: 'ide',
    status: 'In Progress',
    gradient: 'from-purple-500 via-blue-500 to-cyan-500',
    icon: Code,
    highlights: ['Pure C implementation', 'Quantum circuit virtualization', 'Real-time execution'],
    achievements: [
      'WebAssembly compilation support',
      'Complete quantum gate library',
      'Educational documentation',
      'Interactive web simulator',
    ],
  },
  {
    id: 'ares-project',
    title: 'Ares',
    subtitle: 'Security Compliance Platform',
    period: '08/2024 – 12/2024',
    sortDate: '2024-08',
    description:
      'SOC2 compliance platform launched on VSCode Marketplace, accepted into Microsoft for Startups.',
    fullDescription:
      'Ares is an enterprise-grade security compliance platform that automates SOC2 Type 1 and OWASP compliance checking. Built as a VSCode extension using Rust for performance-critical operations and TypeScript for the user interface. Successfully launched on the VSCode Marketplace and accepted into prestigious accelerator programs including Microsoft for Startups and Buildspace S5.',
    technologies: ['Rust', 'TypeScript', 'VSCode Extension'],
    allTechnologies: [
      'Rust',
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
    highlights: ['VSCode Marketplace launch', 'Microsoft for Startups', 'Automated compliance'],
    achievements: [
      '100+ active organizations',
      'Microsoft for Startups acceptance',
      'Buildspace S5 cohort member',
      '4.8/5 marketplace rating',
    ],
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
  },
  {
    id: 'mcp-model-server',
    title: 'MCP Model Server',
    subtitle: 'Local ML Inference TCP Server',
    period: '08/2025 – Present',
    sortDate: '2025-08',
    description:
      'A lightweight, local, line-delimited JSON over TCP server that exposes ML workflows to clients via asyncio.',
    fullDescription:
      'A comprehensive local ML inference server built with asyncio that exposes machine learning workflows (dataset listing, training, evaluation, prediction, explanation, model export) through a simple TCP protocol. Uses line-delimited JSON for communication, scikit-learn for ML operations, and filesystem persistence. The system is intentionally simple, composable, and designed for easy extension with new ML workflows.',
    technologies: ['Python', 'AsyncIO', 'Scikit-learn'],
    allTechnologies: [
      'Python',
      'AsyncIO',
      'Scikit-learn',
      'Pandas',
      'NumPy',
      'Joblib',
      'TCP Protocol',
      'JSON',
    ],
    type: 'github',
    link: 'https://github.com/devenshah2018/mcp-model-server',
    status: 'In Progress',
    gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
    icon: Zap,
    highlights: ['Async TCP protocol', 'Local ML workflows', 'JSON over TCP'],
    achievements: [
      'Complete ML workflow coverage',
      'Concurrent client handling',
      'Filesystem model persistence',
      'Extensible command architecture',
    ],
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
    link: 'https://github.com/devenshah/braf-classifier',
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
  },
];

export function ProjectsSection() {
  const [qodeModalOpen, setQodeModalOpen] = useState(false);
  const [allProjectsExpanded, setAllProjectsExpanded] = useState(false);
  const [showAllProjects, setShowAllProjects] = useState(false);

  const toggleAllProjects = () => {
    setAllProjectsExpanded(!allProjectsExpanded);
  };

  const displayedProjects = showAllProjects
    ? projects.sort((a, b) => b.sortDate.localeCompare(a.sortDate))
    : projects.sort((a, b) => b.sortDate.localeCompare(a.sortDate)).slice(0, 6);

  const handleProjectAction = (project: (typeof projects)[0]) => {
    if (project.type === 'ide') {
      setQodeModalOpen(true);
    } else if (project.type === 'link') {
      window.open(project.link, '_blank');
    } else if (project.type === 'github') {
      window.open(project.link, '_blank');
    } else {
      window.open('https://github.com/devenshah', '_blank');
    }
  };

  return (
    <section id='projects' className='bg-gradient-to-b from-slate-950 to-slate-900 py-20 sm:py-28'>
      <div className='container mx-auto px-2 sm:px-6 lg:px-8'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='mx-auto max-w-7xl'
        >
          <div className='relative mb-10 text-center sm:mb-16'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className='mb-4'
            >
              <h2 className='mb-2 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl'>
                Featured Projects
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
              Quantum, security, and ML—each project is a leap forward.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className='absolute right-0'
            >
              <Button
                onClick={toggleAllProjects}
                variant='outline'
                size='sm'
                className='border-slate-700 bg-slate-800/50 text-slate-300 hover:border-slate-600 hover:bg-slate-700/50'
              >
                {allProjectsExpanded ? (
                  <>
                    <ChevronUp className='mr-2 h-4 w-4' />
                    Collapse
                  </>
                ) : (
                  <>
                    <ChevronDown className='mr-2 h-4 w-4' />
                    Expand
                  </>
                )}
              </Button>
            </motion.div>
          </div>

          <div className='grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3'>
            {displayedProjects.map((project, index) => {
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  viewport={{ once: true }}
                  className='group'
                >
                  <Card
                    data-item-id={project.id}
                    className='flex h-full flex-col gap-0 border border-slate-800 bg-slate-900/50 backdrop-blur-sm transition-all duration-300'
                  >
                    <CardHeader className='pb-4'>
                      <div className='mb-4 flex items-center justify-between'>
                        <span
                          className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${
                            project.status === 'Live'
                              ? 'border-emerald-700/50 bg-emerald-950/50 text-emerald-300'
                              : project.status === 'In Progress'
                                ? 'border-blue-700/50 bg-blue-950/50 text-blue-300'
                                : project.status === 'Completed'
                                  ? 'border-amber-700/50 bg-amber-950/50 text-amber-300'
                                  : 'border-slate-700/50 bg-slate-900/50 text-slate-300'
                          }`}
                        >
                          {project.status === 'Live' && (
                            <div className='relative'>
                              <div className='h-2 w-2 rounded-full bg-emerald-400'></div>
                              <div className='absolute inset-0 h-2 w-2 animate-ping rounded-full bg-emerald-400 opacity-75'></div>
                            </div>
                          )}
                          {project.status}
                        </span>
                        <p className='flex items-center gap-1 text-xs text-slate-500'>
                          <Calendar className='h-3 w-3' />
                          {project.period}
                        </p>
                      </div>
                      <CardTitle className='mb-1 text-xl font-bold text-white transition-colors'>
                        {project.title}
                      </CardTitle>
                      <p className='mb-2 text-sm text-slate-400'>{project.subtitle}</p>
                    </CardHeader>
                    <CardContent className='flex flex-1 flex-col pt-0'>
                      <div className='flex-1 space-y-4'>
                        <p className='text-sm leading-relaxed text-slate-300'>
                          {allProjectsExpanded ? project.fullDescription : project.description}
                        </p>

                        <div className='flex flex-wrap gap-2'>
                          {(allProjectsExpanded
                            ? project.allTechnologies
                            : project.technologies
                          ).map((tech, i) => (
                            <Badge
                              key={i}
                              variant='outline'
                              className='border-slate-700 bg-slate-800/50 text-xs text-slate-300'
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>

                        <ul className='space-y-1'>
                          {(allProjectsExpanded ? project.achievements : project.highlights).map(
                            (item, i) => (
                              <li key={i} className='flex items-start gap-2 text-xs text-slate-400'>
                                <span className='mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-blue-400'></span>
                                {item}
                              </li>
                            )
                          )}
                        </ul>

                        {allProjectsExpanded && (project as any).metrics && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className='rounded-lg border border-slate-700/50 bg-slate-800/30 p-3'
                          >
                            <p className='mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400'>
                              Project Metrics
                            </p>
                            <div className='grid grid-cols-2 gap-2'>
                              {Object.entries((project as any).metrics).map(
                                ([key, value]: [string, any]) => (
                                  <div key={key} className='text-center'>
                                    <p className='text-lg font-bold text-white'>{value}</p>
                                    <p className='text-xs capitalize text-slate-400'>
                                      {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                                    </p>
                                  </div>
                                )
                              )}
                            </div>
                          </motion.div>
                        )}
                      </div>

                      <div className='mt-auto flex items-center justify-between pt-4'>
                        <div className='flex gap-2'>
                          {allProjectsExpanded && (project as any).liveLink && (
                            <Button
                              onClick={() => window.open((project as any).liveLink, '_blank')}
                              variant='outline'
                              size='sm'
                              className='h-7 border-slate-600 px-3 py-1 text-xs hover:border-slate-500'
                            >
                              <Globe className='mr-1 h-3 w-3' />
                              Live
                            </Button>
                          )}
                        </div>
                        <Button
                          onClick={() => handleProjectAction(project)}
                          className='h-7 bg-gradient-to-r from-blue-600 to-blue-700 px-3 py-1 text-xs text-white hover:from-blue-500 hover:to-blue-600'
                          size='sm'
                        >
                          {project.type === 'ide' && (
                            <>
                              <Code className='mr-1 h-3 w-3' />
                              Try IDE
                            </>
                          )}
                          {(project.type === 'video' || project.type === 'link') && (
                            <>
                              <ExternalLink className='mr-1 h-3 w-3' />
                              View
                            </>
                          )}
                          {project.type === 'github' && (
                            <>
                              <Github className='mr-1 h-3 w-3' />
                              Code
                            </>
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {projects.length > 6 && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className='mt-12 text-center'
            >
              <Button
                onClick={() => setShowAllProjects(!showAllProjects)}
                variant='outline'
                className='border-slate-700 bg-slate-800/50 px-8 py-3 text-slate-300 hover:border-slate-600 hover:bg-slate-700/50'
              >
                {showAllProjects ? (
                  <>
                    <ChevronUp className='mr-2 h-4 w-4' />
                    Show Less Projects
                  </>
                ) : (
                  <>
                    <ChevronDown className='mr-2 h-4 w-4' />
                    Show All Projects ({projects.length - 6} more)
                  </>
                )}
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>

      <QodeIdeModal open={qodeModalOpen} onOpenChange={setQodeModalOpen} />
    </section>
  );
}
