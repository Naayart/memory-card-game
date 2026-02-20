// components/Timer.jsx
function Timer({ timer, theme }) {
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  
  return (
    <div style={{
      padding: '8px 15px',
      backgroundColor: theme.stats,
      color: theme.text,
      borderRadius: '5px',
      fontSize: '1.2em',
      fontFamily: 'monospace',
      transition: 'all 0.3s ease'
    }}>
      ⏱️ {formattedTime}
    </div>
  );
}

export default Timer;