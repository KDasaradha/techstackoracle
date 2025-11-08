'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, Save, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface ProjectRequirements {
  // Basic Information
  name: string;
  description: string;
  applicationTypes: string[];
  targetPlatforms: string[];
  
  // Scale and Usage
  expectedUsers: string;
  expectedDataVolume: string;
  expectedTraffic: string;
  growthExpectations: string;
  
  // Performance and Scalability
  responseTime: string;
  availability: string;
  scalabilityPreference: string;
  
  // Functional Requirements
  features: string[];
  
  // Technology Preferences
  preferredLanguages: string[];
  preferredFrontendFrameworks: string[];
  preferredBackendFrameworks: string[];
  preferredDatabaseTypes: string[];
  technologiesToAvoid: string[];
  licensingPreference: string;
  budgetConstraints: string;
  
  // Team and Development
  teamSize: string;
  teamExpertise: string;
  developmentTimeline: string;
  developmentSpeedImportance: string;
  
  // Security and Compliance
  dataSensitivity: string;
  securityRequirements: string;
  complianceStandards: string[];
}

const APPLICATION_TYPES = [
  'Web Application',
  'Mobile App (iOS/Android/Cross-platform)',
  'Desktop Application',
  'API/Backend Service',
  'Microservices Architecture',
  'IoT Backend',
];

const TARGET_PLATFORMS = [
  'Web Browsers (Chrome, Firefox, Safari, Edge)',
  'Mobile Devices (iOS, Android)',
  'Desktop (Windows, macOS, Linux)',
  'Cloud Platforms (AWS, GCP, Azure)',
  'Edge Devices/IoT',
];

const USER_RANGES = [
  '1-100',
  '100-1,000',
  '1,000-10,000',
  '10,000-100,000',
  '100,000+',
];

const DATA_VOLUMES = [
  'Less than 1GB',
  '1GB - 10GB',
  '10GB - 100GB',
  '100GB - 1TB',
  '1TB - 10TB',
  '10TB+',
];

const TRAFFIC_RATES = [
  'Less than 100 requests/minute',
  '100 - 1,000 requests/minute',
  '1,000 - 10,000 requests/minute',
  '10,000 - 100,000 requests/minute',
  '100,000+ requests/minute',
];

const RESPONSE_TIMES = [
  '< 100ms',
  '< 500ms',
  '< 1s',
  '1s - 2s',
  '> 2s',
];

const AVAILABILITY_LEVELS = [
  '99.0%',
  '99.9%',
  '99.99%',
  '99.999%',
];

const SCALABILITY_PREFERENCES = [
  'Vertical scaling (scale up)',
  'Horizontal scaling (scale out)',
  'Auto-scale based on demand',
];

const COMMON_FEATURES = [
  'User Authentication and Authorization',
  'Real-time Features (chat, notifications)',
  'File Uploads and Storage',
  'Payment Processing',
  'Geolocation Services',
  'Search Functionality',
  'Content Management',
  'Third-party API Integrations',
  'Data Analytics and Reporting',
  'Email Notifications',
  'Multi-language Support',
];

const PROGRAMMING_LANGUAGES = [
  'JavaScript/TypeScript',
  'Python',
  'Java',
  'Go',
  'C#',
  'Ruby',
  'PHP',
  'Rust',
  'Swift',
  'Kotlin',
];

const FRONTEND_FRAMEWORKS = [
  'React',
  'Angular',
  'Vue.js',
  'Svelte',
  'Next.js',
  'Nuxt.js',
  'Gatsby',
  'Flutter',
];

const BACKEND_FRAMEWORKS = [
  'Node.js/Express',
  'Django',
  'Flask',
  'Spring Boot',
  'ASP.NET Core',
  'Ruby on Rails',
  'Laravel',
  'FastAPI',
];

const DATABASE_TYPES = [
  'SQL (PostgreSQL, MySQL, SQL Server)',
  'NoSQL Document (MongoDB, CouchDB)',
  'NoSQL Key-Value (Redis, DynamoDB)',
  'NoSQL Graph (Neo4j, Amazon Neptune)',
  'NoSQL Column-family (Cassandra, HBase)',
  'In-Memory Database',
  'Search Engine (Elasticsearch, Algolia)',
];

const LICENSING_PREFERENCES = [
  'Open-source only',
  'Commercially supported preferred',
  'Any license acceptable',
];

