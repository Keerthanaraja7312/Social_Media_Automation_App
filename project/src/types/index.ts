export type User = {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  avatar: string;
};

export type SocialPlatform = 'twitter' | 'instagram' | 'facebook' | 'linkedin';

export type PostStatus = 'draft' | 'scheduled' | 'published' | 'failed';

export type Post = {
  id: string;
  content: string;
  platforms: SocialPlatform[];
  media?: string[];
  scheduledFor?: Date;
  status: PostStatus;
  engagement: {
    likes: number;
    shares: number;
    comments: number;
    impressions: number;
  };
  createdAt: Date;
  updatedAt: Date;
};

export type Notification = {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: Date;
};

export type AnalyticsData = {
  platform: SocialPlatform;
  followers: number;
  engagement: number;
  impressions: number;
  growth: number;
  recentPosts: Post[];
};