import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { ArrowUpRight, ArrowDownRight, Users, Activity, Eye } from 'lucide-react';
import { mockAnalytics, mockTimelineData } from '../../data/mockData';

const AnalyticsOverview: React.FC = () => {
  // Calculate totals across all platforms
  const totalFollowers = Object.values(mockAnalytics).reduce(
    (sum, platform) => sum + platform.followers, 
    0
  );
  
  const avgEngagement = Object.values(mockAnalytics).reduce(
    (sum, platform) => sum + platform.engagement, 
    0
  ) / Object.keys(mockAnalytics).length;
  
  const totalImpressions = Object.values(mockAnalytics).reduce(
    (sum, platform) => sum + platform.impressions, 
    0
  );
  
  // Calculate growth (average across platforms)
  const avgGrowth = Object.values(mockAnalytics).reduce(
    (sum, platform) => sum + platform.growth, 
    0
  ) / Object.keys(mockAnalytics).length;

  // Get most recent seven days of data for the chart
  const recentData = mockTimelineData.slice(-7);

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Followers" 
          value={totalFollowers.toLocaleString()} 
          change={avgGrowth} 
          icon={<Users className="h-6 w-6" />} 
        />
        
        <StatCard 
          title="Avg. Engagement" 
          value={`${avgEngagement.toFixed(1)}%`} 
          change={0.8} 
          icon={<Activity className="h-6 w-6" />} 
        />
        
        <StatCard 
          title="Impressions" 
          value={totalImpressions.toLocaleString()} 
          change={5.2} 
          icon={<Eye className="h-6 w-6" />} 
        />
        
        <StatCard 
          title="Active Platforms" 
          value={Object.keys(mockAnalytics).length.toString()} 
          change={0} 
          icon={<Activity className="h-6 w-6" />} 
        />
      </div>
      
      {/* Platform Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Platform Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(mockAnalytics).map(([platform, data]) => (
              <div key={platform} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 capitalize">
                  {platform}
                </h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Followers</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {data.followers.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Engagement</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {data.engagement.toFixed(1)}%
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Impressions</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {data.impressions.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Growth</p>
                    <div className={`flex items-center ${
                      data.growth > 0 
                        ? 'text-green-600 dark:text-green-400' 
                        : 'text-red-600 dark:text-red-400'
                    }`}>
                      {data.growth > 0 ? (
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                      ) : (
                        <ArrowDownRight className="h-3 w-3 mr-1" />
                      )}
                      <span>{Math.abs(data.growth).toFixed(1)}%</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Analytics Chart (Simple representation) */}
      <Card>
        <CardHeader>
          <CardTitle>Engagement Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Last 7 days engagement across platforms
          </p>
          <div className="h-64 relative">
            {/* Simple chart visual representation */}
            <div className="flex h-full items-end space-x-2">
              {recentData.map((day, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div className="w-full flex space-x-0.5">
                    <div 
                      className="bg-blue-500 rounded-t w-1/4" 
                      style={{ height: `${(day.twitter / 1000) * 200}px` }}
                    />
                    <div 
                      className="bg-pink-500 rounded-t w-1/4" 
                      style={{ height: `${(day.instagram / 1000) * 200}px` }}
                    />
                    <div 
                      className="bg-blue-700 rounded-t w-1/4" 
                      style={{ height: `${(day.facebook / 1000) * 200}px` }}
                    />
                    <div 
                      className="bg-blue-900 rounded-t w-1/4" 
                      style={{ height: `${(day.linkedin / 1000) * 200}px` }}
                    />
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {day.date.split('-')[2]}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Simple legend */}
            <div className="flex justify-center space-x-4 mt-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-1" />
                <span className="text-xs text-gray-600 dark:text-gray-400">Twitter</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-pink-500 rounded-full mr-1" />
                <span className="text-xs text-gray-600 dark:text-gray-400">Instagram</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-700 rounded-full mr-1" />
                <span className="text-xs text-gray-600 dark:text-gray-400">Facebook</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-900 rounded-full mr-1" />
                <span className="text-xs text-gray-600 dark:text-gray-400">LinkedIn</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon }) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {title}
            </p>
            <h4 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
              {value}
            </h4>
            
            {change !== 0 && (
              <div className={`flex items-center mt-1 ${
                change > 0 
                  ? 'text-green-600 dark:text-green-400' 
                  : 'text-red-600 dark:text-red-400'
              }`}>
                {change > 0 ? (
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 mr-1" />
                )}
                <span className="text-xs font-medium">{Math.abs(change).toFixed(1)}%</span>
              </div>
            )}
          </div>
          
          <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalyticsOverview;