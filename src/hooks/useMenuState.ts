import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import { LowerThirdData } from '../types/menu';

const convertTimeToSeconds = (timeStr: string) => {
  const parts = timeStr.split(':');
  if (parts.length === 2) {
    const minutes = parts[0] ? parseInt(parts[0]) : 0;
    const seconds = parseInt(parts[1]);
    return minutes * 60 + seconds;
  }
  return 0;
};

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
    if (categoryId === 'scte') {
      const timeMatch = item.match(/(\d*:?\d+)/);
      if (timeMatch) {
        const timeStr = timeMatch[1];
        const seconds = convertTimeToSeconds(timeStr);
        console.log({
          action: `Start/Stop Time signal (0x30)_Auto Stop in ${seconds}sec`,
          actionCode: "SwitchSCTE",
          changeable: true,
          enabled: true,
          note: "",
          shortcut: "Alt/Option+Shift+A",
          shortcutId: 6244,
          uiAction: false
        });
      }
    }

    setSelectedItems(prev => {
      if (categoryId === 'audio' || categoryId === 'music') {
        const currentItems = prev[categoryId] || [];
        const itemExists = currentItems.includes(item);
        
        return {
          ...prev,
          [categoryId]: itemExists
            ? currentItems.filter(i => i !== item)
            : [...currentItems, item]
        };
      }
      
      return {
        ...prev,
        [categoryId]: [item]
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
  };
};