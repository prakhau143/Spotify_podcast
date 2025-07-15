import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Header = styled.header`
  width: 100%;
  height: 64px;
  background: linear-gradient(90deg, var(--spotify-lite-purple) 0%, var(--spotify-black) 100%);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2.5rem;
  box-shadow: 0 2px 8px 0 rgba(0,0,0,0.08);
  position: sticky;
  top: 0;
  z-index: 200;
`;

const Logo = styled(Link)`
  font-size: 1.6rem;
  font-weight: 900;
  color: #1db954;
  text-decoration: none;
  letter-spacing: -1px;
`;

const AuthButtons = styled.div`
  display: flex;
  gap: 1.2rem;
`;

const AuthButton = styled.button`
  background: var(--spotify-lite-green);
  color: var(--spotify-lite-purple);
  border: none;
  border-radius: 18px;
  padding: 0.5rem 1.5rem;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  &:hover {
    background: var(--spotify-lite-purple);
    color: #fff;
  }
`;

export default function HeaderBar() {
  return (
    <Header>
      <Logo to="/">Podify</Logo>
      <AuthButtons>
        <AuthButton>Login</AuthButton>
        <AuthButton>Sign Up</AuthButton>
      </AuthButtons>
    </Header>
  );
} 