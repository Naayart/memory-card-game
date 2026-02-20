// components/GameControls.jsx
function GameControls({ difficulty, onDifficultyChange, onNewGame, theme }) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <select 
        value={difficulty}
        onChange={(e) => onDifficultyChange(e.target.value)}
        style={{
          padding: '8px 15px',
          fontSize: '1em',
          borderRadius: '5px',
          marginRight: '10px',
          cursor: 'pointer',
          backgroundColor: theme.stats,
          color: theme.text,
          border: `1px solid ${theme.text}`,
          transition: 'all 0.3s ease'
        }}
      >
        <option value="easy">Easy (6 pairs)</option>
        <option value="medium">Medium (8 pairs)</option>
        <option value="hard">Hard (12 pairs)</option>
      </select>
      
      <button
        onClick={onNewGame}
        style={{
          padding: '8px 20px',
          fontSize: '1em',
          backgroundColor: theme.button,
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => e.target.style.backgroundColor = 
          theme.button === '#4CAF50' ? '#45a049' : 
          theme.button === '#666666' ? '#888888' : 
          theme.button === '#0288d1' ? '#0277bd' : '#45a049'
        }
        onMouseLeave={(e) => e.target.style.backgroundColor = theme.button}
      >
        🔄 New Game
      </button>
    </div>
  );
}

export default GameControls;