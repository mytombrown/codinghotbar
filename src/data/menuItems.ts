import { MenuItem, SideMenuItem } from '../types/menu';

export const menuItems: MenuItem[] = [
  {
    id: 'transition',
    label: 'Transition',
    items: ['MIX', 'SLOW MIX', 'CUT', 'WIPE OUT', 'STINGER', 'END CAP', 'BREAKING NEWS', 'TOP STORIES', 'SPORTS BUMP'],
  },
  {
    id: 'scte',
    label: 'SCTE',
    items: ['START SHOW', 'END SHOW', '2:00 BREAK', '2:30 BREAK', 'REPEAT', '3:00 BREAK', '1:30 BREAK', '1:00 BREAK', ':30 BREAK'],
  },
  {
    id: 'auto-advance',
    label: 'Auto-Advance',
    items: ['MANUAL', 'ADVANCE', 'PAUSE'],
  },
  {
    id: 'grfx',
    label: 'GRFX',
    items: [],
  },
];

export const sideMenuItems: SideMenuItem[] = [
  { 
    id: 'source', 
    label: 'SOURCE',
    items: [
      { id: 'source1', label: 'Source 1', previewImage: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81' },
      { id: 'source2', label: 'Source 2', previewImage: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d' },
      { id: 'source3', label: 'Source 3', previewImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085' },
      { id: 'source4', label: 'Source 4', previewImage: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c' },
      { id: 'source5', label: 'Source 5', previewImage: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b' },
      { id: 'source6', label: 'Source 6', previewImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6' },
      { id: 'source7', label: 'Source 7', previewImage: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7' },
      { id: 'source8', label: 'Source 8', previewImage: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81' },
      { id: 'source9', label: 'Source 9', previewImage: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d' },
      { id: 'source10', label: 'Source 10', previewImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085' },
      { id: 'source11', label: 'Source 11', previewImage: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c' }
    ]
  },
  { 
    id: 'audio', 
    label: 'AUDIO',
    items: [
      { id: 'source1', label: 'Source 1', hasLR: true },
      { id: 'source2', label: 'Source 2', hasLR: true },
      { id: 'source3', label: 'Source 3', hasLR: true },
      { id: 'source4', label: 'Source 4', hasLR: true },
      { id: 'source5', label: 'Source 5', hasLR: true },
      { id: 'source6', label: 'Source 6', hasLR: true }
    ]
  },
  { 
    id: 'clips', 
    label: 'CLIPS',
    items: [
      { 
        id: 'clip1', 
        label: 'Big Buck Bunny',
        previewImage: '/placeholder.svg',
        duration: '00:30:00',
        lowerThirds: []
      },
      { 
        id: 'clip2', 
        label: 'Nature Documentary',
        previewImage: '/photo-1649972904349-6e44c42644a7',
        duration: '01:05:29',
        lowerThirds: []
      },
      { 
        id: 'clip3', 
        label: 'Tech Review',
        previewImage: '/photo-1488590528505-98d2b5aba04b',
        duration: '00:31:04',
        lowerThirds: []
      }
    ]
  },
  { 
    id: 'me', 
    label: 'Custom Video',
    items: [
      {
        id: 'me1',
        label: '2-Split Horizontal',
        type: 'box',
        layout: '2-split',
        previewImage: '/lovable-uploads/c19f54ac-b300-4c14-bad3-e84734fb6d2b.png',
        boxes: [
          { id: 'box1', label: 'Box 1', selectedSource: null },
          { id: 'box2', label: 'Box 2', selectedSource: null }
        ]
      },
      {
        id: 'me2',
        label: '3-Split',
        type: 'box',
        layout: '3-split',
        previewImage: '/lovable-uploads/299e1504-edd8-4a0a-abaf-181fa5ac4ea1.png',
        boxes: [
          { id: 'box1', label: 'Box 1', selectedSource: null },
          { id: 'box2', label: 'Box 2', selectedSource: null },
          { id: 'box3', label: 'Box 3', selectedSource: null }
        ]
      },
      {
        id: 'me3',
        label: '4-Grid',
        type: 'box',
        layout: '4-grid',
        previewImage: '/lovable-uploads/df42a799-9460-4c42-9d1e-7531436c8082.png',
        boxes: [
          { id: 'box1', label: 'Box 1', selectedSource: null },
          { id: 'box2', label: 'Box 2', selectedSource: null },
          { id: 'box3', label: 'Box 3', selectedSource: null },
          { id: 'box4', label: 'Box 4', selectedSource: null }
        ]
      },
      {
        id: 'me4',
        label: '2-Split Vertical',
        type: 'box',
        layout: '2-split-vertical',
        previewImage: '/lovable-uploads/667efea6-70a3-4bad-bfba-b2169adce606.png',
        boxes: [
          { id: 'box1', label: 'Box 1', selectedSource: null },
          { id: 'box2', label: 'Box 2', selectedSource: null }
        ]
      }
    ]
  },
  { id: 'ptz', label: 'PTZ' },
  { id: 'grfx', label: 'GRFX' },
  { id: 'l3', label: 'L3' },
  { 
    id: 'music', 
    label: 'MUSIC',
    items: Array.from({ length: 10 }, (_, i) => ({
      id: `track${i + 1}`,
      label: `Track ${i + 1}`,
      hasLevel: true
    }))
  },
  { id: 'ext-dev', label: 'EXT DEV' }
];