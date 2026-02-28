
import React, { useRef } from 'react';

interface FileUploadProps {
  label: string;
  onUpload: (url: string) => void;
  value: string | null;
  icon: string;
  description: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ label, onUpload, value, icon, description }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, we would upload to Firebase Storage or similar
      // For this demo, we'll create a local URL
      const url = URL.createObjectURL(file);
      onUpload(url);
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-300">{label}</label>
      <div 
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed p-8 rounded-2xl cursor-pointer transition-all flex flex-col items-center justify-center text-center ${value ? 'border-emerald-500 bg-emerald-500/10' : 'border-white/10 hover:border-purple-500/50 hover:bg-white/5'}`}
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          className="hidden" 
          accept="image/*"
        />
        {value ? (
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-lg overflow-hidden mb-3 border border-emerald-500/50">
              <img src={value} alt="Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <span className="text-xl">✅</span> Uploaded
            </span>
            <button 
              type="button" 
              onClick={(e) => { e.stopPropagation(); onUpload(''); }}
              className="text-xs text-gray-500 mt-2 hover:text-red-400 underline"
            >
              Change Photo
            </button>
          </div>
        ) : (
          <>
            <span className="text-4xl mb-3">{icon}</span>
            <p className="font-bold text-gray-300">{description}</p>
            <p className="text-xs text-gray-400 mt-1">Tap to select or drag & drop</p>
          </>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
