import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { usePlayer } from '../App';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: none; }
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

const CuratedRow = styled.div`
  display: flex;
  gap: 1.5rem;
  overflow-x: auto;
  animation: ${fadeIn} 0.8s cubic-bezier(.4,0,.2,1);
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
  transition: box-shadow 0.2s, transform 0.2s;
  animation: ${fadeIn} 0.7s cubic-bezier(.4,0,.2,1);
  &:hover {
    box-shadow: 0 6px 24px 0 rgba(30,185,84,0.18);
    transform: translateY(-6px) scale(1.03);
  }
`;

const PodcastCover = styled.img`
  width: 100%;
  height: 120px;
  object-fit: cover;
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

const ExpandButton = styled.button`
  background: #1db954;
  color: #fff;
  border: none;
  border-radius: 18px;
  padding: 0.5rem 1.1rem;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 1rem;
  transition: background 0.2s, color 0.2s, transform 0.2s;
  &:hover {
    background: #fff;
    color: #1db954;
    transform: scale(1.06);
  }
`;

// Demo data for curated sections
const demoSections = [
  {
    title: 'Because You Liked',
    color: '#1db954',
    podcasts: Array.from({length: 8}).map((_, i) => ({
      title: `Recommended Podcast #${i+1}`,
      meta: 'Personalized · 30 min',
      cover: `https://picsum.photos/seed/liked${i}/400/200`
    }))
  },
  {
    title: 'Trending Topics',
    color: '#ff5e3a',
    podcasts: Array.from({length: 7}).map((_, i) => ({
      title: `Trending Podcast #${i+1}`,
      meta: 'Trending · 40 min',
      cover: `https://picsum.photos/seed/trending${i}/400/200`
    }))
  },
  {
    title: 'Quick 5-min Episodes',
    color: '#f7b731',
    podcasts: Array.from({length: 6}).map((_, i) => ({
      title: `Quick Podcast #${i+1}`,
      meta: 'Short · 5 min',
      cover: `https://picsum.photos/seed/quick${i}/400/200`
    }))
  },
  {
    title: 'New This Week',
    color: '#3867d6',
    podcasts: Array.from({length: 9}).map((_, i) => ({
      title: `New Podcast #${i+1}`,
      meta: 'New · 25 min',
      cover: `https://picsum.photos/seed/new${i}/400/200`
    }))
  },
  {
    title: 'Podcasts by Mood',
    color: '#8854d0',
    podcasts: Array.from({length: 10}).map((_, i) => ({
      title: `Mood Podcast #${i+1}`,
      meta: 'Mood · 35 min',
      cover: `https://picsum.photos/seed/mood${i}/400/200`
    }))
  },
];

export default function PodcastHub() {
  return (
    <>
      {demoSections.map((section, idx) => (
        <Section key={section.title} style={{background:section.color+"10", borderRadius:24, marginBottom:32}}>
          <SectionTitle style={{color:section.color}}>{section.title}</SectionTitle>
          <CuratedRow>
            {section.podcasts.map((p, i) => (
              <PodcastCard key={i}>
                <PodcastCover src={p.cover} alt={p.title} />
                <PodcastTitle>{p.title}</PodcastTitle>
                <PodcastMeta>{p.meta}</PodcastMeta>
              </PodcastCard>
            ))}
          </CuratedRow>
        </Section>
      ))}
    </>
  );
} 