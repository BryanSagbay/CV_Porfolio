import React from 'react';
import './ArticleCard.css';
import { ResearchArticle } from '../../type/Research';

interface ResearchCardProps {
  article: ResearchArticle;
  isSelected?: boolean;
  onClick: () => void;
}

const ResearchCard: React.FC<ResearchCardProps> = ({
  article,
  isSelected = false,
  onClick
}) => {
  const { title, description, date, timeread, link, comingsoon } = article;

  return (
    <div
      className={`article-card ${isSelected ? 'selected' : ''} ${comingsoon ? 'coming-soon' : ''}`}
      onClick={!comingsoon ? onClick : undefined}
    >
      <div className="date-container">
        <div className="date-line"></div>
        <span className="date">{comingsoon ? 'Coming soon...' : date}</span>
      </div>

      <h2 className="title">{title || 'Sin título'}</h2>

      {!comingsoon && description && (
        <p className="description">{description}</p>
      )}

      <div className="card-footer">
        {link && !comingsoon ? (
          <a href={link} target="_blank" rel="noopener noreferrer" className="read-link">
            Read more
            <span className="arrow">›</span>
          </a>
        ) : (
          <button className="read-link">
            {comingsoon ? 'Read more' : 'Read'}
            <span className="arrow">›</span>
          </button>
        )}

        {timeread && (
          <span className="read-time">{timeread}</span>
        )}
      </div>
    </div>
  );
};

export default ResearchCard;