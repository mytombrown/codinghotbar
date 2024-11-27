import React from 'react';

interface MESourcesDisplayProps {
  meData: Record<string, string[]>;
}

const MESourcesDisplay = ({ meData }: MESourcesDisplayProps) => {
  if (!meData || !meData['me'] || meData['me'].length === 0) {
    return null;
  }

  return (
    <div className="space-y-2">
      <h4 className="text-sm font-semibold">ME Sources</h4>
      <div className="text-sm">
        {meData['me'].map((meItem, index) => {
          const meBox = meItem;
          return (
            <div key={index} className="flex items-center gap-2 mb-1">
              <span className="font-medium">{meBox}:</span>
              {meData['source']?.length > 0 && (
                <span className="text-muted-foreground">
                  {meData['source'].join(', ')}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MESourcesDisplay;