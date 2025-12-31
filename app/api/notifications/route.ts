import { NextResponse } from 'next/server';

// Mock Data
const MOCK_NOTIFICATIONS = [
  {
    id: "n1",
    type: "LIKE",
    content: "Vikram Singh liked your post 'Wheat harvest update'",
    read: false,
    createdAt: new Date(Date.now() - 1200000).toISOString(),
    link: "/feed"
  },
  {
    id: "n2",
    type: "COMMENT",
    content: "Dr. R.K. Gupta commented: 'Great progress! Have you checked moisture?'",
    read: false,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    link: "/feed"
  },
  {
    id: "n3",
    type: "ORDER_UPDATE",
    content: "Your tractor rental request for John Deere 5310 has been approved.",
    read: true,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    link: "/equipment"
  },
  {
    id: "n4",
    type: "SYSTEM",
    content: "Welcome to AgriConnect! Complete your profile to get better recommendations.",
    read: true,
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    link: "/profile"
  }
];

export async function GET() {
  // In real app:
  // const notifications = await prisma.notification.findMany({
  //   where: { recipientId: session.user.id },
  //   orderBy: { createdAt: 'desc' }
  // });
  
  return NextResponse.json(MOCK_NOTIFICATIONS);
}

export async function PATCH(request: Request) {
    try {
        const body = await request.json();
        // Mark as read logic
        // await prisma.notification.update({ where: { id: body.id }, data: { read: true } });
        
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to update notification" },
            { status: 500 }
        );
    }
}
