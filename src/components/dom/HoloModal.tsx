"use client";

import { useEffect, useMemo, useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

// ─── Props ───────────────────────────────────────────────
export interface HoloModalProps {
  isOpen: boolean;
  onClose: () => void;
  origin?: { x: number; y: number } | null;
  title: string;
  labelTop?: string;
  labelBottom?: string;
  maxWidth?: string;
  children: ReactNode;
}

// ─── Tracer Geometry ─────────────────────────────────────
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

// ─── Timing Constants ────────────────────────────────────
const TRACER_DURATION = 0.5;
const PANEL_DELAY = 0.35;
const CONTENT_DELAY = 0.7;
const CLOSE_CONTENT_DUR = 0.15;
const CLOSE_PANEL_DELAY = 0.05;
const CLOSE_PANEL_DUR = 0.3;
const CLOSE_TRACER_DELAY = 0.15;

// ─── Shared Styles ───────────────────────────────────────
const tracerStyle: React.CSSProperties = {
  position: "fixed",
  width: "2px",
  height: "60px",
  background: "linear-gradient(to bottom, transparent 0%, #00C2FF 40%, #00C2FF 60%, transparent 100%)",
  boxShadow: "0 0 8px #00C2FF, 0 0 20px rgba(0, 194, 255, 0.4), 0 0 40px rgba(0, 194, 255, 0.15)",
  borderRadius: "1px",
  zIndex: 2001,
  pointerEvents: "none" as const,
  transformOrigin: "center center",
};

const flashStyle: React.CSSProperties = {
  position: "fixed",
  left: "50%",
  top: "50%",
  width: "100px",
  height: "2px",
  marginLeft: "-50px",
  marginTop: "-1px",
  background: "linear-gradient(to right, transparent, #00C2FF, white, #00C2FF, transparent)",
  boxShadow: "0 0 30px #00C2FF, 0 0 60px rgba(0, 194, 255, 0.4)",
  zIndex: 2001,
  pointerEvents: "none" as const,
};

// ─── Component ───────────────────────────────────────────
export default function HoloModal({
  isOpen,
  onClose,
  origin,
  title,
  labelTop = "[ SISTEMA :: ACTIVO ]",
  labelBottom = "SYS.VER 2.6.1",
  maxWidth = "750px",
  children,
}: HoloModalProps) {
  const [isClosing, setIsClosing] = useState(false);

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
    const w = Math.min(parseInt(maxWidth) || 750, typeof window !== "undefined" ? window.innerWidth * 0.95 : 750);
    const h = Math.min(600, typeof window !== "undefined" ? window.innerHeight * 0.8 : 600);
    return getTracerTargets(w, h);
  }, [isOpen, maxWidth]);

  const handleClose = () => {
    if (isClosing) return;
    setIsClosing(true);
    setTimeout(() => {
      onClose(); // parent sets isOpen=false, useEffect resets isClosing
    }, 850);
  };

  const ox = origin?.x ?? 100;
  const oy = origin?.y ?? 200;

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
          {/* ── Opening Tracers ── */}
          {!isClosing && tracerTargets.map((target, i) => {
            const angle = getAngle(ox, oy, target.x, target.y);
            return (
              <motion.div
                key={`tracer-open-${i}`}
                style={tracerStyle}
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

          {/* ── Closing Tracers ── */}
          {isClosing && tracerTargets.map((target, i) => {
            const angle = getAngle(target.x, target.y, ox, oy);
            return (
              <motion.div
                key={`tracer-close-${i}`}
                style={tracerStyle}
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

          {/* ── Opening Flash ── */}
          {!isClosing && (
            <motion.div
              style={flashStyle}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: [0, 3, 0], opacity: [0, 1, 0] }}
              transition={{ duration: 0.4, delay: PANEL_DELAY - 0.05, ease: "easeOut" }}
            />
          )}

          {/* ── Closing Flash ── */}
          {isClosing && (
            <motion.div
              style={flashStyle}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: [0, 3, 0], opacity: [0, 1, 0] }}
              transition={{ duration: 0.35, delay: CLOSE_PANEL_DELAY, ease: "easeOut" }}
            />
          )}

          {/* ═══════════════════════════════════════════════
              MODAL (Bootstrap-style: header / body / footer)
              ═══════════════════════════════════════════════ */}
          <motion.div
            className="holo-modal"
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
            style={{ maxWidth }}
            onClick={(e) => e.stopPropagation()}
            onWheel={(e) => e.stopPropagation()}
          >
            {/* Decorative layers */}
            <div className="holo-grid-overlay" />

            {/* ── HEADER (fixed, never scrolls) ── */}
            <div className="holo-modal-header">
              <div className="holo-header-title-wrap">
                <h2 className="holo-title">{title}</h2>
                <div className="holo-title-bar" style={{ marginBottom: 0, marginTop: "4px" }} />
                <span className="holo-label" style={{ position: "static", display: "block", marginTop: "4px" }}>{labelTop}</span>
              </div>
              <button className="holo-close-btn" onClick={handleClose} aria-label="Cerrar">
                <X size={18} />
              </button>
            </div>

            {/* ── BODY (scrolls when content overflows) ── */}
            <motion.div
              className="holo-modal-body"
              initial={{ opacity: 0 }}
              animate={{ opacity: isClosing ? 0 : 1 }}
              transition={isClosing
                ? { duration: CLOSE_CONTENT_DUR }
                : { delay: CONTENT_DELAY, duration: 0.5 }
              }
            >
              {children}
            </motion.div>

            {/* ── FOOTER (fixed, never scrolls) ── */}
            <div className="holo-modal-footer">
              <span className="holo-label" style={{ position: "static" }}>{labelBottom}</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
