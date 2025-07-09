import React from 'react';
import Tilt from 'react-parallax-tilt';
import { motion } from 'framer-motion';
import './CardModern.css';

interface ProyectoCardModernProps {
  tipo: 'pc' | 'movil';
  titulo: string;
  descripcion: string;
  imagenProyecto: string;
  indice: number;
  link: string;
}

const ProyectoCardModern: React.FC<ProyectoCardModernProps> = ({
  tipo,
  titulo,
  descripcion,
  imagenProyecto,
  indice,
  link,
}) => {
  const layoutClass = tipo === 'movil' ? 'fila-invertida' : '';

  // Dirección de entrada: izquierda para 'pc', derecha para 'movil'
  const initialX = tipo === 'pc' ? -100 : 100;

  return (
    <motion.div
      className={`moderno-container ${layoutClass}`}
      initial={{ opacity: 0, x: initialX }}
      whileInView={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: initialX }}
      transition={{ duration: 1, ease: 'easeOut', delay: indice * 0.1 }}
      viewport={{ once: false, amount: 0.2 }}
    >

      <div className="texto">
        <span className="contador">{String(indice + 1).padStart(2, '0')}</span>
        <h2>{titulo}</h2>
        <p>{descripcion}</p>
        <a className="boton-proyecto" href={link} target="_blank" rel="noreferrer">
          Ver proyecto →
        </a>
      </div>

      <Tilt
        tiltMaxAngleX={10}
        tiltMaxAngleY={10}
        perspective={1000}
        scale={1.05}
        transitionSpeed={1500}
        glareEnable={true}
        glareMaxOpacity={0.2}
        glareColor="#ffffff"
        glarePosition="all"
        className="tilt-mockup"
      >
        <div className={`mockup ${tipo}`}>
          <div className="mockup-screen">
            <img
              src={imagenProyecto}
              alt={titulo}
              className="contenido-mockup"
              loading="lazy"
            />
          </div>
        </div>
      </Tilt>
    </motion.div>
  );
};

export default ProyectoCardModern;
