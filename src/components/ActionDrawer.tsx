import React from 'react';
import { VideoItem } from '../types.ts';

interface ActionDrawerProps {
  isOpen: boolean;
  video: VideoItem | null;
  onClose: () => void;
  onSaveToWatchLater: (video: VideoItem) => void;
  onShare: (video: VideoItem) => void;
  onHideVideo: (video: VideoItem) => void;
}

export const ActionDrawer: React.FC<ActionDrawerProps> = ({
  isOpen,
  video,
  onClose,
  onSaveToWatchLater,
  onShare,
  onHideVideo,
}) => {
  if (!isOpen || !video) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex flex-col justify-end transition-opacity duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg mx-auto bg-[#282828] rounded-t-2xl p-4 flex flex-col gap-2 shadow-2xl animate-slide-up"
      >
        <div className="w-10 h-1 bg-[#353534] rounded-full mx-auto mb-2"></div>

        {/* Video preview mini header */}
        <div className="flex items-center gap-3 pb-3 border-b border-white/[0.08]">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-14 aspect-video rounded object-cover"
          />
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-semibold text-[#F1F1F1] truncate">{video.title}</h4>
            <span className="text-[11px] text-[#AAAAAA]">{video.channel}</span>
          </div>
        </div>

        <button
          onClick={() => {
            onClose();
          }}
          className="flex items-center gap-3.5 py-2.5 px-3 hover:bg-[#212121] rounded-xl transition-colors text-left text-[#F1F1F1]"
        >
          <span className="material-symbols-outlined text-[22px] text-[#AAAAAA]">
            playlist_play
          </span>
          <span className="text-sm font-medium">Play next in queue</span>
        </button>

        <button
          onClick={() => {
            onSaveToWatchLater(video);
            onClose();
          }}
          className="flex items-center gap-3.5 py-2.5 px-3 hover:bg-[#212121] rounded-xl transition-colors text-left text-[#F1F1F1]"
        >
          <span className="material-symbols-outlined text-[22px] text-[#AAAAAA]">
            watch_later
          </span>
          <span className="text-sm font-medium">Save to Watch Later</span>
        </button>

        <button
          onClick={() => {
            onShare(video);
            onClose();
          }}
          className="flex items-center gap-3.5 py-2.5 px-3 hover:bg-[#212121] rounded-xl transition-colors text-left text-[#F1F1F1]"
        >
          <span className="material-symbols-outlined text-[22px] text-[#AAAAAA]">share</span>
          <span className="text-sm font-medium">Share video</span>
        </button>

        <button
          onClick={() => {
            onClose();
          }}
          className="flex items-center gap-3.5 py-2.5 px-3 hover:bg-[#212121] rounded-xl transition-colors text-left text-[#F1F1F1]"
        >
          <span className="material-symbols-outlined text-[22px] text-[#AAAAAA]">
            notifications_off
          </span>
          <span className="text-sm font-medium">Turn off notifications for this channel</span>
        </button>

        <button
          onClick={() => {
            onHideVideo(video);
            onClose();
          }}
          className="flex items-center gap-3.5 py-2.5 px-3 hover:bg-[#212121] rounded-xl transition-colors text-left text-[#ffb4ab]"
        >
          <span className="material-symbols-outlined text-[22px] text-[#ffb4ab]">
            visibility_off
          </span>
          <span className="text-sm font-medium">Hide video</span>
        </button>

        <button
          onClick={onClose}
          className="w-full mt-2 py-2.5 rounded-full bg-[#2a2a2a] text-[#F1F1F1] text-xs font-bold hover:bg-[#353534] active:scale-98 transition-transform"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
