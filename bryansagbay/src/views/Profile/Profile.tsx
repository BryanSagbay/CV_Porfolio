import React, { useEffect, useRef, useState, useCallback } from 'react';
import './Profile.css';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaReact, FaNodeJs, FaPython, FaCode, FaAngular, FaJava, FaDocker,
  FaBootstrap, FaHtml5, FaGithub, FaChevronLeft, FaChevronRight
} from 'react-icons/fa';
import {
  SiTypescript, SiJavascript, SiTailwindcss, SiPhp, SiMongodb
} from 'react-icons/si';
import { MdVerified } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosCall, IoMdMail } from "react-icons/io";
import { BiLogoPostgresql } from "react-icons/bi";
import { DiRedis } from "react-icons/di";
import { VscAzure } from "react-icons/vsc";
import { FcLinux } from "react-icons/fc";
import api from '../../services/Portfolio';
import { ExperienceData } from '../../type/Experience';
import { AboutData } from '../../type/About';

const PortfolioLayout: React.FC = () => {
  const firstRowRef = useRef<HTMLDivElement>(null);
  const secondRowRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);
  const [currentExperienceIndex, setCurrentExperienceIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const [experiences, setExperiences] = useState<ExperienceData[]>([]);
  const [currentTagline, setCurrentTagline] = useState(0);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [aboutRes, expRes] = await Promise.all([
          api.get<AboutData[]>('/about'),
          api.get<ExperienceData[]>('/experience')
        ]);

        if (aboutRes.data.length) setAboutData(aboutRes.data[0]);
        setExperiences(expRes.data);
      } catch (err) {
        console.error("Error al cargar datos desde la API:", err);
      }
    };

    fetchData();
  }, []);

  const taglines = aboutData?.phrases || [
    "Software Engineer.",
    "Front End Developer.",
    "Creating with code, driven by passion."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTagline((prev) => (prev + 1) % taglines.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [taglines.length]);

  const techStackRow1 = [
    { name: 'Java', icon: <FaJava size={28} color="#007396" /> },
    { name: 'TypeScript', icon: <SiTypescript size={28} color="#3178C6" /> },
    { name: 'JavaScript', icon: <SiJavascript size={28} color="#F7DF1E" /> },
    { name: 'Python', icon: <FaPython size={28} color="#3776AB" /> },
    { name: 'Node.js', icon: <FaNodeJs size={28} color="#339933" /> },
    { name: 'PHP', icon: <SiPhp size={28} color="#777BB4" /> },
    { name: 'React', icon: <FaReact size={28} color="#61DAFB" /> },
    { name: 'Angular', icon: <FaAngular size={28} color="#DD0031" /> }
  ];

  const techStackRow2 = [
    { name: 'Git', icon: <FaGithub size={28} color="#F05032" /> },
    { name: 'Tailwind CSS', icon: <SiTailwindcss size={28} color="#38BDF8" /> },
    { name: 'Bootstrap', icon: <FaBootstrap size={28} color="#7952B3" /> },
    { name: 'HTML5', icon: <FaHtml5 size={28} color="#E34F26" /> },
    { name: 'Docker', icon: <FaDocker size={28} color="#2496ED" /> },
    { name: 'MongoDB', icon: <SiMongodb size={28} color="#47A248" /> },
    { name: 'PostgreSQL', icon: <BiLogoPostgresql size={28} color="#336791" /> },
    { name: 'Redis', icon: <DiRedis size={28} color="#DC382D" /> },
    { name: 'Linux', icon: <FcLinux size={28} /> },
    { name: 'Azure', icon: <VscAzure size={28} color="#2496ED" /> }
  ];

  // Initialize tech stack animations - keep these running all the time
  useEffect(() => {
    if (firstRowRef.current && secondRowRef.current) {
      firstRowRef.current.animate([
        { transform: 'translateX(0)' },
        { transform: 'translateX(-50%)' }
      ], { duration: 30000, iterations: Infinity });

      secondRowRef.current.animate([
        { transform: 'translateX(-50%)' },
        { transform: 'translateX(0)' }
      ], { duration: 30000, iterations: Infinity });
    }
  }, []);

  // Function to start the autoplay timer for carousel
  const startAutoplayTimer = useCallback(() => {
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
    }

    autoplayTimerRef.current = setInterval(() => {
      if (!isCarouselPaused) {
        setDirection(1);
        setCurrentExperienceIndex((prev) => (prev + 1) % experiences.length);
      }
    }, 8000);
  }, [isCarouselPaused, experiences.length]);

  // Set up autoplay timer and scroll listener
  useEffect(() => {
    startAutoplayTimer();

    const rightCol = rightColumnRef.current;
    if (rightCol) {
      const handleScroll = () => {
        setIsCarouselPaused(true);

        // Si existe un temporizador, limpiarlo
        if (autoplayTimerRef.current) {
          clearInterval(autoplayTimerRef.current);
          autoplayTimerRef.current = null;
        }
      };

      rightCol.addEventListener('scroll', handleScroll);
      return () => {
        rightCol.removeEventListener('scroll', handleScroll);
        if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
      };
    }

    return () => {
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
    };
  }, [experiences.length, isCarouselPaused, startAutoplayTimer]);

  // Function to handle carousel navigation and resume animations
  const handleCarouselNavigation = (navigateDirection: number) => {
    // Resume carousel animation
    setIsCarouselPaused(false);
    
    // Set direction and update index
    setDirection(navigateDirection);
    setCurrentExperienceIndex(prev => 
      navigateDirection > 0 
        ? (prev === experiences.length - 1 ? 0 : prev + 1)
        : (prev === 0 ? experiences.length - 1 : prev - 1)
    );
    
    // Restart autoplay timer
    startAutoplayTimer();
  };

  return (
    <motion.div className="portfolio-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <motion.div className="left-column">
        <motion.div className="profile-section">
          <motion.div className="profile-image" whileHover={{ scale: 1.05 }}>
            <img src={aboutData?.photo || 'src/assets/perfil.jpeg'} alt={aboutData?.name || 'Perfil'} />
          </motion.div>
          <div className="profile-info">
            <h1 className="profile-name">
              {aboutData?.name || 'Nombre'}
              <motion.span className="verified-badge" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 500, delay: 0.8 }}>
                <MdVerified size={24} />
              </motion.span>
            </h1>
            <AnimatePresence mode="wait">
              <motion.p key={currentTagline} className="profile-tagline" initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }} transition={{ duration: 0.5 }}>
                {taglines[currentTagline]}
              </motion.p>
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.div className="profile-section">
          <motion.div className="profile-details">
            <motion.div className="detail-item"><FaCode /> <span>{aboutData?.title}</span></motion.div>
            <motion.div className="detail-item"><FaLocationDot /> <span>{aboutData?.location}</span></motion.div>
            <motion.div className="detail-item"><IoIosCall /> <span>{aboutData?.phone}</span></motion.div>
            <motion.div className="detail-item"><IoMdMail /> <span>{aboutData?.mail}</span></motion.div>
          </motion.div>
        </motion.div>

        <motion.div className="about-section">
          <h2>About</h2>
          <motion.div className="about-content">
            <p>{aboutData?.about}</p>
            <p>{aboutData?.description}</p>
          </motion.div>
        </motion.div>

        <motion.div className="stack-section">
          <h2>Stack</h2>
          <div className="tech-stack-container">
            <div className="tech-stack-row" ref={firstRowRef}>
              {[...techStackRow1, ...techStackRow1].map((tech, index) => (
                <motion.div className="tech-item" key={`tech1-${index}`} whileHover={{ y: -8, scale: 1.1 }}>
                  {tech.icon}
                </motion.div>
              ))}
            </div>
            <div className="tech-stack-row reverse" ref={secondRowRef}>
              {[...techStackRow2, ...techStackRow2].map((tech, index) => (
                <motion.div className="tech-item" key={`tech2-${index}`} whileHover={{ y: -8, scale: 1.1 }}>
                  {tech.icon}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>

      <div className="right-column" ref={rightColumnRef}>
        <div className="experience-section">
          <h2>Experience</h2>
          <div className="carousel-container">
            <button 
              className="carousel-button prev floating" 
              onClick={() => handleCarouselNavigation(-1)}
            >
              <FaChevronLeft size={20} />
            </button>

            <div className="carousel-content">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentExperienceIndex}
                  className="experience-item"
                  initial={{ x: direction > 0 ? 100 : -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: direction > 0 ? -100 : 100, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {experiences.length > 0 && (
                    <>
                      <div className="company-header">
                        <h3 className="company-name">
                          {experiences[currentExperienceIndex].company}
                          {experiences[currentExperienceIndex].active && (
                            <span className="status-indicator active pulse"></span>
                          )}
                        </h3>
                      </div>
                      <div className='position-container'>
                        <div className="position-header">
                          <span className="code-icon">ROLE</span>
                          <h4 className="position-title">{experiences[currentExperienceIndex].position}</h4>
                        </div>
                      </div>
                      <div className="position-details">
                        <div className="position-period">
                          <span className="part-time">{experiences[currentExperienceIndex].schedule}
                          </span>
                          <span className="period-dates">{experiences[currentExperienceIndex].period}</span>
                        </div>
                      </div>

                      {experiences[currentExperienceIndex].projects?.map((project, i) => (
                        <div key={i} className="project-container">
                          <h5 className="project-title">
                            Project: <span className="project-name">{project.name}</span>
                          </h5>
                          <ul className="project-details-list">
                              {project.details.map((detail, j) => (
                                <li key={j}>
                                  <span className="bullet">•</span>
                                  <span>{detail}</span>
                                </li>
                              ))}
                            </ul>
                        </div>
                      ))}
                      <div className="technologies-tags">
                        {experiences[currentExperienceIndex].technologies_used.map((tech, i) => (
                          <span className="tech-tag" key={i}>{tech}</span>
                        ))}
                      </div>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <button 
              className="carousel-button next floating" 
              onClick={() => handleCarouselNavigation(1)}
            >
              <FaChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PortfolioLayout;