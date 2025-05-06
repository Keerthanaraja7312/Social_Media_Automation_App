import React, { useState } from 'react';
import UsersTable from '../components/admin/UsersTable';
import AnalyticsOverview from '../components/admin/AnalyticsOverview';
import SystemSettings from '../components/admin/SystemSettings';
import UserActivityLog from '../components/admin/UserActivityLog';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { mockPosts } from '../data/mockData';
import toast from 'react-hot-toast';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'content' | 'settings'>('overview');

  // Content insights data
  const totalPosts = mockPosts.length;
  const postsPerPlatform = mockPosts.reduce((acc, post) => {
    post.platforms.forEach(platform => {
      acc[platform] = (acc[platform] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  const contentPerformance = [
    { type: 'Text only', count: mockPosts.filter(p => !p.media || p.media.length === 0).length },
    { type: 'With media', count: mockPosts.filter(p => p.media && p.media.length > 0).length },
    { type: 'Multi-platform', count: mockPosts.filter(p => p.platforms.length > 1).length },
    { type: 'Single platform', count: mockPosts.filter(p => p.platforms.length === 1).length },
  ];

  // Mock activity log data
  const mockActivityLog = [
    {
      id: '1',
      userId: 'user1',
      action: 'login',
      timestamp: new Date(Date.now() - 3600000),
      details: 'User logged in from Chrome on Windows'
    },
    {
      id: '2',
      userId: 'user2',
      action: 'post_create',
      timestamp: new Date(Date.now() - 7200000),
      details: 'Created new post "Launch announcement" for Twitter and LinkedIn'
    },
    {
      id: '3',
      userId: 'user3',
      action: 'settings_update',
      timestamp: new Date(Date.now() - 10800000),
      details: 'Updated notification preferences'
    }
  ];

  const handleUserAction = (action: string, userId: string) => {
    toast.success(`${action} successful for user ${userId}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8">
          {(['overview', 'users', 'content', 'settings'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                pb-4 px-1 border-b-2 font-medium text-sm
                ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }
              `}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab content */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <AnalyticsOverview />
          <UserActivityLog activities={mockActivityLog} />
        </div>
      )}

      {activeTab === 'users' && (
        <UsersTable 
          onEdit={(userId) => handleUserAction('Edit', userId)}
          onDelete={(userId) => handleUserAction('Delete', userId)}
          onStatusChange={(userId, status) => handleUserAction(`Status change to ${status}`, userId)}
        />
      )}

      {activeTab === 'settings' && (
        <SystemSettings />
      )}

      {activeTab === 'content' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Content Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Posts per platform */}
                <div>
                  <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
                    Posts Per Platform
                  </h3>
                  <div className="space-y-4">
                    {Object.entries(postsPerPlatform).map(([platform, count]) => (
                      <div key={platform} className="flex items-center">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize w-24">
                          {platform}
                        </span>
                        <div className="flex-1 mx-2 h-5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-blue-500 rounded-full" 
                            style={{ width: `${(count / totalPosts) * 100}%` }} 
                          />
                        </div>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 w-8 text-right">
                          {count}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Content Types */}
                <div>
                  <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
                    Content Types
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {contentPerformance.map((item) => (
                      <div 
                        key={item.type} 
                        className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg"
                      >
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {item.type}
                        </p>
                        <p className="text-2xl font-bold text-gray-800 dark:text-white">
                          {item.count}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          ({((item.count / totalPosts) * 100).toFixed(1)}% of total)
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Content Management */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Content</CardTitle>
              <Button size="sm">View All</Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">Content</th>
                      <th scope="col" className="px-6 py-3">Platforms</th>
                      <th scope="col" className="px-6 py-3">Status</th>
                      <th scope="col" className="px-6 py-3">Created</th>
                      <th scope="col" className="px-6 py-3">Engagement</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockPosts.slice(0, 5).map((post) => (
                      <tr key={post.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <td className="px-6 py-4">
                          {post.content.substring(0, 50)}
                          {post.content.length > 50 ? '...' : ''}
                        </td>
                        <td className="px-6 py-4">
                          {post.platforms.join(', ')}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            post.status === 'published' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                              : post.status === 'scheduled'
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                              : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                          }`}>
                            {post.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {new Date(post.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          {post.status === 'published' ? (
                            <span>
                              {post.engagement.likes + post.engagement.comments + post.engagement.shares}
                            </span>
                          ) : (
                            <span>-</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;