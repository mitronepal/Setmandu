
import React, { useState } from 'react';
import { UserProfile } from '../types';
import { db } from '../firebaseConfig';

interface LoginFormProps {
  onComplete: (userData: UserProfile) => void;
  onSwitchToRegister: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onComplete, onSwitchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const allUsers = await db.getUsers() as UserProfile[];
      const user = allUsers.find(u => u.email === email && u.password === password);

      if (user) {
        onComplete(user);
      } else {
        alert("इमेल वा पासवर्ड मिलेन। कृपया फेरि प्रयास गर्नुहोला।");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("लगइन गर्दा समस्या भयो।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      {loading && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0f071a]/90 backdrop-blur-md animate-fadeIn">
          <div className="relative mb-8">
            <div className="w-20 h-20 border-4 border-purple-600/10 rounded-full"></div>
            <div className="absolute inset-0 w-20 h-20 border-t-4 border-purple-500 rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center text-2xl">🔍</div>
          </div>
          <h3 className="text-2xl font-bold rose-gold-text mb-2">प्रोफाइल चेक हुँदैछ...</h3>
          <p className="text-gray-400 animate-pulse">कृपया एकछिन पर्खनुहोस्, हामी तपाईंको विवरण रुजु गर्दैछौं।</p>
        </div>
      )}

      <div className="glass p-8 md:p-10 rounded-3xl shadow-2xl animate-fadeIn">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold rose-gold-text mb-2">Welcome Back</h2>
        <p className="text-gray-400">पहिले नै दर्ता भएका प्रयोगकर्ताहरूका लागि</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-400">Email Address (इमेल)</label>
          <input 
            required 
            type="email" 
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 focus:border-purple-500 outline-none transition-all" 
            placeholder="example@gmail.com"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-400">Password (पासवर्ड)</label>
          <input 
            required 
            type="password" 
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 focus:border-purple-500 outline-none transition-all" 
            placeholder="••••••••"
          />
        </div>

        <div className="flex justify-end">
          <a href="#" className="text-xs text-purple-400 hover:text-purple-300">Forgot Password?</a>
        </div>

        <button 
          disabled={loading}
          type="submit" 
          className="w-full py-4 bg-purple-600 hover:bg-purple-500 rounded-xl font-bold transition-all shadow-lg shadow-purple-500/30"
        >
          {loading ? 'Logging in...' : 'Login to Setmandu 💖'}
        </button>
      </form>

      <div className="mt-8 text-center text-sm text-gray-500">
        Don't have an account? <button onClick={onSwitchToRegister} className="text-purple-400 font-bold hover:underline">Register Now</button>
      </div>
    </div>
  </div>
);
};

export default LoginForm;
