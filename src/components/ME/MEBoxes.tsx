import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
    // Find the item and update its box's selectedSource
    const updatedItems = items.map(item => {
      if (item.label === itemLabel) {
        return {
          ...item,
          boxes: item.boxes.map((box: any) => {
            if (box.id === boxId) {
              return {
                ...box,
                selectedSource: { label: sourceLabel }
              };
            }
            return box;
          })
        };
      }
      return item;
    });
    
    // Update the ME selection to trigger a re-render
    onItemSelect('me', itemLabel);
  };

  const getSourceThumbnail = (sourceLabel: string) => {
    const source = sources.find(src => src.label === sourceLabel);
    return source?.previewImage || null;
  };

  return (
    <div className="grid grid-cols-2 gap-8">
      {items.map((item) => (
        <motion.div
          key={item.id}
          className={cn(
            "relative rounded-lg overflow-hidden cursor-pointer",
            selectedItems['me']?.includes(item.label)
              ? 'ring-2 ring-menu-active'
              : 'hover:ring-2 hover:ring-menu-highlight'
          )}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onItemSelect('me', item.label)}
        >
          {/* Preview Image */}
          {item.previewImage && (
            <div className="w-full aspect-video mb-4">
              <img
                src={item.previewImage}
                alt={item.label}
                className="w-full h-full object-cover rounded-t-lg"
              />
            </div>
          )}
          
          <span className="text-sm font-medium tracking-wide block px-4 py-2 bg-menu-darker text-white">
            {item.label}
          </span>

          {/* Source Selection Dropdowns */}
          {selectedItems['me']?.includes(item.label) && (
            <div className={cn(
              "grid gap-4 p-4 bg-menu-darker",
              getLayoutClassName(item.layout)
            )}>
              {item.boxes.map((box: any) => (
                <div key={box.id} className="space-y-2">
                  <div className="relative w-full aspect-video mb-2 rounded overflow-hidden bg-gray-900">
                    {box.selectedSource ? (
                      <>
                        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm">
                          <img
                            src={getSourceThumbnail(box.selectedSource.label)}
                            alt={box.selectedSource.label}
                            className="w-full h-full object-cover opacity-90"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-2 text-white text-sm">
                            {box.selectedSource.label}
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">
                        No source selected
                      </div>
                    )}
                  </div>
                  <label className="text-xs text-menu-subtext">{box.label}</label>
                  <Select
                    value={box.selectedSource?.label}
                    onValueChange={(value) => handleSourceSelect(box.id, value, item.label)}
                  >
                    <SelectTrigger className="w-full bg-menu-darker border-menu-highlight">
                      <SelectValue placeholder="Select source" />
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
              ))}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default MEBoxes;