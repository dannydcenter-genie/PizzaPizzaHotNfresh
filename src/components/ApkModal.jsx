import React, { useState, useEffect } from 'react';
import { X, Download, Smartphone, Check, Sparkles, Terminal, Copy } from 'lucide-react';

export const ApkModal = ({ isOpen, onClose }) => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [copiedCmd, setCopiedCmd] = useState('');

  useEffect(() => {
    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  if (!isOpen) return null;

  const handleInstallPwa = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    } else {
      alert('To install on your phone:\n1. Tap the Share or 3 dots (⋮) icon in your mobile browser.\n2. Tap "Install App" or "Add to Home Screen".\nEnjoy Pizza Pizza instant ordering!');
    }
  };

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(key);
    setTimeout(() => setCopiedCmd(''), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div 
        className="glass-panel w-full max-w-xl rounded-3xl border border-white/10 shadow-2xl p-6 bg-[#11141E] space-y-6 my-8 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pizza-red to-cheese-500 p-0.5 flex items-center justify-center">
              <div className="w-full h-full bg-[#11141C] rounded-[14px] flex items-center justify-center text-2xl">
                🍕
              </div>
            </div>
            <div>
              <h3 className="font-display font-black text-xl text-white">
                Get Pizza Pizza Mobile App & APK
              </h3>
              <p className="text-xs text-gray-400">Order faster with 1-tap from your home screen</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Option 1: Instant PWA Install (Fastest for Android & iOS) */}
        <div className="glass-card p-5 rounded-2xl border border-white/10 bg-gradient-to-br from-pizza-red/10 via-transparent to-cheese-500/10 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-cheese-neon bg-cheese-500/20 px-2 py-0.5 rounded">
              OPTION 1 • INSTANT INSTALL (RECOMMENDED)
            </span>
            <span className="text-xs text-gray-400">No PlayStore required</span>
          </div>

          <h4 className="font-display font-black text-lg text-white flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-pizza-red" />
            <span>Install Web App on Android or iPhone</span>
          </h4>

          <p className="text-xs text-gray-300 leading-relaxed">
            Instantly installs the full app with native standalone icon, offline menu caching, and smooth order notifications. Takes 0 MB storage.
          </p>

          <button
            onClick={handleInstallPwa}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-pizza-red to-cheese-500 hover:from-cheese-500 hover:to-pizza-red text-black font-display font-black text-sm shadow-lg shadow-pizza-red/30 transition-all flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4 stroke-[3]" />
            <span>{isInstalled ? 'App Installed! Open from Home Screen' : 'Install App to Phone Now'}</span>
          </button>
        </div>

        {/* Option 2: Capacitor Native Android APK Build */}
        <div className="glass-card p-5 rounded-2xl border border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-pizza-red bg-pizza-red/20 px-2 py-0.5 rounded">
              OPTION 2 • NATIVE ANDROID APK BUILD
            </span>
            <span className="text-xs text-gray-400">Capacitor 7.0 Configured</span>
          </div>

          <h4 className="font-display font-black text-base text-white flex items-center gap-2">
            <Terminal className="w-4 h-4 text-cheese-neon" />
            <span>Build True .APK File via Android Studio / CLI</span>
          </h4>

          <p className="text-xs text-gray-300 leading-relaxed">
            This project is pre-configured with <code className="text-cheese-neon font-mono">capacitor.config.json</code> and <code className="text-cheese-neon font-mono">@capacitor/android</code>. You can generate a signed standalone <code className="text-white font-mono">.apk</code> ready for Android phone sideloading or Google Play Store.
          </p>

          {/* Quick Commands */}
          <div className="space-y-2 text-xs">
            <p className="text-gray-400 text-[11px] font-bold uppercase">To generate the Android APK:</p>
            
            <div className="bg-black/60 p-3 rounded-xl border border-white/10 font-mono text-[11px] space-y-1.5 text-gray-300">
              <div className="flex items-center justify-between">
                <span>1. npm run build</span>
                <button
                  onClick={() => copyToClipboard('npm run build', 'build')}
                  className="text-gray-400 hover:text-white"
                >
                  {copiedCmd === 'build' ? <Check className="w-3.5 h-3.5 text-fresh-green" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span>2. npx cap add android</span>
                <button
                  onClick={() => copyToClipboard('npx cap add android', 'add')}
                  className="text-gray-400 hover:text-white"
                >
                  {copiedCmd === 'add' ? <Check className="w-3.5 h-3.5 text-fresh-green" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span>3. npx cap sync</span>
                <button
                  onClick={() => copyToClipboard('npx cap sync', 'sync')}
                  className="text-gray-400 hover:text-white"
                >
                  {copiedCmd === 'sync' ? <Check className="w-3.5 h-3.5 text-fresh-green" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span>4. npx cap open android</span>
                <button
                  onClick={() => copyToClipboard('npx cap open android', 'open')}
                  className="text-gray-400 hover:text-white"
                >
                  {copiedCmd === 'open' ? <Check className="w-3.5 h-3.5 text-fresh-green" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
            <p className="text-[11px] text-gray-400">
              In Android Studio, click <strong className="text-white">Build &gt; Build Bundle(s) / APK(s) &gt; Build APK(s)</strong> to get your installable <strong className="text-cheese-neon">app-debug.apk</strong> file!
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-gray-300"
        >
          Close
        </button>
      </div>
    </div>
  );
};
