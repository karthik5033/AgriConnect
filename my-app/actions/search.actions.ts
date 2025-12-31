'use server';

import { getDb } from "@/lib/db";

export type SearchResult = {
  type: 'user' | 'post';
  id: string;
  title: string;
  subtitle: string;
  image?: string;
  url: string;
};

export async function globalSearch(query: string): Promise<SearchResult[]> {
  if (!query || query.length < 2) return [];

  const db = await getDb();
  const lowerQ = query.toLowerCase();
  const results: SearchResult[] = [];

  // Search Users
  const matchingUsers = db.users.filter((u: any) => 
    u.name.toLowerCase().includes(lowerQ) || 
    u.role.toLowerCase().includes(lowerQ)
  ).slice(0, 3);

  results.push(...matchingUsers.map((u: any) => ({
    type: 'user' as const,
    id: u.id,
    title: u.name,
    subtitle: u.role,
    image: u.image,
    url: `/profile/${u.id}`
  })));

  // Search Posts
  const matchingPosts = db.posts.filter((p: any) => 
    p.content.toLowerCase().includes(lowerQ) ||
    p.cropName?.toLowerCase().includes(lowerQ)
  ).slice(0, 3);

  results.push(...matchingPosts.map((p: any) => ({
    type: 'post' as const,
    id: p.id,
    title: p.author.name,
    subtitle: p.content.substring(0, 60) + "...",
    image: p.author.image,
    url: `/post/${p.id}`
  })));

  return results;
}
