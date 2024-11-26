import React, { useState, useRef } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Folder, ChevronRight, ChevronDown, Upload, Video } from 'lucide-react';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import { cn } from '@/lib/utils';
import { useToast } from "@/components/ui/use-toast";

interface Clip {
  id: string;
  name: string;
  path: string;
  duration: string;
  inPoint?: number;
  outPoint?: number;
}

interface ClipFolder {
  id: string;
  name: string;
  clips: Clip[];
  folders: ClipFolder[];
}

const ClipManager = () => {
  const { toast } = useToast();
  const [selectedClip, setSelectedClip] = useState<Clip | null>(null);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['KEEP']));
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Example folder structure
  const [folders, setFolders] = useState<ClipFolder[]>([
    {
      id: 'archive',
      name: 'ARCHIVE',
      clips: [],
      folders: []
    },
    {
      id: 'inbound',
      name: 'INBOUND',
      clips: [],
      folders: []
    },
    {
      id: 'keep',
      name: 'KEEP',
      clips: [
        {
          id: '1',
          name: 'big-buck-bunny-1080p-60fps-30sectest.mp4',
          path: '/sample-videos/big-buck-bunny.mp4',
          duration: '00:30:00'
        },
        {
          id: '2',
          name: 'NVIDIAprod5.mp4',
          path: '/sample-videos/sample.mp4',
          duration: '01:05:29'
        }
      ],
      folders: []
    }
  ]);

  const toggleFolder = (folderId: string) => {
    setExpandedFolders(prev => {
      const next = new Set(prev);
      if (next.has(folderId)) {
        next.delete(folderId);
      } else {
        next.add(folderId);
      }
      return next;
    });
  };

  const handleUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Create a new clip object
      const newClip: Clip = {
        id: Date.now().toString(),
        name: file.name,
        path: URL.createObjectURL(file),
        duration: '00:00:00' // You would need to calculate this
      };

      // Add to INBOUND folder
      setFolders(prevFolders => {
        return prevFolders.map(folder => {
          if (folder.id === 'inbound') {
            return {
              ...folder,
              clips: [...folder.clips, newClip]
            };
          }
          return folder;
        });
      });

      toast({
        title: "Upload Successful",
        description: `${file.name} has been uploaded to the INBOUND folder.`,
      });
    }
  };

  const handleMarkIn = (time: number) => {
    if (selectedClip) {
      console.log(`Marked IN point at ${time} for clip ${selectedClip.name}`);
    }
  };

  const handleMarkOut = (time: number) => {
    if (selectedClip) {
      console.log(`Marked OUT point at ${time} for clip ${selectedClip.name}`);
    }
  };

  const renderFolder = (folder: ClipFolder) => {
    const isExpanded = expandedFolders.has(folder.id);
    
    return (
      <div key={folder.id} className="space-y-1">
        <button
          onClick={() => toggleFolder(folder.id)}
          className="flex items-center gap-2 w-full p-2 hover:bg-menu-highlight rounded text-white"
        >
          {isExpanded ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
          <Folder className="h-4 w-4" />
          <span>{folder.name}</span>
          <span className="text-menu-subtext ml-2">
            ({folder.clips.length})
          </span>
        </button>
        
        {isExpanded && (
          <div className="ml-6 space-y-1">
            {folder.clips.map(clip => (
              <button
                key={clip.id}
                onClick={() => setSelectedClip(clip)}
                className={cn(
                  "flex items-center gap-2 w-full p-2 hover:bg-menu-highlight rounded text-menu-subtext",
                  selectedClip?.id === clip.id && "bg-menu-highlight text-white"
                )}
              >
                <Video className="h-4 w-4" />
                <span className="truncate">{clip.name}</span>
                <span className="ml-auto">{clip.duration}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex gap-4 h-full">
      <div className="w-80 bg-menu-darker rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white font-bold">Media</h2>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="video/*"
            className="hidden"
          />
          <Button size="sm" onClick={handleUpload} className="bg-purple-600 hover:bg-purple-700">
            <Upload className="h-4 w-4 mr-2" />
            Upload
          </Button>
        </div>
        
        <div className="space-y-2">
          {folders.map(renderFolder)}
        </div>
      </div>
      
      <div className="flex-1">
        {selectedClip ? (
          <VideoPlayer
            src={selectedClip.path}
            onMarkIn={handleMarkIn}
            onMarkOut={handleMarkOut}
          />
        ) : (
          <div className="h-full flex items-center justify-center text-menu-subtext">
            Select a clip to preview
          </div>
        )}
      </div>
    </div>
  );
};

export default ClipManager;