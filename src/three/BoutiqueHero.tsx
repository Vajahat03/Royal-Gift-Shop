import React, { useEffect, useRef, useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Compass, RotateCw, ChevronDown, Box, Move, Crown, Gift, Heart, Eye, Sparkles, ArrowDown } from 'lucide-react';
import { GiftShopScene } from './GiftShopScene';
import { getInterpolatedCamera } from './camera/cameraPositions';

interface BoutiqueHeroProps {
  onEnterDashboard: () => void;
  onSelectItem: (materialId: string) => void;
}

export function BoutiqueHero({ onEnterDashboard, onSelectItem }: BoutiqueHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isFreeOrbit, setIsFreeOrbit] = useState(false);
  const [webGlAvailable, setWebGlAvailable] = useState(true);

  // Check WebGL availability
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setWebGlAvailable(false);
    } catch {
      setWebGlAvailable(false);
    }
  }, []);

  // Track mouse position in all directions for realistic head-tracking & cursor-directed zoom
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1; // -1 to 1
      const ny = (e.clientY / window.innerHeight) * 2 - 1; // -1 to 1
      setMousePos({ x: nx, y: ny });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Scroll listener for the hero pin section with smooth normalized progression
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || isFreeOrbit) return;
      const el = containerRef.current;
      const rect = el.getBoundingClientRect();
      const totalScrollable = el.offsetHeight - window.innerHeight;
      if (totalScrollable <= 0) return;

      const currentScroll = -rect.top;
      const progress = Math.max(0, Math.min(1, currentScroll / totalScrollable));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isFreeOrbit]);

  const { currentKeyframe } = getInterpolatedCamera(scrollProgress);

  const navigateToProgress = (targetProgress: number) => {
    if (!containerRef.current) return;
    setIsFreeOrbit(false);
    const el = containerRef.current;
    const totalScrollable = el.offsetHeight - window.innerHeight;
    const targetY = el.offsetTop + targetProgress * totalScrollable;
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  };

  const resetToDiorama = () => {
    navigateToProgress(0.0);
  };

  // Dynamic opacities based on scroll position
  // Hero Welcome Card is prominent at start (scrollProgress < 0.15), fades smoothly as user scrolls
  const heroOpacity = Math.max(0, 1 - scrollProgress * 6.5);
  const heroTranslateY = scrollProgress * 180;
  const isHeroInteractive = scrollProgress < 0.12;

  // Interior HUD becomes prominent as user scrolls into the boutique
  const hudOpacity = Math.min(1, Math.max(0, (scrollProgress - 0.08) * 7));

  return (
    <div ref={containerRef} className="relative w-full h-[400vh] bg-gradient-to-b from-cream-100 via-lavender-100/40 to-cream-100">
      {/* Pinned 3D Viewport Window */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-between">
        
        {/* =========================================================================
            TOP HUD / NAVIGATION HEADER
            ========================================================================= */}
        <div className="relative z-20 pt-4 px-4 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-3 pointer-events-auto">
          {/* Brand Logo Card */}
          <div className="flex items-center space-x-3 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl border border-lavender-200/90 shadow-soft">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-600 flex items-center justify-center text-white shadow-sm">
              <Crown className="w-4 h-4 text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]" />
            </div>
            <div>
              <span className="text-[9px] uppercase tracking-widest text-amber-600 font-extrabold block">Boutique Atelier</span>
              <span className="text-sm font-bold text-charcoal-900 tracking-tight font-display">The Royal Gift</span>
            </div>
          </div>

          {/* Viewpoint Quick Navigation Bar (Fades in once entering the shop) */}
          <div 
            style={{ 
              opacity: hudOpacity,
              pointerEvents: scrollProgress > 0.08 ? 'auto' : 'none',
              transform: `translateY(${Math.max(0, (0.12 - scrollProgress) * 40)}px)`
            }}
            className="hidden lg:flex items-center space-x-1 bg-white/95 backdrop-blur-md p-1 rounded-2xl border border-lavender-200 shadow-soft transition-opacity duration-300"
          >
            <button
              onClick={() => navigateToProgress(0.0)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center space-x-1.5 ${
                scrollProgress < 0.12 && !isFreeOrbit
                  ? 'bg-charcoal-900 text-amber-300 shadow-sm'
                  : 'text-charcoal-800 hover:bg-lavender-100'
              }`}
            >
              <Eye className="w-3.5 h-3.5 text-amber-500" />
              <span>Diorama</span>
            </button>
            <button
              onClick={() => navigateToProgress(0.18)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center space-x-1.5 ${
                scrollProgress >= 0.12 && scrollProgress < 0.35 && !isFreeOrbit
                  ? 'bg-lavender-600 text-white shadow-sm'
                  : 'text-charcoal-800 hover:bg-lavender-100'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-lavender-400" />
              <span>Entrance</span>
            </button>
            <button
              onClick={() => navigateToProgress(0.45)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center space-x-1.5 ${
                scrollProgress >= 0.35 && scrollProgress < 0.60 && !isFreeOrbit
                  ? 'bg-lavender-600 text-white shadow-sm'
                  : 'text-charcoal-800 hover:bg-lavender-100'
              }`}
            >
              <Heart className="w-3.5 h-3.5 text-blush-400" />
              <span>Left Wall (Teddies)</span>
            </button>
            <button
              onClick={() => navigateToProgress(0.72)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center space-x-1.5 ${
                scrollProgress >= 0.60 && scrollProgress < 0.88 && !isFreeOrbit
                  ? 'bg-lavender-600 text-white shadow-sm'
                  : 'text-charcoal-800 hover:bg-lavender-100'
              }`}
            >
              <Gift className="w-3.5 h-3.5 text-amber-500" />
              <span>Front Wall (Boxes & Perfumes)</span>
            </button>
            <button
              onClick={() => navigateToProgress(1.0)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center space-x-1.5 ${
                scrollProgress >= 0.88 && !isFreeOrbit
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-charcoal-800 hover:bg-lavender-100'
              }`}
            >
              <Crown className="w-3.5 h-3.5 text-amber-400" />
              <span>Right Wall (The Royal Gift)</span>
            </button>
          </div>

          {/* Interactive Controls Bar */}
          <div className="flex items-center space-x-2 bg-white/95 backdrop-blur-md p-1.5 rounded-2xl border border-lavender-200 shadow-soft">
            <button
              onClick={() => setIsFreeOrbit(!isFreeOrbit)}
              className={`flex items-center space-x-2 text-xs font-bold px-3.5 py-1.5 rounded-xl transition-all duration-200 ${
                isFreeOrbit 
                  ? 'bg-gradient-to-r from-amber-500 to-amber-700 text-white shadow-md' 
                  : 'text-charcoal-800 hover:bg-lavender-100'
              }`}
              title="Toggle free 360° interior orbit mode"
            >
              <Compass className={`w-3.5 h-3.5 ${isFreeOrbit ? 'animate-spin' : ''}`} />
              <span>{isFreeOrbit ? 'Free Orbit (Active)' : 'Explore 360°'}</span>
            </button>

            <button
              onClick={resetToDiorama}
              className="p-1.5 text-charcoal-800 hover:bg-lavender-100 rounded-xl transition-all"
              title="Reset to Diorama Overview"
            >
              <RotateCw className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={onEnterDashboard}
              className="flex items-center space-x-1.5 text-xs font-bold px-4 py-1.5 rounded-xl bg-charcoal-900 text-amber-300 hover:bg-charcoal-800 transition-all shadow-sm hover:scale-105 active:scale-95"
            >
              <Box className="w-3.5 h-3.5 text-amber-400" />
              <span>Dashboard</span>
            </button>
          </div>
        </div>

        {/* =========================================================================
            HEROIC EDITORIAL PRESENTATION (LEFT ~32% OF THE SCREEN)
            Ultra-crisp radiant white & champagne gold text, single line title
            Shifted inward slightly from extreme left border for optimal elegance
            ========================================================================= */}
        <div 
          style={{
            opacity: heroOpacity,
            transform: `translateY(-${heroTranslateY}px)`,
            pointerEvents: isHeroInteractive ? 'auto' : 'none',
          }}
          className="absolute inset-y-0 left-0 z-10 w-full md:w-[38%] lg:w-[32%] min-w-[320px] max-w-[500px] pl-6 sm:pl-10 lg:pl-14 pr-4 flex flex-col justify-center text-left pointer-events-auto transition-all duration-300 select-none ml-2 sm:ml-6"
        >
          {/* Deep Parisian Noir-Burgundy Glass Backdrop for 100% Crisp Legibility */}
          <div className="bg-gradient-to-br from-[#1F0A11]/95 via-[#3B101D]/90 to-[#14040A]/95 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-[#D49B4B]/50 shadow-[0_20px_50px_rgba(0,0,0,0.65)] space-y-4">
            {/* Atelier Crest */}
            <div className="flex items-center space-x-2.5">
              <Crown className="w-5 h-5 text-[#D49B4B] drop-shadow-[0_0_12px_rgba(212,155,75,0.7)]" />
              <span className="text-[10px] font-extrabold tracking-[0.35em] uppercase text-[#D49B4B] drop-shadow-sm">
                HAUTE ATELIER
              </span>
            </div>

            {/* Majestic Heroic Title — Strictly in ONE Single Line */}
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-[34px] font-bold tracking-[0.12em] uppercase leading-tight whitespace-nowrap text-white">
              <span className="text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">THE </span>
              <span className="text-[#F5C469] drop-shadow-[0_2px_14px_rgba(212,155,75,0.8)]">
                ROYAL GIFT
              </span>
            </h1>

            {/* Refined Gold Horizon Rule */}
            <div className="w-16 h-[2px] bg-gradient-to-r from-[#D49B4B] via-[#F5C469] to-transparent shadow-[0_0_8px_rgba(212,155,75,0.6)]" />

            {/* 2 Beautiful Lines of Thought — 100% Readable Radiant White & Cream */}
            <div className="space-y-2.5">
              <p className="font-serif italic text-sm sm:text-base text-white leading-relaxed tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                “Where every precious gift is an enduring story of love, wrapped in royal elegance.”
              </p>
              <p className="text-xs sm:text-[13px] font-normal text-[#FDF4E7] leading-relaxed tracking-wider drop-shadow-[0_1px_6px_rgba(0,0,0,0.85)]">
                Curated luxury keepsakes, bespoke floral artistry, and treasured heirlooms crafted to celebrate life’s most golden moments.
              </p>
            </div>

            {/* Heroic Action Button & Gentle Scroll Guide */}
            <div className="flex flex-col items-start space-y-3 pt-2">
              <button
                onClick={() => navigateToProgress(0.18)}
                className="group relative flex items-center space-x-3 px-6 py-2.5 rounded-full bg-[#9E2A47] text-white font-serif text-xs uppercase tracking-[0.2em] shadow-[0_8px_25px_rgba(158,42,71,0.5)] hover:bg-[#7E1F38] hover:scale-105 active:scale-95 transition-all duration-300 border border-[#D49B4B]/60 cursor-pointer overflow-hidden"
              >
                <span className="relative z-10 font-bold">Step Inside Atelier</span>
                <ChevronDown className="w-4 h-4 text-[#F5C469] group-hover:translate-y-0.5 transition-transform relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#D49B4B]/20 via-[#F5C469]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>

              <div className="flex items-center space-x-2 text-[10px] uppercase tracking-[0.2em] text-[#D49B4B] font-medium drop-shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D49B4B] animate-pulse shadow-[0_0_6px_#D49B4B]" />
                <span>Scroll down to tour the 3 walls</span>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            3D THREE.JS CANVAS LAYER (Small Diorama at start, zooming smoothly on scroll)
            ========================================================================= */}
        <div className="absolute inset-0 z-0 cursor-crosshair">
          {webGlAvailable ? (
            <Suspense fallback={
              <div className="w-full h-full flex flex-col items-center justify-center bg-cream-100 text-lavender-600">
                <div className="w-12 h-12 border-3 border-lavender-400 border-t-transparent rounded-full animate-spin mb-4" />
                <p className="text-sm font-medium tracking-wide">Rendering Petite Diorama...</p>
              </div>
            }>
              <Canvas
                shadows
                camera={{ position: [-3.6, 11.8, 22.0], fov: 34 }}
                gl={{ 
                  antialias: true, 
                  alpha: true, 
                  powerPreference: 'high-performance'
                }}
                dpr={[1, 2]}
              >
                <GiftShopScene 
                  scrollProgress={scrollProgress} 
                  mousePos={mousePos}
                  isFreeOrbit={isFreeOrbit} 
                  onSelectItem={onSelectItem}
                />
              </Canvas>
            </Suspense>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-cream-100 p-8 text-center">
              <div className="w-20 h-20 bg-lavender-200 rounded-3xl flex items-center justify-center text-lavender-600 mb-4">
                <Box className="w-10 h-10" />
              </div>
              <h2 className="text-xl font-bold text-charcoal-900 mb-2">The Royal Gift Atelier</h2>
              <p className="text-sm text-charcoal-800/80 max-w-md mb-6">
                WebGL acceleration disabled. Access your complete inventory and order management system below.
              </p>
              <button
                onClick={onEnterDashboard}
                className="px-6 py-2.5 bg-lavender-500 text-white rounded-xl font-medium shadow-soft hover:bg-lavender-600 transition"
              >
                Open Management Dashboard
              </button>
            </div>
          )}
        </div>

        {/* =========================================================================
            BOTTOM STORY CARD & GUIDANCE (Fades in once entering the boutique)
            ========================================================================= */}
        <div 
          style={{
            opacity: hudOpacity,
            pointerEvents: scrollProgress > 0.08 ? 'auto' : 'none',
            transform: `translateY(${Math.max(0, (0.12 - scrollProgress) * 40)}px)`
          }}
          className="relative z-10 pb-6 px-4 sm:px-10 flex flex-col sm:flex-row items-end sm:items-center justify-between gap-4 pointer-events-auto transition-all duration-300"
        >
          {/* Active Story Card */}
          <div className="bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-3xl border border-lavender-200/90 shadow-soft-lg max-w-md transition-all duration-300">
            <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-amber-600 mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Interactive Boutique Tour</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-charcoal-900 font-display leading-tight mb-1">
              {currentKeyframe.title}
            </h2>
            <p className="text-xs text-charcoal-800/85 leading-relaxed">
              {currentKeyframe.subtitle}
            </p>
            <div className="mt-2.5 flex items-center space-x-2 text-[10.5px] font-semibold text-charcoal-800 bg-amber-50/80 px-2.5 py-1.5 rounded-xl border border-amber-200/70">
              <Move className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
              <span>Hover cursor over any shelf area to focal zoom. Tap labels to view live stock &amp; customer history!</span>
            </div>
          </div>

          {/* Scroll Down Hint to Management Operations */}
          <button
            onClick={onEnterDashboard}
            className="group flex items-center space-x-2 text-xs font-bold text-charcoal-800 bg-white/95 backdrop-blur-md px-5 py-2.5 rounded-full border border-lavender-200 shadow-soft hover:bg-lavender-50 hover:border-amber-400 transition-all duration-200 hover:scale-105 active:scale-95 animate-bounce"
          >
            <span>Scroll or Click for Dashboard</span>
            <ChevronDown className="w-4 h-4 text-amber-600 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
