import React, { useState } from 'react';
import { FileImage, Calendar, Plus, X } from 'lucide-react';
import Button from '../ui/Button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui/Card';
import { SocialPlatform } from '../../types';

interface CreatePostFormProps {
  onSubmit: (post: any) => void;
  onCancel: () => void;
}

const PLATFORMS: { id: SocialPlatform; name: string; color: string }[] = [
  { id: 'twitter', name: 'Twitter', color: 'bg-blue-500' },
  { id: 'facebook', name: 'Facebook', color: 'bg-blue-600' },
  { id: 'instagram', name: 'Instagram', color: 'bg-pink-500' },
  { id: 'linkedin', name: 'LinkedIn', color: 'bg-blue-700' },
];

const CreatePostForm: React.FC<CreatePostFormProps> = ({ onSubmit, onCancel }) => {
  const [content, setContent] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<SocialPlatform[]>([]);
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');

  const handlePlatformToggle = (platform: SocialPlatform) => {
    if (selectedPlatforms.includes(platform)) {
      setSelectedPlatforms(selectedPlatforms.filter(p => p !== platform));
    } else {
      setSelectedPlatforms([...selectedPlatforms, platform]);
    }
  };

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      // In a real app, we would upload this file to a server
      // For the prototype, we'll use a placeholder
      setMediaPreview('https://images.pexels.com/photos/3943746/pexels-photo-3943746.jpeg?auto=compress&cs=tinysrgb&w=500');
    }
  };

  const removeMedia = () => {
    setMediaPreview(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (content.trim() === '') return;
    if (selectedPlatforms.length === 0) return;

    let scheduledFor = undefined;
    if (scheduledDate && scheduledTime) {
      scheduledFor = new Date(`${scheduledDate}T${scheduledTime}`);
    }

    const newPost = {
      content,
      platforms: selectedPlatforms,
      media: mediaPreview ? [mediaPreview] : undefined,
      scheduledFor,
      status: scheduledFor ? 'scheduled' : 'draft',
    };

    onSubmit(newPost);
    
    // Reset form
    setContent('');
    setSelectedPlatforms([]);
    setMediaPreview(null);
    setScheduledDate('');
    setScheduledTime('');
  };

  return (
    <Card className="animate-fadeIn">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>Create New Post</CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Post content */}
          <div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What would you like to share?"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              rows={4}
            />
            <div className="mt-1 text-right text-xs text-gray-500 dark:text-gray-400">
              {content.length} characters
            </div>
          </div>

          {/* Platform selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Select platforms
            </label>
            <div className="flex flex-wrap gap-2">
              {PLATFORMS.map((platform) => (
                <button
                  key={platform.id}
                  type="button"
                  onClick={() => handlePlatformToggle(platform.id)}
                  className={`
                    px-3 py-1 rounded-full text-sm font-medium transition-colors
                    ${
                      selectedPlatforms.includes(platform.id)
                        ? `${platform.color} text-white`
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }
                  `}
                >
                  {platform.name}
                </button>
              ))}
            </div>
          </div>

          {/* Media upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Add media
            </label>
            
            {mediaPreview ? (
              <div className="relative">
                <img
                  src={mediaPreview}
                  alt="Media preview"
                  className="h-40 w-full object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={removeMedia}
                  className="absolute top-2 right-2 p-1 bg-gray-800 bg-opacity-70 rounded-full text-white hover:bg-opacity-100 transition-opacity"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <FileImage className="w-8 h-8 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Click to upload image or video
                  </p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*,video/*"
                  onChange={handleMediaChange}
                />
              </label>
            )}
          </div>

          {/* Scheduling */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Schedule post (optional)
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  type="date"
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <input
                  type="time"
                  value={scheduledTime}
                  onChange={(e) => setScheduledTime(e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={content.trim() === '' || selectedPlatforms.length === 0}
            icon={<Plus size={16} />}
          >
            {scheduledDate && scheduledTime ? 'Schedule Post' : 'Save Draft'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default CreatePostForm;