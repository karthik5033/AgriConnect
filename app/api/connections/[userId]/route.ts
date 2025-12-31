import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

// GET /api/connections/[userId] - Get user's connections
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;

    const connections = await prisma.connection.findMany({
      where: {
        OR: [
          { fromUserId: userId, status: 'connected' },
          { toUserId: userId, status: 'connected' }
        ]
      },
      include: {
        fromUser: {
          select: {
            id: true,
            name: true,
            image: true,
            role: true,
            profile: {
              select: { bio: true, location: true, crops: true }
            }
          }
        },
        toUser: {
          select: {
            id: true,
            name: true,
            image: true,
            role: true,
            profile: {
              select: { bio: true, location: true, crops: true }
            }
          }
        }
      }
    });

    return NextResponse.json({ success: true, connections });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch connections' },
      { status: 500 }
    );
  }
}

// POST /api/connections/[userId]/send - Send connection request
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;
    const body = await request.json();
    const { toUserId } = body;

    if (!toUserId) {
      return NextResponse.json(
        { error: 'Target user ID is required' },
        { status: 400 }
      );
    }

    if (userId === toUserId) {
      return NextResponse.json(
        { error: 'Cannot connect to yourself' },
        { status: 400 }
      );
    }

    // Check if connection already exists
    const existing = await prisma.connection.findFirst({
      where: {
        OR: [
          { fromUserId: userId, toUserId },
          { fromUserId: toUserId, toUserId: userId }
        ]
      }
    });

    if (existing) {
      return NextResponse.json(
        { error: 'Connection already exists' },
        { status: 400 }
      );
    }

    const connection = await prisma.connection.create({
      data: {
        fromUserId: userId,
        toUserId,
        status: 'pending'
      },
      include: {
        fromUser: { select: { id: true, name: true, image: true } },
        toUser: { select: { id: true, name: true, image: true } }
      }
    });

    return NextResponse.json(
      { success: true, connection },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to send connection request' },
      { status: 500 }
    );
  }
}
