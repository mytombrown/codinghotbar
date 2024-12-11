import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { getCodeThumbnail } from '../utils/thumbnailUtils';
import { ChevronLeft, Trash2, GripVertical, Video, Play, Radio, ArrowRight } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

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
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
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
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-12 gap-6">
          {/* Preview Section */}
          <div className="col-span-3">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center gap-2 mb-4 text-[#7E69AB]">
                <Video className="h-5 w-5" />
                <h2 className="font-semibold">Preview</h2>
              </div>
              <div className="aspect-video bg-gray-100 rounded-lg mb-4"></div>
              <div className="text-sm text-gray-600">
                Ready to preview your next item
              </div>
            </div>
          </div>

          {/* Program Section */}
          <div className="col-span-3">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center gap-2 mb-4 text-[#7E69AB]">
                <Play className="h-5 w-5" />
                <h2 className="font-semibold">Program</h2>
              </div>
              <div className="aspect-video bg-gray-100 rounded-lg mb-4"></div>
              <div className="text-sm text-gray-600">
                Currently playing
              </div>
            </div>
          </div>

          {/* Live Section */}
          <div className="col-span-3">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center gap-2 mb-4 text-[#7E69AB]">
                <Radio className="h-5 w-5" />
                <h2 className="font-semibold">Live</h2>
              </div>
              <div className="aspect-video bg-gray-100 rounded-lg mb-4"></div>
              <div className="text-sm text-gray-600">
                Live broadcast
              </div>
            </div>
          </div>

          {/* Next Section */}
          <div className="col-span-3">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center gap-2 mb-4 text-[#7E69AB]">
                <ArrowRight className="h-5 w-5" />
                <h2 className="font-semibold">Next</h2>
              </div>
              <div className="aspect-video bg-gray-100 rounded-lg mb-4"></div>
              <div className="text-sm text-gray-600">
                Coming up next
              </div>
            </div>
          </div>

          {/* Rundown List */}
          <div className="col-span-12">
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
                            className="bg-white rounded-lg shadow-sm p-6 flex items-center gap-6"
                          >
                            {/* Drag Handle */}
                            <div
                              {...provided.dragHandleProps}
                              className="cursor-move text-gray-400 hover:text-gray-600"
                            >
                              <GripVertical className="h-5 w-5" />
                            </div>

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
                              <h3 className="text-lg font-medium text-[#222222]">
                                {item.name}
                              </h3>
                              <div className="text-sm text-gray-500">
                                {Object.entries(item.data).map(([category, items]) => (
                                  Array.isArray(items) && items.length > 0 && (
                                    <span key={category} className="mr-4">
                                      <span className="font-medium capitalize">{category}:</span>{' '}
                                      {items.join(', ')}
                                    </span>
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
      </div>
    </div>
  );
};

export default RundownPreview;