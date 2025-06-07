'use client'

import { useState, useRef, useEffect } from 'react';
import CountUp from './components/countUp'; 
import GradientText from './components/gradientText';
import ScrollReveal from './components/scrollReveal';
import confetti from 'canvas-confetti';
import './page.css';

const CORRECT_PASSWORD = process.env.NEXT_PUBLIC_SITE_PASSWORD;
const LETTER_TEXT = process.env.NEXT_PUBLIC_BIRTHDAY_LETTER?.replace(/\\n/g, '\n');


export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const messageRef = useRef(null);
  const hasCelebrated = useRef(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === CORRECT_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      setError('Incorrect password. Try again.');
    }
  };

  const scrollToMessage = () => {
    messageRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isAuthenticated && !hasCelebrated.current) {
      hasCelebrated.current = true;
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.2 },
      });
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', backgroundColor: '#e0f7ff' }}>
        <h2 style={{ fontFamily: 'cursive' }}>Enter Password</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            style={{ padding: '10px', fontSize: '16px' }}
          />
          <button type="submit" style={{ marginLeft: '10px', padding: '10px 20px' }}>Enter</button>
        </form>
        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
      </div>
    );
  }

  return (
    <div className="birthday-container">
      <h1 className="birthday-title">HAPPY BIRTHDAY RAHHHH</h1>
      <div className="countup-section centered-column">
        <GradientText
              colors={["#4079ff", "#FD1D1D", "#4079ff", "#FD1D1D", "#4079ff"]}
              animationSpeed={3}
              showBorder={false}
              className="custom-class"
            >
          <CountUp
            from={0}
            to={23}
            separator=","
            direction="up"
            duration={1}
            className="count-up-text"
          />
          </GradientText>
          <span className="slay-text">years of being just a chill guy</span>
          <img 
          src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExdnJ0bGxsMmhmaG9mZDNqNnBiZjNpZjZ6d2hlNWQzZmFoY3dlcGc0dSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/c76IJLufpNwSULPk77/giphy.gif" 
          alt="Confetti Celebration" 
          className="celebration-gif"
        />
      </div>
      <button
        onClick={scrollToMessage} className="scroll-button"
      >
        Take me to my special message
      </button>
     
         <div ref={messageRef} className="scroll-target" />
         <ScrollReveal
          baseOpacity={0}
          enableBlur={true}
          baseRotation={5}
          blurStrength={10}
        >
          {LETTER_TEXT}
        </ScrollReveal>
    </div>
  );
  
}