const BUDGET_CONSTRAINTS = [
  'Free/Open-source solutions only',
  'Low-cost budget',
  'Mid-range budget',
  'Enterprise budget',
];

const TEAM_SIZES = [
  'Solo developer',
  'Small team (2-5)',
  'Medium team (6-15)',
  'Large team (15+)',
];

const TEAM_EXPERTISE_LEVELS = [
  'Beginner',
  'Intermediate',
  'Advanced',
  'Expert',
];

const DEVELOPMENT_TIMELINES = [
  'Rapid prototype/MVP (1-4 weeks)',
  'Quick launch (1-3 months)',
  'Standard development (3-6 months)',
  'Extended development (6+ months)',
];

const IMPORTANCE_LEVELS = [
  'Critical',
  'Important',
  'Moderate',
  'Low',
];

const DATA_SENSITIVITY_LEVELS = [
  'Public data',
  'Internal data',
  'Confidential data',
  'Personally Identifiable Information (PII)',
  'Financial data',
  'Health information (HIPAA)',
];

const SECURITY_REQUIREMENTS = [
  'Basic security best practices',
  'Advanced security features',
  'Enterprise-grade security',
  'Penetration testing required',
];

const COMPLIANCE_STANDARDS = [
  'GDPR',
  'CCPA',
  'SOC 2',
  'HIPAA',
  'PCI DSS',
  'ISO 27001',
];

