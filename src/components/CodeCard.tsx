import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { getCodeThumbnail } from '../utils/thumbnailUtils';

interface CodeCardProps {
  code: {
    id: string;
    name: string;
    data: Record<string, string[]>;
  };
  onDoubleClick: (id: string) => void;
  onDelete: (code: any) => void;
}

const formatMEBoxSources = (data: Record<string, string[]>) => {
  if (!data.me || !Array.isArray(data.me)) return {};
  
  const meEntries = data.me
    .filter(item => item && typeof item === 'string' && item.includes(':'))
    .map(item => {
      const [boxId, source] = item.split(':');
      return [boxId, source];
    });
  
  return Object.fromEntries(meEntries);
};

export const CodeCard: React.FC<CodeCardProps> = ({ code, onDoubleClick, onDelete }) => {
  const meBoxes = formatMEBoxSources(code.data);
  
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <motion.div
          onDoubleClick={() => onDoubleClick(code.id)}
          className="aspect-square p-2 rounded-lg backdrop-blur-sm transition-all duration-300 bg-menu-darker/80 text-menu-subtext hover:bg-menu-highlight cursor-move"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex justify-end">
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(code);
              }}
              className="hover:bg-red-500/20 hover:text-red-500"
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
          <div className="w-12 h-12 mx-auto mb-1 rounded-md overflow-hidden">
            <img
              src={getCodeThumbnail(code.data)}
              alt={code.name}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-xs font-medium tracking-wide text-white block text-center truncate">
            {code.name}
          </span>
        </motion.div>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-2">
          <h4 className="text-sm font-semibold">{code.name}</h4>
          <div className="text-sm">
            {Object.entries(code.data).map(([category, items]) => {
              if (category === 'me' && Array.isArray(items) && items.length > 0) {
                return (
                  <div key={category} className="mb-2">
                    <div className="font-medium capitalize">ME Boxes:</div>
                    <div className="text-muted-foreground">
                      {Object.entries(meBoxes).map(([boxId, source], index) => (
                        <div key={index}>{`${boxId}: ${source}`}</div>
                      ))}
                    </div>
                  </div>
                );
              }
              return Array.isArray(items) && items.length > 0 && category !== 'me' && (
                <div key={category} className="mb-2">
                  <div className="font-medium capitalize">{category}:</div>
                  <div className="text-muted-foreground">
                    {items.join(', ')}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};