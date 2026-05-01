import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { ArrowRight, Code, Download } from "lucide-react";
import { FaGithub, FaInstagram, FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import { motion } from "framer-motion";
import ContactModal from "./ContactModal";
import AboutModal from "./AboutModal";
import ProjectsModal from "./ProjectsModal";
import ScrambledText from "../ui/ScrambledText";

export default function HUD() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Refs to capture button positions for tracer animation
  const contactBtnRef = useRef<HTMLButtonElement>(null);
  const aboutBtnRef = useRef<HTMLButtonElement>(null);
  const projectsBtnRef = useRef<HTMLButtonElement>(null);

  // Store the origin coordinates of the click
  const [contactOrigin, setContactOrigin] = useState<{ x: number; y: number } | null>(null);
  const [aboutOrigin, setAboutOrigin] = useState<{ x: number; y: number } | null>(null);
  const [projectsOrigin, setProjectsOrigin] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // El audio solo inicia cuando el usuario activa el botón explícitamente
  const toggleMute = useCallback(() => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = 0.6;
        audioRef.current.muted = false;
        audioRef.current.play().catch(() => { });
      } else {
        audioRef.current.muted = true;
      }
    }
    setIsMuted(!isMuted);
  }, [isMuted]);

  const handleProjectsClick = () => {
    if (projectsBtnRef.current) {
      const rect = projectsBtnRef.current.getBoundingClientRect();
      setProjectsOrigin({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
    }
    setIsProjectsOpen(true);
  };

  const handleContactClick = () => {
    if (contactBtnRef.current) {
      const rect = contactBtnRef.current.getBoundingClientRect();
      setContactOrigin({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
    }
    setIsContactOpen(true);
  };

  const handleAboutClick = () => {
    if (aboutBtnRef.current) {
      const rect = aboutBtnRef.current.getBoundingClientRect();
      setAboutOrigin({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
    }
    setIsAboutOpen(true);
  };

  return (
    <div className="hud-wrapper">
      {/* Top-Left HUD (Wonderland Style) */}
      <motion.nav
        className="hud-nav"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
      >
        {/* Brand Info */}
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <a href="#" className="logo halo-text hud-logo">
            <ScrambledText text="CHIMI" delay={100} duration={5000} />
          </a>
          <span className="hud-subtitle">
            <ScrambledText text="FULL STACK DEVELOPER" delay={400} duration={5000} />
          </span>
        </div>

        {/* Navigation Buttons */}
        <div className="hud-buttons" style={{ display: "flex", flexDirection: "column" }}>
          <button
            ref={projectsBtnRef}
            className="btn btn-primary"
            style={{
              padding: "10px 24px",
              fontSize: "12px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              borderRadius: "50px",
              background: "transparent",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              color: "white",
              textAlign: "left",
              width: "fit-content"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--accent-primary)";
              e.currentTarget.style.color = "black";
              e.currentTarget.style.borderColor = "var(--accent-primary)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "white";
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.3)";
            }}
            onClick={handleProjectsClick}
          >
            <ScrambledText text="PROYECTOS" delay={700} duration={5000} />
          </button>

          <button
            ref={contactBtnRef}
            className="btn btn-primary"
            style={{
              padding: "10px 24px",
              fontSize: "12px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              borderRadius: "50px",
              background: "transparent",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              color: "white",
              textAlign: "left",
              width: "fit-content"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--accent-primary)";
              e.currentTarget.style.color = "black";
              e.currentTarget.style.borderColor = "var(--accent-primary)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "white";
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.3)";
            }}
            onClick={handleContactClick}
          >
            <ScrambledText text="CONTACTAME" delay={800} duration={5000} />
          </button>

          <button
            ref={aboutBtnRef}
            className="btn btn-primary"
            style={{
              padding: "10px 24px",
              fontSize: "12px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              borderRadius: "50px",
              background: "transparent",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              color: "white",
              textAlign: "left",
              width: "fit-content"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--accent-primary)";
              e.currentTarget.style.color = "black";
              e.currentTarget.style.borderColor = "var(--accent-primary)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "white";
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.3)";
            }}
            onClick={handleAboutClick}
          >
            <ScrambledText text="SOBRE MÍ" delay={1000} duration={5000} />
          </button>

          {/*
          <Link href="/models" style={{ textDecoration: 'none' }}>
            <button
              className="btn btn-primary"
              style={{
                padding: "10px 24px",
                fontSize: "12px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                borderRadius: "50px",
                background: "transparent",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                color: "white",
                textAlign: "left",
                width: "fit-content",
                cursor: "pointer"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--accent-primary)";
                e.currentTarget.style.color = "black";
                e.currentTarget.style.borderColor = "var(--accent-primary)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "white";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.3)";
              }}
            >

              <ScrambledText text="BASE DE DATOS NAVES HALO" delay={1200} duration={5000} />
            </button>
          </Link>
          */}
        </div>
      </motion.nav>

      {/* Audio element */}
      <audio
        ref={audioRef}
        src="/audio/Halo 5 Guardians OST Soundtrack Main Menu Theme HD Audio - vgBR - VideoGames Brasil.mp3"
        loop
        preload="auto"
      />

      {/* Footer Overlay (At the bottom) */}
      <motion.footer
        className="hud-footer"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.5, ease: "easeOut" }}
      >
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ color: "var(--accent-secondary)", fontSize: "12px" }}>
              <ScrambledText text="© 2026 CHIMI" delay={1300} duration={5000} />
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <button
                onClick={toggleMute}
                style={{
                  background: "transparent",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  borderRadius: "50%",
                  width: "32px",
                  height: "32px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: isMuted ? "rgba(255,255,255,0.3)" : "#00C2FF",
                  transition: "all 0.3s ease"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#00C2FF";
                  e.currentTarget.style.boxShadow = "0 0 8px rgba(0, 194, 255, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
                  e.currentTarget.style.boxShadow = "none";
                }}
                title={isMuted ? "Activar audio" : "Desactivar audio"}
              >
                {isMuted ? <FaVolumeMute size={14} /> : <FaVolumeUp size={14} />}
              </button>
              <a href="/CV/CV.pdf" download="CV_CHIMI.pdf" style={{ color: "#00C2FF", border: "1px solid rgba(0,194,255,0.3)", padding: "4px 12px", borderRadius: "15px", fontSize: "12px", textDecoration: "none", transition: "all 0.3s ease", display: "flex", alignItems: "center", gap: "6px", fontFamily: "monospace" }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(0,194,255,0.1)"; e.currentTarget.style.borderColor = "#00C2FF"; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.borderColor = "rgba(0,194,255,0.3)"; }}>DESC_CV <Download size={12} /></a>
              <a href="https://github.com/CHIMIgb" target="_blank" rel="noopener noreferrer" style={{ color: "white", transition: "color 0.3s" }} onMouseEnter={(e) => e.currentTarget.style.color = "#00C2FF"} onMouseLeave={(e) => e.currentTarget.style.color = "white"}><FaGithub size={20} /></a>
              <a href="https://www.instagram.com/chimi_gb?igsh=MXg4NmJpZ2I0ejI1dA==" target="_blank" rel="noopener noreferrer" style={{ color: "white", transition: "color 0.3s" }} onMouseEnter={(e) => e.currentTarget.style.color = "#FF00F7"} onMouseLeave={(e) => e.currentTarget.style.color = "white"}><FaInstagram size={20} /></a>
            </div>
          </div>
        </div>
      </motion.footer>

      {/* Modals */}
      <ProjectsModal isOpen={isProjectsOpen} onClose={() => setIsProjectsOpen(false)} origin={projectsOrigin} />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} origin={contactOrigin} />
      <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} origin={aboutOrigin} />
    </div>
  );
}
