export default function Card({ card, onClick, isFlipped, isMatched }) {
  return (
    <div className="w-24 h-32 m-2 perspective" onClick={onClick}>
      <div
        className={`relative w-full h-full duration-500 transition-transform transform-style-preserve-3d ${
          isFlipped || isMatched ? "rotate-y-180" : ""
        }`}
      >
        <div className="absolute w-full h-full bg-gray-200 flex items-center justify-center text-2xl font-bold rounded shadow backface-hidden">
          ❓
        </div>
        <div className="absolute w-full h-full bg-blue-400 text-white flex items-center justify-center text-2xl font-bold rounded shadow transform rotate-y-180 backface-hidden">
          {card.emoji}
        </div>
      </div>
    </div>
  );
}