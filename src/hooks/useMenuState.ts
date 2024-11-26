import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import { LowerThirdData } from '../types/menu';

export const useMenuState = (id?: string) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeCategory, setActiveCategory] = useState<string>('transition');
  const [selectedItems, setSelectedItems] = useState<Record<string, string[]>>({});
  const [selectedSideItem, setSelectedSideItem] = useState<string | null>(null);
  const [showSideItems, setShowSideItems] = useState(false);
  const [musicLevels, setMusicLevels] = useState<Record<string, string>>({});
  const [clips, setClips] = useState([]);

  const handleSave = () => {
    const name = prompt("Enter a name for this code:");
    if (!name) return;

    const savedCodes = JSON.parse(localStorage.getItem("saved-codes") || "[]");
    const newCode = {
      id: id || Date.now().toString(),
      name,
      data: selectedItems,
    };

    if (id) {
      const index = savedCodes.findIndex((c: any) => c.id === id);
      if (index !== -1) {
        savedCodes[index] = newCode;
      }
    } else {
      savedCodes.push(newCode);
    }

    localStorage.setItem("saved-codes", JSON.stringify(savedCodes));
    toast({
      title: "Success",
      description: "Code saved successfully",
    });
    navigate("/codes");
  };

  const handleAddLowerThird = (clipId: string, type: LowerThirdData['type']) => {
    setClips(prevClips => 
      prevClips.map((clip: any) => 
        clip.id === clipId 
          ? { 
              ...clip, 
              lowerThirds: [
                ...(clip.lowerThirds || []),
                { type, text: '' }
              ]
            }
          : clip
      )
    );
  };

  const handleLowerThirdTextChange = (clipId: string, index: number, text: string) => {
    setClips(prevClips =>
      prevClips.map((clip: any) =>
        clip.id === clipId
          ? {
              ...clip,
              lowerThirds: clip.lowerThirds?.map((lt: any, i: number) =>
                i === index ? { ...lt, text } : lt
              ) || []
            }
          : clip
      )
    );
  };

  const handleItemSelect = (categoryId: string, item: string, side?: 'L' | 'R') => {
    const itemLabel = side ? `${item} ${side}` : item;
    
    setSelectedItems(prev => {
      if (categoryId === 'audio' || categoryId === 'music') {
        const currentItems = prev[categoryId] || [];
        const itemExists = currentItems.includes(itemLabel);
        
        return {
          ...prev,
          [categoryId]: itemExists
            ? currentItems.filter(i => i !== itemLabel)
            : [...currentItems, itemLabel]
        };
      }
      
      return {
        ...prev,
        [categoryId]: [itemLabel]
      };
    });
  };

  const handleMusicLevelChange = (trackId: string, level: string) => {
    setMusicLevels(prev => ({
      ...prev,
      [trackId]: level
    }));
  };

  const handleSideItemClick = (itemId: string) => {
    setSelectedSideItem(itemId);
    setShowSideItems(true);
    setActiveCategory('');
  };

  const handleTopMenuClick = (categoryId: string) => {
    setActiveCategory(categoryId);
    setShowSideItems(false);
    setSelectedSideItem(null);
  };

  return {
    activeCategory,
    selectedItems,
    setSelectedItems,  // Added this line to expose setSelectedItems
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
  };
};