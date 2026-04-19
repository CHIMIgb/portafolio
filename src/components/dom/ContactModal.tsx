"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Mail, Phone } from "lucide-react";
import { FaGithub, FaInstagram } from "react-icons/fa";

interface ContactModalProps {
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

export default function ContactModal({ isOpen, onClose, origin }: ContactModalProps) {
  const [isClosing, setIsClosing] = useState(false);
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
    const mailtoLink = `mailto:chimisolucionesdigitales@gmail.com?subject=${encodeURIComponent(formState.subject)}&body=${encodeURIComponent(`Nombre: ${formState.name}\nEmail: ${formState.email}\n\nMensaje:\n${formState.message}`)}`;
    window.location.href = mailtoLink;
    handleClose();
    alert("¡Gracias por tu mensaje! Se abrirá tu cliente de correo.");

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
    return getTracerTargets(600, 550);
  }, [isOpen]);


  const handleClose = () => {
    if (isClosing) return;
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 850);
  };

  const TRACER_DURATION = 0.5;
  const PANEL_DELAY = 0.35;
  const CONTENT_DELAY = 0.7;

  const CLOSE_CONTENT_DUR = 0.15;
  const CLOSE_PANEL_DELAY = 0.05;
  const CLOSE_PANEL_DUR = 0.3;
  const CLOSE_TRACER_DELAY = 0.15;

  const ox = origin?.x ?? 100;
  const oy = origin?.y ?? 150;

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
          className="holo-overlay"

        <motion.div
          className="modal-overlay"

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
            style={{ maxWidth: "600px" }}
            onClick={(e) => e.stopPropagation()}
            onWheel={(e) => e.stopPropagation()}
          >
            <div className="holo-flicker-wrapper">
              <div className="holo-grid-overlay" />
              <div className="holo-corner holo-corner--tl" />
              <div className="holo-corner holo-corner--tr" />
              <div className="holo-corner holo-corner--bl" />
              <div className="holo-corner holo-corner--br" />
              <span className="holo-label holo-label--top">[ CANAL :: ABIERTO ]</span>
              <span className="holo-label holo-label--bottom">FREQ 47.3 GHz</span>

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
                <header style={{ marginBottom: "30px" }}>
                  <h2 className="holo-title">Contáctame</h2>
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
            </div>

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
