import React from 'react';
import { motion } from 'framer-motion';
import { Users, ShieldCheck, Tag, Clock, Headphones, BadgePercent } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const features = [
    {
      title: 'Experienced Team',
      desc: 'Our Hassan-based moving crew has 10+ years of hands-on experience handling heavy furniture, delicate electronics, and antique items.',
      icon: Users,
    },
    {
      title: 'Safe Packing',
      desc: 'Multi-layer protection using 5-ply corrugated sheets, heavy-duty bubble wrap, stretch film, and custom corner guards.',
      icon: ShieldCheck,
    },
    {
      title: 'Affordable Pricing',
      desc: 'Transparent line-item estimation with no last-minute hidden surcharges or unexpected driver demands.',
      icon: Tag,
    },
    {
      title: 'On-Time Delivery',
      desc: 'Punctual departure from Hassan and guaranteed delivery schedules to Bengaluru, Mysuru, Mangaluru, and pan-India.',
      icon: Clock,
    },
    {
      title: '24/7 Dedicated Support',
      desc: 'Assigned personal shift supervisor for live location updates via WhatsApp and phone assistance round the clock.',
      icon: Headphones,
    },
    {
      title: 'Insurance Available',
      desc: 'Complete transit insurance coverage for complete peace of mind during long-distance intercity household shifting.',
      icon: BadgePercent,
    },
  ];

  return (
    <section id="why-us" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-blue bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Why We Are Hassan's #1 Choice
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight">
            Why Choose Hassan Packers &amp; Movers
          </h2>
          <p className="text-slate-600 text-base">
            We treat your belongings with the same care and respect as our own family possessions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                className="p-8 rounded-3xl bg-slate-50 hover:bg-gradient-to-b hover:from-blue-50/70 hover:to-white border border-slate-200/80 hover:border-brand-blue/30 shadow-sm hover:shadow-xl transition-all group"
              >
                <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 text-brand-blue flex items-center justify-center mb-6 shadow-sm group-hover:bg-brand-blue group-hover:text-white transition-colors">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-brand-navy mb-3 group-hover:text-brand-blue transition-colors">
                  {feature.title}
                </h3>
                <p className="text-slate-600 text-xs leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
