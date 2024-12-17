import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { sideMenuItems } from '@/data/menuItems';

interface MEBoxesProps {
  items: any[];
  selectedItems: Record<string, string[]>;
  onItemSelect: (selectedSideItem: string, label: string) => void;
  sideMenuItems: any[];
}

const MEBoxes = ({ items, selectedItems, onItemSelect, sideMenuItems }: MEBoxesProps) => {
  const getLayoutClassName = (layout: string) => {
    switch (layout) {
      case '2-split':
        return 'grid-cols-2';
      case '3-split':
        return 'grid-cols-3';
      case '4-grid':
        return 'grid-cols-2 grid-rows-2';
      case '2-split-vertical':
        return 'grid-cols-2';
      default:
        return 'grid-cols-1';
    }
  };

  const sources = sideMenuItems.find(item => item.id === 'source')?.items || [];

  const handleSourceSelect = (boxId: string, sourceLabel: string, itemLabel: string) => {
    console.log('Source selected:', { boxId, sourceLabel, itemLabel });
    // Here you would update the source selection in your state management
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
            {item.boxes.map((box: any) => (
              <div 
                key={box.id} 
                className="relative bg-black rounded-lg overflow-hidden"
                onClick={() => onItemSelect('me', item.label)}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <Select
                    onValueChange={(value) => handleSourceSelect(box.id, value, item.label)}
                  >
                    <SelectTrigger className="w-[180px] bg-black/50 border-none text-white">
                      <SelectValue placeholder={`Select ${box.label} source`} />
                    </SelectTrigger>
                    <SelectContent>
                      {sources.map((source: any) => (
                        <SelectItem key={source.id} value={source.label}>
                          {source.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="absolute bottom-2 left-2 text-white text-sm bg-black/50 px-2 py-1 rounded">
                  {box.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MEBoxes;