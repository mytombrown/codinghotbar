import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { singularApiRequest } from '../utils/singularApi';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useToast } from './ui/use-toast';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface SingularProject {
  id: string;
  name: string;
  fields?: { id: string; name: string; }[];
}

interface SingularProjectsProps {
  onSelect: (categoryId: string, item: string) => void;
  selectedItems: Record<string, string[]>;
}

const SingularProjects = ({ onSelect, selectedItems }: SingularProjectsProps) => {
  const { toast } = useToast();
  const [projectData, setProjectData] = useState<Record<string, Record<string, string>>>({});

  const { data: projects, isLoading, error } = useQuery({
    queryKey: ['singular-projects'],
    queryFn: async () => {
      const response = await singularApiRequest('compositions');
      if (!response.success) {
        throw new Error(response.error);
      }
      return response.data as SingularProject[];
    },
  });

  const handleProjectSelect = (projectId: string, projectName: string) => {
    onSelect('grfx', projectName);
    
    // Initialize project data if not exists
    if (!projectData[projectId]) {
      setProjectData(prev => ({
        ...prev,
        [projectId]: {}
      }));
    }
  };

  const handleDataChange = (projectId: string, fieldId: string, value: string) => {
    setProjectData(prev => ({
      ...prev,
      [projectId]: {
        ...prev[projectId],
        [fieldId]: value
      }
    }));
  };

  const handleUpdateData = async (projectId: string) => {
    const response = await singularApiRequest(
      `compositions/${projectId}/data`,
      'PUT',
      { data: projectData[projectId] }
    );

    if (response.success) {
      toast({
        title: "Data Updated",
        description: "Project data has been updated successfully.",
      });
    } else {
      toast({
        title: "Error",
        description: response.error || "Failed to update project data",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <div className="text-white">Loading projects...</div>;
  }

  if (error) {
    return (
      <div className="text-red-500">
        Error loading projects. Please check your API key in settings.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {projects?.map((project) => (
        <Accordion key={project.id} type="single" collapsible>
          <AccordionItem value={project.id}>
            <AccordionTrigger
              onClick={() => handleProjectSelect(project.id, project.name)}
              className={`p-4 rounded-lg ${
                selectedItems['grfx']?.includes(project.name)
                  ? 'bg-menu-active text-white'
                  : 'bg-menu-darker/80 text-menu-subtext'
              }`}
            >
              {project.name}
            </AccordionTrigger>
            <AccordionContent>
              {project.fields?.map((field) => (
                <div key={field.id} className="mt-2 space-y-2">
                  <label className="text-sm text-menu-subtext">
                    {field.name}
                  </label>
                  <Input
                    value={projectData[project.id]?.[field.id] || ''}
                    onChange={(e) => handleDataChange(project.id, field.id, e.target.value)}
                    className="bg-menu-darker text-white"
                    placeholder={`Enter ${field.name}`}
                  />
                </div>
              ))}
              <Button
                onClick={() => handleUpdateData(project.id)}
                className="mt-4 w-full"
              >
                Update Data
              </Button>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );
};

export default SingularProjects;