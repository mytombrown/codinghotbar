import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";

interface SavedCode {
  id: string;
  name: string;
  data: Record<string, string[]>;
}

const Codes = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [savedCodes, setSavedCodes] = useState<SavedCode[]>(() => {
    const saved = localStorage.getItem("saved-codes");
    return saved ? JSON.parse(saved) : [];
  });

  const handleNewCode = () => {
    navigate("/new-code");
  };

  const handleEditCode = (code: SavedCode) => {
    navigate(`/edit-code/${code.id}`);
  };

  return (
    <div className="min-h-screen bg-menu-dark p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex gap-4 mb-8">
          <Button 
            onClick={handleNewCode}
            className="bg-green-600 hover:bg-green-700"
          >
            New
          </Button>
          <Button 
            onClick={() => {
              if (savedCodes.length === 0) {
                toast({
                  title: "No saved codes",
                  description: "Create a new code first",
                  variant: "destructive",
                });
                return;
              }
            }}
            className="bg-blue-600 hover:bg-blue-700"
            disabled={savedCodes.length === 0}
          >
            Edit
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {savedCodes.map((code) => (
            <motion.button
              key={code.id}
              onClick={() => handleEditCode(code)}
              className="p-6 rounded-lg backdrop-blur-sm transition-all duration-300 bg-menu-darker/80 text-menu-subtext hover:bg-menu-highlight"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-sm font-medium tracking-wide">{code.name}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Codes;