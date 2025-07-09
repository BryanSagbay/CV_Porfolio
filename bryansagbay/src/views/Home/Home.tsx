import { useEffect, useRef, useState } from 'react';
import './Home.css';
import { FaGithub, FaLinkedin, FaInstagram, FaDownload } from 'react-icons/fa';
import { AiOutlineX } from "react-icons/ai";
import CursorLineal from '../../components/Cursor/CursorLineal';
import { HomeData } from '../../type/Home';
import api from '../../services/Portfolio';
import { Typewriter } from 'react-simple-typewriter';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<HomeData | null>(null);

  useEffect(() => {
    api.get<HomeData[]>('/home')
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setData(res.data[0]);
        }
      })
      .catch((err) => console.error('Error al obtener datos del backend:', err));
  }, []);

  // Función para crear partículas
  const createParticles = () => {
    if (!containerRef.current) return;
    
    const bg = containerRef.current.querySelector('.background-layer');
    if (!bg) return;
    
    // Crear nuevo contenedor de partículas si no existe
    let particlesContainer = bg.querySelector('.particles-container');
    if (!particlesContainer) {
      particlesContainer = document.createElement('div');
      particlesContainer.className = 'particles-container';
      bg.appendChild(particlesContainer);
    }
    
    // Número de partículas a crear en cada ciclo
    const particlesToCreate = 5;
    
    for (let i = 0; i < particlesToCreate; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Posicionar aleatoriamente
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      
      // Asignar dirección de movimiento aleatoria
      const moveX = (Math.random() * 200 - 100);
      const moveY = (Math.random() * 200 - 100);
      
      // Inicia con opacidad 0
      particle.style.opacity = '0';
      
      particle.style.setProperty('--moveX', `${moveX}px`);
      particle.style.setProperty('--moveY', `${moveY}px`);
      
      // Duración aleatoria de la animación entre 8 y 15 segundos
      const duration = 8 + Math.random() * 7;
      particle.style.animationDuration = `${duration}s`;
      
      // Delay aleatorio para que no aparezcan todas a la vez
      particle.style.animationDelay = `${Math.random() * 1}s`;
      
      particlesContainer.appendChild(particle);
      
      // Primero hacemos un fade in suave
      setTimeout(() => {
        particle.style.transition = 'opacity 1.5s ease-in';
        particle.style.opacity = '1';
      }, 50);
      
      // Fade out antes de eliminar para un efecto suave
      setTimeout(() => {
        if (particlesContainer && particle && particlesContainer.contains(particle)) {
          particle.style.transition = 'opacity 4s ease-out';
          particle.style.opacity = '0';
          
          // Eliminar después del fade out
          setTimeout(() => {
            if (particlesContainer && particle && particlesContainer.contains(particle)) {
              particlesContainer.removeChild(particle);
            }
          }, 2000);
        }
      }, duration * 1000 - 2000); // Comenzar el fade out 2 segundos antes de terminar la animación
    }
  };

  // Crear partículas periódicamente
  useEffect(() => {
    // Crear partículas iniciales
    createParticles();
    
    // Crear nuevas partículas cada cierto tiempo
    const particleInterval = setInterval(() => {
      createParticles();
    }, 1000); 
    
    return () => {
      clearInterval(particleInterval);
    };
  }, []); 

  // Configuración base del fondo
  useEffect(() => {
    if (containerRef.current) {
      const bg = containerRef.current.querySelector('.background-layer');
      if (!bg) return;

      for (let i = 1; i <= 3; i++) {
        const orb = document.createElement('div');
        orb.className = `orb orb-${i}`;
        orb.style.setProperty('--moveX', `${Math.random() * 60 - 30}px`);
        orb.style.setProperty('--moveY', `${Math.random() * 60 - 30}px`);
        bg.appendChild(orb);
      }

      const grid = document.createElement('div');
      grid.className = 'grid-overlay';
      bg.appendChild(grid);
    }
  }, []);

  if (!data) return null;

  return (
    <div className="home-container" ref={containerRef}>
      <CursorLineal />
      <div className="background-layer"></div>

      <div className="content-section">
        <div className="title-section">
          <h1>
            <span className="highlight">
              <Typewriter
                words={[data.title.toUpperCase()]}
                loop={true}
                cursor
                cursorStyle="|"
                typeSpeed={120}
                deleteSpeed={80}
                delaySpeed={2500}
              />
            </span>
            <br />
            ENGINEER
          </h1>
          <p className="intro-text">
            Hi! I'm <span className="highlight">{data.name}.</span> {data.description}
          </p>
          <div className="buttons-horizontal">
            <button className="icon-button">
              <a href={data.github} target="_blank" rel="noopener noreferrer">
                <FaGithub className="button-icon" />
              </a>
            </button>

            <button className="icon-button">
              <a href={data.linkedin} target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="button-icon" />
              </a>
            </button>

            <button className="icon-button">
              <a href={data.instagram} target="_blank" rel="noopener noreferrer">
                <FaInstagram className="button-icon" />
              </a>
            </button>

            <button className="icon-button">
              <a href={data.x} target="_blank" rel="noopener noreferrer">
                <AiOutlineX className="button-icon" />
              </a>
            </button>

            <button className="icon-button">
              <a
                href={data.cv}
                target="_blank"
                rel="noopener noreferrer"
                download="Bryan_Sagbay_CV.pdf"
              >
                <FaDownload className="button-icon" />
              </a>
            </button>

            <button
              className="hire-button"
              onClick={() => {
                window.location.href = `mailto:${data.correo}?subject=I want to hire you&body=Hi ${data.name.split(" ")[0]}, I saw your portfolio and I'd like to connect.`;
              }}
            >
              HIRE ME
            </button>
          </div>
        </div>

        <div className="stats-section">
          <div className="stat-item">
            <span className="stat-number">{data.year_experience}+</span>
            <span className="stat-label">Years of Experience</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{data.completed_projects}+</span>
            <span className="stat-label">Completed Projects</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{data.satisfied_clients}+</span>
            <span className="stat-label">Satisfied Clients</span>
          </div>
        </div>
      </div>
    </div>
  );
}