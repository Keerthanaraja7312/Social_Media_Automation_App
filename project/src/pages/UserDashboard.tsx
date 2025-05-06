import React, { useState } from 'react';
import { Plus, BarChart2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import PostCard from '../components/user/PostCard';
import CreatePostForm from '../components/user/CreatePostForm';
import { mockPosts, mockAnalytics } from '../data/mockData';
import { Post } from '../types';

const UserDashboard: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  const handleCreatePost = (newPost: any) => {
    const createdPost: Post = {
      id: Date.now().toString(),
      ...newPost,
      engagement: {
        likes: 0,
        shares: 0,
        comments: 0,
        impressions: 0,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setPosts([createdPost, ...posts]);
    setIsCreatingPost(false);
  };

  const handleEditPost = (post: Post) => {
    setEditingPost(post);
    setIsCreatingPost(true);
  };

  const handleDeletePost = (post: Post) => {
    setPosts(posts.filter(p => p.id !== post.id));
  };

  // Calculate some simple stats
  const scheduledPosts = posts.filter(post => post.status === 'scheduled').length;
  const publishedPosts = posts.filter(post => post.status === 'published').length;
  const draftPosts = posts.filter(post => post.status === 'draft').length;
  
  // Get total engagement across all published posts
  const totalEngagement = posts
    .filter(post => post.status === 'published')
    .reduce((sum, post) => sum + post.engagement.likes + post.engagement.comments + post.engagement.shares, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        
        <Button
          onClick={() => setIsCreatingPost(true)}
          icon={<Plus size={18} />}
        >
          Create Post
        </Button>
      </div>
      
      {/* Stats overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Scheduled Posts"
          value={scheduledPosts}
          description="Waiting to be published"
          color="bg-blue-500"
        />
        <StatCard
          title="Published Posts"
          value={publishedPosts}
          description="Successfully posted"
          color="bg-green-500"
        />
        <StatCard
          title="Draft Posts"
          value={draftPosts}
          description="Work in progress"
          color="bg-yellow-500"
        />
        <StatCard
          title="Total Engagement"
          value={totalEngagement}
          description="Likes, comments & shares"
          color="bg-purple-500"
        />
      </div>
      
      {/* Quick Analytics */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Analytics Overview</CardTitle>
          <Button 
            variant="outline" 
            size="sm"
            icon={<BarChart2 size={16} />}
          >
            Full Analytics
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {Object.entries(mockAnalytics).map(([platform, data]) => (
              <div key={platform} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                  {platform}
                </h3>
                <div className="mt-2 space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500 dark:text-gray-400">Followers</span>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {data.followers.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500 dark:text-gray-400">Engagement</span>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {data.engagement.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Posts grid */}
      {isCreatingPost ? (
        <CreatePostForm 
          onSubmit={handleCreatePost} 
          onCancel={() => {
            setIsCreatingPost(false);
            setEditingPost(null);
          }} 
        />
      ) : (
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Your Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.map((post) => (
              <PostCard 
                key={post.id} 
                post={post} 
                onEdit={handleEditPost}
                onDelete={handleDeletePost}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: number;
  description: string;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, description, color }) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center">
          <div className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center`}>
            <span className="text-white text-lg font-bold">{value}</span>
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">{title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserDashboard;