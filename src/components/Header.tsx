import React from 'react';
import { BRAND_LOGO, USER_AVATAR } from '../mockData.ts';

interface HeaderProps {
  onSearchClick: () => void;
  onNotificationsClick: () => void;
  onCastClick: () => void;
  onProfileClick: () => void;
  unreadCount?: number;
  backTitle?: string;
  onBackClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onSearchClick,
  onNotificationsClick,
  onCastClick,
  onProfileClick,
  unreadCount = 2,
  backTitle,
  onBackClick,
}) => {
  return (
    <header className="fixed top-0 w-full z-50 bg-[#131313]/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.4)]">
      <div className="h-14 px-3 flex items-center justify-between max-w-5xl mx-auto">
        <div className="flex items-center gap-1">
          {backTitle && onBackClick ? (
            <button
              onClick={onBackClick}
              aria-label="Go back"
              className="w-10 h-10 flex items-center justify-center text-[#F1F1F1] rounded-full hover:bg-[#353534]/40 transition-colors mr-0.5"
            >
              <span className="material-symbols-outlined text-[24px]">arrow_back</span>
            </button>
          ) : null}

          <div
            onClick={onBackClick ? onBackClick : undefined}
            className="flex items-center gap-2 cursor-pointer select-none"
          >
            <img
              alt="Streamflix Brand Logo"
              className="h-7 w-auto object-contain drop-shadow"
              src={BRAND_LOGO}
            />
            <span className="font-bold text-[19px] tracking-tight text-[#F1F1F1]">
              {backTitle || 'Streamflix'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-0.5">
          <button
            onClick={onCastClick}
            aria-label="Cast to device"
            className="w-10 h-10 flex items-center justify-center text-[#F1F1F1] rounded-full hover:bg-[#353534]/40 active:scale-95 transition-all"
            title="Cast to screen"
          >
            <span className="material-symbols-outlined text-[22px]">cast</span>
          </button>

          <button
            onClick={onNotificationsClick}
            aria-label="Notifications"
            className="relative w-10 h-10 flex items-center justify-center text-[#F1F1F1] rounded-full hover:bg-[#353534]/40 active:scale-95 transition-all"
            title="Notifications"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#CC0000] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#CC0000]"></span>
              </span>
            )}
          </button>

          <button
            onClick={onSearchClick}
            aria-label="Search videos"
            className="w-10 h-10 flex items-center justify-center text-[#F1F1F1] rounded-full hover:bg-[#353534]/40 active:scale-95 transition-all"
            title="Search"
          >
            <span className="material-symbols-outlined text-[22px]">search</span>
          </button>

          <button
            onClick={onProfileClick}
            aria-label="User account"
            className="w-10 h-10 flex items-center justify-center rounded-full hover:opacity-85 transition-opacity"
            title="Your Profile"
          >
            <img
              alt="Profile"
              className="w-7 h-7 rounded-full object-cover ring-1 ring-white/20"
              src={USER_AVATAR}
            />
          </button>
        </div>
      </div>
    </header>
  );
};
