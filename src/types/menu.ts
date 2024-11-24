export interface MenuItem {
  id: string;
  label: string;
  items: string[];
}

export interface SideMenuItem {
  id: string;
  label: string;
  items?: Array<{
    id: string;
    label: string;
    hasLR?: boolean;
    hasLevel?: boolean;
    previewImage?: string;
    duration?: string;
  }>;
}

export interface SelectedAudioItem {
  id: string;
  label: string;
  side: 'L' | 'R';
}