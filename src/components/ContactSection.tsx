import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageSquare, MapPin, Mail, Clock, Send, CheckCircle } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-brand-ice via-white to-brand-light/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Large Banner CTA */}
        <div className="bg-gradient-to-r from-brand-blue via-blue-600 to-indigo-600 rounded-3xl p-8 sm:p-12 text-white shadow-2xl mb-16 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center md:text-left z-10 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full">
              Instant Phone Support
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Need Help Planning Your Move?
            </h2>
            <p className="text-blue-100 text-sm">
              Our Hassan customer support desk is available 24/7. Call us directly or send a message on WhatsApp for instant rates.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 z-10 w-full md:w-auto shrink-0">
            <a
              href="tel:+919876543210"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white hover:bg-slate-50 text-brand-blue font-extrabold text-base shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5 fill-brand-blue" /> Call Us Now
            </a>
            <a
              href="https://wa.me/919876543210?text=Hi%20Hassan%20Packers,%20I%20need%20moving%20help"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-base shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-5 h-5 fill-white" /> WhatsApp Chat
            </a>
          </div>

          {/* Subtle truck silhouette background */}
          <div className="absolute -right-12 -bottom-12 w-96 h-96 bg-white/5 rounded-full blur-2xl pointer-events-none" />
        </div>

        {/* Contact Form & Location Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Form Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-6 bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6"
          >
            <div>
              <h3 className="text-2xl font-bold text-brand-navy">Send Us a Quick Message</h3>
              <p className="text-slate-500 text-xs mt-1">Have custom requirements or heavy machinery to move? Drop your details below.</p>
            </div>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-emerald-900 text-base">Message Sent!</h4>
                <p className="text-xs text-emerald-700">Thank you! Our Hassan moving team will call you back within 15 minutes.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Suhas Swamy"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-brand-blue outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-brand-blue outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your Requirement / Message</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="e.g. Need to move 2 BHK items from Hassan to Mysuru next Tuesday..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-brand-blue outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-brand-blue hover:bg-brand-darkBlue text-white font-bold text-sm shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition-all"
                >
                  <Send className="w-4 h-4" /> Send Request
                </button>
              </form>
            )}
          </motion.div>

          {/* Right Map & Address Info Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-6 space-y-6"
          >
            {/* Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-3">
                <MapPin className="w-6 h-6 text-brand-blue shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-xs uppercase text-slate-400">Head Office</h4>
                  <p className="text-xs font-bold text-slate-800 mt-0.5">BM Road, Opp. KSRTC Bus Stand</p>
                  <p className="text-[11px] text-slate-500">Hassan, Karnataka 573201</p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-3">
                <Clock className="w-6 h-6 text-brand-blue shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-xs uppercase text-slate-400">Operating Hours</h4>
                  <p className="text-xs font-bold text-slate-800 mt-0.5">Mon - Sun: 7:00 AM - 10:00 PM</p>
                  <p className="text-[11px] text-emerald-600 font-semibold">Emergency Support 24/7</p>
                </div>
              </div>
            </div>

            {/* Google Maps Embed Container */}
            <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-xl h-72 relative">
              <iframe
                title="Hassan Packers Office Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62283.473523292415!2d75.7001402!3d13.0033282!2m3!1f0!0!f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba548325f6bbef1%3A0xd602f37c35588383!2sHassan%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
