// components/GameBoard.jsx
import Card from './Card';

function GameBoard({ cards, onCardClick, isDisabled, difficulty, theme }) {
  const gridColumns = difficulty === 'hard' ? 6 : 4;
  
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
      gap: '10px',
      marginBottom: '20px'
    }}>
      {cards.map((card, index) => (
        <Card
          key={card.id}
          emoji={card.emoji}
          isFlipped={card.isFlipped}
          isMatched={card.isMatched}
          onClick={() => onCardClick(index)}
          isDisabled={isDisabled}
          difficulty={difficulty}
          theme={theme}
        />
      ))}
    </div>
  );
}

export default GameBoard;