import React, { useState } from 'react';
import { VideoItem } from '../types.ts';
import { USER_AVATAR } from '../mockData.ts';

interface CreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddNewVideo: (video: VideoItem) => void;
}

export const CreateModal: React.FC<CreateModalProps> = ({
  isOpen,
  onClose,
  onAddNewVideo,
}) => {
  const [activeMode, setActiveMode] = useState<'menu' | 'upload'>('menu');
  const [videoTitle, setVideoTitle] = useState('');
  const [category, setCategory] = useState<'tech' | 'gaming' | 'music' | 'cinematography'>('tech');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  if (!isOpen) return null;

  const handleStartUpload = () => {
    if (!videoTitle.trim()) return;
    setIsUploading(true);
    let p = 0;
    const interval = setInterval(() => {
      p += 25;
      setUploadProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          const newVid: VideoItem = {
            id: 'user_vid_' + Date.now(),
            title: videoTitle.trim(),
            duration: '06:15',
            durationSec: 375,
            views: '1 view',
            uploadDate: 'Just now',
            channel: 'Carlos Rivera',
            channelAvatar: USER_AVATAR,
            channelSubscribers: '1.2K',
            verified: false,
            thumbnail:
              'https://lh3.googleusercontent.com/aida-public/AB6AXuCV2hbEWGFbXT0yNIsC7-SvLm2zljPrHz-M81_NuiekCdOh5dxZDvacuGqKuFaC3mNhEV6vtU6MIyhhykRJO7rVodyoiurqSkkW1PnnsGyZIQR-o7nsBZ95G1eIBLilqseUHHsFN_xwrWc9k0EHMAJ2vK2uZUuecOIaUgcmbaBL1SFq_F_5JdsU3IKtAZiQk92IEz0DlAy3JE3M0Rx0AvlLEOwvOTqA4qhYsv50LtWqeTxN36TBczvJBA',
            badge: 'NEW',
            category: category,
            description: 'My newly published Streamflix video! Uploaded via Streamflix Creator Studio.',
            hashtags: ['#Creator', '#Streamflix', `#${category}`],
            likes: '1',
            likesCount: 1,
            commentsCount: '0',
            comments: [],
          };
          onAddNewVideo(newVid);
          setIsUploading(false);
          setActiveMode('menu');
          setVideoTitle('');
          setUploadProgress(0);
          onClose();
        }, 600);
      }
    }, 250);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex flex-col justify-end">
      <div className="bg-[#201f1f] w-full max-w-lg mx-auto rounded-t-3xl shadow-2xl border-t border-white/10 p-4 pb-8 animate-slide-up">
        {/* Handle pill */}
        <div className="w-10 h-1 bg-[#3a3939] rounded-full mx-auto mb-3"></div>

        {activeMode === 'menu' ? (
          <div>
            <div className="flex items-center justify-between mb-3 px-1">
              <h2 className="text-[18px] font-bold text-[#F1F1F1]">Create</h2>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#AAAAAA] hover:text-white"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => setActiveMode('upload')}
                className="w-full flex items-center gap-3.5 p-3 rounded-2xl hover:bg-[#252424] transition-colors text-left"
              >
                <div className="w-11 h-11 rounded-full bg-[#ff5540]/20 flex items-center justify-center text-[#ffb4a8]">
                  <span className="material-symbols-outlined text-[24px]">bolt</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[15px] font-semibold text-[#F1F1F1]">Create a Short</span>
                  <span className="text-xs text-[#AAAAAA]">Share 15 to 60-second vertical moments</span>
                </div>
              </button>

              <button
                onClick={() => setActiveMode('upload')}
                className="w-full flex items-center gap-3.5 p-3 rounded-2xl hover:bg-[#252424] transition-colors text-left"
              >
                <div className="w-11 h-11 rounded-full bg-[#005dd2]/20 flex items-center justify-center text-[#afc6ff]">
                  <span className="material-symbols-outlined text-[24px]">upload</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[15px] font-semibold text-[#F1F1F1]">Upload a video</span>
                  <span className="text-xs text-[#AAAAAA]">Publish high-bitrate 4K HDR video to your channel</span>
                </div>
              </button>

              <button
                onClick={() => setActiveMode('upload')}
                className="w-full flex items-center gap-3.5 p-3 rounded-2xl hover:bg-[#252424] transition-colors text-left"
              >
                <div className="w-11 h-11 rounded-full bg-[#CC0000]/20 flex items-center justify-center text-[#ff8080]">
                  <span className="material-symbols-outlined text-[24px]">sensors</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[15px] font-semibold text-[#F1F1F1]">Go live</span>
                  <span className="text-xs text-[#AAAAAA]">Broadcast real-time stream with live chat</span>
                </div>
              </button>

              <button
                onClick={() => setActiveMode('upload')}
                className="w-full flex items-center gap-3.5 p-3 rounded-2xl hover:bg-[#252424] transition-colors text-left"
              >
                <div className="w-11 h-11 rounded-full bg-[#2a2a2a] flex items-center justify-center text-[#F1F1F1]">
                  <span className="material-symbols-outlined text-[24px]">edit_note</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[15px] font-semibold text-[#F1F1F1]">Create a post</span>
                  <span className="text-xs text-[#AAAAAA]">Publish community poll, image, or announcement</span>
                </div>
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveMode('menu')}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[#AAAAAA] hover:text-white"
                >
                  <span className="material-symbols-outlined text-[20px]">arrow_back</span>
                </button>
                <h2 className="text-[17px] font-bold text-[#F1F1F1]">Publish Content</h2>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#AAAAAA] hover:text-white"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#AAAAAA] block mb-1">
                Video Title
              </label>
              <input
                type="text"
                value={videoTitle}
                onChange={(e) => setVideoTitle(e.target.value)}
                placeholder="e.g. Next-Gen Neural Rendering in 4K"
                className="w-full bg-[#2a2a2a] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-[#F1F1F1] focus:outline-none focus:ring-1 focus:ring-[#ff5540]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-[#AAAAAA] block mb-1">
                Category
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(['tech', 'gaming', 'music', 'cinematography'] as const).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`p-2.5 rounded-xl text-xs font-medium capitalize border text-center transition-colors ${
                      category === cat
                        ? 'bg-[#ff5540]/20 border-[#ff5540] text-white'
                        : 'bg-[#2a2a2a] border-white/5 text-[#AAAAAA] hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {isUploading && (
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-[#AAAAAA]">
                  <span>Transcoding & Uploading...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="w-full h-2 bg-[#2a2a2a] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#ff5540] transition-all duration-200"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            )}

            <button
              onClick={handleStartUpload}
              disabled={isUploading || !videoTitle.trim()}
              className="w-full py-3 rounded-full bg-[#ff5540] text-white font-bold text-sm shadow-lg active:scale-98 transition-transform disabled:opacity-50"
            >
              {isUploading ? 'Publishing...' : 'Upload & Publish Now'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
