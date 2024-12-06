interface SCTEAction {
  action: string;
  actionCode: string;
  changeable: boolean;
  enabled: boolean;
  note: string;
  shortcut: string;
  shortcutId: number;
  uiAction: boolean;
}

export const convertTimeToSeconds = (timeStr: string): number => {
  const parts = timeStr.split(':');
  if (parts.length === 2) {
    const minutes = parts[0] ? parseInt(parts[0]) : 0;
    const seconds = parseInt(parts[1]);
    return minutes * 60 + seconds;
  }
  return 0;
};

export const createSCTEAction = (seconds: number): SCTEAction => ({
  action: `Start/Stop Time signal (0x30)_Auto Stop in ${seconds}sec`,
  actionCode: "SwitchSCTE",
  changeable: true,
  enabled: true,
  note: "",
  shortcut: "Alt/Option+Shift+A",
  shortcutId: 6244,
  uiAction: false
});