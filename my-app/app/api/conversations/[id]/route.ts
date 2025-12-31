import { NextResponse } from 'next/server';

// Mock messages for a specific conversation
const MOCK_MESSAGES = [
  {
    id: "m1",
    content: "Hello, I saw your post about the wheat harvest.",
    senderId: "other",
    createdAt: new Date(Date.now() - 7200000).toISOString(),
  },
  {
    id: "m2",
    content: "Hi! Yes, we are expecting good yield this year.",
    senderId: "me",
    createdAt: new Date(Date.now() - 7100000).toISOString(),
  },
  {
    id: "m3",
    content: "We are interested in your wheat harvest. What is the expected yield?",
    senderId: "other",
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  }
];

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
  // In real app: Fetch messages for params.id
  
  return NextResponse.json(MOCK_MESSAGES);
}

export async function POST(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const body = await request.json();
        // Save message to DB
        
        return NextResponse.json({
            success: true,
            id: "msg_" + Date.now(),
            content: body.content,
            senderId: "me",
            createdAt: new Date().toISOString()
        });
    } catch (error) {
         return NextResponse.json(
            { error: "Failed to send message" },
            { status: 500 }
        );
    }
}
