export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  category: string[];
  link: string;
  github?: string;
  featured?: boolean;
  icon?: string;
  image?: string;
  consoles?: string[]; // Specifically for ROMs Vault
}
