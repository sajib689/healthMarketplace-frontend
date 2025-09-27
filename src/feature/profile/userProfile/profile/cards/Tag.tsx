import React from 'react';
import { X } from 'lucide-react';

interface TagProps {
  name: string;
  onRemove?: () => void;
  removable?: boolean;
}

export const Tag: React.FC<TagProps> = ({ name, onRemove, removable = false }) => {
  return (
    <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800 group">
      {name}
      {removable && (
        <button 
          onClick={onRemove} 
          className="ml-1 text-blue-600 hover:text-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </div>
  );
};