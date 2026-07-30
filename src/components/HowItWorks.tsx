import React from 'react';
import { motion } from 'framer-motion';
import { CalendarCheck, PhoneCall, Truck, ShieldCheck } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: 'Step 1',
      title: 'Book Your Move',
      description: 'Fill in your shifting details online, pick your inventory items, and lock your slot with ₹500 advance.',
      icon: CalendarCheck,
      color: 'from-blue-500 to-brand-blue',
    },
    {
      step: 'Step 2',
      title: 'We Contact You',
      description: 'Our Hassan shift manager reviews your route, calls to confirm timing, and assigns a dedicated crew.',
      icon: PhoneCall,
      color: 'from-indigo-500 to-blue-600',
    },
    {
      step: 'Step 3',
      title: 'We Pick Up Your Items',
      description: 'Our trained packing team arrives with high-density bubble wraps, crates, and loads everything safely.',
      icon: Truck,
      color: 'from-blue-600 to-teal-600',
    },
    {
      step: 'Step 4',
      title: 'Safe Delivery',
      description: 'Items delivered smoothly to your new address. We unpack, assemble, and verify every item before final payment.',
      icon: ShieldCheck,
      color: 'from-emerald-500 to-teal-600',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-b from-brand-ice via-white to-brand-light/50 relative overflow-hidden">
      
      {/* Decorative dashed path line background for desktop */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-blue bg-blue-100/70 px-3 py-1 rounded-full">
            Hassle-Free Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight">
            How Hassan Packers &amp; Movers Works
          </h2>
          <p className="text-slate-600 text-base">
            From initial booking to final unboxing in your new home — 4 simple steps to a stress-free move.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          
          {/* Animated Connecting Line (Hidden on mobile) */}
          <div className="hidden lg:block absolute top-1/3 left-[10%] right-[10%] h-0.5 border-t-2 border-dashed border-brand-blue/30 -z-0 pointer-events-none" />

          {steps.map((item, index) => {
            const IconComp = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100/80 relative z-10 flex flex-col justify-between group hover:shadow-2xl hover:border-brand-blue/30 transition-all"
              >
                <div>
                  {/* Step Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-extrabold px-3 py-1 bg-brand-light text-brand-blue rounded-full">
                      {item.step}
                    </span>
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${item.color} text-white flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform`}>
                      <IconComp className="w-7 h-7" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-brand-navy mb-2 group-hover:text-brand-blue transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-brand-blue">
                  <span>Learn more</span>
                  <span className="group-hover:translate-x-1 transition-transform">➔</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
