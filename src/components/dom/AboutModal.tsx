"use client";

import HoloModal from "./HoloModal";

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  origin?: { x: number; y: number } | null;
}

const SkillIcon = ({ icon: Icon, name, color, img, link, style, imgHeight }: { icon?: any; name: string; color?: string; img?: string; link?: string; style?: React.CSSProperties; imgHeight?: string }) => {
  const content = (
    <div className="holo-skill-item" style={link ? { height: '100%', width: '100%' } : style}>
      {img ? (
        <img src={img} alt={name} style={{ height: imgHeight || "28px", width: "auto", objectFit: "contain" }} />
      ) : (
        Icon && <Icon size={28} color={color || "#00C2FF"} />
      )}
      <span>{name}</span>
    </div>
  );

  if (link) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", ...style }}>
        {content}
      </a>
    );
  }

  return content;
};

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="holo-section-title">{children}</h3>
);

const skillGrid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(85px, 1fr))",
  gap: "10px",
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
          <SkillIcon img="https://skillicons.dev/icons?i=php&theme=dark" name="PHP" link="https://www.php.net/docs.php" />
          <SkillIcon 
            img="https://img.shields.io/badge/Flight_PHP-777BB4?style=flat-square&logo=php&logoColor=white&labelColor=4F5B93" 
            name="Flight PHP" 
            link="https://docs.flightphp.com/es/v3/" 
            style={{ gridColumn: "span 2" }}
            imgHeight="32px"
          />
          <SkillIcon img="https://skillicons.dev/icons?i=nodejs&theme=dark" name="Node.js" link="https://nodejs.org/en/docs" />
          <SkillIcon img="https://skillicons.dev/icons?i=nestjs&theme=dark" name="NestJS" link="https://nestjs.com/" />
          <SkillIcon img="https://skillicons.dev/icons?i=express&theme=dark" name="Express" link="https://expressjs.com/en/5x/api.html" />
          <SkillIcon img="https://skillicons.dev/icons?i=django&theme=dark" name="Django" link="https://www.djangoproject.com/" />
        </div>

        <SectionTitle>Frontend</SectionTitle>
        <div style={skillGrid}>
          <SkillIcon img="https://skillicons.dev/icons?i=react&theme=dark" name="React" link="https://react.dev/" />
          <SkillIcon img="https://skillicons.dev/icons?i=nextjs&theme=dark" name="Next.js" link="https://nextjs.org/docs" />
          <SkillIcon img="https://skillicons.dev/icons?i=angular&theme=dark" name="Angular" link="https://angular.io/docs" />
          <SkillIcon img="https://skillicons.dev/icons?i=vue&theme=dark" name="Vue" link="https://vuejs.org/" />
          <SkillIcon img="https://skillicons.dev/icons?i=tailwind&theme=dark" name="Tailwind" link="https://tailwindcss.com/docs" />
          <SkillIcon img="https://skillicons.dev/icons?i=js&theme=dark" name="JavaScript" link="https://developer.mozilla.org/en-US/docs/Web/JavaScript" />
          <SkillIcon img="https://skillicons.dev/icons?i=html&theme=dark" name="HTML5" link="https://developer.mozilla.org/en-US/docs/Web/HTML" />
          <SkillIcon img="https://skillicons.dev/icons?i=css&theme=dark" name="CSS" link="https://developer.mozilla.org/en-US/docs/Web/CSS" />
        </div>

        <SectionTitle>Bases de datos</SectionTitle>
        <div style={skillGrid}>
          <SkillIcon img="https://skillicons.dev/icons?i=postgres&theme=dark" name="PostgreSQL" link="https://www.postgresql.org/docs/" />
          <SkillIcon img="https://skillicons.dev/icons?i=mysql&theme=dark" name="MySQL" link="https://dev.mysql.com/doc/" />
        </div>

        <SectionTitle>Data & Machine Learning</SectionTitle>
        <div style={skillGrid}>
          <SkillIcon img="https://skillicons.dev/icons?i=python&theme=dark" name="Python" link="https://docs.python.org/3/" />
          <SkillIcon img="https://skillicons.dev/icons?i=sklearn&theme=dark" name="Scikit-Learn" link="https://scikit-learn.org/stable/" />
        </div>

        <SectionTitle>IoT & Hardware</SectionTitle>
        <div style={skillGrid}>
          <SkillIcon img="https://skillicons.dev/icons?i=arduino&theme=dark" name="Arduino" link="https://www.arduino.cc/" />
          <SkillIcon img="https://skillicons.dev/icons?i=cpp&theme=dark" name="C++" link="https://en.cppreference.com/w/" />
        </div>

        <SectionTitle>Herramientas</SectionTitle>
        <div style={skillGrid}>
          <SkillIcon img="https://skillicons.dev/icons?i=git&theme=dark" name="Git" link="https://git-scm.com/" />
          <SkillIcon img="https://skillicons.dev/icons?i=github&theme=dark" name="GitHub" link="https://github.com/" />
          <SkillIcon img="https://skillicons.dev/icons?i=docker&theme=dark" name="Docker" link="https://www.docker.com/" />
          <SkillIcon img="https://skillicons.dev/icons?i=postman&theme=dark" name="Postman" link="https://www.postman.com/" />
        </div>
      </section>
    </HoloModal>
  );
}
