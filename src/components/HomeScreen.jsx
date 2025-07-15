import React from 'react';
import styled from 'styled-components';

const Hero = styled.section`
  background: linear-gradient(90deg, #1db954 0%, #191414 100%);
  padding: 3rem 2rem 2rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 0 0 32px 32px;
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
  transition: background 0.2s, color 0.2s;
  &:hover {
    background: #1db954;
    color: #fff;
  }
`;

const Section = styled.section`
  margin: 2.5rem 0 0 0;
  padding: 0 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.4rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 1rem;
`;

const PodcastRow = styled.div`
  display: flex;
  gap: 1.5rem;
  overflow-x: auto;
`;

const PodcastCard = styled.div`
  background: #232323;
  border-radius: 18px;
  min-width: 220px;
  max-width: 220px;
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-shadow: 0 2px 8px 0 rgba(0,0,0,0.08);
`;

const PodcastCover = styled.div`
  width: 100%;
  height: 120px;
  background: #444;
  border-radius: 12px;
  margin-bottom: 1rem;
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
`;

const podcasts = [
  { title: 'The Daily Drive', meta: 'News · 30 min', cover: '' },
  { title: 'Laugh Out Loud', meta: 'Comedy · 45 min', cover: '' },
  { title: 'Tech Talk', meta: 'Technology · 50 min', cover: '' },
  { title: 'Mindful Moments', meta: 'Wellness · 25 min', cover: '' },
  { title: 'History Unplugged', meta: 'History · 40 min', cover: '' },
];

export default function HomeScreen() {
  return (
    <>
      <Hero>
        <HeroTitle>Discover Your Next Favorite Podcast</HeroTitle>
        <HeroSubtitle>Personalized picks, trending shows, and more—just for you.</HeroSubtitle>
        <CTAButton>Start Listening</CTAButton>
      </Hero>
      <Section>
        <SectionTitle>Recommended For You</SectionTitle>
        <PodcastRow>
          {podcasts.map((p, i) => (
            <PodcastCard key={i}>
              <PodcastCover />
              <PodcastTitle>{p.title}</PodcastTitle>
              <PodcastMeta>{p.meta}</PodcastMeta>
            </PodcastCard>
          ))}
        </PodcastRow>
      </Section>
    </>
  );
} 