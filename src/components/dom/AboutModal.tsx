"use client";

import { useEffect, useMemo, useState } from "react";
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
  origin?: { x: number; y: number } | null;
}


function getTracerTargets(modalWidth: number, modalHeight: number) {
  const cx = typeof window !== "undefined" ? window.innerWidth / 2 : 500;
  const cy = typeof window !== "undefined" ? window.innerHeight / 2 : 400;
  const hw = modalWidth / 2;
  const hh = modalHeight / 2;
  const cut = 20;

  const corners = [
    { x: cx - hw + cut, y: cy - hh },
    { x: cx + hw - cut, y: cy - hh },
    { x: cx + hw, y: cy - hh + cut },
    { x: cx + hw, y: cy + hh - cut },
    { x: cx + hw - cut, y: cy + hh },
    { x: cx - hw + cut, y: cy + hh },
    { x: cx - hw, y: cy + hh - cut },
    { x: cx - hw, y: cy - hh + cut },
  ];

  const allPoints: { x: number; y: number }[] = [];
  for (let i = 0; i < corners.length; i++) {
    const a = corners[i];
    const b = corners[(i + 1) % corners.length];
    allPoints.push(a);
    allPoints.push({ x: a.x + (b.x - a.x) * 0.33, y: a.y + (b.y - a.y) * 0.33 });
    allPoints.push({ x: a.x + (b.x - a.x) * 0.66, y: a.y + (b.y - a.y) * 0.66 });
  }
  return allPoints;
}

function getAngle(ox: number, oy: number, tx: number, ty: number) {
  return Math.atan2(ty - oy, tx - ox) * (180 / Math.PI) + 90;
}

