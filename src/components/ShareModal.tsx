import React, { useState } from 'react';
import { VideoItem, ShortItem } from '../types.ts';

interface ShareModalProps {
  isOpen: boolean;
  item: VideoItem | ShortItem | null;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, item, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !item) return null;

  const shareUrl = `https://streamflix.app/v/${item.id}`;

  const handleCopy = () => {
    navigator.clipboard?.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareTargets = [
    { name: 'Copy Link', icon: 'link', color: 'bg-white/10 text-white', action: handleCopy },
    { name: 'WhatsApp', icon: 'chat', color: 'bg-emerald-500/20 text-emerald-400', action: handleCopy },
    { name: 'X / Twitter', icon: 'share', color: 'bg-sky-500/20 text-sky-400', action: handleCopy },
    { name: 'Messages', icon: 'sms', color: 'bg-blue-500/20 text-blue-400', action: handleCopy },
    { name: 'Email', icon: 'mail', color: 'bg-purple-500/20 text-purple-400', action: handleCopy },
  ];

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex flex-col justify-end"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg mx-auto bg-[#201f1f] rounded-t-3xl shadow-2xl border-t border-white/10 p-4 pb-8 animate-slide-up"
      >
        <div className="w-10 h-1 bg-[#3a3939] rounded-full mx-auto mb-3"></div>

        <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
          <h3 className="text-[17px] font-bold text-[#F1F1F1]">Share</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#AAAAAA] hover:text-white"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Share Targets Row */}
        <div className="flex items-center gap-4 overflow-x-auto py-4 no-scrollbar">
          {shareTargets.map((t) => (
            <button
              key={t.name}
              onClick={t.action}
              className="flex flex-col items-center gap-1.5 flex-shrink-0 cursor-pointer active:scale-95 transition-transform"
            >
              <div
                className={`w-12 h-12 rounded-full ${t.color} flex items-center justify-center border border-white/10`}
              >
                <span className="material-symbols-outlined text-[22px]">{t.icon}</span>
              </div>
              <span className="text-[11px] text-[#AAAAAA]">{t.name}</span>
            </button>
          ))}
        </div>

        {/* URL Pill & Copy Button */}
        <div className="mt-2 flex items-center bg-[#2a2a2a] rounded-full p-1.5 pl-3 border border-white/10">
          <span className="flex-1 text-xs text-[#AAAAAA] truncate">{shareUrl}</span>
          <button
            onClick={handleCopy}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all shadow ${
              copied
                ? 'bg-emerald-500 text-white'
                : 'bg-[#ff5540] text-white hover:bg-[#ff6552]'
            }`}
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>
    </div>
  );
};
