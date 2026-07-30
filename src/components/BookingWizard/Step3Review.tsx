import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, ShieldCheck, MapPin, Calendar, Home, Layers, Package, CreditCard, Receipt } from 'lucide-react';
import { BookingDetails, CostBreakdown } from '../../types';
import { INVENTORY_ITEMS } from '../../data/inventoryData';
import { PaymentModal } from './PaymentModal';

interface Step3Props {
  details: BookingDetails;
  onPrev: () => void;
  onBookingConfirmed: (cost: CostBreakdown, transactionId: string) => void;
}

export const Step3Review: React.FC<Step3Props> = ({ details, onPrev, onBookingConfirmed }) => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  // Dynamic Cost Calculation Algorithm
  const totalItemCount = Object.values(details.inventory).reduce((a, b) => a + b, 0);

  // Base cost depending on house type
  let basePacking = 2500;
  let baseLoading = 1800;
  let baseTransport = details.moveType === 'within-city' ? 2500 : 6500;

  if (details.houseType === '2 BHK') {
    basePacking = 3500;
    baseLoading = 2400;
  } else if (details.houseType === '3 BHK') {
    basePacking = 4800;
    baseLoading = 3200;
  } else if (details.houseType === 'Villa') {
    basePacking = 6500;
    baseLoading = 4500;
  } else if (details.houseType === 'Office') {
    basePacking = 5000;
    baseLoading = 3800;
  }

  // Adjust for item count
  const itemPackingFee = totalItemCount * 120;
  const packingCost = Math.round(basePacking + itemPackingFee);

  // Adjust for floors
  const floorMultiplier = (floorStr: string) => {
    if (floorStr === '1st') return 300;
    if (floorStr === '2nd') return 600;
    if (floorStr === '3rd') return 900;
    if (floorStr === '4th+') return 1400;
    return 0; // Ground
  };

  const loadingCost = Math.round(baseLoading + floorMultiplier(details.currentFloor) + floorMultiplier(details.destFloor));
  const transportCost = baseTransport;
  const subtotal = packingCost + loadingCost + transportCost;
  const gstCost = Math.round(subtotal * 0.18);
  const totalCost = subtotal + gstCost;

  const costBreakdown: CostBreakdown = {
    packing: packingCost,
    loading: loadingCost,
    transport: transportCost,
    gst: gstCost,
    total: totalCost,
    advance: 500,
  };

  const selectedInventoryList = Object.entries(details.inventory)
    .filter(([_, qty]) => qty > 0)
    .map(([id, qty]) => {
      const itemDef = INVENTORY_ITEMS.find((i) => i.id === id);
      return {
        name: itemDef ? itemDef.name : id,
        qty,
      };
    });

  const handlePaymentSuccess = (txId: string) => {
    setIsPaymentModalOpen(false);
    onBookingConfirmed(costBreakdown, txId);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className="space-y-6"
    >
      {/* Review Header Banner */}
      <div className="bg-brand-light/80 p-4 rounded-2xl border border-blue-200/80 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-blue text-white flex items-center justify-center font-bold">
            <Receipt className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-base text-brand-navy">Review &amp; Lock Your Booking Slot</h3>
            <p className="text-xs text-slate-500">
              Verify details below and pay ₹500 advance token to confirm your move date.
            </p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
          <ShieldCheck className="w-4 h-4 text-emerald-600" /> Guaranteed Slot
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Route, Date & Inventory Summary */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Key Trip Info */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider">Shifting Overview</h4>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-1">
                <span className="text-xs text-slate-400 flex items-center gap-1 font-semibold">
                  <MapPin className="w-3.5 h-3.5 text-brand-blue" /> From Pickup
                </span>
                <p className="font-extrabold text-slate-800">{details.fromCity}</p>
                <p className="text-xs text-slate-500">Floor: {details.currentFloor}</p>
              </div>

              <div className="space-y-1">
                <span className="text-xs text-slate-400 flex items-center gap-1 font-semibold">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" /> To Destination
                </span>
                <p className="font-extrabold text-slate-800">{details.toCity}</p>
                <p className="text-xs text-slate-500">Floor: {details.destFloor}</p>
              </div>
            </div>

            <hr className="border-slate-100" />

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-1">
                <span className="text-xs text-slate-400 flex items-center gap-1 font-semibold">
                  <Calendar className="w-3.5 h-3.5 text-brand-blue" /> Moving Date
                </span>
                <p className="font-extrabold text-slate-800">{details.movingDate || 'Not selected'}</p>
              </div>

              <div className="space-y-1">
                <span className="text-xs text-slate-400 flex items-center gap-1 font-semibold">
                  <Home className="w-3.5 h-3.5 text-brand-blue" /> Property Type
                </span>
                <p className="font-extrabold text-slate-800">{details.houseType}</p>
              </div>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs">
              <span className="font-bold text-slate-700">Customer Info:</span> {details.name} ({details.phone})
            </div>
          </div>

          {/* Inventory Items Selected */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
                <Package className="w-4 h-4 text-brand-blue" /> Selected Inventory ({selectedInventoryList.length} items)
              </h4>
              <button
                type="button"
                onClick={onPrev}
                className="text-xs font-semibold text-brand-blue hover:underline"
              >
                Edit Inventory
              </button>
            </div>

            {selectedInventoryList.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto pr-1">
                {selectedInventoryList.map((item, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs flex justify-between items-center">
                    <span className="font-medium text-slate-700 truncate">{item.name}</span>
                    <span className="font-extrabold text-brand-blue ml-1 bg-white px-2 py-0.5 rounded border border-blue-200">
                      x{item.qty}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic">No specific inventory selected. Standard house package rates applied.</p>
            )}
          </div>
        </div>

        {/* Right Column: Itemized Pricing & Pay CTA */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white p-6 rounded-2xl border-2 border-brand-blue/30 shadow-xl space-y-5">
            <h4 className="text-sm font-extrabold text-brand-navy tracking-tight pb-2 border-b border-slate-100">
              Estimated Price Breakdown
            </h4>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center text-slate-600">
                <span>Multi-Layer Packing &amp; Materials</span>
                <span className="font-bold text-slate-800">₹{packingCost}</span>
              </div>

              <div className="flex justify-between items-center text-slate-600">
                <span>Loading &amp; Unloading ({details.currentFloor} ➔ {details.destFloor})</span>
                <span className="font-bold text-slate-800">₹{loadingCost}</span>
              </div>

              <div className="flex justify-between items-center text-slate-600">
                <span>Dedicated Truck Transport</span>
                <span className="font-bold text-slate-800">₹{transportCost}</span>
              </div>

              <div className="flex justify-between items-center text-slate-600">
                <span>GST (18%)</span>
                <span className="font-bold text-slate-800">₹{gstCost}</span>
              </div>

              <hr className="border-slate-200" />

              <div className="flex justify-between items-center text-base pt-1">
                <span className="font-extrabold text-slate-900">Total Estimated Bill</span>
                <span className="font-black text-brand-blue text-xl">₹{totalCost}</span>
              </div>
            </div>

            {/* Advance Amount Highlight */}
            <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200 space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-emerald-900">Advance Token Deposit Required</span>
                <span className="text-lg font-black text-emerald-700">₹500</span>
              </div>
              <p className="text-[11px] text-emerald-700 leading-tight">
                Locks your truck slot &amp; packing crew. Remaining ₹{totalCost - 500} is payable after safe delivery at destination!
              </p>
            </div>

            {/* Pay Button */}
            <button
              type="button"
              onClick={() => setIsPaymentModalOpen(true)}
              className="w-full py-4 rounded-2xl bg-brand-blue hover:bg-brand-darkBlue text-white font-extrabold text-base shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
            >
              <CreditCard className="w-5 h-5" /> Pay Advance ₹500 &amp; Confirm
            </button>
          </div>

          {/* Guarantee pill */}
          <div className="text-center text-[11px] text-slate-400 space-y-1">
            <p>✓ Transparent Billing • No Hidden Surcharges</p>
            <p>✓ 100% Refundable if cancelled 24h before shift date</p>
          </div>
        </div>
      </div>

      {/* Prev Button */}
      <div className="pt-2 flex justify-start">
        <button
          type="button"
          onClick={onPrev}
          className="px-6 py-3 rounded-2xl border border-slate-200 hover:border-slate-300 text-slate-700 font-bold text-sm flex items-center gap-2 transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Inventory
        </button>
      </div>

      {/* Razorpay Payment Gateway Modal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        bookingDetails={details}
        costBreakdown={costBreakdown}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </motion.div>
  );
};
