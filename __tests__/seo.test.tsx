import { renderToStaticMarkup } from 'react-dom/server';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PROJECTS, EDUCATION } from '@/database/content-registry';
import { ProjectsIndex } from '@/components/projects/projects-index';
import { EducationOrganizationsSidebar } from '@/components/experience/education-organizations-sidebar';
import { generatePersonSchema, generateWebsiteSchema, serializeJsonLd } from '@/lib/jsonld';
import sitemap from '@/app/sitemap';
import robots from '@/app/robots';

jest.mock('react-dom/server', () => jest.requireActual('react-dom/server.node'));

it('includes every project and paper in server HTML while preserving the featured default', () => {
  const html = renderToStaticMarkup(<ProjectsIndex />);
  const document = new DOMParser().parseFromString(html, 'text/html');
  expect(document.querySelectorAll('li[id^="project-"]')).toHaveLength(PROJECTS.length);
  for (const project of PROJECTS) {
    const row = document.getElementById(`project-${project.id}`)!;
    expect(row).not.toBeNull();
    expect(row.textContent).toContain(project.description);
    expect(row.hidden).toBe(!project.categories?.includes('featured'));
    if (project.paper)
      expect(row.querySelector('a[aria-haspopup="dialog"]')?.getAttribute('href')).toBe(
        project.paper
      );
  }
  render(<ProjectsIndex />);
  expect(screen.getAllByRole('listitem')).toHaveLength(3);
  expect(screen.queryByRole('heading', { name: 'Wardrobe Copilot' })).not.toBeInTheDocument();
});

it('serves coursework in server HTML and preserves the collapsed toggle behavior', async () => {
  const html = renderToStaticMarkup(<EducationOrganizationsSidebar />);
  const document = new DOMParser().parseFromString(html, 'text/html');
  for (const education of EDUCATION) {
    const panel = document.getElementById(`coursework-${education.id}`)!;
    expect(panel).not.toBeNull();
    expect(panel.hidden).toBe(true);
    for (const course of education.coursework) expect(panel.textContent).toContain(course);
  }
  const user = userEvent.setup();
  render(<EducationOrganizationsSidebar />);
  const course = screen.getByText('Advanced Machine Learning and Neural Networks');
  expect(course).not.toBeVisible();
  await user.click(screen.getByRole('button', { name: 'Coursework (9)' }));
  expect(course).toBeVisible();
  await user.click(screen.getByRole('button', { name: 'Coursework (9)' }));
  expect(course).not.toBeVisible();
});

it('lists canonical documents in the sitemap without fragment URLs or artificial update dates', () => {
  const entries = sitemap();
  const urls = entries.map(entry => entry.url);
  const expected = [
    'https://deven-shah.com/',
    ...PROJECTS.filter(project => project.paper).map(
      project => `https://deven-shah.com${project.paper}`
    ),
  ];
  expect(new Set(urls)).toEqual(new Set(expected));
  expect(urls).toHaveLength(new Set(urls).size);
  for (const entry of entries) {
    expect(new URL(entry.url).hash).toBe('');
    expect(entry.lastModified).toBeUndefined();
  }
  expect(robots().sitemap).toBe('https://deven-shah.com/sitemap.xml');
});

it('describes current employment and completed education truthfully', () => {
  jest.useFakeTimers();
  jest.setSystemTime(new Date(2026, 9, 16));
  const person = generatePersonSchema();
  expect(person.image).toBe('https://deven-shah.com/profile.jpg');
  expect(JSON.stringify(person.worksFor)).toContain('Boston University');
  expect(JSON.stringify(person.worksFor)).not.toContain('Suno Analytics');
  expect(JSON.stringify(person.worksFor)).not.toContain('Accenture');
  expect(JSON.stringify(person.alumniOf)).toContain('San Jose State University');
  expect(JSON.stringify(person.alumniOf)).not.toContain('Boston University');
  jest.useRealTimers();
});

it('connects the website and profile to one named person without fabricated dates', () => {
  const schema = generateWebsiteSchema();
  const [website, profile] = schema['@graph'];
  expect(website).toMatchObject({
    '@type': 'WebSite',
    name: 'Deven Shah',
    url: 'https://deven-shah.com/',
    publisher: { '@id': 'https://deven-shah.com/#person' },
  });
  expect(profile).toMatchObject({
    '@type': 'ProfilePage',
    mainEntity: { '@type': 'Person', '@id': 'https://deven-shah.com/#person', name: 'Deven Shah' },
    isPartOf: { '@id': website['@id'] },
  });
  expect(profile).not.toHaveProperty('dateModified');
  expect(profile).not.toHaveProperty('dateCreated');
});

it('keeps script-like text inert while preserving valid JSON-LD', () => {
  const value = { name: '</script><script>alert("test")</script> & example' };
  const json = serializeJsonLd(value);
  expect(json).not.toContain('<');
  expect(JSON.parse(json)).toEqual(value);
});
