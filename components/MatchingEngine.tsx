
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserProfile, MatchResult } from '../types';
import { db } from '../firebaseConfig';
import ProfileCard from './ProfileCard';
import Confetti from './Confetti';
import { Heart, Search, Users, Filter, Sparkles, Loader2 } from 'lucide-react';

interface MatchingEngineProps {
  currentUser: UserProfile;
}

const calculateMatchScore = (currentUser: UserProfile, candidateUser: UserProfile): number => {
  let score = 0;
  if (candidateUser.gender !== currentUser.preferredPartnerGender) return 0;

  // Age match (30 points)
  const [minAge, maxAge] = currentUser.preferredAgeRange.split('-').map(Number);
  if (candidateUser.age >= minAge && candidateUser.age <= maxAge) {
    score += 30;
  } else if (Math.abs(candidateUser.age - currentUser.age) <= 5) {
    score += 15;
  }

  // Caste match (25 points)
  if (currentUser.preferredCasteCommunity === 'Any' ||
      candidateUser.casteEthnicity.toLowerCase() === currentUser.preferredCasteCommunity.toLowerCase()) {
    score += 25;
  }

  // Country match (20 points)
  if (currentUser.preferredCountry === 'Any' ||
      candidateUser.countryResidence.toLowerCase() === currentUser.preferredCountry.toLowerCase()) {
    score += 20;
  }

  // Occupation/Education bonus (15 + 10 points)
  if (candidateUser.occupation) score += 15;
  if (candidateUser.education) score += 10;

  return Math.min(score, 100);
};

const MatchingEngine: React.FC<MatchingEngineProps> = ({ currentUser }) => {
  const [matches, setMatches] = useState<MatchResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const fetchRealMatches = async () => {
      setLoading(true);
      try {
        const targetGender = currentUser.preferredPartnerGender || (currentUser.gender === 'male' ? 'female' : 'male');
        const results = await db.getMatches(targetGender);
        
        const scoredMatches: MatchResult[] = results
          .filter(u => u.uid !== currentUser.uid)
          .map(u => ({
            ...u,
            score: calculateMatchScore(currentUser, u)
          }))
          .filter(m => m.score >= 40) // Only show decent matches
          .sort((a, b) => b.score - a.score);

        setMatches(scoredMatches);
        if (scoredMatches.length > 0) {
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 5000);
        }
      } catch (error) {
        console.error("Error fetching matches:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRealMatches();
  }, [currentUser]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
        <div className="relative mb-12">
            <motion.div 
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-32 h-32 border-4 border-purple-600/10 rounded-full"
            />
            <div className="absolute inset-0 w-32 h-32 border-t-4 border-purple-500 rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center text-4xl">🧿</div>
        </div>
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-extrabold mb-4 rose-gold-text"
        >
          Searching the Universe for Your Soulmate...
        </motion.h2>
        <p className="text-gray-400 max-w-sm mx-auto leading-relaxed">
            Our AI is matching your soul with verified profiles across Nepal and abroad.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 w-full opacity-30">
            {[1,2,3].map(i => <div key={i} className="glass h-96 rounded-3xl shimmer"></div>)}
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn space-y-12 pb-20">
      {showConfetti && <Confetti />}
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-purple-400 font-bold text-sm mb-2"
          >
            <Sparkles className="w-4 h-4" />
            DESTINY FOUND ✨
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-black rose-gold-text"
          >
            Matches for You, {currentUser.fullName.split(' ')[0]} 💖
          </motion.h2>
          <p className="text-gray-400 mt-1">We found {matches.length} verified profiles tailored for your soul.</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
            <input 
              type="text" 
              placeholder="Search by name, district..." 
              className="pl-12 pr-6 py-3.5 bg-white/5 border border-white/10 rounded-2xl focus:border-purple-500 outline-none transition-all w-full md:w-64 text-sm"
            />
          </div>
          <button className="p-3.5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all">
            <Filter className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Matches Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        <AnimatePresence mode="popLayout">
          {matches.map((match, index) => (
            <motion.div
              key={match.uid}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: index * 0.1 }}
            >
              <ProfileCard match={match} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {matches.length === 0 && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-32 glass rounded-[3rem] border border-white/5"
        >
          <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8 text-6xl">
            🏜️
          </div>
          <h3 className="text-3xl font-bold mb-4 rose-gold-text">No Matches Found Yet</h3>
          <p className="text-gray-400 max-w-md mx-auto leading-relaxed">
            We couldn't find any verified profiles matching your preferences at this moment. 
            Try relaxing your preferences (age range or caste) or check back later!
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-10 px-12 py-4 bg-purple-600 hover:bg-purple-500 rounded-full font-bold transition-all shadow-xl shadow-purple-500/20"
          >
            Refresh Matches
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default MatchingEngine;
