import React, { useState } from 'react';
import { Truck, Phone, MessageSquare, ShieldCheck, Menu, X, LayoutDashboard } from 'lucide-react';

interface NavbarProps {
  onOpenAdmin: () => void;
  isAdminActive: boolean;
  onScrollToSection: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAdmin,
  isAdminActive,
  onScrollToSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    onScrollToSection(id);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-sm transition-all duration-300">
      {/* Top Banner */}
      <div className="bg-brand-navy text-slate-300 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-mx-auto flex justify-between items-center px-4">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-emerald-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" /> 100% Insured & Licensed Movers in Hassan
            </span>
            <span className="hidden sm:inline text-slate-400">|</span>
            <span className="hidden sm:inline">Operating from Hassan to All India</span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <a href="tel:+919876543210" className="hover:text-white flex items-center gap-1 transition-colors">
              <Phone className="w-3 h-3 text-brand-blue" /> +91 98765 43210
            </a>
            <button
              onClick={onOpenAdmin}
              className={`flex items-center gap-1 px-2 py-0.5 rounded text-xs transition-colors ${
                isAdminActive 
                  ? 'bg-brand-blue text-white font-semibold' 
                  : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
              }`}
            >
              <LayoutDashboard className="w-3 h-3" />
              {isAdminActive ? 'Viewing Admin' : 'Admin Portal'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div 
            onClick={() => handleNavClick('hero')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-blue to-blue-700 flex items-center justify-center text-white shadow-lg shadow-blue-500/25 group-hover:scale-105 transition-transform">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-brand-navy group-hover:text-brand-blue transition-colors">
                  HASSAN
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 bg-brand-light text-brand-blue rounded-full">
                  Karnataka
                </span>
              </div>
              <p className="text-xs font-medium text-slate-500 -mt-0.5 tracking-wide">
                Packers &amp; Movers
              </p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8 font-medium text-sm text-slate-600">
            <button onClick={() => handleNavClick('hero')} className="hover:text-brand-blue transition-colors">
              Home
            </button>
            <button onClick={() => handleNavClick('booking')} className="hover:text-brand-blue transition-colors">
              Book Move
            </button>
            <button onClick={() => handleNavClick('how-it-works')} className="hover:text-brand-blue transition-colors">
              How It Works
            </button>
            <button onClick={() => handleNavClick('why-us')} className="hover:text-brand-blue transition-colors">
              Why Choose Us
            </button>
            <button onClick={() => handleNavClick('about')} className="hover:text-brand-blue transition-colors">
              About Us
            </button>
            <button onClick={() => handleNavClick('reviews')} className="hover:text-brand-blue transition-colors">
              Reviews
            </button>
            <button onClick={() => handleNavClick('contact')} className="hover:text-brand-blue transition-colors">
              Contact
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://wa.me/919876543210?text=Hi%20Hassan%20Packers,%20I%20want%20a%20quote%20for%20moving"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-emerald-500/30 text-emerald-600 font-semibold text-sm hover:bg-emerald-50 transition-all shadow-sm"
            >
              <MessageSquare className="w-4 h-4 fill-emerald-500 text-emerald-500" />
              WhatsApp
            </a>
            <button
              onClick={() => handleNavClick('booking')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-blue hover:bg-brand-darkBlue text-white font-semibold text-sm shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all"
            >
              Book Your Move
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 hover:text-brand-navy hover:bg-slate-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-xl">
          <button
            onClick={() => handleNavClick('hero')}
            className="block w-full text-left px-3 py-2 rounded-lg text-slate-700 font-medium hover:bg-brand-light hover:text-brand-blue"
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('booking')}
            className="block w-full text-left px-3 py-2 rounded-lg text-slate-700 font-medium hover:bg-brand-light hover:text-brand-blue"
          >
            Book Your Move
          </button>
          <button
            onClick={() => handleNavClick('how-it-works')}
            className="block w-full text-left px-3 py-2 rounded-lg text-slate-700 font-medium hover:bg-brand-light hover:text-brand-blue"
          >
            How It Works
          </button>
          <button
            onClick={() => handleNavClick('why-us')}
            className="block w-full text-left px-3 py-2 rounded-lg text-slate-700 font-medium hover:bg-brand-light hover:text-brand-blue"
          >
            Why Choose Us
          </button>
          <button
            onClick={() => handleNavClick('about')}
            className="block w-full text-left px-3 py-2 rounded-lg text-slate-700 font-medium hover:bg-brand-light hover:text-brand-blue"
          >
            About Us
          </button>
          <button
            onClick={() => handleNavClick('reviews')}
            className="block w-full text-left px-3 py-2 rounded-lg text-slate-700 font-medium hover:bg-brand-light hover:text-brand-blue"
          >
            Reviews
          </button>
          <button
            onClick={() => handleNavClick('contact')}
            className="block w-full text-left px-3 py-2 rounded-lg text-slate-700 font-medium hover:bg-brand-light hover:text-brand-blue"
          >
            Contact Us
          </button>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <a
              href="tel:+919876543210"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-slate-200 text-slate-800 font-semibold text-sm"
            >
              <Phone className="w-4 h-4 text-brand-blue" /> Call +91 98765 43210
            </a>
            <button
              onClick={() => handleNavClick('booking')}
              className="w-full py-3 rounded-xl bg-brand-blue text-white font-semibold text-sm shadow-md"
            >
              Book Your Move Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
