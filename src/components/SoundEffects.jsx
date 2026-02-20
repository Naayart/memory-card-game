// components/SoundEffects.jsx - Fixed version with working sounds
import { useEffect, useRef } from 'react';

function SoundEffects({ gameStatus, isMatch }) {
  const matchSound = useRef(null);
  const winSound = useRef(null);
  const flipSound = useRef(null);

  useEffect(() => {
    // Use more reliable sound URLs
    matchSound.current = new Audio('https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3');
    winSound.current = new Audio('https://www.soundjay.com/misc/sounds/applause-1.mp3');
    flipSound.current = new Audio('https://www.soundjay.com/misc/sounds/page-turn-3.mp3');
    
    // Preload sounds
    matchSound.current.load();
    winSound.current.load();
    flipSound.current.load();
    
    // Handle errors gracefully
    matchSound.current.onerror = () => console.log('Match sound failed to load');
    winSound.current.onerror = () => console.log('Win sound failed to load');
    flipSound.current.onerror = () => console.log('Flip sound failed to load');
    
    // Cleanup
    return () => {
      matchSound.current = null;
      winSound.current = null;
      flipSound.current = null;
    };
  }, []);

  useEffect(() => {
    if (isMatch && matchSound.current) {
      // Reset and play
      matchSound.current.currentTime = 0;
      matchSound.current.play().catch(e => console.log('Sound play failed:', e));
    }
  }, [isMatch]);

  useEffect(() => {
    if (gameStatus === 'won' && winSound.current) {
      winSound.current.play().catch(e => console.log('Sound play failed:', e));
    }
  }, [gameStatus]);

  return null;
}

export default SoundEffects;