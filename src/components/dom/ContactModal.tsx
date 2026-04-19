"use client";

import { useState, useEffect } from "react";
import { Send, Mail, Phone } from "lucide-react";
import { FaGithub, FaInstagram } from "react-icons/fa";
import HoloModal from "./HoloModal";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  origin?: { x: number; y: number } | null;
}

export default function ContactModal({ isOpen, onClose, origin }: ContactModalProps) {
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
          _honey: ""
        })
      });

      if (response.ok) {
        setIsSuccess(true);
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

  // Reset success state when modal closes
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => setIsSuccess(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <HoloModal
      isOpen={isOpen}
      onClose={onClose}
      origin={origin}
      title="Contáctame"
      labelTop="[ CANAL :: ABIERTO ]"
      labelBottom="FREQ 47.3 GHz"
      maxWidth="600px"
    >
      <p className="holo-text" style={{ marginBottom: "24px" }}>
        ¿Tienes un proyecto en mente? Hablemos sobre cómo puedo ayudarte a hacerlo realidad.
      </p>

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

        {error && <p style={{ color: "#FF4D4D", fontSize: "14px" }}>{error}</p>}

        <button type="submit" disabled={isSubmitting} className="holo-submit-btn">
          {isSubmitting ? "Enviando..." : <>Enviar Mensaje <Send size={16} /></>}
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
    </HoloModal>
  );
}
