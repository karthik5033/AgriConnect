export const MOCK_POSTS = [
    {
      id: "1",
      content: "Just finished harvesting 5 acres of wheat. Yield looks promising this season despite the early rains. 🌾🚜 #Harvest2024\n\nLooking for buyers in the Mandi, expected rate is ₹2200/quintal.",
      createdAt: new Date().toISOString(),
      author: {
          id: "u1",
          name: "Rajesh Kumar",
          role: "FARMER",
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=60"
      },
      cropName: "Wheat",
      likesCount: 24,
      commentsCount: 5,
      images: ["https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop&q=60"],
      comments: [
          { id: "c1", author: "Sunil Verma", content: "Great yield! Which variety did you sow?", time: "2h ago" },
          { id: "c2", author: "Rajesh Kumar", content: "Used HD-3086 this time. Very resistant to rust.", time: "1h ago" }
      ]
    },
    {
      id: "2",
      content: "⚠️ ALERT: Observing heavy pest attack (Pink Bollworm) in Cotton fields near Bhatinda. \n\nPlease spray Emamectin Benzoate 5% SG immediately if you see signs. Check your flowers today! 🔍🦠",
      createdAt: new Date(Date.now() - 3600000).toISOString(),
      author: {
          id: "u3",
          name: "Dr. Amit Verma",
          role: "EXPERT",
          image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&auto=format&fit=crop&q=60"
      },
      cropName: "Cotton",
      likesCount: 156,
      commentsCount: 42,
      images: [],
      comments: []
    },
    {
      id: "3",
      content: "Observing some yellowing on my paddy leaves. Is this nitrogen deficiency or bacterial leaf blight? Any experts here? 🧪🌱",
      createdAt: new Date(Date.now() - 7200000).toISOString(),
      author: {
          id: "u2",
          name: "Priya Singh",
          role: "STUDENT",
          image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=60"
      },
      cropName: "Rice",
      likesCount: 12,
      commentsCount: 8,
      images: ["https://images.unsplash.com/photo-1595305141223-28827fa831cc?w=800&auto=format&fit=crop&q=60"],
      comments: []
    },
    {
      id: "4",
      content: "🚜 AVAILABLE FOR RENT: John Deere 5310 4WD Tractor with Rotavator.\n\nAvailable in Ludhiana district. Rates: ₹800/hour. Contact me for booking next week.",
      createdAt: new Date(Date.now() - 18000000).toISOString(),
      author: {
          id: "u4",
          name: "Vikram Patel",
          role: "OWNER",
          image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=60"
      },
      cropName: null,
      likesCount: 8,
      commentsCount: 2,
      images: ["https://images.unsplash.com/photo-1592982537447-6f2a6a0c7c18?w=800&auto=format&fit=crop&q=60"],
      comments: []
    },
    {
      id: "5",
      content: "Successfully shifted to Organic Farming 2 years ago. Today my soil is softer, darker, and full of earthworms. \n\nStop burning stubble! Use waste decomposer instead. 🌿♻️ #OrganicRevolution",
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      author: {
          id: "u5",
          name: "Anita Desai",
          role: "FARMER",
          image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=60"
      },
      cropName: "Soil Health",
      likesCount: 342,
      commentsCount: 89,
      images: ["https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&auto=format&fit=crop&q=60"],
      comments: []
    },
    {
      id: "6",
      content: "Market Update: Tomato prices surged to ₹80/kg in Nashik market today due to heavy rains disrupting supply. \n\nGood time for farmers with standing crop to harvest! 🍅📈",
      createdAt: new Date(Date.now() - 172800000).toISOString(),
      author: {
          id: "u6",
          name: "Suresh Reddy",
          role: "AGENT",
          image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=60"
      },
      cropName: "Tomato",
      likesCount: 45,
      commentsCount: 12,
      images: [],
      comments: []
    }
  ];
