
import React, { useRef, useState } from 'react';
import { Loader2, UploadCloud } from 'lucide-react';

interface FileUploadProps {
  label: string;
  onUpload: (url: string) => void;
  value: string | null;
  icon: string;
  description: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ label, onUpload, value, icon, description }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 1200;
          const MAX_HEIGHT = 1200;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          
          // Compress to JPEG with 0.7 quality
          const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
          resolve(dataUrl);
        };
        img.onerror = reject;
      };
      reader.onerror = reject;
    });
  };

  const processFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert("Please select an image file.");
      return;
    }

    // Support up to 5MB
    if (file.size > 5 * 1024 * 1024) {
      alert("File is too large. Please select an image under 5MB.");
      return;
    }

    setIsCompressing(true);
    try {
      const compressedBase64 = await compressImage(file);
      onUpload(compressedBase64);
    } catch (error) {
      console.error("Compression error:", error);
      alert("Error processing image. Please try again.");
    } finally {
      setIsCompressing(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
      // Reset input so the same file can be picked again if needed
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-300">{label}</label>
      <div 
        onClick={() => !isCompressing && fileInputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed p-8 rounded-2xl cursor-pointer transition-all flex flex-col items-center justify-center text-center relative overflow-hidden
          ${value ? 'border-emerald-500 bg-emerald-500/10' : 'border-white/10 hover:border-purple-500/50 hover:bg-white/5'}
          ${isDragging ? 'border-purple-500 bg-purple-500/10 scale-[1.02]' : ''}
          ${isCompressing ? 'cursor-wait opacity-80' : ''}
        `}
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          className="hidden" 
          accept="image/*"
        />

        {isCompressing && (
          <div className="absolute inset-0 bg-[#05020a]/60 backdrop-blur-sm flex flex-col items-center justify-center z-20">
            <Loader2 className="w-8 h-8 text-purple-500 animate-spin mb-2" />
            <p className="text-xs font-bold text-white uppercase tracking-widest">Compressing...</p>
          </div>
        )}

        {value ? (
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-xl overflow-hidden mb-4 border-2 border-emerald-500 shadow-lg shadow-emerald-500/20">
              <img src={value} alt="Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <span className="text-emerald-400 font-bold flex items-center gap-2">
              <span className="text-xl">✅</span> Uploaded & Compressed
            </span>
            <button 
              type="button" 
              onClick={(e) => { e.stopPropagation(); onUpload(''); }}
              className="text-xs text-gray-500 mt-3 hover:text-red-400 underline transition-colors"
            >
              Remove & Change Photo
            </button>
          </div>
        ) : (
          <>
            <div className={`w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-4 transition-transform ${isDragging ? 'scale-110' : ''}`}>
              {isDragging ? <UploadCloud className="w-8 h-8 text-purple-400" /> : <span className="text-4xl">{icon}</span>}
            </div>
            <p className="font-bold text-gray-200 text-lg">{description}</p>
            <p className="text-xs text-gray-500 mt-2 max-w-[200px] leading-relaxed">
              Drag and drop your photo here, or <span className="text-purple-400 font-bold">click to browse</span>.
            </p>
            <p className="text-[10px] text-gray-600 mt-4 uppercase tracking-tighter">Max size: 5MB • Auto-compressed</p>
          </>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
