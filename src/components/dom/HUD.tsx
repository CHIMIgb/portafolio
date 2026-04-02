"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Code } from "lucide-react";
import { FaGithub, FaInstagram } from "react-icons/fa";
import { motion } from "framer-motion";
import ContactModal from "./ContactModal";

export default function HUD() {
  const [isContactOpen, setIsContactOpen] = useState(false);
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
      <nav
        style={{
          position: "absolute",
          top: "40px",
          left: "40px",
          display: "flex",
          flexDirection: "column",
          gap: "30px",
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

        {/* Repositioned Contact Button */}
        <div style={{ marginTop: "20px" }}>
          <button
            className="btn btn-primary"
            style={{
              padding: "10px 20px",
              fontSize: "12px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              borderRadius: "50px", // Pill shape like in the reference
              background: "transparent",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              color: "white"
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
            Hablemos
          </button>
        </div>
      </nav>

      {/* 3D Scene is immediate - No Hero Overlay as requested */}

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
