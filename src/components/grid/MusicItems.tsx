import { motion } from 'framer-motion';
import { SideMenuItem } from '../../types/menu';

interface MusicItemsProps {
  selectedSideItem: string;
  items: SideMenuItem['items'];
  selectedItems: Record<string, string[]>;
  onItemSelect: (categoryId: string, item: string) => void;
  musicLevels: Record<string, string>;
  onMusicLevelChange?: (trackId: string, level: string) => void;
}

const MusicItems = ({ 
  selectedSideItem, 
  items, 
  selectedItems, 
  onItemSelect,
  musicLevels,
  onMusicLevelChange 
}: MusicItemsProps) => {
  return items?.map((item) => (
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
  ));
};

export default MusicItems;