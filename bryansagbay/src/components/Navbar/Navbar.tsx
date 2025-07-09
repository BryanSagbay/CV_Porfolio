import React, { useEffect, useState } from 'react';
import { TabItem } from '../../type/types';
import './Navbar.css';
import NavItem from '../NavItem/NavItem';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa'
import { AiOutlineX } from "react-icons/ai";
;

interface VerticalNavbarProps {
  items: TabItem[];
  activeTabId: string;
  onTabChange: (tabId: string) => void;
}

const VerticalNavbar: React.FC<VerticalNavbarProps> = ({
  items,
  activeTabId,
  onTabChange
}) => {
  const [animationPlayed, setAnimationPlayed] = useState(false);

  useEffect(() => {
    if (activeTabId !== 'home' && !animationPlayed) {
      setAnimationPlayed(true);
    }
  }, [activeTabId, animationPlayed]);

  return (
    <nav className="vertical-navbar">
      <div className="nav-items">
        {items.map((item) => (
          <NavItem
            key={item.id}
            id={item.id}
            label={item.label}
            isActive={activeTabId === item.id}
            onClick={() => onTabChange(item.id)}
          />
        ))}
      </div>

      {activeTabId !== 'home' && (
        <div className="social-icons">
          <a className={animationPlayed ? 'bounce-in' : ''} href="https://github.com/BryanSagbay" target="_blank" rel="noopener noreferrer" title="GitHub"><FaGithub /></a>
          <a className={animationPlayed ? 'bounce-in' : ''} href="https://www.linkedin.com/in/bryan-sagbay-1b9912267/" target="_blank" rel="noopener noreferrer" title="LinkedIn"><FaLinkedin /></a>
          <a className={animationPlayed ? 'bounce-in' : ''} href="https://www.instagram.com/brian.sagbay" target="_blank" rel="noopener noreferrer" title="Enviar mensaje"><FaInstagram /></a>
          <a className={animationPlayed ? 'bounce-in' : ''} href="https://x.com/sagbay15130" target="_blank" rel="noopener noreferrer"title="Enviar mensaje"><AiOutlineX /></a>
        </div>
      )}
    </nav>
  );
};

export default VerticalNavbar;
