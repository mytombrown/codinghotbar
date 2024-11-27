import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';

interface MEBoxesProps {
  items: any[];
  selectedItems: Record<string, string[]>;
  onItemSelect: (selectedSideItem: string, label: string) => void;
  sideMenuItems: any[];
}

const MEBoxes = ({ items, selectedItems, onItemSelect, sideMenuItems }: MEBoxesProps) => {
  return (
    <div className="w-full relative">
      <div className="before:content-[''] before:block before:pb-[56.25%]" />
      <div className="absolute inset-0 p-4 bg-[#1e3a8a] rounded-lg">
        <div className="grid grid-cols-2 gap-4 h-full">
          {items.map((item: any) => (
            <div key={item.id} className="relative">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <motion.button
                    className={cn(
                      "w-full h-full relative",
                      "bg-black rounded-lg overflow-hidden",
                      selectedItems['me']?.includes(item.label) && "ring-2 ring-menu-active"
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
                    <div className="absolute bottom-2 left-2 text-white text-sm bg-black/50 px-2 py-1 rounded">
                      {item.selectedSource?.label || 'No Source'}
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
                          onItemSelect('me', item.label);
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

export default MEBoxes;