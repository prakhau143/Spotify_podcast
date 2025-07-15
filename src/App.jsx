import React, { useState, createContext, useContext } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import PlayerScreen from './components/PlayerScreen';
import HomePage from './components/HomePage';
import PodcastHub from './components/PodcastHub';
import LibraryPage from './components/LibraryPage';
import HeaderBar from './components/HeaderBar';
import Footer from './components/Footer';

const GlobalStyle = createGlobalStyle`
  :root {
    --spotify-green: #1db954;
    --spotify-lite-green: #b2f5b0;
    --spotify-lite-purple: #a259ff;
    --spotify-dark: #181818;
    --spotify-black: #191414;
  }
  html, body, #root {
    margin: 0;
    padding: 0;
    font-family: 'Inter', 'Roboto', Arial, sans-serif;
    background: var(--spotify-dark);
    color: #fff;
    overflow-x: hidden;
    box-sizing: border-box;
  }
  * {
    box-sizing: inherit;
  }
  ::selection {
    background: var(--spotify-lite-purple);
    color: #fff;
  }
`;

const Layout = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Sidebar = styled.nav`
  width: 80px;
  background: linear-gradient(180deg, #191414 0%, #1db954 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 0 1rem 0;
  gap: 2rem;
  box-shadow: 2px 0 16px 0 rgba(0,0,0,0.12);
`;

const SidebarIcon = styled(Link)`
  color: #fff;
  font-size: 2rem;
  margin-bottom: 1.5rem;
  text-decoration: none;
  opacity: 0.7;
  transition: opacity 0.2s, color 0.2s;
  &.active, &:hover {
    color: #1db954;
    opacity: 1;
  }
`;

const SidebarIconWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ActiveBlock = styled.div`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 6px;
  height: 36px;
  border-radius: 6px;
  background: linear-gradient(180deg, var(--spotify-lite-purple) 0%, var(--spotify-lite-green) 100%);
  box-shadow: 0 2px 8px 0 var(--spotify-lite-purple);
  opacity: 1;
  transition: all 0.35s cubic-bezier(.4,0,.2,1);
`;

const MainContent = styled.div`
  flex: 1;
  min-width: 0;
  background: #181818;
  display: flex;
  flex-direction: column;
`;

const PlayerBarWrapper = styled.div`
  position: fixed;
  left: 80px;
  right: 0;
  bottom: 0;
  z-index: 100;
  background: #181818;
  box-shadow: 0 -2px 16px 0 rgba(0,0,0,0.18);
`;

const PastPodcastsSection = styled.div`
  width: 100%;
  padding: 1.2rem 0 0.5rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: none;
`;
const PastPodcastsTitle = styled.div`
  font-size: 0.95rem;
  color: #b3b3b3;
  font-weight: 700;
  margin-bottom: 0.7rem;
  letter-spacing: 0.01em;
`;
const PastPodcastsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  align-items: center;
`;
const PastPodcastAvatar = styled.img`
  width: 44px;
  height: 44px;
  border-radius: 12px;
  object-fit: cover;
  box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
  cursor: pointer;
  transition: transform 0.18s, box-shadow 0.18s;
  &:hover {
    transform: scale(1.08);
    box-shadow: 0 4px 16px 0 var(--spotify-lite-purple);
  }
`;

const SeeAllButton = styled.button`
  margin-top: 0.7rem;
  background: var(--spotify-lite-purple);
  color: #fff;
  border: none;
  border-radius: 12px;
  padding: 0.3rem 1.1rem;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.18s, color 0.18s;
  &:hover {
    background: var(--spotify-lite-green);
    color: var(--spotify-lite-purple);
  }
