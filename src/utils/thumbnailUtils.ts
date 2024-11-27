import { sideMenuItems } from '../data/menuItems';

export const getCodeThumbnail = (data: Record<string, string[]>) => {
  // First check ME sources
  if (data.me && data.me.length > 0) {
    const meBox = sideMenuItems
      .find(item => item.id === 'me')
      ?.items?.find(box => box.label === data.me[0]);
    
    if (meBox?.selectedSource?.previewImage) {
      return meBox.selectedSource.previewImage;
    }
  }
  
  // Fallback to direct source if no ME source found
  if (data.source && data.source.length > 0) {
    const sourceLabel = data.source[0];
    const sourceItem = sideMenuItems
      .find(item => item.id === 'source')
      ?.items?.find(source => source.label === sourceLabel);
    return sourceItem?.previewImage || '/placeholder.svg';
  }
  
  return '/placeholder.svg';
};