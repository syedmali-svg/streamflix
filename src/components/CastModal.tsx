import React, { useState } from 'react';

interface CastModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CastModal: React.FC<CastModalProps> = ({ isOpen, onClose }) => {
  const [connectingDevice, setConnectingDevice] = useState<string | null>(null);
  const [connectedDevice, setConnectedDevice] = useState<string | null>(null);

  if (!isOpen) return null;

  const devices = [
    { id: 'dev-1', name: 'Living Room TV (Chromecast 4K)', type: 'tv' },
    { id: 'dev-2', name: 'Studio Bedroom Display (Google TV)', type: 'tv' },
    { id: 'dev-3', name: 'Office Workstation (Streamflix Cast)', type: 'computer' },
    { id: 'dev-4', name: 'Sonos Beam Soundbar', type: 'speaker' },
  ];

  const handleDeviceSelect = (id: string) => {
    if (connectedDevice === id) {
      setConnectedDevice(null);
      return;
    }
    setConnectingDevice(id);
    setTimeout(() => {
      setConnectedDevice(id);
      setConnectingDevice(null);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#201f1f] w-full max-w-sm rounded-2xl shadow-2xl border border-white/10 overflow-hidden flex flex-col animate-scale-up">
        <div className="p-4 flex items-center justify-between border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#F1F1F1]">cast</span>
            <h2 className="text-[17px] font-bold text-[#F1F1F1]">Connect to a device</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#AAAAAA] hover:text-white"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="p-3 space-y-1">
          <span className="text-[11px] font-semibold text-[#AAAAAA] px-2 block mb-1">
            Nearby Devices
          </span>
          {devices.map((dev) => {
            const isConn = connectedDevice === dev.id;
            const isLoading = connectingDevice === dev.id;

            return (
              <div
                key={dev.id}
                onClick={() => handleDeviceSelect(dev.id)}
                className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-colors ${
                  isConn ? 'bg-[#005dd2]/20 border border-[#005dd2]/40' : 'hover:bg-[#252424]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`material-symbols-outlined text-[22px] ${
                      isConn ? 'text-[#afc6ff]' : 'text-[#AAAAAA]'
                    }`}
                  >
                    {dev.type === 'tv'
                      ? 'tv'
                      : dev.type === 'computer'
                      ? 'desktop_windows'
                      : 'speaker'}
                  </span>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-[#F1F1F1]">{dev.name}</span>
                    <span className="text-[11px] text-[#AAAAAA]">
                      {isConn ? 'Connected • Ready to stream' : isLoading ? 'Connecting...' : 'Ready to connect'}
                    </span>
                  </div>
                </div>

                {isLoading ? (
                  <div className="w-5 h-5 rounded-full border-2 border-[#AAAAAA] border-t-white animate-spin"></div>
                ) : isConn ? (
                  <span className="text-xs text-[#afc6ff] font-bold">Disconnect</span>
                ) : (
                  <span className="material-symbols-outlined text-[18px] text-[#AAAAAA]">
                    chevron_right
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <div className="p-3 bg-[#1c1b1b] border-t border-white/[0.06] text-center">
          <span className="text-[11px] text-[#AAAAAA]">
            Streamflix Cast protocol v2.4 • High-Definition Stream Mirror
          </span>
        </div>
      </div>
    </div>
  );
};
