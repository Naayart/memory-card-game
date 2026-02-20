// components/StatsDashboard.jsx
import { useState } from 'react';

function StatsDashboard({ bestTimes, totalGames, averageMoves, theme }) {
  const [showStats, setShowStats] = useState(false);

  return (
    <div>
      <button
        onClick={() => setShowStats(!showStats)}
        style={{
          padding: '10px 20px',
          backgroundColor: theme.button,
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '1em',
          width: '100%',
          transition: 'all 0.3s ease'
        }}
      >
        {showStats ? '▼ Hide' : '▶ Show'} Statistics
      </button>
      
      {showStats && (
        <div style={{
          marginTop: '15px',
          padding: '20px',
          backgroundColor: theme.background,
          color: theme.text,
          borderRadius: '8px',
          border: `1px solid ${theme.text}20`,
          transition: 'all 0.3s ease'
        }}>
          <h3 style={{ 
            margin: '0 0 20px 0',
            color: theme.text,
            textAlign: 'center'
          }}>
            📈 Your Statistics
          </h3>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '15px',
            marginBottom: '20px'
          }}>
            <div style={{
              padding: '15px',
              backgroundColor: theme.stats,
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '0.9em', opacity: 0.8 }}>Total Games</div>
              <div style={{ fontSize: '1.5em', fontWeight: 'bold' }}>{totalGames}</div>
            </div>
            
            <div style={{
              padding: '15px',
              backgroundColor: theme.stats,
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '0.9em', opacity: 0.8 }}>Avg Moves</div>
              <div style={{ fontSize: '1.5em', fontWeight: 'bold' }}>{averageMoves}</div>
            </div>
          </div>
          
          <div style={{
            padding: '15px',
            backgroundColor: theme.stats,
            borderRadius: '8px'
          }}>
            <div style={{ fontSize: '0.9em', opacity: 0.8, marginBottom: '10px' }}>
              Best Times by Difficulty
            </div>
            {['easy', 'medium', 'hard'].map(level => (
              <div key={level} style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '5px 0',
                borderBottom: `1px solid ${theme.text}20`
              }}>
                <span style={{ textTransform: 'capitalize' }}>{level}:</span>
                <span style={{ fontWeight: 'bold' }}>
                  {bestTimes[level] ? `${bestTimes[level]}s` : '--'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default StatsDashboard;