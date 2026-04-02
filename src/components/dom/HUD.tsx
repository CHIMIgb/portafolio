import { useState, useEffect } from "react";
import { ArrowRight, Code } from "lucide-react";
import { FaGithub, FaInstagram } from "react-icons/fa";
import { motion } from "framer-motion";
import ContactModal from "./ContactModal";
import AboutModal from "./AboutModal";

export default function HUD() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div style={{ pointerEvents: "none", width: "100vw", height: "100vh", position: "fixed", top: 0, left: 0, zIndex: 1000 }}>
      {/* Top-Left HUD (Wonderland Style) */}
      <motion.nav
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
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
          <a href="#" className="logo" style={{ fontSize: "24px", fontWeight: 900, color: "white", textDecoration: "none", letterSpacing: "0.2em" }}>
            CHIMI
          </a>
          <span style={{ color: "var(--accent-secondary)", fontSize: "10px", letterSpacing: "0.1em", fontWeight: 500 }}>
            FULL STACK DEVELOPER
          </span>
        </div>

        {/* Navigation Buttons */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "10px" }}>
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
            onClick={() => setIsContactOpen(true)}
          >
            Contactame
          </button>

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
            onClick={() => setIsAboutOpen(true)}
          >
            Sobre mí
          </button>
        </div>
      </motion.nav>

      {/* 3D Scene is immediate - No Hero Overlay as requested */}

      {/* Footer Overlay (At the bottom) */}
      <motion.footer
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.5, ease: "easeOut" }}
        style={{ position: "absolute", bottom: 0, left: 0, width: "100%", padding: "40px 0", pointerEvents: "auto" }}
      >
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ color: "var(--accent-secondary)", fontSize: "12px" }}>&copy; 2026 CHIMI</span>
            <div style={{ display: "flex", gap: "20px" }}>
              <a href="#" style={{ color: "white" }}><FaGithub size={20} /></a>
              <a href="#" style={{ color: "white" }}><FaInstagram size={20} /></a>
            </div>
          </div>
        </div>
      </motion.footer>

      {/* Modals */}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
    </div>
  );
}
