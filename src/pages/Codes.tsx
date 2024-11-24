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

const Codes = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showRundown, setShowRundown] = useState(false);
  const [savedCodes, setSavedCodes] = useState<SavedCode[]>(() => {
    const saved = localStorage.getItem("saved-codes");
    return saved ? JSON.parse(saved) : [];
  });
  const [rundownItems, setRundownItems] = useState<RundownItem[]>([]);

  const handleNewCode = () => {
    navigate("/new-code");
  };

  const handleEditCode = (code: SavedCode) => {
    navigate(`/edit-code/${code.id}`);
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    if (result.source.droppableId === 'codes' && result.destination.droppableId === 'rundown') {
      const code = savedCodes.find(code => code.id === result.draggableId);
      if (code) {
        const newRundownItem: RundownItem = {
          ...code,
          rundownId: Date.now().toString()
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
    <div className="min-h-screen bg-menu-dark p-8">
      <div className={`flex ${showRundown ? 'gap-8' : ''}`}>
        <div className={`${showRundown ? 'w-2/3' : 'w-full'} transition-all duration-300`}>
          <div className="flex gap-4 mb-8">
            <Button 
              onClick={handleNewCode}
              className="bg-green-600 hover:bg-green-700"
            >
              New
            </Button>
            <Button 
              onClick={() => {
                if (savedCodes.length === 0) {
                  toast({
                    title: "No saved codes",
                    description: "Create a new code first",
                    variant: "destructive",
                  });
                  return;
                }
              }}
              className="bg-blue-600 hover:bg-blue-700"
              disabled={savedCodes.length === 0}
            >
              Edit
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
                        <motion.div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          onClick={() => handleEditCode(code)}
                          className="p-6 rounded-lg backdrop-blur-sm transition-all duration-300 bg-menu-darker/80 text-menu-subtext hover:bg-menu-highlight cursor-move"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span className="text-sm font-medium tracking-wide">{code.name}</span>
                        </motion.div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>

        {showRundown && (
          <div className="w-1/3 bg-menu-darker/80 p-6 rounded-lg">
            <h2 className="text-white text-xl font-bold mb-4">Rundown</h2>
            <Droppable droppableId="rundown">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-4 min-h-[200px]"
                >
                  {rundownItems.map((item, index) => (
                    <Draggable key={item.rundownId} draggableId={item.rundownId} index={index}>
                      {(provided) => (
                        <motion.div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="p-4 rounded-lg bg-menu-darker text-white cursor-move"
                        >
                          {item.name}
                        </motion.div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        )}
      </div>
    </div>
  );
};

export default Codes;