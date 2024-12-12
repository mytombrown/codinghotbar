import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { Link } from 'lucide-react';
import { cn } from "@/lib/utils";
import { SideMenuItem } from '../../types/menu';

interface AudioItemsProps {
  selectedSideItem: string;
  items: SideMenuItem['items'];
  selectedItems: Record<string, string[]>;
  onItemSelect: (categoryId: string, item: string, side?: 'L' | 'R') => void;
}

const AudioItems = ({ selectedSideItem, items, selectedItems, onItemSelect }: AudioItemsProps) => {
  const handleLinkClick = (item: string) => {
    const itemL = `${item} L`;
    const itemR = `${item} R`;
    const isLSelected = selectedItems[selectedSideItem]?.includes(itemL);
    const isRSelected = selectedItems[selectedSideItem]?.includes(itemR);

    if (!isLSelected && !isRSelected) {
      // If neither is selected, select both
      onItemSelect(selectedSideItem, item, 'L');
      onItemSelect(selectedSideItem, item, 'R');
    } else if (isLSelected && isRSelected) {
      // If both are selected, deselect both
      onItemSelect(selectedSideItem, item, 'L');
      onItemSelect(selectedSideItem, item, 'R');
    } else {
      // If one is selected, select the other one
      if (!isLSelected) onItemSelect(selectedSideItem, item, 'L');
      if (!isRSelected) onItemSelect(selectedSideItem, item, 'R');
    }
  };

  return items?.map((item) => {
    const itemL = `${item.label} L`;
    const itemR = `${item.label} R`;
    const isLSelected = selectedItems[selectedSideItem]?.includes(itemL);
    const isRSelected = selectedItems[selectedSideItem]?.includes(itemR);
    
    return (
      <div key={item.id} className="flex gap-1">
        <motion.button
          onClick={() => onItemSelect(selectedSideItem, item.label, 'L')}
          className={cn(
            "flex-1 p-6 rounded-l-lg backdrop-blur-sm transition-all duration-300",
            isLSelected
              ? "bg-menu-active text-white shadow-lg"
              : "bg-menu-darker/80 text-menu-subtext hover:bg-menu-highlight"
          )}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="text-sm font-medium tracking-wide">{item.label} L</span>
        </motion.button>
        <motion.button
          onClick={() => onItemSelect(selectedSideItem, item.label, 'R')}
          className={cn(
            "flex-1 p-6 rounded-r-lg backdrop-blur-sm transition-all duration-300",
            isRSelected
              ? "bg-menu-active text-white shadow-lg"
              : "bg-menu-darker/80 text-menu-subtext hover:bg-menu-highlight"
          )}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="text-sm font-medium tracking-wide">{item.label} R</span>
        </motion.button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleLinkClick(item.label)}
          className={cn(
            "ml-2 hover:bg-menu-highlight",
            (isLSelected && isRSelected) && "text-green-500"
          )}
        >
          <Link className="h-4 w-4" />
        </Button>
      </div>
    );
  });
};

export default AudioItems;