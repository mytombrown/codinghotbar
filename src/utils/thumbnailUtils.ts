import { sideMenuItems } from '../data/menuItems';

export const getCodeThumbnail = (data: Record<string, string[]>) => {
  // First check ME/Custom Video sources
  if (data.me && data.me.length > 0) {
    const meBoxes = data.me.map(meItem => 
      sideMenuItems
        .find(menu => menu.id === 'me')
        ?.items?.find(box => box.label === meItem)
    );

    if (meBoxes.some(box => box?.selectedSource)) {
      return 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6';
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