"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { 
  SiPhp, SiLaravel, SiNodedotjs, SiNestjs, SiExpress,
  SiReact, SiNextdotjs, SiAngular, SiVuedotjs, SiTailwindcss, SiJavascript, SiHtml5, SiCss,
  SiPostgresql, SiMysql,
  SiPython, SiScikitlearn,
  SiArduino, SiCplusplus,
  SiGit, SiGithub, SiDocker, SiPostman 
} from "react-icons/si";

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AboutModal({ isOpen, onClose }: AboutModalProps) {
  
  // Lock scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const SkillIcon = ({ icon: Icon, name, color }: { icon: any, name: string, color?: string }) => (
    <div className="holo-skill-item">
      <Icon size={28} color={color || "#00C2FF"} />
      <span>{name}</span>
    </div>
  );

  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <h3 className="holo-section-title">{children}</h3>
  );

  // Holographic open animation variants
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.25, delay: 0.15 } }
  };

  const panelVariants = {
    hidden: { 
      scaleY: 0.01, 
      scaleX: 0.6, 
      opacity: 0,
      filter: "brightness(3) blur(8px)"
    },
    visible: { 
      scaleY: 1, 
      scaleX: 1, 
      opacity: 1,
      filter: "brightness(1) blur(0px)",
      transition: { 
        scaleY: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
        scaleX: { duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 },
        opacity: { duration: 0.3 },
        filter: { duration: 0.6 }
      }
    },
    exit: { 
      scaleY: 0.01, 
      scaleX: 0.4, 
      opacity: 0,
      filter: "brightness(4) blur(6px)",
      transition: { 
        duration: 0.3, 
        ease: [0.4, 0, 1, 1] 
      }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { delay: 0.45, duration: 0.4 }
    },
    exit: { opacity: 0, transition: { duration: 0.1 } }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="holo-overlay"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        >
          <motion.div 
            className="holo-panel"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            onWheel={(e) => e.stopPropagation()}
          >
            {/* Grid Overlay */}
            <div className="holo-grid-overlay" />

            {/* Corner Brackets */}
            <div className="holo-corner holo-corner--tl" />
            <div className="holo-corner holo-corner--tr" />
            <div className="holo-corner holo-corner--bl" />
            <div className="holo-corner holo-corner--br" />

            {/* Telemetry Labels */}
            <span className="holo-label holo-label--top">[ PERFIL :: ACTIVO ]</span>
            <span className="holo-label holo-label--bottom">SYS.VER 2.6.1</span>

            {/* Close Button */}
            <button className="holo-close-btn" onClick={onClose}>
              <X size={18} />
            </button>

            {/* Content (fades in after panel opens) */}
            <motion.div
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{ position: "relative", zIndex: 2 }}
            >
              <header style={{ marginBottom: "40px" }}>
                <h2 className="holo-title halo-text">Sobre mí</h2>
                <div className="holo-title-bar" />
              </header>

              <section style={{ marginBottom: "50px" }}>
                <p className="holo-text">
                  Soy CHIMI, un apasionado desarrollador especializado en crear soluciones digitales innovadoras y eficientes. Mi enfoque combina creatividad, funcionalidad y mejores prácticas de desarrollo para ofrecer productos de alta calidad.
                </p>
                <p className="holo-text">
                  Con experiencia en diversas tecnologías y frameworks, me especializo en construir aplicaciones web modernas, responsivas y escalables que cumplen con los objetivos de negocio de mis clientes.
                </p>
                <p className="holo-text">
                  Mi filosofía se basa en la <strong>curiosidad insaciable</strong> y el <strong>aprendizaje constante</strong>; disfruto integrando múltiples tecnologías en un solo proyecto para crear soluciones robustas, variadas y siempre a la vanguardia.
                </p>
              </section>

              <section>
                <h2 className="holo-title halo-text" style={{ fontSize: "24px" }}>Stacks Tecnológicos</h2>
                <div className="holo-title-bar" />
                
                <SectionTitle>Backend</SectionTitle>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(95px, 1fr))", gap: "12px" }}>
                  <SkillIcon icon={SiPhp} name="PHP" color="#777BB4" />
                  <SkillIcon icon={SiLaravel} name="Laravel" color="#FF2D20" />
                  <SkillIcon icon={SiNodedotjs} name="Node.js" color="#339933" />
                  <SkillIcon icon={SiNestjs} name="NestJS" color="#E0234E" />
                  <SkillIcon icon={SiExpress} name="Express" color="#ffffff" />
                </div>

                <SectionTitle>Frontend</SectionTitle>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(95px, 1fr))", gap: "12px" }}>
                  <SkillIcon icon={SiReact} name="React" color="#61DAFB" />
                  <SkillIcon icon={SiNextdotjs} name="Next.js" color="#ffffff" />
                  <SkillIcon icon={SiAngular} name="Angular" color="#DD0031" />
                  <SkillIcon icon={SiVuedotjs} name="Vue" color="#4FC08D" />
                  <SkillIcon icon={SiTailwindcss} name="Tailwind" color="#06B6D4" />
                  <SkillIcon icon={SiJavascript} name="JavaScript" color="#F7DF1E" />
                  <SkillIcon icon={SiHtml5} name="HTML5" color="#E34F26" />
                  <SkillIcon icon={SiCss} name="CSS" color="#1572B6" />
                </div>

                <SectionTitle>Bases de datos</SectionTitle>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(95px, 1fr))", gap: "12px" }}>
                  <SkillIcon icon={SiPostgresql} name="PostgreSQL" color="#4169E1" />
                  <SkillIcon icon={SiMysql} name="MySQL" color="#4479A1" />
                </div>

                <SectionTitle>Data & Machine Learning</SectionTitle>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(95px, 1fr))", gap: "12px" }}>
                  <SkillIcon icon={SiPython} name="Python" color="#3776AB" />
                  <SkillIcon icon={SiScikitlearn} name="Scikit-Learn" color="#F7931E" />
                </div>

                <SectionTitle>IoT & Hardware</SectionTitle>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(95px, 1fr))", gap: "12px" }}>
                  <SkillIcon icon={SiArduino} name="Arduino" color="#00979D" />
                  <SkillIcon icon={SiCplusplus} name="C++" color="#00599C" />
                </div>

                <SectionTitle>Herramientas</SectionTitle>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(95px, 1fr))", gap: "12px" }}>
                  <SkillIcon icon={SiGit} name="Git" color="#F05032" />
                  <SkillIcon icon={SiGithub} name="GitHub" color="#ffffff" />
                  <SkillIcon icon={SiDocker} name="Docker" color="#2496ED" />
                  <SkillIcon icon={SiPostman} name="Postman" color="#FF6C37" />
                </div>
              </section>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
