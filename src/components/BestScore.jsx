// components/BestScore.jsx
function BestScore({ bestTime, difficulty, theme }) {
  const difficultyLabels = {
    easy: 'Easy',
    medium: 'Medium',
    hard: 'Hard'
  };

  const formatTime = (seconds) => {
    if (!seconds && seconds !== 0) return '--:--';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{
      padding: '8px 15px',
      backgroundColor: theme.stats,
      color: theme.text,
      borderRadius: '5px',
      fontSize: '1.2em',
      fontWeight: 'bold',
      transition: 'all 0.3s ease'
    }}>
      🏆 Best ({difficultyLabels[difficulty]}): {formatTime(bestTime)}
    </div>
  );
}

export default BestScore;