
import React from 'react';

interface NavigationProps {
  onHome: () => void;
  onRegister: () => void;
  onLogin: () => void;
  isLoggedIn: boolean;
  onLogout: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ onHome, onRegister, onLogin, isLoggedIn, onLogout }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer group" onClick={onHome}>
          <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center text-xl font-bold group-hover:bg-purple-500 transition-colors shadow-lg shadow-purple-500/30">
            S
          </div>
          <span className="text-2xl font-bold tracking-tight rose-gold-text">Setmandu</span>
        </div>
        
        <div className="flex items-center gap-4">
          <button onClick={onHome} className="hidden md:block text-white/70 hover:text-white font-medium transition-colors">
            Home
          </button>
          
          {!isLoggedIn ? (
            <>
              <button onClick={onLogin} className="text-white/70 hover:text-white font-medium transition-colors">
                Login
              </button>
              <button 
                onClick={onRegister}
                className="px-6 py-2 bg-purple-600 hover:bg-purple-500 rounded-full font-bold transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-purple-500/20"
              >
                Join Now
              </button>
            </>
          ) : (
            <button 
              onClick={onLogout}
              className="px-6 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full font-bold transition-all"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
