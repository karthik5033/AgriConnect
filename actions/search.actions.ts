'use server';

import prisma from "@/lib/db";

export type SearchResult = {
  type: 'user' | 'post';
  id: string;
  title: string;
  subtitle: string;
  image?: string;
  url: string;
};

export async function globalSearch(query: string): Promise<SearchResult[]> {
  try {
    if (!query || query.length < 2) return [];

    const results: SearchResult[] = [];

    // Search Users
    const matchingUsers = await prisma.user.findMany({
      where: {
        OR: [
          { name: { contains: query } },
          { role: { equals: query } }
        ]
      },
      take: 3,
      select: {
        id: true,
        name: true,
        image: true,
        role: true
      }
    });

    results.push(...matchingUsers.map((u: any) => ({
      type: 'user' as const,
      id: u.id,
      title: u.name || 'Unknown User',
      subtitle: u.role || 'User',
      image: u.image,
      url: `/dashboard/profile/${u.name?.toLowerCase().replace(/\s+/g, '_') || u.id}`
    })));

    // Search Posts
    const matchingPosts = await prisma.post.findMany({
      where: {
        OR: [
          { content: { contains: query } },
          { cropName: { contains: query } }
        ]
      },
      take: 3,
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

    results.push(...matchingPosts.map((p: any) => ({
      type: 'post' as const,
      id: p.id,
      title: p.author?.name || 'Anonymous',
      subtitle: p.content.substring(0, 60) + (p.content.length > 60 ? '...' : ''),
      image: p.author?.image,
      url: `/dashboard/feed#post-${p.id}`
    })));

    return results;
  } catch (error) {
    console.error('Search error:', error);
    return [];
  }
}
