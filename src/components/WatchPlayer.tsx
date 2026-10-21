import React, { useState, useEffect, useRef } from 'react';
import { VideoItem, CommentItem } from '../types.ts';

interface WatchPlayerProps {
  video: VideoItem;
  upNextVideos: VideoItem[];
  onSelectVideo: (video: VideoItem) => void;
  onBack: () => void;
  onShareClick: (video: VideoItem) => void;
  onOpenActionDrawer: (video: VideoItem) => void;
}

export const WatchPlayer: React.FC<WatchPlayerProps> = ({
  video,
  upNextVideos,
  onSelectVideo,
  onBack,
  onShareClick,
  onOpenActionDrawer,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isLiked, setIsLiked] = useState<boolean>(video.isLiked || false);
  const [likesCount, setLikesCount] = useState<number>(video.likesCount || 142000);
  const [isDisliked, setIsDisliked] = useState<boolean>(false);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(video.isSubscribed || false);
  const [isSaved, setIsSaved] = useState<boolean>(video.isSaved || false);
  const [isDownloaded, setIsDownloaded] = useState<boolean>(video.isDownloaded || false);
  const [ccActive, setCcActive] = useState<boolean>(true);
  const [isAutoplay, setIsAutoplay] = useState<boolean>(true);
  const [descExpanded, setDescExpanded] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<string>('1.0x');
  const [currentTimeSec, setCurrentTimeSec] = useState<number>(video.progressSec || 272); // 04:32
  const [totalTimeSec] = useState<number>(video.durationSec || 1125);
  const [hudMessage, setHudMessage] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [commentsModalOpen, setCommentsModalOpen] = useState<boolean>(false);
  const [comments, setComments] = useState<CommentItem[]>(video.comments);
  const [newComment, setNewComment] = useState<string>('');

  const hudTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Sync state if video changes
  useEffect(() => {
    setIsLiked(video.isLiked || false);
    setLikesCount(video.likesCount || 142000);
    setIsSubscribed(video.isSubscribed || false);
    setIsSaved(video.isSaved || false);
    setIsDownloaded(video.isDownloaded || false);
    setComments(video.comments);
    setCurrentTimeSec(video.progressSec || 272);
    triggerHud('1080p60 HDR');
  }, [video]);

  // Simulate playback timer
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentTimeSec((curr) => {
        if (curr >= totalTimeSec) {
          return 0;
        }
        return curr + 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying, totalTimeSec]);

  const triggerHud = (msg: string) => {
    setHudMessage(msg);
    if (hudTimerRef.current) clearTimeout(hudTimerRef.current);
    hudTimerRef.current = setTimeout(() => {
      setHudMessage(null);
    }, 1800);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying(!isPlaying);
    triggerHud(!isPlaying ? 'Playing' : 'Paused');
  };

  const handleRewind = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentTimeSec((t) => Math.max(0, t - 10));
    triggerHud('-10 seconds');
  };

  const handleForward = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentTimeSec((t) => Math.min(totalTimeSec, t + 10));
    triggerHud('+10 seconds');
  };

  const handleCcToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCcActive(!ccActive);
    triggerHud(!ccActive ? 'English Subtitles On' : 'Subtitles Off');
  };

  const handleCycleSpeed = (e: React.MouseEvent) => {
    e.stopPropagation();
    const speeds = ['1.0x', '1.25x', '1.5x', '2.0x'];
    const nextIdx = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
    setPlaybackSpeed(speeds[nextIdx]);
    triggerHud(`Playback speed: ${speeds[nextIdx]}`);
  };

  const handleScrub = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const pct = clickX / rect.width;
    setCurrentTimeSec(Math.floor(pct * totalTimeSec));
  };

  const handleLikeToggle = () => {
    if (!isLiked) {
      setIsLiked(true);
      setLikesCount((c) => c + 1);
      setIsDisliked(false);
      triggerHud('Liked video');
    } else {
      setIsLiked(false);
      setLikesCount((c) => c - 1);
    }
  };

  const handleDislikeToggle = () => {
    setIsDisliked(!isDisliked);
    if (!isDisliked && isLiked) {
      setIsLiked(false);
      setLikesCount((c) => c - 1);
    }
    triggerHud(!isDisliked ? 'Disliked' : 'Dislike removed');
  };

  const handleSubscribeToggle = () => {
    setIsSubscribed(!isSubscribed);
    triggerHud(
      !isSubscribed ? `Subscribed to ${video.channel}` : `Unsubscribed from ${video.channel}`
    );
  };

  const handleSaveToggle = () => {
    setIsSaved(!isSaved);
    triggerHud(!isSaved ? 'Saved to Watch Later' : 'Removed from Watch Later');
  };

  const handleDownloadToggle = () => {
    setIsDownloaded(!isDownloaded);
    triggerHud(!isDownloaded ? 'Download complete (1080p HDR)' : 'Download removed');
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    const cItem: CommentItem = {
      id: 'c_' + Date.now(),
      author: 'You',
      handle: '@you',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDj8PTnEF6VClpqnVcy3XixTRuMxf9X0oZNhzP1uZjcXuX4ZArzOPBjVWKGOezK6bl25gkNhOm1pJmOaoRaizkLesC_V93oFKr_wT_E4VH_ZTvTfDGZfyhTRI9Id6ut6o7f0XD-sxk6bYYN-TNpnMwk2hURDfcOc4t_nQTUP-qttOy385IIJ_Qgd1qmgdmKhIC29cQFS16THTSrIhzHtVsD5GDpoY4l1_EnNoYEV-uDlyhOuUJBAk_Kjg',
      text: newComment.trim(),
      timeAgo: 'Just now',
      likes: '0',
    };
    setComments([cItem, ...comments]);
    setNewComment('');
    triggerHud('Comment submitted');
  };

  const progressPercent = (currentTimeSec / totalTimeSec) * 100;

  // Background visual for player
  const playerCanvasBg =
    video.id === 'doc-ai-2025'
      ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuCV2hbEWGFbXT0yNIsC7-SvLm2zljPrHz-M81_NuiekCdOh5dxZDvacuGqKuFaC3mNhEV6vtU6MIyhhykRJO7rVodyoiurqSkkW1PnnsGyZIQR-o7nsBZ95G1eIBLilqseUHHsFN_xwrWc9k0EHMAJ2vK2uZUuecOIaUgcmbaBL1SFq_F_5JdsU3IKtAZiQk92IEz0DlAy3JE3M0Rx0AvlLEOwvOTqA4qhYsv50LtWqeTxN36TBczvJBA'
      : video.thumbnail;

  return (
    <div className="flex flex-col w-full pb-20 max-w-4xl mx-auto">
      {/* Interactive Cinematic Player Canvas (16:9) */}
      <section
        className={`relative w-full aspect-video bg-[#0e0e0e] overflow-hidden select-none group transition-all duration-300 ${
          isFullscreen ? 'fixed inset-0 z-50 aspect-auto h-screen max-w-none' : ''
        }`}
      >
        {/* Poster / Video simulation background */}
        <div
          className="w-full h-full bg-cover bg-center transition-transform duration-500 scale-100"
          style={{ backgroundImage: `url('${playerCanvasBg}')` }}
        ></div>

        {/* Vignette Scrim & Controls Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e]/90 via-[#0e0e0e]/20 to-[#0e0e0e]/70 pointer-events-none"></div>

        {/* Floating HUD Toast */}
        {hudMessage && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#2a2a2a]/95 backdrop-blur-md shadow-lg border border-white/10 z-40 animate-fade-in pointer-events-none">
            <span className="text-[12px] text-[#F1F1F1] tracking-wide font-medium">
              {hudMessage}
            </span>
          </div>
        )}

        {/* Subtitles Overlay */}
        {ccActive && isPlaying && (
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 max-w-[90%] z-20 pointer-events-none text-center">
            <span className="bg-black/80 text-[#F1F1F1] px-3 py-1 rounded text-[13px] font-medium leading-relaxed shadow">
              [Narrator] Generative models and neural renderers have crossed the threshold of real-time intuition.
            </span>
          </div>
        )}

        {/* Center Play/Pause & Scrub Controls */}
        <div className="absolute inset-0 flex items-center justify-center gap-8 pointer-events-none z-20">
          <button
            onClick={handleRewind}
            aria-label="Rewind 10 seconds"
            className="pointer-events-auto w-10 h-10 rounded-full bg-[#131313]/50 backdrop-blur-sm flex items-center justify-center text-[#F1F1F1] active:scale-90 hover:bg-[#131313]/80 transition-all"
            title="Rewind 10s"
          >
            <span className="material-symbols-outlined text-[20px]">replay_10</span>
          </button>

          <button
            onClick={handlePlayPause}
            aria-label="Play or Pause"
            className="pointer-events-auto w-14 h-14 rounded-full bg-[#2a2a2a]/85 backdrop-blur-md text-[#F1F1F1] flex items-center justify-center shadow-xl active:scale-95 hover:bg-[#353534] transition-all"
          >
            <span
              className="material-symbols-outlined text-[32px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              {isPlaying ? 'pause' : 'play_arrow'}
            </span>
          </button>

          <button
            onClick={handleForward}
            aria-label="Forward 10 seconds"
            className="pointer-events-auto w-10 h-10 rounded-full bg-[#131313]/50 backdrop-blur-sm flex items-center justify-center text-[#F1F1F1] active:scale-90 hover:bg-[#131313]/80 transition-all"
            title="Forward 10s"
          >
            <span className="material-symbols-outlined text-[20px]">forward_10</span>
          </button>
        </div>

        {/* Top Overlay Controls Bar */}
        <div className="absolute top-0 left-0 right-0 p-3 flex items-center justify-between pointer-events-auto z-30">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-[#ff5540] text-[#5c0000] text-[11px] font-bold tracking-wider uppercase">
              4K HDR
            </span>
            <span className="text-[12px] text-[#AAAAAA] truncate max-w-[150px]">
              Streamflix Original
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handleCcToggle}
              aria-label="Toggle Subtitles"
              className={`h-7 px-2 rounded-full text-[#F1F1F1] text-[11px] font-bold tracking-wider flex items-center justify-center transition-all ${
                ccActive ? 'bg-[#282828]/90 text-white' : 'bg-[#282828]/40 text-[#AAAAAA]'
              }`}
            >
              CC
            </button>

            <button
              onClick={() => triggerHud('Quality: 2160p 4K 60fps HDR')}
              aria-label="Player Settings"
              className="w-8 h-8 rounded-full bg-[#282828]/80 text-[#F1F1F1] flex items-center justify-center active:scale-90 transition-all hover:bg-[#353534]"
            >
              <span className="material-symbols-outlined text-[18px]">settings</span>
            </button>

            <button
              onClick={() => {
                setIsFullscreen(!isFullscreen);
                triggerHud(!isFullscreen ? 'Entered Fullscreen' : 'Exited Fullscreen');
              }}
              aria-label="Toggle Fullscreen"
              className="w-8 h-8 rounded-full bg-[#282828]/80 text-[#F1F1F1] flex items-center justify-center active:scale-90 transition-all hover:bg-[#353534]"
            >
              <span className="material-symbols-outlined text-[18px]">
                {isFullscreen ? 'fullscreen_exit' : 'fullscreen'}
              </span>
            </button>
          </div>
        </div>

        {/* Bottom Scrubber & Time Indicator */}
        <div className="absolute bottom-0 inset-x-0 px-3.5 pb-2 pt-4 pointer-events-auto z-30 flex flex-col gap-1.5">
          {/* Scrub Bar */}
          <div
            onClick={handleScrub}
            className="relative w-full h-3 flex items-center cursor-pointer group/bar"
          >
            {/* Background Track */}
            <div className="w-full h-1 bg-[#353534]/60 rounded-full overflow-hidden relative">
              {/* Buffered Track (48%) */}
              <div className="absolute left-0 top-0 bottom-0 bg-[#3a3939] rounded-full w-[48%]"></div>
              {/* Played Track */}
              <div
                className="absolute left-0 top-0 bottom-0 bg-[#ff5540] rounded-full transition-all duration-150"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            {/* Scrubber Thumb */}
            <div
              className="absolute -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-[#ff5540] shadow-md scale-100 group-hover/bar:scale-125 transition-transform"
              style={{ left: `${progressPercent}%` }}
            ></div>
          </div>

          {/* Time Stamp Status */}
          <div className="flex items-center justify-between text-[#AAAAAA] text-[12px] px-0.5">
            <div className="flex items-center gap-1.5 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff5540] animate-pulse"></span>
              <span className="text-[#F1F1F1] font-semibold">{formatTime(currentTimeSec)}</span>
              <span>/</span>
              <span>{formatTime(totalTimeSec)}</span>
            </div>

            <button
              onClick={handleCycleSpeed}
              className="flex items-center gap-1 text-[#AAAAAA] hover:text-[#F1F1F1] active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[14px]">speed</span>
              <span className="text-[11px] font-bold text-[#F1F1F1]">{playbackSpeed}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Video Meta & Details Area */}
      <div className="px-3.5 flex flex-col pt-3">
        {/* Title */}
        <h1 className="text-[19px] font-bold text-[#F1F1F1] leading-snug tracking-tight">
          {video.title}
        </h1>

        {/* Collapsible Context Strip */}
        <div
          onClick={() => setDescExpanded(!descExpanded)}
          className="mt-2 p-2.5 rounded-lg bg-[#201f1f] hover:bg-[#252424] transition-all cursor-pointer border border-white/[0.04]"
        >
          <div className="flex items-baseline justify-between">
            <p className="text-[12px] text-[#AAAAAA] flex flex-wrap gap-x-1.5 leading-normal">
              <span className="text-[#F1F1F1] font-medium">{video.views}</span>
              <span>•</span>
              <span>{video.uploadDate}</span>
              <span className="text-[#afc6ff] font-medium">
                {video.hashtags ? video.hashtags.join(' ') : '#AI #Tech'}
              </span>
            </p>
            <button
              aria-label="Toggle description"
              className="text-[#AAAAAA] p-0.5"
            >
              <span className="material-symbols-outlined text-[18px]">
                {descExpanded ? 'expand_less' : 'expand_more'}
              </span>
            </button>
          </div>

          {descExpanded && (
            <div className="mt-2 pt-2 border-t border-white/[0.06] text-[#AAAAAA] text-[13px] leading-relaxed">
              <p>{video.description}</p>
              <div className="mt-2.5 flex flex-wrap gap-2">
                <span className="px-2 py-0.5 rounded bg-[#2a2a2a] text-[#F1F1F1] text-[11px] font-semibold">
                  Closed Captions (CC)
                </span>
                <span className="px-2 py-0.5 rounded bg-[#2a2a2a] text-[#F1F1F1] text-[11px] font-semibold">
                  Spatial Audio
                </span>
                <span className="px-2 py-0.5 rounded bg-[#2a2a2a] text-[#F1F1F1] text-[11px] font-semibold">
                  4K UHD 60 FPS
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Creator Bar */}
        <div className="mt-3.5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="relative shrink-0">
              <img
                src={video.channelAvatar}
                alt={video.channel}
                className="w-10 h-10 rounded-full object-cover ring-1 ring-white/10"
                referrerPolicy="no-referrer"
              />
              {video.verified && (
                <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-[#0e0e0e] rounded-full flex items-center justify-center">
                  <span
                    className="material-symbols-outlined text-[12px] text-[#acc7ff]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    verified
                  </span>
                </span>
              )}
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1">
                <span className="text-[15px] font-semibold text-[#F1F1F1] truncate">
                  {video.channel}
                </span>
              </div>
              <span className="text-[12px] text-[#AAAAAA]">{video.channelSubscribers} subscribers</span>
            </div>
          </div>

          {/* Creator Action Buttons */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => triggerHud('Streamflix Channel Membership info')}
              className="px-3.5 py-1.5 rounded-full bg-[#2a2a2a] text-[#F1F1F1] text-xs font-semibold hover:bg-[#353534] active:scale-95 transition-all"
            >
              Join
            </button>
            <button
              onClick={handleSubscribeToggle}
              className={`px-4 py-1.5 rounded-full text-xs font-bold shadow-md active:scale-95 transition-all flex items-center gap-1 ${
                isSubscribed
                  ? 'bg-[#2a2a2a] text-[#F1F1F1] border border-white/10'
                  : 'bg-[#F1F1F1] text-[#0e0e0e] hover:bg-white'
              }`}
            >
              <span>{isSubscribed ? 'Subscribed' : 'Subscribe'}</span>
              {isSubscribed && (
                <span className="material-symbols-outlined text-[16px]">
                  notifications_active
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Horizontal Action Ribbon Carousel */}
        <div className="mt-3.5 -mx-3.5 px-3.5 flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {/* Like / Dislike Split Capsule */}
          <div className="flex items-center rounded-full bg-[#201f1f] shrink-0 overflow-hidden border border-white/[0.06]">
            <button
              onClick={handleLikeToggle}
              className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold active:bg-[#353534] transition-colors ${
                isLiked ? 'text-[#ff5540]' : 'text-[#F1F1F1]'
              }`}
            >
              <span
                className="material-symbols-outlined text-[18px]"
                style={{ fontVariationSettings: isLiked ? "'FILL' 1" : "'FILL' 0" }}
              >
                thumb_up
              </span>
              <span>{isLiked ? '143K' : video.likes}</span>
            </button>
            <div className="w-[1px] h-4 bg-[#3a3939]"></div>
            <button
              onClick={handleDislikeToggle}
              aria-label="Dislike"
              className={`px-3 py-2 active:bg-[#353534] transition-colors ${
                isDisliked ? 'text-[#ff5540]' : 'text-[#F1F1F1]'
              }`}
            >
              <span
                className="material-symbols-outlined text-[18px]"
                style={{ fontVariationSettings: isDisliked ? "'FILL' 1" : "'FILL' 0" }}
              >
                thumb_down
              </span>
            </button>
          </div>

          {/* Share Button */}
          <button
            onClick={() => onShareClick(video)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#201f1f] text-[#F1F1F1] text-xs font-semibold shrink-0 hover:bg-[#2a2a2a] active:bg-[#353534] transition-colors border border-white/[0.06]"
          >
            <span className="material-symbols-outlined text-[18px]">share</span>
            <span>Share</span>
          </button>

          {/* Remix */}
          <button
            onClick={() => triggerHud('Remix video clip')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#201f1f] text-[#F1F1F1] text-xs font-semibold shrink-0 hover:bg-[#2a2a2a] active:bg-[#353534] transition-colors border border-white/[0.06]"
          >
            <span className="material-symbols-outlined text-[18px]">auto_fix_high</span>
            <span>Remix</span>
          </button>

          {/* Download */}
          <button
            onClick={handleDownloadToggle}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#201f1f] text-xs font-semibold shrink-0 hover:bg-[#2a2a2a] active:bg-[#353534] transition-colors border border-white/[0.06] ${
              isDownloaded ? 'text-[#acc7ff]' : 'text-[#F1F1F1]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">
              {isDownloaded ? 'download_done' : 'download'}
            </span>
            <span>{isDownloaded ? 'Downloaded' : 'Download'}</span>
          </button>

          {/* Clip */}
          <button
            onClick={() => triggerHud('Clip segment created')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#201f1f] text-[#F1F1F1] text-xs font-semibold shrink-0 hover:bg-[#2a2a2a] active:bg-[#353534] transition-colors border border-white/[0.06]"
          >
            <span className="material-symbols-outlined text-[18px]">content_cut</span>
            <span>Clip</span>
          </button>

          {/* Save to Playlist */}
          <button
            onClick={handleSaveToggle}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#201f1f] text-xs font-semibold shrink-0 hover:bg-[#2a2a2a] active:bg-[#353534] transition-colors border border-white/[0.06] ${
              isSaved ? 'text-[#ffb4a8]' : 'text-[#F1F1F1]'
            }`}
          >
            <span
              className="material-symbols-outlined text-[18px]"
              style={{ fontVariationSettings: isSaved ? "'FILL' 1" : "'FILL' 0" }}
            >
              {isSaved ? 'bookmark_added' : 'bookmark_add'}
            </span>
            <span>{isSaved ? 'Saved' : 'Save'}</span>
          </button>
        </div>

        {/* Pinned Top Comments Preview Card */}
        <div
          onClick={() => setCommentsModalOpen(true)}
          className="mt-3.5 p-3 rounded-xl bg-[#201f1f] hover:bg-[#252424] cursor-pointer transition-colors border border-white/[0.05]"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-[15px] font-semibold text-[#F1F1F1]">Comments</span>
              <span className="text-xs text-[#AAAAAA]">{video.commentsCount}</span>
            </div>
            <span className="material-symbols-outlined text-[18px] text-[#AAAAAA]">
              unfold_more
            </span>
          </div>

          {/* Excerpt */}
          <div className="flex items-start gap-2.5">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCoFxhV2RrrWP5bgt2OlYKpw743QYVN4BxsA8kkZXE6WexZsWTaj2lyZe9WEtJpLBiXCEEq3Y3M8wLkm6XSgopSrQ0kQLHvagcApVOTyL52hYJ5J5ujuGrCKY_M2YVpMjZ7rV2AExsvWFLduiHqLFQEdek0hlvHi76vMlORTQ2Vm0m0LgdO6-2YddYCp6UxhNFdRhY9a500BxguV0Osb2fqt4KoGwOeid_0k0zTinIPQ5gD0K9rTtN-QQ"
              alt="Alex Matrix"
              className="w-7 h-7 rounded-full object-cover shrink-0 mt-0.5"
              referrerPolicy="no-referrer"
            />
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-[#AAAAAA] font-semibold">@alex_matrix</span>
                <span className="px-1.5 py-0.2 rounded bg-[#2a2a2a] text-[#ffb4a8] text-[10px] font-semibold">
                  Pinned
                </span>
              </div>
              <p className="text-xs text-[#F1F1F1] line-clamp-2 mt-0.5">
                The cinematography at 12:40 is mind-blowing! Best tech doc this year.
              </p>
              <div className="flex items-center gap-3 mt-1.5 text-[#AAAAAA] text-xs">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">thumb_up</span>
                  <span>1.8K</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">chat_bubble</span>
                  <span>42</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Up Next / Related Content List */}
        <div className="mt-5 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h2 className="text-[16px] font-bold text-[#F1F1F1]">Up Next</h2>
            {/* Autoplay Switch Toggle */}
            <div className="flex items-center gap-2 text-[#AAAAAA] text-xs">
              <span>Autoplay</span>
              <button
                onClick={() => {
                  setIsAutoplay(!isAutoplay);
                  triggerHud(!isAutoplay ? 'Autoplay Enabled' : 'Autoplay Disabled');
                }}
                aria-label="Toggle autoplay"
                className={`w-8 h-4 rounded-full p-0.5 flex items-center transition-colors ${
                  isAutoplay ? 'bg-[#ff5540] justify-end' : 'bg-[#353534] justify-start'
                }`}
              >
                <span className="w-3 h-3 rounded-full bg-white shadow"></span>
              </button>
            </div>
          </div>

          {/* Recommendations List */}
          {upNextVideos.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectVideo(item)}
              className="flex gap-2.5 items-start cursor-pointer group active:opacity-80 transition-opacity p-1 rounded-lg hover:bg-[#201f1f]/50"
            >
              <div className="relative w-36 aspect-video rounded-lg overflow-hidden shrink-0 bg-[#2a2a2a]">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/85 text-[11px] font-medium text-[#F1F1F1]">
                  {item.duration}
                </span>
                {item.id === 'sora-arch' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#353534]">
                    <div className="w-2/3 h-full bg-[#ff5540]"></div>
                  </div>
                )}
              </div>

              <div className="flex flex-col min-w-0 flex-1">
                <h3 className="text-[13px] font-medium text-[#F1F1F1] line-clamp-2 leading-snug group-hover:text-white">
                  {item.title}
                </h3>
                <p className="text-[11px] text-[#AAAAAA] mt-1 truncate">{item.channel}</p>
                <p className="text-[11px] text-[#AAAAAA]">{item.views} • {item.uploadDate}</p>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenActionDrawer(item);
                }}
                aria-label="More options for video"
                className="text-[#AAAAAA] p-1 rounded-full hover:text-[#F1F1F1]"
              >
                <span className="material-symbols-outlined text-[18px]">more_vert</span>
              </button>
            </div>
          ))}

          {/* Streamflix Premium Banner Teaser */}
          <div className="mt-2 p-3.5 rounded-xl bg-gradient-to-r from-[#2a2a2a] via-[#201f1f] to-[#1c1b1b] flex items-center justify-between shadow-md border border-white/[0.06]">
            <div className="flex flex-col pr-2">
              <span className="text-[10px] font-bold text-[#ffb4a8] tracking-widest uppercase">
                Streamflix Premium
              </span>
              <span className="text-[14px] font-semibold text-[#F1F1F1] mt-0.5">
                Stream uninterrupted in 4K HDR
              </span>
              <span className="text-[12px] text-[#AAAAAA]">
                Background play & offline downloads included
              </span>
            </div>
            <button
              onClick={() => triggerHud('Welcome to Streamflix Premium 30-Day Trial!')}
              className="px-3.5 py-2 rounded-full bg-[#ff5540] text-[#5c0000] text-xs font-bold shrink-0 active:scale-95 transition-transform shadow"
            >
              Try Free
            </button>
          </div>
        </div>
      </div>

      {/* Full Comments Modal Drawer */}
      {commentsModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex flex-col justify-end">
          <div className="bg-[#201f1f] rounded-t-2xl max-h-[75vh] flex flex-col shadow-2xl border-t border-white/10 animate-slide-up">
            <div className="p-3 flex items-center justify-between border-b border-white/10">
              <span className="text-[16px] font-bold text-[#F1F1F1]">
                Comments ({comments.length})
              </span>
              <button
                onClick={() => setCommentsModalOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#AAAAAA] hover:text-white"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="p-3 overflow-y-auto space-y-3 flex-1">
              {comments.map((c) => (
                <div key={c.id} className="flex items-start gap-2.5">
                  <img
                    src={c.avatar}
                    alt={c.author}
                    className="w-7 h-7 rounded-full object-cover shrink-0 mt-0.5"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-[#AAAAAA] font-semibold">{c.handle}</span>
                      <span className="text-[11px] text-[#AAAAAA]/70">{c.timeAgo}</span>
                      {c.isPinned && (
                        <span className="px-1.5 py-0.2 rounded bg-[#2a2a2a] text-[#ffb4a8] text-[9px] font-semibold">
                          Pinned
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#F1F1F1] mt-0.5">{c.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <form
              onSubmit={handleAddComment}
              className="p-3 bg-[#2a2a2a] flex items-center gap-2 border-t border-white/10"
            >
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1 bg-[#353534] px-3.5 py-2 rounded-full text-xs text-[#F1F1F1] placeholder:text-[#AAAAAA] focus:outline-none focus:ring-1 focus:ring-[#ff5540]"
              />
              <button
                type="submit"
                className="w-8 h-8 rounded-full bg-[#ff5540] text-white flex items-center justify-center active:scale-90 transition-transform disabled:opacity-50"
                disabled={!newComment.trim()}
              >
                <span className="material-symbols-outlined text-[16px]">send</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
