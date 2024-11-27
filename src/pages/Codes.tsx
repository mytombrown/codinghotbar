import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Hotbar from "../components/Hotbar";
import { CodeCard } from "../components/CodeCard";

interface SavedCode {
  id: string;
  name: string;
  data: Record<string, string[]>;
}

interface HotbarItem extends SavedCode {
  rundownId: string;
}

const MAX_HOTBAR_ITEMS = 20;

const Codes = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showHotbar, setShowHotbar] = useState(true);
  const [savedCodes, setSavedCodes] = useState<SavedCode[]>(() => {
    const saved = localStorage.getItem("saved-codes");
    return saved ? JSON.parse(saved) : [];
  });
  const [hotbarItems, setHotbarItems] = useState<HotbarItem[]>([]);
  const [codeToDelete, setCodeToDelete] = useState<SavedCode | null>(null);

  const handleNewCode = () => {
    navigate("/new-code");
  };

  const handleDoubleClick = (id: string) => {
    navigate(`/edit-code/${id}`);
  };

  const handleDeleteCode = (code: SavedCode) => {
    setCodeToDelete(code);
  };

  const confirmDelete = () => {
    if (codeToDelete) {
      const updatedCodes = savedCodes.filter(code => code.id !== codeToDelete.id);
      localStorage.setItem("saved-codes", JSON.stringify(updatedCodes));
      setSavedCodes(updatedCodes);
      setCodeToDelete(null);
      toast({
        title: "Code Deleted",
        description: `"${codeToDelete.name}" has been deleted.`,
      });
    }
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    if (result.source.droppableId === 'codes' && result.destination.droppableId === 'hotbar') {
      if (hotbarItems.length >= MAX_HOTBAR_ITEMS) {
        toast({
          title: "Hotbar Full",
          description: `Cannot add more than ${MAX_HOTBAR_ITEMS} items to the hotbar.`,
          variant: "destructive",
        });
        return;
      }

      const code = savedCodes.find(code => code.id === result.draggableId);
      if (code) {
        const newHotbarItem: HotbarItem = {
          ...code,
          rundownId: `${Date.now()}-${Math.random()}`
        };
        setHotbarItems(prev => [...prev, newHotbarItem]);
      }
    }

    if (result.source.droppableId === 'hotbar' && result.destination.droppableId === 'hotbar') {
      const items = Array.from(hotbarItems);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      setHotbarItems(items);
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
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
              onClick={() => setShowHotbar(!showHotbar)}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {showHotbar ? 'Hide Hotbar' : 'Show Hotbar'}
            </Button>
          </div>

          <AlertDialog open={!!codeToDelete} onOpenChange={() => setCodeToDelete(null)}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Code</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete "{codeToDelete?.name}"? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <Droppable droppableId="codes" direction="horizontal">
            {(provided) => (
              <div 
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="grid grid-cols-6 gap-2"
              >
                {savedCodes.map((code, index) => (
                  <Draggable key={code.id} draggableId={code.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <CodeCard
                          code={code}
                          onDoubleClick={handleDoubleClick}
                          onDelete={handleDeleteCode}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          <Hotbar items={hotbarItems} showHotbar={showHotbar} />
        </div>
      </div>
    </DragDropContext>
  );
};

export default Codes;