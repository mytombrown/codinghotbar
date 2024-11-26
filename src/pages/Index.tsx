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
        <MenuSystem />
        {showClipManager && (
          <div className="fixed bottom-0 right-0 w-1/2 h-1/2 bg-menu-darker rounded-tl-lg shadow-xl border border-menu-highlight">
            <div className="w-full h-full">
              <ClipManager />
            </div>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
};

export default Index;