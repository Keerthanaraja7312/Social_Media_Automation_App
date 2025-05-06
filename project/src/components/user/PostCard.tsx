import React from 'react';
import { Clock, Edit2, Check, AlertTriangle, Trash2 } from 'lucide-react';
import { Card, CardContent, CardFooter } from '../ui/Card';
import { Post, SocialPlatform } from '../../types';
import Button from '../ui/Button';

interface PostCardProps {
  post: Post;
  onEdit?: (post: Post) => void;
  onDelete?: (post: Post) => void;
}

const PlatformIcon: React.FC<{ platform: SocialPlatform }> = ({ platform }) => {
  const iconClasses = "h-5 w-5";
  
  switch (platform) {
    case 'twitter':
      return <span className="text-blue-400">𝕏</span>;
    case 'facebook':
      return <span className="text-blue-600">f</span>;
    case 'instagram':
      return <span className="text-pink-500">Ig</span>;
    case 'linkedin':
      return <span className="text-blue-700">in</span>;
    default:
      return null;
  }
};

const StatusBadge: React.FC<{ status: Post['status'] }> = ({ status }) => {
  const baseClasses = "text-xs font-medium px-2.5 py-0.5 rounded-full";
  
  switch (status) {
    case 'draft':
      return <span className={`${baseClasses} bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300`}>Draft</span>;
    case 'scheduled':
      return <span className={`${baseClasses} bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300`}>Scheduled</span>;
    case 'published':
      return <span className={`${baseClasses} bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300`}>Published</span>;
    case 'failed':
      return <span className={`${baseClasses} bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300`}>Failed</span>;
    default:
      return null;
  }
};

const PostCard: React.FC<PostCardProps> = ({ post, onEdit, onDelete }) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(date));
  };

  const hasEngagement = post.status === 'published' && (
    post.engagement.likes > 0 || 
    post.engagement.comments > 0 || 
    post.engagement.shares > 0
  );

  return (
    <Card hoverable className="h-full flex flex-col transition-all duration-300 hover:translate-y-[-2px]">
      <CardContent className="flex-grow">
        {/* Status and Platforms */}
        <div className="flex justify-between items-center mb-3">
          <StatusBadge status={post.status} />
          <div className="flex space-x-1">
            {post.platforms.map((platform) => (
              <span 
                key={platform} 
                className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-700"
              >
                <PlatformIcon platform={platform} />
              </span>
            ))}
          </div>
        </div>

        {/* Post Content */}
        <div className="mb-4">
          <p className="text-gray-800 dark:text-gray-200 break-words">
            {post.content.length > 120
              ? `${post.content.substring(0, 120)}...`
              : post.content}
          </p>
        </div>

        {/* Media Preview (if any) */}
        {post.media && post.media.length > 0 && (
          <div className="mb-4">
            <img
              src={post.media[0]}
              alt="Post media"
              className="w-full h-32 object-cover rounded-md"
            />
          </div>
        )}

        {/* Scheduled Time (if scheduled) */}
        {post.status === 'scheduled' && post.scheduledFor && (
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
            <Clock size={14} className="mr-1" />
            <span>Scheduled for {formatDate(post.scheduledFor)}</span>
          </div>
        )}

        {/* Engagement Metrics (if published) */}
        {hasEngagement && (
          <div className="grid grid-cols-3 gap-2 mt-3 text-center">
            <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded-md">
              <div className="text-sm font-medium text-gray-900 dark:text-white">
                {post.engagement.likes}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Likes
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded-md">
              <div className="text-sm font-medium text-gray-900 dark:text-white">
                {post.engagement.comments}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Comments
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded-md">
              <div className="text-sm font-medium text-gray-900 dark:text-white">
                {post.engagement.shares}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Shares
              </div>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-between items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onEdit && onEdit(post)}
          icon={<Edit2 size={14} />}
        >
          Edit
        </Button>
        
        <Button
          variant="danger"
          size="sm"
          onClick={() => onDelete && onDelete(post)}
          icon={<Trash2 size={14} />}
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PostCard;