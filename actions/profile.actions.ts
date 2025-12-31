'use server';

import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export interface CreateProfileInput {
  userId?: string;
  name?: string;
  email?: string;
  gender?: string;
  age?: number;
  bio: string;
  location?: string;
  website?: string;
  crops: string | string[];
}

export async function createProfile(input: CreateProfileInput) {
  try {
    let { userId, name, email, gender, age, bio, location, website, crops } = input;

    // If no userId provided, get from session or create/use default user
    if (!userId) {
      const session = await getServerSession(authOptions);
      
      let user;
      if (session?.user?.email) {
        user = await prisma.user.findUnique({
          where: { email: session.user.email }
        });
      }
      
      // If no session or user not found, use or create a default test user
      if (!user) {
        const userEmail = email || "rajesh@example.com";
        const userName = name || "Rajesh Kumar";
        
        user = await prisma.user.findUnique({
          where: { email: userEmail }
        });

        if (!user) {
          user = await prisma.user.create({
            data: {
              email: userEmail,
              name: userName,
              role: "FARMER",
              gender: gender || undefined,
              age: age || undefined
            }
          });
        } else {
          // Update existing user with new fields if provided
          if (name || gender || age) {
            user = await prisma.user.update({
              where: { id: user.id },
              data: {
                name: name || user.name,
                gender: gender || user.gender,
                age: age || user.age
              }
            });
          }
        }
      }

      if (!user) {
        throw new Error('Could not find or create user');
      }

      userId = user.id;
    } else {
      // If userId is provided, update user with new fields
      const user = await prisma.user.findUnique({ where: { id: userId } });
      if (!user) throw new Error('User not found');

      if (name || gender || age || email) {
        await prisma.user.update({
          where: { id: userId },
          data: {
            name: name || user.name,
            email: email || user.email,
            gender: gender || user.gender,
            age: age || user.age
          }
        });
      }
    }

    // Validation
    if (!userId) throw new Error('User ID is required');
    if (!bio || bio.trim().length === 0) throw new Error('Bio is required');
    if (bio.length > 500) throw new Error('Bio must be 500 characters or less');
    
    // Convert crops to array if string
    let cropsArray: string[];
    if (typeof crops === 'string') {
      cropsArray = crops.split(',').map(c => c.trim()).filter(c => c);
    } else {
      cropsArray = crops;
    }
    
    if (!cropsArray || cropsArray.length === 0) throw new Error('Please select at least one crop');

    // Check if user exists
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error('User not found');

    // Check if profile already exists
    const existingProfile = await prisma.profile.findUnique({
      where: { userId }
    });
    if (existingProfile) {
      // If profile exists, update it instead
      const updatedProfile = await prisma.profile.update({
        where: { userId },
        data: {
          bio,
          location: location || undefined,
          website: website || undefined,
          crops: cropsArray.join(',') as any,
          profileImage: undefined
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
              role: true,
              gender: true,
              age: true
            }
          }
        }
      });

      revalidatePath('/dashboard/profile');
      revalidatePath(`/dashboard/profile/${user.name?.toLowerCase().replace(/\s+/g, '_') || userId}`);

      return {
        success: true,
        profile: updatedProfile,
        username: user.name?.toLowerCase().replace(/\s+/g, '_') || userId,
        message: 'Profile updated successfully'
      };
    }

    // Create profile
    const profile = await prisma.profile.create({
      data: {
        userId,
        bio,
        location: location || undefined,
        website: website || undefined,
        crops: cropsArray.join(',') as any,
        profileImage: undefined
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            role: true,
            gender: true,
            age: true
          }
        }
      }
    });

    revalidatePath('/dashboard/profile');
    revalidatePath(`/dashboard/profile/${user.name?.toLowerCase().replace(/\s+/g, '_') || userId}`);

    return {
      success: true,
      profile,
      username: user.name?.toLowerCase().replace(/\s+/g, '_') || userId,
      message: 'Profile created successfully'
    };
  } catch (error) {
    console.error('Profile creation error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create profile'
    };
  }
}

export async function getProfile(userId: string) {
  try {
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
      return { success: false, error: 'Profile not found' };
    }

    return { success: true, profile };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch profile'
    };
  }
}

export async function updateProfile(userId: string, updates: Partial<CreateProfileInput>) {
  try {
    const updateData: any = {};

    if (updates.bio) updateData.bio = updates.bio;
    if (updates.location !== undefined) updateData.location = updates.location;
    if (updates.website !== undefined) updateData.website = updates.website;
    
    if (updates.crops) {
      if (typeof updates.crops === 'string') {
        updateData.crops = updates.crops;
      } else if (Array.isArray(updates.crops)) {
        updateData.crops = updates.crops.join(',');
      }
    }

    const profile = await prisma.profile.update({
      where: { userId },
      data: updateData,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          }
        }
      }
    });

    revalidatePath(`/dashboard/profile`);

    return { success: true, profile };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update profile'
    };
  }
}

export async function getProfileByUsername(username: string) {
  try {
    // Search for user by name (converted to username format)
    const user = await prisma.user.findFirst({
      where: {
        name: {
          contains: username.replace(/_/g, ' '),
          mode: 'insensitive'
        }
      }
    });

    if (!user) {
      return { success: false, error: 'User not found' };
    }

    const profile = await prisma.profile.findUnique({
      where: { userId: user.id },
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
      return { success: false, error: 'Profile not found' };
    }

    return { success: true, profile };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch profile'
    };
  }
}

export async function deleteProfile(userId: string) {
  try {
    await prisma.profile.delete({
      where: { userId }
    });

    revalidatePath('/dashboard/profile');

    return { success: true, message: 'Profile deleted' };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete profile'
    };
  }
}
