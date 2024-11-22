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
  items?: Array<{
    id: string;
    label: string;
    hasLR?: boolean;
  }>;
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
  { 
    id: 'source', 
    label: 'SOURCE',
    items: [
      { id: 'cam1', label: 'CAM 1' },
      { id: 'cam2', label: 'CAM 2' },
      { id: 'cam3', label: 'CAM 3' },
      { id: 'cam4', label: 'CAM 4' },
      { id: 'cam5', label: 'CAM 5' },
      { id: 'cam6', label: 'CAM 6' },
      { id: 'ddr1', label: 'DDR 1' },
      { id: 'ddr2', label: 'DDR 2' },
      { id: 'gfx1', label: 'GFX 1' }
    ]
  },
  { 
    id: 'audio', 
    label: 'AUDIO',
    items: [
      { id: 'mic1', label: 'MIC 1', hasLR: true },
      { id: 'mic2', label: 'MIC 2', hasLR: true },
      { id: 'mic3', label: 'MIC 3', hasLR: true },
      { id: 'mic4', label: 'MIC 4', hasLR: true },
      { id: 'line1', label: 'LINE 1', hasLR: true },
      { id: 'line2', label: 'LINE 2', hasLR: true },
      { id: 'aux1', label: 'AUX 1', hasLR: true },
      { id: 'aux2', label: 'AUX 2', hasLR: true }
    ]
  },
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

  const handleItemSelect = (categoryId: string, item: string, side?: 'L' | 'R') => {
    setSelectedItems(prev => ({
      ...prev,
      [categoryId]: side ? `${item} ${side}` : item
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
            <span className="text-sm font-medium tracking-wide">
              {selectedItems[item.id] || item.label}
            </span>
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
          {selectedSideItem && sideMenuItems.find(item => item.id === selectedSideItem)?.items ? (
            sideMenuItems.find(item => item.id === selectedSideItem)?.items?.map((item) => (
              item.hasLR ? (
                <div key={item.id} className="flex gap-1">
                  <motion.button
                    onClick={() => handleItemSelect(selectedSideItem, item.label, 'L')}
                    className={`flex-1 p-6 rounded-l-lg backdrop-blur-sm transition-all duration-300 ${
                      selectedItems[selectedSideItem] === `${item.label} L`
                        ? 'bg-menu-active text-white shadow-lg'
                        : 'bg-menu-darker/80 text-menu-subtext hover:bg-menu-highlight'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="text-sm font-medium tracking-wide">{item.label} L</span>
                  </motion.button>
                  <motion.button
                    onClick={() => handleItemSelect(selectedSideItem, item.label, 'R')}
                    className={`flex-1 p-6 rounded-r-lg backdrop-blur-sm transition-all duration-300 ${
                      selectedItems[selectedSideItem] === `${item.label} R`
                        ? 'bg-menu-active text-white shadow-lg'
                        : 'bg-menu-darker/80 text-menu-subtext hover:bg-menu-highlight'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="text-sm font-medium tracking-wide">{item.label} R</span>
                  </motion.button>
                </div>
              ) : (
                <motion.button
                  key={item.id}
                  onClick={() => handleItemSelect(selectedSideItem, item.label)}
                  className={`p-6 rounded-lg backdrop-blur-sm transition-all duration-300 ${
                    selectedItems[selectedSideItem] === item.label
                      ? 'bg-menu-active text-white shadow-lg'
                      : 'bg-menu-darker/80 text-menu-subtext hover:bg-menu-highlight'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-sm font-medium tracking-wide">{item.label}</span>
                </motion.button>
              )
            ))
          ) : (
            menuItems.find((category) => category.id === activeCategory)?.items.map((item) => (
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
            ))
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default MenuSystem;