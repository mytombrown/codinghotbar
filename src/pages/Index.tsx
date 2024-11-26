import React from 'react';
import { TooltipProvider } from '@radix-ui/react-tooltip';
import MenuSystem from '../components/MenuSystem';

const Index = () => {
  return (
    <TooltipProvider>
      <div className="min-h-screen bg-menu-dark">
        <div className="flex flex-col">
          <MenuSystem />
        </div>
      </div>
    </TooltipProvider>
  );
};

export default Index;