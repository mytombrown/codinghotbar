import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MenuItem, SideMenuItem, LowerThirdData } from '../types/menu';
import SideMenu from './SideMenu';
import GridItems from './GridItems';

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
  { 
    id: 'clips', 
    label: 'CLIPS',
    items: [
      { 
        id: 'clip1', 
        label: 'Big Buck Bunny',
        previewImage: '/placeholder.svg',
        duration: '00:30:00',
        lowerThirds: []
      },
      { 
        id: 'clip2', 
        label: 'Nature Documentary',
        previewImage: '/photo-1649972904349-6e44c42644a7',
        duration: '01:05:29',
        lowerThirds: []
      },
      { 
        id: 'clip3', 
        label: 'Tech Review',
        previewImage: '/photo-1488590528505-98d2b5aba04b',
        duration: '00:31:04',
        lowerThirds: []
      }
    ]
  },
  { id: 'me', label: 'ME' },
  { id: 'l3', label: 'L3' },
  { id: 'ext-dev', label: 'EXT DEV' },
  { 
    id: 'music', 
    label: 'MUSIC',
    items: Array.from({ length: 10 }, (_, i) => ({
      id: `track${i + 1}`,
      label: `Track ${i + 1}`,
      hasLevel: true
    }))
  }
];

const MenuSystem = () => {
  const [activeCategory, setActiveCategory] = useState<string>('transition');
  const [selectedItems, setSelectedItems] = useState<Record<string, string[]>>({});
  const [selectedSideItem, setSelectedSideItem] = useState<string | null>(null);
  const [showSideItems, setShowSideItems] = useState(false);
  const [musicLevels, setMusicLevels] = useState<Record<string, string>>({});
  const [clips, setClips] = useState(sideMenuItems.find(item => item.id === 'clips')?.items || []);

  const handleAddLowerThird = (clipId: string, type: LowerThirdData['type']) => {
    setClips(prevClips => 
      prevClips.map(clip => 
        clip.id === clipId 
          ? { 
              ...clip, 
              lowerThirds: [...(clip.lowerThirds || []), { type }] 
            }
          : clip
      )
    );
  };

  const handleLowerThirdTextChange = (clipId: string, index: number, text: string) => {
    setClips(prevClips =>
      prevClips.map(clip =>
        clip.id === clipId
          ? {
              ...clip,
              lowerThirds: clip.lowerThirds?.map((lt, i) =>
                i === index ? { ...lt, text } : lt
              ) || []
            }
          : clip
      )
    );
  };

  const handleItemSelect = (categoryId: string, item: string, side?: 'L' | 'R') => {
    const itemLabel = side ? `${item} ${side}` : item;
    
    setSelectedItems(prev => {
      // For audio items, allow multiple selections
      if (categoryId === 'audio' || categoryId === 'music') {
        const currentItems = prev[categoryId] || [];
        const itemExists = currentItems.includes(itemLabel);
        
        return {
          ...prev,
          [categoryId]: itemExists
            ? currentItems.filter(i => i !== itemLabel)
            : [...currentItems, itemLabel]
        };
      }
      
      // For other categories, keep single selection behavior
      return {
        ...prev,
        [categoryId]: [itemLabel]
      };
    });
  };

  const handleMusicLevelChange = (trackId: string, level: string) => {
    setMusicLevels(prev => ({
      ...prev,
      [trackId]: level
    }));
  };

  const handleSideItemClick = (itemId: string) => {
    setSelectedSideItem(itemId);
    setShowSideItems(true);
    setActiveCategory('');
  };

  const handleTopMenuClick = (categoryId: string) => {
    setActiveCategory(categoryId);
    setShowSideItems(false);
    setSelectedSideItem(null);
  };

  return (
    <div className="min-h-screen bg-menu-dark p-8 flex">
      <SideMenu
        items={sideMenuItems}
        selectedSideItem={selectedSideItem}
        selectedItems={selectedItems}
        onItemClick={handleSideItemClick}
      />

      <div className="flex-1">
        <div className="grid grid-cols-4 gap-4">
          {menuItems.map((category) => (
            <div key={category.id} className="space-y-2">
              <motion.button
                onClick={() => handleTopMenuClick(category.id)}
                className={`w-full p-4 rounded-lg backdrop-blur-sm transition-all duration-300 ${
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
                <span className="text-sm font-medium tracking-wide">{category.label}</span>
              </motion.button>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`h-10 rounded-lg p-2 flex items-center justify-center text-sm ${
                  selectedItems[category.id]?.length > 0
                    ? 'bg-menu-active text-white'
                    : 'bg-menu-darker/40 text-transparent'
                }`}
              >
                {selectedItems[category.id]?.join(', ') || '.'}
              </motion.div>
            </div>
          ))}
        </div>

        <motion.div
          className="grid grid-cols-3 gap-4 mt-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <GridItems
            showSideItems={showSideItems}
            selectedSideItem={selectedSideItem}
            sideMenuItems={[...sideMenuItems.map(item => 
              item.id === 'clips' 
                ? { ...item, items: clips }
                : item
            )]}
            menuItems={menuItems}
            activeCategory={activeCategory}
            selectedItems={selectedItems}
            onItemSelect={handleItemSelect}
            musicLevels={musicLevels}
            onMusicLevelChange={handleMusicLevelChange}
            onLowerThirdTextChange={handleLowerThirdTextChange}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default MenuSystem;