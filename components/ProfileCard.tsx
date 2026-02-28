
import React, { useState } from 'react';
import { MatchResult } from '../types';

interface ProfileCardProps {
  match: MatchResult;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ match }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
        <div 
        className="group relative glass rounded-3xl overflow-hidden cursor-pointer transform transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/20 border border-white/10 gradient-border-glow"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setShowDetails(true)}
        >
        {/* Profile Image */}
        <div className="relative h-80 overflow-hidden">
            <img 
            src={match.recentPhotoURL} 
            alt={match.fullName} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f071a] via-transparent to-transparent opacity-90"></div>
            
            {/* Compatibility Score Badge */}
            <div className="absolute top-4 right-4 px-4 py-2 glass rounded-full flex items-center gap-2 border border-white/20">
            <span className="text-sm font-bold text-white">{match.score}%</span>
            <span className="animate-bounce">💖</span>
            </div>

            {match.isVerified && (
                <div className="absolute top-4 left-4 px-3 py-1 bg-green-500/80 backdrop-blur rounded-lg flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider">
                    <span>Verified</span>
                </div>
            )}
        </div>

        {/* Info */}
        <div className="p-6 relative">
            <h3 className="text-xl font-bold mb-1">{match.fullName}, {match.age}</h3>
            <p className="text-purple-400 font-medium text-sm mb-4">{match.casteEthnicity} • {match.district}</p>
            
            <div className="grid grid-cols-2 gap-4 text-xs text-gray-400 mb-6">
            <div className="flex items-center gap-2">
                <span className="text-lg">💼</span>
                <span>{match.occupation}</span>
            </div>
            <div className="flex items-center gap-2">
                <span className="text-lg">📏</span>
                <span>{match.height}</span>
            </div>
            <div className="flex items-center gap-2">
                <span className="text-lg">🎓</span>
                <span>{match.education}</span>
            </div>
            <div className="flex items-center gap-2">
                <span className="text-lg">🌍</span>
                <span>{match.countryResidence}</span>
            </div>
            </div>

            <button 
            className="w-full py-3 bg-white/10 hover:bg-purple-600 rounded-xl font-bold transition-all text-sm group-hover:bg-purple-600 shadow-inner"
            >
            View Full Profile
            </button>
        </div>

        {/* Floating Heart Effect on Hover */}
        {isHovered && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(5)].map((_, i) => (
                <div 
                key={i}
                className="absolute text-purple-400/50 animate-bounce"
                style={{
                    left: `${Math.random() * 100}%`,
                    bottom: `${Math.random() * 40}%`,
                    animationDelay: `${i * 0.2}s`,
                    fontSize: `${10 + Math.random() * 20}px`
                }}
                >
                ❤️
                </div>
            ))}
            </div>
        )}
        </div>

        {/* Modal for Details */}
        {showDetails && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm animate-fadeIn">
                <div className="glass w-full max-w-2xl rounded-3xl overflow-hidden relative shadow-2xl border border-white/20">
                    <button 
                        onClick={(e) => { e.stopPropagation(); setShowDetails(false); }}
                        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors z-10"
                    >
                        ✕
                    </button>

                    <div className="flex flex-col md:flex-row">
                        <div className="w-full md:w-1/2 h-80 md:h-auto">
                            <img src={match.recentPhotoURL} className="w-full h-full object-cover" alt="" />
                        </div>
                        <div className="p-8 w-full md:w-1/2">
                            <h2 className="text-3xl font-bold mb-2">{match.fullName}</h2>
                            <div className="flex items-center gap-2 mb-6 text-purple-400">
                                <span className="px-3 py-1 bg-purple-500/10 rounded-full text-xs font-bold">{match.casteEthnicity}</span>
                                <span className="px-3 py-1 bg-purple-500/10 rounded-full text-xs font-bold">{match.age} Years</span>
                            </div>

                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between border-b border-white/5 pb-2">
                                    <span className="text-gray-500 text-sm">Height</span>
                                    <span className="font-medium">{match.height}</span>
                                </div>
                                <div className="flex justify-between border-b border-white/5 pb-2">
                                    <span className="text-gray-500 text-sm">Education</span>
                                    <span className="font-medium">{match.education}</span>
                                </div>
                                <div className="flex justify-between border-b border-white/5 pb-2">
                                    <span className="text-gray-500 text-sm">Occupation</span>
                                    <span className="font-medium">{match.occupation}</span>
                                </div>
                                <div className="flex justify-between border-b border-white/5 pb-2">
                                    <span className="text-gray-500 text-sm">Location</span>
                                    <span className="font-medium">{match.district}, {match.countryResidence}</span>
                                </div>
                            </div>

                            <p className="text-gray-400 text-sm italic mb-8">
                                "{match.bio}"
                            </p>

                            <button className="w-full py-4 bg-purple-600 hover:bg-purple-500 rounded-2xl font-bold transition-all shadow-lg shadow-purple-600/30">
                                Send Connection Request
                            </button>
                            <p className="text-[10px] text-gray-600 mt-4 text-center uppercase tracking-widest">
                                Private information like phone & email are hidden for security.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )}
    </>
  );
};

export default ProfileCard;
