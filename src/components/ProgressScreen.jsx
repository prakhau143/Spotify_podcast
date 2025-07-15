import React from 'react';
import styled from 'styled-components';

const Section = styled.section`
  padding: 2.5rem 2rem 0 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.4rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 1.2rem;
`;

const PodcastRow = styled.div`
  display: flex;
  gap: 1.5rem;
  overflow-x: auto;
  margin-bottom: 2.5rem;
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

const continueListening = [
  { title: 'Tech Talk', meta: 'Ep. 3 · 12 min left', cover: '' },
  { title: 'Mindful Moments', meta: 'Ep. 7 · 5 min left', cover: '' },
];

const newEpisodes = [
  { title: 'The Daily Drive', meta: 'Ep. 21 · New', cover: '' },
  { title: 'History Unplugged', meta: 'Ep. 14 · New', cover: '' },
];

export default function ProgressScreen() {
  return (
    <Section>
      <SectionTitle>Continue Listening</SectionTitle>
      <PodcastRow>
        {continueListening.map((p, i) => (
          <PodcastCard key={i}>
            <PodcastCover />
            <PodcastTitle>{p.title}</PodcastTitle>
            <PodcastMeta>{p.meta}</PodcastMeta>
          </PodcastCard>
        ))}
      </PodcastRow>
      <SectionTitle>New Episodes</SectionTitle>
      <PodcastRow>
        {newEpisodes.map((p, i) => (
          <PodcastCard key={i}>
            <PodcastCover />
            <PodcastTitle>{p.title}</PodcastTitle>
            <PodcastMeta>{p.meta}</PodcastMeta>
          </PodcastCard>
        ))}
      </PodcastRow>
    </Section>
  );
} 