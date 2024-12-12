import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import { DragDropContext } from '@hello-pangea/dnd';
import { Settings } from "lucide-react";
import { SingularSettings } from "../components/SingularSettings";
import Hotbar from "../components/Hotbar";
import SavedCodeGrid from "../components/codes/SavedCodeGrid";
import DeleteCodeDialog from "../components/codes/DeleteCodeDialog";

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
  const [showSettings, setShowSettings] = useState(false);
  const [savedCodes, setSavedCodes] = useState<SavedCode[]>(() => {
    const saved = localStorage.getItem("saved-codes");
    return saved ? JSON.parse(saved) : [];
  });
  const [hotbarItems, setHotbarItems] = useState<HotbarItem[]>(() => {
    const saved = localStorage.getItem("hotbar-items");
    return saved ? JSON.parse(saved) : [];
  });
  const [codeToDelete, setCodeToDelete] = useState<SavedCode | null>(null);

  const handleNewCode = () => {
    navigate("/new-code");
  };

  const handleRundownClick = () => {
    // Save hotbar items to rundown-items when navigating to rundown preview
    localStorage.setItem("rundown-items", JSON.stringify(hotbarItems));
    navigate("/rundown-preview");
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
        const newHotbarItems = [...hotbarItems, newHotbarItem];
        setHotbarItems(newHotbarItems);
        localStorage.setItem("hotbar-items", JSON.stringify(newHotbarItems));
      }
    }

    if (result.source.droppableId === 'hotbar' && result.destination.droppableId === 'hotbar') {
      const items = Array.from(hotbarItems);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      setHotbarItems(items);
      localStorage.setItem("hotbar-items", JSON.stringify(items));
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
              onClick={handleRundownClick}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Rundown
            </Button>
            <Button 
              onClick={() => setShowHotbar(!showHotbar)}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {showHotbar ? 'Hide Rundown' : 'Show Rundown'}
            </Button>
            <Button
              onClick={() => setShowSettings(!showSettings)}
              className="ml-auto"
              variant="outline"
            >
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>

          {showSettings && (
            <div className="mb-8">
              <SingularSettings />
            </div>
          )}

          <SavedCodeGrid
            savedCodes={savedCodes}
            onDoubleClick={handleDoubleClick}
            onDeleteCode={handleDeleteCode}
          />

          <DeleteCodeDialog
            codeToDelete={codeToDelete}
            onClose={() => setCodeToDelete(null)}
            onConfirm={confirmDelete}
          />

          <Hotbar items={hotbarItems} showHotbar={showHotbar} />
        </div>
      </div>
    </DragDropContext>
  );
};

export default Codes;