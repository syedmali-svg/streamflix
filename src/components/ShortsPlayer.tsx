import React, { useState, useEffect, useRef } from 'react';
import { ShortItem, CommentItem } from '../types.ts';

interface ShortsPlayerProps {
  currentShort: ShortItem;
  allShorts: ShortItem[];
  onSelectShort: (short: ShortItem) => void;
  onOpenSearch: () => void;
  onCreateClick: () => void;
  onShareClick: (short: ShortItem) => void;
}

interface HeartParticle {
  id: number;
  x: number;
  y: number;
}

export const ShortsPlayer: React.FC<ShortsPlayerProps> = ({
  currentShort,
  allShorts,
  onSelectShort,
  onOpenSearch,
  onCreateClick,
  onShareClick,
}) => {
  const [isLiked, setIsLiked] = useState<boolean>(currentShort.isLiked);
  const [likesCount, setLikesCount] = useState<number>(currentShort.likesCount);
  const [isDisliked, setIsDisliked] = useState<boolean>(currentShort.isDisliked);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(currentShort.isSubscribed);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [showPauseIndicator, setShowPauseIndicator] = useState<boolean>(false);
  const [commentsOpen, setCommentsOpen] = useState<boolean>(false);
  const [comments, setComments] = useState<CommentItem[]>(currentShort.comments);
  const [newCommentText, setNewCommentText] = useState<string>('');
  const [hearts, setHearts] = useState<HeartParticle[]>([]);
  const [progress, setProgress] = useState<number>(42);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const lastTapRef = useRef<number>(0);

  // Sync when currentShort changes
  useEffect(() => {
    setIsLiked(currentShort.isLiked);
    setLikesCount(currentShort.likesCount);
    setIsDisliked(currentShort.isDisliked);
    setIsSubscribed(currentShort.isSubscribed);
    setComments(currentShort.comments);
    setProgress(35);
  }, [currentShort]);

  // Simulate video playback progress
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 0.4));
    }, 100);
    return () => clearInterval(interval);
  }, [isPaused]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 1800);
  };

  const spawnHeart = (x: number, y: number) => {
    const id = Date.now() + Math.random();
    setHearts((prev) => [...prev, { id, x, y }]);
    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h.id !== id));
    }, 800);
  };

  const handleLikeToggle = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!isLiked) {
      setIsLiked(true);
      setLikesCount((c) => c + 1);
      setIsDisliked(false);
      // trigger heart animation
      const x = window.innerWidth / 2;
      const y = window.innerHeight / 2;
      spawnHeart(x, y);
    } else {
      setIsLiked(false);
      setLikesCount((c) => c - 1);
    }
  };

  const handleDislikeToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDisliked(!isDisliked);
    if (!isDisliked && isLiked) {
      setIsLiked(false);
      setLikesCount((c) => c - 1);
    }
  };

  const handleScreenTap = (e: React.MouseEvent) => {
    const now = Date.now();
    const diff = now - lastTapRef.current;

    if (diff < 300) {
      // Double tap -> heart burst + like
      if (!isLiked) {
        handleLikeToggle();
      }
      spawnHeart(e.clientX, e.clientY);
    } else {
      // Single tap -> toggle pause
      setIsPaused((p) => !p);
      setShowPauseIndicator(true);
      setTimeout(() => setShowPauseIndicator(false), 500);
    }
    lastTapRef.current = now;
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const newComment: CommentItem = {
      id: 'c_' + Date.now(),
      author: 'You',
      handle: '@you',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDj8PTnEF6VClpqnVcy3XixTRuMxf9X0oZNhzP1uZjcXuX4ZArzOPBjVWKGOezK6bl25gkNhOm1pJmOaoRaizkLesC_V93oFKr_wT_E4VH_ZTvTfDGZfyhTRI9Id6ut6o7f0XD-sxk6bYYN-TNpnMwk2hURDfcOc4t_nQTUP-qttOy385IIJ_Qgd1qmgdmKhIC29cQFS16THTSrIhzHtVsD5GDpoY4l1_EnNoYEV-uDlyhOuUJBAk_Kjg',
      text: newCommentText.trim(),
      timeAgo: 'Just now',
      likes: '0',
    };

    setComments((prev) => [newComment, ...prev]);
    setNewCommentText('');
    showToast('Comment posted');
  };

  const currentIndex = allShorts.findIndex((s) => s.id === currentShort.id);
  const goToNextShort = () => {
    const nextIdx = (currentIndex + 1) % allShorts.length;
    onSelectShort(allShorts[nextIdx]);
  };
  const goToPrevShort = () => {
    const prevIdx = (currentIndex - 1 + allShorts.length) % allShorts.length;
    onSelectShort(allShorts[prevIdx]);
  };

  return (
    <div className="relative w-full h-[calc(100vh-3.5rem)] max-h-[880px] overflow-hidden select-none bg-[#0e0e0e] max-w-md mx-auto shadow-2xl">
      {/* HUD Toast */}
      {toastMessage && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-50 bg-[#282828]/95 text-[#F1F1F1] px-4 py-2 rounded-full text-xs font-medium shadow-2xl backdrop-blur-md border border-white/10 animate-fade-in flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[16px] text-[#ff5540]">info</span>
          {toastMessage}
        </div>
      )}

      {/* Heart burst particles */}
      {hearts.map((h) => (
        <div
          key={h.id}
          className="absolute z-40 text-[#CC0000] pointer-events-none transform -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ease-out animate-ping"
          style={{
            left: h.x,
            top: h.y,
            fontSize: '72px',
          }}
        >
          <span
            className="material-symbols-outlined text-[72px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            favorite
          </span>
        </div>
      ))}

      {/* Immersive Vertical Video Media Canvas */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          alt="Shorts Video Canvas"
          className="w-full h-full object-cover pointer-events-none transform scale-[1.01]"
          src={currentShort.image}
          referrerPolicy="no-referrer"
        />
        {/* Ambient Gradient Scrims for Text Legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0e0e0e]/80 via-transparent to-[#0e0e0e]/95 pointer-events-none"></div>
        <div className="absolute inset-x-0 bottom-0 h-80 bg-gradient-to-t from-[#0e0e0e] via-[#0e0e0e]/70 to-transparent pointer-events-none"></div>
      </div>

      {/* Top Contextual Quick Navigation Bar */}
      <header className="relative z-30 flex items-center justify-between px-3.5 pt-3 pb-2 w-full text-[#F1F1F1]">
        <div className="flex items-center gap-2">
          <span className="text-[20px] tracking-tight font-bold drop-shadow-md flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#ff5540] text-[24px]">bolt</span>
            Shorts
          </span>
          <span className="bg-[#212121]/70 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider text-[#ffb4a8] border border-white/5">
            Live Feed
          </span>
        </div>

        {/* Quick Utilities */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => {
              setIsMuted(!isMuted);
              showToast(isMuted ? 'Sound Unmuted' : 'Sound Muted');
            }}
            aria-label="Toggle Sound"
            className="w-10 h-10 rounded-full bg-[#212121]/60 backdrop-blur-md flex items-center justify-center text-[#F1F1F1] active:scale-90 transition-transform hover:bg-[#212121]/80"
          >
            <span className="material-symbols-outlined text-[20px]">
              {isMuted ? 'volume_off' : 'volume_up'}
            </span>
          </button>

          <button
            onClick={onCreateClick}
            aria-label="Camera Create Shortcut"
            className="w-10 h-10 rounded-full bg-[#212121]/60 backdrop-blur-md flex items-center justify-center text-[#F1F1F1] active:scale-90 transition-transform hover:bg-[#212121]/80"
          >
            <span className="material-symbols-outlined text-[20px]">videocam</span>
          </button>

          <button
            onClick={onOpenSearch}
            aria-label="Search Shorts"
            className="w-10 h-10 rounded-full bg-[#212121]/60 backdrop-blur-md flex items-center justify-center text-[#F1F1F1] active:scale-90 transition-transform hover:bg-[#212121]/80"
          >
            <span className="material-symbols-outlined text-[20px]">search</span>
          </button>
        </div>
      </header>

      {/* Screen Tap Area (Play/Pause & Double-Tap Heart) */}
      <div
        onClick={handleScreenTap}
        className="flex-1 w-full h-[calc(100%-14rem)] relative z-10 flex items-center justify-center cursor-pointer"
      >
        {/* Animated Play/Pause feedback circle */}
        {showPauseIndicator && (
          <div className="w-16 h-16 rounded-full bg-[#212121]/80 backdrop-blur-md flex items-center justify-center text-[#F1F1F1] transition-all duration-300 pointer-events-none shadow-xl animate-scale-up">
            <span className="material-symbols-outlined text-[36px]">
              {isPaused ? 'pause' : 'play_arrow'}
            </span>
          </div>
        )}

        {/* Up / Down navigation buttons for desktop accessibility */}
        <div className="absolute left-3 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-20 opacity-0 hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToPrevShort();
            }}
            title="Previous Short"
            className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/80"
          >
            <span className="material-symbols-outlined text-[20px]">expand_less</span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToNextShort();
            }}
            title="Next Short"
            className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/80"
          >
            <span className="material-symbols-outlined text-[20px]">expand_more</span>
          </button>
        </div>
      </div>

      {/* Right Floating Action Bar (Vertical Engagement Rail) */}
      <aside className="absolute right-2 bottom-12 z-30 flex flex-col items-center gap-3.5">
        {/* Like Button */}
        <div className="flex flex-col items-center">
          <button
            onClick={handleLikeToggle}
            aria-label="Like Video"
            className="w-12 h-12 rounded-full bg-[#212121]/60 backdrop-blur-md flex items-center justify-center text-[#F1F1F1] active:scale-75 transition-all duration-200 group"
          >
            <span
              className={`material-symbols-outlined text-[26px] group-hover:scale-110 transition-transform ${
                isLiked ? 'text-[#ff5540]' : ''
              }`}
              style={{ fontVariationSettings: isLiked ? "'FILL' 1" : "'FILL' 0" }}
            >
              thumb_up
            </span>
          </button>
          <span className="text-[12px] text-[#F1F1F1] mt-1 drop-shadow-md font-semibold">
            {isLiked ? '843K' : currentShort.likes}
          </span>
        </div>

        {/* Dislike Button */}
        <div className="flex flex-col items-center">
          <button
            onClick={handleDislikeToggle}
            aria-label="Dislike Video"
            className="w-12 h-12 rounded-full bg-[#212121]/60 backdrop-blur-md flex items-center justify-center text-[#F1F1F1] active:scale-75 transition-all duration-200"
          >
            <span
              className="material-symbols-outlined text-[26px]"
              style={{ fontVariationSettings: isDisliked ? "'FILL' 1" : "'FILL' 0" }}
            >
              thumb_down
            </span>
          </button>
          <span className="text-[12px] text-[#F1F1F1] mt-1 drop-shadow-md">Dislike</span>
        </div>

        {/* Comments Button */}
        <div className="flex flex-col items-center">
          <button
            onClick={() => setCommentsOpen(true)}
            aria-label="View Comments"
            className="w-12 h-12 rounded-full bg-[#212121]/60 backdrop-blur-md flex items-center justify-center text-[#F1F1F1] active:scale-75 transition-all duration-200"
          >
            <span className="material-symbols-outlined text-[26px]">chat_bubble</span>
          </button>
          <span className="text-[12px] text-[#F1F1F1] mt-1 drop-shadow-md font-semibold">
            {comments.length > 2 ? `${comments.length} comments` : currentShort.commentsCount}
          </span>
        </div>

        {/* Share Button */}
        <div className="flex flex-col items-center">
          <button
            onClick={() => onShareClick(currentShort)}
            aria-label="Share Video"
            className="w-12 h-12 rounded-full bg-[#212121]/60 backdrop-blur-md flex items-center justify-center text-[#F1F1F1] active:scale-75 transition-all duration-200"
          >
            <span className="material-symbols-outlined text-[26px]">reply</span>
          </button>
          <span className="text-[12px] text-[#F1F1F1] mt-1 drop-shadow-md font-semibold">
            {currentShort.shares}
          </span>
        </div>

        {/* Remix / Spinning Vinyl Audio Disc */}
        <div className="flex flex-col items-center relative pt-1">
          <button
            onClick={() => showToast(`Using sound: ${currentShort.audioTrack}`)}
            aria-label="Use This Sound"
            className="relative w-12 h-12 rounded-full p-0.5 bg-gradient-to-tr from-[#ff5540] via-[#212121] to-[#afc6ff] flex items-center justify-center active:scale-90 transition-transform"
          >
            <div
              className={`w-full h-full rounded-full overflow-hidden flex items-center justify-center bg-[#0e0e0e] ${
                isPaused ? '' : 'animate-[spin_6s_linear_infinite]'
              }`}
            >
              <img
                alt="Audio Cover"
                className="w-full h-full object-cover"
                src={currentShort.audioCover}
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Animated floating music note pin */}
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#ffb4a8] text-[#690100] text-[10px] animate-bounce shadow">
              <span
                className="material-symbols-outlined text-[11px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                music_note
              </span>
            </span>
          </button>
          <span className="text-[12px] text-[#F1F1F1] mt-1 drop-shadow-md">Remix</span>
        </div>

        {/* More Options Menu */}
        <button
          onClick={() => showToast('Shorts options')}
          aria-label="More Options"
          className="w-10 h-10 rounded-full flex items-center justify-center text-[#F1F1F1] active:bg-[#212121]/60 transition-colors"
        >
          <span className="material-symbols-outlined text-[24px]">more_vert</span>
        </button>
      </aside>

      {/* Bottom Left Creator & Content Overlay Information */}
      <div className="absolute left-0 bottom-4 right-16 z-30 px-3.5 flex flex-col justify-end pointer-events-none">
        <div className="pointer-events-auto space-y-2">
          {/* Creator Profile Row */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <div className="relative w-10 h-10">
              <img
                alt={currentShort.creatorName}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-[#ff5540]/80 shadow-md"
                src={currentShort.creatorAvatar}
                referrerPolicy="no-referrer"
              />
              <button
                onClick={() => {
                  setIsSubscribed(!isSubscribed);
                  showToast(isSubscribed ? 'Unfollowed creator' : 'Following creator!');
                }}
                aria-label="Follow Creator"
                className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#CC0000] text-[#F1F1F1] rounded-full flex items-center justify-center shadow-lg active:scale-125 transition-transform"
              >
                <span className="material-symbols-outlined text-[13px] font-bold">
                  {isSubscribed ? 'check' : 'add'}
                </span>
              </button>
            </div>

            <div className="flex items-center gap-1.5 min-w-0">
              <span className="text-[15px] text-[#F1F1F1] font-semibold tracking-tight drop-shadow truncate">
                {currentShort.creatorHandle}
              </span>
              {currentShort.isVerified && (
                <span
                  className="material-symbols-outlined text-[16px] text-[#488fff] drop-shadow"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  verified
                </span>
              )}
            </div>

            <button
              onClick={() => {
                setIsSubscribed(!isSubscribed);
                showToast(isSubscribed ? 'Unsubscribed' : 'Subscribed to channel!');
              }}
              className={`font-semibold text-xs px-3.5 py-1.5 rounded-full shadow-lg active:scale-95 transition-all duration-150 ${
                isSubscribed
                  ? 'bg-[#212121]/90 text-[#F1F1F1] border border-white/10'
                  : 'bg-[#F1F1F1] text-[#0e0e0e] hover:bg-white'
              }`}
            >
              {isSubscribed ? 'Subscribed' : 'Subscribe'}
            </button>
          </div>

          {/* Caption & Hashtags */}
          <div className="max-w-[94%]">
            <p className="text-[14px] text-[#F1F1F1] drop-shadow leading-snug line-clamp-2">
              {currentShort.title}{' '}
              {currentShort.hashtags.map((tag) => (
                <span key={tag} className="text-[#acc7ff] font-medium mr-1">
                  {tag}
                </span>
              ))}
            </p>
          </div>

          {/* Audio Track Marquee / Ticker */}
          <div className="inline-flex items-center gap-2 bg-[#212121]/50 backdrop-blur-md px-3 py-1 rounded-full max-w-full overflow-hidden text-[#F1F1F1] border border-white/5 shadow-sm">
            <span className="material-symbols-outlined text-[15px] text-[#ffb4a8] shrink-0 animate-pulse">
              music_note
            </span>
            <div className="overflow-hidden whitespace-nowrap min-w-0">
              <p className="text-[12px] text-[#AAAAAA] font-medium tracking-wide inline-block animate-[marquee_12s_linear_infinite]">
                {currentShort.audioTrack}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Slide-Up Comments Drawer */}
      <div
        className={`absolute inset-x-0 bottom-0 z-40 bg-[#201f1f]/95 backdrop-blur-2xl rounded-t-2xl transform transition-transform duration-300 ease-out flex flex-col max-h-[70%] shadow-2xl border-t border-white/10 ${
          commentsOpen ? 'translate-y-0' : 'translate-y-full pointer-events-none'
        }`}
      >
        <div
          onClick={() => setCommentsOpen(false)}
          className="w-12 h-1 bg-[#3a3939] rounded-full mx-auto mt-2.5 mb-1.5 cursor-pointer"
        ></div>
        <div className="flex items-center justify-between px-3.5 py-2 border-b border-white/5">
          <span className="text-[16px] text-[#F1F1F1] font-bold">
            Comments <span className="text-[#AAAAAA] text-sm font-normal">12.4K</span>
          </span>
          <button
            onClick={() => setCommentsOpen(false)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#AAAAAA] hover:text-[#F1F1F1]"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Comment list */}
        <div className="px-3.5 py-3 overflow-y-auto space-y-3.5 flex-1">
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
                  <span className="text-[12px] text-[#AAAAAA] font-semibold">{c.handle}</span>
                  <span className="text-[11px] text-[#AAAAAA]/70">{c.timeAgo}</span>
                </div>
                <p className="text-[13px] text-[#F1F1F1] mt-0.5 leading-snug">{c.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Comment Input */}
        <form
          onSubmit={handleAddComment}
          className="p-3 bg-[#2a2a2a]/80 flex items-center gap-2 border-t border-white/5"
        >
          <input
            type="text"
            value={newCommentText}
            onChange={(e) => setNewCommentText(e.target.value)}
            placeholder="Add a comment..."
            className="flex-1 bg-[#353534] px-3.5 py-2 rounded-full text-sm text-[#F1F1F1] placeholder:text-[#AAAAAA] focus:outline-none focus:ring-1 focus:ring-[#ff5540]"
          />
          <button
            type="submit"
            className="w-9 h-9 rounded-full bg-[#ff5540] text-white flex items-center justify-center active:scale-90 transition-transform disabled:opacity-50"
            disabled={!newCommentText.trim()}
          >
            <span className="material-symbols-outlined text-[18px]">send</span>
          </button>
        </form>
      </div>

      {/* Bottom Playback Seekbar Progress Indicator */}
      <div
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const clickX = e.clientX - rect.left;
          const pct = Math.max(0, Math.min(100, (clickX / rect.width) * 100));
          setProgress(pct);
        }}
        className="absolute inset-x-0 bottom-0 z-50 h-1 bg-[#353534]/60 overflow-hidden cursor-pointer"
      >
        <div
          className="h-full bg-[#CC0000] shadow-[0_0_8px_rgba(204,0,0,0.8)] transition-all duration-100 ease-linear"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};
