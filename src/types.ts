export interface CommentItem {
  id: string;
  author: string;
  handle: string;
  avatar: string;
  text: string;
  timeAgo: string;
  likes: string;
  isLiked?: boolean;
  isPinned?: boolean;
  repliesCount?: number;
}

export interface VideoItem {
  id: string;
  title: string;
  duration: string;
  durationSec: number;
  views: string;
  uploadDate: string;
  channel: string;
  channelAvatar: string;
  channelSubscribers: string;
  verified: boolean;
  thumbnail: string;
  badge?: '4K' | 'NEW' | 'LIVE';
  isLive?: boolean;
  viewersCount?: string;
  category: 'gaming' | 'music' | 'tech' | 'podcasts' | 'live' | 'cinematography' | 'news' | 'recent';
  description: string;
  hashtags: string[];
  is4K?: boolean;
  likes: string;
  likesCount: number;
  isLiked?: boolean;
  isSaved?: boolean;
  isDownloaded?: boolean;
  isSubscribed?: boolean;
  commentsCount: string;
  comments: CommentItem[];
  progressSec?: number; // playback progress
}

export interface ShortItem {
  id: string;
  title: string;
  views: string;
  viewsCount: number;
  image: string;
  creatorName: string;
  creatorHandle: string;
  creatorAvatar: string;
  isVerified?: boolean;
  isSubscribed: boolean;
  likes: string;
  likesCount: number;
  isLiked: boolean;
  isDisliked: boolean;
  commentsCount: string;
  shares: string;
  audioTrack: string;
  audioCover: string;
  hashtags: string[];
  comments: CommentItem[];
}

export interface CreatorItem {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  subscribers: string;
  verified: boolean;
  isLive?: boolean;
  hasUnread?: boolean;
}

export interface NotificationItem {
  id: string;
  creator: string;
  avatar: string;
  title: string;
  timeAgo: string;
  unread: boolean;
  thumbnail: string;
}

export type NavTab = 'home' | 'shorts' | 'subscriptions' | 'you';
