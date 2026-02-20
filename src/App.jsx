// App.jsx - Complete Memory Card Game with ALL Bonus Features
import { useState, useEffect, useRef, useCallback } from "react";
import GameBoard from "./components/GameBoard";
import GameStats from "./components/GameStats";
import GameControls from "./components/GameControls";
import WinMessage from "./components/WinMessage";
import Timer from "./components/Timer";
import BestScore from "./components/BestScore";
import MoveHistory from "./components/MoveHistory";
import StatsDashboard from "./components/StatsDashboard";
import ThemeSwitcher from "./components/ThemeSwitcher";
import SimpleSound from "./components/SimpleSound";

function App() {
  // ==================== CORE STATE ====================
  const [cards, setCards] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matches, setMatches] = useState(0);
  const [moves, setMoves] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  const [gameStatus, setGameStatus] = useState("playing");
  const [difficulty, setDifficulty] = useState("medium");

  // ==================== TIMER STATE ====================
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const timerRef = useRef(null);

  // ==================== BEST SCORES STATE ====================
  const [bestTimes, setBestTimes] = useState(() => {
    const saved = localStorage.getItem("bestTimes");
    return saved
      ? JSON.parse(saved)
      : {
          easy: null,
          medium: null,
          hard: null,
        };
  });

  // ==================== STATS STATE ====================
  const [totalGames, setTotalGames] = useState(() => {
    const saved = localStorage.getItem("totalGames");
    return saved ? parseInt(saved) : 0;
  });

  const [totalMoves, setTotalMoves] = useState(() => {
    const saved = localStorage.getItem("totalMoves");
    return saved ? parseInt(saved) : 0;
  });

  // ==================== THEME STATE ====================
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.log("Error parsing theme:", e);
      }
    }
    // Default theme with ALL properties
    return {
      background: "#ffffff",
      card: "#FFB6C1",
      text: "#333333",
      stats: "#f0f0f0",
      button: "#4CAF50",
      header: "#333333",
    };
  });

  // ==================== SOUND EFFECTS STATE ====================
  const [lastMoveWasMatch, setLastMoveWasMatch] = useState(false);

  // ==================== HELPER FUNCTIONS ====================
  const getCardPairs = useCallback(() => {
    const emojiSets = {
      easy: ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊"],
      medium: ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼"],
      hard: [
        "🐶",
        "🐱",
        "🐭",
        "🐹",
        "🐰",
        "🦊",
        "🐻",
        "🐼",
        "🐨",
        "🐯",
        "🦁",
        "🐮",
      ],
    };

    const selectedEmojis = emojiSets[difficulty];
    return selectedEmojis.flatMap((emoji) => [emoji, emoji]);
  }, [difficulty]);

  const getTotalPairs = useCallback(() => {
    return getCardPairs().length / 2;
  }, [getCardPairs]);

  // ==================== TIMER FUNCTIONS ====================
  const startTimer = () => {
    if (!isTimerRunning && gameStatus === "playing") {
      setIsTimerRunning(true);
      timerRef.current = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
      setIsTimerRunning(false);
    }
  };

  const resetTimer = () => {
    stopTimer();
    setTimer(0);
  };

  // ==================== CONFETTI FUNCTION ====================
  const triggerConfetti = () => {
    // Check if confetti function exists (loaded from CDN)
    if (typeof window.confetti === "function") {
      // Multiple bursts for better effect
      window.confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });

      setTimeout(() => {
        window.confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.6 },
        });
        window.confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.6 },
        });
      }, 250);
    }
  };

  // ==================== BEST SCORE FUNCTIONS ====================
  const checkAndUpdateBestScore = useCallback(() => {
    if (gameStatus === "won") {
      setBestTimes((prev) => {
        const currentBest = prev[difficulty];

        if (currentBest === null || timer < currentBest) {
          const newBestTimes = {
            ...prev,
            [difficulty]: timer,
          };

          localStorage.setItem("bestTimes", JSON.stringify(newBestTimes));
          return newBestTimes;
        }
        return prev;
      });
    }
  }, [gameStatus, difficulty, timer]);

  // ==================== GAME INITIALIZATION ====================
  const initializeGame = useCallback(() => {
    const cardEmojis = getCardPairs();

    const shuffledCards = cardEmojis
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji: emoji,
        isFlipped: false,
        isMatched: false,
      }));

    setCards(shuffledCards);
    setFlippedIndices([]);
    setMatches(0);
    setMoves(0);
    setGameStatus("playing");
    setIsDisabled(false);
    resetTimer();
    setLastMoveWasMatch(false);
  }, [getCardPairs]);

  // ==================== EFFECTS ====================

  // Initialize game when difficulty changes
  useEffect(() => {
    initializeGame();
  }, [difficulty, initializeGame]);

  // Check best score when game is won
  useEffect(() => {
    if (gameStatus === "won") {
      checkAndUpdateBestScore();
      stopTimer();
      triggerConfetti();

      // Update stats
      setTotalGames((prev) => {
        const newTotal = prev + 1;
        localStorage.setItem("totalGames", newTotal.toString());
        return newTotal;
      });

      setTotalMoves((prev) => {
        const newTotal = prev + moves;
        localStorage.setItem("totalMoves", newTotal.toString());
        return newTotal;
      });
    }
  }, [gameStatus, checkAndUpdateBestScore, moves]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // Save theme to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);

  // ==================== CARD CLICK HANDLER ====================
  const handleCardClick = (index) => {
    // Guard clauses
    if (isDisabled) return;
    if (gameStatus === "won") return;

    const clickedCard = cards[index];
    if (clickedCard.isFlipped) return;
    if (clickedCard.isMatched) return;

    // Start timer on first move
    if (
      flippedIndices.length === 0 &&
      !isTimerRunning &&
      gameStatus === "playing"
    ) {
      startTimer();
    }

    // First card clicked
    if (flippedIndices.length === 0) {
      const newCards = [...cards];
      newCards[index].isFlipped = true;
      setCards(newCards);
      setFlippedIndices([index]);
    }
    // Second card clicked
    else if (flippedIndices.length === 1) {
      setMoves((prev) => prev + 1);

      const newCards = [...cards];
      newCards[index].isFlipped = true;
      setCards(newCards);

      const firstIndex = flippedIndices[0];
      const firstCard = cards[firstIndex];
      const secondCard = clickedCard;

      // Check for match
      if (firstCard.emoji === secondCard.emoji) {
        // MATCH! - Trigger sound effect
        setLastMoveWasMatch(true);
        setTimeout(() => setLastMoveWasMatch(false), 100);

        const matchedCards = [...newCards];
        matchedCards[firstIndex].isMatched = true;
        matchedCards[index].isMatched = true;

        setCards(matchedCards);

        // Update matches and check win condition
        setMatches((prev) => {
          const newMatches = prev + 1;
          const total = getTotalPairs();

          if (newMatches === total) {
            setGameStatus("won");
          }

          return newMatches;
        });

        setFlippedIndices([]);
      } else {
        // NO MATCH
        setFlippedIndices([firstIndex, index]);
        setIsDisabled(true);

        setTimeout(() => {
          setCards((prevCards) => {
            const resetCards = [...prevCards];
            resetCards[firstIndex].isFlipped = false;
            resetCards[index].isFlipped = false;
            return resetCards;
          });
          setFlippedIndices([]);
          setIsDisabled(false);
        }, 1000);
      }
    }
  };

  // ==================== THEME HANDLER ====================
  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };

  // ==================== RENDER ====================
  const totalPairs = getTotalPairs();
  const averageMoves = totalGames > 0 ? Math.round(totalMoves / totalGames) : 0;

  return (
    <div
      style={{
        backgroundColor: theme.background,
        color: theme.text,
        minHeight: "100vh",
        padding: "20px",
        transition: "background-color 0.3s ease, color 0.3s ease",
      }}
    >
      {/* Sound Effects Component */}
      <SimpleSound gameStatus={gameStatus} isMatch={lastMoveWasMatch} />

      {/* Header with Theme Switcher */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
          maxWidth: difficulty === "hard" ? "800px" : "600px",
          margin: "0 auto 30px auto",
        }}
      >
        <h1
          style={{
            color: theme.header,
            margin: 0,
            fontSize: "2em",
          }}
        >
          🎴 Memory Card Game
        </h1>
        <ThemeSwitcher onThemeChange={handleThemeChange} currentTheme={theme} />
      </div>

      {/* Main Game Container */}
      <div
        style={{
          maxWidth: difficulty === "hard" ? "800px" : "600px",
          margin: "0 auto",
        }}
      >
        {/* Timer and Best Score Row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <Timer timer={timer} theme={theme} />
          <BestScore
            bestTime={bestTimes[difficulty]}
            difficulty={difficulty}
            theme={theme}
          />
        </div>

        {/* Game Stats */}
        <GameStats
          moves={moves}
          matches={matches}
          totalPairs={totalPairs}
          theme={theme}
        />

        {/* Game Controls */}
        <GameControls
          difficulty={difficulty}
          onDifficultyChange={setDifficulty}
          onNewGame={initializeGame}
          theme={theme}
        />

        {/* Win Message */}
        {gameStatus === "won" && (
          <WinMessage
            moves={moves}
            timer={timer}
            isNewRecord={timer === bestTimes[difficulty]}
            theme={theme}
          />
        )}

        {/* Game Board */}
        <GameBoard
          cards={cards}
          onCardClick={handleCardClick}
          isDisabled={isDisabled}
          difficulty={difficulty}
          theme={theme}
        />

        {/* Bonus Features Section */}
        <div
          style={{
            marginTop: "40px",
            padding: "20px",
            backgroundColor: theme.stats,
            borderRadius: "10px",
            transition: "background-color 0.3s ease",
          }}
        >
          <h2
            style={{
              margin: "0 0 20px 0",
              color: theme.text,
              textAlign: "center",
            }}
          >
            📊 Game Statistics
          </h2>

          {/* Move History */}
          <MoveHistory
            moves={moves}
            gameStatus={gameStatus}
            difficulty={difficulty}
            theme={theme}
          />

          {/* Stats Dashboard */}
          <StatsDashboard
            bestTimes={bestTimes}
            totalGames={totalGames}
            averageMoves={averageMoves}
            theme={theme}
          />
        </div>

        {/* Instructions */}
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            backgroundColor: theme.stats,
            borderRadius: "8px",
            fontSize: "0.9em",
            color: theme.text,
            textAlign: "center",
            transition: "background-color 0.3s ease",
          }}
        >
          <strong>📖 How to Play:</strong> Click on cards to flip them. Find
          matching pairs! Timer starts on your first move. Try to beat your best
          time!
        </div>

        {/* Confetti Script (add to public/index.html) */}
        <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1"></script>
      </div>
    </div>
  );
}

export default App;
