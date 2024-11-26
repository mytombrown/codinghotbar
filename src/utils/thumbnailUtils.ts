import { sideMenuItems } from '../data/menuItems';

export const getCodeThumbnail = (data: Record<string, string[]>) => {
  if (data.source && data.source.length > 0) {
    const sourceLabel = data.source[0];
    const sourceItem = sideMenuItems
      .find(item => item.id === 'source')
      ?.items?.find(source => source.label === sourceLabel);
    return sourceItem?.previewImage || '/placeholder.svg';
  }
  return '/placeholder.svg';
};