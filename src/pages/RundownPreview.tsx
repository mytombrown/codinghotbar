import React from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { getCodeThumbnail } from '../utils/thumbnailUtils';

interface RundownItem {
  rundownId: string;
  name: string;
  data: Record<string, string[]>;
}

const RundownPreview = () => {
  const navigate = useNavigate();
  const [items, setItems] = React.useState<RundownItem[]>([]);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const newItems = Array.from(items);
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);
    setItems(newItems);
  };

  return (
    <div className="min-h-screen bg-menu-dark">
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <Button
            onClick={() => navigate("/codes")}
            variant="outline"
            className="text-white"
          >
            Back
          </Button>
          <h1 className="text-2xl font-bold text-white">Rundown Preview</h1>
          <div className="w-[100px]" /> {/* Spacer for alignment */}
        </div>

        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="rundown" direction="vertical">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-4"
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
                        className="bg-menu-darker p-6 rounded-lg shadow-lg"
                      >
                        <div className="flex items-center gap-6">
                          <div className="flex-shrink-0">
                            <div className="w-24 h-16 rounded-md overflow-hidden">
                              <img
                                src={getCodeThumbnail(item.data)}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>
                          <div className="flex-grow">
                            <h3 className="text-lg font-semibold text-white mb-2">
                              {item.name}
                            </h3>
                            <div className="text-menu-subtext text-sm">
                              {Object.entries(item.data).map(([category, items]) => (
                                Array.isArray(items) && items.length > 0 && (
                                  <div key={category} className="mb-1">
                                    <span className="font-medium capitalize">{category}:</span>{' '}
                                    {items.join(', ')}
                                  </div>
                                )
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default RundownPreview;