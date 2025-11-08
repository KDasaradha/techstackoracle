import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { db } from '@/lib/db';

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

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Verify JWT token
    const decoded = verifyToken(request);
    
    const projectId = params.id;
    
    // Get project with recommendations
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

    return NextResponse.json({
      project: {
        id: project.id,
        name: project.name,
        description: project.description,
        requirementsData: project.requirementsData,
        createdAt: project.createdAt,
        updatedAt: project.updatedAt,
        recommendations: project.recommendations,
      },
    });
  } catch (error) {
    console.error('Project fetch error:', error);
    
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