import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import SideMenu from './SideMenu';
import GridItems from './GridItems';
import { useMenuState } from '../hooks/useMenuState';
import { menuItems, sideMenuItems } from '../data/menuItems';

const MenuSystem = () => {
  const navigate = useNavigate();
  const { id } = useParams();
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

  return (
    <div className="min-h-screen bg-menu-dark p-8 flex">
      <SideMenu
        items={sideMenuItems}
        selectedSideItem={selectedSideItem}
        selectedItems={selectedItems}
        onItemClick={handleSideItemClick}
      />

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
            onClick={handleSave}
            className="bg-green-600 hover:bg-green-700"
          >
            Save
          </Button>
        </div>

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
    </div>
  );
};

export default MenuSystem;