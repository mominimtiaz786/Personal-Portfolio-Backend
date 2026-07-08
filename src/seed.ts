import { NestFactory } from '@nestjs/core';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppModule } from './app.module';
import { Project } from './projects/project.entity';

const projects: Partial<Project>[] = [
  {
    slug: 'national-open-government-data-portal-jordan',
    title: 'National Open Government Data Portal — Jordan',
    location: 'Amman, Jordan',
    year: '2024–2026',
    summary:
      'Developed a nationwide CKAN-based portal enabling 150+ ministries and entities to publish 3,700+ datasets across 15 sectors.',
    role: 'Lead engineer and analyst — led requirement sessions, built custom CKAN extensions, integrated SANAD and LDAP authentication, and bridged technical and stakeholder needs across a multicultural team.',
    impact:
      "Empowered citizens, researchers, and public-sector users with open access to data; streamlined government publishing workflows; strengthened Jordan's digital governance.",
    learning:
      'Multicultural collaboration, adapting technical solutions to new institutional and cultural contexts, and balancing technical excellence with human-centered design.',
    fullStory: null,
    techStack: [
      'CKAN',
      'Python',
      'Flask',
      'PostgreSQL',
      'Solr',
      'Redis/RQ',
      'SANAD SSO',
      'LDAP',
      'nginx',
      'uwsgi',
    ],
    links: [{ label: 'View Project', url: '#' }],
    thumbnail: null,
    featuredImage: null,
    order: 1,
    published: true,
  },
  {
    slug: 'open-data-pakistan',
    title: 'Open Data Pakistan',
    location: 'Lahore, Pakistan',
    year: '2021–2022',
    summary:
      "Final-year university project upgrading Pakistan's first CKAN-based open data portal (NCBC, LUMS, HEC initiative).",
    role: 'Migrated legacy CKAN extensions, implemented new features, learned Flask, Jinja, Solr, Redis, and AWS from scratch.',
    impact:
      'Enabled 22+ organizations to publish 350+ datasets; organized 3 national open-data hackathons.',
    learning:
      'Foundational CKAN and backend development experience on a nationally recognized, high-impact project.',
    fullStory: null,
    techStack: ['CKAN', 'Python', 'Flask', 'Jinja', 'Solr', 'Redis', 'AWS', 'PostgreSQL'],
    links: [{ label: 'View Project', url: 'https://opendata.com.pk' }],
    thumbnail: null,
    featuredImage: null,
    order: 2,
    published: true,
  },
  {
    slug: 'panavid-logistics-warehouse-automation',
    title: 'Panavid — Logistics & Warehouse Automation',
    location: 'Lahore, Pakistan (US-based client)',
    year: '2022–2024',
    summary:
      'Logistics and event-management platform coordinating equipment and trucking across multiple warehouses for large conferences and events.',
    role: 'Grew from contributor to leading a 16–20 member frontend team — task breakdown, technical architecture, and integration planning.',
    impact:
      'Streamlined logistics across 8+ warehouses and 100+ warehouse workers; reduced scan validation time by ~70% via client-side caching and real-time MQTT sync.',
    learning:
      'Enterprise-level Angular architecture, complex task estimation, and mentorship under senior engineers from global companies.',
    fullStory: null,
    techStack: [
      'Angular',
      'RxJS',
      'TypeScript',
      'MQTT',
      'REST APIs',
      'GraphQL',
      'Material UI',
      'Dynamic Forms',
    ],
    links: [],
    thumbnail: null,
    featuredImage: null,
    order: 3,
    published: true,
  },
  {
    slug: 'automation-mania-video-content-automation',
    title: 'Automation Mania — Video Content Automation',
    location: 'Self-initiated',
    year: '2022',
    summary:
      'Automated pipeline generating and scheduling short videos across YouTube and Facebook, sourcing content from Google Sheets.',
    role: 'Sole developer — concept, design, automation, and deployment.',
    impact:
      'Automated end-to-end content generation and multi-platform scheduling, saving hours of manual work per week.',
    learning: 'Python OOP, automation pipelines, multi-API integration, and AWS EC2 cron jobs.',
    fullStory: null,
    techStack: [
      'Python',
      'MoviePy',
      'Pillow',
      'Selenium',
      'Facebook Graph API',
      'YouTube Data API',
      'EZSheets',
      'AWS EC2',
    ],
    links: [
      { label: 'YouTube: Facts Mania', url: 'https://www.youtube.com/@factsmania8243' },
      { label: 'YouTube: Hidayat Mania', url: 'https://www.youtube.com/@hidayatmania7403' },
    ],
    thumbnail: null,
    featuredImage: null,
    order: 4,
    published: true,
  },
  {
    slug: 'mominimtiaz-tech-personal-portfolio-website',
    title: 'MominImtiaz.tech — Personal Portfolio Website',
    location: 'Self-initiated',
    year: '2026',
    summary: 'Personal portfolio website showcasing projects, skills, and experience.',
    role: 'Sole developer — concept, design, automation, and deployment.',
    impact:
      'Provides a professional online presence and serves as a platform to share work and achievements, and regular blog posts on software engineering and open data.',
    learning:
      'Full-stack development, modern web technologies, and personal branding through a digital platform.',
    fullStory: null,
    techStack: [
      'Angular',
      'TypeScript',
      'RxJS',
      'SCSS',
      'HTML5',
      'Responsive Design',
      'SEO Optimization',
      'Content Management',
      'Blogging Platform',
      'Analytics Integration',
      'NestJs',
      'Node.js',
      'Express',
      'MongoDB',
      'REST APIs',
      'Deployment and Hosting',
    ],
    links: [{ label: 'Website Link', url: 'https://mominimtiaz.tech' }],
    thumbnail: null,
    featuredImage: null,
    order: 5,
    published: true,
  },
];

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const projectRepository = app.get<Repository<Project>>(
    getRepositoryToken(Project),
  );

  for (const projectData of projects) {
    const existing = await projectRepository.findOne({
      where: { slug: projectData.slug },
    });
    if (existing) {
      console.log(`Skipping existing project: ${projectData.slug}`);
      continue;
    }
    const project = projectRepository.create(projectData);
    await projectRepository.save(project);
    console.log(`Seeded project: ${projectData.slug}`);
  }

  await app.close();
}

seed()
  .then(() => {
    console.log('Seeding complete.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Seeding failed:', error);
    process.exit(1);
  });
