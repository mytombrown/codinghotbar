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
      {showClipManager ? <ClipManager /> : <MenuSystem />}
    </TooltipProvider>
  );
};

export default Index;