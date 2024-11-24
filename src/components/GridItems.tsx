import { motion } from 'framer-motion';
import { MenuItem, SideMenuItem } from '../types/menu';

interface GridItemsProps {
  showSideItems: boolean;
  selectedSideItem: string | null;
  sideMenuItems: SideMenuItem[];
  menuItems: MenuItem[];
  activeCategory: string;
  selectedItems: Record<string, string[]>;
  onItemSelect: (categoryId: string, item: string, side?: 'L' | 'R') => void;
  musicLevels?: Record<string, string>;
  onMusicLevelChange?: (trackId: string, level: string) => void;
}

const GridItems = ({
  showSideItems,
  selectedSideItem,
  sideMenuItems,
  menuItems,
  activeCategory,
  selectedItems,
  onItemSelect,
  musicLevels = {},
  onMusicLevelChange,
}: GridItemsProps) => {
  if (showSideItems && selectedSideItem) {
    const selectedMenu = sideMenuItems.find(item => item.id === selectedSideItem);
    if (!selectedMenu?.items) return null;

    return selectedMenu.items.map((item) => {
      if (selectedSideItem === 'music' && item.hasLevel) {
        return (
          <div key={item.id} className="flex gap-2 items-center">
            <motion.button
              onClick={() => onItemSelect(selectedSideItem, item.label)}
              className={`flex-1 p-6 rounded-lg backdrop-blur-sm transition-all duration-300 ${
                selectedItems[selectedSideItem]?.includes(item.label)
                  ? 'bg-menu-active text-white shadow-lg'
                  : 'bg-menu-darker/80 text-menu-subtext hover:bg-menu-highlight'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-sm font-medium tracking-wide">{item.label}</span>
            </motion.button>
            <input
              type="number"
              value={musicLevels[item.id] || ''}
              onChange={(e) => onMusicLevelChange?.(item.id, e.target.value)}
              className="w-20 p-2 rounded-lg bg-menu-darker/80 text-white border border-menu-highlight focus:outline-none focus:ring-2 focus:ring-menu-active"
              placeholder="dB"
            />
          </div>
        );
      }

      if (item.hasLR) {
        return (
          <div key={item.id} className="flex gap-1">
            <motion.button
              onClick={() => onItemSelect(selectedSideItem, item.label, 'L')}
              className={`flex-1 p-6 rounded-l-lg backdrop-blur-sm transition-all duration-300 ${
                selectedItems[selectedSideItem]?.includes(`${item.label} L`)
                  ? 'bg-menu-active text-white shadow-lg'
                  : 'bg-menu-darker/80 text-menu-subtext hover:bg-menu-highlight'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-sm font-medium tracking-wide">{item.label} L</span>
            </motion.button>
            <motion.button
              onClick={() => onItemSelect(selectedSideItem, item.label, 'R')}
              className={`flex-1 p-6 rounded-r-lg backdrop-blur-sm transition-all duration-300 ${
                selectedItems[selectedSideItem]?.includes(`${item.label} R`)
                  ? 'bg-menu-active text-white shadow-lg'
                  : 'bg-menu-darker/80 text-menu-subtext hover:bg-menu-highlight'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-sm font-medium tracking-wide">{item.label} R</span>
            </motion.button>
          </div>
        );
      }

      return (
        <motion.button
          key={item.id}
          onClick={() => onItemSelect(selectedSideItem, item.label)}
          className={`p-6 rounded-lg backdrop-blur-sm transition-all duration-300 ${
            selectedItems[selectedSideItem]?.includes(item.label)
              ? 'bg-menu-active text-white shadow-lg'
              : 'bg-menu-darker/80 text-menu-subtext hover:bg-menu-highlight'
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="text-sm font-medium tracking-wide">{item.label}</span>
        </motion.button>
      );
    });
  }

  return menuItems.find((category) => category.id === activeCategory)?.items.map((item) => (
    <motion.button
      key={item}
      onClick={() => onItemSelect(activeCategory, item)}
      className={`p-6 rounded-lg backdrop-blur-sm transition-all duration-300 ${
        selectedItems[activeCategory]?.includes(item)
          ? 'bg-menu-active text-white shadow-lg'
          : 'bg-menu-darker/80 text-menu-subtext hover:bg-menu-highlight'
      }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="text-sm font-medium tracking-wide">{item}</span>
    </motion.button>
  ));
};

export default GridItems;