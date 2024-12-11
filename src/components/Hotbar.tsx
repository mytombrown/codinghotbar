import { motion } from 'framer-motion';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import { getCodeThumbnail } from '../utils/thumbnailUtils';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface HotbarProps {
  items: any[];
  showHotbar: boolean;
}

const Hotbar = ({ items, showHotbar }: HotbarProps) => {
  if (!showHotbar) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-menu-darker/90 p-4 border-t border-gray-700">
      <div className="max-w-[95%] mx-auto">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-white text-xl font-bold">
            Rundown ({items.length}/20)
          </h2>
        </div>
        <Droppable droppableId="hotbar" direction="horizontal">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="flex gap-4 overflow-x-auto pb-4 min-h-[100px] items-center"
            >
              {items.map((item, index) => (
                <Draggable 
                  key={item.rundownId} 
                  draggableId={item.rundownId} 
                  index={index}
                >
                  {(provided) => (
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="flex-shrink-0 p-4 rounded-lg bg-menu-darker text-white cursor-move hover:bg-menu-highlight transition-colors w-[200px]"
                        >
                          <div className="w-16 h-12 mx-auto mb-2 rounded-md overflow-hidden">
                            <img
                              src={getCodeThumbnail(item.data)}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span className="inline-block w-8 h-8 mr-3 text-center leading-8 bg-purple-600 rounded-full">
                            {index + 1}
                          </span>
                          {item.name}
                        </div>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-80">
                        <div className="space-y-2">
                          <h4 className="text-sm font-semibold">{item.name}</h4>
                          <div className="text-sm">
                            {Object.entries(item.data).map(([category, items]) => (
                              Array.isArray(items) && items.length > 0 && (
                                <div key={category} className="mb-2">
                                  <div className="font-medium capitalize">{category}:</div>
                                  <div className="text-muted-foreground">
                                    {items.join(', ')}
                                  </div>
                                </div>
                              )
                            ))}
                          </div>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </div>
  );
};

export default Hotbar;
