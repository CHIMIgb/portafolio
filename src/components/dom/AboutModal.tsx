"use client";

import {
  SiPhp, SiLaravel, SiNodedotjs, SiNestjs, SiExpress, SiDjango,
  SiReact, SiNextdotjs, SiAngular, SiVuedotjs, SiTailwindcss, SiJavascript, SiHtml5, SiCss,
  SiPostgresql, SiMysql,
  SiPython, SiScikitlearn,
  SiArduino, SiCplusplus,
  SiGit, SiGithub, SiDocker, SiPostman
} from "react-icons/si";
import HoloModal from "./HoloModal";

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  origin?: { x: number; y: number } | null;
}

const SkillIcon = ({ icon: Icon, name, color }: { icon: any; name: string; color?: string }) => (
  <div className="holo-skill-item">
    <Icon size={28} color={color || "#00C2FF"} />
    <span>{name}</span>
  </div>
);

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="holo-section-title">{children}</h3>
);

const skillGrid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(95px, 1fr))",
  gap: "12px",
};

export default function AboutModal({ isOpen, onClose, origin }: AboutModalProps) {
  return (
    <HoloModal
      isOpen={isOpen}
      onClose={onClose}
      origin={origin}
      title="Sobre mí"
      labelTop="[ PERFIL :: ACTIVO ]"
      labelBottom="SYS.VER 2.6.1"
    >
      <section style={{ marginBottom: "50px" }}>
        <p className="holo-text">
          Identificación: <strong>CHIMI</strong>. <br /><br />
          Recién egresado, con proyectos corriendo en paralelo desde antes de terminar la carrera. Me especializo en <strong>Backend</strong>: diseño APIs REST y trabajo principalmente con <strong>Python (FastAPI / Django)</strong>, <strong>PHP Flight</strong> y <strong>PostgreSQL</strong>.
        </p>
        <p className="holo-text">
          Lo que me importa al construir un sistema es que el núcleo aguante. Una API bien diseñada debería poder conectar cualquier frontend sin que haya que tocar lo de adentro. Eso es lo que busco cada vez.
        </p>
        <p className="holo-text">
          Dependiendo del proyecto, trabajo solo o en equipo — no tengo preferencia fija, me adapto a lo que pide la situación. A futuro quiero profundizar en arquitectura de APIs y análisis de datos. Ahí es donde quiero llegar.
        </p>
        <p className="holo-text">
          Fuera del código juego videojuegos, sobre todo los que tienen buena historia. <strong>Halo: Reach</strong> es el que más me marcó — no por la acción sino por lo que cuenta.
        </p>

        <div style={{ marginTop: "24px" }}>
          <a href="/CV/CV.pdf" download="CV_Backend_CHIMI.pdf" className="holo-submit-btn" style={{ textDecoration: "none", display: "inline-flex", width: "auto", padding: "10px 24px" }}>
            [ DESCARGAR CV ]
          </a>
        </div>
      </section>

      <section>
        <h2 className="holo-title" style={{ fontSize: "24px" }}>Stacks Tecnológicos</h2>
        <div className="holo-title-bar" />

        <SectionTitle>Backend</SectionTitle>
        <div style={skillGrid}>
          <SkillIcon icon={SiPhp} name="PHP" color="#777BB4" />
          <SkillIcon icon={SiLaravel} name="Laravel" color="#FF2D20" />
          <SkillIcon icon={SiNodedotjs} name="Node.js" color="#339933" />
          <SkillIcon icon={SiNestjs} name="NestJS" color="#E0234E" />
          <SkillIcon icon={SiExpress} name="Express" color="#ffffff" />
          <SkillIcon icon={SiDjango} name="Django" color="#092E20" />
        </div>

        <SectionTitle>Frontend</SectionTitle>
        <div style={skillGrid}>
          <SkillIcon icon={SiReact} name="React" color="#61DAFB" />
          <SkillIcon icon={SiNextdotjs} name="Next.js" color="#ffffff" />
          <SkillIcon icon={SiAngular} name="Angular" color="#DD0031" />
          <SkillIcon icon={SiVuedotjs} name="Vue" color="#4FC08D" />
          <SkillIcon icon={SiTailwindcss} name="Tailwind" color="#06B6D4" />
          <SkillIcon icon={SiJavascript} name="JavaScript" color="#F7DF1E" />
          <SkillIcon icon={SiHtml5} name="HTML5" color="#E34F26" />
          <SkillIcon icon={SiCss} name="CSS" color="#1572B6" />
        </div>

        <SectionTitle>Bases de datos</SectionTitle>
        <div style={skillGrid}>
          <SkillIcon icon={SiPostgresql} name="PostgreSQL" color="#4169E1" />
          <SkillIcon icon={SiMysql} name="MySQL" color="#4479A1" />
        </div>

        <SectionTitle>Data & Machine Learning</SectionTitle>
        <div style={skillGrid}>
          <SkillIcon icon={SiPython} name="Python" color="#3776AB" />
          <SkillIcon icon={SiScikitlearn} name="Scikit-Learn" color="#F7931E" />
        </div>

        <SectionTitle>IoT & Hardware</SectionTitle>
        <div style={skillGrid}>
          <SkillIcon icon={SiArduino} name="Arduino" color="#00979D" />
          <SkillIcon icon={SiCplusplus} name="C++" color="#00599C" />
        </div>

        <SectionTitle>Herramientas</SectionTitle>
        <div style={skillGrid}>
          <SkillIcon icon={SiGit} name="Git" color="#F05032" />
          <SkillIcon icon={SiGithub} name="GitHub" color="#ffffff" />
          <SkillIcon icon={SiDocker} name="Docker" color="#2496ED" />
          <SkillIcon icon={SiPostman} name="Postman" color="#FF6C37" />
        </div>
      </section>
    </HoloModal>
  );
}
