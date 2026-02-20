// components/WinMessage.jsx - Fixed version
function WinMessage({ moves, timer, isNewRecord }) {
  // Format timer safely
  const formatTime = (seconds) => {
    if (seconds === undefined || seconds === null) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{
      backgroundColor: isNewRecord ? '#FFD700' : '#4CAF50',
      color: isNewRecord ? '#333' : 'white',
      padding: '20px',
      borderRadius: '10px',
      marginBottom: '20px',
      fontSize: '1.4em',
      animation: 'pulse 1s',
      boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
    }}>
      {isNewRecord ? '🏆 NEW RECORD! 🏆' : '🎉 Congratulations! 🎉'}
      <div style={{ 
        marginTop: '10px', 
        fontSize: '0.8em',
        opacity: 0.9
      }}>
        You won in <strong>{moves}</strong> moves and{' '}
        <strong>{formatTime(timer)}</strong>!
      </div>
    </div>
  );
}

export default WinMessage;