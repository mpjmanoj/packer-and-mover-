import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, CheckCircle2 } from 'lucide-react';
import { TESTIMONIALS } from '../data/reviewsData';

export const Testimonials: React.FC = () => {
  return (
    <section id="reviews" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-blue bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Real Feedback
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight">
            What Our Customers Say in Hassan
          </h2>
          <p className="text-slate-600 text-base">
            Read authentic reviews from families and professionals who moved with us across Karnataka.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TESTIMONIALS.map((review, idx) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80 hover:border-brand-blue/30 hover:shadow-xl transition-all relative flex flex-col justify-between"
            >
              <div>
                {/* Header Row: Stars & Quote Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-brand-light text-slate-300 fill-slate-200" />
                </div>

                <p className="text-slate-700 text-sm italic leading-relaxed mb-6">
                  "{review.comment}"
                </p>
              </div>

              {/* User Bio Footer */}
              <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-sm"
                  />
                  <div>
                    <h4 className="font-bold text-sm text-brand-navy flex items-center gap-1">
                      {review.name}
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 fill-emerald-100" />
                    </h4>
                    <p className="text-[11px] text-slate-500 font-medium">{review.location}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-bold bg-brand-light text-brand-blue px-2.5 py-1 rounded-full inline-block">
                    {review.moveType}
                  </span>
                  <p className="text-[10px] text-slate-400 mt-1">{review.date}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
