// components/MoveHistory.jsx
import { useState, useEffect } from 'react';

function MoveHistory({ gameStatus, moves, difficulty, theme }) {
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('moveHistory');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    if (gameStatus === 'won') {
      const newRecord = {
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        moves: moves,
        difficulty: difficulty
      };
      
      const updatedHistory = [newRecord, ...history].slice(0, 10);
      setHistory(updatedHistory);
      localStorage.setItem('moveHistory', JSON.stringify(updatedHistory));
    }
  }, [gameStatus, moves, difficulty]);

  if (history.length === 0) {
    return (
      <div style={{ 
        textAlign: 'center', 
        color: theme.text,
        padding: '10px'
      }}>
        No games played yet
      </div>
    );
  }

  return (
    <div style={{
      marginBottom: '20px',
      padding: '15px',
      backgroundColor: theme.background,
      borderRadius: '8px',
      border: `1px solid ${theme.text}20`
    }}>
      <h3 style={{ 
        margin: '0 0 15px 0',
        color: theme.text,
        fontSize: '1.1em'
      }}>
        📊 Recent Games (Last 10)
      </h3>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
      }}>
        {history.map((record, index) => (
          <div key={index} style={{
            padding: '8px',
            backgroundColor: theme.stats,
            color: theme.text,
            borderRadius: '5px',
            fontSize: '0.9em',
            display: 'flex',
            justifyContent: 'space-between',
            transition: 'all 0.3s ease'
          }}>
            <span>{record.date}</span>
            <span>{record.difficulty}</span>
            <span><strong>{record.moves}</strong> moves</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MoveHistory;