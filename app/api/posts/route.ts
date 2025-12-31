import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

// GET /api/posts - Get all posts with pagination
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 100);
    const offset = parseInt(searchParams.get('offset') || '0');

    const posts = await prisma.post.findMany({
      take: limit,
      skip: offset,
      orderBy: { createdAt: 'desc' },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            role: true,
            profile: {
              select: {
                bio: true,
                location: true,
                crops: true
              }
            }
          }
        },
        comments: {
          take: 3,
          orderBy: { createdAt: 'desc' },
          include: {
            author: {
              select: {
                id: true,
                name: true,
                image: true
              }
            }
          }
        },
        likes: {
          select: {
            userId: true
          }
        }
      }
    });

    const total = await prisma.post.count();

    return NextResponse.json({
      success: true,
      posts,
      pagination: {
        limit,
        offset,
        total
      }
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

// POST /api/posts - Create new post
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { authorId, content, type, cropName, location, areaSize, growthStage, images } = body;

    if (!authorId || !content) {
      return NextResponse.json(
        { error: 'Author ID and content are required' },
        { status: 400 }
      );
    }

    const post = await prisma.post.create({
      data: {
        content,
        type: type || 'PLANTATION_UPDATE',
        cropName: cropName || null,
        location: location || null,
        areaSize: areaSize || null,
        growthStage: growthStage || null,
        images: images || [],
        author: {
          connect: { id: authorId }
        }
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true,
            role: true,
          }
        },
        comments: true,
        likes: true
      }
    });

    return NextResponse.json(
      { success: true, post },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create post' },
      { status: 500 }
    );
  }
}
