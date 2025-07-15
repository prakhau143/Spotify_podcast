import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { usePlayer } from '../App';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: none; }
`;

const Banner = styled.div`
  width: 100%;
  height: 260px;
  background: linear-gradient(90deg, var(--spotify-lite-purple) 0%, var(--spotify-lite-green) 100%);
  border-radius: 0 0 32px 32px;
  display: flex;
  align-items: center;
  padding: 2.5rem 3rem;
  color: #fff;
  animation: ${fadeIn} 0.8s cubic-bezier(.4,0,.2,1);
  position: relative;
  overflow: hidden;
`;

const BannerContent = styled.div`
  z-index: 2;
`;

const BannerTitle = styled.h1`
  font-size: 2.2rem;
  font-weight: 800;
  margin: 0 0 0.5rem 0;
`;

const BannerSubtitle = styled.p`
  font-size: 1.2rem;
  color: #e0ffe0;
  margin: 0 0 1.5rem 0;
`;

const BannerButton = styled.button`
  background: var(--spotify-lite-green);
  color: var(--spotify-lite-purple);
  font-weight: 700;
  font-size: 1.1rem;
  border: none;
  border-radius: 24px;
  padding: 0.75rem 2.5rem;
  cursor: pointer;
  box-shadow: 0 2px 16px 0 rgba(30,185,84,0.12);
  transition: background 0.2s, color 0.2s, transform 0.2s;
  &:hover {
    background: var(--spotify-lite-purple);
    color: #fff;
    transform: scale(1.05);
  }
`;

const ListenAgainSection = styled.section`
  margin: 2.5rem 0 0 0;
  padding: 0 2rem;
  animation: ${fadeIn} 1s cubic-bezier(.4,0,.2,1);
`;

const ListenAgainTitle = styled.h2`
  font-size: 1.3rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 1rem;
`;

const ListenAgainRow = styled.div`
  display: flex;
  gap: 1.5rem;
  overflow-x: auto;
`;

const ListenAgainCard = styled.div`
  background: #232323;
  border-radius: 18px;
  min-width: 220px;
  max-width: 220px;
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-shadow: 0 2px 8px 0 rgba(0,0,0,0.08);
  animation: ${fadeIn} 1.2s cubic-bezier(.4,0,.2,1);
`;

const ListenAgainCover = styled.img`
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 1rem;
`;

const ListenAgainTitleText = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 0.3rem;
`;

const ListenAgainMeta = styled.div`
  font-size: 0.95rem;
  color: #b3b3b3;
`;

// Demo data for banner and listen again
const featuredPodcasts = [
  { title: 'The Daily Drive', meta: 'News · 30 min', cover: 'https://picsum.photos/seed/featured1/400/200' },
  { title: 'Laugh Out Loud', meta: 'Comedy · 45 min', cover: 'https://picsum.photos/seed/featured2/400/200' },
  { title: 'Tech Talk', meta: 'Technology · 50 min', cover: 'https://picsum.photos/seed/featured3/400/200' },
  { title: 'Mindful Moments', meta: 'Wellness · 25 min', cover: 'https://picsum.photos/seed/featured4/400/200' },
  { title: 'History Unplugged', meta: 'History · 40 min', cover: 'https://picsum.photos/seed/featured5/400/200' },
  { title: 'Startup Stories', meta: 'Business · 35 min', cover: 'https://picsum.photos/seed/featured6/400/200' },
  { title: 'Science Weekly', meta: 'Science · 55 min', cover: 'https://picsum.photos/seed/featured7/400/200' },
  { title: 'Book Club', meta: 'Books · 60 min', cover: 'https://picsum.photos/seed/featured8/400/200' },
];
const popularPodcasts = [
  { title: 'Popular: The Daily Drive', meta: 'News · 30 min', cover: 'https://picsum.photos/seed/popular1/400/200' },
  { title: 'Popular: Laugh Out Loud', meta: 'Comedy · 45 min', cover: 'https://picsum.photos/seed/popular2/400/200' },
  { title: 'Popular: Tech Talk', meta: 'Technology · 50 min', cover: 'https://picsum.photos/seed/popular3/400/200' },
  { title: 'Popular: Mindful Moments', meta: 'Wellness · 25 min', cover: 'https://picsum.photos/seed/popular4/400/200' },
  { title: 'Popular: History Unplugged', meta: 'History · 40 min', cover: 'https://picsum.photos/seed/popular5/400/200' },
  { title: 'Popular: Startup Stories', meta: 'Business · 35 min', cover: 'https://picsum.photos/seed/popular6/400/200' },
  { title: 'Popular: Science Weekly', meta: 'Science · 55 min', cover: 'https://picsum.photos/seed/popular7/400/200' },
  { title: 'Popular: Book Club', meta: 'Books · 60 min', cover: 'https://picsum.photos/seed/popular8/400/200' },
];
const indiaTopPodcasts = [
  { title: 'India: The Daily Drive', meta: 'News · 30 min', cover: 'https://picsum.photos/seed/india1/400/200' },
  { title: 'India: Laugh Out Loud', meta: 'Comedy · 45 min', cover: 'https://picsum.photos/seed/india2/400/200' },
  { title: 'India: Tech Talk', meta: 'Technology · 50 min', cover: 'https://picsum.photos/seed/india3/400/200' },
  { title: 'India: Mindful Moments', meta: 'Wellness · 25 min', cover: 'https://picsum.photos/seed/india4/400/200' },
  { title: 'India: History Unplugged', meta: 'History · 40 min', cover: 'https://picsum.photos/seed/india5/400/200' },
  { title: 'India: Startup Stories', meta: 'Business · 35 min', cover: 'https://picsum.photos/seed/india6/400/200' },
  { title: 'India: Science Weekly', meta: 'Science · 55 min', cover: 'https://picsum.photos/seed/india7/400/200' },
  { title: 'India: Book Club', meta: 'Books · 60 min', cover: 'https://picsum.photos/seed/india8/400/200' },
];
const trendingPodcasts = [
  { title: 'Trending: Laugh Out Loud', meta: 'Comedy · 45 min', cover: 'https://picsum.photos/seed/trending1/400/200' },
  { title: 'Trending: Tech Talk', meta: 'Technology · 50 min', cover: 'https://picsum.photos/seed/trending2/400/200' },
  { title: 'Trending: Mindful Moments', meta: 'Wellness · 25 min', cover: 'https://picsum.photos/seed/trending3/400/200' },
  { title: 'Trending: The Daily Drive', meta: 'News · 30 min', cover: 'https://picsum.photos/seed/trending4/400/200' },
  { title: 'Trending: History Unplugged', meta: 'History · 40 min', cover: 'https://picsum.photos/seed/trending5/400/200' },
  { title: 'Trending: Startup Stories', meta: 'Business · 35 min', cover: 'https://picsum.photos/seed/trending6/400/200' },
  { title: 'Trending: Science Weekly', meta: 'Science · 55 min', cover: 'https://picsum.photos/seed/trending7/400/200' },
  { title: 'Trending: Book Club', meta: 'Books · 60 min', cover: 'https://picsum.photos/seed/trending8/400/200' },
];

