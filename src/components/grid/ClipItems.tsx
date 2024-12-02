import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { cn } from "@/lib/utils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { SideMenuItem, LowerThirdData } from '../../types/menu';

interface ClipItemsProps {
  selectedSideItem: string;
  items: SideMenuItem['items'];
  selectedItems: Record<string, string[]>;
  onItemSelect: (categoryId: string, item: string) => void;
  onLowerThirdTextChange?: (clipId: string, index: number, text: string) => void;
  onAddLowerThird?: (clipId: string, type: LowerThirdData['type']) => void;
}

const ClipItems = ({
  selectedSideItem,
  items,
  selectedItems,
  onItemSelect,
  onLowerThirdTextChange,
  onAddLowerThird,
}: ClipItemsProps) => {
  return items?.map((item) => (
    <motion.div
      key={item.id}
      className="relative"
    >
      <motion.button
        onClick={() => onItemSelect(selectedSideItem, item.label)}
        className={`relative p-2 rounded-lg backdrop-blur-sm transition-all duration-300 w-full ${
          selectedItems[selectedSideItem]?.includes(item.label)
            ? 'bg-menu-active text-white shadow-lg'
            : 'bg-menu-darker/80 text-menu-subtext hover:bg-menu-highlight'
        }`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="aspect-video relative mb-2 rounded-md overflow-hidden">
          <img
            src={item.previewImage}
            alt={item.label}
            className="w-full h-full object-cover"
          />
          {item.duration && (
            <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded text-xs text-white">
              {item.duration}
            </div>
          )}
        </div>
        <span className="text-sm font-medium tracking-wide block">{item.label}</span>
      </motion.button>
      
      {selectedItems[selectedSideItem]?.includes(item.label) && (
        <div className="mt-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 px-3 py-1 text-sm text-white bg-green-600 rounded-md hover:bg-green-700">
                <Plus className="w-4 h-4" />
                Add Lower Third
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => onAddLowerThird?.(item.id, 'One Line')}>
                One Line
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onAddLowerThird?.(item.id, 'Two Line')}>
                Two Line
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onAddLowerThird?.(item.id, 'Courtesy')}>
                Courtesy
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {item.lowerThirds && item.lowerThirds.length > 0 && (
            <div className="mt-2 space-y-2">
              {item.lowerThirds.map((lt, index) => (
                <div key={index} className="space-y-1">
                  <div className="px-2 py-1 text-sm bg-menu-darker/60 rounded">
                    {lt.type}
                  </div>
                  {lt.type === 'One Line' && (
                    <Input
                      type="text"
                      value={lt.text || ''}
                      onChange={(e) => onLowerThirdTextChange?.(item.id, index, e.target.value)}
                      placeholder="Enter text for lower third..."
                      className={cn(
                        "w-full text-sm border-2 text-white bg-menu-darker",
                        !lt.text ? "border-red-500 focus:border-red-500 bg-red-950/50" : "border-green-500 focus:border-green-500 bg-green-950/50"
                      )}
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </motion.div>
  ));
};

export default ClipItems;