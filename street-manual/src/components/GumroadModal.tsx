import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, ExternalLink, X } from 'lucide-react';

interface GumroadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSimulateUnlockAll?: () => void;
}

export default function GumroadModal({ isOpen, onClose }: GumroadModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/95"
          onClick={onClose}
        />

        {/* Modal body */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-md bg-[#161616] border border-[#222222] text-white p-8 rounded-2xl shadow-2xl z-10"
        >
          {/* Close button */}
          <button
            id="close-gumroad-btn"
            onClick={onClose}
            className="absolute top-6 right-6 text-[#888888] hover:text-white transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex flex-col items-center text-center">
            <div className="bg-[#C0392B]/10 p-3 rounded-full border border-[#C0392B]/30 text-[#C0392B] mb-5">
              <ShoppingCart className="h-6 w-6" />
            </div>

            <h3 className="text-2xl font-black uppercase tracking-tight mb-2">
              Gumroad Store
            </h3>
            
            <p className="text-[#888888] font-mono text-xs mb-6">
              Complete your order
            </p>

            <p className="text-sm text-[#cccccc] leading-relaxed mb-8">
              Unlock Luke's official high-resolution PDF field guide and complete digital toolkit. Expand your street photography creative process with 140+ bespoke challenges, detailed techniques, and curated routes.
            </p>

            {/* Checkout Buttons */}
            <div className="flex flex-col gap-3.5 w-full">
              <a
                id="gumroad-purchase-btn"
                href="https://lukesphotos.gumroad.com/l/streetmanual"
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="w-full flex items-center justify-center gap-2 bg-emerald-500 text-black hover:bg-emerald-400 font-black uppercase text-xs tracking-widest py-3.5 px-6 rounded-xl transition-all cursor-pointer"
              >
                <ShoppingCart className="h-4 w-4" />
                <span>Purchase on Gumroad</span>
              </a>

              <a
                id="visit-lukes-photos"
                href="https://lukes.photos"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-transparent text-white border border-[#333333] hover:border-white font-black uppercase text-xs tracking-widest py-3.5 px-6 rounded-xl transition-all"
              >
                <span>Visit lukes.photos</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
