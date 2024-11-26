import React from 'react';
import { TooltipProvider } from '@radix-ui/react-tooltip';
import MenuSystem from '../components/MenuSystem';
import ClipManager from '../components/ClipManager/ClipManager';
import { useLocation } from 'react-router-dom';

const Index = () => {
  const location = useLocation();
  const showClipManager = location.pathname === '/clips';

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-menu-dark">
        <div className="flex">
          <MenuSystem />
          {showClipManager && (
            <div className="flex-1 p-8">
              <ClipManager />
            </div>
          )}
        </div>
      </div>
    </TooltipProvider>
  );
};

export default Index;