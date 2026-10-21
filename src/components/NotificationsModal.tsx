import React from 'react';
import { NotificationItem, VideoItem } from '../types.ts';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onSelectNotification: (notif: NotificationItem) => void;
  onMarkAllAsRead: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  notifications,
  onSelectNotification,
  onMarkAllAsRead,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-14">
      <div className="bg-[#201f1f] w-full max-w-lg rounded-2xl shadow-2xl border border-white/10 overflow-hidden flex flex-col max-h-[80vh] m-3 animate-scale-up">
        <div className="p-3.5 flex items-center justify-between border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#F1F1F1]">notifications</span>
            <h2 className="text-[17px] font-bold text-[#F1F1F1]">Notifications</h2>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={onMarkAllAsRead}
              className="text-xs text-[#afc6ff] font-semibold hover:text-white px-2 py-1 rounded"
            >
              Mark all read
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center text-[#AAAAAA] hover:text-white"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
        </div>

        <div className="overflow-y-auto divide-y divide-white/[0.04]">
          {notifications.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                onSelectNotification(item);
                onClose();
              }}
              className={`p-3.5 flex items-start gap-3 hover:bg-[#252424] cursor-pointer transition-colors ${
                item.unread ? 'bg-[#2a2a2a]/40' : ''
              }`}
            >
              <img
                src={item.avatar}
                alt={item.creator}
                className="w-10 h-10 rounded-full object-cover shrink-0 mt-0.5"
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-[#F1F1F1] font-medium leading-snug">
                  <span className="font-bold">{item.creator}</span> {item.title}
                </p>
                <span className="text-[11px] text-[#AAAAAA] mt-1 block">{item.timeAgo}</span>
              </div>
              <img
                src={item.thumbnail}
                alt=""
                className="w-14 aspect-video rounded object-cover shrink-0"
              />
              {item.unread && (
                <span className="w-2 h-2 rounded-full bg-[#005dd2] self-center"></span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
