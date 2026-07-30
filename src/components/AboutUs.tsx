import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Award, Truck, MapPin } from 'lucide-react';

export const AboutUs: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-gradient-to-b from-brand-ice via-white to-brand-ice relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Premium Image Stack */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200"
                alt="Hassan Packers and Movers Team"
                className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
              
              {/* Badge overlay */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-white/60 flex items-center justify-between shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-blue text-white flex items-center justify-center font-bold">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">Karnataka Shifting Excellence</p>
                    <p className="text-[10px] text-slate-500">Over 3,500+ Happy Families Relocated</p>
                  </div>
                </div>
                <span className="text-xs font-extrabold text-emerald-600 bg-emerald-100 px-2.5 py-1 rounded-full">
                  Verified ✓
                </span>
              </div>
            </div>

            {/* Sub Floating Badge */}
            <div className="absolute -bottom-6 -right-6 bg-brand-navy text-white p-4 rounded-2xl shadow-xl hidden sm:flex items-center gap-3 border border-slate-700">
              <Truck className="w-8 h-8 text-brand-blue" />
              <div>
                <p className="text-sm font-extrabold">Hassan Fleet</p>
                <p className="text-[11px] text-slate-300">Closed-Body Sealed Containers</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-brand-blue text-xs font-bold">
              <MapPin className="w-3.5 h-3.5" /> Established in Hassan, Karnataka
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight leading-tight">
              Rooted in Hassan. <br />
              <span className="text-brand-blue">Serving All of Karnataka &amp; India.</span>
            </h2>

            <p className="text-slate-600 text-base leading-relaxed">
              <strong>Hassan Packers &amp; Movers</strong> is a trusted relocation company providing safe, affordable and reliable moving services from Hassan to locations across Karnataka and India.
            </p>

            <p className="text-slate-600 text-sm leading-relaxed">
              Whether you are shifting a single-room studio, a spacious 3 BHK house, or an entire office setup from Hassan to Bengaluru, Mysuru, Mangaluru, or beyond, our dedicated team brings professional packing materials, sturdy trucks, and trained manpower to make your transition effortless.
            </p>

            {/* Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                Local Office on BM Road, Hassan
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                Custom Heavy Appliance Crating
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                Vehicle &amp; Bike Transport Services
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                Zero Hidden Charges Guarantee
              </div>
            </div>

            <div className="pt-4 flex items-center gap-6">
              <div className="text-center border-r border-slate-200 pr-6">
                <p className="text-3xl font-black text-brand-blue">3,500+</p>
                <p className="text-xs text-slate-500 font-medium">Moves Completed</p>
              </div>
              <div className="text-center border-r border-slate-200 pr-6">
                <p className="text-3xl font-black text-brand-navy">100%</p>
                <p className="text-xs text-slate-500 font-medium">Safety Record</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-black text-emerald-600">4.9 ★</p>
                <p className="text-xs text-slate-500 font-medium">Customer Rating</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
