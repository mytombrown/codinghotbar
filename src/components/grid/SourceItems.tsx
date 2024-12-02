import { motion } from 'framer-motion';
import { SideMenuItem } from '../../types/menu';

interface SourceItemsProps {
  selectedSideItem: string;
  items: SideMenuItem['items'];
  selectedItems: Record<string, string[]>;
  onItemSelect: (categoryId: string, item: string) => void;
}

const SourceItems = ({ selectedSideItem, items, selectedItems, onItemSelect }: SourceItemsProps) => {
  const handleSourceSelect = (sourceId: string, item: any) => {
    if (item.label === 'ME1') {
      onItemSelect('me', item.label);
    } else {
      onItemSelect(sourceId, item.label);
    }
  };

  return items?.map((item) => (
    <motion.button
      key={item.id}
      onClick={() => handleSourceSelect(selectedSideItem, item)}
      className={`p-4 rounded-lg backdrop-blur-sm transition-all duration-300 ${
        selectedItems[selectedSideItem]?.includes(item.label)
          ? 'bg-menu-active text-white shadow-lg'
          : 'bg-menu-darker/80 text-menu-subtext hover:bg-menu-highlight'
      }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {item.previewImage && (
        <div className="w-24 h-16 mx-auto mb-2 rounded-md overflow-hidden">
          <img
            src={item.previewImage}
            alt={item.label}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <span className="text-sm font-medium tracking-wide">{item.label}</span>
    </motion.button>
  ));
};

export default SourceItems;