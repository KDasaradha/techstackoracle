'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Download, Star, CheckCircle, AlertCircle, Lightbulb, Cpu, Database, Globe, Code } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface Technology {
  id: string;
  name: string;
  category: string;
  description: string;
  pros: string;
  cons: string;
  bestFor: string;
}

interface Recommendations {
  frontend: Technology[];
  backend: Technology[];
  database: Technology[];
  languages: Technology[];
  bestFit: {
    frontend: Technology | null;
    backend: Technology | null;
    database: Technology | null;
    language: Technology | null;
  };
  alternatives: {
    frontend: Technology[];
    backend: Technology[];
    database: Technology[];
    language: Technology[];
  };
  aiInsights: string;
  generatedAt: string;
}

export default function RecommendationsPage() {
  const [recommendations, setRecommendations] = useState<Recommendations | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [project, setProject] = useState<any>(null);
  
  const params = useParams();
  const router = useRouter();
  const projectId = params.id as string;
  const { token, isAuthenticated } = useAuth();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }

    fetchRecommendations();
  }, [projectId, router, isAuthenticated]);

  const fetchRecommendations = async () => {
    try {
      if (!token) {
        throw new Error('User not authenticated');
      }

      // First, try to get existing recommendations
      const response = await fetch(`/api/projects/${projectId}/recommendations`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch recommendations');
      }

      const data = await response.json();
      setRecommendations(data.recommendations);
      
      // Also fetch project details
      const projectResponse = await fetch(`/api/projects/${projectId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (projectResponse.ok) {
        const projectData = await projectResponse.json();
        setProject(projectData.project);
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while fetching recommendations');
    } finally {
      setIsLoading(false);
    }
  };

  const handleExport = () => {
    if (!recommendations || !project) return;

    const exportData = {
      project: {
        name: project.name,
        description: project.description,
        generatedAt: new Date().toISOString(),
      },
      recommendations: recommendations,
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `${project.name.replace(/\s+/g, '-')}-tech-stack-recommendations.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Generating your personalized recommendations...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="max-w-md w-full">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
          <div className="mt-4 text-center">
            <Link href="/dashboard">
              <Button>Back to Dashboard</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!recommendations) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">No recommendations found.</p>
          <Link href="/dashboard">
            <Button className="mt-4">Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  const renderTechnologyCard = (tech: Technology, isBestFit: boolean = false) => (
    <Card className={`${isBestFit ? 'border-blue-500 bg-blue-50' : ''} hover:shadow-lg transition-shadow`}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center gap-2">
              {tech.name}
              {isBestFit && <Badge className="bg-blue-600">Best Fit</Badge>}
            </CardTitle>
            <CardDescription>{tech.category}</CardDescription>
          </div>
          {isBestFit && <Star className="h-5 w-5 text-yellow-500 fill-current" />}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-4">{tech.description}</p>
        
        <div className="space-y-3">
          <div>
            <h4 className="font-medium text-green-700 flex items-center gap-1">
              <CheckCircle className="h-4 w-4" />
              Pros
            </h4>
            <p className="text-sm text-gray-600">{tech.pros}</p>
          </div>
          
          <div>
            <h4 className="font-medium text-red-700 flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              Cons
            </h4>
            <p className="text-sm text-gray-600">{tech.cons}</p>
          </div>
          
          <div>
            <h4 className="font-medium text-blue-700">Best For</h4>
            <p className="text-sm text-gray-600">{tech.bestFor}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
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
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Tech Stack Recommendations
              </h1>
              {project && (
                <p className="text-gray-600">
                  For project: <span className="font-medium">{project.name}</span>
                </p>
              )}
            </div>
            <Button onClick={handleExport} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* AI Insights */}
        {recommendations.aiInsights && (
          <Alert className="mb-8 bg-blue-50 border-blue-200">
            <Lightbulb className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              <strong>AI Architectural Insights:</strong>
              <div className="mt-2 whitespace-pre-line">{recommendations.aiInsights}</div>
            </AlertDescription>
          </Alert>
        )}

        {/* Recommendations Tabs */}
        <Tabs defaultValue="bestfit" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="bestfit">Best Fit Stack</TabsTrigger>
            <TabsTrigger value="alternatives">Alternatives</TabsTrigger>
          </TabsList>

          {/* Best Fit Stack */}
          <TabsContent value="bestfit" className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Frontend */}
              {recommendations.bestFit.frontend && (
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Globe className="h-5 w-5 text-blue-600" />
                    Frontend
                  </h3>
                  {renderTechnologyCard(recommendations.bestFit.frontend, true)}
                </div>
              )}

              {/* Backend */}
              {recommendations.bestFit.backend && (
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Cpu className="h-5 w-5 text-green-600" />
                    Backend
                  </h3>
                  {renderTechnologyCard(recommendations.bestFit.backend, true)}
                </div>
              )}

              {/* Database */}
              {recommendations.bestFit.database && (
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Database className="h-5 w-5 text-purple-600" />
                    Database
                  </h3>
                  {renderTechnologyCard(recommendations.bestFit.database, true)}
                </div>
              )}

              {/* Language */}
              {recommendations.bestFit.language && (
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Code className="h-5 w-5 text-orange-600" />
                    Language
                  </h3>
                  {renderTechnologyCard(recommendations.bestFit.language, true)}
                </div>
              )}
            </div>
          </TabsContent>

          {/* Alternatives */}
          <TabsContent value="alternatives" className="space-y-8">
            {/* Frontend Alternatives */}
            {recommendations.alternatives.frontend.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Globe className="h-5 w-5 text-blue-600" />
                  Frontend Alternatives
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {recommendations.alternatives.frontend.map((tech) => (
                    <div key={tech.id}>
                      {renderTechnologyCard(tech, false)}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Backend Alternatives */}
            {recommendations.alternatives.backend.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Cpu className="h-5 w-5 text-green-600" />
                  Backend Alternatives
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {recommendations.alternatives.backend.map((tech) => (
                    <div key={tech.id}>
                      {renderTechnologyCard(tech, false)}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Database Alternatives */}
            {recommendations.alternatives.database.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Database className="h-5 w-5 text-purple-600" />
                  Database Alternatives
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {recommendations.alternatives.database.map((tech) => (
                    <div key={tech.id}>
                      {renderTechnologyCard(tech, false)}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Language Alternatives */}
            {recommendations.alternatives.language.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Code className="h-5 w-5 text-orange-600" />
                  Language Alternatives
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {recommendations.alternatives.language.map((tech) => (
                    <div key={tech.id}>
                      {renderTechnologyCard(tech, false)}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="mt-12 flex justify-center gap-4">
          <Link href="/projects/new">
            <Button variant="outline">
              Create Another Project
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button>
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}