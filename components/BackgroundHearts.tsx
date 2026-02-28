
import React from 'react';
import { motion } from 'framer-motion';

const BackgroundHearts: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {[...Array(40)].map((_, i) => (
        <motion.div 
          key={i}
          initial={{ 
            y: '110vh', 
            x: `${Math.random() * 100}vw`,
            scale: 0.5 + Math.random(),
            opacity: 0,
            rotate: 0
          }}
          animate={{ 
            y: '-10vh',
            x: `${(Math.random() * 100) + (Math.sin(i) * 10)}vw`,
            opacity: [0, 0.4, 0.4, 0],
            rotate: 360
          }}
          transition={{ 
            duration: 10 + Math.random() * 20,
            repeat: Infinity,
            delay: Math.random() * 10,
            ease: "linear"
          }}
          className="absolute text-purple-500/20"
          style={{ 
            fontSize: `${10 + Math.random() * 30}px`,
            filter: 'blur(1px)'
          }}
        >
          {['❤️', '💖', '✨', '💕', '💗'][Math.floor(Math.random() * 5)]}
        </motion.div>
      ))}
      
      {/* Glow Orbs */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          initial={{ 
            scale: 1,
            x: `${Math.random() * 100}vw`,
            y: `${Math.random() * 100}vh`,
            opacity: 0.1
          }}
          animate={{ 
            scale: [1, 1.5, 1],
            x: [`${Math.random() * 100}vw`, `${Math.random() * 100}vw`],
            y: [`${Math.random() * 100}vh`, `${Math.random() * 100}vh`],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ 
            duration: 20 + Math.random() * 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute w-96 h-96 bg-purple-600/10 rounded-full blur-[100px]"
        />
      ))}
    </div>
  );
};

export default BackgroundHearts;
