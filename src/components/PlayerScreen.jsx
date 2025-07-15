import React from 'react';
import styled from 'styled-components';

const PlayerSection = styled.section`
  padding: 2.5rem 2rem 0 2rem;
  display: flex;
  gap: 2.5rem;
`;

const Cover = styled.img`
  width: 260px;
  height: 260px;
  background: #444;
  border-radius: 24px;
  box-shadow: 0 4px 24px 0 rgba(0,0,0,0.18);
  object-fit: cover;
`;

const Details = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 800;
  color: #fff;
  margin: 0 0 0.5rem 0;
`;

const Meta = styled.div`
  font-size: 1.1rem;
  color: #b3b3b3;
  margin-bottom: 1.5rem;
`;

const PlayerBar = styled.div`
  background: #232323;
  border-radius: 16px;
  padding: 1.2rem 2rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const PlayerInfo = styled.div`
  flex: 1;
`;

const PlayerActions = styled.div`
  display: flex;
  gap: 1.2rem;
`;

const ActionButton = styled.button`
  background: #232323;
  color: #fff;
  border: none;
  border-radius: 12px;
  padding: 0.5rem 1.2rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  &:hover {
    background: #1db954;
    color: #fff;
  }
`;

const ShowNotes = styled.div`
  background: #181818;
  border-radius: 16px;
  padding: 1.5rem 2rem;
  color: #e0ffe0;
  margin-bottom: 2rem;
`;

const EpisodeList = styled.div`
  background: #232323;
  border-radius: 16px;
  padding: 1.5rem 2rem;
  color: #fff;
`;

const EmptyStateLinks = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 220px;
  color: #b3b3b3;
`;
const EmptyLinksRow = styled.div`
  display: flex;
  gap: 1.2rem;
  margin-top: 1.2rem;
`;
const EmptyFooterLink = styled.a`
  color: #b3b3b3;
  text-decoration: none;
  font-size: 1.05rem;
  transition: color 0.2s;
  &:hover {
    color: #a259ff;
  }
`;

// Accepts props: show, episode, onSubscribe, onLike, onShare, isSubscribed, isLiked
export default function PlayerScreen({ show, episode, onSubscribe, onLike, onShare, isSubscribed, isLiked }) {
  if (!show || !episode) {
    return (
      <PlayerSection>
        {/* Empty state: no podcast selected, show nothing or a minimal placeholder */}
      </PlayerSection>
    );
  }
  return (
    <PlayerSection>
      <Cover src={show.images?.[0]?.url || 'https://misc.scdn.co/liked-songs/liked-songs-640.png'} alt={show.name} />
      <Details>
        <Title>{show.name}</Title>
        <Meta>{show.publisher} · {episode.duration_ms ? `${Math.floor(episode.duration_ms/60000)}:${String(Math.floor((episode.duration_ms%60000)/1000)).padStart(2,'0')}` : ''}</Meta>
        <PlayerBar>
          <iframe
            title="Spotify Player"
            src={`https://open.spotify.com/embed/episode/${episode.id}`}
            width="320"
            height="80"
            frameBorder="0"
            allowtransparency="true"
            allow="encrypted-media"
            style={{borderRadius:'12px'}}
          />
          <PlayerInfo>
            <div style={{fontWeight:700, fontSize:'1.1rem'}}>{episode.name}</div>
            <div style={{color:'#b3b3b3', fontSize:'0.98rem'}}>{episode.release_date}</div>
          </PlayerInfo>
          <PlayerActions>
            <ActionButton onClick={onSubscribe}>{isSubscribed ? 'Subscribed' : 'Subscribe'}</ActionButton>
            <ActionButton onClick={onLike}>{isLiked ? 'Liked' : 'Like'}</ActionButton>
            <ActionButton onClick={onShare}>Share</ActionButton>
          </PlayerActions>
        </PlayerBar>
        <ShowNotes>
          <b>Show Notes:</b> {episode.description || 'No description available.'}
        </ShowNotes>
        <EpisodeList>
          <b>Episodes</b>
          <ul style={{margin:'1rem 0 0 0', padding:'0', listStyle:'none'}}>
            <li style={{marginBottom:'0.7rem'}}>
              <span style={{fontWeight:600}}>{episode.name}</span> <span style={{color:'#b3b3b3', marginLeft:'0.7rem'}}>{episode.duration_ms ? `${Math.floor(episode.duration_ms/60000)}:${String(Math.floor((episode.duration_ms%60000)/1000)).padStart(2,'0')}` : ''}</span>
            </li>
          </ul>
        </EpisodeList>
      </Details>
    </PlayerSection>
  );
} 