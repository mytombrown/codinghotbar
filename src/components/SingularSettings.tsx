import { useState, useEffect } from 'react';
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useToast } from "./ui/use-toast";

export const SingularSettings = () => {
  const [apiKey, setApiKey] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    const savedApiKey = localStorage.getItem('singular-api-key');
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, []);

  const handleSaveApiKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem('singular-api-key', apiKey.trim());
      toast({
        title: "API Key Saved",
        description: "Your Singular.live API key has been saved successfully.",
      });
    } else {
      toast({
        title: "Error",
        description: "Please enter a valid API key",
        variant: "destructive",
      });
    }
  };

  const handleClearApiKey = () => {
    localStorage.removeItem('singular-api-key');
    setApiKey('');
    toast({
      title: "API Key Removed",
      description: "Your Singular.live API key has been removed.",
    });
  };

  return (
    <div className="space-y-4 p-4 bg-menu-darker/80 rounded-lg">
      <h2 className="text-lg font-semibold text-white">Singular.live Settings</h2>
      <div className="space-y-2">
        <label htmlFor="apiKey" className="text-sm text-menu-subtext">
          API Key
        </label>
        <Input
          id="apiKey"
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Enter your Singular.live API key"
          className="bg-menu-darker text-white"
        />
      </div>
      <div className="flex space-x-2">
        <Button onClick={handleSaveApiKey}>Save API Key</Button>
        <Button 
          variant="destructive" 
          onClick={handleClearApiKey}
        >
          Clear API Key
        </Button>
      </div>
    </div>
  );
};