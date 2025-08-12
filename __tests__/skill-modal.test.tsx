import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import { SkillModal } from '../components/skill-modal';
import React from 'react';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
  },
  AnimatePresence: ({ children }: any) => <div>{children}</div>,
}));

const mockSkillData = {
  skill: 'React',
  experiences: [
    {
      title: 'Frontend Developer',
      company: 'Test Company',
      id: 'test-experience',
      icon: 'briefcase',
    },
  ],
  projects: [
    {
      title: 'Test Project',
      subtitle: 'Test Description',
      id: 'test-project',
      icon: 'zap',
    },
  ],
  education: [
    {
      title: 'Computer Science',
      institution: 'Test University',
      id: 'test-education',
      icon: 'graduation-cap',
    },
  ],
};

describe('SkillModal Component', () => {
  const defaultProps = {
    isOpen: false,
    onClose: jest.fn(),
    skillData: mockSkillData,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('displays skill education', () => {
    render(
      <SkillModal
        {...defaultProps}
        open={true}
        skillName={'python'}
        onOpenChange={() => {}}
        skillMappings={[
          {
            skill: 'Python',
            experiences: [
              {
                title: 'Co-Founder/CTO',
                company: 'Suno Analytics',
                id: 'suno-analytics',
                icon: React.Component,
              },
              {
                title: 'Solutions Architect Intern',
                company: 'NetApp',
                id: 'netapp',
                icon: React.Component,
              },
            ],
            projects: [
              {
                title: 'MCP Model Server',
                subtitle: 'Local ML Inference TCP Server',
                id: 'mcp-model-server',
                icon: React.Component,
              },
              {
                title: 'Ares',
                subtitle: 'Security Compliance Platform',
                id: 'ares-project',
                icon: React.Component,
              },
              {
                title: 'Molecule Mutation Prediction',
                subtitle: 'BRAF V600E Mutation Inhibitor Classifier',
                id: 'molecule-mutation-prediction',
                icon: React.Component,
              },
              {
                title: 'Cryptocurrency Forecasting',
                subtitle: 'ML Prediction Model',
                id: 'crypto-forecasting-project',
                icon: React.Component,
              },
            ],
            education: [
              {
                title: 'B.S. Software Engineering',
                institution: 'San Jose State University',
                id: 'sjsu-bachelors',
                icon: React.Component,
              },
            ],
          },
        ]}
      />
    );
  });
});
