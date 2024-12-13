import React from 'react';
import { sideMenuItems } from '../data/menuItems';

interface MESourcesDisplayProps {
  meData: Record<string, string[]>;
}

const MESourcesDisplay = ({ meData }: MESourcesDisplayProps) => {
  if (!meData || !meData['me'] || meData['me'].length === 0) {
    return null;
  }

  const meBoxes = sideMenuItems
    .find(menu => menu.id === 'me')
    ?.items || [];

  return (
    <div className="space-y-2">
      <h4 className="text-sm font-semibold">Custom Video Sources</h4>
      <div className="text-sm space-y-4">
        {meBoxes.map((meBox, index) => {
          const isSelected = meData['me'].includes(meBox.label);
          
          if (!isSelected) return null;

          return (
            <div key={index} className="space-y-2">
              <div className="font-medium">{meBox.label}</div>
              <div className="grid grid-cols-2 gap-2">
                {meBox.boxes.map((box: any, boxIndex: number) => (
                  <div 
                    key={boxIndex}
                    className="p-2 rounded bg-slate-950/30"
                  >
                    <div className="font-medium">{box.label}</div>
                    <span className="text-muted-foreground">
                      {box.selectedSource?.label || 'Not in use'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MESourcesDisplay;