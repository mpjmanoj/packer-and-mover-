import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, ArrowLeft, ArrowRight, Package, Sparkles } from 'lucide-react';
import { BookingDetails, InventoryCategory } from '../../types';
import { INVENTORY_CATEGORIES, INVENTORY_ITEMS } from '../../data/inventoryData';

interface Step2Props {
  details: BookingDetails;
  onInventoryChange: (updatedInventory: Record<string, number>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const Step2Inventory: React.FC<Step2Props> = ({
  details,
  onInventoryChange,
  onNext,
  onPrev,
}) => {
  const [activeCategory, setActiveCategory] = useState<InventoryCategory>('Bedroom');

  const handleUpdateQty = (itemId: string, delta: number) => {
    const currentQty = details.inventory[itemId] || 0;
    const newQty = Math.max(0, currentQty + delta);
    onInventoryChange({
      ...details.inventory,
      [itemId]: newQty,
    });
  };

  const currentCategoryItems = INVENTORY_ITEMS.filter(
    (item) => item.category === activeCategory
  );

  const totalItemsCount = Object.values(details.inventory).reduce((a, b) => a + b, 0);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      {/* Category Pills Header */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {INVENTORY_CATEGORIES.map((category) => {
          const itemsInCat = INVENTORY_ITEMS.filter(i => i.category === category);
          const catItemCount = itemsInCat.reduce((sum, item) => sum + (details.inventory[item.id] || 0), 0);

          return (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 border ${
                activeCategory === category
                  ? 'bg-brand-blue text-white border-brand-blue shadow-md shadow-blue-500/20'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <span>{category}</span>
              {catItemCount > 0 && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                  activeCategory === category ? 'bg-white text-brand-blue' : 'bg-brand-light text-brand-blue'
                }`}>
                  {catItemCount}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 min-h-[300px]">
        <AnimatePresence mode="popLayout">
          {currentCategoryItems.map((item) => {
            const qty = details.inventory[item.id] || 0;
            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className={`p-4 rounded-2xl border transition-all flex items-center justify-between ${
                  qty > 0
                    ? 'bg-blue-50/60 border-brand-blue shadow-sm ring-1 ring-brand-blue/20'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
                    qty > 0 ? 'bg-brand-blue text-white shadow-sm' : 'bg-slate-100 text-slate-500'
                  }`}>
                    <Package className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">{item.name}</p>
                    <p className="text-[10px] text-slate-400 font-medium">{item.category}</p>
                  </div>
                </div>

                {/* Animated Quantity Control */}
                <div className="flex items-center gap-2">
                  {qty > 0 && (
                    <motion.button
                      whileTap={{ scale: 0.85 }}
                      type="button"
                      onClick={() => handleUpdateQty(item.id, -1)}
                      className="w-8 h-8 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 flex items-center justify-center text-slate-700 font-bold transition-colors shadow-xs"
                    >
                      <Minus className="w-4 h-4" />
                    </motion.button>
                  )}

                  <motion.span
                    key={qty}
                    initial={{ scale: 1.3 }}
                    animate={{ scale: 1 }}
                    className={`w-8 text-center text-sm font-black ${
                      qty > 0 ? 'text-brand-blue' : 'text-slate-400'
                    }`}
                  >
                    {qty}
                  </motion.span>

                  <motion.button
                    whileTap={{ scale: 0.85 }}
                    type="button"
                    onClick={() => handleUpdateQty(item.id, 1)}
                    className="w-8 h-8 rounded-xl bg-brand-blue hover:bg-brand-darkBlue text-white flex items-center justify-center font-bold shadow-md shadow-blue-500/20 transition-all"
                  >
                    <Plus className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Selected Items Quick Badge Summary */}
      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-brand-light flex items-center justify-center text-brand-blue">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-800">
              Total Selected Items: <span className="text-brand-blue text-sm">{totalItemsCount}</span>
            </p>
            <p className="text-[11px] text-slate-500">
              {totalItemsCount === 0 
                ? 'Select items above for exact packing & transport cost estimation.' 
                : 'Items added! You can add more or click continue to review pricing.'}
            </p>
          </div>
        </div>

        {totalItemsCount > 0 && (
          <button
            type="button"
            onClick={() => onInventoryChange({})}
            className="text-xs text-rose-600 hover:text-rose-700 font-semibold underline shrink-0"
          >
            Clear All Items
          </button>
        )}
      </div>

      {/* Action Buttons */}
      <div className="pt-4 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={onPrev}
          className="px-6 py-3.5 rounded-2xl border-2 border-slate-200 hover:border-slate-300 text-slate-700 font-bold text-sm flex items-center gap-2 transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> Previous Step
        </button>

        <button
          type="button"
          onClick={onNext}
          className="px-8 py-4 rounded-2xl bg-brand-blue hover:bg-brand-darkBlue text-white font-bold text-base shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all flex items-center gap-2"
        >
          Continue to Review &amp; Pay <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
};
