import { motion } from 'framer-motion';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import { getCodeThumbnail } from '../utils/thumbnailUtils';

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
            Hotbar ({items.length}/20)
          </h2>
        </div>
        <Droppable droppableId="rundown" direction="horizontal">
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