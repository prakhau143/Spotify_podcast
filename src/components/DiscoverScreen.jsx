import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';

const Section = styled.section`
  padding: 2.5rem 2rem 0 2rem;
`;

const SearchBar = styled.input`
  width: 100%;
  padding: 1rem 1.5rem;
  font-size: 1.1rem;
  border-radius: 32px;
  border: none;
  background: #232323;
  color: #fff;
  margin-bottom: 2rem;
  outline: none;
`;

const Categories = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
`;

const CategoryCard = styled.div`
  background: #1db954;
  color: #fff;
  border-radius: 18px;
  min-width: 140px;
  padding: 1.2rem 1.5rem;
  font-weight: 700;
  font-size: 1.1rem;
  cursor: pointer;
  box-shadow: 0 2px 8px 0 rgba(30,185,84,0.10);
  transition: background 0.2s, color 0.2s, transform 0.2s;
  &:hover {
    background: #fff;
    color: #1db954;
    transform: translateY(-4px) scale(1.04);
  }
`;

const PodcastRow = styled.div`
  display: flex;
  gap: 1.5rem;
  overflow-x: auto;
`;

const PodcastCard = styled.div`
  background: #232323;
  border-radius: 18px;
  min-width: 240px;
  max-width: 240px;
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-shadow: 0 2px 8px 0 rgba(0,0,0,0.08);
  position: relative;
  transition: box-shadow 0.2s, transform 0.2s;
  &:hover {
    box-shadow: 0 6px 24px 0 rgba(30,185,84,0.18);
    transform: translateY(-6px) scale(1.03);
  }
`;

const PodcastCover = styled.img`
  width: 100%;
  height: 140px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 1rem;
  box-shadow: 0 2px 8px 0 rgba(30,185,84,0.10);
`;

const PodcastTitle = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 0.3rem;
`;

const PodcastMeta = styled.div`
  font-size: 0.95rem;
  color: #b3b3b3;
  margin-bottom: 0.7rem;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 0.7rem;
  margin-top: 0.5rem;
`;

const playPulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(30,185,84,0.5); }
  70% { box-shadow: 0 0 0 10px rgba(30,185,84,0); }
  100% { box-shadow: 0 0 0 0 rgba(30,185,84,0); }
`;

const PlayButton = styled.button`
  background: #1db954;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;
  animation: ${playPulse} 1.5s infinite;
  &:hover {
    background: #17a74a;
    transform: scale(1.08);
  }
`;

const SubscribeButton = styled.button`
  background: #fff;
  color: #1db954;
  border: none;
  border-radius: 18px;
  padding: 0.5rem 1.1rem;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s, color 0.2s, transform 0.2s;
  &:hover {
    background: #1db954;
    color: #fff;
    transform: scale(1.06);
  }
`;

const LikeButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.3rem;
  color: ${props => (props.liked ? '#1db954' : '#b3b3b3')};
  transition: color 0.2s, transform 0.2s;
  &:hover {
    color: #1db954;
    transform: scale(1.2) rotate(-10deg);
  }
`;

const categories = [
  'Comedy', 'News', 'Tech', 'Wellness', 'History'
];

const SPOTIFY_TOKEN = '1POdFZRZbvb...qqillRxMr2z'; // Replace with your actual token
const API_URL = `https://api-partner.spotify.com/ads/v2/podcast_shows?q=podcast&market=US`;

export default function DiscoverScreen() {
  const [search, setSearch] = useState('');
  const [podcasts, setPodcasts] = useState([]);
  const [playing, setPlaying] = useState(null); // show id
  const [subscribed, setSubscribed] = useState({});
  const [liked, setLiked] = useState({});

  useEffect(() => {
    async function fetchPodcasts() {
      try {
        const res = await axios.get(API_URL, {
          headers: { Authorization: `Bearer ${SPOTIFY_TOKEN}` }
        });
        // The API response structure may vary; adjust as needed
        const shows = res.data && res.data.podcast_shows ? res.data.podcast_shows.items : [];
        setPodcasts(shows);
      } catch (e) {
        setPodcasts([]);
      }
    }
    fetchPodcasts();
  }, []);

  const handlePlay = (show) => {
    setPlaying(show.id);
    window.open(show.external_urls?.spotify || `https://open.spotify.com/show/${show.id}`, '_blank');
  };

  const handleSubscribe = (show) => {
    setSubscribed(prev => ({ ...prev, [show.id]: !prev[show.id] }));
  };

  const handleLike = (show) => {
    setLiked(prev => ({ ...prev, [show.id]: !prev[show.id] }));
  };

  const filteredPodcasts = podcasts.filter(show =>
    show.name?.toLowerCase().includes(search.toLowerCase()) ||
    show.publisher?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Section>
      <SearchBar
        type="text"
        placeholder="Search podcasts, topics, or hosts..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <Categories>
        {categories.map((cat, i) => (
          <CategoryCard key={i}>{cat}</CategoryCard>
        ))}
      </Categories>
      <h2 style={{color:'#fff', fontWeight:700, fontSize:'1.3rem', marginBottom:'1rem'}}>Trending Podcasts</h2>
      <PodcastRow>
        {filteredPodcasts.length === 0 && (
          <div style={{color:'#b3b3b3', fontSize:'1.1rem'}}>No podcasts found.</div>
        )}
        {filteredPodcasts.map((show, i) => (
          <PodcastCard key={show.id || i}>
            <PodcastCover src={show.images?.[0]?.url || 'https://misc.scdn.co/liked-songs/liked-songs-640.png'} alt={show.name} />
            <PodcastTitle>{show.name}</PodcastTitle>
            <PodcastMeta>{show.publisher}</PodcastMeta>
            <ButtonRow>
              <PlayButton title="Play Podcast" onClick={() => handlePlay(show)}>
                <span role="img" aria-label="play">▶️</span>
              </PlayButton>
              <SubscribeButton onClick={() => handleSubscribe(show)}>
                {subscribed[show.id] ? 'Subscribed' : 'Subscribe'}
              </SubscribeButton>
              <LikeButton liked={liked[show.id]} onClick={() => handleLike(show)} title="Like Podcast">
                <span role="img" aria-label="like">{liked[show.id] ? '💚' : '🤍'}</span>
              </LikeButton>
            </ButtonRow>
          </PodcastCard>
        ))}
      </PodcastRow>
    </Section>
  );
} 