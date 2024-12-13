import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '../ui/dropdown-menu';

interface MEBoxesProps {
  items: any[];
  selectedItems: Record<string, string[]>;
  onItemSelect: (selectedSideItem: string, label: string) => void;
  sideMenuItems: any[];
}

const MEBoxes = ({ items, selectedItems, onItemSelect, sideMenuItems }: MEBoxesProps) => {
  const getLayoutClassName = (layout: string) => {
    switch (layout) {
      case '1-box':
        return 'grid-cols-1';
      case '2-split':
        return 'grid-cols-2';
      case '3-split':
        return 'grid-cols-[2fr_1fr] grid-rows-[1fr_1fr]';
      case '4-grid':
        return 'grid-cols-2 grid-rows-2';
      default:
        return 'grid-cols-1';
    }
  };

  const getBoxClassName = (layout: string, boxIndex: number) => {
    if (layout === '3-split' && boxIndex === 0) {
      return 'row-span-2';
    }
    return '';
  };

  return (
    <div className="w-full relative">
      <div className="before:content-[''] before:block before:pb-[56.25%]" />
      {items.map((item: any) => (
        <div 
          key={item.id}
          className={cn(
            "absolute inset-0 p-4 bg-[#1e3a8a] rounded-lg",
            selectedItems['me']?.includes(item.label) ? 'block' : 'hidden'
          )}
        >
          <div className={cn(
            "grid gap-4 h-full",
            getLayoutClassName(item.layout)
          )}>
            {item.boxes.map((box: any, index: number) => (
              <div key={box.id} className={cn(
                "relative",
                getBoxClassName(item.layout, index)
              )}>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <motion.button
                      className={cn(
                        "w-full h-full relative",
                        "bg-black rounded-lg overflow-hidden",
                        box.selectedSource && "ring-2 ring-menu-active"
                      )}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {box.selectedSource && (
                        <img
                          src={box.selectedSource.previewImage}
                          alt={box.label}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      )}
                      <div className="absolute bottom-2 left-2 text-white text-sm bg-black/50 px-2 py-1 rounded">
                        {box.selectedSource?.label || 'No Source'}
                      </div>
                    </motion.button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-menu-darker text-white">
                    {sideMenuItems
                      .find(menu => menu.id === 'source')
                      ?.items?.map((source: any) => (
                        <DropdownMenuItem
                          key={source.id}
                          onClick={() => {
                            box.selectedSource = source;
                            onItemSelect('me', item.label);
                          }}
                          className="cursor-pointer hover:bg-menu-active"
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
      ))}
    </div>
  );
};

export default MEBoxes;