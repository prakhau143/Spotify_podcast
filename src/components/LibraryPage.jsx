import React from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: none; }
`;

const Section = styled.section`
  margin: 2.5rem 0 0 0;
  padding: 0 2rem 6rem 2rem;
  animation: ${fadeIn} 0.8s cubic-bezier(.4,0,.2,1);
`;

const Title = styled.h2`
  font-size: 1.4rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 1.5rem;
`;

const Placeholder = styled.div`
  color: #b3b3b3;
  font-size: 1.1rem;
`;

export default function LibraryPage() {
  return (
    <Section>
      <Title>Your Library</Title>
      <Placeholder>Sign in to see your saved podcasts and liked episodes. (Coming soon!)</Placeholder>
    </Section>
  );
} 