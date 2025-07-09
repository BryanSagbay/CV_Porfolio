import React, { useState, useEffect, useRef } from 'react';
import './Projects.css';
import { CiMobile3 } from 'react-icons/ci';
import { SlScreenDesktop } from 'react-icons/sl';
import ProyectoCardModern from '../../components/CardModern/CardModern';
import { Proyecto } from '../../type/Proyectos';
import api from '../../services/Portfolio';

interface ApiProyecto {
  id: number;
  type: string;
  title: string;
  description: string;
  imagen: string;
  indice: number;
  link: string;
}

const ProyectosScroll: React.FC = () => {
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [tipoActivo, setTipoActivo] = useState<'pc' | 'movil' | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollBar, setShowScrollBar] = useState(true);

  const sectionRefs = useRef<Array<HTMLDivElement | null>>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastSectionRef = useRef<HTMLDivElement | null>(null);
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ✅ Función segura para construir URL de imagen desde env
  const getFullImageUrl = (path: string) => {
    const base = import.meta.env.VITE_API_IMAGES?.replace(/\/$/, '') || '';
    const finalPath = path.startsWith('/') ? path : `/${path}`;
    return `${base}${finalPath}`;
  };

  // 📡 Fetch desde API
  useEffect(() => {
    const fetchProyectos = async () => {
      try {
        const response = await api.get<ApiProyecto[]>('/projects/');
        const data = response.data;

        const adaptados: Proyecto[] = data.map((item) => ({
          id: item.id,
          tipo: item.type === 'pc' ? 'pc' : 'movil',
          titulo: item.title,
          descripcion: item.description,
          imagenProyecto: getFullImageUrl(item.imagen),
          link: item.link,
        }));

        setProyectos(adaptados);
      } catch (error) {
        console.error('Error al cargar proyectos:', error);
      }
    };

    fetchProyectos();
  }, []);

  useEffect(() => {
    sectionRefs.current = sectionRefs.current.slice(0, proyectos.length);
    while (sectionRefs.current.length < proyectos.length) {
      sectionRefs.current.push(null);
    }
  }, [proyectos]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting);
        if (visibleEntry) {
          const index = Number((visibleEntry.target as HTMLDivElement).dataset.index);
          const tipo = proyectos[index]?.tipo;
          if (tipo) setTipoActivo(tipo);
        }
      },
      {
        root: containerRef.current,
        rootMargin: '0px',
        threshold: 0.6,
      }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [proyectos]);

  const handleScroll = () => {
    const el = containerRef.current;
    if (!el) return;

    const scrollTop = el.scrollTop;
    const scrollHeight = el.scrollHeight - el.clientHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    setScrollProgress(progress);

    setShowScrollBar(true);
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);

    hideTimeoutRef.current = setTimeout(() => {
      setShowScrollBar(false);
    }, 2000);
  };

  return (
    <div className="proyectos-wrapper">
      <div className={`scroll-indicador ${!showScrollBar ? 'oculto' : ''}`}>
        <div className="agua" style={{ height: `${scrollProgress}%` }} />
      </div>

      <div
        className="proyectos-container"
        ref={containerRef}
        onScroll={handleScroll}
      >
        <div className="iconos-dispositivo">
          <span
            className={`icono-pc ${tipoActivo === 'pc' ? 'activo' : ''}`}
            title="Proyectos de escritorio"
          >
            <SlScreenDesktop />
          </span>
          <span
            className={`icono-movil ${tipoActivo === 'movil' ? 'activo' : ''}`}
            title="Proyectos móviles"
          >
            <CiMobile3 />
          </span>
        </div>

        <div className="proyectos-contenido">
          {proyectos.map((proyecto, index) => (
            <div
              key={proyecto.id}
              ref={(el) => {
                sectionRefs.current[index] = el;
                if (index === proyectos.length - 1) {
                  lastSectionRef.current = el;
                }
              }}
              className="proyecto-seccion"
              data-index={index}
            >
              <ProyectoCardModern
                tipo={proyecto.tipo}
                titulo={proyecto.titulo}
                descripcion={proyecto.descripcion}
                imagenProyecto={proyecto.imagenProyecto}
                indice={index}
                link={proyecto.link}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProyectosScroll;
