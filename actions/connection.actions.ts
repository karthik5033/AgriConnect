'use server';

import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function sendConnectionRequest(fromUserId: string, toUserId: string) {
  try {
    if (fromUserId === toUserId) {
      throw new Error('Cannot send connection request to yourself');
    }

    // Check if users exist
    const [fromUser, toUser] = await Promise.all([
      prisma.user.findUnique({ where: { id: fromUserId } }),
      prisma.user.findUnique({ where: { id: toUserId } })
    ]);

    if (!fromUser || !toUser) {
      throw new Error('One or both users not found');
    }

    // Check if connection already exists
    const existingConnection = await prisma.connection.findUnique({
      where: {
        fromUserId_toUserId: {
          fromUserId,
          toUserId
        }
      }
    });

    if (existingConnection) {
      throw new Error('Connection request already exists');
    }

    // Create connection request
    const connection = await prisma.connection.create({
      data: {
        fromUserId,
        toUserId,
        status: 'pending'
      },
      include: {
        fromUser: {
          select: { id: true, name: true, image: true }
        },
        toUser: {
          select: { id: true, name: true, image: true }
        }
      }
    });

    revalidatePath(`/dashboard/network`);

    return { success: true, connection };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send connection request'
    };
  }
}

export async function acceptConnection(fromUserId: string, toUserId: string) {
  try {
    // Update the connection request to accepted
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
        fromUser: {
          select: { id: true, name: true, image: true }
        },
        toUser: {
          select: { id: true, name: true, image: true }
        }
      }
    });

    revalidatePath(`/dashboard/network`);

    return { success: true, connection };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to accept connection'
    };
  }
}

export async function rejectConnection(fromUserId: string, toUserId: string) {
  try {
    await prisma.connection.delete({
      where: {
        fromUserId_toUserId: {
          fromUserId,
          toUserId
        }
      }
    });

    revalidatePath(`/dashboard/network`);

    return { success: true, message: 'Connection request rejected' };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to reject connection'
    };
  }
}

export async function getConnections(userId: string) {
  try {
    // Get all accepted connections
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

    // Transform to always show the "other" user
    const formattedConnections = connections.map((conn: any) => ({
      ...conn,
      connectedUser: conn.fromUserId === userId ? conn.toUser : conn.fromUser,
      connectedUserId: conn.fromUserId === userId ? conn.toUserId : conn.fromUserId
    }));

    return { success: true, connections: formattedConnections };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch connections'
    };
  }
}

export async function getPendingRequests(userId: string) {
  try {
    // Get pending connection requests for this user
    const requests = await prisma.connection.findMany({
      where: {
        toUserId: userId,
        status: 'pending'
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
        }
      }
    });

    return { success: true, requests };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch pending requests'
    };
  }
}

export async function getConnectionStatus(fromUserId: string, toUserId: string) {
  try {
    const connection = await prisma.connection.findFirst({
      where: {
        OR: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId }
        ]
      }
    });

    return {
      success: true,
      status: connection?.status || 'none', // "pending", "connected", or "none"
      connection
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to check connection status'
    };
  }
}

export async function disconnectUser(fromUserId: string, toUserId: string) {
  try {
    // Find and delete the connection
    const connection = await prisma.connection.findFirst({
      where: {
        OR: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId }
        ]
      }
    });

    if (!connection) {
      throw new Error('Connection not found');
    }

    await prisma.connection.delete({
      where: { id: connection.id }
    });

    revalidatePath(`/dashboard/network`);

    return { success: true, message: 'Disconnected successfully' };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to disconnect'
    };
  }
}
