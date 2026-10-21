import React, { useState } from 'react';
import { VideoItem, ShortItem } from '../types.ts';

interface HomeFeedProps {
  videos: VideoItem[];
  shorts: ShortItem[];
  onSelectVideo: (video: VideoItem) => void;
  onSelectShort: (short: ShortItem) => void;
  onOpenActionDrawer: (video: VideoItem) => void;
  onToggleSaveVideo: (videoId: string, e: React.MouseEvent) => void;
  savedVideoIds: Set<string>;
}

export const HomeFeed: React.FC<HomeFeedProps> = ({
  videos,
  shorts,
  onSelectVideo,
  onSelectShort,
  onOpenActionDrawer,
  onToggleSaveVideo,
  savedVideoIds,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2000);
  };

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'gaming', label: 'Gaming' },
    { id: 'music', label: 'Music' },
    { id: 'tech', label: 'Tech & AI' },
    { id: 'podcasts', label: 'Podcasts' },
    { id: 'live', label: 'Live', isLive: true },
    { id: 'cinematography', label: 'Cinematography' },
    { id: 'news', label: 'News' },
    { id: 'recent', label: 'Recently uploaded' },
  ];

  // Filter videos based on category
  const filteredVideos = videos.filter((v) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'live') return v.isLive;
    if (activeCategory === 'recent') return true;
    return v.category === activeCategory;
  });

  const featuredVideo = filteredVideos[0] || videos[0];
  const otherVideos = filteredVideos.slice(1);

  return (
    <div className="flex flex-col w-full pb-20 max-w-4xl mx-auto">
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-[#282828]/95 text-[#F1F1F1] px-4 py-2 rounded-full text-xs font-medium shadow-xl backdrop-blur-md border border-white/10 animate-fade-in flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[16px] text-[#ff5540]">check_circle</span>
          {toastMessage}
        </div>
      )}

      {/* Interactive Pill Filter Bar */}
      <section className="sticky top-14 z-30 bg-[#131313]/95 backdrop-blur-md py-2.5 shadow-sm border-b border-white/[0.04]">
        <div className="flex items-center gap-2 overflow-x-auto px-3.5 no-scrollbar">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all active:scale-95 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#F1F1F1] text-[#131313] font-semibold shadow-sm'
                    : 'bg-[#2a2a2a] text-[#F1F1F1] hover:bg-[#353534]'
                }`}
              >
                {cat.isLive && (
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#CC0000] mr-1.5 animate-pulse"></span>
                )}
                {cat.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Main Video Feed Content */}
      <div className="flex flex-col gap-6 mt-1">
        {/* 1. Featured Cinematic Video Card */}
        {featuredVideo && (
          <article className="flex flex-col w-full group cursor-pointer">
            <div
              onClick={() => onSelectVideo(featuredVideo)}
              className="relative w-full aspect-video bg-[#1c1b1b] overflow-hidden"
            >
              <img
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.01] group-active:scale-[1.02]"
                src={featuredVideo.thumbnail}
                alt={featuredVideo.title}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e]/80 via-transparent to-black/20 pointer-events-none"></div>

              {/* Badges Bottom-Right */}
              <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5">
                {featuredVideo.is4K && (
                  <span className="px-1.5 py-0.5 rounded bg-black/85 text-[#F1F1F1] text-[11px] font-semibold backdrop-blur-sm tracking-wider">
                    4K
                  </span>
                )}
                <span className="px-1.5 py-0.5 rounded bg-black/85 text-[#F1F1F1] text-[11px] font-medium backdrop-blur-sm">
                  {featuredVideo.duration}
                </span>
              </div>

              {/* Hover/Touch Quick Action Overlay */}
              <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-1.5">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleSaveVideo(featuredVideo.id, e);
                    showToast(
                      savedVideoIds.has(featuredVideo.id)
                        ? 'Removed from Watch Later'
                        : 'Saved to Watch Later'
                    );
                  }}
                  aria-label="Watch Later"
                  title="Watch Later"
                  className={`w-8 h-8 rounded-full ${
                    savedVideoIds.has(featuredVideo.id)
                      ? 'bg-[#ff5540] text-white'
                      : 'bg-[#353534]/90 text-[#F1F1F1]'
                  } flex items-center justify-center backdrop-blur-sm shadow-md active:scale-90 transition-transform`}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {savedVideoIds.has(featuredVideo.id) ? 'bookmark' : 'schedule'}
                  </span>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    showToast('Added to playback queue');
                  }}
                  aria-label="Add to Queue"
                  title="Add to Queue"
                  className="w-8 h-8 rounded-full bg-[#353534]/90 text-[#F1F1F1] flex items-center justify-center backdrop-blur-sm shadow-md active:scale-90 hover:bg-[#454544] transition-transform"
                >
                  <span className="material-symbols-outlined text-[18px]">playlist_add</span>
                </button>
              </div>
            </div>

            {/* Channel & Metadata Row */}
            <div className="px-3.5 pt-2.5 flex items-start gap-3">
              <div className="relative flex-shrink-0">
                <img
                  className="w-10 h-10 rounded-full object-cover shadow-sm bg-[#2a2a2a]"
                  src={featuredVideo.channelAvatar}
                  alt={featuredVideo.channel}
                  referrerPolicy="no-referrer"
                />
              </div>
              <div
                onClick={() => onSelectVideo(featuredVideo)}
                className="flex-1 min-w-0 pr-1"
              >
                <h2 className="text-[15px] font-medium text-[#F1F1F1] line-clamp-2 leading-snug hover:text-white">
                  {featuredVideo.title}
                </h2>
                <div className="flex items-center flex-wrap gap-x-1.5 text-[#AAAAAA] text-[12px] mt-1">
                  <span className="font-medium hover:text-[#F1F1F1] transition-colors flex items-center gap-0.5">
                    {featuredVideo.channel}
                    {featuredVideo.verified && (
                      <span
                        className="material-symbols-outlined text-[14px] text-[#acc7ff]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        check_circle
                      </span>
                    )}
                  </span>
                  <span className="text-[#AAAAAA]/50">•</span>
                  <span>{featuredVideo.views}</span>
                  <span className="text-[#AAAAAA]/50">•</span>
                  <span>{featuredVideo.uploadDate}</span>
                </div>
              </div>
              {/* Context Menu Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenActionDrawer(featuredVideo);
                }}
                aria-label="Video options"
                className="w-9 h-9 flex items-center justify-center text-[#AAAAAA] hover:text-[#F1F1F1] rounded-full active:bg-[#353534]/40 -mr-1 flex-shrink-0 transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">more_vert</span>
              </button>
            </div>
          </article>
        )}

        {/* 2. Shorts Shelf Carousel */}
        <section className="flex flex-col py-3 bg-[#1c1b1b]/50 border-y border-white/[0.04]">
          {/* Shorts Header */}
          <div className="px-3.5 flex items-center justify-between pb-2.5">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#CC0000]/15 flex items-center justify-center">
                <span
                  className="material-symbols-outlined text-[#CC0000] text-[20px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  bolt
                </span>
              </div>
              <div>
                <h3 className="text-[19px] font-bold text-[#F1F1F1] tracking-tight">Shorts</h3>
              </div>
            </div>
            <button
              onClick={() => showToast('Shorts shelf settings')}
              aria-label="Shorts menu"
              className="w-8 h-8 rounded-full flex items-center justify-center text-[#AAAAAA] hover:text-[#F1F1F1] active:bg-[#353534]"
            >
              <span className="material-symbols-outlined text-[20px]">more_vert</span>
            </button>
          </div>

          {/* Shorts Carousel */}
          <div className="flex gap-2.5 overflow-x-auto px-3.5 pb-1 no-scrollbar snap-x snap-mandatory">
            {shorts.slice(0, 4).map((short) => (
              <div
                key={short.id}
                onClick={() => onSelectShort(short)}
                className="flex-shrink-0 w-[140px] aspect-[9/16] rounded-xl overflow-hidden relative group cursor-pointer snap-start bg-[#2a2a2a] shadow-md hover:ring-1 hover:ring-white/20 transition-all"
              >
                <img
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  src={short.image}
                  alt={short.title}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-2.5">
                  <div className="absolute top-2 right-2">
                    <span className="material-symbols-outlined text-white/80 text-[18px] drop-shadow">
                      more_vert
                    </span>
                  </div>
                  <p className="text-[12px] font-semibold text-[#F1F1F1] line-clamp-2 leading-snug drop-shadow-sm">
                    {short.title}
                  </p>
                  <span className="text-[11px] text-[#AAAAAA] mt-1">{short.views}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Second Video Card (e.g. Live Stream) & Subsequent Cards */}
        {otherVideos.map((video) => (
          <article key={video.id} className="flex flex-col w-full group cursor-pointer">
            <div
              onClick={() => onSelectVideo(video)}
              className="relative w-full aspect-video bg-[#1c1b1b] overflow-hidden"
            >
              <img
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.01] group-active:scale-[1.02]"
                src={video.thumbnail}
                alt={video.title}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e]/80 via-transparent to-black/20 pointer-events-none"></div>

              {/* Live or Duration Badging */}
              {video.isLive ? (
                <div className="absolute bottom-2.5 left-2.5">
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#CC0000] text-[#F1F1F1] text-[11px] font-bold tracking-wider uppercase shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                    LIVE
                  </div>
                </div>
              ) : null}

              <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5">
                {video.is4K && (
                  <span className="px-1.5 py-0.5 rounded bg-black/85 text-[#F1F1F1] text-[11px] font-semibold backdrop-blur-sm tracking-wider">
                    4K
                  </span>
                )}
                <span className="px-1.5 py-0.5 rounded bg-black/85 text-[#F1F1F1] text-[11px] font-medium backdrop-blur-sm">
                  {video.duration}
                </span>
              </div>

              {/* Hover Quick Action */}
              <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-1.5">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleSaveVideo(video.id, e);
                    showToast(
                      savedVideoIds.has(video.id)
                        ? 'Removed from Watch Later'
                        : 'Saved to Watch Later'
                    );
                  }}
                  aria-label="Watch Later"
                  className={`w-8 h-8 rounded-full ${
                    savedVideoIds.has(video.id)
                      ? 'bg-[#ff5540] text-white'
                      : 'bg-[#353534]/90 text-[#F1F1F1]'
                  } flex items-center justify-center backdrop-blur-sm shadow-md active:scale-90 transition-transform`}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {savedVideoIds.has(video.id) ? 'bookmark' : 'schedule'}
                  </span>
                </button>
              </div>
            </div>

            {/* Channel & Meta */}
            <div className="px-3.5 pt-2.5 flex items-start gap-3">
              <div className="relative flex-shrink-0">
                <img
                  className="w-10 h-10 rounded-full object-cover shadow-sm bg-[#2a2a2a]"
                  src={video.channelAvatar}
                  alt={video.channel}
                  referrerPolicy="no-referrer"
                />
              </div>
              <div
                onClick={() => onSelectVideo(video)}
                className="flex-1 min-w-0 pr-1"
              >
                <h2 className="text-[15px] font-medium text-[#F1F1F1] line-clamp-2 leading-snug hover:text-white">
                  {video.title}
                </h2>
                <div className="flex items-center flex-wrap gap-x-1.5 text-[#AAAAAA] text-[12px] mt-1">
                  <span className="font-medium hover:text-[#F1F1F1] transition-colors flex items-center gap-0.5">
                    {video.channel}
                    {video.verified && (
                      <span
                        className="material-symbols-outlined text-[14px] text-[#acc7ff]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        check_circle
                      </span>
                    )}
                  </span>
                  <span className="text-[#AAAAAA]/50">•</span>
                  {video.isLive ? (
                    <span className="text-[#CC0000] font-medium flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#CC0000]"></span>
                      {video.viewersCount || 'Live'}
                    </span>
                  ) : (
                    <>
                      <span>{video.views}</span>
                      <span className="text-[#AAAAAA]/50">•</span>
                      <span>{video.uploadDate}</span>
                    </>
                  )}
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenActionDrawer(video);
                }}
                aria-label="Video options"
                className="w-9 h-9 flex items-center justify-center text-[#AAAAAA] hover:text-[#F1F1F1] rounded-full active:bg-[#353534]/40 -mr-1 flex-shrink-0 transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">more_vert</span>
              </button>
            </div>
          </article>
        ))}

        {/* Continuous Feed End Indicator */}
        <div className="w-full py-6 flex flex-col items-center justify-center gap-2 text-[#AAAAAA]">
          <div className="w-6 h-6 rounded-full border-2 border-[#353534] border-t-[#ff5540] animate-spin"></div>
          <span className="text-[12px] text-[#AAAAAA]">Finding more stories for you...</span>
        </div>
      </div>
    </div>
  );
};
