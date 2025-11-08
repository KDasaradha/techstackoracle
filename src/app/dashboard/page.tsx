'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, LogOut, Settings, FolderOpen, TrendingUp, Users, Zap } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function DashboardPage() {
  const { user, logout, isAuthenticated } = useAuth();

  console.log('Dashboard: render - isAuthenticated:', isAuthenticated, 'user:', user);

  // 🧭 Redirect or loader for unauthenticated state
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  // 🧭 Loader if user exists but not yet loaded
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Loading user data...</p>
        </div>
      </div>
    );
  }

  // ✅ Authenticated dashboard content
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
            <Button variant="ghost" size="sm" disabled>
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button variant="ghost" size="sm" onClick={logout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user.name}!
          </h1>
          <p className="text-gray-600">
            Ready to architect your next project? Let's build something amazing together.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Projects</p>
                  <p className="text-2xl font-bold text-gray-900">0</p>
                </div>
                <FolderOpen className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Tech Stacks</p>
                  <p className="text-2xl font-bold text-gray-900">0</p>
                </div>
                <Zap className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Recommendations</p>
                  <p className="text-2xl font-bold text-gray-900">0</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Team Members</p>
                  <p className="text-2xl font-bold text-gray-900">1</p>
                </div>
                <Users className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Start a New Project</CardTitle>
              <CardDescription>
                Define your requirements and get personalized tech stack recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/projects/new">
                <Button className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Project
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Browse Templates</CardTitle>
              <CardDescription>
                Explore pre-configured tech stacks for common project types
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/templates">
                <Button variant="outline" className="w-full">
                  <FolderOpen className="h-4 w-4 mr-2" />
                  View Templates
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Recent Projects */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Projects</CardTitle>
            <CardDescription>
              Your recently created or modified projects
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <FolderOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No projects yet</h3>
              <p className="text-gray-600 mb-4">
                Start by creating your first project to get personalized tech stack recommendations.
              </p>
              <Link href="/projects/new">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Project
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
