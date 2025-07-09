import React, { useEffect, useState } from 'react';
import './Research.css';
import LatestArticles from '../../components/LatestArticles/LatestArticles';
import { ArticleProvider } from '../../components/ArticleContext/ArticleContext';
import ArticleDetail from '../../components/ArticleDetail/ArticleDetail';
import { ResearchArticle } from '../../type/Research';
import api from '../../services/Portfolio';

const Research: React.FC = () => {
  const [articles, setArticles] = useState<ResearchArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get<ResearchArticle[]>('/research')
      .then((res) => {
        setArticles(res.data);
      })
      .catch((err) => console.error('Error in obtaining research:', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="research-container">Loading research...</div>;
  }

  return (
    <ArticleProvider initialArticles={articles}>
      <div className="research-container">
        <div className="grid-layout">
          <div className="articles-column">
            <LatestArticles />
          </div>
          <div className="detail-column">
            <div className="detail-column-inner">
              <ArticleDetail />
            </div>
          </div>
        </div>
      </div>
    </ArticleProvider>
  );
};

export default Research;
