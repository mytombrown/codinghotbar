import { motion } from 'framer-motion';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { cn } from "@/lib/utils";
import { SideMenuItem } from '../types/menu';

interface MESectionProps {
  selectedMenu: SideMenuItem;
  selectedSideItem: string;
  selectedItems: Record<string, string[]>;
  sideMenuItems: SideMenuItem[];
  onItemSelect: (categoryId: string, item: string) => void;
}

const MESection = ({ selectedMenu, selectedSideItem, selectedItems, sideMenuItems, onItemSelect }: MESectionProps) => {
  return (
    <div className="w-full relative">
      <div className="before:content-[''] before:block before:pb-[56.25%]" />
      <div className="absolute inset-0 p-4 bg-[#1e3a8a] rounded-lg">
        <div className="grid grid-cols-2 gap-4 h-full">
          {selectedMenu.items?.map((item: any) => (
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
};

export default MESection;