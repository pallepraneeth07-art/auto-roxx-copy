import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const whatsappUrl = `https://wa.me/918143448598?text=${encodeURIComponent('Hi Auto Roxx! I would like to inquire about your car care services.')}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1.5, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 group"
    >
      {/* Tooltip */}
      <span className="hidden group-hover:block px-3 py-1.5 bg-[#1A1A1C] text-white text-xs font-medium rounded-lg border border-white/10 whitespace-nowrap">
        Direct Link to Pit Crew
      </span>

      {/* Button */}
      <div className="relative">
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
        {/* Main button */}
        <div className="relative w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg shadow-[#25D366]/30">
          <MessageCircle className="w-6 h-6 text-white" />
          {/* Red status dot */}
          <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-primary rounded-full border-2 border-background pulse-dot" />
        </div>
      </div>
    </motion.a>
  );
}