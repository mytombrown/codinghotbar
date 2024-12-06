import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Droppable, Draggable } from '@hello-pangea/dnd';
import MESourcesDisplay from '../MESourcesDisplay';
import { getCodeThumbnail } from '../../utils/thumbnailUtils';

interface SavedCode {
  id: string;
  name: string;
  data: Record<string, string[]>;
}

interface SourceAction {
  action: string;
  actionCode: string;
  changeable: boolean;
  enabled: boolean;
  note: string;
  shortcut: string;
  shortcutId: number;
  uiAction: boolean;
}

interface SavedCodeGridProps {
  savedCodes: SavedCode[];
  onDoubleClick: (id: string) => void;
  onDeleteCode: (code: SavedCode) => void;
}

const SavedCodeGrid = ({ savedCodes, onDoubleClick, onDeleteCode }: SavedCodeGridProps) => {
  const getSourceActions = (data: Record<string, string[]>) => {
    const sourceItems = data['source'] || [];
    return sourceItems.map(source => {
      // Extract the number after "Source " using a regular expression
      const match = source.match(/Source (\d+)/);
      const sourceNumber = match ? match[1] : '1';
      
      return {
        action: `Source ${sourceNumber} to PGM`,
        actionCode: `Source${sourceNumber}ToPgm`,
        changeable: true,
        enabled: true,
        note: "",
        shortcut: "Ctrl+A",
        shortcutId: 6512,
        uiAction: false
      };
    });
  };

  return (
    <Droppable droppableId="codes" direction="horizontal">
      {(provided) => (
        <div 
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="grid grid-cols-6 gap-2"
        >
          {savedCodes.map((code, index) => (
            <Draggable key={code.id} draggableId={code.id} index={index}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <motion.div
                        onDoubleClick={() => onDoubleClick(code.id)}
                        className="aspect-square p-2 rounded-lg backdrop-blur-sm transition-all duration-300 bg-menu-darker/80 text-menu-subtext hover:bg-menu-highlight cursor-move"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex justify-end">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation();
                              onDeleteCode(code);
                            }}
                            className="hover:bg-red-500/20 hover:text-red-500"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                        <div className="w-12 h-12 mx-auto mb-1 rounded-md overflow-hidden">
                          <img
                            src={getCodeThumbnail(code.data)}
                            alt={code.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-xs font-medium tracking-wide text-white block text-center truncate">
                          {code.name}
                        </span>
                      </motion.div>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold">{code.name}</h4>
                        <MESourcesDisplay meData={code.data} />
                        <div className="text-sm">
                          {Object.entries(code.data).map(([category, items]) => (
                            items.length > 0 && category !== 'me' && category !== 'source' && (
                              <div key={category} className="mb-2">
                                <div className="font-medium capitalize">{category}:</div>
                                <div className="text-muted-foreground">
                                  {items.join(', ')}
                                </div>
                              </div>
                            )
                          ))}
                          {code.data.source && code.data.source.length > 0 && (
                            <div className="mt-4">
                              <div className="font-medium">API Actions:</div>
                              {getSourceActions(code.data).map((action, idx) => (
                                <div key={idx} className="mt-2 p-2 bg-slate-100 rounded-md">
                                  <div className="text-xs font-mono">
                                    <div>Action: {action.action}</div>
                                    <div>Code: {action.actionCode}</div>
                                    <div>Shortcut: {action.shortcut}</div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default SavedCodeGrid;