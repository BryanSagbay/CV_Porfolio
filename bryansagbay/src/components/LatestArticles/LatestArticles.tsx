import React, { useRef, useEffect } from 'react';

import './LatestArticles.css';
import ArticleCard from '../ArticleCard/ArticleCard';
import { useArticles } from '../ArticleContext/ArticleContext';

const LatestArticles: React.FC = () => {
  const { articles, selectedArticle, selectArticle } = useArticles();
  const titleRef = useRef<HTMLHeadingElement>(null);
  
  useEffect(() => {
    // Efecto de animación para el título
    const title = titleRef.current;
    if (title) {
      const letters = title.textContent?.split('') || [];
      title.textContent = '';
      
      letters.forEach((letter, i) => {
        const span = document.createElement('span');
        span.textContent = letter;
        span.style.animationDelay = `${i * 0.05}s`;
        span.className = 'animate-letter';
        title.appendChild(span);
      });
    }
  }, []);

  return (
    <div className="latest-articles">
      <h1 ref={titleRef} className="section-title">Articles</h1>
      <div className="articles-scrollable">
        <div className="articles-container">
          {articles.map((article) => (
            <ArticleCard 
              key={article.id} 
              article={article} 
              isSelected={selectedArticle?.id === article.id}
              onClick={() => selectArticle(article.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestArticles;