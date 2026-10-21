import React, { useState } from 'react';
import { VideoItem, ShortItem, CreatorItem } from '../types.ts';

interface SubscriptionsFeedProps {
  creators: CreatorItem[];
  videos: VideoItem[];
  shorts: ShortItem[];
  onSelectVideo: (video: VideoItem) => void;
  onSelectShort: (short: ShortItem) => void;
  onOpenActionDrawer: (video: VideoItem) => void;
  onToggleSaveVideo: (videoId: string, e: React.MouseEvent) => void;
  savedVideoIds: Set<string>;
}

export const SubscriptionsFeed: React.FC<SubscriptionsFeedProps> = ({
  creators,
  videos,
  shorts,
  onSelectVideo,
  onSelectShort,
  onOpenActionDrawer,
  onToggleSaveVideo,
  savedVideoIds,
}) => {
  const [selectedCreatorId, setSelectedCreatorId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [hideShorts, setHideShorts] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2000);
  };

  const filterChips = [
    { id: 'All', label: 'All' },
    { id: 'Today', label: 'Today' },
    { id: 'Live', label: 'Live', isLive: true },
    { id: 'Continue watching', label: 'Continue watching' },
    { id: 'Unwatched', label: 'Unwatched' },
    { id: 'Shorts', label: 'Shorts' },
  ];

  // Specific videos for Subscriptions as seen in Image 7 & 8
  const appleVideo = videos.find((v) => v.id === 'mkbhd-apple') || videos[3] || videos[0];
  const quantumVideo = videos.find((v) => v.id === 'veritasium-quantum') || videos[4] || videos[1];
  const droneVideo = videos.find((v) => v.id === 'eng-drone') || videos[5] || videos[2];

  // Filter logic
  let displayTodayVideos = [appleVideo, quantumVideo];
  let displayYesterdayVideos = [droneVideo];

  if (selectedCreatorId) {
    displayTodayVideos = displayTodayVideos.filter((v) =>
      v.channel.toLowerCase().includes(selectedCreatorId.toLowerCase())
    );
    displayYesterdayVideos = displayYesterdayVideos.filter((v) =>
      v.channel.toLowerCase().includes(selectedCreatorId.toLowerCase())
    );
  }

  return (
    <div className="flex flex-col w-full pb-20 max-w-4xl mx-auto">
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-[#282828]/95 text-[#F1F1F1] px-4 py-2 rounded-full text-xs font-medium shadow-xl backdrop-blur-md border border-white/10 animate-fade-in flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[16px] text-[#ff5540]">check_circle</span>
          {toastMessage}
        </div>
      )}

      {/* Horizontal Story-Style Channel Avatars Rail */}
      <section className="w-full pt-1 pb-3 bg-[#0e0e0e] shadow-sm border-b border-white/[0.04]">
        <div className="flex items-center justify-between px-3.5 mb-2">
          <span className="text-[13px] text-[#e5e2e1] font-semibold tracking-tight">
            Active Creators
          </span>
          <button
            onClick={() => showToast('Opening creator subscriptions manager')}
            className="text-[12px] text-[#afc6ff] hover:text-[#F1F1F1] transition-colors flex items-center gap-0.5 cursor-pointer"
          >
            Manage <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>

        <div className="flex items-start gap-4 overflow-x-auto px-3.5 no-scrollbar py-1">
          {creators.map((c) => {
            const isSelected = selectedCreatorId === c.id;
            return (
              <button
                key={c.id}
                onClick={() => {
                  if (isSelected) {
                    setSelectedCreatorId(null);
                    showToast('Showing all creators');
                  } else {
                    setSelectedCreatorId(c.id);
                    showToast(`Filtering by ${c.name}`);
                  }
                }}
                className="flex flex-col items-center flex-shrink-0 w-16 group focus:outline-none text-center cursor-pointer"
              >
                <div
                  className={`relative p-0.5 rounded-full transition-transform duration-150 group-active:scale-95 ${
                    c.isLive
                      ? 'bg-[#CC0000] shadow-md animate-pulse ring-2 ring-[#CC0000]/50'
                      : isSelected
                      ? 'bg-[#ff5540] ring-2 ring-[#ff5540]/60'
                      : 'bg-[#005dd2]'
                  }`}
                >
                  <div className="p-0.5 rounded-full bg-[#0e0e0e]">
                    <img
                      className="w-13 h-13 rounded-full object-cover"
                      src={c.avatar}
                      alt={c.name}
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {c.isLive ? (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-1 bg-[#CC0000] text-[#F1F1F1] text-[9px] rounded uppercase font-bold tracking-wider shadow">
                      LIVE
                    </span>
                  ) : (
                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-[#005dd2] border-2 border-[#0e0e0e] flex items-center justify-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F1F1F1]"></span>
                    </span>
                  )}
                </div>
                <span
                  className={`text-[12px] mt-1.5 w-full truncate font-medium ${
                    isSelected ? 'text-[#ffb4a8] font-bold' : 'text-[#F1F1F1]'
                  }`}
                >
                  {c.name}
                </span>
              </button>
            );
          })}

          {/* View All Button */}
          <button
            onClick={() => {
              setSelectedCreatorId(null);
              showToast('Viewing all 48 subscribed channels');
            }}
            className="flex flex-col items-center flex-shrink-0 w-16 group focus:outline-none text-center cursor-pointer"
          >
            <div className="w-14 h-14 rounded-full bg-[#212121] flex items-center justify-center text-[#F1F1F1] shadow-sm group-hover:bg-[#353534] transition-colors group-active:scale-95 border border-white/10">
              <span className="material-symbols-outlined text-[24px]">arrow_forward</span>
            </div>
            <span className="text-[12px] text-[#AAAAAA] mt-1.5 w-full truncate">All (48)</span>
          </button>
        </div>
      </section>

      {/* Filter Chips Row */}
      <section className="sticky top-14 z-30 w-full bg-[#131313]/95 backdrop-blur-xl py-2 px-3.5 flex items-center gap-2 overflow-x-auto no-scrollbar shadow-sm border-b border-white/[0.04]">
        {filterChips.map((chip) => {
          const isActive = activeFilter === chip.id;
          return (
            <button
              key={chip.id}
              onClick={() => setActiveFilter(chip.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all active:scale-95 cursor-pointer ${
                isActive
                  ? 'bg-[#F1F1F1] text-[#131313] shadow-sm'
                  : 'bg-[#212121] text-[#e5e2e1] hover:bg-[#353534]'
              }`}
            >
              {chip.isLive && (
                <span className="inline-block w-2 h-2 rounded-full bg-[#CC0000] mr-1.5 animate-pulse"></span>
              )}
              {chip.label}
            </button>
          );
        })}
      </section>

      {/* Subscriptions Feed List */}
      <div className="flex flex-col w-full gap-6 px-0 py-2">
        {/* Section: Today */}
        <section className="flex flex-col w-full gap-4">
          <div className="flex items-center justify-between px-3.5 pt-2">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-4 bg-[#ff5540] rounded-full"></span>
              <h2 className="text-[19px] text-[#F1F1F1] tracking-tight font-bold">Today</h2>
            </div>
            <span className="text-[12px] text-[#AAAAAA]">{displayTodayVideos.length} new uploads</span>
          </div>

          {/* Video Cards for Today */}
          {displayTodayVideos.map((item) => (
            <article
              key={item.id}
              className="flex flex-col w-full bg-[#1c1b1b] pb-2 transition-colors group cursor-pointer"
            >
              {/* Thumbnail Container */}
              <div
                onClick={() => onSelectVideo(item)}
                className="relative w-full aspect-video bg-[#212121] overflow-hidden"
              >
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  src={item.thumbnail}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e]/80 via-transparent to-black/20 pointer-events-none"></div>

                {/* NEW Badge */}
                {item.badge === 'NEW' && (
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1 bg-[#CC0000] text-[#F1F1F1] px-2 py-0.5 rounded shadow-lg">
                    <span className="text-[11px] font-bold uppercase tracking-wider">NEW</span>
                  </div>
                )}

                {/* Timestamp */}
                <div className="absolute bottom-2.5 right-2.5 bg-black/80 text-[#F1F1F1] text-[11px] px-1.5 py-0.5 rounded shadow">
                  {item.duration}
                </div>

                {/* Quick Save Bookmark button */}
                <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleSaveVideo(item.id, e);
                      showToast(
                        savedVideoIds.has(item.id)
                          ? 'Removed from Watch Later'
                          : 'Saved to Watch Later'
                      );
                    }}
                    aria-label="Watch Later"
                    className={`w-9 h-9 rounded-full bg-black/60 backdrop-blur-md text-[#F1F1F1] flex items-center justify-center hover:bg-[#2a2a2a] transition-transform active:scale-90 shadow-md ${
                      savedVideoIds.has(item.id) ? 'text-[#ff5540]' : ''
                    }`}
                  >
                    <span
                      className="material-symbols-outlined text-[19px]"
                      style={{ fontVariationSettings: savedVideoIds.has(item.id) ? "'FILL' 1" : "'FILL' 0" }}
                    >
                      {savedVideoIds.has(item.id) ? 'bookmark' : 'bookmark_border'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Video Metadata */}
              <div className="flex items-start gap-3 px-3.5 pt-2.5">
                <button
                  onClick={() => onSelectVideo(item)}
                  className="flex-shrink-0 mt-0.5 focus:outline-none"
                >
                  <img
                    className="w-10 h-10 rounded-full object-cover"
                    src={item.channelAvatar}
                    alt={item.channel}
                    referrerPolicy="no-referrer"
                  />
                </button>

                <div
                  onClick={() => onSelectVideo(item)}
                  className="flex-1 min-w-0"
                >
                  <h3 className="text-[15px] text-[#F1F1F1] font-semibold leading-snug line-clamp-2 hover:text-white">
                    {item.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-1.5 mt-1 text-[12px] text-[#AAAAAA]">
                    <span className="font-medium text-[#F1F1F1]">{item.channel}</span>
                    {item.verified && (
                      <span
                        className="material-symbols-outlined text-[14px] text-[#afc6ff]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        verified
                      </span>
                    )}
                    <span>•</span>
                    <span>{item.views}</span>
                    <span>•</span>
                    <span>{item.uploadDate}</span>
                  </div>
                </div>

                {/* 3-Dots Action Sheet Trigger */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenActionDrawer(item);
                  }}
                  aria-label="More options"
                  className="w-9 h-9 flex items-center justify-center text-[#AAAAAA] hover:text-[#F1F1F1] hover:bg-[#212121] rounded-full transition-colors flex-shrink-0"
                >
                  <span className="material-symbols-outlined text-[20px]">more_vert</span>
                </button>
              </div>
            </article>
          ))}
        </section>

        {/* Shorts Interstitial Carousel */}
        {!hideShorts && (
          <section className="flex flex-col w-full py-2.5 bg-[#0e0e0e] border-y border-white/[0.04]">
            <div className="flex items-center justify-between px-3.5 mb-2.5">
              <div className="flex items-center gap-2">
                <span
                  className="material-symbols-outlined text-[#CC0000] text-[22px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  bolt
                </span>
                <span className="text-[19px] text-[#F1F1F1] font-bold tracking-tight">
                  Recent Shorts
                </span>
              </div>
              <button
                onClick={() => setHideShorts(true)}
                className="text-[12px] text-[#AAAAAA] hover:text-[#F1F1F1] cursor-pointer"
              >
                Hide
              </button>
            </div>

            <div className="flex items-center gap-2.5 overflow-x-auto px-3.5 no-scrollbar pb-1">
              {shorts.slice(5, 8).map((sh) => (
                <div
                  key={sh.id}
                  onClick={() => onSelectShort(sh)}
                  className="flex-shrink-0 w-32 aspect-[9/16] rounded-xl overflow-hidden relative group bg-[#201f1f] shadow-md cursor-pointer hover:ring-1 hover:ring-white/20 transition-all"
                >
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    src={sh.image}
                    alt={sh.title}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>
                  <div className="absolute bottom-2.5 left-2 right-2">
                    <p className="text-[12px] text-[#F1F1F1] font-semibold line-clamp-2 leading-tight">
                      {sh.title}
                    </p>
                    <span className="text-[11px] text-[#AAAAAA] mt-1 block">{sh.views}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section: Yesterday */}
        <section className="flex flex-col w-full gap-4">
          <div className="flex items-center justify-between px-3.5">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-4 bg-[#603e39] rounded-full"></span>
              <h2 className="text-[19px] text-[#F1F1F1] tracking-tight font-bold">Yesterday</h2>
            </div>
            <span className="text-[12px] text-[#AAAAAA]">{displayYesterdayVideos.length} unviewed</span>
          </div>

          {/* Yesterday Video Cards */}
          {displayYesterdayVideos.map((item) => (
            <article
              key={item.id}
              className="flex flex-col w-full bg-[#1c1b1b] pb-2 transition-colors group cursor-pointer"
            >
              <div
                onClick={() => onSelectVideo(item)}
                className="relative w-full aspect-video bg-[#212121] overflow-hidden"
              >
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  src={item.thumbnail}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e]/80 via-transparent to-black/20 pointer-events-none"></div>

                <div className="absolute bottom-2.5 right-2.5 bg-black/80 text-[#F1F1F1] text-[11px] px-1.5 py-0.5 rounded shadow">
                  {item.duration}
                </div>

                <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleSaveVideo(item.id, e);
                      showToast(
                        savedVideoIds.has(item.id)
                          ? 'Removed from Watch Later'
                          : 'Saved to Watch Later'
                      );
                    }}
                    aria-label="Watch Later"
                    className={`w-9 h-9 rounded-full bg-black/60 backdrop-blur-md text-[#F1F1F1] flex items-center justify-center hover:bg-[#2a2a2a] transition-transform active:scale-90 shadow-md ${
                      savedVideoIds.has(item.id) ? 'text-[#ff5540]' : ''
                    }`}
                  >
                    <span
                      className="material-symbols-outlined text-[19px]"
                      style={{ fontVariationSettings: savedVideoIds.has(item.id) ? "'FILL' 1" : "'FILL' 0" }}
                    >
                      {savedVideoIds.has(item.id) ? 'bookmark' : 'bookmark_border'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Video Metadata */}
              <div className="flex items-start gap-3 px-3.5 pt-2.5">
                <button
                  onClick={() => onSelectVideo(item)}
                  className="flex-shrink-0 mt-0.5 focus:outline-none"
                >
                  <img
                    className="w-10 h-10 rounded-full object-cover"
                    src={item.channelAvatar}
                    alt={item.channel}
                    referrerPolicy="no-referrer"
                  />
                </button>

                <div
                  onClick={() => onSelectVideo(item)}
                  className="flex-1 min-w-0"
                >
                  <h3 className="text-[15px] text-[#F1F1F1] font-semibold leading-snug line-clamp-2 hover:text-white">
                    {item.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-1.5 mt-1 text-[12px] text-[#AAAAAA]">
                    <span className="font-medium text-[#F1F1F1]">{item.channel}</span>
                    <span>•</span>
                    <span>{item.views}</span>
                    <span>•</span>
                    <span>{item.uploadDate}</span>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenActionDrawer(item);
                  }}
                  aria-label="More options"
                  className="w-9 h-9 flex items-center justify-center text-[#AAAAAA] hover:text-[#F1F1F1] hover:bg-[#212121] rounded-full transition-colors flex-shrink-0"
                >
                  <span className="material-symbols-outlined text-[20px]">more_vert</span>
                </button>
              </div>
            </article>
          ))}
        </section>

        {/* Up To Date Delight Card */}
        <div className="mx-3.5 mt-2 mb-4 p-4 rounded-2xl bg-[#2a2a2a] flex items-center gap-3.5 shadow-inner border border-white/[0.05]">
          <div className="w-12 h-12 rounded-full bg-[#ff5540]/20 flex items-center justify-center text-[#ffb4a8] flex-shrink-0">
            <span
              className="material-symbols-outlined text-[28px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              verified
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[14px] text-[#F1F1F1] font-bold">You're all caught up!</span>
            <span className="text-[12px] text-[#AAAAAA]">
              No unread releases from your 48 followed creators. Explore fresh picks.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
