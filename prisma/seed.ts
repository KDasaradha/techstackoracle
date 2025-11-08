import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create technology categories
  const frontendCategory = await prisma.technologyCategory.upsert({
    where: { name: 'Frontend Framework' },
    update: {},
    create: { name: 'Frontend Framework', description: 'Frameworks for building user interfaces' },
  });

  const backendCategory = await prisma.technologyCategory.upsert({
    where: { name: 'Backend Runtime' },
    update: {},
    create: { name: 'Backend Runtime', description: 'Server-side runtime environments' },
  });

  const databaseCategory = await prisma.technologyCategory.upsert({
    where: { name: 'Database' },
    update: {},
    create: { name: 'Database', description: 'Data storage solutions' },
  });

  const languageCategory = await prisma.technologyCategory.upsert({
    where: { name: 'Programming Language' },
    update: {},
    create: { name: 'Programming Language', description: 'Programming languages and compilers' },
  });

  // Create technologies
  const technologies = [
    {
      name: 'React',
      slug: 'react',
      categoryId: frontendCategory.id,
      description: 'A JavaScript library for building user interfaces',
      websiteUrl: 'https://reactjs.org',
      documentationUrl: 'https://reactjs.org/docs',
      repositoryUrl: 'https://github.com/facebook/react',
      licenseType: 'MIT',
      keyFeatures: ['Component-based', 'Virtual DOM', 'Large ecosystem', 'Hooks'],
      typicalUseCases: ['Single Page Applications', 'Complex UIs', 'Mobile apps with React Native'],
      advantages: 'Component-based architecture, Large ecosystem, Great performance, Strong community support',
      disadvantages: 'JSX learning curve, Frequent updates, Requires additional libraries for routing/state',
      communitySupportInfo: 'Very large community, extensive documentation, many third-party libraries',
      learningCurve: 'Moderate',
      performanceNotes: 'Excellent with virtual DOM, good for complex UIs',
      scalabilityNotes: 'Scales well with proper state management',
      integrationNotes: 'Works well with most backend technologies',
      securityConsiderations: 'Requires careful handling of XSS, secure coding practices needed',
    },
    {
      name: 'Next.js',
      slug: 'nextjs',
      categoryId: frontendCategory.id,
      description: 'A React framework for production-grade applications',
      websiteUrl: 'https://nextjs.org',
      documentationUrl: 'https://nextjs.org/docs',
      repositoryUrl: 'https://github.com/vercel/next.js',
      licenseType: 'MIT',
      keyFeatures: ['SSR/SSG support', 'File-based routing', 'API routes', 'Built-in optimizations'],
      typicalUseCases: ['Production web apps', 'SEO-critical sites', 'E-commerce platforms'],
      advantages: 'SSR/SSG support, Great DX, Built-in optimizations, SEO friendly',
      disadvantages: 'More complex than React, Learning curve, Opinionated structure',
      communitySupportInfo: 'Growing rapidly, good documentation, Vercel backing',
      learningCurve: 'Moderate to Steep',
      performanceNotes: 'Excellent with SSR/SSG, automatic optimizations',
      scalabilityNotes: 'Designed for scalability, handles large applications well',
      integrationNotes: 'Works with any backend, has built-in API routes',
      securityConsiderations: 'Built-in security features, regular updates',
    },
    {
      name: 'Node.js',
      slug: 'nodejs',
      categoryId: backendCategory.id,
      description: 'JavaScript runtime built on Chrome\'s V8 JavaScript engine',
      websiteUrl: 'https://nodejs.org',
      documentationUrl: 'https://nodejs.org/docs',
      repositoryUrl: 'https://github.com/nodejs/node',
      licenseType: 'MIT',
      keyFeatures: ['Event-driven', 'Non-blocking I/O', 'NPM ecosystem', 'Cross-platform'],
      typicalUseCases: ['APIs', 'Real-time apps', 'Microservices', 'CLI tools'],
      advantages: 'Single language for frontend/backend, Large ecosystem, Fast I/O operations',
      disadvantages: 'Not ideal for CPU-intensive tasks, Callback hell historically',
      communitySupportInfo: 'Massive community, NPM with millions of packages',
      learningCurve: 'Easy to Moderate',
      performanceNotes: 'Excellent for I/O-bound tasks, poor for CPU-intensive operations',
      scalabilityNotes: 'Scales well with microservices, clustering available',
      integrationNotes: 'Works with most databases and services',
      securityConsiderations: 'Regular security updates, npm audit tools available',
    },
    {
      name: 'PostgreSQL',
      slug: 'postgresql',
      categoryId: databaseCategory.id,
      description: 'Powerful, open source object-relational database system',
      websiteUrl: 'https://postgresql.org',
      documentationUrl: 'https://postgresql.org/docs',
      repositoryUrl: 'https://github.com/postgres/postgres',
      licenseType: 'PostgreSQL License',
      keyFeatures: ['ACID compliance', 'Extensible', 'JSON support', 'Full-text search'],
      typicalUseCases: ['Complex applications', 'Data warehousing', 'Financial systems'],
      advantages: 'ACID compliance, Extensible, Great performance, Strong reliability',
      disadvantages: 'Complex setup, Higher memory usage, Steeper learning curve',
      communitySupportInfo: 'Strong community, professional support available',
      learningCurve: 'Moderate to Steep',
      performanceNotes: 'Excellent for complex queries, good with proper indexing',
      scalabilityNotes: 'Vertical scaling well, horizontal with read replicas',
      integrationNotes: 'Works with most programming languages and frameworks',
      securityConsiderations: 'Strong security features, row-level security, encryption',
    },
    {
      name: 'MongoDB',
      slug: 'mongodb',
      categoryId: databaseCategory.id,
      description: 'Document-oriented NoSQL database',
      websiteUrl: 'https://mongodb.com',
      documentationUrl: 'https://docs.mongodb.com',
      repositoryUrl: 'https://github.com/mongodb/mongo',
      licenseType: 'SSPL',
      keyFeatures: ['Flexible schema', 'Horizontal scaling', 'Rich queries', 'Aggregation framework'],
      typicalUseCases: ['Rapid prototyping', 'Unstructured data', 'Content management'],
      advantages: 'Flexible schema, Easy scaling, Fast development, Good for iterative development',
      disadvantages: 'No ACID by default, Higher memory usage, Less mature for complex transactions',
      communitySupportInfo: 'Large community, good documentation, commercial support available',
      learningCurve: 'Easy to Moderate',
      performanceNotes: 'Good for read-heavy workloads, excellent with proper indexing',
      scalabilityNotes: 'Excellent horizontal scaling with sharding',
      integrationNotes: 'Drivers available for most languages, works well with Node.js',
      securityConsiderations: 'Authentication and encryption available, requires proper configuration',
    },
    {
      name: 'TypeScript',
      slug: 'typescript',
      categoryId: languageCategory.id,
      description: 'Typed superset of JavaScript that compiles to plain JavaScript',
      websiteUrl: 'https://typescriptlang.org',
      documentationUrl: 'https://typescriptlang.org/docs',
      repositoryUrl: 'https://github.com/microsoft/TypeScript',
      licenseType: 'Apache-2.0',
      keyFeatures: ['Static typing', 'Type inference', 'Interfaces', 'Generics'],
      typicalUseCases: ['Large applications', 'Team development', 'Complex systems'],
      advantages: 'Type safety, Better IDE support, Self-documenting, Refactoring safety',
      disadvantages: 'Learning curve, Compilation step, More verbose code',
      communitySupportInfo: 'Growing rapidly, Microsoft backing, good tooling',
      learningCurve: 'Moderate',
      performanceNotes: 'Compiles to JavaScript, runtime performance same as JS',
      scalabilityNotes: 'Excellent for large codebases, helps with maintenance',
      integrationNotes: 'Works with any JavaScript library or framework',
      securityConsiderations: 'Type safety helps catch many errors at compile time',
    },
  ];

  for (const tech of technologies) {
    await prisma.technology.upsert({
      where: { slug: tech.slug },
      update: tech,
      create: tech,
    });
  }

  // Create tags
  const tags = [
    'javascript', 'react', 'nodejs', 'typescript', 'postgresql', 'mongodb',
    'frontend', 'backend', 'database', 'nosql', 'sql', 'web', 'api'
  ];

  for (const tagName of tags) {
    await prisma.technologyTag.upsert({
      where: { name: tagName },
      update: {},
      create: { name: tagName },
    });
  }

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });