import { SideMenuItem, LowerThirdData } from '../types/menu';
import MEBoxes from './ME/MEBoxes';
import SingularProjects from './SingularProjects';
import SourceItems from './grid/SourceItems';
import MusicItems from './grid/MusicItems';
import AudioItems from './grid/AudioItems';
import ClipItems from './grid/ClipItems';
import DefaultItems from './grid/DefaultItems';

interface GridItemsProps {
  showSideItems: boolean;
  selectedSideItem: string | null;
  sideMenuItems: SideMenuItem[];
  menuItems: any[];
  activeCategory: string;
  selectedItems: Record<string, string[]>;
  onItemSelect: (categoryId: string, item: string, side?: 'L' | 'R') => void;
  musicLevels?: Record<string, string>;
  onMusicLevelChange?: (trackId: string, level: string) => void;
  onLowerThirdTextChange?: (clipId: string, index: number, text: string) => void;
  onAddLowerThird?: (clipId: string, type: LowerThirdData['type']) => void;
}

const GridItems = ({
  showSideItems,
  selectedSideItem,
  sideMenuItems,
  menuItems,
  activeCategory,
  selectedItems,
  onItemSelect,
  musicLevels = {},
  onMusicLevelChange,
  onLowerThirdTextChange,
  onAddLowerThird,
}: GridItemsProps) => {
  if (activeCategory === 'grfx') {
    return <SingularProjects onSelect={onItemSelect} selectedItems={selectedItems} />;
  }

  if (!showSideItems || !selectedSideItem) {
    return (
      <DefaultItems
        activeCategory={activeCategory}
        menuItems={menuItems}
        selectedItems={selectedItems}
        onItemSelect={onItemSelect}
        sideMenuItems={sideMenuItems}
      />
    );
  }

  const selectedMenu = sideMenuItems.find(item => item.id === selectedSideItem);
  if (!selectedMenu?.items) return null;

  switch (selectedSideItem) {
    case 'source':
      return (
        <SourceItems
          selectedSideItem={selectedSideItem}
          items={selectedMenu.items}
          selectedItems={selectedItems}
          onItemSelect={onItemSelect}
        />
      );

    case 'me':
      return (
        <MEBoxes
          items={selectedMenu.items}
          selectedItems={selectedItems}
          onItemSelect={onItemSelect}
          sideMenuItems={sideMenuItems}
        />
      );

    case 'clips':
      return (
        <ClipItems
          selectedSideItem={selectedSideItem}
          items={selectedMenu.items}
          selectedItems={selectedItems}
          onItemSelect={onItemSelect}
          onLowerThirdTextChange={onLowerThirdTextChange}
          onAddLowerThird={onAddLowerThird}
        />
      );

    case 'music':
      if (selectedMenu.items.some(item => item.hasLevel)) {
        return (
          <MusicItems
            selectedSideItem={selectedSideItem}
            items={selectedMenu.items}
            selectedItems={selectedItems}
            onItemSelect={onItemSelect}
            musicLevels={musicLevels}
            onMusicLevelChange={onMusicLevelChange}
          />
        );
      }
      break;

    default:
      if (selectedMenu.items.some(item => item.hasLR)) {
        return (
          <AudioItems
            selectedSideItem={selectedSideItem}
            items={selectedMenu.items}
            selectedItems={selectedItems}
            onItemSelect={onItemSelect}
          />
        );
      }
      return (
        <div className="grid grid-cols-3 gap-4">
          {selectedMenu.items.map((item) => (
            <button
              key={item.id}
              onClick={() => onItemSelect(selectedSideItem, item.label)}
              className={`p-6 rounded-lg backdrop-blur-sm transition-all duration-300 ${
                selectedItems[selectedSideItem]?.includes(item.label)
                  ? 'bg-menu-active text-white shadow-lg'
                  : 'bg-menu-darker/80 text-menu-subtext hover:bg-menu-highlight'
              }`}
            >
              {item.previewImage && (
                <div className="w-full aspect-video mb-2 rounded overflow-hidden">
                  <img
                    src={item.previewImage}
                    alt={item.label}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <span className="text-sm font-medium tracking-wide">{item.label}</span>
            </button>
          ))}
        </div>
      );
  }

  return null;
};

export default GridItems;
