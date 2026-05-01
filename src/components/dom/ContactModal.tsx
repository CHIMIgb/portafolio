"use client";

import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { Send, Mail, Phone, CheckCircle } from "lucide-react";
import { FaGithub, FaInstagram } from "react-icons/fa";
import HoloModal from "./HoloModal";
import ScrambledText from "../ui/ScrambledText";

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

    console.log("EmailJS Public Key checking:", process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY);

    try {
      const response = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "YOUR_SERVICE_ID",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "YOUR_TEMPLATE_ID",
        {
          from_name: formState.name,
          reply_to: formState.email,
          subject: formState.subject,
          message: formState.message,
          to_name: "CHIMI",
        },
        {
          publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "YOUR_PUBLIC_KEY"
        }
      );

      if (response.status === 200) {
        setIsSuccess(true);
        setFormState({ name: "", email: "", subject: "", message: "" });
      } else {
        throw new Error("Algo salió mal. Por favor intenta de nuevo.");
      }
    } catch (err: any) {
      setError(err.text || "No se pudo enviar el mensaje. Verifica tus llaves de EmailJS.");
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

      {isSuccess ? (
        <div style={{ padding: "40px 0", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
          <CheckCircle size={48} color="#00C2FF" />
          <h3 style={{ color: "#00C2FF", margin: 0, fontSize: "18px", letterSpacing: "2px" }}>
            <ScrambledText text="TRANSMISIÓN EXITOSA" delay={100} duration={3000} />
          </h3>
          <p className="holo-text" style={{ fontSize: "14px", marginTop: "8px" }}>
            He recibido tu mensaje en mi canal seguro. Te responderé lo antes posible.
          </p>
        </div>
      ) : (
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

          {error && <p style={{ color: "#FF4D4D", fontSize: "14px", fontFamily: "monospace" }}>{error}</p>}

          <button type="submit" disabled={isSubmitting} className="holo-submit-btn">
            {isSubmitting ? <ScrambledText text="ENVIANDO DATOS..." delay={0} duration={2000} /> : <>Enviar Mensaje <Send size={16} /></>}
          </button>
        </form>
      )}

      <div className="holo-separator" />

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <div className="holo-contact-info">
          <Mail size={16} />
          <span>chimi.7zip@gmail.com</span>
        </div>
        <div className="holo-contact-info">
          <Phone size={16} />
          <span>+52 323 101 3548</span>
        </div>
        <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
          <a href="https://github.com/CHIMIgb" target="_blank" rel="noopener noreferrer" className="holo-social-link"><FaGithub size={18} /></a>
          <a href="https://www.instagram.com/chimi_gb?igsh=MXg4NmJpZ2I0ejI1dA==" target="_blank" rel="noopener noreferrer" className="holo-social-link"><FaInstagram size={18} /></a>
        </div>
      </div>
    </HoloModal>
  );
}
