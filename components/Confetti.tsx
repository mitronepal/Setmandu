
import React from 'react';

const Confetti: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[100]">
      {[...Array(50)].map((_, i) => (
        <div 
          key={i}
          className="absolute animate-bounce"
          style={{
            left: `${Math.random() * 100}%`,
            top: `-20px`,
            backgroundColor: ['#7C3AED', '#e2b49a', '#facc15', '#ec4899'][Math.floor(Math.random() * 4)],
            width: `${5 + Math.random() * 10}px`,
            height: `${5 + Math.random() * 10}px`,
            borderRadius: '50%',
            animation: `fall ${2 + Math.random() * 3}s linear forwards`,
            animationDelay: `${Math.random() * 2}s`
          }}
        ></div>
      ))}
      <style>{`
        @keyframes fall {
          0% { transform: translateY(0) rotate(0deg); }
          100% { transform: translateY(110vh) rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Confetti;