`;

// Player context for global playback state
const PlayerContext = createContext();
export function usePlayer() { return useContext(PlayerContext); }

export default function App() {
  const [currentShow, setCurrentShow] = useState(null);
  const [currentEpisode, setCurrentEpisode] = useState(null);
  const [subscribed, setSubscribed] = useState({});
  const [liked, setLiked] = useState({});

  // Handlers for subscribe/like/share
  const handleSubscribe = () => {
    if (!currentShow) return;
    setSubscribed(prev => ({ ...prev, [currentShow.id]: !prev[currentShow.id] }));
  };
  const handleLike = () => {
    if (!currentShow) return;
    setLiked(prev => ({ ...prev, [currentShow.id]: !prev[currentShow.id] }));
  };
  const handleShare = () => {
    if (!currentEpisode) return;
    window.open(`https://open.spotify.com/episode/${currentEpisode.id}`, '_blank');
  };

  // Player context value
  const playerValue = {
    currentShow,
    setCurrentShow,
    currentEpisode,
    setCurrentEpisode,
    play: (show, episode) => {
      setCurrentShow(show);
      setCurrentEpisode(episode);
    },
    subscribed,
    liked,
  };

  // Sidebar icons
  const navItems = [
    { to: '/', icon: '🏠', label: 'Home' },
    { to: '/podcasts', icon: '🎙', label: 'Podcasts' },
    { to: '/library', icon: '📚', label: 'Library' },
  ];

  const demoPastPodcasts = [
    { title: 'The Daily Drive', cover: 'https://picsum.photos/seed/past1/100/100' },
    { title: 'Laugh Out Loud', cover: 'https://picsum.photos/seed/past2/100/100' },
    { title: 'Tech Talk', cover: 'https://picsum.photos/seed/past3/100/100' },
    { title: 'Mindful Moments', cover: 'https://picsum.photos/seed/past4/100/100' },
    { title: 'History Unplugged', cover: 'https://picsum.photos/seed/past5/100/100' },
  ];

  function SidebarNav() {
    const location = useLocation();
    const { play } = usePlayer();
    return (
      <Sidebar>
        {navItems.map(item => {
          const isActive = location.pathname === item.to;
          return (
            <SidebarIconWrapper key={item.to}>
              {isActive && <ActiveBlock />}
              <SidebarIcon
                to={item.to}
                className={isActive ? 'active' : ''}
                title={item.label}
                style={{zIndex:2}}
              >
                {item.icon}
              </SidebarIcon>
            </SidebarIconWrapper>
          );
        })}
        <PastPodcastsSection>
          <PastPodcastsTitle>Past Podcasts</PastPodcastsTitle>
          <PastPodcastsList>
            {demoPastPodcasts.slice(0, 5).map((p, i) => (
              <PastPodcastAvatar
                key={i}
                src={p.cover}
                alt={p.title}
                title={p.title}
                onClick={() => play(p, { id: 'demo-ep', name: p.title + ' Ep 1', duration_ms: 1800000, release_date: '2024-07-01', description: 'Demo episode.' })}
              />
            ))}
          </PastPodcastsList>
          <SeeAllButton>See All</SeeAllButton>
        </PastPodcastsSection>
      </Sidebar>
    );
  }

  function FooterConditional() {
    const location = useLocation();
    if (location.pathname === '/library') return null;
    return <Footer />;
  }

  return (
    <PlayerContext.Provider value={playerValue}>
      <GlobalStyle />
      <Router>
        <HeaderBar />
        <Layout>
          <SidebarNav />
          <MainContent>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/podcasts" element={<PodcastHub />} />
              <Route path="/library" element={<LibraryPage />} />
            </Routes>
            <FooterConditional />
          </MainContent>
          <PlayerBarWrapper>
            <PlayerScreen
              show={currentShow}
              episode={currentEpisode}
              onSubscribe={handleSubscribe}
              onLike={handleLike}
              onShare={handleShare}
              isSubscribed={currentShow ? !!subscribed[currentShow.id] : false}
              isLiked={currentShow ? !!liked[currentShow.id] : false}
            />
          </PlayerBarWrapper>
        </Layout>
      </Router>
    </PlayerContext.Provider>
  );
} 