// components/SimpleSound.jsx - Alternative if URLs fail
import { useEffect } from 'react';

function SimpleSound({ gameStatus, isMatch }) {
  useEffect(() => {
    if (isMatch) {
      // Simple beep for match
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      oscillator.frequency.setValueAtTime(800, audioCtx.currentTime);
      gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
      
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.1);
    }
  }, [isMatch]);

  useEffect(() => {
    if (gameStatus === 'won') {
      // Victory sound - two beeps
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      
      for(let i = 0; i < 3; i++) {
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        oscillator.frequency.setValueAtTime(400 + (i * 200), audioCtx.currentTime + (i * 0.2));
        gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime + (i * 0.2));
        
        oscillator.start(audioCtx.currentTime + (i * 0.2));
        oscillator.stop(audioCtx.currentTime + 0.1 + (i * 0.2));
      }
    }
  }, [gameStatus]);

  return null;
}

export default SimpleSound;