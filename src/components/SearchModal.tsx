import React, { useState } from 'react';
import { VideoItem, ShortItem } from '../types.ts';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  videos: VideoItem[];
  shorts: ShortItem[];
  onSelectVideo: (video: VideoItem) => void;
  onSelectShort: (short: ShortItem) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  videos,
  shorts,
  onSelectVideo,
  onSelectShort,
}) => {
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);

  if (!isOpen) return null;

  const popularSearches = [
    'AI & Human Creativity',
    'Apple Secret Lab',
    'Lo-Fi Coding Beats',
    'Unreal Engine 5.5',
    'OpenAI Sora',
    'Michelin Duck Breast',
    'Quantum Computing',
  ];

  const filteredVideos = query.trim()
    ? videos.filter(
        (v) =>
          v.title.toLowerCase().includes(query.toLowerCase()) ||
          v.channel.toLowerCase().includes(query.toLowerCase()) ||
          (v.hashtags && v.hashtags.some((h) => h.toLowerCase().includes(query.toLowerCase())))
      )
    : [];

  const filteredShorts = query.trim()
    ? shorts.filter(
        (s) =>
          s.title.toLowerCase().includes(query.toLowerCase()) ||
          s.creatorName.toLowerCase().includes(query.toLowerCase()) ||
          (s.hashtags && s.hashtags.some((h) => h.toLowerCase().includes(query.toLowerCase())))
      )
    : [];

  const handleVoiceSearch = () => {
    setIsListening(true);
    setTimeout(() => {
      setQuery('Cyberpunk 2077');
      setIsListening(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#131313]/95 backdrop-blur-xl flex flex-col animate-fade-in">
      {/* Search Header */}
      <div className="h-14 px-3 flex items-center gap-2 border-b border-white/[0.08] max-w-4xl mx-auto w-full">
        <button
          onClick={onClose}
          aria-label="Back"
          className="w-10 h-10 flex items-center justify-center text-[#F1F1F1] rounded-full hover:bg-[#212121]"
        >
          <span className="material-symbols-outlined text-[24px]">arrow_back</span>
        </button>

        <div className="flex-1 flex items-center bg-[#212121] rounded-full px-3.5 py-1.5 border border-white/10 focus-within:border-[#005dd2]">
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Streamflix..."
            className="flex-1 bg-transparent text-[#F1F1F1] placeholder:text-[#AAAAAA] text-sm focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="w-6 h-6 flex items-center justify-center text-[#AAAAAA] hover:text-[#F1F1F1] mr-1"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          )}
        </div>

        <button
          onClick={handleVoiceSearch}
          aria-label="Voice Search"
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
            isListening ? 'bg-[#ff5540] text-white animate-pulse' : 'bg-[#212121] text-[#F1F1F1] hover:bg-[#353534]'
          }`}
          title="Voice Search"
        >
          <span className="material-symbols-outlined text-[20px]">
            {isListening ? 'graphic_eq' : 'mic'}
          </span>
        </button>
      </div>

      {/* Search Body */}
      <div className="flex-1 overflow-y-auto px-4 py-4 max-w-4xl mx-auto w-full">
        {/* If no query, show trending / recent tags */}
        {!query.trim() ? (
          <div>
            <h3 className="text-xs font-bold text-[#AAAAAA] uppercase tracking-wider mb-3">
              Trending Searches
            </h3>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="px-3.5 py-2 rounded-full bg-[#212121] hover:bg-[#2a2a2a] text-[#F1F1F1] text-xs font-medium flex items-center gap-1.5 transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px] text-[#AAAAAA]">
                    trending_up
                  </span>
                  {term}
                </button>
              ))}
            </div>

            <div className="mt-6">
              <h3 className="text-xs font-bold text-[#AAAAAA] uppercase tracking-wider mb-3">
                Featured Creators
              </h3>
              <div className="flex flex-col gap-2">
                <div
                  onClick={() => setQuery('TechSphere')}
                  className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#201f1f] cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[#AAAAAA]">history</span>
                  <span className="text-sm text-[#F1F1F1]">TechSphere Media</span>
                </div>
                <div
                  onClick={() => setQuery('MKBHD')}
                  className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#201f1f] cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[#AAAAAA]">history</span>
                  <span className="text-sm text-[#F1F1F1]">MKBHD Hardware Lab</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <span className="text-xs text-[#AAAAAA]">
              Results for &ldquo;{query}&rdquo;
            </span>

            {/* Video Results */}
            {filteredVideos.length > 0 && (
              <div className="flex flex-col gap-3">
                <h4 className="text-xs font-bold text-[#AAAAAA] uppercase tracking-wider">
                  Videos ({filteredVideos.length})
                </h4>
                {filteredVideos.map((v) => (
                  <div
                    key={v.id}
                    onClick={() => {
                      onSelectVideo(v);
                      onClose();
                    }}
                    className="flex gap-3 p-2 rounded-xl bg-[#201f1f] hover:bg-[#2a2a2a] cursor-pointer"
                  >
                    <img
                      src={v.thumbnail}
                      alt={v.title}
                      className="w-32 aspect-video rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-[#F1F1F1] line-clamp-2">
                        {v.title}
                      </h4>
                      <p className="text-xs text-[#AAAAAA] mt-1">{v.channel} • {v.views}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Shorts Results */}
            {filteredShorts.length > 0 && (
              <div className="flex flex-col gap-3 mt-2">
                <h4 className="text-xs font-bold text-[#AAAAAA] uppercase tracking-wider">
                  Shorts ({filteredShorts.length})
                </h4>
                <div className="flex gap-3 overflow-x-auto no-scrollbar">
                  {filteredShorts.map((s) => (
                    <div
                      key={s.id}
                      onClick={() => {
                        onSelectShort(s);
                        onClose();
                      }}
                      className="flex-shrink-0 w-28 aspect-[9/16] rounded-xl overflow-hidden relative cursor-pointer group"
                    >
                      <img
                        src={s.image}
                        alt={s.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2">
                        <p className="text-[11px] text-[#F1F1F1] font-semibold line-clamp-2">
                          {s.title}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {filteredVideos.length === 0 && filteredShorts.length === 0 && (
              <div className="py-12 text-center text-[#AAAAAA]">
                <span className="material-symbols-outlined text-[48px] text-[#353534] mb-2">
                  search_off
                </span>
                <p className="text-sm">No videos found for &ldquo;{query}&rdquo;</p>
                <p className="text-xs mt-1 text-[#AAAAAA]/70">Try searching for &quot;AI&quot;, &quot;Apple&quot;, or &quot;Tech&quot;</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
