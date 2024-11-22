import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface MenuItem {
  id: string;
  label: string;
  items: string[];
}

const menuItems: MenuItem[] = [
  {
    id: 'transition',
    label: 'Transition',
    items: ['MIX', 'SLOW MIX', 'CUT', 'WIPE OUT', 'STINGER', 'END CAP', 'BREAKING NEWS', 'TOP STORIES', 'SPORTS BUMP'],
  },
  {
    id: 'scte',
    label: 'SCTE',
    items: ['START SHOW', 'END SHOW', '2:00 BREAK', '2:30 BREAK', 'REPEAT', '3:00 BREAK', '1:30 BREAK', '1:00 BREAK', ':30 BREAK'],
  },
  {
    id: 'auto-advance',
    label: 'Auto-Advance',
    items: ['MANUAL', 'ADVANCE', 'PAUSE'],
  },
  {
    id: 'grfx',
    label: 'GRFX',
    items: ['Singular'],
  },
];

const MenuSystem = () => {
  const [activeCategory, setActiveCategory] = useState<string>('transition');
  const [selectedItem, setSelectedItem] = useState<string>('');

  return (
    <div className="min-h-screen bg-menu-dark p-8">
      <div className="max-w-7xl mx-auto">
        {/* Main Categories */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {menuItems.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`p-4 rounded-lg backdrop-blur-sm transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-menu-active text-white shadow-lg'
                  : 'bg-menu-darker/80 text-menu-subtext hover:bg-menu-highlight'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-sm font-medium tracking-wide">{category.label}</span>
            </motion.button>
          ))}
        </div>

        {/* Sub Items Grid */}
        <motion.div
          className="grid grid-cols-3 gap-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {menuItems
            .find((category) => category.id === activeCategory)
            ?.items.map((item) => (
              <motion.button
                key={item}
                onClick={() => setSelectedItem(item)}
                className={`p-6 rounded-lg backdrop-blur-sm transition-all duration-300 ${
                  selectedItem === item
                    ? 'bg-menu-active text-white shadow-lg'
                    : 'bg-menu-darker/80 text-menu-subtext hover:bg-menu-highlight'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-sm font-medium tracking-wide">{item}</span>
              </motion.button>
            ))}
        </motion.div>
      </div>
    </div>
  );
};

export default MenuSystem;