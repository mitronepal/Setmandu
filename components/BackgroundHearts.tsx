
import React from 'react';
import { motion } from 'framer-motion';

const BackgroundHearts: React.FC = () => {
  // Reduced particle count for better performance
  const particles = [...Array(15)];
  const orbs = [...Array(3)];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((_, i) => (
        <motion.div 
          key={i}
          initial={{ 
            y: '110vh', 
            x: `${Math.random() * 100}vw`,
            scale: 0.5 + Math.random() * 0.5,
            opacity: 0
          }}
          animate={{ 
            y: '-10vh',
            x: `${(Math.random() * 100) + (Math.sin(i) * 5)}vw`,
            opacity: [0, 0.2, 0.2, 0],
          }}
          transition={{ 
            duration: 15 + Math.random() * 15,
            repeat: Infinity,
            delay: Math.random() * 10,
            ease: "linear"
          }}
          className="absolute text-purple-500/10 will-change-transform"
          style={{ 
            fontSize: `${15 + Math.random() * 20}px`,
          }}
        >
          {['❤️', '💖', '✨'][i % 3]}
        </motion.div>
      ))}
      
      {/* Glow Orbs - Simplified */}
      {orbs.map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          initial={{ opacity: 0.05 }}
          animate={{ 
            opacity: [0.05, 0.1, 0.05],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 10 + i * 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[120px] will-change-transform"
          style={{
            left: `${10 + i * 30}%`,
            top: `${20 + i * 20}%`,
          }}
        />
      ))}
    </div>
  );
};

export default BackgroundHearts;
