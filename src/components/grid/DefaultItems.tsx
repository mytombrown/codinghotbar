import { motion } from 'framer-motion';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { MenuItem } from '../../types/menu';

interface DefaultItemsProps {
  activeCategory: string;
  menuItems: MenuItem[];
  selectedItems: Record<string, string[]>;
  onItemSelect: (categoryId: string, item: string) => void;
  sideMenuItems: any[];
}

const DefaultItems = ({ 
  activeCategory, 
  menuItems, 
  selectedItems, 
  onItemSelect,
  sideMenuItems
}: DefaultItemsProps) => {
  return menuItems.find((category) => category.id === activeCategory)?.items.map((item) => (
    <HoverCard key={item}>
      <HoverCardTrigger asChild>
        <motion.button
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
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-2">
          <h4 className="text-sm font-semibold">Sources</h4>
          <div className="text-sm">
            {selectedItems['me']?.map((meItem, index) => {
              const meBox = sideMenuItems
                .find(menu => menu.id === 'me')
                ?.items?.find(box => box.label === meItem);
              return meBox?.selectedSource ? (
                <div key={index} className="flex items-center gap-2 mb-1">
                  <span className="font-medium">{meBox.label}:</span>
                  <span className="text-muted-foreground">{meBox.selectedSource.label}</span>
                </div>
              ) : null;
            })}
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ));
};

export default DefaultItems;