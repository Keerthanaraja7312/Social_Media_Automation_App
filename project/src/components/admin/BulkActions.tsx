import React from 'react';
import { Download, UserCheck, UserX, Trash2 } from 'lucide-react';
import Button from '../ui/Button';
import { CSVLink } from 'react-csv';

interface BulkActionsProps {
  selectedUsers: string[];
  onBulkActivate: () => void;
  onBulkDeactivate: () => void;
  onBulkDelete: () => void;
  userData: any[];
}

const BulkActions: React.FC<BulkActionsProps> = ({
  selectedUsers,
  onBulkActivate,
  onBulkDeactivate,
  onBulkDelete,
  userData
}) => {
  const hasSelection = selectedUsers.length > 0;
  
  const csvData = userData.map(user => ({
    Name: user.name,
    Email: user.email,
    Role: user.role,
    Status: user.status,
    'Last Active': new Date(user.lastActive).toLocaleDateString(),
    'Posts Count': user.postsCount
  }));

  return (
    <div className="flex items-center space-x-2 mb-4">
      <Button
        size="sm"
        variant="secondary"
        disabled={!hasSelection}
        onClick={onBulkActivate}
        icon={<UserCheck size={16} />}
      >
        Activate ({selectedUsers.length})
      </Button>
      
      <Button
        size="sm"
        variant="outline"
        disabled={!hasSelection}
        onClick={onBulkDeactivate}
        icon={<UserX size={16} />}
      >
        Deactivate ({selectedUsers.length})
      </Button>
      
      <Button
        size="sm"
        variant="danger"
        disabled={!hasSelection}
        onClick={onBulkDelete}
        icon={<Trash2 size={16} />}
      >
        Delete ({selectedUsers.length})
      </Button>

      <CSVLink
        data={csvData}
        filename="user-data.csv"
        className={`inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-lg
          ${hasSelection 
            ? 'bg-green-600 text-white hover:bg-green-700' 
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
      >
        <Download size={16} className="mr-2" />
        Export Selected
      </CSVLink>
    </div>
  );
};

export default BulkActions;