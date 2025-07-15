import React from 'react';
import styled from 'styled-components';

const FooterBar = styled.footer`
  width: 100%;
  min-height: 48px;
  background: #191414;
  color: #b3b3b3;
  padding: 0.8rem 2.5rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  border-top: 1px solid #232323;
  gap: 1.5rem;
`;

const FooterLink = styled.a`
  color: #b3b3b3;
  text-decoration: none;
  margin: 0 0.7rem;
  transition: color 0.2s;
  &:hover {
    color: var(--spotify-lite-purple);
  }
`;

export default function Footer() {
  return (
    <FooterBar>
      <FooterLink href="#">Terms</FooterLink>
      <FooterLink href="#">Privacy</FooterLink>
      <FooterLink href="#">Security</FooterLink>
      <FooterLink href="#">Status</FooterLink>
      <FooterLink href="#">Docs</FooterLink>
      <FooterLink href="#">Contact</FooterLink>
      <FooterLink href="#">Manage cookies</FooterLink>
    </FooterBar>
  );
} 