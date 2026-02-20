// components/Card.jsx
function Card({ emoji, isFlipped, isMatched, onClick, isDisabled, difficulty, theme }) {
  // Determine card color based on state and theme
  const getCardColor = () => {
    if (isMatched) return '#90EE90'; // Matched cards stay green
    if (isFlipped) return theme.background; // Flipped cards use theme background
    return theme.card; // Face-down cards use theme card color
  };

  return (
    <button
      onClick={onClick}
      disabled={isDisabled || isMatched}
      style={{
        height: difficulty === 'hard' ? '100px' : '80px',
        fontSize: difficulty === 'hard' ? '2.5em' : '2em',
        backgroundColor: getCardColor(),
        color: isFlipped ? theme.text : '#333', // Text color based on flip state
        border: `2px solid ${theme.text}30`,
        borderRadius: '8px',
        cursor: isDisabled || isMatched || isFlipped ? 'default' : 'pointer',
        opacity: isMatched ? 0.7 : 1,
        transition: 'all 0.3s ease',
        transform: isFlipped ? 'scale(0.95)' : 'scale(1)',
        boxShadow: isFlipped ? `0 0 10px ${theme.text}40` : 'none',
        width: '100%'
      }}
    >
      {isFlipped || isMatched ? emoji : '❓'}
    </button>
  );
}

export default Card;