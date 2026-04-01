"use client";

import { useState, useEffect } from "react";
import { Menu, X, ArrowRight, Code } from "lucide-react";
import { FaGithub, FaInstagram } from "react-icons/fa";
import { motion, useScroll, useSpring } from "framer-motion";
import ContactModal from "./ContactModal";

export default function HUD() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Progress bar logic
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div style={{ pointerEvents: "none", width: "100vw", minHeight: "600vh" }}>
      {/* Navbar Overlay */}
      <nav 
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 1000,
          padding: scrolled ? "10px 0" : "20px 0",
          transition: "var(--transition-standard)",
          background: scrolled ? "rgba(10, 10, 10, 0.9)" : "transparent",
          backdropFilter: scrolled ? "blur(10px)" : "none",
          borderBottom: scrolled ? "1px solid var(--glass-border)" : "none",
          pointerEvents: "auto"
        }}
      >
        <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <a href="#" className="logo" style={{ fontSize: "28px", fontWeight: 700, color: "var(--accent-primary)", textDecoration: "none", display: "flex", alignItems: "center" }}>
            CHIMI<span style={{ color: "var(--accent-secondary)", fontWeight: 400, fontSize: "14px", marginLeft: "10px" }}>SOLUCIONES DIGITALES</span>
          </a>
          
          <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
            <button 
              className="btn btn-primary" 
              style={{ padding: "8px 20px" }}
              onClick={() => setIsContactOpen(true)}
            >
              Hablemos
            </button>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{ background: "none", border: "none", color: "white", cursor: "pointer" }}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Progress Bar */}
        <motion.div 
          className="progress-bar"
          style={{ 
            scaleX, 
            position: "absolute", 
            bottom: 0, 
            left: 0, 
            right: 0, 
            height: "3px", 
            background: "var(--accent-primary)", 
            transformOrigin: "0%" 
          }} 
        />
      </nav>

      {/* Main Hero Overlay (Static on scroll start) */}
      <section style={{ height: "100vh", display: "flex", alignItems: "center", pointerEvents: "none" }}>
        <div className="container" style={{ pointerEvents: "auto" }}>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ maxWidth: "700px" }}
          >
            <h1 style={{ fontSize: "clamp(2.5rem, 8vw, 4rem)", marginBottom: "20px" }}>
              Hola, soy <span style={{ color: "var(--accent-primary)" }}>CHIMI</span>
            </h1>
            <p style={{ fontSize: "1.2rem", color: "var(--accent-secondary)", marginBottom: "30px" }}>
              Desarrollo <span style={{ color: "white", fontWeight: 500 }}>soluciones digitales</span> innovadoras. 
              Desliza para explorar mi universo de proyectos en 3D.
            </p>
            <div style={{ display: "flex", gap: "15px" }}>
              <button onClick={() => window.scrollTo(0, 1000)} className="btn btn-primary">
                <Code size={18} /> Ver Proyectos
              </button>
              <button onClick={() => setIsContactOpen(true)} className="btn btn-secondary">
                Contáctame
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section Overlay (Appears later in scroll) */}
      <section style={{ height: "100vh", display: "flex", alignItems: "center" }}>
        {/* We can leave the heavy lifting to the 3D Experience or place text here */}
        <div className="container">
           {/* Add about content or just leave it for the 3D camera to show */}
        </div>
      </section>

      {/* Footer Overlay (At the bottom) */}
      <footer style={{ position: "relative", padding: "50px 0", background: "var(--secondary-dark)", pointerEvents: "auto" }}>
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
             <span style={{ color: "var(--accent-secondary)" }}>&copy; 2026 CHIMI Soluciones Digitales</span>
             <div style={{ display: "flex", gap: "20px" }}>
                <a href="#"><FaGithub size={20} /></a>
                <a href="#"><FaInstagram size={20} /></a>
             </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </div>
  );
}
