import MenuSystem from '../components/MenuSystem';
import { TooltipProvider } from '@radix-ui/react-tooltip';

const Index = () => {
  return (
    <TooltipProvider>
      <MenuSystem />
    </TooltipProvider>
  );
};

export default Index;