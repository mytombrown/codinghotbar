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
    <div className="space-y-4">
      <div className="grid grid-cols-5 gap-4">
        {allItems.map((category) => (
          <div key={category.id}>
            <motion.button
              onClick={() => onTopMenuClick(category.id)}
              className={`w-full h-12 rounded-lg backdrop-blur-sm transition-all duration-300 flex items-center justify-center ${
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
              {category.id !== 'blank1' && (
                <span className="text-sm font-medium px-3 truncate">
                  {category.label}
                </span>
              )}
            </motion.button>
          </div>
        ))}
      </div>
      
      {/* Bottom window to display selected items */}
      <div className="w-full p-4 rounded-lg bg-menu-darker/80 min-h-[48px] flex items-center justify-center">
        <span className="text-sm font-medium text-white">
          {activeCategory && selectedItems[activeCategory]?.length > 0
            ? selectedItems[activeCategory].join(', ')
            : activeCategory
            ? menuItems.find(item => item.id === activeCategory)?.label || ''
            : 'No selection'}
        </span>
      </div>
    </div>
  );
};

export default TopMenuBar;