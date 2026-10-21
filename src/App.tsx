import React, { useState } from 'react';
import { NavTab, VideoItem, ShortItem, NotificationItem } from './types.ts';
import {
  INITIAL_VIDEOS,
  INITIAL_SHORTS,
  INITIAL_CREATORS,
  INITIAL_NOTIFICATIONS,
} from './mockData.ts';
import { Header } from './components/Header.tsx';
import { BottomNav } from './components/BottomNav.tsx';
import { HomeFeed } from './components/HomeFeed.tsx';
import { ShortsPlayer } from './components/ShortsPlayer.tsx';
import { WatchPlayer } from './components/WatchPlayer.tsx';
import { SubscriptionsFeed } from './components/SubscriptionsFeed.tsx';
import { YouLibrary } from './components/YouLibrary.tsx';
import { SearchModal } from './components/SearchModal.tsx';
import { NotificationsModal } from './components/NotificationsModal.tsx';
import { CastModal } from './components/CastModal.tsx';
import { CreateModal } from './components/CreateModal.tsx';
import { ActionDrawer } from './components/ActionDrawer.tsx';
import { ShareModal } from './components/ShareModal.tsx';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('home');
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
  const [videos, setVideos] = useState<VideoItem[]>(INITIAL_VIDEOS);
  const [shorts, setShorts] = useState<ShortItem[]>(INITIAL_SHORTS);
  const [currentShort, setCurrentShort] = useState<ShortItem>(INITIAL_SHORTS[0]);
  const [savedVideoIds, setSavedVideoIds] = useState<Set<string>>(new Set());
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  // Modals state
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false);
  const [isCastOpen, setIsCastOpen] = useState<boolean>(false);
  const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);
  const [actionDrawerVideo, setActionDrawerVideo] = useState<VideoItem | null>(null);
  const [shareItem, setShareItem] = useState<VideoItem | ShortItem | null>(null);

  // Layout mode toggle: Mobile Device frame vs Edge-to-Edge
  const [isMobileFrameMode, setIsMobileFrameMode] = useState<boolean>(false);

  // Navigation handlers
  const handleTabChange = (tab: NavTab) => {
    setActiveVideo(null); // Return to standard tab views
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectVideo = (video: VideoItem) => {
    setActiveVideo(video);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectShort = (short: ShortItem) => {
    setActiveVideo(null);
    setCurrentShort(short);
    setCurrentTab('shorts');
  };

  const handleToggleSaveVideo = (videoId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSavedVideoIds((prev) => {
      const next = new Set(prev);
      if (next.has(videoId)) {
        next.delete(videoId);
      } else {
        next.add(videoId);
      }
      return next;
    });
  };

  const handleAddNewVideo = (newVideo: VideoItem) => {
    setVideos([newVideo, ...videos]);
    setActiveVideo(newVideo);
  };

  const handleMarkAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const unreadNotificationsCount = notifications.filter((n) => n.unread).length;

  return (
    <div className="min-h-screen bg-[#131313] text-[#e5e2e1] flex flex-col font-sans select-none">
      {/* Optional Desktop Floating Frame Toggle */}
      <aside className="hidden lg:flex fixed top-2 left-4 z-50 items-center gap-2 bg-[#201f1f]/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 shadow-lg text-xs text-[#AAAAAA]">
        <span>Device View:</span>
        <button
          onClick={() => setIsMobileFrameMode(!isMobileFrameMode)}
          className="text-xs font-bold text-[#F1F1F1] hover:text-[#ff5540] flex items-center gap-1 transition-colors"
        >
          <span className="material-symbols-outlined text-[16px]">
            {isMobileFrameMode ? 'stay_current_portrait' : 'devices'}
          </span>
          {isMobileFrameMode ? 'Phone Frame (430px)' : 'Fluid Widescreen'}
        </button>
      </aside>

      {/* Main Container Shell */}
      <div
        className={`w-full min-h-screen mx-auto flex flex-col bg-[#131313] relative transition-all duration-300 ${
          isMobileFrameMode
            ? 'max-w-[430px] my-4 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-white/10'
            : 'max-w-none'
        }`}
      >
        {/* Top Header */}
        <Header
          onSearchClick={() => setIsSearchOpen(true)}
          onNotificationsClick={() => setIsNotificationsOpen(true)}
          onCastClick={() => setIsCastOpen(true)}
          onProfileClick={() => handleTabChange('you')}
          unreadCount={unreadNotificationsCount}
          backTitle={activeVideo ? 'Watch Player' : undefined}
          onBackClick={activeVideo ? () => setActiveVideo(null) : undefined}
        />

        {/* Dynamic Screen View */}
        <main className="flex-1 w-full pt-14 flex flex-col">
          {/* 1. Watch Player Screen (active whenever a video is selected) */}
          {activeVideo ? (
            <WatchPlayer
              video={activeVideo}
              upNextVideos={videos.filter((v) => v.id !== activeVideo.id)}
              onSelectVideo={handleSelectVideo}
              onBack={() => setActiveVideo(null)}
              onShareClick={(v) => setShareItem(v)}
              onOpenActionDrawer={(v) => setActionDrawerVideo(v)}
            />
          ) : (
            <>
              {/* 2. Home Feed Tab */}
              {currentTab === 'home' && (
                <HomeFeed
                  videos={videos}
                  shorts={shorts}
                  onSelectVideo={handleSelectVideo}
                  onSelectShort={handleSelectShort}
                  onOpenActionDrawer={(v) => setActionDrawerVideo(v)}
                  onToggleSaveVideo={handleToggleSaveVideo}
                  savedVideoIds={savedVideoIds}
                />
              )}

              {/* 3. Shorts Player Tab */}
              {currentTab === 'shorts' && (
                <ShortsPlayer
                  currentShort={currentShort}
                  allShorts={shorts}
                  onSelectShort={(s) => setCurrentShort(s)}
                  onOpenSearch={() => setIsSearchOpen(true)}
                  onCreateClick={() => setIsCreateOpen(true)}
                  onShareClick={(s) => setShareItem(s)}
                />
              )}

              {/* 4. Subscriptions Tab */}
              {currentTab === 'subscriptions' && (
                <SubscriptionsFeed
                  creators={INITIAL_CREATORS}
                  videos={videos}
                  shorts={shorts}
                  onSelectVideo={handleSelectVideo}
                  onSelectShort={handleSelectShort}
                  onOpenActionDrawer={(v) => setActionDrawerVideo(v)}
                  onToggleSaveVideo={handleToggleSaveVideo}
                  savedVideoIds={savedVideoIds}
                />
              )}

              {/* 5. You (Library / Profile) Tab */}
              {currentTab === 'you' && (
                <YouLibrary
                  videos={videos}
                  savedVideoIds={savedVideoIds}
                  onSelectVideo={handleSelectVideo}
                />
              )}
            </>
          )}
        </main>

        {/* Bottom Navigation Bar (Hidden when in full video watch mode on smaller viewports, or persistent) */}
        {!activeVideo && (
          <BottomNav
            currentTab={currentTab}
            onTabChange={handleTabChange}
            onCreateClick={() => setIsCreateOpen(true)}
          />
        )}
      </div>

      {/* Global Interactive Modals */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        videos={videos}
        shorts={shorts}
        onSelectVideo={handleSelectVideo}
        onSelectShort={handleSelectShort}
      />

      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        notifications={notifications}
        onSelectNotification={(notif) => {
          const match = videos.find((v) => v.channel.includes(notif.creator));
          if (match) handleSelectVideo(match);
        }}
        onMarkAllAsRead={handleMarkAllNotificationsRead}
      />

      <CastModal
        isOpen={isCastOpen}
        onClose={() => setIsCastOpen(false)}
      />

      <CreateModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onAddNewVideo={handleAddNewVideo}
      />

      <ActionDrawer
        isOpen={Boolean(actionDrawerVideo)}
        video={actionDrawerVideo}
        onClose={() => setActionDrawerVideo(null)}
        onSaveToWatchLater={(v) => handleToggleSaveVideo(v.id)}
        onShare={(v) => setShareItem(v)}
        onHideVideo={(v) => {
          setVideos((prev) => prev.filter((item) => item.id !== v.id));
        }}
      />

      <ShareModal
        isOpen={Boolean(shareItem)}
        item={shareItem}
        onClose={() => setShareItem(null)}
      />
    </div>
  );
}
