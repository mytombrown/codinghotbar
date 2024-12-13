import React from 'react';
import { sideMenuItems } from '../data/menuItems';

interface MESourcesDisplayProps {
  meData: Record<string, string[]>;
}

const MESourcesDisplay = ({ meData }: MESourcesDisplayProps) => {
  if (!meData || !meData['me'] || meData['me'].length === 0) {
    return null;
  }

  return (
    <div className="space-y-2">
      <h4 className="text-sm font-semibold">Custom Video Sources</h4>
      <div className="text-sm">
        {meData['me'].map((meItem, index) => {
          const meBox = sideMenuItems
            .find(menu => menu.id === 'me')
            ?.items?.find(box => box.label === meItem);

          return (
            <div key={index} className="flex items-center gap-2 mb-1">
              <span className="font-medium">{meBox?.label}:</span>
              {meBox?.selectedSource ? (
                <span className="text-muted-foreground">
                  {meBox.selectedSource.label}
                </span>
              ) : (
                <span className="text-muted-foreground italic">No source selected</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MESourcesDisplay;