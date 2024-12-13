import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";

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
      default:
        return 'grid-cols-1';
    }
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
                className="bg-black rounded-lg overflow-hidden"
                onClick={() => onItemSelect('me', item.label)}
              >
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