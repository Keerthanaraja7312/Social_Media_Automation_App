import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Activity } from 'lucide-react';

interface ActivityLogEntry {
  id: string;
  userId: string;
  action: string;
  timestamp: Date;
  details: string;
}

interface UserActivityLogProps {
  activities: ActivityLogEntry[];
}

const UserActivityLog: React.FC<UserActivityLogProps> = ({ activities }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Activity size={20} className="mr-2" />
          User Activity Log
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
            >
              <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-blue-500" />
              <div className="flex-1">
                <p className="text-sm text-gray-800 dark:text-gray-200">
                  {activity.details}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {new Date(activity.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserActivityLog;