
import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, ShieldCheck } from 'lucide-react';

interface HeroProps {
  onStart: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <section className="relative flex flex-col items-center justify-center text-center px-6 py-24 overflow-hidden min-h-[80vh]">
      {/* Decorative Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-6xl bg-purple-600/10 rounded-full blur-[120px] pointer-events-none opacity-50"></div>
      
      {/* Floating Hearts Animation - Optimized */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: '100vh', opacity: 0, scale: 0 }}
            animate={{ 
              y: '-20vh', 
              opacity: [0, 0.3, 0.3, 0],
              scale: [0.5, 1, 0.8],
              x: Math.sin(i) * 200 
            }}
            transition={{ 
              duration: 12 + i * 2, 
              repeat: Infinity, 
              ease: "linear",
              delay: i * 1
            }}
            className="absolute bottom-0 text-purple-500/20 text-4xl will-change-transform"
            style={{ left: `${15 + Math.random() * 70}%` }}
          >
            {['❤️', '💖', '✨'][i % 3]}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-5xl">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-block px-6 py-2 mb-8 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-bold tracking-[0.2em] uppercase backdrop-blur-md"
        >
          <span className="flex items-center gap-3">
            <Sparkles className="w-4 h-4" />
            Nepal's #1 Premium Matrimonial
            <Sparkles className="w-4 h-4" />
          </span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-7xl md:text-9xl font-black mb-10 leading-[1] tracking-tighter"
        >
          <span className="text-sm md:text-xl block mb-4 text-purple-500/60 font-mono tracking-[0.5em] uppercase">Setmandu Matrimony</span>
          Find Your <br />
          <span className="rose-gold-text">Soulmate</span> <br /> 
          in <span className="text-purple-400 relative">
            Nepal
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ delay: 1, duration: 0.6 }}
              className="absolute -bottom-2 left-0 h-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"
            />
          </span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          नेपालको पहिलो डिजिटल म्याट्रिमोनी सेवा <br />
          <span className="text-white font-bold">सुरक्षित र भरपर्दो</span> जीवनसाथीको खोजी अब सजिलो। <br />
          Join <span className="text-purple-400 font-bold">5,000+</span> verified members today.
        </motion.p>
        
        <div className="flex flex-col items-center justify-center gap-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, type: "spring", stiffness: 100 }}
            className="relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-40 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
            <button 
              onClick={onStart}
              className="relative px-12 py-5 bg-purple-600 hover:bg-purple-500 rounded-full text-xl font-bold transition-all shadow-2xl flex items-center gap-3 group"
            >
              Start Your Journey 💖
              <Heart className="w-6 h-6 group-hover:fill-current transition-all" />
            </button>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col items-center gap-4"
          >
            <div className="flex -space-x-3">
              {[1,2,3,4,5].map(i => (
                <div key={i} className="w-12 h-12 rounded-full border-2 border-[#0f071a] overflow-hidden bg-gray-800">
                  <img 
                    src={`https://picsum.photos/seed/${i + 20}/100/100`} 
                    className="w-full h-full object-cover"
                    alt="User"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ))}
              <div className="w-12 h-12 rounded-full border-2 border-[#0f071a] bg-purple-600 flex items-center justify-center text-xs font-bold">
                +5k
              </div>
            </div>
            <p className="text-sm text-gray-500 font-medium flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Verified profiles with <span className="text-emerald-400">Citizenship Check</span>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
