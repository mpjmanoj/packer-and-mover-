import React from 'react';
import { Truck, Phone, Mail, MapPin, Heart } from 'lucide-react';

interface FooterProps {
  onScrollToSection: (id: string) => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollToSection, onOpenAdmin }) => {
  return (
    <footer className="bg-brand-navy text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => onScrollToSection('hero')}>
              <div className="w-10 h-10 rounded-xl bg-brand-blue flex items-center justify-center text-white font-bold shadow-md">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <span className="font-black text-xl text-white tracking-tight">HASSAN</span>
                <span className="text-xs font-semibold px-2 py-0.5 ml-2 bg-blue-900/60 text-blue-300 rounded-full border border-blue-700">
                  Karnataka
                </span>
                <p className="text-xs text-slate-400 font-medium -mt-1">Packers &amp; Movers</p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Hassan's premier trusted household shifting &amp; intercity goods transport company. Dedicated closed-body containers, 100% safe packing, and guaranteed transparent pricing.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={onOpenAdmin}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition-colors"
              >
                🔐 Staff Admin Portal
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onScrollToSection('hero')} className="hover:text-brand-blue transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('booking')} className="hover:text-brand-blue transition-colors">
                  Book Your Move
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('how-it-works')} className="hover:text-brand-blue transition-colors">
                  How It Works
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('why-us')} className="hover:text-brand-blue transition-colors">
                  Why Choose Us
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('about')} className="hover:text-brand-blue transition-colors">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('reviews')} className="hover:text-brand-blue transition-colors">
                  Customer Reviews
                </button>
              </li>
            </ul>
          </div>

          {/* Our Services */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Services</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>Within Hassan City Shifting</li>
              <li>Hassan to Bengaluru Relocation</li>
              <li>Hassan to Mysuru Household Shifting</li>
              <li>Office &amp; Commercial Moving</li>
              <li>Bike &amp; Car Crating Transport</li>
              <li>Custom Packing &amp; Storage</li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Contact Info</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />
                <span>BM Road, Opp. KSRTC Bus Stand, Hassan, Karnataka 573201</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="tel:+919876543210" className="hover:text-white transition-colors">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-blue shrink-0" />
                <span>hassanpackers@gmail.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright & Disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Hassan Packers &amp; Movers. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Designed with</span>
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
            <span>for local customers in Karnataka, India.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
