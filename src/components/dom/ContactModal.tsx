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
            pointerEvents: "auto" // Re-enable pointer events for the modal
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
              maxHeight: "90vh",
              overflowY: "auto",
              maxWidth: "600px",
              padding: "40px",
              borderRadius: "15px",
              position: "relative"
            }}
            onClick={(e) => e.stopPropagation()}
            onWheel={(e) => e.stopPropagation()} // Prevent scroll propagation to background
          >
            <button 
              onClick={onClose}
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                background: "none",
                border: "none",
                color: "var(--text-primary)",
                cursor: "pointer"
              }}
            >
              <X size={24} />
            </button>

            <h2 className="title-underline">Contáctame</h2>
            <p style={{ color: "var(--accent-secondary)", marginBottom: "30px" }}>
              ¿Tienes un proyecto en mente? Hablemos sobre cómo puedo ayudarte a hacerlo realidad.
            </p>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <input 
                type="text" 
                placeholder="Tu nombre" 
                required 
                className="input-field"
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                style={{ padding: "15px", borderRadius: "8px", background: "var(--card-dark)", border: "1px solid var(--glass-border)", color: "white" }}
              />
              <input 
                type="email" 
                placeholder="Tu email" 
                required 
                className="input-field"
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                style={{ padding: "15px", borderRadius: "8px", background: "var(--card-dark)", border: "1px solid var(--glass-border)", color: "white" }}
              />
              <input 
                type="text" 
                placeholder="Asunto" 
                required 
                className="input-field"
                value={formState.subject}
                onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                style={{ padding: "15px", borderRadius: "8px", background: "var(--card-dark)", border: "1px solid var(--glass-border)", color: "white" }}
              />
              <textarea 
                placeholder="Tu mensaje" 
                required 
                className="input-field"
                rows={5}
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                style={{ padding: "15px", borderRadius: "8px", background: "var(--card-dark)", border: "1px solid var(--glass-border)", color: "white", resize: "vertical" }}
              />
              <button type="submit" className="btn btn-primary">
                Enviar Mensaje <Send size={18} />
              </button>
            </form>

            <div style={{ marginTop: "40px", borderTop: "1px solid var(--glass-border)", paddingTop: "20px", display: "flex", flexDirection: "column", gap: "15px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Mail size={18} color="var(--accent-primary)" />
                <span>chimisolucionesdigitales@gmail.com</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Phone size={18} color="var(--accent-primary)" />
                <span>+52 323 101 3548</span>
              </div>
              <div style={{ display: "flex", gap: "15px", marginTop: "10px" }}>
                <a href="#" className="social-link"><FaGithub size={20} /></a>
                <a href="#" className="social-link"><FaInstagram size={20} /></a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
