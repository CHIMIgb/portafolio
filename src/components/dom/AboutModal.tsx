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
    <div style={{ 
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center", 
      gap: "8px",
      padding: "15px",
      background: "rgba(255, 255, 255, 0.03)",
      border: "1px solid rgba(255, 255, 255, 0.05)",
      borderRadius: "12px",
      transition: "all 0.3s ease"
    }}
    className="skill-item"
    >
      <Icon size={32} color={color || "white"} />
      <span style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "1px", opacity: 0.7 }}>{name}</span>
    </div>
  );

  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <h3 style={{ 
      fontSize: "14px", 
      color: "var(--accent-primary)", 
      marginTop: "40px", 
      marginBottom: "20px", 
      textTransform: "uppercase", 
      letterSpacing: "2px",
      display: "flex",
      alignItems: "center",
      gap: "10px"
    }}>
      <span style={{ color: "rgba(255,255,255,0.2)" }}>//</span> {children}
    </h3>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="modal-overlay" 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.8)",
            backdropFilter: "blur(10px)",
            zIndex: 2000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            pointerEvents: "auto"
          }}
          onClick={onClose}
        >
          <motion.div 
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="modal-content glass-panel"
            style={{
              width: "100%",
              maxHeight: "85vh",
              overflowY: "auto",
              maxWidth: "800px",
              padding: "60px 40px",
              borderRadius: "24px",
              position: "relative",
              background: "rgba(10, 10, 10, 0.8)",
              border: "1px solid rgba(255, 255, 255, 0.1)"
            }}
            onClick={(e) => e.stopPropagation()}
            onWheel={(e) => e.stopPropagation()}
          >
            <button 
              onClick={onClose}
              style={{
                position: "absolute",
                top: "30px",
                right: "30px",
                background: "rgba(255,255,255,0.05)",
                border: "none",
                color: "white",
                cursor: "pointer",
                padding: "10px",
                borderRadius: "50%"
              }}
            >
              <X size={20} />
            </button>

            <header style={{ marginBottom: "50px" }}>
              <h2 style={{ fontSize: "32px", fontWeight: 800, marginBottom: "20px" }}>Sobre mí</h2>
              <div style={{ height: "4px", width: "60px", background: "var(--accent-primary)", borderRadius: "2px" }} />
            </header>

            <section style={{ marginBottom: "60px" }}>
              <p style={{ fontSize: "18px", lineHeight: "1.8", color: "rgba(255,255,255,0.8)", marginBottom: "20px" }}>
                Soy CHIMI, un apasionado desarrollador especializado en crear soluciones digitales innovadoras y eficientes. Mi enfoque combina creatividad, funcionalidad y mejores prácticas de desarrollo para ofrecer productos de alta calidad.
              </p>
              <p style={{ fontSize: "18px", lineHeight: "1.8", color: "rgba(255,255,255,0.8)", marginBottom: "20px" }}>
                Con experiencia en diversas tecnologías y frameworks, me especializo en construir aplicaciones web modernas, responsivas y escalables que cumplen con los objetivos de negocio de mis clientes.
              </p>
              <p style={{ fontSize: "18px", lineHeight: "1.8", color: "rgba(255,255,255,0.8)" }}>
                Mi filosofía se basa en la <strong>curiosidad insaciable</strong> y el <strong>aprendizaje constante</strong>; disfruto integrando múltiples tecnologías en un solo proyecto para crear soluciones robustas, variadas y siempre a la vanguardia.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: "28px", fontWeight: 800, marginBottom: "10px" }}>Stacks Tecnoglógicos</h2>
              
              <SectionTitle>Backend</SectionTitle>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))", gap: "15px" }}>
                <SkillIcon icon={SiPhp} name="PHP" color="#777BB4" />
                <SkillIcon icon={SiLaravel} name="Laravel" color="#FF2D20" />
                <SkillIcon icon={SiNodedotjs} name="Node.js" color="#339933" />
                <SkillIcon icon={SiNestjs} name="NestJS" color="#E0234E" />
                <SkillIcon icon={SiExpress} name="Express" color="#ffffff" />
              </div>

              <SectionTitle>Frontend</SectionTitle>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))", gap: "15px" }}>
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
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))", gap: "15px" }}>
                <SkillIcon icon={SiPostgresql} name="PostgreSQL" color="#4169E1" />
                <SkillIcon icon={SiMysql} name="MySQL" color="#4479A1" />
              </div>

              <SectionTitle>Data & Machine Learning</SectionTitle>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))", gap: "15px" }}>
                <SkillIcon icon={SiPython} name="Python" color="#3776AB" />
                <SkillIcon icon={SiScikitlearn} name="Scikit-Learn" color="#F7931E" />
              </div>

              <SectionTitle>IoT & Hardware</SectionTitle>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))", gap: "15px" }}>
                <SkillIcon icon={SiArduino} name="Arduino" color="#00979D" />
                <SkillIcon icon={SiCplusplus} name="C++" color="#00599C" />
              </div>

              <SectionTitle>Herramientas</SectionTitle>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))", gap: "15px" }}>
                <SkillIcon icon={SiGit} name="Git" color="#F05032" />
                <SkillIcon icon={SiGithub} name="GitHub" color="#ffffff" />
                <SkillIcon icon={SiDocker} name="Docker" color="#2496ED" />
                <SkillIcon icon={SiPostman} name="Postman" color="#FF6C37" />
              </div>
            </section>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
