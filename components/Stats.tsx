
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Heart, ShieldCheck, Trophy } from 'lucide-react';

const StatItem = ({ icon, value, label, delay }: { icon: React.ReactNode, value: number, label: string, delay: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 2000;
    const increment = end / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [value]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="group flex flex-col items-center p-8 glass rounded-[2.5rem] border border-white/5 hover:border-purple-500/30 transition-all duration-500 hover:bg-purple-500/5"
    >
      <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
        {icon}
      </div>
      <div className="text-5xl font-black mb-2 rose-gold-text tracking-tighter">
        {count.toLocaleString()}+
      </div>
      <div className="text-gray-400 font-bold text-sm uppercase tracking-widest text-center">
        {label}
      </div>
    </motion.div>
  );
};

const Stats: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatItem 
          icon={<Users className="w-8 h-8 text-purple-400" />}
          value={12540} 
          label="Verified Nepali Users" 
          delay={0.1}
        />
        <StatItem 
          icon={<Heart className="w-8 h-8 text-pink-400" />}
          value={8420} 
          label="Successful Matches" 
          delay={0.2}
        />
        <StatItem 
          icon={<ShieldCheck className="w-8 h-8 text-emerald-400" />}
          value={1520} 
          label="Happy Marriages" 
          delay={0.3}
        />
        <StatItem 
          icon={<Trophy className="w-8 h-8 text-amber-400" />}
          value={15} 
          label="Years of Trust" 
          delay={0.4}
        />
      </div>
    </section>
  );
};

export default Stats;