export default function HomePage() {
  const { play } = usePlayer();
  return (
    <>
      <Banner>
        <BannerContent>
          <BannerTitle>Featured Podcasts</BannerTitle>
          <BannerSubtitle>Handpicked shows to get you started</BannerSubtitle>
        </BannerContent>
        <ListenAgainRow>
          {featuredPodcasts.map((p, i) => (
            <ListenAgainCard key={i} onClick={() => play(p, { id: 'demo-ep', name: p.title + ' Ep 1', duration_ms: 1800000, release_date: '2024-07-01', description: 'Demo episode.' })} style={{cursor:'pointer'}}>
              <ListenAgainCover src={p.cover} alt={p.title} />
              <ListenAgainTitleText>{p.title}</ListenAgainTitleText>
              <ListenAgainMeta>{p.meta}</ListenAgainMeta>
            </ListenAgainCard>
          ))}
        </ListenAgainRow>
      </Banner>
      <ListenAgainSection>
        <ListenAgainTitle>Popular Podcasts</ListenAgainTitle>
        <ListenAgainRow>
          {popularPodcasts.map((p, i) => (
            <ListenAgainCard key={i} onClick={() => play(p, { id: 'demo-ep', name: p.title + ' Ep 1', duration_ms: 1800000, release_date: '2024-07-01', description: 'Demo episode.' })} style={{cursor:'pointer'}}>
              <ListenAgainCover src={p.cover} alt={p.title} />
              <ListenAgainTitleText>{p.title}</ListenAgainTitleText>
              <ListenAgainMeta>{p.meta}</ListenAgainMeta>
            </ListenAgainCard>
          ))}
        </ListenAgainRow>
      </ListenAgainSection>
      <ListenAgainSection>
        <ListenAgainTitle>India's Top Podcasts</ListenAgainTitle>
        <ListenAgainRow>
          {indiaTopPodcasts.map((p, i) => (
            <ListenAgainCard key={i} onClick={() => play(p, { id: 'demo-ep', name: p.title + ' Ep 1', duration_ms: 1800000, release_date: '2024-07-01', description: 'Demo episode.' })} style={{cursor:'pointer'}}>
              <ListenAgainCover src={p.cover} alt={p.title} />
              <ListenAgainTitleText>{p.title}</ListenAgainTitleText>
              <ListenAgainMeta>{p.meta}</ListenAgainMeta>
            </ListenAgainCard>
          ))}
        </ListenAgainRow>
      </ListenAgainSection>
      <ListenAgainSection>
        <ListenAgainTitle>Trending Podcasts</ListenAgainTitle>
        <ListenAgainRow>
          {trendingPodcasts.map((p, i) => (
            <ListenAgainCard key={i} onClick={() => play(p, { id: 'demo-ep', name: p.title + ' Ep 1', duration_ms: 1800000, release_date: '2024-07-01', description: 'Demo episode.' })} style={{cursor:'pointer'}}>
              <ListenAgainCover src={p.cover} alt={p.title} />
              <ListenAgainTitleText>{p.title}</ListenAgainTitleText>
              <ListenAgainMeta>{p.meta}</ListenAgainMeta>
            </ListenAgainCard>
          ))}
        </ListenAgainRow>
      </ListenAgainSection>
    </>
  );
} 