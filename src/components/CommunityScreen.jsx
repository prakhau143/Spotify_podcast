import React, { useState } from 'react';
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

const CommentsList = styled.div`
  margin-bottom: 2.5rem;
`;

const Comment = styled.div`
  background: #232323;
  border-radius: 14px;
  padding: 1rem 1.5rem;
  color: #fff;
  margin-bottom: 1rem;
`;

const CommentAuthor = styled.div`
  font-weight: 700;
  color: #1db954;
  margin-bottom: 0.2rem;
`;

const CommentText = styled.div`
  font-size: 1.05rem;
`;

const InputRow = styled.div`
  display: flex;
  gap: 1rem;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.8rem 1.2rem;
  border-radius: 24px;
  border: none;
  background: #232323;
  color: #fff;
  font-size: 1.05rem;
`;

const Button = styled.button`
  background: #1db954;
  color: #fff;
  border: none;
  border-radius: 24px;
  padding: 0.8rem 2rem;
  font-weight: 700;
  font-size: 1.05rem;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #fff;
    color: #1db954;
  }
`;

const initialComments = [
  { author: 'Alice', text: 'Loved this episode! The guest was amazing.' },
  { author: 'Bob', text: 'Great insights, looking forward to the next one.' },
];

export default function CommunityScreen() {
  const [comments, setComments] = useState(initialComments);
  const [input, setInput] = useState('');
  const [author, setAuthor] = useState('');

  function handleAdd() {
    if (input.trim() && author.trim()) {
      setComments([{ author, text: input }, ...comments]);
      setInput('');
      setAuthor('');
    }
  }

  return (
    <Section>
      <SectionTitle>What listeners are saying</SectionTitle>
      <CommentsList>
        {comments.map((c, i) => (
          <Comment key={i}>
            <CommentAuthor>{c.author}</CommentAuthor>
            <CommentText>{c.text}</CommentText>
          </Comment>
        ))}
      </CommentsList>
      <SectionTitle>Share your thoughts</SectionTitle>
      <InputRow>
        <Input
          type="text"
          placeholder="Your name"
          value={author}
          onChange={e => setAuthor(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Add a comment..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleAdd()}
        />
        <Button onClick={handleAdd}>Post</Button>
      </InputRow>
    </Section>
  );
} 