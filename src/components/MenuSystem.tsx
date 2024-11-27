import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import SideMenu from './SideMenu';
import GridItems from './GridItems';
import TopMenuBar from './TopMenuBar';
import { useMenuState } from '../hooks/useMenuState';
import { menuItems, sideMenuItems } from '../data/menuItems';

const MenuSystem = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showSaveDialog, setShowSaveDialog] = React.useState(false);
  const {
    activeCategory,
    selectedItems,
    setSelectedItems,
    selectedSideItem,
    showSideItems,
    musicLevels,
    clips,
    handleSave,
    handleAddLowerThird,
    handleLowerThirdTextChange,
    handleItemSelect,
    handleMusicLevelChange,
    handleSideItemClick,
    handleTopMenuClick,
  } = useMenuState(id);

  useEffect(() => {
    if (id) {
      const savedCodes = JSON.parse(localStorage.getItem("saved-codes") || "[]");
      const code = savedCodes.find((c: any) => c.id === id);
      if (code) {
        setSelectedItems(code.data);
      }
    }
  }, [id, setSelectedItems]);

  const handleSaveClick = () => {
    setShowSaveDialog(true);
  };

  const handleSaveAs = () => {
    handleSave();
    setShowSaveDialog(false);
  };

  const handleSaveOver = () => {
    const name = JSON.parse(localStorage.getItem("saved-codes") || "[]")
      .find((c: any) => c.id === id)?.name;
    
    if (name) {
      const savedCodes = JSON.parse(localStorage.getItem("saved-codes") || "[]");
      const newCode = {
        id: id,
        name,
        data: selectedItems,
      };
      
      const index = savedCodes.findIndex((c: any) => c.id === id);
      if (index !== -1) {
        savedCodes[index] = newCode;
      }
      
      localStorage.setItem("saved-codes", JSON.stringify(savedCodes));
      navigate("/codes");
    }
    setShowSaveDialog(false);
  };

  const handleSourceSelect = (sourceId: string, item: any, side?: 'L' | 'R') => {
    handleItemSelect(sourceId, item.label, side);
    if (item.label === 'ME1') {
      handleSideItemClick('me');
    }
  };

  return (
    <div className="min-h-screen bg-menu-dark p-8 flex">
      <div className="flex flex-col">
        <div className="mb-8">
          <img 
            src="/lovable-uploads/09033254-1f55-429f-9954-5e61252f8132.png" 
            alt="TVU Networks Logo" 
            className="w-32 h-auto"
          />
        </div>
        <SideMenu
          items={sideMenuItems}
          selectedSideItem={selectedSideItem}
          selectedItems={selectedItems}
          onItemClick={handleSideItemClick}
        />
      </div>

      <div className="flex-1">
        <div className="flex justify-between mb-4">
          <Button
            onClick={() => navigate("/codes")}
            variant="outline"
            className="text-white group relative"
          >
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              Back
            </span>
          </Button>
          <Button
            onClick={handleSaveClick}
            className="bg-green-600 hover:bg-green-700"
          >
            Save
          </Button>
        </div>

        <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Save Options</DialogTitle>
              <DialogDescription>
                Choose how you want to save your changes
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex gap-2">
              <Button variant="outline" onClick={() => setShowSaveDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveAs}>
                Save as New
              </Button>
              <Button 
                variant="destructive"
                onClick={handleSaveOver}
              >
                Save Over Existing
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <TopMenuBar
          menuItems={menuItems}
          activeCategory={activeCategory}
          selectedItems={selectedItems}
          onTopMenuClick={handleTopMenuClick}
        />

        <motion.div
          className="grid grid-cols-3 gap-4 mt-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <GridItems
            showSideItems={showSideItems}
            selectedSideItem={selectedSideItem}
            sideMenuItems={[...sideMenuItems.map(item => 
              item.id === 'clips' 
                ? { ...item, items: clips }
                : item
            )]}
            menuItems={menuItems}
            activeCategory={activeCategory}
            selectedItems={selectedItems}
            onItemSelect={handleSourceSelect}
            musicLevels={musicLevels}
            onMusicLevelChange={handleMusicLevelChange}
            onLowerThirdTextChange={handleLowerThirdTextChange}
            onAddLowerThird={handleAddLowerThird}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default MenuSystem;