export default function NewProjectPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();
  const { token, isAuthenticated } = useAuth();

  const [requirements, setRequirements] = useState<ProjectRequirements>({
    name: '',
    description: '',
    applicationTypes: [],
    targetPlatforms: [],
    expectedUsers: '',
    expectedDataVolume: '',
    expectedTraffic: '',
    growthExpectations: '',
    responseTime: '',
    availability: '',
    scalabilityPreference: '',
    features: [],
    preferredLanguages: [],
    preferredFrontendFrameworks: [],
    preferredBackendFrameworks: [],
    preferredDatabaseTypes: [],
    technologiesToAvoid: [],
    licensingPreference: '',
    budgetConstraints: '',
    teamSize: '',
    teamExpertise: '',
    developmentTimeline: '',
    developmentSpeedImportance: '',
    dataSensitivity: '',
    securityRequirements: '',
    complianceStandards: [],
  });

  const totalSteps = 5;
  const progressPercentage = (currentStep / totalSteps) * 100;

  useEffect(() => {
    // Check if user is logged in
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }
  }, [isAuthenticated, router]);

  const updateRequirements = (field: keyof ProjectRequirements, value: any) => {
    setRequirements(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const handleCheckboxChange = (field: keyof ProjectRequirements, value: string, checked: boolean) => {
    const currentArray = requirements[field] as string[];
    if (checked) {
      updateRequirements(field, [...currentArray, value]);
    } else {
      updateRequirements(field, currentArray.filter(item => item !== value));
    }
  };

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 1:
        if (!requirements.name.trim()) {
          setError('Project name is required');
          return false;
        }
        if (!requirements.description.trim()) {
          setError('Project description is required');
          return false;
        }
        if (requirements.applicationTypes.length === 0) {
          setError('Please select at least one application type');
          return false;
        }
        break;
      case 2:
        if (!requirements.expectedUsers) {
          setError('Please select expected number of users');
          return false;
        }
        if (!requirements.expectedDataVolume) {
          setError('Please select expected data volume');
          return false;
        }
        break;
      case 3:
        if (!requirements.responseTime) {
          setError('Please select response time expectations');
          return false;
        }
        if (!requirements.availability) {
          setError('Please select availability requirements');
          return false;
        }
        break;
      case 4:
        if (!requirements.teamSize) {
          setError('Please select team size');
          return false;
        }
        if (!requirements.teamExpertise) {
          setError('Please select team expertise level');
          return false;
        }
        break;
      case 5:
        if (!requirements.dataSensitivity) {
          setError('Please select data sensitivity level');
          return false;
        }
        if (!requirements.securityRequirements) {
          setError('Please select security requirements');
          return false;
        }
        break;
    }
    return true;
  };

  const handleNext = () => {
    if (!validateCurrentStep()) {
      return;
    }
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setError('');

    try {
      if (!token) {
        throw new Error('User not authenticated');
      }

      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: requirements.name,
          description: requirements.description,
          requirementsData: requirements,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save project');
      }

      router.push(`/projects/${data.id}/recommendations`);
    } catch (err: any) {
      setError(err.message || 'An error occurred while saving the project');
    } finally {
      setIsSaving(false);
    }
  };

  const handleGenerateRecommendations = async () => {
    if (!validateCurrentStep()) {
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      if (!token) {
        throw new Error('User not authenticated');
      }

      // First save the project
      const projectResponse = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: requirements.name,
          description: requirements.description,
          requirementsData: requirements,
        }),
      });

      const projectData = await projectResponse.json();

      if (!projectResponse.ok) {
        throw new Error(projectData.error || 'Failed to save project');
      }

      // Generate recommendations
      const recommendationResponse = await fetch(`/api/projects/${projectData.id}/recommendations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const recommendationData = await recommendationResponse.json();

      if (!recommendationResponse.ok) {
        throw new Error(recommendationData.error || 'Failed to generate recommendations');
      }

      router.push(`/projects/${projectData.id}/recommendations`);
    } catch (err: any) {
      setError(err.message || 'An error occurred while generating recommendations');
    } finally {
      setIsLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Project Name *</Label>
                  <Input
                    id="name"
                    value={requirements.name}
                    onChange={(e) => updateRequirements('name', e.target.value)}
                    placeholder="My Awesome Project"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Project Description *</Label>
                  <Textarea
                    id="description"
                    value={requirements.description}
                    onChange={(e) => updateRequirements('description', e.target.value)}
                    placeholder="Describe your project, its purpose, and what you want to achieve..."
                    rows={4}
                  />
                </div>

                <div>
                  <Label>Application Types *</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {APPLICATION_TYPES.map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox
                          id={type}
                          checked={requirements.applicationTypes.includes(type)}
                          onCheckedChange={(checked) => handleCheckboxChange('applicationTypes', type, checked as boolean)}
                        />
                        <Label htmlFor={type} className="text-sm">{type}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Target Platforms</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {TARGET_PLATFORMS.map((platform) => (
                      <div key={platform} className="flex items-center space-x-2">
                        <Checkbox
                          id={platform}
                          checked={requirements.targetPlatforms.includes(platform)}
                          onCheckedChange={(checked) => handleCheckboxChange('targetPlatforms', platform, checked as boolean)}
                        />
                        <Label htmlFor={platform} className="text-sm">{platform}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Scale and Usage Requirements</h3>
              <div className="space-y-4">
                <div>
                  <Label>Expected Number of Users *</Label>
                  <Select value={requirements.expectedUsers} onValueChange={(value) => updateRequirements('expectedUsers', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select user range" />
                    </SelectTrigger>
                    <SelectContent>
                      {USER_RANGES.map((range) => (
                        <SelectItem key={range} value={range}>{range}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Expected Data Volume *</Label>
                  <Select value={requirements.expectedDataVolume} onValueChange={(value) => updateRequirements('expectedDataVolume', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select data volume" />
                    </SelectTrigger>
                    <SelectContent>
                      {DATA_VOLUMES.map((volume) => (
                        <SelectItem key={volume} value={volume}>{volume}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Expected Traffic/Request Rate</Label>
                  <Select value={requirements.expectedTraffic} onValueChange={(value) => updateRequirements('expectedTraffic', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select traffic rate" />
                    </SelectTrigger>
                    <SelectContent>
                      {TRAFFIC_RATES.map((rate) => (
                        <SelectItem key={rate} value={rate}>{rate}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Growth Expectations</Label>
                  <Select value={requirements.growthExpectations} onValueChange={(value) => updateRequirements('growthExpectations', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select growth expectation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Slow">Slow growth</SelectItem>
                      <SelectItem value="Moderate">Moderate growth</SelectItem>
                      <SelectItem value="Rapid">Rapid growth</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Performance and Scalability Needs</h3>
              <div className="space-y-4">
                <div>
                  <Label>Response Time Expectations *</Label>
                  <Select value={requirements.responseTime} onValueChange={(value) => updateRequirements('responseTime', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select response time" />
                    </SelectTrigger>
                    <SelectContent>
                      {RESPONSE_TIMES.map((time) => (
                        <SelectItem key={time} value={time}>{time}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Availability/Uptime Requirements *</Label>
                  <Select value={requirements.availability} onValueChange={(value) => updateRequirements('availability', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select availability level" />
                    </SelectTrigger>
                    <SelectContent>
                      {AVAILABILITY_LEVELS.map((level) => (
                        <SelectItem key={level} value={level}>{level}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Scalability Preference</Label>
                  <Select value={requirements.scalabilityPreference} onValueChange={(value) => updateRequirements('scalabilityPreference', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select scalability preference" />
                    </SelectTrigger>
                    <SelectContent>
                      {SCALABILITY_PREFERENCES.map((preference) => (
                        <SelectItem key={preference} value={preference}>{preference}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Team and Development Considerations</h3>
              <div className="space-y-4">
                <div>
                  <Label>Team Size *</Label>
                  <Select value={requirements.teamSize} onValueChange={(value) => updateRequirements('teamSize', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select team size" />
                    </SelectTrigger>
                    <SelectContent>
                      {TEAM_SIZES.map((size) => (
                        <SelectItem key={size} value={size}>{size}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Team Expertise Level *</Label>
                  <Select value={requirements.teamExpertise} onValueChange={(value) => updateRequirements('teamExpertise', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select expertise level" />
                    </SelectTrigger>
                    <SelectContent>
                      {TEAM_EXPERTISE_LEVELS.map((level) => (
                        <SelectItem key={level} value={level}>{level}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Development Timeline</Label>
                  <Select value={requirements.developmentTimeline} onValueChange={(value) => updateRequirements('developmentTimeline', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select timeline" />
                    </SelectTrigger>
                    <SelectContent>
                      {DEVELOPMENT_TIMELINES.map((timeline) => (
                        <SelectItem key={timeline} value={timeline}>{timeline}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Importance of Development Speed</Label>
                  <Select value={requirements.developmentSpeedImportance} onValueChange={(value) => updateRequirements('developmentSpeedImportance', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select importance level" />
                    </SelectTrigger>
                    <SelectContent>
                      {IMPORTANCE_LEVELS.map((level) => (
                        <SelectItem key={level} value={level}>{level}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Security and Compliance Requirements</h3>
              <div className="space-y-4">
                <div>
                  <Label>Data Sensitivity *</Label>
                  <Select value={requirements.dataSensitivity} onValueChange={(value) => updateRequirements('dataSensitivity', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select data sensitivity" />
                    </SelectTrigger>
                    <SelectContent>
                      {DATA_SENSITIVITY_LEVELS.map((level) => (
                        <SelectItem key={level} value={level}>{level}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Security Requirements *</Label>
                  <Select value={requirements.securityRequirements} onValueChange={(value) => updateRequirements('securityRequirements', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select security requirements" />
                    </SelectTrigger>
                    <SelectContent>
                      {SECURITY_REQUIREMENTS.map((requirement) => (
                        <SelectItem key={requirement} value={requirement}>{requirement}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Compliance Standards</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {COMPLIANCE_STANDARDS.map((standard) => (
                      <div key={standard} className="flex items-center space-x-2">
                        <Checkbox
                          id={standard}
                          checked={requirements.complianceStandards.includes(standard)}
                          onCheckedChange={(checked) => handleCheckboxChange('complianceStandards', standard, checked as boolean)}
                        />
                        <Label htmlFor={standard} className="text-sm">{standard}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

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
        <div className="max-w-4xl mx-auto">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <h1 className="text-2xl font-bold">Define Your Project</h1>
              <span className="text-sm text-gray-600">Step {currentStep} of {totalSteps}</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>

          {/* Error Alert */}
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Form Content */}
          <Card>
            <CardHeader>
              <CardTitle>
                {currentStep === 1 && 'Basic Information'}
                {currentStep === 2 && 'Scale and Usage Requirements'}
                {currentStep === 3 && 'Performance and Scalability Needs'}
                {currentStep === 4 && 'Team and Development Considerations'}
                {currentStep === 5 && 'Security and Compliance Requirements'}
              </CardTitle>
              <CardDescription>
                {currentStep === 1 && 'Tell us about your project\'s basic information and purpose.'}
                {currentStep === 2 && 'Help us understand the scale and usage patterns you expect.'}
                {currentStep === 3 && 'Specify your performance requirements and scalability preferences.'}
                {currentStep === 4 && 'Provide information about your development team and timeline.'}
                {currentStep === 5 && 'Define your security requirements and compliance needs.'}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              {renderStepContent()}
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-8">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handleSave}
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Draft
                  </>
                )}
              </Button>

              {currentStep === totalSteps ? (
                <Button
                  onClick={handleGenerateRecommendations}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      Generate Recommendations
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>
              ) : (
                <Button onClick={handleNext}>
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}