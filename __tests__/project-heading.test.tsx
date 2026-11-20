import { render, screen } from '@testing-library/react';
import { ProjectHeading } from '@/components/projects/project-heading';
it('keeps the outbound project title without a permalink control', () => {
  render(
    <ProjectHeading
      project={{ id: 'iris-project', title: 'Iris', link: 'https://www.iris-plan.com' }}
    />
  );
  expect(screen.getByRole('link', { name: 'Iris' })).toHaveAttribute(
    'href',
    'https://www.iris-plan.com'
  );
  expect(screen.queryByRole('button')).not.toBeInTheDocument();
});
