import { motion } from 'framer-motion';
import { MenuItem, SideMenuItem, LowerThirdData } from '../types/menu';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Plus, Link } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { cn } from "@/lib/utils";

interface GridItemsProps {
  showSideItems: boolean;
  selectedSideItem: string | null;
  sideMenuItems: SideMenuItem[];
  menuItems: MenuItem[];
  activeCategory: string;
  selectedItems: Record<string, string[]>;
  onItemSelect: (categoryId: string, item: string | any, side?: 'L' | 'R') => void;
  musicLevels?: Record<string, string>;
  onMusicLevelChange?: (trackId: string, level: string) => void;
  onLowerThirdTextChange?: (clipId: string, index: number, text: string) => void;
  onAddLowerThird?: (clipId: string, type: LowerThirdData['type']) => void;
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
  onLowerThirdTextChange,
  onAddLowerThird,
}: GridItemsProps) => {

  const handleLinkClick = (item: string) => {
    const itemL = `${item} L`;
    const itemR = `${item} R`;
    const isLSelected = selectedItems[selectedSideItem!]?.includes(itemL);
    const isRSelected = selectedItems[selectedSideItem!]?.includes(itemR);

    if (!isLSelected && !isRSelected) {
      onItemSelect(selectedSideItem!, item, 'L');
      onItemSelect(selectedSideItem!, item, 'R');
    }
    else if (isLSelected && isRSelected) {
      onItemSelect(selectedSideItem!, item, 'L');
      onItemSelect(selectedSideItem!, item, 'R');
    }
    else {
      if (isLSelected) {
        onItemSelect(selectedSideItem!, item, 'R');
      } else {
        onItemSelect(selectedSideItem!, item, 'L');
      }
    }
  };

  // This is the part that displays transitions/SCTE/auto-advance/GRFX
  if (!showSideItems) {
    const activeItems = menuItems.find((category) => category.id === activeCategory)?.items || [];
    
    return activeItems.map((item) => (
      <motion.button
        key={item}
        onClick={() => onItemSelect(activeCategory, item)}
        className={`p-6 rounded-lg backdrop-blur-sm transition-all duration-300 w-full text-center ${
          selectedItems[activeCategory]?.includes(item)
            ? 'bg-menu-active text-white shadow-lg'
            : 'bg-menu-darker/80 text-menu-subtext hover:bg-menu-highlight'
        }`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="text-sm font-medium tracking-wide block">{item}</span>
      </motion.button>
    ));
  }

  if (showSideItems && selectedSideItem) {
    const selectedMenu = sideMenuItems.find(item => item.id === selectedSideItem);
    if (!selectedMenu?.items) return null;

    if (selectedSideItem === 'source') {
      return selectedMenu.items.map((item) => (
        <motion.button
          key={item.id}
          onClick={() => onItemSelect(selectedSideItem, item)}
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
    }

    if (selectedSideItem === 'clips') {
      return selectedMenu.items.map((item) => (
        <motion.div
          key={item.id}
          className="relative"
        >
          <motion.button
            onClick={() => onItemSelect(selectedSideItem, item.label)}
            className={`relative p-2 rounded-lg backdrop-blur-sm transition-all duration-300 w-full ${
              selectedItems[selectedSideItem]?.includes(item.label)
                ? 'bg-menu-active text-white shadow-lg'
                : 'bg-menu-darker/80 text-menu-subtext hover:bg-menu-highlight'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="aspect-video relative mb-2 rounded-md overflow-hidden">
              <img
                src={item.previewImage}
                alt={item.label}
                className="w-full h-full object-cover"
              />
              {item.duration && (
                <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded text-xs text-white">
                  {item.duration}
                </div>
              )}
            </div>
            <span className="text-sm font-medium tracking-wide block">{item.label}</span>
          </motion.button>
          
          {selectedItems[selectedSideItem]?.includes(item.label) && (
            <div className="mt-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 px-3 py-1 text-sm text-white bg-green-600 rounded-md hover:bg-green-700">
                    <Plus className="w-4 h-4" />
                    Add Lower Third
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => onAddLowerThird?.(item.id, 'One Line')}>
                    One Line
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onAddLowerThird?.(item.id, 'Two Line')}>
                    Two Line
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onAddLowerThird?.(item.id, 'Courtesy')}>
                    Courtesy
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              {item.lowerThirds && item.lowerThirds.length > 0 && (
                <div className="mt-2 space-y-2">
                  {item.lowerThirds.map((lt, index) => (
                    <div key={index} className="space-y-1">
                      <div className="px-2 py-1 text-sm bg-menu-darker/60 rounded">
                        {lt.type}
                      </div>
                      {lt.type === 'One Line' && (
                        <Input
                          type="text"
                          value={lt.text || ''}
                          onChange={(e) => onLowerThirdTextChange?.(item.id, index, e.target.value)}
                          placeholder="Enter text for lower third..."
                          className={cn(
                            "w-full text-sm border-2 text-white bg-menu-darker",
                            !lt.text ? "border-red-500 focus:border-red-500 bg-red-950/50" : "border-green-500 focus:border-green-500 bg-green-950/50"
                          )}
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </motion.div>
      ));
    }

    if (selectedSideItem === 'me') {
      return (
        <div className="w-full relative">
          <div className="before:content-[''] before:block before:pb-[56.25%]" />
          <div className="absolute inset-0 p-4 bg-[#1e3a8a] rounded-lg">
            <div className="grid grid-cols-2 gap-4 h-full">
              {selectedMenu.items.map((item: any) => (
                <div key={item.id} className="relative">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <motion.button
                        className={cn(
                          "w-full h-full relative",
                          "bg-black rounded-lg overflow-hidden",
                          selectedItems[selectedSideItem]?.includes(`${item.id}:${item.selectedSource?.label}`) && "ring-2 ring-menu-active"
                        )}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {item.selectedSource && (
                          <img
                            src={item.selectedSource.previewImage}
                            alt={item.label}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        )}
                        <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/70 text-white text-sm">
                          <div>{item.selectedSource ? item.selectedSource.label : 'No Source'}</div>
                          <div className="text-xs text-gray-400">{item.type}</div>
                        </div>
                      </motion.button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {sideMenuItems
                        .find(menu => menu.id === 'source')
                        ?.items?.map((source: any) => (
                          <DropdownMenuItem
                            key={source.id}
                            onClick={() => {
                              item.selectedSource = source;
                              onItemSelect(selectedSideItem, `${item.id}:${source.label}`);
                            }}
                          >
                            {source.label}
                          </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (selectedSideItem === 'music' && selectedMenu.items.some(item => item.hasLevel)) {
      return selectedMenu.items.map((item) => {
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
      });
    }

    if (selectedMenu.items.some(item => item.hasLR)) {
      return selectedMenu.items.map((item) => {
        const isLSelected = selectedItems[selectedSideItem]?.includes(`${item.label} L`);
        const isRSelected = selectedItems[selectedSideItem]?.includes(`${item.label} R`);
        
        return (
          <div key={item.id} className="flex gap-1">
            <motion.button
              onClick={() => onItemSelect(selectedSideItem, item.label, 'L')}
              className={`flex-1 p-6 rounded-l-lg backdrop-blur-sm transition-all duration-300 ${
                isLSelected
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
                isRSelected
                  ? 'bg-menu-active text-white shadow-lg'
                  : 'bg-menu-darker/80 text-menu-subtext hover:bg-menu-highlight'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-sm font-medium tracking-wide">{item.label} R</span>
            </motion.button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleLinkClick(item.label)}
              className={cn(
                "ml-2 hover:bg-menu-highlight",
                (isLSelected && isRSelected) && "text-green-500"
              )}
            >
              <Link className="h-4 w-4" />
            </Button>
          </div>
        );
      });
    }

    return selectedMenu.items.map((item) => (
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
    ));
  }
};

export default GridItems;
