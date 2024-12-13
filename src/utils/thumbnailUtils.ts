import { sideMenuItems } from '../data/menuItems';

export const getCodeThumbnail = (data: Record<string, string[]>) => {
  // First check ME/Custom Video sources
  if (data.me && data.me.length > 0) {
    const meBox = sideMenuItems
      .find(menu => menu.id === 'me')
      ?.items?.find(box => box.label === data.me[0]);

    if (meBox?.selectedSource) {
      return '/lovable-uploads/09033254-1f55-429f-9954-5e61252f8132.png';
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