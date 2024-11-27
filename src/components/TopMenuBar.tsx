import { motion } from 'framer-motion';
import { MenuItem } from '../types/menu';

interface TopMenuBarProps {
  menuItems: MenuItem[];
  activeCategory: string;
  selectedItems: Record<string, string[]>;
  onTopMenuClick: (id: string) => void;
}

const TopMenuBar = ({ menuItems, activeCategory, selectedItems, onTopMenuClick }: TopMenuBarProps) => {
  // Create an array of 7 items - 4 original + 3 blank
  const allItems = [
    ...menuItems,
    { id: 'blank1', label: '', items: [] },
    { id: 'blank2', label: '', items: [] },
    { id: 'blank3', label: '', items: [] },
  ];

  return (
    <div className="grid grid-cols-7 gap-4">
      {allItems.map((category) => (
        <div key={category.id} className="space-y-2">
          <motion.button
            onClick={() => onTopMenuClick(category.id)}
            className={`w-full p-3 rounded-lg backdrop-blur-sm transition-all duration-300 ${
              activeCategory === category.id
                ? selectedItems[category.id]?.length > 0
                  ? 'bg-green-800 text-white shadow-lg'
                  : 'bg-menu-active text-white shadow-lg'
                : selectedItems[category.id]?.length > 0
                ? 'bg-green-600 text-white'
                : 'bg-menu-darker/80 text-menu-subtext hover:bg-menu-highlight'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="text-xs font-medium tracking-wide">{category.label}</span>
          </motion.button>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`h-10 rounded-lg p-2 flex items-center justify-center text-sm ${
              selectedItems[category.id]?.length > 0
                ? 'bg-menu-active text-white'
                : 'bg-menu-darker/40'
            }`}
          >
            {selectedItems[category.id]?.length > 0 ? selectedItems[category.id].join(', ') : ''}
          </motion.div>
        </div>
      ))}
    </div>
  );
};

export default TopMenuBar;