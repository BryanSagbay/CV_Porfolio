import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Article } from '../../type/Articulos';

interface ArticleContextType {
  articles: Article[];
  selectedArticle: Article | null;
  selectArticle: (id: string) => void;
}

const ArticleContext = createContext<ArticleContextType | undefined>(undefined);

export const useArticles = () => {
  const context = useContext(ArticleContext);
  if (!context) {
    throw new Error('useArticles must be used within an ArticleProvider');
  }
  return context;
};

interface ArticleProviderProps {
  children: ReactNode;
  initialArticles: Article[];
}

export const ArticleProvider: React.FC<ArticleProviderProps> = ({ 
  children, 
  initialArticles 
}) => {
  const [articles] = useState<Article[]>(initialArticles);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(
    initialArticles.find(article => article.isFeatured) || initialArticles[0] || null
  );

  const selectArticle = (id: string) => {
    const article = articles.find(a => a.id === id);
    if (article) {
      setSelectedArticle(article);
    }
  };

  return (
    <ArticleContext.Provider value={{ articles, selectedArticle, selectArticle }}>
      {children}
    </ArticleContext.Provider>
  );
};