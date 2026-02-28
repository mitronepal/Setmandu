
import React, { useState } from 'react';
import { Phone, Mail, MapPin, MessageCircle, Shield, FileText, Heart } from 'lucide-react';
import PrivacyPolicy from './PrivacyPolicy';
import TermsAndConditions from './TermsAndConditions';
import { motion, AnimatePresence } from 'framer-motion';

const Footer: React.FC = () => {
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  return (
    <footer className="glass border-t border-white/10 px-6 py-20 mt-20 relative z-10 overflow-hidden">
      {/* Decorative Background Glow */}
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
        <div className="flex flex-col items-center md:items-start gap-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center font-black text-xl shadow-xl shadow-purple-500/20">S</div>
            <span className="text-3xl font-black rose-gold-text tracking-tighter">Setmandu</span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed text-center md:text-left font-medium">
            Nepal's Digital Bihe Center | #Setmandu <br />
            सुरक्षित र भरपर्दो जीवनसाथीको खोजी <br />
            नेपालको पहिलो डिजिटल म्याट्रिमोनी सेवा
          </p>
          <div className="flex items-center gap-4">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-purple-600 transition-all hover:scale-110 border border-white/10">
              <span className="text-xs font-bold">FB</span>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-pink-600 transition-all hover:scale-110 border border-white/10">
              <span className="text-xs font-bold">IG</span>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-500 transition-all hover:scale-110 border border-white/10">
              <span className="text-xs font-bold">TW</span>
            </a>
          </div>
        </div>

        <div className="flex flex-col items-center md:items-start gap-6">
          <h4 className="text-lg font-bold text-white flex items-center gap-2">
            <Shield className="w-5 h-5 text-purple-400" />
            Quick Links
          </h4>
          <div className="flex flex-col items-center md:items-start gap-4">
            <button onClick={() => setShowPrivacy(true)} className="text-gray-500 hover:text-purple-400 transition-colors text-sm font-medium flex items-center gap-2 group">
              <div className="w-1.5 h-1.5 bg-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              Privacy Policy
            </button>
            <button onClick={() => setShowTerms(true)} className="text-gray-500 hover:text-purple-400 transition-colors text-sm font-medium flex items-center gap-2 group">
              <div className="w-1.5 h-1.5 bg-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              Terms of Service
            </button>
            <a href="#contact" className="text-gray-500 hover:text-purple-400 transition-colors text-sm font-medium flex items-center gap-2 group">
              <div className="w-1.5 h-1.5 bg-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              Contact Us
            </a>
          </div>
        </div>

        <div className="flex flex-col items-center md:items-start gap-6" id="contact">
          <h4 className="text-lg font-bold text-white flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-emerald-400" />
            Contact Info
          </h4>
          <div className="flex flex-col items-center md:items-start gap-4">
            <a href="https://wa.me/9779863821349" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-gray-500 hover:text-emerald-400 transition-colors group">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                <Phone className="w-5 h-5 text-emerald-500" />
              </div>
              <div className="text-sm">
                <p className="font-bold text-white">WhatsApp</p>
                <p>+977-9863821349</p>
              </div>
            </a>
            <div className="flex items-center gap-3 text-gray-500 group">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
                <Mail className="w-5 h-5 text-purple-500" />
              </div>
              <div className="text-sm">
                <p className="font-bold text-white">Email</p>
                <p>support@setmandu.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center md:items-start gap-6">
          <h4 className="text-lg font-bold text-white flex items-center gap-2">
            <MapPin className="w-5 h-5 text-pink-400" />
            Location
          </h4>
          <div className="flex items-center gap-3 text-gray-500 group">
            <div className="w-10 h-10 rounded-xl bg-pink-500/10 flex items-center justify-center group-hover:bg-pink-500/20 transition-colors">
              <MapPin className="w-5 h-5 text-pink-500" />
            </div>
            <div className="text-sm">
              <p className="font-bold text-white">Office</p>
              <p>Kathmandu, Nepal</p>
            </div>
          </div>
          <div className="mt-4 p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-gray-500 leading-relaxed italic">
            "नेपालको पहिलो डिजिटल म्याट्रिमोनी सेवा - जहाँ विश्वास र प्रविधि जोडिन्छन्।"
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-gray-600 text-xs font-bold tracking-widest uppercase">
        <div>© {new Date().getFullYear()} Setmandu Matrimony. Built with ❤️ for Nepal.</div>
        <div className="flex items-center gap-2">
          <Heart className="w-3 h-3 text-red-500 animate-pulse" />
          #Setmandu #DigitalBiheCenter
        </div>
      </div>

      <AnimatePresence>
        {showPrivacy && <PrivacyPolicy onClose={() => setShowPrivacy(false)} />}
        {showTerms && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#05020a]/90 backdrop-blur-xl overflow-y-auto">
            <div className="w-full max-w-4xl my-auto">
              <TermsAndConditions onAccept={() => setShowTerms(false)} />
            </div>
          </div>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default Footer;
