"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Mail, Phone } from "lucide-react";
import { FaGithub, FaInstagram } from "react-icons/fa";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:chimisolucionesdigitales@gmail.com?subject=${encodeURIComponent(formState.subject)}&body=${encodeURIComponent(`Nombre: ${formState.name}\nEmail: ${formState.email}\n\nMensaje:\n${formState.message}`)}`;
    window.location.href = mailtoLink;
    onClose();
    alert("¡Gracias por tu mensaje! Se abrirá tu cliente de correo.");
  };

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
            style={{ maxWidth: "600px" }}
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
            <span className="holo-label holo-label--top">[ CANAL :: ABIERTO ]</span>
            <span className="holo-label holo-label--bottom">FREQ 47.3 GHz</span>

            {/* Close Button */}
            <button className="holo-close-btn" onClick={onClose}>
              <X size={18} />
            </button>

            {/* Content */}
            <motion.div
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{ position: "relative", zIndex: 2 }}
            >
              <header style={{ marginBottom: "30px" }}>
                <h2 className="holo-title halo-text">Contáctame</h2>
                <div className="holo-title-bar" />
                <p className="holo-text" style={{ marginBottom: 0 }}>
                  ¿Tienes un proyecto en mente? Hablemos sobre cómo puedo ayudarte a hacerlo realidad.
                </p>
              </header>

              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <input 
                  type="text" 
                  placeholder="Tu nombre" 
                  required 
                  className="holo-input"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                />
                <input 
                  type="email" 
                  placeholder="Tu email" 
                  required 
                  className="holo-input"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                />
                <input 
                  type="text" 
                  placeholder="Asunto" 
                  required 
                  className="holo-input"
                  value={formState.subject}
                  onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                />
                <textarea 
                  placeholder="Tu mensaje" 
                  required 
                  className="holo-input"
                  rows={5}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  style={{ resize: "vertical" }}
                />
                <button type="submit" className="holo-submit-btn">
                  Enviar Mensaje <Send size={16} />
                </button>
              </form>

              <div className="holo-separator" />

              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div className="holo-contact-info">
                  <Mail size={16} />
                  <span>chimisolucionesdigitales@gmail.com</span>
                </div>
                <div className="holo-contact-info">
                  <Phone size={16} />
                  <span>+52 323 101 3548</span>
                </div>
                <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
                  <a href="#" className="holo-social-link"><FaGithub size={18} /></a>
                  <a href="#" className="holo-social-link"><FaInstagram size={18} /></a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
