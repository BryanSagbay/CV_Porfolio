import React, { useState, useEffect } from 'react';
import { useArticles } from '../ArticleContext/ArticleContext';
import './ArticleDetail.css';

const ArticleDetail: React.FC = () => {
  const { selectedArticle } = useArticles();
  const [animating, setAnimating] = useState(false);
  const [displayedArticle, setDisplayedArticle] = useState(selectedArticle);

  useEffect(() => {
    if (selectedArticle && (!displayedArticle || selectedArticle.id !== displayedArticle.id)) {
      setAnimating(true);

      const timer = setTimeout(() => {
        setDisplayedArticle(selectedArticle);
        setAnimating(false);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [selectedArticle, displayedArticle]);

  if (!displayedArticle) {
    return <div className="article-detail-empty">Selecciona un artículo</div>;
  }

  const { title, date, readTime, isFeatured, link, article } = displayedArticle;

  return (
    <div className={`article-detail ${isFeatured ? 'featured' : ''} ${animating ? 'fade-out' : 'fade-in'}`}>
      <div className="detail-content">
        <div className="date-container">
          <div className="date-line"></div>
          <span className="date">{date}</span>
        </div>

        <h2 className="title">{title}</h2>

        <div className="article-body">
          {article}
        </div>

        <div className="card-footer">
          {link ? (
            <a href={link} target="_blank" rel="noopener noreferrer" className="read-link">
              Read full article <span className="arrow">›</span>
            </a>
          ) : (
            <button className="read-link" disabled>
              Read full article <span className="arrow">›</span>
            </button>
          )}
          {readTime && <span className="read-time">{readTime}</span>}
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;
