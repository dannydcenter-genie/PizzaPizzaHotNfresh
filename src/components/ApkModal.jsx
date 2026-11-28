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

        {/* Option 2: Pre-built Native Android APKs (Customer & Admin) */}
        <div className="glass-card p-5 rounded-2xl border border-white/10 space-y-4 bg-white/5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-cheese-neon bg-cheese-500/20 px-2 py-0.5 rounded">
              OPTION 2 • NATIVE ANDROID APKs READY
            </span>
            <span className="text-xs text-fresh-green font-bold">2 Flavors Built</span>
          </div>

          <h4 className="font-display font-black text-base text-white flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-cheese-neon" />
            <span>Download Standalone Android APKs</span>
          </h4>

          <p className="text-xs text-gray-300 leading-relaxed">
            Pre-compiled standalone Android APKs generated directly from the repository under <code className="text-cheese-neon font-mono bg-black/40 px-1.5 py-0.5 rounded">release-apks/</code>:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="p-3.5 rounded-xl bg-black/50 border border-white/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-black text-white mb-1">
                  <span>🍕</span> Customer App APK
                </div>
                <p className="text-[11px] text-gray-400">
                  Full online ordering, live tracker & loyalty deals.
                </p>
                <div className="mt-2 text-[10px] text-gray-400 font-mono">
                  Package: com.pizzapizza.customer • v1.0
                </div>
              </div>
              <a
                href="/downloads/PizzaPizza-Customer.apk"
                download="PizzaPizza-Customer.apk"
                className="mt-3 py-2 px-3 rounded-lg bg-cheese-500/20 hover:bg-cheese-500/30 text-cheese-neon border border-cheese-500/40 text-xs font-bold flex items-center justify-between transition-colors"
              >
                <span className="flex items-center gap-1.5">
                  <Download className="w-3.5 h-3.5" />
                  <span>Download APK</span>
                </span>
                <span className="text-gray-400 text-[10px]">~3.6 MB</span>
              </a>
            </div>

            <div className="p-3.5 rounded-xl bg-black/50 border border-pizza-red/30 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-black text-white mb-1">
                  <span>👨‍🍳</span> Admin & KDS APK
                </div>
                <p className="text-[11px] text-gray-400">
                  Boots directly into Kitchen Display & Menu Control.
                </p>
                <div className="mt-2 text-[10px] text-gray-400 font-mono">
                  Package: com.pizzapizza.admin • v1.0
                </div>
              </div>
              <a
                href="/downloads/PizzaPizza-KDS-Admin.apk"
                download="PizzaPizza-KDS-Admin.apk"
                className="mt-3 py-2 px-3 rounded-lg bg-pizza-red/20 hover:bg-pizza-red/30 text-pizza-red border border-pizza-red/40 text-xs font-bold flex items-center justify-between transition-colors"
              >
                <span className="flex items-center gap-1.5">
                  <Download className="w-3.5 h-3.5" />
                  <span>Download APK</span>
                </span>
                <span className="text-gray-400 text-[10px]">~3.6 MB</span>
              </a>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-[11px] text-amber-200/90 leading-relaxed">
            <strong className="text-amber-300 block mb-0.5">💡 Installation Note:</strong>
            After downloading, open the APK from your phone's native <strong>Files</strong> or <strong>Downloads</strong> app (not inside chat previews) and allow "Install unknown apps" when prompted.
          </div>

          <div className="bg-black/60 p-3 rounded-xl border border-white/10 font-mono text-[11px] text-gray-300 space-y-1">
            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">CLI Rebuild Command:</p>
            <div className="flex items-center justify-between">
              <span>cd android && .\gradlew assembleDebug</span>
              <button
                onClick={() => copyToClipboard('cd android && .\\gradlew assembleDebug', 'gradlew')}
                className="text-gray-400 hover:text-white"
              >
                {copiedCmd === 'gradlew' ? <Check className="w-3.5 h-3.5 text-fresh-green" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
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
