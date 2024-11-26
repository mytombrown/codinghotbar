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
  { id: 'mic1', label: 'MIC 1' },
  { id: 'mic2', label: 'MIC 2' },
  { id: 'mic3', label: 'MIC 3' },
  { id: 'mic4', label: 'MIC 4' },
  { id: 'line1', label: 'LINE 1' },
  { id: 'line2', label: 'LINE 2' },
  { id: 'aux1', label: 'AUX 1' },
  { id: 'aux2', label: 'AUX 2' },
  { id: 'ddr1', label: 'DDR 1' },
  { id: 'ddr2', label: 'DDR 2' },
  { id: 'gfx1', label: 'GFX 1' }
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
    items: audioSources.filter(source => !source.id.includes('ddr') && !source.id.includes('gfx')).map(source => ({
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