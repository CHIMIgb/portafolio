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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:chimisolucionesdigitales@gmail.com?subject=${encodeURIComponent(formState.subject)}&body=${encodeURIComponent(`Nombre: ${formState.name}\nEmail: ${formState.email}\n\nMensaje:\n${formState.message}`)}`;
    window.location.href = mailtoLink;
    handleClose();
    alert("¡Gracias por tu mensaje! Se abrirá tu cliente de correo.");
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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
