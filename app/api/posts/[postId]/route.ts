import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

// GET /api/posts/[postId]
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ postId: string }> }
) {
  try {
    const { postId } = await params;

    const post = await prisma.post.findUnique({
      where: { id: postId },
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

    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, post });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch post' },
      { status: 500 }
    );
  }
}

// PUT /api/posts/[postId]
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ postId: string }> }
) {
  try {
    const { postId } = await params;
    const body = await request.json();

    const post = await prisma.post.update({
      where: { id: postId },
      data: {
        ...(body.content && { content: body.content }),
        ...(body.cropName && { cropName: body.cropName }),
        ...(body.location && { location: body.location }),
        ...(body.areaSize && { areaSize: body.areaSize }),
        ...(body.growthStage && { growthStage: body.growthStage }),
        ...(body.images && { images: body.images })
      },
      include: {
        author: true,
        comments: true,
        likes: true
      }
    });

    return NextResponse.json({ success: true, post });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update post' },
      { status: 500 }
    );
  }
}

// DELETE /api/posts/[postId]
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ postId: string }> }
) {
  try {
    const { postId } = await params;

    await prisma.post.delete({
      where: { id: postId }
    });

    return NextResponse.json({
      success: true,
      message: 'Post deleted successfully'
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to delete post' },
      { status: 500 }
    );
  }
}
