import fs from 'fs/promises';
import path from 'path';
import { MOCK_POSTS } from './mock-data';

const DB_PATH = path.join(process.cwd(), 'lib', 'db.json');

// Types (mirrors simplified Prisma models)
export interface DbData {
  posts: any[];
  users: any[];
}

export async function getDb(): Promise<DbData> {
  try {
    const data = await fs.readFile(DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // If db doesn't exist, initialize it
    const initialData: DbData = {
      posts: MOCK_POSTS.map(p => ({
          ...p,
          comments: p.comments || [], 
          authorId: "u1" // Default owner for seed
      })),
      users: [
        {
          id: "u1",
          name: "Rajesh Kumar",
          email: "rajesh@example.com",
          role: "FARMER",
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=60",
          location: "Punjab, India",
          connections: []
        },
        // Smart Matches
        {
            id: "m1",
            name: "Agro Foods Ltd",
            role: "BUYER",
            location: "Mumbai, Maharashtra",
            specialty: "Buying Wheat & Rice",
            mutual: 12,
            image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=60"
        },
        {
            id: "m2",
            name: "Dr. R.K. Gupta",
            role: "EXPERT",
            location: "Pau, Ludhiana",
            specialty: "Wheat Disease Expert",
            mutual: 8,
            image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&auto=format&fit=crop&q=60"
        },
        {
            id: "m3",
            name: "Greenfield Equipments",
            role: "COMPANY",
            location: "Karnal, Haryana",
            specialty: "Farm Machinery Rental",
            mutual: 15,
            image: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=150&auto=format&fit=crop&q=60"
        },
        // Discovery People
        {
            id: "d1",
            name: "Vikram Singh",
            role: "FARMER",
            location: "Amritsar, Punjab",
            specialty: "Organic Wheat, Potato",
            mutual: 4,
            image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=60"
        },
        {
            id: "d2",
            name: "Sunita Devi",
            role: "FARMER",
            location: "Hisar, Haryana",
            specialty: "Cotton, Mustard",
            mutual: 2,
            image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=60"
        },
        {
            id: "d3",
            name: "Global Exports",
            role: "EXPORTER",
            location: "New Delhi",
            specialty: "Basmati Rice Export",
            mutual: 23,
            image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=150&auto=format&fit=crop&q=60"
        },
        {
            id: "d4",
            name: "Ramesh Pawar",
            role: "AGENT",
            location: "Nashik, Maharashtra",
            specialty: "Onion, Tomato Trader",
            mutual: 7,
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=60"
        },
        {
            id: "d5",
            name: "Organic Fertilizers Co",
            role: "COMPANY",
            location: "Pune, Maharashtra",
            specialty: "Bio-Fertilizers",
            mutual: 11,
            image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=60"
        },
        {
            id: "d6",
            name: "Prof. Anil Kumar",
            role: "EXPERT",
            location: "IARI, Delhi",
            specialty: "Soil Scientist",
            mutual: 19,
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=60"
        }
      ]
    };
    await writeDb(initialData);
    return initialData;
  }
}

export async function writeDb(data: DbData) {
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
}
