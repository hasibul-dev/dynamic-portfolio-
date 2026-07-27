import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { WHATSAPP_NUMBER } from '@/constants/config';

export const WhatsAppButton: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, '')}?text=Hello%2C%20I%20would%20like%20to%20discuss%20a%20project%20with%20you.`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-40 group"
      title="Contact on WhatsApp"
      aria-label="Contact on WhatsApp"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Tooltip */}
      {isHovered && (
        <div className="absolute bottom-full right-0 mb-4 px-4 py-2 bg-[#0D0D0D] text-white text-sm rounded-lg whitespace-nowrap shadow-lg animate-slideUp border border-[#7CFF00]/30">
          Chat with us on WhatsApp
          <div className="absolute -bottom-1 right-4 w-2 h-2 bg-[#0D0D0D] transform rotate-45 border-r border-b border-[#7CFF00]/30"></div>
        </div>
      )}

      {/* Button */}
      <div className="relative">
        {/* Pulse ring effect */}
        <div className="absolute inset-0 bg-[#7CFF00] rounded-full animate-pulse opacity-20"></div>
        <div className="absolute inset-1 bg-[#7CFF00] rounded-full animate-pulse opacity-40" style={{ animationDelay: '0.5s' }}></div>

        {/* Main button */}
        <button className="relative w-16 h-16 bg-gradient-to-br from-[#7CFF00] to-[#39FF14] hover:from-[#76FF03] hover:to-[#7CFF00] rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl hover:shadow-[#7CFF00]/50 transform hover:scale-110 transition-all duration-300 group">
          <MessageCircle size={28} className="text-black group-hover:rotate-12 transition-transform" />
        </button>
      </div>
    </a>
  );
};
