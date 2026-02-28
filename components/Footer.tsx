
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="glass border-t border-white/10 px-6 py-16 mt-20 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="flex flex-col items-center md:items-start gap-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center font-bold text-lg shadow-lg shadow-purple-500/20">S</div>
            <span className="text-2xl font-bold rose-gold-text">Setmandu</span>
          </div>
          <p className="text-gray-500 text-sm max-w-xs text-center md:text-left">
            Nepal's most trusted premium matrimonial platform for serious life partners.
          </p>
        </div>
        
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-8">
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Contact Us</a>
          </div>
          <div className="text-gray-600 text-xs tracking-widest uppercase">
            © {new Date().getFullYear()} Setmandu Matrimony. Built with ❤️ for Nepal.
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">FB</div>
          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">IG</div>
          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">TW</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
