import React from 'react';
import { motion } from 'framer-motion';
import { X, User, MapPin, Calendar, Home, Layers, Package, CreditCard, ShieldCheck } from 'lucide-react';
import { Booking } from '../../types';
import { INVENTORY_ITEMS } from '../../data/inventoryData';

interface DetailModalProps {
  booking: Booking | null;
  onClose: () => void;
  onUpdateStatus: (bookingId: string, status: Booking['status']) => void;
}

export const BookingDetailModal: React.FC<DetailModalProps> = ({
  booking,
  onClose,
  onUpdateStatus,
}) => {
  if (!booking) return null;

  const inventoryEntries = Object.entries(booking.details.inventory)
    .filter(([_, qty]) => qty > 0)
    .map(([id, qty]) => {
      const itemDef = INVENTORY_ITEMS.find((i) => i.id === id);
      return {
        name: itemDef ? itemDef.name : id,
        category: itemDef ? itemDef.category : 'Item',
        qty,
      };
    });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="bg-brand-navy p-6 text-white flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-black text-xl tracking-wide">{booking.id}</h3>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-500/30 text-blue-200 border border-blue-400/30">
                {booking.status}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Booked on: {new Date(booking.createdAt).toLocaleString()}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 space-y-6 overflow-y-auto">
          
          {/* Status Quick Changer */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold text-slate-700">Update Booking Lifecycle Status</p>
              <p className="text-[11px] text-slate-500">Change status as the truck dispatches and delivers</p>
            </div>
            <select
              value={booking.status}
              onChange={(e) => onUpdateStatus(booking.id, e.target.value as Booking['status'])}
              className="px-3 py-2 rounded-xl text-xs font-bold bg-white border border-slate-300 text-slate-800 focus:ring-2 focus:ring-brand-blue outline-none"
            >
              <option value="Confirmed">Confirmed</option>
              <option value="In Transit">In Transit</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          {/* Customer Info */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-brand-blue" /> Customer Contact Details
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div>
                <span className="text-slate-400">Name:</span>
                <p className="font-bold text-slate-800">{booking.details.name}</p>
              </div>
              <div>
                <span className="text-slate-400">Phone:</span>
                <p className="font-bold text-brand-blue">{booking.details.phone}</p>
              </div>
              <div>
                <span className="text-slate-400">Email:</span>
                <p className="font-semibold text-slate-700">{booking.details.email || 'N/A'}</p>
              </div>
            </div>
          </div>

          {/* Move Route & Date */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-brand-blue" /> Shifting Route &amp; Schedule
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div>
                <span className="text-slate-400">Pickup:</span>
                <p className="font-bold text-slate-800">{booking.details.fromCity}</p>
                <span className="text-[10px] text-slate-500 font-medium">Floor: {booking.details.currentFloor}</span>
              </div>
              <div>
                <span className="text-slate-400">Destination:</span>
                <p className="font-bold text-slate-800">{booking.details.toCity}</p>
                <span className="text-[10px] text-slate-500 font-medium">Floor: {booking.details.destFloor}</span>
              </div>
              <div>
                <span className="text-slate-400">Moving Date:</span>
                <p className="font-bold text-slate-800">{booking.details.movingDate}</p>
              </div>
              <div>
                <span className="text-slate-400">Property:</span>
                <p className="font-bold text-slate-800">{booking.details.houseType}</p>
              </div>
            </div>
          </div>

          {/* Inventory Breakdown */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
              <Package className="w-3.5 h-3.5 text-brand-blue" /> Inventory Item List ({inventoryEntries.length} items)
            </h4>
            {inventoryEntries.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-40 overflow-y-auto pr-1">
                {inventoryEntries.map((item, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs flex justify-between items-center">
                    <div>
                      <p className="font-medium text-slate-800">{item.name}</p>
                      <p className="text-[10px] text-slate-400">{item.category}</p>
                    </div>
                    <span className="font-extrabold text-brand-blue bg-white px-2 py-0.5 rounded border border-blue-200">
                      x{item.qty}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic">No custom inventory items declared.</p>
            )}
          </div>

          {/* Payment & Charges */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
              <CreditCard className="w-3.5 h-3.5 text-emerald-600" /> Billing Breakdown
            </h4>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Packing Charges:</span>
                <span className="font-bold text-slate-800">₹{booking.cost.packing}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Loading &amp; Unloading:</span>
                <span className="font-bold text-slate-800">₹{booking.cost.loading}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Transport:</span>
                <span className="font-bold text-slate-800">₹{booking.cost.transport}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">GST (18%):</span>
                <span className="font-bold text-slate-800">₹{booking.cost.gst}</span>
              </div>
              <hr className="border-slate-200" />
              <div className="flex justify-between text-sm pt-1">
                <span className="font-bold text-slate-800">Total Bill:</span>
                <span className="font-black text-brand-blue">₹{booking.cost.total}</span>
              </div>
              <div className="flex justify-between text-emerald-700 font-bold bg-emerald-100/60 p-2 rounded-lg">
                <span>Advance Token Paid:</span>
                <span>₹{booking.cost.advance} ({booking.paymentStatus})</span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold transition-all"
          >
            Close Details
          </button>
        </div>
      </motion.div>
    </div>
  );
};
