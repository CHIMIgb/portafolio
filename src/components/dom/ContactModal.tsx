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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Using FormSubmit.co with advanced spam prevention and metadata
      const response = await fetch("https://formsubmit.co/ajax/chimisolucionesdigitales@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          ...formState,
          _subject: `[Portfolio Contacto] ${formState.name} - ${formState.subject}`,
          _template: "table",
          _captcha: "false",
          _honey: "" // Standard honeypot field to block bots
        })
      });

      if (response.ok) {
        setIsSuccess(true);
        // Clear form
        setFormState({ name: "", email: "", subject: "", message: "" });
      } else {
        throw new Error("Algo salió mal. Por favor intenta de nuevo.");
      }
    } catch (err: any) {
      setError(err.message || "No se pudo enviar el mensaje.");
    } finally {
      setIsSubmitting(false);
    }
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

  // Reset success state when closing
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => setIsSuccess(false), 500);
      return () => clearTimeout(timer);
    }
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
            background: "rgba(0, 0, 0, 0.82)",
            backdropFilter: "blur(12px)",
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
            initial={{ y: -50, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 50, opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="modal-content glass-panel"
            style={{
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
              maxWidth: "600px",
              padding: "40px",
              borderRadius: "24px",
              background: "rgba(15, 15, 15, 0.85)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              position: "relative",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
            }}
            onClick={(e) => e.stopPropagation()}
            onWheel={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              style={{
                position: "absolute",
                top: "24px",
                right: "24px",
                background: "rgba(255, 255, 255, 0.05)",
                border: "none",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--text-primary)",
                cursor: "pointer",
                transition: "background 0.3s"
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)"}
              onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)"}
            >
              <X size={20} />
            </button>

            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ textAlign: "center", padding: "40px 0" }}
              >
                <div style={{
                  width: "80px",
                  height: "80px",
                  background: "var(--accent-primary)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 24px"
                }}>
                  <Send size={32} color="#000" />
                </div>
                <h2 style={{ fontSize: "24px", fontWeight: 800, marginBottom: "12px" }}>¡Mensaje Enviado!</h2>
                <p style={{ color: "var(--accent-secondary)", fontSize: "16px", marginBottom: "12px" }}>
                  Gracias por contactarme. Me pondré en contacto contigo muy pronto.
                </p>
                <button
                  onClick={onClose}
                  className="btn btn-primary"
                  style={{ padding: "12px 32px" }}
                >
                  Cerrar
                </button>
              </motion.div>
            ) : (
              <>
                <h2 style={{ fontSize: "32px", fontWeight: 900, marginBottom: "8px", letterSpacing: "-0.02em" }}>Contáctame</h2>
                <p style={{ color: "var(--accent-secondary)", marginBottom: "32px", fontSize: "16px" }}>
                  ¿Tienes un proyecto en mente? Hablemos sobre cómo puedo ayudarte a hacerlo realidad.
                </p>

                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  <div style={{ display: "flex", gap: "20px" }}>
                    <input
                      type="text"
                      placeholder="Tu nombre"
                      required
                      disabled={isSubmitting}
                      className="input-field"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      style={{ flex: 1, padding: "16px", borderRadius: "12px", background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.1)", color: "white", outline: "none" }}
                    />
                    <input
                      type="email"
                      placeholder="Tu email"
                      required
                      disabled={isSubmitting}
                      className="input-field"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      style={{ flex: 1, padding: "16px", borderRadius: "12px", background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.1)", color: "white", outline: "none" }}
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Asunto"
                    required
                    disabled={isSubmitting}
                    className="input-field"
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    style={{ padding: "16px", borderRadius: "12px", background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.1)", color: "white", outline: "none" }}
                  />
                  <textarea
                    placeholder="Tu mensaje"
                    required
                    disabled={isSubmitting}
                    className="input-field"
                    rows={5}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    style={{ padding: "16px", borderRadius: "12px", background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.1)", color: "white", resize: "none", outline: "none" }}
                  />

                  {error && (
                    <p style={{ color: "#FF4D4D", fontSize: "14px" }}>{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary"
                    style={{
                      padding: "18px",
                      fontSize: "14px",
                      fontWeight: 700,
                      borderRadius: "12px",
                      background: isSubmitting ? "rgba(255, 255, 255, 0.1)" : "var(--accent-primary)",
                      color: isSubmitting ? "rgba(255, 255, 255, 0.5)" : "#000",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "10px",
                      cursor: isSubmitting ? "not-allowed" : "pointer"
                    }}
                  >
                    {isSubmitting ? "Enviando..." : <>Enviar Mensaje <Send size={18} /></>}
                  </button>
                </form>

                <div style={{ marginTop: "40px", borderTop: "1px solid rgba(255, 255, 255, 0.05)", paddingTop: "32px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "rgba(0, 194, 255, 0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Mail size={18} color="var(--accent-primary)" style={{ margin: "auto" }} />
                    </div>
                    <div>
                      <span style={{ fontSize: "10px", color: "var(--accent-secondary)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Email</span>
                      <p style={{ fontSize: "13px", color: "white" }}>chimisolucionesdigitales@gmail.com</p>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "rgba(0, 194, 255, 0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Phone size={18} color="var(--accent-primary)" style={{ margin: "auto" }} />
                    </div>
                    <div>
                      <span style={{ fontSize: "10px", color: "var(--accent-secondary)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Teléfono</span>
                      <p style={{ fontSize: "13px", color: "white" }}>+52 323 101 3548</p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
