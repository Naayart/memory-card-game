
function GameStats({ moves, matches, totalPairs, theme }) {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'space-around',
      marginBottom: '20px',
      padding: '15px',
      backgroundColor: theme.stats,
      color: theme.text,
      borderRadius: '10px',
      fontSize: '1.2em',
      transition: 'all 0.3s ease'
    }}>
      <div>🎯 Moves: <strong>{moves}</strong></div>
      <div>✅ Matches: <strong>{matches}/{totalPairs}</strong></div>
    </div>
  );
}

export default GameStats;