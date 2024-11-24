import { motion } from 'framer-motion';
import { SideMenuItem } from '../types/menu';

interface SideMenuProps {
  items: SideMenuItem[];
  selectedSideItem: string | null;
  selectedItems: Record<string, string[]>;
  onItemClick: (itemId: string) => void;
}

const SideMenu = ({ items, selectedSideItem, selectedItems, onItemClick }: SideMenuProps) => {
  return (
    <div className="w-32 space-y-2 mr-8">
      {items.map((item) => (
        <motion.button
          key={item.id}
          onClick={() => onItemClick(item.id)}
          className={`w-full p-4 rounded-lg backdrop-blur-sm transition-all duration-300 ${
            selectedSideItem === item.id
              ? selectedItems[item.id]?.length > 0
                ? 'bg-green-800 text-white shadow-lg'
                : 'bg-menu-active text-white shadow-lg'
              : selectedItems[item.id]?.length > 0
              ? 'bg-green-600 text-white'
              : 'bg-menu-darker/80 text-menu-subtext hover:bg-menu-highlight'
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="text-sm font-medium tracking-wide">
            {selectedItems[item.id]?.length > 0 
              ? selectedItems[item.id].join(', ') 
              : item.label}
          </span>
        </motion.button>
      ))}
    </div>
  );
};

export default SideMenu;