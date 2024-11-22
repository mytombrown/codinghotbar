import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface MenuItem {
  id: string;
  label: string;
  items: string[];
}

interface SideMenuItem {
  id: string;
  label: string;
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

const sideMenuItems: SideMenuItem[] = [
  { id: 'source', label: 'SOURCE' },
  { id: 'audio', label: 'AUDIO' },
  { id: 'ptz', label: 'PTZ' },
  { id: 'grfx', label: 'GRFX' },
  { id: 'clips', label: 'CLIPS' },
  { id: 'me', label: 'ME' },
  { id: 'l3', label: 'L3' },
  { id: 'ext-dev', label: 'EXT DEV' },
];

const MenuSystem = () => {
  const [activeCategory, setActiveCategory] = useState<string>('transition');
  const [selectedItems, setSelectedItems] = useState<Record<string, string>>({});
  const [selectedSideItem, setSelectedSideItem] = useState<string | null>(null);

  const handleItemSelect = (categoryId: string, item: string) => {
    setSelectedItems(prev => ({
      ...prev,
      [categoryId]: item
    }));
  };

  return (
    <div className="min-h-screen bg-menu-dark p-8 flex">
      {/* Side Menu */}
      <div className="w-32 space-y-2 mr-8">
        {sideMenuItems.map((item) => (
          <motion.button
            key={item.id}
            onClick={() => setSelectedSideItem(item.id)}
            className={`w-full p-4 rounded-lg backdrop-blur-sm transition-all duration-300 ${
              selectedSideItem === item.id
                ? 'bg-menu-active text-white shadow-lg'
                : 'bg-menu-darker/80 text-menu-subtext hover:bg-menu-highlight'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="text-sm font-medium tracking-wide">{item.label}</span>
          </motion.button>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Main Categories */}
        <div className="grid grid-cols-4 gap-4">
          {menuItems.map((category) => (
            <div key={category.id} className="space-y-2">
              <motion.button
                onClick={() => setActiveCategory(category.id)}
                className={`w-full p-4 rounded-lg backdrop-blur-sm transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-menu-active text-white shadow-lg'
                    : 'bg-menu-darker/80 text-menu-subtext hover:bg-menu-highlight'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-sm font-medium tracking-wide">{category.label}</span>
              </motion.button>
              
              {/* Selected item display */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`h-10 rounded-lg p-2 flex items-center justify-center text-sm ${
                  selectedItems[category.id]
                    ? 'bg-menu-active text-white'
                    : 'bg-menu-darker/40 text-transparent'
                }`}
              >
                {selectedItems[category.id] || '.'}
              </motion.div>
            </div>
          ))}
        </div>

        {/* Sub Items Grid */}
        <motion.div
          className="grid grid-cols-3 gap-4 mt-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {menuItems
            .find((category) => category.id === activeCategory)
            ?.items.map((item) => (
              <motion.button
                key={item}
                onClick={() => handleItemSelect(activeCategory, item)}
                className={`p-6 rounded-lg backdrop-blur-sm transition-all duration-300 ${
                  selectedItems[activeCategory] === item
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