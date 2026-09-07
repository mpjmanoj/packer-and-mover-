import React from 'react';
import { motion } from 'framer-motion';
import { Phone, ArrowRight, ShieldCheck, Star, MapPin, PackageCheck, Clock } from 'lucide-react';

interface HeroProps {
  onBookClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookClick }) => {
  return (
    <section id="hero" className="relative min-h-[calc(100vh-80px)] flex flex-col justify-between bg-gradient-to-b from-brand-light/60 via-white to-brand-ice overflow-hidden pt-8 pb-16">
      
      {/* Subtle Animated Particles / Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-24 -left-24 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            x: [0, -40, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/3 -right-24 w-[30rem] h-[30rem] bg-indigo-100/50 rounded-full blur-3xl"
        />

        {/* Floating Particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0.2, y: 0 }}
            animate={{
              opacity: [0.2, 0.6, 0.2],
              y: [-10, -80, -10],
              x: [0, i % 2 === 0 ? 20 : -20, 0]
            }}
            transition={{
              duration: 5 + i * 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.7
            }}
            className="absolute rounded-full bg-brand-blue/20"
            style={{
              width: `${12 + i * 4}px`,
              height: `${12 + i * 4}px`,
              left: `${15 + i * 14}%`,
              top: `${30 + (i * 10) % 50}%`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headlines & CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left pt-4"
          >
            {/* Location & Trust Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 border border-blue-200/80 shadow-sm text-brand-navy text-xs font-semibold">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <MapPin className="w-3.5 h-3.5 text-brand-blue" />
              <span>Hassan's #1 Rated Moving Service</span>
              <span className="text-slate-300">|</span>
              <div className="flex items-center text-amber-500 font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 mr-0.5" />
                <span>4.9 / 5.0</span>
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-brand-navy tracking-tight leading-[1.15]">
              Safe &amp; Reliable <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-brand-blue via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Packers &amp; Movers
              </span> <br />
              Starting From Hassan
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Professional household shifting services within Hassan and from Hassan to any city in Karnataka &amp; across India.
            </p>

            {/* Trust Highlights */}
            <div className="grid grid-cols-3 gap-3 pt-2 max-w-lg mx-auto lg:mx-0">
              <div className="flex items-center gap-2 bg-white/80 p-2.5 rounded-xl border border-slate-200/70 shadow-sm text-left">
                <PackageCheck className="w-5 h-5 text-brand-blue shrink-0" />
                <div>
                  <p className="text-xs font-bold text-slate-800">100% Safe</p>
                  <p className="text-[10px] text-slate-500">Multi-Layer Packing</p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-white/80 p-2.5 rounded-xl border border-slate-200/70 shadow-sm text-left">
                <Clock className="w-5 h-5 text-brand-blue shrink-0" />
                <div>
                  <p className="text-xs font-bold text-slate-800">On Time</p>
                  <p className="text-[10px] text-slate-500">Guaranteed Schedule</p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-white/80 p-2.5 rounded-xl border border-slate-200/70 shadow-sm text-left">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <p className="text-xs font-bold text-slate-800">Insured</p>
                  <p className="text-[10px] text-slate-500">Full Transit Cover</p>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                onClick={onBookClick}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-brand-blue hover:bg-brand-darkBlue text-white font-bold text-base shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-3 group"
              >
                Book Your Move
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="tel:+919876543210"
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white hover:bg-slate-50 text-brand-navy font-bold text-base border-2 border-slate-200 shadow-sm hover:border-brand-blue/40 transition-all flex items-center justify-center gap-2.5"
              >
                <Phone className="w-5 h-5 text-brand-blue fill-brand-blue/20" />
                Call Now (+91 98765 43210)
              </a>
            </div>
          </motion.div>

          {/* Right Column: Moving Truck Animation Scene */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            {/* Floating Card Backdrop Glow */}
            <div className="absolute w-72 h-72 bg-gradient-to-tr from-brand-blue/30 to-indigo-400/20 rounded-full blur-2xl -z-10" />

            <div className="relative w-full max-w-lg">
              
              {/* Floating Boxes */}
              <motion.div
                animate={{ y: [-8, 8, -8], rotate: [-2, 2, -2] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 left-6 z-20 bg-white p-3 rounded-2xl shadow-lg border border-slate-100 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 font-bold text-xs">
                  📦 Box
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">Fragile Items</p>
                  <p className="text-[10px] font-semibold text-emerald-600">Bubble Wrapped ✓</p>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [6, -8, 6], rotate: [2, -2, 2] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute top-1/2 -right-4 z-20 bg-white p-3 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-2.5"
              >
                <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center text-brand-blue font-bold text-xs">
                  🚛
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">Live Tracking</p>
                  <p className="text-[10px] font-semibold text-blue-600">Hassan ➔ Destination</p>
                </div>
              </motion.div>

              {/* Animated Moving Truck SVG */}
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="w-full relative"
              >
                <svg
                  viewBox="0 0 500 320"
                  className="w-full h-auto drop-shadow-2xl overflow-visible"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Background Road & Shadow */}
                  <ellipse cx="250" cy="285" rx="200" ry="20" fill="rgba(30, 41, 59, 0.12)" />

                  {/* Truck Container Base */}
                  <rect x="50" y="80" width="260" height="150" rx="16" fill="#2563EB" />
                  <rect x="50" y="80" width="260" height="25" fill="#1D4ED8" rx="8" />
                  
                  {/* Container Side Branding */}
                  <rect x="70" y="115" width="220" height="85" rx="10" fill="#FFFFFF" opacity="0.95" />
                  <text x="180" y="145" textAnchor="middle" fill="#1E293B" fontSize="18" fontWeight="800" fontFamily="Plus Jakarta Sans, sans-serif">
                    HASSAN
                  </text>
                  <text x="180" y="165" textAnchor="middle" fill="#2563EB" fontSize="12" fontWeight="700" letterSpacing="1">
                    PACKERS &amp; MOVERS
                  </text>
                  <text x="180" y="183" textAnchor="middle" fill="#64748B" fontSize="9" fontWeight="600">
                    Karnataka Shifting Specialist
                  </text>

                  {/* Truck Cabin */}
                  <path d="M310 120 L370 120 L405 160 L405 230 L310 230 Z" fill="#1D4ED8" />
                  <path d="M320 130 L360 130 L385 160 L320 160 Z" fill="#EAF4FF" />
                  
                  {/* Driver Head silhouette */}
                  <circle cx="340" cy="148" r="8" fill="#1E293B" />
                  <circle cx="340" cy="142" r="5" fill="#2563EB" />

                  {/* Truck Headlight */}
                  <circle cx="400" cy="205" r="7" fill="#FBBF24" />
                  <polygon points="405,198 480,180 480,230 405,212" fill="url(#headlight-gradient)" opacity="0.4" />

                  {/* Front Bumper */}
                  <rect x="400" y="215" width="12" height="18" rx="3" fill="#64748B" />

                  {/* Truck Wheels (Animated Rotation) */}
                  <g>
                    <circle cx="110" cy="230" r="28" fill="#1E293B" />
                    <circle cx="110" cy="230" r="16" fill="#94A3B8" />
                    <circle cx="110" cy="230" r="6" fill="#FFFFFF" />
                    <line x1="110" y1="202" x2="110" y2="258" stroke="#1E293B" strokeWidth="3" />
                    <line x1="82" y1="230" x2="138" y2="230" stroke="#1E293B" strokeWidth="3" />
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      from="0 110 230"
                      to="360 110 230"
                      dur="3s"
                      repeatCount="indefinite"
                    />
                  </g>

                  <g>
                    <circle cx="250" cy="230" r="28" fill="#1E293B" />
                    <circle cx="250" cy="230" r="16" fill="#94A3B8" />
                    <circle cx="250" cy="230" r="6" fill="#FFFFFF" />
                    <line x1="250" y1="202" x2="250" y2="258" stroke="#1E293B" strokeWidth="3" />
                    <line x1="222" y1="230" x2="278" y2="230" stroke="#1E293B" strokeWidth="3" />
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      from="0 250 230"
                      to="360 250 230"
                      dur="3s"
                      repeatCount="indefinite"
                    />
                  </g>

                  <g>
                    <circle cx="360" cy="230" r="28" fill="#1E293B" />
                    <circle cx="360" cy="230" r="16" fill="#94A3B8" />
                    <circle cx="360" cy="230" r="6" fill="#FFFFFF" />
                    <line x1="360" y1="202" x2="360" y2="258" stroke="#1E293B" strokeWidth="3" />
                    <line x1="332" y1="230" x2="388" y2="230" stroke="#1E293B" strokeWidth="3" />
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      from="0 360 230"
                      to="360 360 230"
                      dur="3s"
                      repeatCount="indefinite"
                    />
                  </g>

                  {/* Gradient Definitions */}
                  <defs>
                    <linearGradient id="headlight-gradient" x1="405" y1="205" x2="480" y2="205" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#FBBF24" stopOpacity="0.8" />
                      <stop offset="1" stopColor="#FBBF24" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Animated Speed Lines under truck */}
                <div className="w-full flex justify-center gap-2 mt-2 overflow-hidden h-1">
                  <motion.div
                    animate={{ x: [-100, 200] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className="w-20 h-1 bg-gradient-to-r from-transparent via-brand-blue to-transparent rounded-full"
                  />
                  <motion.div
                    animate={{ x: [-100, 200] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.5 }}
                    className="w-12 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent rounded-full"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
