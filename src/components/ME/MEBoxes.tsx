import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { sideMenuItems } from '@/data/menuItems';

interface MEBoxesProps {
  items: any[];
  selectedItems: Record<string, string[]>;
  onItemSelect: (selectedSideItem: string, label: string) => void;
  sideMenuItems: any[];
}

const MEBoxes = ({ items, selectedItems, onItemSelect }: MEBoxesProps) => {
  // Display all available ME layouts as buttons
  return (
    <div className="grid grid-cols-2 gap-4">
      {items.map((item) => (
        <motion.button
          key={item.id}
          onClick={() => onItemSelect('me', item.label)}
          className={cn(
            "p-4 rounded-lg backdrop-blur-sm transition-all duration-300",
            selectedItems['me']?.includes(item.label)
              ? 'bg-menu-active text-white shadow-lg'
              : 'bg-menu-darker/80 text-menu-subtext hover:bg-menu-highlight'
          )}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {item.previewImage && (
            <div className="w-full aspect-video mb-2 rounded overflow-hidden">
              <img
                src={item.previewImage}
                alt={item.label}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <span className="text-sm font-medium tracking-wide">{item.label}</span>
        </motion.button>
      ))}
    </div>
  );
};

export default MEBoxes;