import React, { useState } from 'react';
import type { TabItem } from '../../type/types';
import VerticalNavbar from '../Navbar/Navbar';
import './Layout.css';

interface LayoutProps {
  tabItems: TabItem[];
  defaultActiveTab: string;
}

const Layout: React.FC<LayoutProps> = ({ tabItems, defaultActiveTab }) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleTabChange = (id: string) => {
    setActiveTab(id);
    setIsMenuOpen(false); // cerrar menú en mobile
  };

  return (
    <div className="layout">
      {/* Botón de menú solo visible en mobile */}
      <button className="hamburger" onClick={toggleMenu} aria-label="Toggle menu">
        ☰
      </button>

      {/* Navbar (se adapta según pantalla) */}
      <div className={`sidebar ${isMenuOpen ? 'open' : ''}`}>
        <VerticalNavbar
          items={tabItems}
          activeTabId={activeTab}
          onTabChange={handleTabChange}
        />
      </div>

      {/* Contenido principal */}
      <main className="main-content">
        {tabItems.find((item) => item.id === activeTab)?.content}
      </main>
    </div>
  );
};

export default Layout;