export default function AboutModal({ isOpen, onClose, origin }: AboutModalProps) {
  const [isClosing, setIsClosing] = useState(false);

export default function AboutModal({ isOpen, onClose }: AboutModalProps) {

  // Lock scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setIsClosing(false);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  const tracerTargets = useMemo(() => {
    if (!isOpen) return [];
    return getTracerTargets(750, 600);
  }, [isOpen]);

  const handleClose = () => {
    if (isClosing) return;
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 850);
  };

  const SkillIcon = ({ icon: Icon, name, color }: { icon: any, name: string, color?: string }) => (

    <div className="holo-skill-item">
      <Icon size={28} color={color || "#00C2FF"} />
      <span>{name}</span>

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

    <h3 className="holo-section-title">{children}</h3>

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

  const TRACER_DURATION = 0.5;
  const PANEL_DELAY = 0.35;
  const CONTENT_DELAY = 0.7;

  // Close timeline
  const CLOSE_CONTENT_DUR = 0.15;
  const CLOSE_PANEL_DELAY = 0.05;
  const CLOSE_PANEL_DUR = 0.3;
  const CLOSE_TRACER_DELAY = 0.15;

  const ox = origin?.x ?? 100;
  const oy = origin?.y ?? 200;

  return (
    <AnimatePresence>
      {isOpen && (

        <motion.div 
          className="holo-overlay"


          initial={{ opacity: 0 }}
          animate={{ opacity: isClosing ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: isClosing ? 0.3 : 0.2, delay: isClosing ? 0.55 : 0 }}
          onClick={handleClose}
        >

          {/* === OPENING TRACERS === */}
          {!isClosing && tracerTargets.map((target, i) => {
            const angle = getAngle(ox, oy, target.x, target.y);
            return (
              <motion.div
                key={`tracer-open-${i}`}
                style={{
                  position: "fixed",
                  width: "2px",
                  height: "60px",
                  background: "linear-gradient(to bottom, transparent 0%, #00C2FF 40%, #00C2FF 60%, transparent 100%)",
                  boxShadow: "0 0 8px #00C2FF, 0 0 20px rgba(0, 194, 255, 0.4), 0 0 40px rgba(0, 194, 255, 0.15)",
                  borderRadius: "1px",
                  zIndex: 2001,
                  pointerEvents: "none",
                  transformOrigin: "center center",
                }}
                initial={{ left: ox, top: oy, rotate: angle, opacity: 0, scale: 0.3 }}
                animate={{
                  left: target.x, top: target.y, rotate: angle,
                  opacity: [0, 1, 1, 0], scale: [0.3, 1.2, 1, 0.5],
                }}
                transition={{
                  duration: TRACER_DURATION, delay: i * 0.02,
                  ease: [0.2, 0.8, 0.3, 1],
                  opacity: { duration: TRACER_DURATION, times: [0, 0.15, 0.75, 1] },
                  scale: { duration: TRACER_DURATION, times: [0, 0.3, 0.7, 1] },
                }}
              />
            );
          })}

          {/* === CLOSING TRACERS (reverse: target → origin) === */}
          {isClosing && tracerTargets.map((target, i) => {
            const angle = getAngle(target.x, target.y, ox, oy);
            return (
              <motion.div
                key={`tracer-close-${i}`}
                style={{
                  position: "fixed",
                  width: "2px",
                  height: "60px",
                  background: "linear-gradient(to bottom, transparent 0%, #00C2FF 40%, #00C2FF 60%, transparent 100%)",
                  boxShadow: "0 0 8px #00C2FF, 0 0 20px rgba(0, 194, 255, 0.4), 0 0 40px rgba(0, 194, 255, 0.15)",
                  borderRadius: "1px",
                  zIndex: 2001,
                  pointerEvents: "none",
                  transformOrigin: "center center",
                }}
                initial={{ left: target.x, top: target.y, rotate: angle, opacity: 0, scale: 0.5 }}
                animate={{
                  left: ox, top: oy, rotate: angle,
                  opacity: [0, 1, 1, 0], scale: [0.5, 1, 1.2, 0.3],
                }}
                transition={{
                  duration: TRACER_DURATION, delay: CLOSE_TRACER_DELAY + i * 0.02,
                  ease: [0.2, 0.8, 0.3, 1],
                  opacity: { duration: TRACER_DURATION, times: [0, 0.15, 0.75, 1] },
                  scale: { duration: TRACER_DURATION, times: [0, 0.3, 0.7, 1] },
                }}
              />
            );
          })}

          {/* === OPENING FLASH === */}
          {!isClosing && (
            <motion.div
              style={{
                position: "fixed", left: "50%", top: "50%",
                width: "100px", height: "2px", marginLeft: "-50px", marginTop: "-1px",
                background: "linear-gradient(to right, transparent, #00C2FF, white, #00C2FF, transparent)",
                boxShadow: "0 0 30px #00C2FF, 0 0 60px rgba(0, 194, 255, 0.4)",
                zIndex: 2001, pointerEvents: "none",
              }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: [0, 3, 0], opacity: [0, 1, 0] }}
              transition={{ duration: 0.4, delay: PANEL_DELAY - 0.05, ease: "easeOut" }}
            />
          )}

          {/* === CLOSING FLASH === */}
          {isClosing && (
            <motion.div
              style={{
                position: "fixed", left: "50%", top: "50%",
                width: "100px", height: "2px", marginLeft: "-50px", marginTop: "-1px",
                background: "linear-gradient(to right, transparent, #00C2FF, white, #00C2FF, transparent)",
                boxShadow: "0 0 30px #00C2FF, 0 0 60px rgba(0, 194, 255, 0.4)",
                zIndex: 2001, pointerEvents: "none",
              }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: [0, 3, 0], opacity: [0, 1, 0] }}
              transition={{ duration: 0.35, delay: CLOSE_PANEL_DELAY, ease: "easeOut" }}
            />
          )}

          {/* === HOLOGRAM PANEL === */}
          <motion.div 
            className="holo-panel"
            initial={{ scaleY: 0.005, scaleX: 0.3, opacity: 0, filter: "brightness(5) blur(10px)" }}
            animate={isClosing
              ? { scaleY: 0.005, scaleX: 0.2, opacity: 0, filter: "brightness(6) blur(8px)" }
              : { scaleY: 1, scaleX: 1, opacity: 1, filter: "brightness(1) blur(0px)" }
            }
            transition={isClosing
              ? { duration: CLOSE_PANEL_DUR, delay: CLOSE_PANEL_DELAY, ease: [0.4, 0, 1, 1] }
              : {
                  delay: PANEL_DELAY,
                  scaleY: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
                  scaleX: { duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: PANEL_DELAY + 0.05 },
                  opacity: { duration: 0.3, delay: PANEL_DELAY },
                  filter: { duration: 0.6, delay: PANEL_DELAY },
                }
            }
            onClick={(e) => e.stopPropagation()}
            onWheel={(e) => e.stopPropagation()}
          >
            <div className="holo-flicker-wrapper">
              <div className="holo-grid-overlay" />
              <div className="holo-corner holo-corner--tl" />
              <div className="holo-corner holo-corner--tr" />
              <div className="holo-corner holo-corner--bl" />
              <div className="holo-corner holo-corner--br" />
              <span className="holo-label holo-label--top">[ PERFIL :: ACTIVO ]</span>
              <span className="holo-label holo-label--bottom">SYS.VER 2.6.1</span>

              <button className="holo-close-btn" onClick={handleClose}>
                <X size={18} />
              </button>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isClosing ? 0 : 1 }}
                transition={isClosing
                  ? { duration: CLOSE_CONTENT_DUR }
                  : { delay: CONTENT_DELAY, duration: 0.5 }
                }
                style={{ position: "relative", zIndex: 2 }}
              >
                <header style={{ marginBottom: "40px" }}>
                  <h2 className="holo-title">Sobre mí</h2>
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
                  <h2 className="holo-title" style={{ fontSize: "24px" }}>Stacks Tecnológicos</h2>
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
            </div>

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
                Con experiencia en diversas tecnologías y frameworks, me especializo en construir aplicaciones web modernas, responsivas y escalables.
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
