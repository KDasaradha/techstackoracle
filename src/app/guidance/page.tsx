'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, BookOpen, Layers, Cpu, Shield, Zap, Users, Database, Globe, Code, Lock, TrendingUp } from 'lucide-react';

const systemDesignTopics = [
  {
    id: 'architectural-patterns',
    title: 'Architectural Patterns',
    description: 'Learn about high-level system design patterns and when to use them',
    icon: Layers,
    color: 'bg-blue-100 text-blue-600',
    topics: [
      {
        name: 'Monolithic Architecture',
        description: 'Single deployable unit that handles all business operations',
        pros: 'Simple to develop, test, and deploy',
        cons: 'Difficult to scale, tight coupling',
        bestFor: 'Small applications, MVPs'
      },
      {
        name: 'Microservices Architecture',
        description: 'Collection of loosely coupled services',
        pros: 'Independent scaling, technology diversity',
        cons: 'Complex deployment, network latency',
        bestFor: 'Large applications, enterprise systems'
      },
      {
        name: 'Serverless Architecture',
        description: 'Event-driven, function-based architecture',
        pros: 'Cost-effective, auto-scaling',
        cons: 'Cold starts, vendor lock-in',
        bestFor: 'Sporadic workloads, event-driven systems'
      }
    ]
  },
  {
    id: 'database-design',
    title: 'Database Design',
    description: 'Master database schema design and optimization',
    icon: Database,
    color: 'bg-green-100 text-green-600',
    topics: [
      {
        name: 'SQL Database Design',
        description: 'Relational database design principles',
        pros: 'ACID compliance, data integrity',
        cons: 'Schema rigidity, scaling challenges',
        bestFor: 'Financial systems, transactional applications'
      },
      {
        name: 'NoSQL Database Design',
        description: 'Non-relational database patterns',
        pros: 'Schema flexibility, horizontal scaling',
        cons: 'Eventual consistency, limited query capabilities',
        bestFor: 'Big data, content management, real-time applications'
      },
      {
        name: 'Database Optimization',
        description: 'Performance tuning and indexing strategies',
        pros: 'Improved query performance, reduced latency',
        cons: 'Complex maintenance, storage overhead',
        bestFor: 'High-traffic applications, analytics systems'
      }
    ]
  },
  {
    id: 'api-design',
    title: 'API Design',
    description: 'Design robust and scalable APIs',
    icon: Globe,
    color: 'bg-purple-100 text-purple-600',
    topics: [
      {
        name: 'RESTful API Design',
        description: 'REST principles and best practices',
        pros: 'Stateless, cacheable, simple',
        cons: 'Over/under-fetching, multiple requests',
        bestFor: 'Standard web applications, mobile apps'
      },
      {
        name: 'GraphQL API Design',
        description: 'Query language and runtime for APIs',
        pros: 'Single endpoint, typed schema',
        cons: 'Complex queries, caching challenges',
        bestFor: 'Complex applications, mobile apps with variable data needs'
      },
      {
        name: 'API Security',
        description: 'Secure your APIs with best practices',
        pros: 'Data protection, access control',
        cons: 'Implementation complexity, performance overhead',
        bestFor: 'All public APIs, sensitive data systems'
      }
    ]
  },
  {
    id: 'security',
    title: 'Security Best Practices',
    description: 'Essential security practices for modern applications',
    icon: Shield,
    color: 'bg-red-100 text-red-600',
    topics: [
      {
        name: 'Authentication & Authorization',
        description: 'Identity and access management',
        pros: 'Secure access control, audit trails',
        cons: 'Implementation complexity, user friction',
        bestFor: 'All applications with user data'
      },
      {
        name: 'Data Encryption',
        description: 'Protect data at rest and in transit',
        pros: 'Data protection, compliance',
        cons: 'Performance overhead, key management',
        bestFor: 'Sensitive data, compliance requirements'
      },
      {
        name: 'OWASP Top 10',
        description: 'Common web application vulnerabilities',
        pros: 'Comprehensive protection, industry standard',
        cons: 'Complex implementation, ongoing maintenance',
        bestFor: 'All web applications, especially public-facing'
      }
    ]
  },
  {
    id: 'performance',
    title: 'Performance Optimization',
    description: 'Techniques for building high-performance applications',
    icon: Zap,
    color: 'bg-yellow-100 text-yellow-600',
    topics: [
      {
        name: 'Caching Strategies',
        description: 'Multi-layer caching approaches',
        pros: 'Reduced latency, lower database load',
        cons: 'Complexity, cache invalidation',
        bestFor: 'Read-heavy applications, content delivery'
      },
      {
        name: 'Load Balancing',
        description: 'Distribute traffic across multiple servers',
        pros: 'High availability, scalability',
        cons: 'Complexity, session management',
        bestFor: 'High-traffic applications, SaaS platforms'
      },
      {
        name: 'CDN Implementation',
        description: 'Content delivery networks for global performance',
        pros: 'Reduced latency, global reach',
        cons: 'Cost, cache management',
        bestFor: 'Global applications, media-heavy content'
      }
    ]
  },
  {
    id: 'devops',
    title: 'DevOps & Deployment',
    description: 'Modern deployment and operational practices',
    icon: TrendingUp,
    color: 'bg-indigo-100 text-indigo-600',
    topics: [
      {
        name: 'CI/CD Pipelines',
        description: 'Automated build and deployment processes',
        pros: 'Consistent deployments, faster releases',
        cons: 'Setup complexity, maintenance overhead',
        bestFor: 'Team development, production applications'
      },
      {
        name: 'Container Orchestration',
        description: 'Kubernetes and Docker orchestration',
        pros: 'Scalability, portability, resource efficiency',
        cons: 'Complexity, learning curve',
        bestFor: 'Microservices, scalable applications'
      },
      {
        name: 'Infrastructure as Code',
        description: 'Terraform and CloudFormation patterns',
        pros: 'Version control, reproducibility',
        cons: 'Learning curve, debugging complexity',
        bestFor: 'Production systems, team environments'
      }
    ]
  }
];

