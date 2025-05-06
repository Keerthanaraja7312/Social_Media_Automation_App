import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import Button from '../ui/Button';
import { Save, RefreshCw } from 'lucide-react';

const SystemSettings: React.FC = () => {
  const [settings, setSettings] = useState({
    autoModeration: true,
    profanityFilter: true,
    linkChecking: true,
    maxPostsPerDay: 10,
    requireApproval: false,
    notifyOnMention: true,
    emailNotifications: {
      postScheduled: true,
      postPublished: true,
      postFailed: true,
      newComment: false
    }
  });

  const handleChange = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleEmailNotificationChange = (key: string) => {
    setSettings(prev => ({
      ...prev,
      emailNotifications: {
        ...prev.emailNotifications,
        [key]: !prev.emailNotifications[key as keyof typeof prev.emailNotifications]
      }
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>System Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Content Moderation</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div>
                <label className="font-medium text-gray-900 dark:text-white">
                  Auto-Moderation
                </label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Automatically screen posts for inappropriate content
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.autoModeration}
                  onChange={(e) => handleChange('autoModeration', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div>
                <label className="font-medium text-gray-900 dark:text-white">
                  Profanity Filter
                </label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Filter out inappropriate language
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.profanityFilter}
                  onChange={(e) => handleChange('profanityFilter', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Posting Rules</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <label className="flex-1 text-gray-700 dark:text-gray-300">
                Maximum posts per day:
              </label>
              <input
                type="number"
                value={settings.maxPostsPerDay}
                onChange={(e) => handleChange('maxPostsPerDay', parseInt(e.target.value))}
                className="w-24 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium text-gray-900 dark:text-white">
                  Require Approval
                </label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  All posts require admin approval before publishing
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.requireApproval}
                  onChange={(e) => handleChange('requireApproval', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Email Notifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(settings.emailNotifications).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <label className="font-medium text-gray-900 dark:text-white capitalize">
                  {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                </label>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={() => handleEmailNotificationChange(key)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <Button
            variant="outline"
            icon={<RefreshCw size={16} />}
            onClick={() => window.location.reload()}
          >
            Reset to Defaults
          </Button>
          <Button
            icon={<Save size={16} />}
            onClick={() => console.log('Settings saved:', settings)}
          >
            Save Changes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SystemSettings;