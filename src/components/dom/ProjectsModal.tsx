"use client";

import { motion } from "framer-motion";
import { ExternalLink, Code, Gamepad, Building2, Utensils, Ticket, Palette } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { projects } from "../../data/projects";
import HoloModal from "./HoloModal";

interface ProjectsModalProps {
  isOpen: boolean;
  onClose: () => void;
  origin?: { x: number; y: number } | null;
}

const iconMap: Record<string, any> = {
  gamepad: Gamepad,
  city: Building2,
  utensils: Utensils,
  ticket: Ticket,
  palette: Palette,
  code: Code,
};

export default function ProjectsModal({ isOpen, onClose, origin }: ProjectsModalProps) {
  return (
    <HoloModal
      isOpen={isOpen}
      onClose={onClose}
      origin={origin}
      title="Mis Proyectos"
      labelTop="[ ARCHIVOS :: PROYECTOS ]"
      labelBottom={`TOTAL: ${projects.length}`}
      maxWidth="1000px"
    >
      <div className="holo-project-grid">
        {projects.map((project, idx) => {
          const ProjectIcon = iconMap[project.icon || "code"] || Code;
          return (
            <motion.div
              key={project.id}
              className="holo-project-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + idx * 0.1 }}
            >
              <div className="holo-card-inner">
                <header className="holo-card-header">
                  <div className="holo-card-icon-wrap">
                    <ProjectIcon size={24} color="var(--accent-primary)" />
                  </div>
                  <h3 className="holo-card-title">{project.title || project.id.replace("-", " ")}</h3>
                </header>

                <p className="holo-card-text">{project.description}</p>

                <div className="holo-tech-badges">
                  {project.tech.map((t) => (
                    <span key={t} className="holo-tech-badge">{t}</span>
                  ))}
                </div>

                <footer className="holo-card-footer">
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="holo-project-btn holo-project-btn--primary">
                    <span>VER PROYECTO</span>
                    <ExternalLink size={14} />
                  </a>
                  <a href="#" className="holo-project-btn">
                    <FaGithub size={18} />
                  </a>
                </footer>
              </div>
            </motion.div>
          );
        })}
      </div>
    </HoloModal>
  );
}