export default function SystemDesignPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
                Back to Home
              </Button>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 relative">
              <img
                src="/tech-stack-oracle-logo.png"
                alt="Tech Stack Oracle"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="font-bold text-xl">Tech Stack Oracle</span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            System Design Guidance
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Master the art of system architecture with our comprehensive guides and best practices
          </p>
        </div>

        {/* Topics Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {systemDesignTopics.map((category) => {
            const IconComponent = category.icon;
            return (
              <Card key={category.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${category.color}`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{category.title}</CardTitle>
                      <CardDescription>{category.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {category.topics.map((topic, index) => (
                      <div key={index} className="border-l-2 border-gray-200 pl-4">
                        <h4 className="font-medium text-gray-900 mb-2">{topic.name}</h4>
                        <p className="text-sm text-gray-600 mb-3">{topic.description}</p>
                        
                        <div className="space-y-2">
                          <div>
                            <Badge variant="secondary" className="text-xs">
                              <BookOpen className="h-3 w-3 mr-1" />
                              Best For
                            </Badge>
                            <p className="text-sm text-gray-700 mt-1">{topic.bestFor}</p>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Badge variant="outline" className="text-xs mb-1">
                                <Cpu className="h-3 w-3 mr-1" />
                                Pros
                              </Badge>
                              <p className="text-xs text-gray-600">{topic.pros}</p>
                            </div>
                            
                            <div>
                              <Badge variant="outline" className="text-xs mb-1">
                                <Lock className="h-3 w-3 mr-1" />
                                Cons
                              </Badge>
                              <p className="text-xs text-gray-600">{topic.cons}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="pt-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Ready to Apply This Knowledge?
                </h3>
                <p className="text-gray-600 mb-6">
                  Use our project wizard to get personalized recommendations based on your specific requirements
                </p>
                <div className="flex gap-4 justify-center">
                  <Link href="/projects/new">
                    <Button size="lg">
                      <Code className="h-4 w-4 mr-2" />
                      Start a New Project
                    </Button>
                  </Link>
                  <Link href="/dashboard">
                    <Button variant="outline" size="lg">
                      <Users className="h-4 w-4 mr-2" />
                      View Dashboard
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}