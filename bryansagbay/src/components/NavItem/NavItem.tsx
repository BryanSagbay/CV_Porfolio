import React from 'react';
import './NavItem.css';

interface NavItemProps {
  id: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({
  id,
  label,
  isActive,
  onClick
}) => {
  return (
    <div 
      className={`nav-item ${isActive ? 'active' : ''}`}
      onClick={onClick}
      data-id={id}
    >
      <span className="rotated-text">{label}</span>
    </div>
  );
};

export default NavItem;
