import { NextResponse } from 'next/server';

// Mock data for conversations
const MOCK_CONVERSATIONS = [
  {
    id: "c1",
    users: [
      { name: "Agro Foods Ltd", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=60" },
      { name: "You", image: null } 
    ],
    lastMessage: {
      content: "We are interested in your wheat harvest. What is the expected yield?",
      createdAt: new Date(Date.now() - 3600000).toISOString(), 
      read: false
    }
  },
  {
    id: "c2",
    users: [
      { name: "Dr. R.K. Gupta", image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&auto=format&fit=crop&q=60" },
      { name: "You", image: null }
    ],
    lastMessage: {
      content: "The yellowing leaves suggest nitrogen deficiency. Try a soil test.",
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      read: true
    }
  },
  {
    id: "c3",
    users: [
      { name: "Vikram Singh", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=60" },
      { name: "You", image: null }
    ],
    lastMessage: {
      content: "Is the tractor available for next Tuesday?",
      createdAt: new Date(Date.now() - 172800000).toISOString(),
      read: true
    }
  }
];

export async function GET() {
  // In a real app:
  // const session = await getServerSession(authOptions);
  // const conversations = await prisma.conversation.findMany({
  //   where: { users: { some: { id: session.user.id } } },
  //   include: { 
  //     users: true, 
  //     messages: { orderBy: { createdAt: 'desc' }, take: 1 } 
  //   }
  // });
  
  return NextResponse.json(MOCK_CONVERSATIONS);
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        // Create new conversation logic
        
        return NextResponse.json({ 
            success: true, 
            id: "new_c_" + Date.now(),
            ...body 
        });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to create conversation" },
            { status: 500 }
        );
    }
}
