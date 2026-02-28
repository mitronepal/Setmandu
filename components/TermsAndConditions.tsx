
import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, CreditCard, MessageCircle, Heart, Gavel, CheckCircle2 } from 'lucide-react';

interface TermsAndConditionsProps {
  onAccept: () => void;
}

const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({ onAccept }) => {
  const terms = [
    {
      id: '01',
      icon: <ShieldCheck className="w-8 h-8 text-emerald-400" />,
      title: 'विवरणको सत्यता (Accuracy of Details)',
      desc: 'तपाईंले दिनुभएको विवरण १००% सत्य हुनुपर्छ। झूटो देखिएमा प्रोफाइल तत्काल बन्द गरिनेछ र कानूनी कारबाही गर्न सकिनेछ।',
    },
    {
      id: '02',
      icon: <CreditCard className="w-8 h-8 text-purple-400" />,
      title: 'दर्ता शुल्क (Registration Fee - Rs. 2000)',
      desc: 'प्रोफाइल दर्ता गर्दा लाग्ने शुल्क फिर्ता हुने छैन (Non-refundable)। यो शुल्क सेवाको प्रारम्भिक लागत र प्रोफाइल सत्यापनको लागि हो।',
    },
    {
      id: '03',
      icon: <MessageCircle className="w-8 h-8 text-pink-400" />,
      title: 'म्याच र संवाद (Match & Communication)',
      desc: 'रु. २००० मा ५-६ जनासँग संवादको अवसर मिल्नेछ। म्याच नमिलेमा सेवा समाप्त हुन्छ। संवादको लागि हामी मात्र माध्यम बनेर काम गर्दछौं।',
    },
    {
      id: '04',
      icon: <Heart className="w-8 h-8 text-red-400" />,
      title: 'सफलता शुल्क (Success Fee - Rs. 20,000)',
      desc: 'विवाह पक्का भएमा दुवै पक्षले अनिवार्य रु. २०,००० सेवा शुल्क बुझाउनुपर्नेछ। यो शुल्क विवाहको लागि सेवा सफल भएको खुसीयाली हो।',
    },
    {
      id: '05',
      icon: <Gavel className="w-8 h-8 text-amber-400" />,
      title: 'गोपनीयता र कारबाही (Privacy & Legal)',
      desc: 'शुल्क नतिरेमा वा ठगी गरेमा कानूनी प्रक्रिया अघि बढाइनेछ र विवरण सार्वजनिक गर्न सकिनेछ। गोपनीयताको उल्लंघन गर्ने कुनै पनि कार्य स्वीकार्य छैन।',
    },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden border border-white/10 max-w-4xl mx-auto"
    >
      {/* Animated Background Hearts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: 100, opacity: 0 }}
            animate={{ 
              y: -500, 
              opacity: [0, 0.2, 0],
              x: Math.sin(i) * 100 
            }}
            transition={{ 
              duration: 10 + i * 2, 
              repeat: Infinity, 
              ease: "linear",
              delay: i * 3
            }}
            className="absolute bottom-0 text-pink-500/20 text-4xl"
            style={{ left: `${15 + i * 15}%` }}
          >
            ❤️
          </motion.div>
        ))}
      </div>

      <div className="relative z-10">
        <div className="text-center mb-12">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="inline-block px-4 py-1.5 mb-4 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold tracking-widest uppercase"
          >
            Welcome to Setmandu • स्वागत छ!
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-black mb-4 rose-gold-text">सेवाका सर्तहरू</h2>
          <p className="text-gray-400 max-w-xl mx-auto leading-relaxed">
            कृपया सेवाका सर्तहरू ध्यानपूर्वक पढ्नुहोला। तपाईंले सर्तहरू स्वीकार गर्दा मात्र दर्ता प्रक्रिया अगाडि बढ्न सक्नुहुन्छ।
          </p>
        </div>

        <div className="space-y-6 mb-12">
          {terms.map((term, index) => (
            <motion.div
              key={term.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="group flex gap-6 p-6 rounded-3xl bg-white/5 border border-white/5 hover:border-purple-500/30 hover:bg-white/10 transition-all duration-300"
            >
              <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                {term.icon}
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-xs font-mono text-purple-400 font-bold tracking-tighter">{term.id}</span>
                  <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">{term.title}</h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">{term.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col items-center gap-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onAccept}
            className="pulse-btn w-full md:w-auto px-16 py-5 bg-purple-600 hover:bg-purple-500 rounded-full text-xl font-bold transition-all shadow-2xl shadow-purple-500/40 flex items-center justify-center gap-3 group"
          >
            म सबै सर्तहरू स्वीकार गर्दछु 💖
            <CheckCircle2 className="w-6 h-6 group-hover:rotate-12 transition-transform" />
          </motion.button>
          <p className="text-xs text-gray-500 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" />
            Your data is protected by our privacy policy.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default TermsAndConditions;
