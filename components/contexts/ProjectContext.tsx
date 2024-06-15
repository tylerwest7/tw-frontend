import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  getLabs,
  getPortraits,
  getProjects,
  getClients,
} from "@/sanity/sanity-utils";

interface Project {
  altText: string;
  imagePreview?: string;
  image?: string;
  slug?: string;
  tag?: string;
  title?: string;
  projectImages?: string;
}

interface Portrait {
  alt: string;
  content: string | null;
  image: string;
  name: string;
  slug: string | null;
  url: string | null;
  _id: string;
  _createdAt: string;
}

interface Client {
  name: string;
}

interface ProjectContextProps {
  projects: Project[];
  clients: Client[];
  portraits: Portrait[];
  labs: Project[];
  isLoading: boolean;
}

const ProjectContext = createContext<ProjectContextProps | null>(null);

interface ProjectProviderProps {
  children: ReactNode;
}

export const ProjectProvider = ({ children }: ProjectProviderProps) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [portraits, setPortraits] = useState<Portrait[]>([]);
  const [labs, setLabs] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const fetchedProjects = await getProjects();
        const fetchedClients = await getClients();
        const fetchedPortraits = await getPortraits();
        const fetchedLabs = await getLabs();
        setLabs(fetchedLabs);
        setProjects(fetchedProjects);
        setClients(fetchedClients);
        setPortraits(fetchedPortraits);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <ProjectContext.Provider
      value={{ projects, clients, portraits, labs, isLoading }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjectContext = () => {
  const context = useContext(ProjectContext);
  if (context === null) {
    throw new Error("useProjectContext must be used within a ProjectProvider");
  }
  return context;
};
