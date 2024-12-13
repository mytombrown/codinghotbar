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
      <div className="text-sm grid grid-cols-2 gap-4">
        {meBoxes.map((meBox, index) => {
          const isSelected = meData['me'].includes(meBox.label);
          
          return (
            <div key={index} className={`p-2 rounded ${isSelected ? 'bg-blue-950/30' : 'bg-slate-950/30'}`}>
              <div className="font-medium">{meBox.label}</div>
              {isSelected ? (
                <span className="text-muted-foreground">
                  {meBox.selectedSource?.label || 'No source selected'}
                </span>
              ) : (
                <span className="text-muted-foreground italic">Not in use</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MESourcesDisplay;