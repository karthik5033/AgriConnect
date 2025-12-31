import { NextResponse } from 'next/server';

// Mock data for the API endpoint
const EQUIPMENT_DATA = [
  {
    id: "e1",
    name: "John Deere 5310 4WD",
    type: "Tractor",
    image: "https://images.unsplash.com/photo-1592860956971-45d614132fa8?w=800&auto=format&fit=crop&q=60",
    rateRaw: 850,
    rateUnit: 'hour',
    location: "Ludhiana, Punjab",
    rating: 4.8,
    reviews: 24,
    availability: 'Available',
    owner: {
      name: "Vikram Singh",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=60",
      isVerified: true
    }
  },
  {
    id: "e2",
    name: "Mahindra Harvester",
    type: "Harvester",
    image: "https://images.unsplash.com/photo-1595116701633-85f2658a5286?w=800&auto=format&fit=crop&q=60",
    rateRaw: 2500,
    rateUnit: 'hour',
    location: "Karnal, Haryana",
    rating: 4.9,
    reviews: 12,
    availability: 'Booked',
    owner: {
      name: "AgriMechanics Co",
      image: null,
      isVerified: true
    }
  },
  {
    id: "e3",
    name: "Laser Land Leveler",
    type: "Attachment",
    image: "https://images.unsplash.com/photo-1530968934440-1017df88cb21?w=800&auto=format&fit=crop&q=60",
    rateRaw: 500,
    rateUnit: 'hour',
    location: "Bathinda, Punjab",
    rating: 4.5,
    reviews: 8,
    availability: 'Available',
    owner: {
      name: "Ramesh Kumar",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=60",
      isVerified: false
    }
  },
  {
    id: "e4",
    name: "Drone Sprayer (10L)",
    type: "Drone",
    image: "https://images.unsplash.com/photo-1508614589041-895b8c9d7ef5?w=800&auto=format&fit=crop&q=60",
    rateRaw: 400,
    rateUnit: 'hour',
    location: "Amritsar, Punjab",
    rating: 5.0,
    reviews: 5,
    availability: 'Available',
    owner: {
      name: "SmartFarm Tech",
      image: null,
      isVerified: true
    }
  }
];

export async function GET() {
  // In a real app, this would fetch from Prisma:
  // const equipment = await prisma.equipment.findMany({ include: { owner: true } });
  
  return NextResponse.json(EQUIPMENT_DATA);
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        // Here you would validate and save to DB
        // const newEquipment = await prisma.equipment.create({ data: ... });
        
        return NextResponse.json({ 
            success: true, 
            message: "Equipment listed successfully",
            data: { id: "new_id", ...body } 
        });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to create listing" },
            { status: 500 }
        );
    }
}
