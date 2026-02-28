
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserProfile } from './types';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import MatchingEngine from './components/MatchingEngine';
import BackgroundHearts from './components/BackgroundHearts';
import Stats from './components/Stats';
import Footer from './components/Footer';

enum AppState {
  HOME = 'home',
  REGISTER = 'register',
  LOGIN = 'login',
  MATCHING = 'matching',
  SUCCESS = 'success',
  REJECTED = 'rejected'
}

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.HOME);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [appState]);

  const handleAuthComplete = (userData: UserProfile) => {
    setCurrentUser(userData);
    if (userData.verificationStatus === 'verified') {
      setShowWelcome(true);
      setAppState(AppState.MATCHING);
      setTimeout(() => setShowWelcome(false), 4000);
    } else if (userData.verificationStatus === 'rejected') {
      setAppState(AppState.REJECTED);
    } else {
      setAppState(AppState.SUCCESS);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0f071a] text-white">
      <BackgroundHearts />
      
      {showWelcome && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] animate-bounce">
          <div className="bg-emerald-500 text-white px-8 py-4 rounded-2xl shadow-2xl font-bold flex items-center gap-3 border border-emerald-400/50">
            <span className="text-2xl">🎉</span>
            Welcome Back, {currentUser?.fullName}!
          </div>
        </div>
      )}

      <Navigation 
        onHome={() => setAppState(AppState.HOME)} 
        onRegister={() => setAppState(AppState.REGISTER)} 
        onLogin={() => setAppState(AppState.LOGIN)}
        isLoggedIn={!!currentUser}
        onLogout={() => {
          setCurrentUser(null);
          setAppState(AppState.HOME);
        }}
      />
      
      <main className="relative z-10 pt-20">
        <AnimatePresence mode="wait">
          {appState === AppState.HOME && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Hero onStart={() => setAppState(AppState.REGISTER)} />
              <Stats />
              
              <div className="max-w-6xl mx-auto px-6 py-24">
                <div className="text-center mb-16">
                  <h2 className="text-4xl md:text-5xl font-bold mb-4 rose-gold-text">Premium Matrimonial Experience</h2>
                  <p className="text-gray-400 max-w-2xl mx-auto">Join Nepal's most trusted platform for serious life partners. Verified profiles, secure payments, and traditional values.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <StepCard 
                    icon="📝" 
                    title="1. Create Profile" 
                    desc="Fill in your details and upload a clear profile photo." 
                  />
                  <StepCard 
                    icon="🆔" 
                    title="2. Verify Identity" 
                    desc="Upload citizenship for a 100% verified badge." 
                  />
                  <StepCard 
                    icon="💳" 
                    title="3. Pay & Connect" 
                    desc="Pay Rs. 2000 to activate your profile and start matching." 
                  />
                </div>

                <div className="mt-20 p-8 md:p-12 glass rounded-[2rem] border border-purple-500/20 bg-purple-500/5 text-center">
                  <h3 className="text-3xl font-bold mb-6">Why Rs. 2,000 Mandatory Fee?</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
                    <div className="space-y-2">
                      <span className="text-2xl">🛡️</span>
                      <h4 className="font-bold">Zero Spammers</h4>
                      <p className="text-xs text-gray-400">Ensures only serious individuals join the platform.</p>
                    </div>
                    <div className="space-y-2">
                      <span className="text-2xl">🔍</span>
                      <h4 className="font-bold">Manual Verification</h4>
                      <p className="text-xs text-gray-400">Our team manually checks every citizenship and photo.</p>
                    </div>
                    <div className="space-y-2">
                      <span className="text-2xl">🔒</span>
                      <h4 className="font-bold">Privacy First</h4>
                      <p className="text-xs text-gray-400">Your data is encrypted and only shared with verified matches.</p>
                    </div>
                    <div className="space-y-2">
                      <span className="text-2xl">💎</span>
                      <h4 className="font-bold">Premium Support</h4>
                      <p className="text-xs text-gray-400">Dedicated relationship managers to help you find a match.</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {appState === AppState.LOGIN && (
            <motion.div
              key="login"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="max-w-md mx-auto px-6 py-20"
            >
              <LoginForm 
                onComplete={handleAuthComplete} 
                onSwitchToRegister={() => setAppState(AppState.REGISTER)}
              />
            </motion.div>
          )}

          {appState === AppState.REGISTER && (
            <motion.div
              key="register"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="max-w-4xl mx-auto px-6 py-10"
            >
              <RegistrationForm onComplete={handleAuthComplete} />
            </motion.div>
          )}

          {appState === AppState.SUCCESS && (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.9, rotateY: 90 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 1.1, rotateY: -90 }}
              transition={{ type: "spring", damping: 12 }}
              className="max-w-2xl mx-auto px-6 py-20 text-center"
            >
              <div className="relative w-32 h-32 mx-auto mb-10">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border-4 border-dashed border-emerald-500/30 rounded-full"
                />
                <div className="absolute inset-0 flex items-center justify-center text-6xl animate-pulse">
                  ⏳
                </div>
              </div>
              <h2 className="text-5xl font-black mb-6 rose-gold-text tracking-tight">Account Pending Verification</h2>
              <p className="text-2xl text-gray-300 mb-10 font-light">
                नमस्ते <span className="text-white font-bold">{currentUser?.fullName}</span>! <br />
                तपाईंको प्रोफाइल अहिले समीक्षा भइरहेको छ।
              </p>
              <div className="glass p-10 rounded-[2.5rem] border border-emerald-500/20 bg-emerald-500/5 mb-12 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500/20 overflow-hidden">
                  <motion.div 
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-1/2 h-full bg-emerald-500"
                  />
                </div>
                <p className="text-gray-300 text-lg leading-relaxed">
                  हाम्रो टिमले तपाईंको <span className="text-white font-bold">नागरिकता</span> र <span className="text-white font-bold">भुक्तानी</span> विवरणहरू रुजु गर्दैछ। 
                  यो प्रक्रियामा सामान्यतया <span className="text-emerald-400 font-bold">२ देखि ४ घण्टा</span> लाग्नेछ।
                </p>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
                  <span className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full"><span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span> भुक्तानी रुजु हुँदै</span>
                  <span className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full"><span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span> कागजात जाँच हुँदै</span>
                </div>
              </div>
              <button 
                onClick={() => setAppState(AppState.HOME)}
                className="px-12 py-5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full font-bold transition-all hover:scale-105 active:scale-95"
              >
                Back to Home
              </button>
            </motion.div>
          )}

          {appState === AppState.REJECTED && (
            <motion.div 
              key="rejected"
              initial={{ opacity: 0, scale: 0.9, rotateX: 45 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              exit={{ opacity: 0, scale: 1.1, rotateX: -45 }}
              transition={{ type: "spring", damping: 10 }}
              className="max-w-2xl mx-auto px-6 py-20 text-center"
            >
              <div className="w-32 h-32 bg-red-500/10 rounded-full flex items-center justify-center text-6xl mx-auto mb-10 border border-red-500/20 shadow-[0_0_50px_rgba(239,68,68,0.2)]">
                ❌
              </div>
              <h2 className="text-5xl font-black mb-6 text-red-500 tracking-tight">Account Rejected</h2>
              <p className="text-2xl text-gray-300 mb-10 font-light">
                माफ गर्नुहोला <span className="text-white font-bold">{currentUser?.fullName}</span>, <br />
                तपाईंको एकाउन्ट प्रमाणित हुन सकेन।
              </p>
              <div className="glass p-10 rounded-[2.5rem] border border-red-500/20 bg-red-500/5 mb-12">
                <p className="text-gray-300 text-lg leading-relaxed">
                  तपाईंको डकुमेन्ट स्पष्ट नभएको वा भुक्तानीमा समस्या देखिएकोले दर्ता अस्वीकृत गरिएको हो। 
                  थप जानकारीको लागि कृपया हाम्रो सपोर्ट टिमलाई सम्पर्क गर्नुहोला।
                </p>
              </div>
              <button 
                onClick={() => setAppState(AppState.HOME)}
                className="px-12 py-5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full font-bold transition-all hover:scale-105 active:scale-95"
              >
                Back to Home
              </button>
            </motion.div>
          )}

          {appState === AppState.MATCHING && currentUser && (
            <motion.div 
              key="matching"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-6xl mx-auto px-6 py-10"
            >
              <MatchingEngine currentUser={currentUser} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
};

const StepCard: React.FC<{icon: string, title: string, desc: string}> = ({ icon, title, desc }) => (
  <motion.div 
    whileHover={{ y: -10, scale: 1.02 }}
    className="glass p-8 rounded-3xl border border-white/10 hover:border-purple-500/50 transition-all group relative overflow-hidden cursor-default"
  >
    <div className="absolute -right-4 -bottom-4 text-8xl opacity-5 group-hover:opacity-20 transition-all duration-500 group-hover:rotate-12">{icon}</div>
    <div className="relative z-10">
      <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center text-4xl mb-6 group-hover:bg-purple-500/20 transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 group-hover:text-purple-400 transition-colors">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
    </div>
    <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-purple-600 to-pink-600 w-0 group-hover:w-full transition-all duration-500"></div>
  </motion.div>
);

export default App;
