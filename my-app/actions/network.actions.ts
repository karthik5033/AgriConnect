'use server';

import { getDb, writeDb } from "@/lib/db";
import { revalidatePath } from "next/cache";

export type NetworkFilter = "All" | "FARMER" | "EXPERT" | "BUYER" | "COMPANY" | "AGENT" | "EXPORTER";

export async function getRecommendedUsers() {
    const db = await getDb();
    // In a real app, logic would be complex. Here, just return users tagged as "m*" (matches)
    return db.users.filter((u: any) => u.id.startsWith("m"));
}

export async function getAllUsers(query?: string, filter?: NetworkFilter) {
    const db = await getDb();
    let users = db.users.filter((u: any) => u.id.startsWith("d")); // d* are discovery users

    if (query) {
        const lowerQ = query.toLowerCase();
        users = users.filter((u: any) => 
            u.name.toLowerCase().includes(lowerQ) || 
            u.role.toLowerCase().includes(lowerQ) ||
            u.specialty?.toLowerCase().includes(lowerQ)
        );
    }

    if (filter && filter !== "All") {
        users = users.filter((u: any) => u.role === filter);
    }

    return users;
}

export async function connectUser(targetUserId: string) {
    const db = await getDb();
    const currentUser = db.users.find((u: any) => u.id === "u1");
    
    if (!currentUser.connections) currentUser.connections = [];
    
    if (!currentUser.connections.includes(targetUserId)) {
        currentUser.connections.push(targetUserId);
        
        // Also add to target user (mutual)
        const targetUser = db.users.find((u: any) => u.id === targetUserId);
        if (targetUser) {
             if (!targetUser.connections) targetUser.connections = [];
             targetUser.connections.push("u1");
        }
    }
    
    await writeDb(db);
    revalidatePath("/network");
    return { success: true };
}
