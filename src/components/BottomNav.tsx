import React from 'react';
import { NavTab } from '../types.ts';

interface BottomNavProps {
  currentTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  onCreateClick: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onTabChange,
  onCreateClick,
}) => {
  return (
    <nav className="fixed bottom-0 w-full z-40 bg-[#131313]/95 backdrop-blur-2xl shadow-[0_-1px_12px_rgba(0,0,0,0.5)] border-t border-white/[0.06]">
      <div className="h-14 px-3 flex items-center justify-around max-w-lg mx-auto">
        {/* Home Tab */}
        <button
          onClick={() => onTabChange('home')}
          className={`flex flex-col items-center justify-center min-w-[56px] h-12 transition-all active:scale-95 ${
            currentTab === 'home'
              ? 'text-[#F1F1F1] font-bold'
              : 'text-[#AAAAAA] hover:text-[#F1F1F1]'
          }`}
          aria-label="Home"
        >
          <span
            className="material-symbols-outlined text-[24px]"
            style={{ fontVariationSettings: currentTab === 'home' ? "'FILL' 1" : "'FILL' 0" }}
          >
            home
          </span>
          <span className="text-[11px] font-medium mt-0.5 tracking-tight">Home</span>
        </button>

        {/* Shorts Tab */}
        <button
          onClick={() => onTabChange('shorts')}
          className={`flex flex-col items-center justify-center min-w-[56px] h-12 transition-all active:scale-95 ${
            currentTab === 'shorts'
              ? 'text-[#F1F1F1] font-bold'
              : 'text-[#AAAAAA] hover:text-[#F1F1F1]'
          }`}
          aria-label="Shorts"
        >
          <span
            className="material-symbols-outlined text-[24px]"
            style={{ fontVariationSettings: currentTab === 'shorts' ? "'FILL' 1" : "'FILL' 0" }}
          >
            bolt
          </span>
          <span className="text-[11px] font-medium mt-0.5 tracking-tight">Shorts</span>
        </button>

        {/* Create Button */}
        <button
          onClick={onCreateClick}
          aria-label="Create content"
          className="flex items-center justify-center w-12 h-12 active:scale-90 transition-transform"
        >
          <div className="w-10 h-10 rounded-full bg-[#212121] border border-white/10 flex items-center justify-center text-[#F1F1F1] shadow-[0_2px_8px_rgba(0,0,0,0.6)] hover:bg-[#353534]">
            <span className="material-symbols-outlined text-[26px]">add</span>
          </div>
        </button>

        {/* Subscriptions Tab */}
        <button
          onClick={() => onTabChange('subscriptions')}
          className={`relative flex flex-col items-center justify-center min-w-[56px] h-12 transition-all active:scale-95 ${
            currentTab === 'subscriptions'
              ? 'text-[#F1F1F1] font-bold'
              : 'text-[#AAAAAA] hover:text-[#F1F1F1]'
          }`}
          aria-label="Subscriptions"
        >
          <span
            className="material-symbols-outlined text-[24px]"
            style={{ fontVariationSettings: currentTab === 'subscriptions' ? "'FILL' 1" : "'FILL' 0" }}
          >
            subscriptions
          </span>
          <span className="text-[11px] font-medium mt-0.5 tracking-tight">Subscriptions</span>
          <span className="absolute top-1.5 right-3.5 w-1.5 h-1.5 bg-[#CC0000] rounded-full ring-2 ring-[#131313]"></span>
        </button>

        {/* You Tab */}
        <button
          onClick={() => onTabChange('you')}
          className={`flex flex-col items-center justify-center min-w-[56px] h-12 transition-all active:scale-95 ${
            currentTab === 'you'
              ? 'text-[#F1F1F1] font-bold'
              : 'text-[#AAAAAA] hover:text-[#F1F1F1]'
          }`}
          aria-label="You"
        >
          <span
            className="material-symbols-outlined text-[24px]"
            style={{ fontVariationSettings: currentTab === 'you' ? "'FILL' 1" : "'FILL' 0" }}
          >
            video_library
          </span>
          <span className="text-[11px] font-medium mt-0.5 tracking-tight">You</span>
        </button>
      </div>
    </nav>
  );
};
