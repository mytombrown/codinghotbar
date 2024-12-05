import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { singularApiRequest, getCompositionData } from '../utils/singularApi';
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
  subcompositions?: {
    id: string;
    name: string;
    model?: { id: string; title: string; type: string; defaultValue?: string; }[];
  }[];
}

interface SingularProjectsProps {
  onSelect: (categoryId: string, item: string) => void;
  selectedItems: Record<string, string[]>;
}

const SingularProjects = ({ onSelect, selectedItems }: SingularProjectsProps) => {
  const { toast } = useToast();
  const [projectData, setProjectData] = useState<Record<string, Record<string, string>>>({});

  const { data: response, isLoading, error } = useQuery({
    queryKey: ['singular-projects'],
    queryFn: async () => {
      const response = await singularApiRequest('');
      if (!response.success) {
        throw new Error(response.error);
      }
      return response.data;
    },
  });

  // Convert the response to an array if it's not already
  const projects = Array.isArray(response) ? response : [response];

  const handleProjectSelect = async (projectId: string, projectName: string) => {
    onSelect('grfx', projectName);
    
    try {
      const compositionData = await getCompositionData(projectId);
      if (compositionData.success && compositionData.data) {
        setProjectData(prev => ({
          ...prev,
          [projectId]: compositionData.data
        }));
      }
    } catch (error) {
      console.error('Error fetching composition data:', error);
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

  const handleUpdateData = async (projectId: string, subCompName?: string) => {
    const payload = {
      subCompositionName: subCompName || '',
      payload: projectData[projectId] || {}
    };

    const response = await singularApiRequest(
      `${projectId}/data`,
      'PUT',
      payload
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

  if (!projects?.length) {
    return <div className="text-white">No projects found.</div>;
  }

  return (
    <div className="space-y-4">
      {projects.map((project: SingularProject) => (
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
              {project.subcompositions?.map((subcomp) => (
                <div key={subcomp.id} className="mb-4 p-4 bg-menu-darker/50 rounded-lg">
                  <h3 className="text-white mb-2">{subcomp.name}</h3>
                  {subcomp.model?.map((field) => (
                    <div key={field.id} className="mt-2 space-y-2">
                      <label className="text-sm text-menu-subtext">
                        {field.title}
                      </label>
                      <Input
                        value={projectData[project.id]?.[field.id] || field.defaultValue || ''}
                        onChange={(e) => handleDataChange(project.id, field.id, e.target.value)}
                        className="bg-menu-darker text-white"
                        placeholder={`Enter ${field.title}`}
                      />
                    </div>
                  ))}
                  <Button
                    onClick={() => handleUpdateData(project.id, subcomp.name)}
                    className="mt-4 w-full"
                  >
                    Update {subcomp.name}
                  </Button>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );
};

export default SingularProjects;