import { User, Post, Notification, AnalyticsData, SocialPlatform } from '../types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    email: 'user@example.com',
    role: 'user',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
  {
    id: '2',
    name: 'Sam Wilson',
    email: 'admin@example.com',
    role: 'admin',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
];

// Mock Posts
export const mockPosts: Post[] = [
  {
    id: '1',
    content: 'Excited to announce our new product launch! #innovation #tech',
    platforms: ['twitter', 'linkedin'],
    media: ['https://images.pexels.com/photos/3943746/pexels-photo-3943746.jpeg?auto=compress&cs=tinysrgb&w=500'],
    scheduledFor: new Date(Date.now() + 86400000), // Tomorrow
    status: 'scheduled',
    engagement: {
      likes: 0,
      shares: 0,
      comments: 0,
      impressions: 0,
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    content: 'Check out our latest blog post on social media strategy',
    platforms: ['facebook', 'twitter', 'linkedin'],
    scheduledFor: undefined,
    status: 'published',
    engagement: {
      likes: 127,
      shares: 42,
      comments: 18,
      impressions: 2430,
    },
    createdAt: new Date(Date.now() - 259200000), // 3 days ago
    updatedAt: new Date(Date.now() - 259200000),
  },
  {
    id: '3',
    content: 'Happy Friday everyone! What are your weekend plans?',
    platforms: ['instagram', 'facebook'],
    media: ['https://images.pexels.com/photos/5409751/pexels-photo-5409751.jpeg?auto=compress&cs=tinysrgb&w=500'],
    scheduledFor: undefined,
    status: 'published',
    engagement: {
      likes: 342,
      shares: 21,
      comments: 47,
      impressions: 3245,
    },
    createdAt: new Date(Date.now() - 172800000), // 2 days ago
    updatedAt: new Date(Date.now() - 172800000),
  },
  {
    id: '4',
    content: 'Draft post about upcoming industry trends',
    platforms: ['linkedin'],
    scheduledFor: undefined,
    status: 'draft',
    engagement: {
      likes: 0,
      shares: 0,
      comments: 0,
      impressions: 0,
    },
    createdAt: new Date(Date.now() - 86400000), // 1 day ago
    updatedAt: new Date(Date.now() - 86400000),
  },
];

// Mock Notifications
export const mockNotifications: Notification[] = [
  {
    id: '1',
    message: 'Your post has been published successfully',
    type: 'success',
    read: false,
    createdAt: new Date(Date.now() - 3600000), // 1 hour ago
  },
  {
    id: '2',
    message: 'Your LinkedIn post received 50+ likes',
    type: 'info',
    read: false,
    createdAt: new Date(Date.now() - 43200000), // 12 hours ago
  },
  {
    id: '3',
    message: 'Failed to schedule post on Twitter',
    type: 'error',
    read: true,
    createdAt: new Date(Date.now() - 172800000), // 2 days ago
  },
];

// Mock Analytics Data
export const generateMockAnalytics = (): Record<SocialPlatform, AnalyticsData> => {
  const platforms: SocialPlatform[] = ['twitter', 'instagram', 'facebook', 'linkedin'];
  
  return platforms.reduce((acc, platform) => {
    acc[platform] = {
      platform,
      followers: Math.floor(Math.random() * 10000) + 1000,
      engagement: Math.random() * 5 + 1, // 1-6%
      impressions: Math.floor(Math.random() * 50000) + 5000,
      growth: Math.random() * 15 - 5, // -5% to +10%
      recentPosts: mockPosts.filter(post => 
        post.platforms.includes(platform) && 
        post.status === 'published'
      ).slice(0, 3),
    };
    return acc;
  }, {} as Record<SocialPlatform, AnalyticsData>);
};

export const mockAnalytics = generateMockAnalytics();

// Mock Analytics Over Time (for charts)
export const generateTimelineData = (days: number) => {
  const data = [];
  const now = Date.now();
  
  for (let i = days; i >= 0; i--) {
    const date = new Date(now - i * 86400000); // Go back i days
    
    data.push({
      date: date.toISOString().split('T')[0],
      twitter: Math.floor(Math.random() * 500) + 100,
      instagram: Math.floor(Math.random() * 800) + 200,
      facebook: Math.floor(Math.random() * 600) + 150,
      linkedin: Math.floor(Math.random() * 400) + 50,
    });
  }
  
  return data;
};

export const mockTimelineData = generateTimelineData(30);

// Mock User Management Data (for admin)
export const mockUserManagement = Array.from({ length: 10 }, (_, i) => ({
  id: `user-${i + 3}`, // starting after our main mock users
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: i < 2 ? 'admin' : 'user',
  status: i < 8 ? 'active' : 'inactive',
  postsCount: Math.floor(Math.random() * 50),
  lastActive: new Date(Date.now() - Math.floor(Math.random() * 30) * 86400000),
}));