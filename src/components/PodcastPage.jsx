import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';
import { usePlayer } from '../App';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: none; }
`;

const Hero = styled.section`
  background: linear-gradient(90deg, #1db954 0%, #191414 100%);
  padding: 3rem 2rem 2rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 0 0 32px 32px;
  animation: ${fadeIn} 0.8s cubic-bezier(.4,0,.2,1);
`;

const HeroTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  color: #fff;
  margin: 0 0 0.5rem 0;
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  color: #e0ffe0;
  margin: 0 0 1.5rem 0;
`;

const CTAButton = styled.button`
  background: #fff;
  color: #1db954;
  font-weight: 700;
  font-size: 1.1rem;
  border: none;
  border-radius: 24px;
  padding: 0.75rem 2.5rem;
  cursor: pointer;
  box-shadow: 0 2px 16px 0 rgba(30,185,84,0.12);
  transition: background 0.2s, color 0.2s, transform 0.2s;
  &:hover {
    background: #1db954;
    color: #fff;
    transform: scale(1.05);
  }
`;

const Section = styled.section`
  margin: 2.5rem 0 0 0;
  padding: 0 2rem 6rem 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.4rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 1.5rem;
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
  box-shadow: 0 2px 8px 0 rgba(30,185,84,0.10);
  transition: box-shadow 0.2s;
  &:focus {
    box-shadow: 0 4px 16px 0 rgba(30,185,84,0.18);
  }
`;

const CategoryBar = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const CategoryButton = styled.button`
  background: ${props => props.active ? '#1db954' : '#232323'};
  color: ${props => props.active ? '#fff' : '#b3b3b3'};
  border: none;
  border-radius: 18px;
  padding: 0.7rem 1.3rem;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s, color 0.2s, transform 0.2s;
  margin-bottom: 0.5rem;
  &:hover {
    background: #1db954;
    color: #fff;
    transform: scale(1.06);
  }
`;

const PodcastGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 2rem;
  animation: ${fadeIn} 0.8s cubic-bezier(.4,0,.2,1);
`;

const PodcastCard = styled.div`
  background: #232323;
  border-radius: 18px;
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-shadow: 0 2px 8px 0 rgba(0,0,0,0.08);
  transition: box-shadow 0.2s, transform 0.2s;
  animation: ${fadeIn} 0.7s cubic-bezier(.4,0,.2,1);
  &:hover {
    box-shadow: 0 6px 24px 0 rgba(30,185,84,0.18);
    transform: translateY(-6px) scale(1.03);
  }
`;

const PodcastCover = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 1rem;
  box-shadow: 0 2px 8px 0 rgba(30,185,84,0.10);
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.04) rotate(-2deg);
  }
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

const EpisodeList = styled.ul`
  margin: 1rem 0 0 0;
  padding: 0;
  list-style: none;
  width: 100%;
`;

const EpisodeItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.7rem 0;
  border-bottom: 1px solid #232323;
`;

const PlayButton = styled.button`
  background: #1db954;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;
  &:hover {
    background: #17a74a;
    transform: scale(1.08);
  }
`;

const CommunitySection = styled.section`
  margin: 3rem 0 0 0;
  padding: 2rem;
  background: #232323;
  border-radius: 24px;
  animation: ${fadeIn} 1s cubic-bezier(.4,0,.2,1);
`;

const CommunityTitle = styled.h3`
  color: #1db954;
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const categories = [
  'All', 'Comedy', 'News', 'Tech', 'Wellness', 'History', 'Business', 'Music', 'Sports', 'Education', 'Society', 'Health', 'True Crime', 'Kids', 'Science', 'Arts', 'Fiction', 'Religion', 'TV & Film', 'Leisure', 'Games'
];

const demoPodcasts = Array.from({length: 25}).map((_, i) => {
  const cat = categories[1 + (i % (categories.length-1))];
  return {
    id: `demo${i}`,
    name: `${cat} Podcast #${i+1}`,
    publisher: `${cat} Publisher`,
    images: [{ url: `https://picsum.photos/seed/podcast${i}/400/400` }],
    category: cat,
    episodes: Array.from({length: 4 + (i%3)}).map((_, j) => ({
      id: `ep${i}_${j}`,
      name: `Episode ${j+1} of ${cat} Podcast #${i+1}`,
      release_date: `2024-07-${String(10+j).padStart(2,'0')}`,
      duration_ms: 1200000 + (j*600000),
      description: `Description for episode ${j+1} of ${cat} Podcast #${i+1}`
    }))
  };
});

export default function PodcastPage() {
  const { play } = usePlayer();
  const [search, setSearch] = useState('');
  const [activeCat, setActiveCat] = useState('All');
  // Use demoPodcasts for demo; replace with API podcasts if needed
  const podcasts = demoPodcasts;

  const filtered = podcasts.filter(p =>
    (activeCat === 'All' || p.category === activeCat) &&
    (p.name.toLowerCase().includes(search.toLowerCase()) ||
     p.publisher.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <>
      <Hero>
        <HeroTitle>Discover Your Next Favorite Podcast</HeroTitle>
        <HeroSubtitle>Personalized picks, trending shows, and more—just for you.</HeroSubtitle>
        <CTAButton>Start Listening</CTAButton>
      </Hero>
      <Section>
        <SearchBar
          type="text"
          placeholder="Search podcasts, topics, or hosts..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <CategoryBar>
          {categories.map(cat => (
            <CategoryButton
              key={cat}
              active={activeCat === cat}
              onClick={() => setActiveCat(cat)}
            >
              {cat}
            </CategoryButton>
          ))}
        </CategoryBar>
        <SectionTitle>All Podcasts</SectionTitle>
        <PodcastGrid>
          {filtered.map(show => (
            <PodcastCard key={show.id}>
              <PodcastCover src={show.images?.[0]?.url} alt={show.name} />
              <PodcastTitle>{show.name}</PodcastTitle>
              <PodcastMeta>{show.publisher} · {show.category}</PodcastMeta>
              <EpisodeList>
                {show.episodes.map(ep => (
                  <EpisodeItem key={ep.id}>
                    <div style={{flex:1, minWidth:0}}>
                      <div style={{fontWeight:600, color:'#fff', fontSize:'1rem', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{ep.name}</div>
                      <div style={{color:'#b3b3b3', fontSize:'0.92rem'}}>{ep.release_date} · {Math.floor(ep.duration_ms/60000)}:{String(Math.floor((ep.duration_ms%60000)/1000)).padStart(2,'0')}</div>
                    </div>
                    <PlayButton title="Play Episode" onClick={() => play(show, ep)}>
                      <span role="img" aria-label="play">▶️</span>
                    </PlayButton>
                  </EpisodeItem>
                ))}
              </EpisodeList>
            </PodcastCard>
          ))}
        </PodcastGrid>
      </Section>
      <CommunitySection>
        <CommunityTitle>Community</CommunityTitle>
        <div style={{color:'#b3b3b3', fontSize:'1.1rem'}}>Like, comment, and share your favorite podcasts! (Demo UI)</div>
      </CommunitySection>
    </>
  );
} 