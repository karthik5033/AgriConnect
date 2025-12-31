'use server';

import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function createPost(input: {
  authorId: string;
  content: string;
  type?: string;
  cropName?: string;
  location?: string;
  areaSize?: string;
  growthStage?: string;
  images?: string[];
}) {
  try {
    const {
      authorId,
      content,
      type = 'PLANTATION_UPDATE',
      cropName,
      location,
      areaSize,
      growthStage,
      images = []
    } = input;

    if (!content || content.trim().length === 0) {
      throw new Error('Content is required');
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: authorId }
    });

    if (!user) {
      throw new Error('User not found');
    }

    // Create post
    const post = await prisma.post.create({
      data: {
        content,
        type: (type as any) || 'PLANTATION_UPDATE',
        cropName: cropName || null,
        location: location || null,
        areaSize: areaSize || null,
        growthStage: growthStage || null,
        images,
        author: {
          connect: { id: authorId }
        }
      },
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
          select: {
            id: true,
            content: true,
            author: {
              select: {
                id: true,
                name: true,
                image: true
              }
            },
            createdAt: true
          }
        },
        likes: {
          select: {
            userId: true
          }
        }
      }
    });

    revalidatePath('/dashboard/feed');

    return { success: true, post };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create post'
    };
  }
}

export async function getPosts(limit: number = 20, offset: number = 0) {
  try {
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
          select: {
            id: true,
            content: true,
            author: {
              select: {
                id: true,
                name: true,
                image: true
              }
            },
            createdAt: true
          },
          orderBy: { createdAt: 'desc' },
          take: 3 // Get latest 3 comments
        },
        likes: {
          select: {
            userId: true
          }
        }
      }
    });

    const count = await prisma.post.count();

    return { success: true, posts, total: count };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch posts',
      posts: []
    };
  }
}

export async function getPost(postId: string) {
  try {
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
          select: {
            id: true,
            content: true,
            author: {
              select: {
                id: true,
                name: true,
                image: true
              }
            },
            createdAt: true
          },
          orderBy: { createdAt: 'desc' }
        },
        likes: {
          select: {
            userId: true
          }
        }
      }
    });

    if (!post) {
      return { success: false, error: 'Post not found' };
    }

    return { success: true, post };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch post'
    };
  }
}

export async function updatePost(
  postId: string,
  input: {
    content?: string;
    cropName?: string;
    location?: string;
    areaSize?: string;
    growthStage?: string;
    images?: string[];
  }
) {
  try {
    const post = await prisma.post.update({
      where: { id: postId },
      data: {
        ...(input.content && { content: input.content }),
        ...(input.cropName && { cropName: input.cropName }),
        ...(input.location && { location: input.location }),
        ...(input.areaSize && { areaSize: input.areaSize }),
        ...(input.growthStage && { growthStage: input.growthStage }),
        ...(input.images && { images: input.images })
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true
          }
        },
        comments: true,
        likes: true
      }
    });

    revalidatePath('/dashboard/feed');

    return { success: true, post };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update post'
    };
  }
}

export async function deletePost(postId: string) {
  try {
    await prisma.post.delete({
      where: { id: postId }
    });

    revalidatePath('/dashboard/feed');

    return { success: true, message: 'Post deleted' };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete post'
    };
  }
}

export async function likePost(postId: string, userId: string) {
  try {
    // Check if already liked
    const existingLike = await prisma.like.findUnique({
      where: {
        userId_postId: {
          userId,
          postId
        }
      }
    });

    if (existingLike) {
      // Unlike
      await prisma.like.delete({
        where: {
          userId_postId: {
            userId,
            postId
          }
        }
      });
    } else {
      // Like
      await prisma.like.create({
        data: {
          userId,
          postId
        }
      });
    }

    revalidatePath('/dashboard/feed');

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to like post'
    };
  }
}

export async function addComment(postId: string, userId: string, content: string) {
  try {
    if (!content || content.trim().length === 0) {
      throw new Error('Comment content is required');
    }

    const comment = await prisma.comment.create({
      data: {
        content,
        authorId: userId,
        postId
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true
          }
        }
      }
    });

    revalidatePath('/dashboard/feed');

    return { success: true, comment };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to add comment'
    };
  }
}

export async function commentOnPost(postId: string, content: string) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      throw new Error('You must be logged in to comment');
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      throw new Error('User not found');
    }

    return await addComment(postId, user.id, content);
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to add comment'
    };
  }
}
