import React, { useEffect, useState } from 'react';

import Projects from './views/Projects/Projects';
import Profile from './views/Profile/Profile';
import Research from './views/Article/Research';
import Layout from './components/Layout/Layout';
import SplashScreen from './components/SplashScreen/SplashScreen';
import { TabItem } from './type/types';
import Home from './views/Home/Home';

const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowSplash(false);
    }, 1500);

    return () => clearTimeout(timeout);
  }, []);

  const tabItems: TabItem[] = [
    { id: 'home', label: 'Home', content: <Home /> },
    { id: 'projects', label: 'Projects', content: <Projects /> },
    { id: 'research', label: 'Research', content: <Research /> },
    { id: 'about', label: 'About Me', content: <Profile /> }
  ];

  return (
    <>
      {showSplash ? (
        <SplashScreen />
      ) : (
        <>
          <Layout tabItems={tabItems} defaultActiveTab="home" />
        </>
      )}
    </>
  );
};

export default App;
