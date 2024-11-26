import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
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
import { useMenuState } from '../hooks/useMenuState';
import { menuItems, sideMenuItems } from '../data/menuItems';

const MenuSystem = () => {
  const navigate = useNavigate();
  const location = useLocation();
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

  const handleSideMenuClick = (itemId: string) => {
    if (itemId === 'clips') {
      navigate('/clips');
    } else {
      handleSideItemClick(itemId);
    }
  };

  // Only show the main menu UI if we're not on the clips page
  const showMainUI = location.pathname !== '/clips';

  return (
    <div className="min-h-screen bg-menu-dark p-8 flex">
      <SideMenu
        items={sideMenuItems}
        selectedSideItem={selectedSideItem}
        selectedItems={selectedItems}
        onItemClick={handleSideMenuClick}
      />

      {showMainUI && (
        <div className="flex-1">
          <div className="flex justify-between mb-4">
            <Button
              onClick={() => navigate("/codes")}
              variant="outline"
              className="text-white"
            >
              Back
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

          <div className="grid grid-cols-4 gap-4">
            {menuItems.map((category) => (
              <div key={category.id} className="space-y-2">
                <motion.button
                  onClick={() => handleTopMenuClick(category.id)}
                  className={`w-full p-4 rounded-lg backdrop-blur-sm transition-all duration-300 ${
                    activeCategory === category.id
                      ? selectedItems[category.id]?.length > 0
                        ? 'bg-green-800 text-white shadow-lg'
                        : 'bg-menu-active text-white shadow-lg'
                      : selectedItems[category.id]?.length > 0
                      ? 'bg-green-600 text-white'
                      : 'bg-menu-darker/80 text-menu-subtext hover:bg-menu-highlight'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-sm font-medium tracking-wide">{category.label}</span>
                </motion.button>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`h-10 rounded-lg p-2 flex items-center justify-center text-sm ${
                    selectedItems[category.id]?.length > 0
                      ? 'bg-menu-active text-white'
                      : 'bg-menu-darker/40 text-transparent'
                  }`}
                >
                  {selectedItems[category.id]?.join(', ') || '.'}
                </motion.div>
              </div>
            ))}
          </div>

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
              onItemSelect={handleItemSelect}
              musicLevels={musicLevels}
              onMusicLevelChange={handleMusicLevelChange}
              onLowerThirdTextChange={handleLowerThirdTextChange}
              onAddLowerThird={handleAddLowerThird}
            />
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default MenuSystem;