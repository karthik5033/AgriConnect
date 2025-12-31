import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

// GET /api/profiles/[userId]
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;

    const profile = await prisma.profile.findUnique({
      where: { userId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            role: true,
          }
        }
      }
    });

    if (!profile) {
      return NextResponse.json(
        { error: 'Profile not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, profile });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch profile' },
      { status: 500 }
    );
  }
}

// PUT /api/profiles/[userId]
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;
    const body = await request.json();

    const profile = await prisma.profile.update({
      where: { userId },
      data: {
        ...(body.bio && { bio: body.bio }),
        ...(body.location !== undefined && { location: body.location }),
        ...(body.website !== undefined && { website: body.website }),
        ...(body.crops && { crops: body.crops })
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          }
        }
      }
    });

    return NextResponse.json({ success: true, profile });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update profile' },
      { status: 500 }
    );
  }
}

// DELETE /api/profiles/[userId]
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;

    await prisma.profile.delete({
      where: { userId }
    });

    return NextResponse.json({
      success: true,
      message: 'Profile deleted successfully'
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to delete profile' },
      { status: 500 }
    );
  }
}
