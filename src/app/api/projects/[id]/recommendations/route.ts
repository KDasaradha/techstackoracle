import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { db } from '@/lib/db';
import ZAI from 'z-ai-web-dev-sdk';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Middleware to verify JWT token
function verifyToken(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('No token provided');
  }

  const token = authHeader.substring(7);
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; email: string };
    return decoded;
  } catch (error) {
    throw new Error('Invalid token');
  }
}

// Get technologies from database
async function getTechnologiesFromDB() {
  const technologies = await db.technology.findMany({
    where: { isActive: true },
    include: {
      category: true,
      tags: {
        include: {
          tag: true
        }
      }
    }
  });

  return technologies.map(tech => ({
    id: tech.id,
    name: tech.name,
    category: tech.category.name,
    description: tech.description,
    pros: tech.advantages || '',
    cons: tech.disadvantages || '',
    bestFor: tech.typicalUseCases ? Array.isArray(tech.typicalUseCases) ? tech.typicalUseCases.join(', ') : tech.typicalUseCases : '',
    websiteUrl: tech.websiteUrl,
    documentationUrl: tech.documentationUrl,
    repositoryUrl: tech.repositoryUrl,
    licenseType: tech.licenseType,
    learningCurve: tech.learningCurve,
    performanceNotes: tech.performanceNotes,
    scalabilityNotes: tech.scalabilityNotes,
    integrationNotes: tech.integrationNotes,
    securityConsiderations: tech.securityConsiderations,
    tags: tech.tags.map(t => t.tag.name),
  }));
}

// Generate recommendations based on project requirements
async function generateRecommendations(requirements: any) {
  const technologies = await getTechnologiesFromDB();
  const recommendations = {
    frontend: [],
    backend: [],
    database: [],
    languages: [],
    bestFit: {
      frontend: null,
      backend: null,
      database: null,
      language: null
    },
    alternatives: {
      frontend: [],
      backend: [],
      database: [],
      language: []
    }
  };

  // Frontend recommendations
  if (requirements.applicationTypes?.includes('Web Application')) {
    const frontendTech = technologies.filter(t => t.category === 'Frontend Framework');
    
    if (requirements.teamExpertise === 'Beginner') {
      recommendations.frontend = frontendTech.filter(t => t.name === 'React');
    } else {
      recommendations.frontend = frontendTech;
    }
    
    recommendations.bestFit.frontend = frontendTech.find(t => t.name === 'Next.js');
    recommendations.alternatives.frontend = frontendTech.filter(t => t.name !== 'Next.js');
  }

  // Backend recommendations
  if (requirements.applicationTypes?.includes('API/Backend Service') || 
      requirements.applicationTypes?.includes('Web Application')) {
    const backendTech = technologies.filter(t => t.category === 'Backend Runtime');
    recommendations.backend = backendTech;
    recommendations.bestFit.backend = backendTech.find(t => t.name === 'Node.js');
    recommendations.alternatives.backend = backendTech.filter(t => t.name !== 'Node.js');
  }

  // Database recommendations
  const databaseTech = technologies.filter(t => t.category === 'Database');
  
  if (requirements.dataSensitivity?.includes('Financial') || 
      requirements.dataSensitivity?.includes('PII')) {
    // Recommend SQL for sensitive data
    recommendations.database = databaseTech.filter(t => t.name === 'PostgreSQL');
    recommendations.bestFit.database = databaseTech.find(t => t.name === 'PostgreSQL');
    recommendations.alternatives.database = databaseTech.filter(t => t.name !== 'PostgreSQL');
  } else {
    // Recommend NoSQL for flexibility
    recommendations.database = databaseTech.filter(t => t.name === 'MongoDB');
    recommendations.bestFit.database = databaseTech.find(t => t.name === 'MongoDB');
    recommendations.alternatives.database = databaseTech.filter(t => t.name !== 'MongoDB');
  }

  // Language recommendations
  const languageTech = technologies.filter(t => t.category === 'Language');
  
  if (requirements.teamSize === 'Large team (15+)') {
    // Recommend TypeScript for large teams
    recommendations.languages = languageTech.filter(t => t.name === 'TypeScript');
    recommendations.bestFit.language = languageTech.find(t => t.name === 'TypeScript');
    recommendations.alternatives.language = languageTech.filter(t => t.name !== 'TypeScript');
  } else {
    recommendations.languages = languageTech;
    recommendations.bestFit.language = languageTech.find(t => t.name === 'TypeScript');
    recommendations.alternatives.language = languageTech.filter(t => t.name !== 'TypeScript');
  }

  return recommendations;
}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Verify JWT token
    const decoded = verifyToken(request);
    
    const projectId = params.id;
    
    // Check if project exists and belongs to user
    const project = await db.project.findFirst({
      where: {
        id: projectId,
        userId: decoded.userId,
      },
      include: {
        recommendations: {
          orderBy: {
            generatedAt: 'desc',
          },
          take: 1,
        },
      },
    });

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    // Generate recommendations
    const recommendations = await generateRecommendations(project.requirementsData);
    
    // Add AI-powered insights
    let aiInsights = '';
    try {
      const zai = await ZAI.create();
      
      const prompt = `Based on these project requirements, provide 3-4 key architectural insights and best practices:

Project: ${project.name}
Description: ${project.description}
Requirements: ${JSON.stringify(project.requirementsData, null, 2)}

Focus on:
1. Architectural patterns that would work well
2. Performance considerations
3. Security best practices
4. Scalability recommendations

Keep the response concise and actionable.`;

      const completion = await zai.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: 'You are an expert software architect providing practical advice for system design.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
      });

      aiInsights = completion.choices[0]?.message?.content || '';
    } catch (aiError) {
      console.error('AI insights generation failed:', aiError);
      aiInsights = 'AI insights are currently unavailable. Please try again later.';
    }

    const recommendationData = {
      ...recommendations,
      aiInsights,
      generatedAt: new Date().toISOString(),
      projectRequirements: project.requirementsData,
    };

    // Save recommendation to database
    const savedRecommendation = await db.recommendation.create({
      data: {
        projectId: projectId,
        userId: decoded.userId,
        recommendationSnapshot: recommendationData,
      },
      select: {
        id: true,
        generatedAt: true,
      }
    });

    return NextResponse.json({
      message: 'Recommendations generated successfully',
      recommendations: recommendationData,
      recommendationId: savedRecommendation.id,
    });
  } catch (error) {
    console.error('Recommendation generation error:', error);
    
    if (error instanceof Error) {
      if (error.message === 'No token provided' || error.message === 'Invalid token') {
        return NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}