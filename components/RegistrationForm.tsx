
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserProfile } from '../types';
import { db } from '../firebaseConfig';
import FileUpload from './FileUpload';
import TermsAndConditions from './TermsAndConditions';
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';

interface RegistrationFormProps {
  onComplete: (userData: UserProfile) => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0); // Step 0 is Terms & Conditions
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [citizenshipPhoto, setCitizenshipPhoto] = useState<string | null>(null);
  const [paymentScreenshot, setPaymentScreenshot] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'esewa' | 'khalti' | 'bank'>('esewa');
  
  const [emailStatus, setEmailStatus] = useState<'idle' | 'checking' | 'available' | 'taken'>('idle');
  const [emailError, setEmailError] = useState('');

  const [formData, setFormData] = useState<Partial<UserProfile>>({
    gender: 'male',
    age: 25,
    countryResidence: 'Nepal',
    isVerified: false,
    isPaid: false,
    preferredAgeRange: '22-28',
    preferredCountry: 'Any',
    preferredCasteCommunity: 'Any'
  });

  const checkEmailAvailability = async (email: string) => {
    if (!email || !email.includes('@')) return;
    
    setEmailStatus('checking');
    try {
      const allUsers = await db.getUsers() as UserProfile[];
      const exists = allUsers.some(u => u.email.toLowerCase() === email.toLowerCase());
      if (exists) {
        setEmailStatus('taken');
        setEmailError('यो इमेल पहिले नै प्रयोग भइसकेको छ।');
      } else {
        setEmailStatus('available');
        setEmailError('');
      }
    } catch (error) {
      console.error("Email check error:", error);
      setEmailStatus('idle');
    }
  };

  useEffect(() => {
    if (formData.email && step === 1) {
      const timer = setTimeout(() => checkEmailAvailability(formData.email!), 800);
      return () => clearTimeout(timer);
    }
  }, [formData.email]);

  const nextStep = () => {
    if (step === 1 && emailStatus === 'taken') {
      alert("कृपया अर्को इमेल प्रयोग गर्नुहोला।");
      return;
    }
    setStep(s => s + 1);
  };

  const prevStep = () => setStep(s => s - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 5) {
      nextStep();
    } else {
      if (!profilePhoto || !citizenshipPhoto || !paymentScreenshot) {
        alert("Please upload all required photos (Profile, Citizenship, and Payment Screenshot).");
        return;
      }
      
      setIsSubmitting(true);
      try {
        // Check if email already exists
        const allUsers = await db.getUsers() as UserProfile[];
        const existingUser = allUsers.find(u => u.email === formData.email);
        
        if (existingUser) {
          alert("यो इमेल पहिले नै प्रयोग भइसकेको छ। कृपया अर्को इमेल प्रयोग गर्नुहोला।");
          setIsSubmitting(false);
          return;
        }

        const uid = Math.random().toString(36).substring(7);
        const fullData: UserProfile = {
          ...(formData as UserProfile),
          uid,
          recentPhotoURL: profilePhoto,
          citizenshipPhotoURL: citizenshipPhoto,
          paymentScreenshotURL: paymentScreenshot,
          registrationDate: new Date().toISOString(),
          isVerified: false,
          verificationStatus: 'pending',
          isPaid: true,
          paymentMethod: paymentMethod,
        };
        
        await db.saveUser(uid, fullData);
        alert("बधाई छ! तपाईंको दर्ता सफल भयो। अब हाम्रो टिमले तपाईंको एकाउन्ट भेरिफाई गर्नेछ।");
        onComplete(fullData);
      } catch (error) {
        console.error("Registration error:", error);
        alert("दर्ता गर्दा समस्या भयो। कृपया फेरि प्रयास गर्नुहोला।");
        setIsSubmitting(false);
      }
    }
  };

  const updateField = (field: keyof UserProfile, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (step === 0) {
    return <TermsAndConditions onAccept={nextStep} />;
  }

  return (
    <div className="relative">
      {isSubmitting && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0f071a]/90 backdrop-blur-md animate-fadeIn">
          <div className="relative mb-8">
            <div className="w-24 h-24 border-4 border-purple-600/10 rounded-full"></div>
            <div className="absolute inset-0 w-24 h-24 border-t-4 border-purple-500 rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center text-3xl">💖</div>
          </div>
          <h3 className="text-3xl font-bold rose-gold-text mb-2">दर्ता हुँदैछ...</h3>
          <p className="text-gray-400 animate-pulse">कृपया केही समय पर्खनुहोला, तपाईंको प्रोफाइल सुरक्षित गरिँदैछ।</p>
        </div>
      )}

      <div className="glass p-8 md:p-12 rounded-3xl shadow-2xl relative overflow-hidden transition-all duration-500 border border-white/10">
      <div className="absolute top-0 left-0 w-full h-1.5 bg-white/5">
        <div 
          className="h-full bg-gradient-to-r from-purple-600 to-pink-500 transition-all duration-700 ease-out" 
          style={{ width: `${(step / 5) * 100}%` }}
        ></div>
      </div>

      <div className="mb-10 flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold rose-gold-text">Step {step} of 5</h2>
          <p className="text-gray-400 text-sm mt-1">
            {step === 1 && "Account & Personal Details • खाता र व्यक्तिगत विवरण"}
            {step === 2 && "Background • पृष्ठभूमि"}
            {step === 3 && "Preferences • प्राथमिकताहरू"}
            {step === 4 && "Document Upload • कागजात अपलोड"}
            {step === 5 && "Payment Verification • भुक्तानी र प्रमाण"}
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-mono text-purple-400">{Math.round((step / 5) * 100)}%</div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Full Name (पूरा नाम)</label>
                <input required type="text" value={formData.fullName || ''} onChange={e => updateField('fullName', e.target.value)} placeholder="e.g. Rajesh Hamal" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 focus:border-purple-500 outline-none transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Email Address (इमेल)</label>
                <div className="relative">
                  <input 
                    required 
                    type="email" 
                    value={formData.email || ''} 
                    onChange={e => updateField('email', e.target.value)} 
                    placeholder="example@gmail.com" 
                    className={`w-full bg-white/5 border rounded-xl px-4 py-3.5 focus:border-purple-500 outline-none transition-all ${emailStatus === 'taken' ? 'border-red-500' : 'border-white/10'}`} 
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    {emailStatus === 'checking' && <Loader2 className="w-5 h-5 text-purple-400 animate-spin" />}
                    {emailStatus === 'available' && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                    {emailStatus === 'taken' && <AlertCircle className="w-5 h-5 text-red-500" />}
                  </div>
                </div>
                {emailError && <p className="text-xs text-red-500 mt-1">{emailError}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Password (पासवर्ड)</label>
                <input required type="password" value={formData.password || ''} onChange={e => updateField('password', e.target.value)} placeholder="••••••••" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 focus:border-purple-500 outline-none transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Age (उमेर)</label>
                <input required type="number" min="18" max="75" value={formData.age || 25} onChange={e => updateField('age', parseInt(e.target.value))} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 focus:border-purple-500 outline-none transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Gender (लिंग)</label>
                <div className="flex gap-4">
                  {['male', 'female'].map(g => (
                    <button key={g} type="button" onClick={() => updateField('gender', g)} className={`flex-1 py-3 rounded-xl border transition-all capitalize font-medium ${formData.gender === g ? 'bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-500/20' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'}`}>
                      {g}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Height (उचाई)</label>
                <input required type="text" value={formData.height || ''} onChange={e => updateField('height', e.target.value)} placeholder="e.g. 5 feet 10 inches" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 focus:border-purple-500 outline-none transition-all" />
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Caste / Community (जात)</label>
                <input required type="text" value={formData.casteEthnicity || ''} onChange={e => updateField('casteEthnicity', e.target.value)} placeholder="e.g. Chhetri" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 focus:border-purple-500 outline-none transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Occupation (पेशा)</label>
                <input required type="text" value={formData.occupation || ''} onChange={e => updateField('occupation', e.target.value)} placeholder="e.g. Software Engineer" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 focus:border-purple-500 outline-none transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Education (शिक्षा)</label>
                <input required type="text" value={formData.education || ''} onChange={e => updateField('education', e.target.value)} placeholder="e.g. MBA" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 focus:border-purple-500 outline-none transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">District (जिल्ला)</label>
                <input required type="text" value={formData.district || ''} onChange={e => updateField('district', e.target.value)} placeholder="e.g. Kathmandu" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 focus:border-purple-500 outline-none transition-all" />
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div 
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Preferred Age Range</label>
                <input required type="text" value={formData.preferredAgeRange || ''} onChange={e => updateField('preferredAgeRange', e.target.value)} placeholder="22-28" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 focus:border-purple-500 outline-none transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Partner Gender</label>
                <select className="w-full bg-[#0f071a] border border-white/10 rounded-xl px-4 py-3.5 outline-none focus:border-purple-500 transition-all" value={formData.preferredPartnerGender || (formData.gender === 'male' ? 'female' : 'male')} onChange={e => updateField('preferredPartnerGender', e.target.value)}>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div 
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              <FileUpload 
                label="Profile Photo (प्रोफाइल फोटो)"
                icon="👤"
                description="Upload your recent clear photo"
                value={profilePhoto}
                onUpload={setProfilePhoto}
              />
              <FileUpload 
                label="Citizenship Photo (नागरिकताको फोटो)"
                icon="🆔"
                description="Front side of your citizenship"
                value={citizenshipPhoto}
                onUpload={setCitizenshipPhoto}
              />
            </motion.div>
          )}

          {step === 5 && (
            <motion.div 
              key="step5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-2">Registration Fee: Rs. 2,000</h3>
                <p className="text-gray-400 text-sm">Please pay the amount and upload the screenshot below.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex gap-2">
                    {(['esewa', 'khalti', 'bank'] as const).map(m => (
                      <button 
                        key={m}
                        type="button"
                        onClick={() => setPaymentMethod(m)}
                        className={`flex-1 py-2 px-4 rounded-xl border text-xs font-bold uppercase transition-all ${paymentMethod === m ? 'bg-white/10 border-purple-500 text-white' : 'bg-white/5 border-white/10 text-gray-500'}`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>

                  <div className="glass p-6 rounded-2xl border border-purple-500/20 bg-purple-500/5">
                    {paymentMethod === 'esewa' && (
                      <div className="space-y-4 text-center">
                        <div className="w-32 h-32 bg-white mx-auto rounded-xl p-2">
                          <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=esewa_payment_9800000000" alt="eSewa QR" className="w-full h-full" referrerPolicy="no-referrer" />
                        </div>
                        <div>
                          <p className="text-emerald-400 font-bold">eSewa ID: 9800000000</p>
                          <p className="text-xs text-gray-400">Name: Setmandu Matrimonial</p>
                        </div>
                      </div>
                    )}
                    {paymentMethod === 'khalti' && (
                      <div className="space-y-4 text-center">
                        <div className="w-32 h-32 bg-white mx-auto rounded-xl p-2">
                          <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=khalti_payment_9811111111" alt="Khalti QR" className="w-full h-full" referrerPolicy="no-referrer" />
                        </div>
                        <div>
                          <p className="text-purple-400 font-bold">Khalti ID: 9811111111</p>
                          <p className="text-xs text-gray-400">Name: Setmandu Matrimonial</p>
                        </div>
                      </div>
                    )}
                    {paymentMethod === 'bank' && (
                      <div className="space-y-4 text-center">
                        <div className="w-32 h-32 bg-white mx-auto rounded-xl p-2">
                          <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=bank_transfer_details" alt="Bank QR" className="w-full h-full" referrerPolicy="no-referrer" />
                        </div>
                        <div className="text-sm space-y-1">
                          <p className="font-bold">NIC Asia Bank</p>
                          <p className="text-gray-300">Acc No: 123456789012345</p>
                          <p className="text-xs text-gray-400">Name: Setmandu Matrimonial Pvt Ltd</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <FileUpload 
                  label="Payment Screenshot (भुक्तानीको स्क्रीनशट)"
                  icon="📸"
                  description="Upload the payment confirmation"
                  value={paymentScreenshot}
                  onUpload={setPaymentScreenshot}
                />
              </div>

              <div className="flex items-center gap-4 p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl">
                <span className="text-2xl">🛡️</span>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Your profile will be activated within <span className="text-emerald-400 font-bold">2-4 hours</span> after our team verifies your payment and documents.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center justify-between pt-6">
          {step > 1 && (
            <button type="button" onClick={prevStep} className="px-8 py-3.5 rounded-full font-bold text-white/40 hover:text-white transition-colors">
              Back
            </button>
          )}
          <button 
            type="submit" 
            disabled={isSubmitting || (step === 4 && (!profilePhoto || !citizenshipPhoto)) || (step === 5 && !paymentScreenshot)}
            className={`px-12 py-3.5 rounded-full font-bold transition-all transform hover:scale-105 ml-auto shadow-xl ${isSubmitting ? 'opacity-50' : 'bg-purple-600 shadow-purple-500/30 hover:bg-purple-500'}`}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (step === 5 ? 'Complete Registration 💖' : 'Next Step')}
          </button>
        </div>
      </form>
    </div>
  </div>
);
};

export default RegistrationForm;
