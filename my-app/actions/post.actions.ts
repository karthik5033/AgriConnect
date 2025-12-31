'use server';

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export async function createPost(formData: FormData) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  const content = formData.get("content") as string;
  const cropName = formData.get("crop") as string;
  const type = formData.get("type") as any; // PostType enum

  if (!content) {
    throw new Error("Content is required");
  }

  // Find user db id from email
  const user = await prisma.user.findUnique({
      where: { email: session.user.email }
  });

  if (!user) throw new Error("User not found");

  await prisma.post.create({
    data: {
      content,
      cropName,
      type: type || "PLANTATION_UPDATE",
      authorId: user.id,
      // Handle images later with Cloudinary
    },
  });

  revalidatePath("/feed");
  return { success: true };
}

export async function getPosts() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          image: true,
          role: true,
        },
      },
      _count: {
        select: {
            likes: true,
            comments: true
        }
      }
    },
  });

  return posts;
}
