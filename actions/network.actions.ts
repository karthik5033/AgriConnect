'use server';

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export type NetworkFilter = "All" | "FARMER" | "EXPERT" | "BUYER" | "COMPANY" | "AGENT" | "EXPORTER";

export async function getRecommendedUsers() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      throw new Error('You must be logged in');
    }

    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!currentUser) {
      throw new Error('User not found');
    }

    // Get users that current user is not connected to
    const connectedUsers = await prisma.connection.findMany({
      where: {
        OR: [
          { fromUserId: currentUser.id },
          { toUserId: currentUser.id }
        ],
        status: 'connected'
      },
      select: {
        fromUserId: true,
        toUserId: true
      }
    });

    const connectedIds = new Set([
      currentUser.id,
      ...connectedUsers.map(c => c.fromUserId === currentUser.id ? c.toUserId : c.fromUserId)
    ]);

    const recommendedUsers = await prisma.user.findMany({
      where: {
        id: { notIn: Array.from(connectedIds) }
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
        profile: {
          select: {
            bio: true,
            location: true
          }
        }
      },
      take: 10
    });

    return { success: true, users: recommendedUsers };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch recommended users',
      users: []
    };
  }
}

export async function getAllUsers(query?: string, filter?: NetworkFilter) {
  try {
    const where: any = {};

    if (query) {
      where.OR = [
        { name: { contains: query, mode: 'insensitive' } },
        { role: { equals: query } }
      ];
    }

    if (filter && filter !== "All") {
      where.role = { equals: filter };
    }

    const users = await prisma.user.findMany({
      where,
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
      },
      take: 50
    });

    return { success: true, users };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch users',
      users: []
    };
  }
}

export async function connectUser(targetUserId: string) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      throw new Error('You must be logged in');
    }

    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!currentUser) {
      throw new Error('User not found');
    }

    if (currentUser.id === targetUserId) {
      throw new Error('You cannot connect to yourself');
    }

    const targetUser = await prisma.user.findUnique({
      where: { id: targetUserId }
    });

    if (!targetUser) {
      throw new Error('Target user not found');
    }

    // Check if connection already exists
    const existingConnection = await prisma.connection.findFirst({
      where: {
        OR: [
          { fromUserId: currentUser.id, toUserId: targetUserId },
          { fromUserId: targetUserId, toUserId: currentUser.id }
        ]
      }
    });

    if (existingConnection) {
      return { success: false, error: 'Connection already exists' };
    }

    // Create connection request
    await prisma.connection.create({
      data: {
        fromUserId: currentUser.id,
        toUserId: targetUserId,
        status: 'pending'
      }
    });

    revalidatePath("/network");
    return { success: true, message: 'Connection request sent' };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to connect user'
    };
  }
}
