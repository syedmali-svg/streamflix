import React from 'react';
import { VideoItem } from '../types.ts';
import { USER_AVATAR } from '../mockData.ts';

interface YouLibraryProps {
  videos: VideoItem[];
  savedVideoIds: Set<string>;
  onSelectVideo: (video: VideoItem) => void;
  onClearHistory?: () => void;
}

export const YouLibrary: React.FC<YouLibraryProps> = ({
  videos,
  savedVideoIds,
  onSelectVideo,
}) => {
  const historyVideos = videos.slice(0, 4);
  const savedVideos = videos.filter((v) => savedVideoIds.has(v.id));

  return (
    <div className="flex flex-col w-full pb-24 max-w-4xl mx-auto px-3.5 pt-3">
      {/* User Profile Header */}
      <section className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
        <div className="flex items-center gap-3">
          <img
            src={USER_AVATAR}
            alt="Carlos Rivera"
            className="w-16 h-16 rounded-full object-cover ring-2 ring-[#ff5540]/60 shadow-lg"
          />
          <div className="flex flex-col">
            <h1 className="text-[20px] font-bold text-[#F1F1F1] leading-tight">Carlos Rivera</h1>
            <span className="text-[12px] text-[#AAAAAA]">@carlosandy041 • View channel</span>
            <div className="flex items-center gap-2 mt-1">
              <span className="px-2 py-0.5 rounded bg-[#ff5540]/20 text-[#ffb4a8] text-[10px] font-bold uppercase tracking-wider">
                Premium 4K
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            title="Switch account"
            className="w-9 h-9 rounded-full bg-[#212121] text-[#F1F1F1] flex items-center justify-center hover:bg-[#353534]"
          >
            <span className="material-symbols-outlined text-[20px]">switch_account</span>
          </button>
          <button
            title="Google Account"
            className="w-9 h-9 rounded-full bg-[#212121] text-[#F1F1F1] flex items-center justify-center hover:bg-[#353534]"
          >
            <span className="material-symbols-outlined text-[20px]">manage_accounts</span>
          </button>
        </div>
      </section>

      {/* Profile Shortcut Pills */}
      <div className="flex items-center gap-2 overflow-x-auto py-3 no-scrollbar border-b border-white/[0.08]">
        <button className="px-3 py-1.5 rounded-full bg-[#212121] hover:bg-[#2a2a2a] text-[#F1F1F1] text-xs font-semibold whitespace-nowrap flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[16px]">account_box</span>
          Your channel
        </button>
        <button className="px-3 py-1.5 rounded-full bg-[#212121] hover:bg-[#2a2a2a] text-[#F1F1F1] text-xs font-semibold whitespace-nowrap flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[16px]">visibility_off</span>
          Turn on Incognito
        </button>
        <button className="px-3 py-1.5 rounded-full bg-[#212121] hover:bg-[#2a2a2a] text-[#F1F1F1] text-xs font-semibold whitespace-nowrap flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[16px]">share</span>
          Share channel
        </button>
      </div>

      {/* History Carousel */}
      <section className="py-4 border-b border-white/[0.08]">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[17px] font-bold text-[#F1F1F1]">History</h2>
          <button className="text-xs text-[#afc6ff] font-semibold hover:text-white">View all</button>
        </div>

        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
          {historyVideos.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => onSelectVideo(item)}
              className="flex-shrink-0 w-40 group cursor-pointer"
            >
              <div className="relative aspect-video rounded-lg overflow-hidden bg-[#212121]">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/80 text-[10px] text-[#F1F1F1]">
                  {item.duration}
                </span>
                {/* Simulated watch progress bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#353534]">
                  <div
                    className="h-full bg-[#ff5540]"
                    style={{ width: `${(idx + 1) * 22}%` }}
                  ></div>
                </div>
              </div>
              <p className="text-[13px] text-[#F1F1F1] font-medium line-clamp-2 mt-1.5 group-hover:text-white">
                {item.title}
              </p>
              <span className="text-[11px] text-[#AAAAAA] truncate block">{item.channel}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Playlists & Collections */}
      <section className="py-4 border-b border-white/[0.08]">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[17px] font-bold text-[#F1F1F1]">Playlists</h2>
          <button className="text-xs text-[#afc6ff] font-semibold hover:text-white">
            + New playlist
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* Liked Videos */}
          <div
            onClick={() => onSelectVideo(videos[0])}
            className="p-3 rounded-xl bg-[#201f1f] hover:bg-[#252424] cursor-pointer transition-colors border border-white/[0.04] flex items-center gap-3"
          >
            <div className="w-12 h-12 rounded-lg bg-[#005dd2]/20 flex items-center justify-center text-[#afc6ff]">
              <span className="material-symbols-outlined text-[24px]">thumb_up</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-semibold text-[#F1F1F1] truncate">Liked videos</span>
              <span className="text-xs text-[#AAAAAA]">142 videos</span>
            </div>
          </div>

          {/* Watch Later */}
          <div
            onClick={() => onSelectVideo(savedVideos[0] || videos[0])}
            className="p-3 rounded-xl bg-[#201f1f] hover:bg-[#252424] cursor-pointer transition-colors border border-white/[0.04] flex items-center gap-3"
          >
            <div className="w-12 h-12 rounded-lg bg-[#ff5540]/20 flex items-center justify-center text-[#ffb4a8]">
              <span className="material-symbols-outlined text-[24px]">watch_later</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-semibold text-[#F1F1F1] truncate">Watch Later</span>
              <span className="text-xs text-[#AAAAAA]">{savedVideos.length || 12} videos</span>
            </div>
          </div>

          {/* Synthwave & Coding */}
          <div
            onClick={() => onSelectVideo(videos[1])}
            className="p-3 rounded-xl bg-[#201f1f] hover:bg-[#252424] cursor-pointer transition-colors border border-white/[0.04] flex items-center gap-3"
          >
            <div className="w-12 h-12 rounded-lg bg-[#488fff]/20 flex items-center justify-center text-[#acc7ff]">
              <span className="material-symbols-outlined text-[24px]">queue_music</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-semibold text-[#F1F1F1] truncate">Lo-Fi & Beats</span>
              <span className="text-xs text-[#AAAAAA]">38 tracks</span>
            </div>
          </div>

          {/* Deep Dives */}
          <div
            onClick={() => onSelectVideo(videos[3])}
            className="p-3 rounded-xl bg-[#201f1f] hover:bg-[#252424] cursor-pointer transition-colors border border-white/[0.04] flex items-center gap-3"
          >
            <div className="w-12 h-12 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
              <span className="material-symbols-outlined text-[24px]">smart_display</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-semibold text-[#F1F1F1] truncate">Tech Deep Dives</span>
              <span className="text-xs text-[#AAAAAA]">24 videos</span>
            </div>
          </div>
        </div>
      </section>

      {/* Downloads Section */}
      <section className="py-4 border-b border-white/[0.08]">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#acc7ff]">download_done</span>
            <h2 className="text-[17px] font-bold text-[#F1F1F1]">Downloads</h2>
          </div>
          <span className="text-xs text-[#AAAAAA]">3 videos available offline</span>
        </div>
        <div className="w-full bg-[#212121] h-1.5 rounded-full overflow-hidden mt-2">
          <div className="h-full bg-[#488fff] w-[18%]"></div>
        </div>
        <span className="text-[11px] text-[#AAAAAA] mt-1.5 block">
          3.4 GB of 64 GB internal device storage used
        </span>
      </section>

      {/* Settings & System */}
      <section className="py-4 space-y-2">
        <h2 className="text-[14px] font-semibold text-[#AAAAAA] uppercase tracking-wider mb-2">
          Preferences & Account
        </h2>
        <div className="flex items-center justify-between p-3 rounded-xl bg-[#201f1f] border border-white/[0.04]">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[20px] text-[#ffb4a8]">stars</span>
            <span className="text-sm font-medium text-[#F1F1F1]">Your Premium Benefits</span>
          </div>
          <span className="material-symbols-outlined text-[18px] text-[#AAAAAA]">chevron_right</span>
        </div>

        <div className="flex items-center justify-between p-3 rounded-xl bg-[#201f1f] border border-white/[0.04]">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[20px] text-[#AAAAAA]">settings</span>
            <span className="text-sm font-medium text-[#F1F1F1]">Settings</span>
          </div>
          <span className="material-symbols-outlined text-[18px] text-[#AAAAAA]">chevron_right</span>
        </div>

        <div className="flex items-center justify-between p-3 rounded-xl bg-[#201f1f] border border-white/[0.04]">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[20px] text-[#AAAAAA]">help</span>
            <span className="text-sm font-medium text-[#F1F1F1]">Help and feedback</span>
          </div>
          <span className="material-symbols-outlined text-[18px] text-[#AAAAAA]">chevron_right</span>
        </div>
      </section>
    </div>
  );
};
