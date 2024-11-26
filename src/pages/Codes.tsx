import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

interface SavedCode {
  id: string;
  name: string;
  data: Record<string, string[]>;
}

interface RundownItem extends SavedCode {
  rundownId: string;
}

const MAX_RUNDOWN_ITEMS = 20;

const Codes = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showRundown, setShowRundown] = useState(true);
  const [savedCodes, setSavedCodes] = useState<SavedCode[]>(() => {
    const saved = localStorage.getItem("saved-codes");
    return saved ? JSON.parse(saved) : [];
  });
  const [rundownItems, setRundownItems] = useState<RundownItem[]>([]);

  const handleNewCode = () => {
    navigate("/new-code");
  };

  const handleDoubleClick = (id: string) => {
    navigate(`/edit-code/${id}`);
  };

  // Helper function to get the first source image from the code data
  const getCodeThumbnail = (data: Record<string, string[]>) => {
    if (data.source && data.source.length > 0) {
      const sourceLabel = data.source[0];
      const audioSources = JSON.parse(localStorage.getItem("audio-sources") || "[]");
      const source = audioSources.find((s: any) => s.label === sourceLabel);
      return source?.previewImage || '/placeholder.svg';
    }
    return '/placeholder.svg';
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    if (result.source.droppableId === 'codes' && result.destination.droppableId === 'rundown') {
      if (rundownItems.length >= MAX_RUNDOWN_ITEMS) {
        toast({
          title: "Rundown Full",
          description: `Cannot add more than ${MAX_RUNDOWN_ITEMS} items to the rundown.`,
          variant: "destructive",
        });
        return;
      }

      const code = savedCodes.find(code => code.id === result.draggableId);
      if (code) {
        const newRundownItem: RundownItem = {
          ...code,
          rundownId: `${Date.now()}-${Math.random()}`
        };
        setRundownItems(prev => [...prev, newRundownItem]);
      }
    }

    if (result.source.droppableId === 'rundown' && result.destination.droppableId === 'rundown') {
      const items = Array.from(rundownItems);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      setRundownItems(items);
    }
  };

  return (
    <div className="min-h-screen bg-menu-dark flex flex-col">
      <div className="flex-1 p-8">
        <div className="flex gap-4 mb-8">
          <Button 
            onClick={handleNewCode}
            className="bg-green-600 hover:bg-green-700"
          >
            New
          </Button>
          <Button 
            onClick={() => setShowRundown(!showRundown)}
            className="bg-purple-600 hover:bg-purple-700"
          >
            {showRundown ? 'Hide Rundown' : 'Show Rundown'}
          </Button>
        </div>

        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="codes">
            {(provided) => (
              <div 
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="grid grid-cols-3 gap-4"
              >
                {savedCodes.map((code, index) => (
                  <Draggable key={code.id} draggableId={code.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <motion.div
                          onDoubleClick={() => handleDoubleClick(code.id)}
                          className="p-4 rounded-lg backdrop-blur-sm transition-all duration-300 bg-menu-darker/80 text-menu-subtext hover:bg-menu-highlight cursor-move"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="w-24 h-16 mx-auto mb-2 rounded-md overflow-hidden">
                            <img
                              src={getCodeThumbnail(code.data)}
                              alt={code.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span className="text-sm font-medium tracking-wide text-white block text-center">
                            {code.name}
                          </span>
                        </motion.div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          {showRundown && (
            <div className="fixed bottom-0 left-0 right-0 bg-menu-darker/90 p-4 border-t border-gray-700">
              <div className="max-w-[95%] mx-auto">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-white text-xl font-bold">
                    Rundown ({rundownItems.length}/{MAX_RUNDOWN_ITEMS})
                  </h2>
                </div>
                <Droppable droppableId="rundown" direction="horizontal">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="flex gap-4 overflow-x-auto pb-4 min-h-[100px] items-center"
                    >
                      {rundownItems.map((item, index) => (
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
          )}
        </DragDropContext>
      </div>
    </div>
  );
};

export default Codes;