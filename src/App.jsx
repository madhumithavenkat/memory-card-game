import { useState, useEffect } from "react";
import Card from "./Card";

const cardEmojis = ["🍕", "🍔", "🍟", "🌮", "🍣", "🍩", "🍪", "🍎"];

function shuffle(array) {
  return [...array, ...array]
    .map((item) => ({ ...item, id: Math.random() }))
    .sort(() => Math.random() - 0.5);
}

export default function App() {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [bestScore, setBestScore] = useState(() => {
    return Number(localStorage.getItem("bestScore")) || null;
  });
  const [showWin, setShowWin] = useState(false);

  useEffect(() => {
    const shuffled = shuffle(cardEmojis.map((emoji) => ({ emoji })));
    setCards(shuffled);
  }, []);

  useEffect(() => {
    if (flipped.length === 2) {
      setMoves((m) => m + 1);
      const [first, second] = flipped;
      if (cards[first].emoji === cards[second].emoji) {
        setMatched((prev) => [...prev, cards[first].emoji]);
      }
      setTimeout(() => setFlipped([]), 800);
    }
  }, [flipped, cards]);

  useEffect(() => {
    if (matched.length === cardEmojis.length) {
      if (!bestScore || moves < bestScore) {
        setBestScore(moves);
        localStorage.setItem("bestScore", moves);
      }
      setShowWin(true);
      setTimeout(() => setShowWin(false), 3000);
    }
  }, [matched, moves]);

  const handleClick = (index) => {
    if (flipped.includes(index) || flipped.length === 2 || matched.includes(cards[index].emoji)) return;
    setFlipped((prev) => [...prev, index]);
  };

  const resetGame = () => {
    const shuffled = shuffle(cardEmojis.map((emoji) => ({ emoji })));
    setCards(shuffled);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setShowWin(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-2">🧠 Memory Card Game</h1>
      <div className="mb-2 text-gray-700">Moves: {moves}</div>
      {bestScore !== null && (
        <div className="mb-2 text-green-700">Best Score: {bestScore}</div>
      )}
      <button
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={resetGame}
      >
        Reset Game
      </button>

      {showWin && (
        <div className="text-2xl font-bold text-green-600 animate-bounce mb-4">
          🎉 You won! Great memory!
        </div>
      )}

      <div className="grid grid-cols-4 gap-4">
        {cards.map((card, index) => (
          <Card
            key={card.id}
            card={card}
            isFlipped={flipped.includes(index)}
            isMatched={matched.includes(card.emoji)}
            onClick={() => handleClick(index)}
          />
        ))}
      </div>
    </div>
  );
}
