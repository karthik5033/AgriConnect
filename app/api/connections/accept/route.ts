import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

// POST /api/connections/accept - Accept connection request
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fromUserId, toUserId } = body;

    if (!fromUserId || !toUserId) {
      return NextResponse.json(
        { error: 'Both user IDs are required' },
        { status: 400 }
      );
    }

    const connection = await prisma.connection.update({
      where: {
        fromUserId_toUserId: {
          fromUserId,
          toUserId
        }
      },
      data: {
        status: 'connected'
      },
      include: {
        fromUser: { select: { id: true, name: true, image: true } },
        toUser: { select: { id: true, name: true, image: true } }
      }
    });

    return NextResponse.json({ success: true, connection });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to accept connection' },
      { status: 500 }
    );
  }
}
