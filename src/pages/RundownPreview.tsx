import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { getCodeThumbnail } from '../utils/thumbnailUtils';
import { ChevronLeft, Trash2 } from 'lucide-react';

interface RundownItem {
  rundownId: string;
  name: string;
  data: Record<string, string[]>;
}

const RundownPreview = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<RundownItem[]>([]);

  useEffect(() => {
    const savedCodes = JSON.parse(localStorage.getItem("saved-codes") || "[]");
    const hotbarItems = savedCodes.map((code: any) => ({
      ...code,
      rundownId: `${Date.now()}-${Math.random()}`
    }));
    setItems(hotbarItems);
  }, []);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const newItems = Array.from(items);
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);
    setItems(newItems);
  };

  return (
    <div className="min-h-screen bg-[#F1F0FB]">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/codes")}
              className="hover:bg-white/20"
            >
              <ChevronLeft className="h-5 w-5 text-[#7E69AB]" />
            </Button>
            <h1 className="text-2xl font-semibold text-[#222222]">Rundown</h1>
          </div>
        </div>

        {/* Main Content */}
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
                        className="bg-white rounded-lg shadow-sm p-6 flex items-center gap-6 cursor-move hover:shadow-md transition-shadow"
                      >
                        {/* Thumbnail */}
                        <div className="w-24 h-16 rounded-md overflow-hidden bg-[#9b87f5]/10 flex-shrink-0">
                          <img
                            src={getCodeThumbnail(item.data)}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Content */}
                        <div className="flex-grow">
                          <h3 className="text-lg font-medium text-[#222222] mb-1">
                            {item.name}
                          </h3>
                          <div className="text-sm text-gray-500">
                            {Object.entries(item.data).map(([category, items]) => (
                              Array.isArray(items) && items.length > 0 && (
                                <div key={category} className="inline-flex items-center mr-4">
                                  <span className="capitalize">{category}:</span>{' '}
                                  <span className="text-[#7E69AB]">{items.join(', ')}</span>
                                </div>
                              )
                            ))}
                          </div>
                        </div>

                        {/* Actions */}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-gray-400 hover:text-red-500 hover:bg-red-50"
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
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