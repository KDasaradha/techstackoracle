import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, BookOpen, Cpu, Database, Globe, Layers, Lock, Rocket, Search, Shield, Users, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
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
          <div className="flex items-center gap-4">
            <Link href="/auth/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/auth/register">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="mb-8">
            <div className="w-24 h-24 mx-auto mb-6 relative">
              <img
                src="/tech-stack-oracle-logo.png"
                alt="Tech Stack Oracle"
                className="w-full h-full object-contain"
              />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Your Architect's
              <span className="text-blue-600"> Copilot</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Navigate the complex world of system design and technology selection with confidence. 
              Get personalized, AI-powered recommendations for your next project.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/auth/register">
              <Button size="lg" className="text-lg px-8 py-3">
                Start Building Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/demo">
              <Button size="lg" variant="outline" className="text-lg px-8 py-3">
                See It In Action
              </Button>
            </Link>
          </div>

          <div className="flex justify-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>1000+ Developers</span>
            </div>
            <div className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              <span>500+ Technologies</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              <span>AI-Powered</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Build Right
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From high-level architecture to low-level implementation details, we've got you covered
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Search className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Smart Recommendations</CardTitle>
                <CardDescription>
                  AI-powered suggestions based on your project requirements, team expertise, and constraints
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Layers className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>System Design Guidance</CardTitle>
                <CardDescription>
                  Learn architectural patterns, best practices, and implementation strategies
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Cpu className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>Tech Stack Analysis</CardTitle>
                <CardDescription>
                  Compare technologies, understand trade-offs, and make informed decisions
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle>DevSecOps Integration</CardTitle>
                <CardDescription>
                  Security best practices, CI/CD pipelines, and deployment strategies built-in
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-red-600" />
                </div>
                <CardTitle>Educational Content</CardTitle>
                <CardDescription>
                  Detailed explanations, use cases, pros and cons for every technology
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <Rocket className="h-6 w-6 text-indigo-600" />
                </div>
                <CardTitle>Quick Start Templates</CardTitle>
                <CardDescription>
                  Pre-configured stacks for common project types to accelerate development
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Go from idea to production-ready architecture in minutes
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Define Your Project</h3>
              <p className="text-gray-600">
                Tell us about your requirements, scale, performance needs, and constraints
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Get AI Recommendations</h3>
              <p className="text-gray-600">
                Receive personalized tech stack suggestions with detailed explanations
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Build with Confidence</h3>
              <p className="text-gray-600">
                Export your stack, access learning resources, and start building
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sample Tech Stacks */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Popular Tech Stack Templates
            </h2>
            <p className="text-xl text-gray-600">
              Start with proven combinations for common use cases
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="text-lg">Modern Web App</CardTitle>
                <CardDescription>React, Node.js, PostgreSQL</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">React</span>
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">Node.js</span>
                  <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded">PostgreSQL</span>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="text-lg">Real-time API</CardTitle>
                <CardDescription>Next.js, TypeScript, Redis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">Next.js</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">TypeScript</span>
                  <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded">Redis</span>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="text-lg">E-commerce</CardTitle>
                <CardDescription>Vue.js, Django, Stripe</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">Vue.js</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">Django</span>
                  <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded">Stripe</span>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="text-lg">Mobile Backend</CardTitle>
                <CardDescription>Flutter, Firebase, Cloud Functions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">Flutter</span>
                  <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded">Firebase</span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">Cloud Functions</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Build Better Software?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of developers who are building production-ready applications with confidence
          </p>
          <Link href="/auth/register">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 relative">
                  <img
                    src="/tech-stack-oracle-logo.png"
                    alt="Tech Stack Oracle"
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="font-bold text-lg">Tech Stack Oracle</span>
              </div>
              <p className="text-gray-400">
                Your intelligent companion for modern software architecture decisions.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/features" className="hover:text-white">Features</Link></li>
                <li><Link href="/templates" className="hover:text-white">Templates</Link></li>
                <li><Link href="/guidance" className="hover:text-white">System Design</Link></li>
                <li><Link href="/pricing" className="hover:text-white">Pricing</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/guidance" className="hover:text-white">System Design Guidance</Link></li>
                <li><Link href="/docs" className="hover:text-white">Documentation</Link></li>
                <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
                <li><Link href="/guides" className="hover:text-white">Guides</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white">About</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link href="/privacy" className="hover:text-white">Privacy</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Tech Stack Oracle. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}