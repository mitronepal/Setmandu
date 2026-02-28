
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, FileText, X } from 'lucide-react';

interface PrivacyPolicyProps {
  onClose: () => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onClose }) => {
  const policies = [
    {
      icon: <Lock className="w-6 h-6 text-purple-400" />,
      title: 'डाटा सुरक्षा (Data Security)',
      desc: 'तपाईंको सबै व्यक्तिगत जानकारी र कागजातहरू हाम्रो सुरक्षित सर्भरमा इन्क्रिप्टेड रूपमा राखिन्छ। हामी तपाईंको अनुमति बिना कसैलाई पनि तपाईंको डाटा दिँदैनौं।',
    },
    {
      icon: <Eye className="w-6 h-6 text-emerald-400" />,
      title: 'प्रोफाइल दृश्यता (Profile Visibility)',
      desc: 'तपाईंको प्रोफाइल केवल प्रमाणित (Verified) प्रयोगकर्ताहरूले मात्र देख्न सक्छन्। अपुष्ट वा फेक प्रयोगकर्ताहरूबाट तपाईंको जानकारी सुरक्षित रहन्छ।',
    },
    {
      icon: <FileText className="w-6 h-6 text-pink-400" />,
      title: 'कागजातको प्रयोग (Use of Documents)',
      desc: 'तपाईंले अपलोड गर्नुभएको नागरिकता र भुक्तानीको फोटो केवल तपाईंको पहिचान पुष्टि गर्नको लागि मात्र प्रयोग गरिन्छ। यो सार्वजनिक रूपमा कहिल्यै देखाइने छैन।',
    },
    {
      icon: <Shield className="w-6 h-6 text-amber-400" />,
      title: 'गोपनीयता नियन्त्रण (Privacy Control)',
      desc: 'तपाईंले जुनसुकै बेला आफ्नो प्रोफाइल लुकाउन वा हटाउन सक्नुहुन्छ। तपाईंको गोपनीयता हाम्रो पहिलो प्राथमिकता हो।',
    },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#05020a]/90 backdrop-blur-xl"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="glass w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-[2.5rem] border border-white/10 p-8 md:p-12 relative"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-black mb-4 rose-gold-text">Privacy Policy</h2>
          <p className="text-gray-400">गोपनीयता नीति - तपाईंको डाटा हाम्रो जिम्मेवारी</p>
        </div>

        <div className="space-y-6 mb-8">
          {policies.map((policy, index) => (
            <div key={index} className="flex gap-5 p-5 rounded-2xl bg-white/5 border border-white/5">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                {policy.icon}
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">{policy.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{policy.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button 
            onClick={onClose}
            className="px-10 py-3 bg-purple-600 hover:bg-purple-500 rounded-full font-bold transition-all"
          >
            I Understand
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PrivacyPolicy;
