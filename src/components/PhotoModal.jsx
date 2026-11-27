import React from 'react';
import { X, ExternalLink, Download } from 'lucide-react';

export const PhotoModal = ({ photo, onClose }) => {
  if (!photo) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="glass-panel max-w-4xl max-h-[95vh] w-full rounded-3xl border border-white/10 overflow-hidden flex flex-col bg-[#0D1017] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">📸</span>
            <h4 className="font-display font-bold text-sm text-white truncate max-w-sm sm:max-w-md">
              {photo.title || 'Official Photo'}
            </h4>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={photo.url}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white"
              title="Open full resolution"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Image Preview Container */}
        <div className="p-2 overflow-auto flex-1 flex items-center justify-center bg-black/50">
          <img
            src={photo.url}
            alt={photo.title || 'Pizza Pizza photo'}
            className="max-h-[80vh] w-auto object-contain rounded-xl shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
};
