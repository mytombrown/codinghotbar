import React from 'react';
import { motion } from 'framer-motion';
import { MenuItem } from '../types/menu';

interface TopMenuBarProps {
  menuItems: MenuItem[];
  activeCategory: string;
  selectedItems: Record<string, string[]>;
  onTopMenuClick: (id: string) => void;
}

const TopMenuBar = ({ menuItems, activeCategory, selectedItems, onTopMenuClick }: TopMenuBarProps) => {
  const allItems = [
    ...menuItems,
    { id: 'blank1', label: '', items: [] },
  ];

  return (
    <div className="grid grid-cols-5 gap-4">
      {allItems.map((category) => (
        <div key={category.id}>
          <motion.button
            onClick={() => onTopMenuClick(category.id)}
            className={`relative w-full p-3 rounded-lg backdrop-blur-sm transition-all duration-300 ${
              activeCategory === category.id
                ? selectedItems[category.id]?.length > 0
                  ? 'bg-green-600 text-white shadow-lg'
                  : 'bg-menu-active text-white shadow-lg'
                : selectedItems[category.id]?.length > 0
                ? 'bg-green-600 text-white'
                : 'bg-menu-darker/80 text-menu-subtext hover:bg-menu-highlight'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10 text-sm font-medium tracking-wide block min-h-[1.5rem] whitespace-nowrap overflow-hidden text-ellipsis">
              {category.id !== 'blank1' && (
                selectedItems[category.id]?.length > 0
                  ? selectedItems[category.id][0]
                  : category.label
              )}
            </span>
          </motion.button>
        </div>
      ))}
    </div>
  );
};

export default TopMenuBar;