export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  category: string[];
  link: string;
  featured?: boolean;
  icon?: string;
  image?: string;
  consoles?: string[]; // Specifically for ROMs Vault
  position: [number, number, number]; // [x, y, z] for 3D placement
}
