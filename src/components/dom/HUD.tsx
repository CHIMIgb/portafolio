import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Code } from "lucide-react";
import { FaGithub, FaInstagram } from "react-icons/fa";
import { motion } from "framer-motion";
import ContactModal from "./ContactModal";
import AboutModal from "./AboutModal";
import ScrambledText from "../ui/ScrambledText";

export default function HUD() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Refs to capture button positions for tracer animation
  const contactBtnRef = useRef<HTMLButtonElement>(null);
  const aboutBtnRef = useRef<HTMLButtonElement>(null);

  // Store the origin coordinates of the click
  const [contactOrigin, setContactOrigin] = useState<{ x: number; y: number } | null>(null);
  const [aboutOrigin, setAboutOrigin] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <div style={{ pointerEvents: "none", width: "100vw", height: "100vh", position: "fixed", top: 0, left: 0, zIndex: 1000 }}>
      {/* Top-Left HUD (Wonderland Style) */}
      <nav
        style={{
          position: "absolute",
          top: "40px",
          left: "40px",
          display: "flex",
          flexDirection: "column",
          gap: "25px",
          pointerEvents: "auto"
        }}
      >
        {/* Brand Info */}
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <a href="#" className="logo halo-text" style={{ fontSize: "24px", color: "white", textDecoration: "none" }}>
            <ScrambledText text="CHIMI" delay={100} duration={5000} />
          </a>
          <span style={{ color: "var(--accent-secondary)", fontSize: "10px", letterSpacing: "0.1em" }}>
            <ScrambledText text="FULL STACK DEVELOPER" delay={400} duration={5000} />
          </span>
        </div>

        {/* Navigation Buttons */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "10px" }}>
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
        </div>
      </nav>

      {/* Footer Overlay (At the bottom) */}
      <footer style={{ position: "absolute", bottom: 0, left: 0, width: "100%", padding: "40px 0", pointerEvents: "auto" }}>
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ color: "var(--accent-secondary)", fontSize: "12px" }}>
              <ScrambledText text="© 2026 CHIMI" delay={1300} duration={5000} />
            </span>
            <div style={{ display: "flex", gap: "20px" }}>
              <a href="#" style={{ color: "white" }}><FaGithub size={20} /></a>
              <a href="#" style={{ color: "white" }}><FaInstagram size={20} /></a>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} origin={contactOrigin} />
      <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} origin={aboutOrigin} />
    </div>
  );
}
