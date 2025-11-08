import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { db } from '@/lib/db';
import { z } from 'zod';

// Validation schema
const createProjectSchema = z.object({
  name: z.string().min(1, 'Project name is required').max(100, 'Project name must be less than 100 characters'),
  description: z.string().optional(),
  requirementsData: z.any().optional(),
});

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

export async function POST(request: NextRequest) {
  try {
    // Verify JWT token
    const decoded = verifyToken(request);
    
    const body = await request.json();
    
    // Validate input
    const validatedData = createProjectSchema.parse(body);
    
    // Create project
    const project = await db.project.create({
      data: {
        name: validatedData.name,
        description: validatedData.description,
        requirementsData: validatedData.requirementsData,
        userId: decoded.userId,
      },
      select: {
        id: true,
        name: true,
        description: true,
        requirementsData: true,
        createdAt: true,
        updatedAt: true,
      }
    });

    return NextResponse.json({
      message: 'Project created successfully',
      project,
    });
  } catch (error) {
    console.error('Project creation error:', error);
    
    if (error instanceof Error) {
      if (error.message === 'No token provided' || error.message === 'Invalid token') {
        return NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        );
      }
    }
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Verify JWT token
    const decoded = verifyToken(request);
    
    // Get user's projects
    const projects = await db.project.findMany({
      where: {
        userId: decoded.userId,
      },
      select: {
        id: true,
        name: true,
        description: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            recommendations: true,
          }
        }
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    return NextResponse.json({
      projects,
    });
  } catch (error) {
    console.error('Projects fetch error:', error);
    
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