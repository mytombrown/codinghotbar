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
    items: ['Singular'],
  },
];

const audioSources = [
  { id: 'cam1', label: 'CAM 1', previewImage: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81' },
  { id: 'cam2', label: 'CAM 2', previewImage: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d' },
  { id: 'cam3', label: 'CAM 3', previewImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085' },
  { id: 'live1', label: 'LIVE 1', previewImage: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c' },
  { id: 'live2', label: 'LIVE 2', previewImage: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b' },
  { id: 'live3', label: 'LIVE 3', previewImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6' },
  { id: 'cp1', label: 'CP1', previewImage: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7' },
  { id: 'cp2', label: 'CP2', previewImage: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81' },
  { id: 'me1', label: 'ME1', previewImage: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d' },
  { id: 'me2', label: 'ME2', previewImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085' },
  { id: 'me3', label: 'ME3', previewImage: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c' }
];

export const sideMenuItems: SideMenuItem[] = [
  { 
    id: 'source', 
    label: 'SOURCE',
    items: audioSources
  },
  { 
    id: 'audio', 
    label: 'AUDIO',
    items: audioSources.map(source => ({
      ...source,
      hasLR: true
    }))
  },
  { id: 'ptz', label: 'PTZ' },
  { id: 'grfx', label: 'GRFX' },
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
  { id: 'me', label: 'ME' },
  { id: 'l3', label: 'L3' },
  { id: 'ext-dev', label: 'EXT DEV' },
  { 
    id: 'music', 
    label: 'MUSIC',
    items: Array.from({ length: 10 }, (_, i) => ({
      id: `track${i + 1}`,
      label: `Track ${i + 1}`,
      hasLevel: true
    }))
  }
];