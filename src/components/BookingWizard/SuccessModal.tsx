import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { CheckCircle, Calendar, MapPin, Download, ArrowRight, ShieldCheck } from 'lucide-react';
import { Booking } from '../../types';

interface SuccessModalProps {
  booking: Booking | null;
  onClose: () => void;
  onViewAdmin: () => void;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({
  booking,
  onClose,
  onViewAdmin,
}) => {
  useEffect(() => {
    if (booking) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [booking]);

  if (!booking) return null;

  const handleDownloadReceipt = () => {
    const text = `
==============================================
         HASSAN PACKERS & MOVERS
          BOOKING CONFIRMATION
==============================================
Booking ID: ${booking.id}
Transaction ID: ${booking.transactionId || 'N/A'}
Date of Booking: ${new Date(booking.createdAt).toLocaleDateString()}
Status: ${booking.status}

CUSTOMER DETAILS:
Name: ${booking.details.name}
Phone: ${booking.details.phone}
Email: ${booking.details.email}

MOVE DETAILS:
Type: ${booking.details.moveType === 'within-city' ? 'Within Hassan City' : 'Intercity Move'}
Pickup: ${booking.details.fromCity}
Destination: ${booking.details.toCity}
Moving Date: ${booking.details.movingDate}
House Type: ${booking.details.houseType}
Floor Level: Current ${booking.details.currentFloor} ➔ Dest ${booking.details.destFloor}

PAYMENT SUMMARY:
Packing & Wrapping: ₹${booking.cost.packing}
Loading & Unloading: ₹${booking.cost.loading}
Transport Charges: ₹${booking.cost.transport}
GST (18%): ₹${booking.cost.gst}
----------------------------------------------
Total Estimated Bill: ₹${booking.cost.total}
Advance Token Paid: ₹${booking.cost.advance} (SUCCESS)
Balance Payable on Delivery: ₹${booking.cost.total - booking.cost.advance}
==============================================
Hassan Packers & Movers
BM Road, Hassan, Karnataka 573201
Helpdesk: +91 98765 43210
==============================================
    `;

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Booking_Receipt_${booking.id}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100"
      >
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 p-6 text-white text-center relative overflow-hidden">
          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mx-auto mb-3 text-white shadow-inner">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight">Booking Successful!</h2>
          <p className="text-emerald-100 text-xs mt-1">Your advance token payment of ₹500 is confirmed.</p>
        </div>

        {/* Booking Details Content */}
        <div className="p-6 space-y-5">
          {/* Booking ID Highlight */}
          <div className="bg-brand-light p-4 rounded-2xl border border-blue-200 text-center space-y-1">
            <p className="text-xs text-slate-500 font-semibold tracking-wider uppercase">Your Unique Booking ID</p>
            <p className="text-3xl font-black text-brand-blue tracking-wider">{booking.id}</p>
            <p className="text-[11px] text-emerald-700 font-medium">
              Transaction ID: <span className="font-mono">{booking.transactionId}</span>
            </p>
          </div>

          {/* Quick Summary Cards */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-400 font-medium flex items-center gap-1 mb-1">
                <MapPin className="w-3.5 h-3.5 text-brand-blue" /> Move Route
              </span>
              <p className="font-bold text-slate-800 truncate">
                {booking.details.fromCity}
              </p>
              <p className="text-brand-blue font-bold">➔ {booking.details.toCity}</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-400 font-medium flex items-center gap-1 mb-1">
                <Calendar className="w-3.5 h-3.5 text-brand-blue" /> Scheduled Date
              </span>
              <p className="font-bold text-slate-800">{booking.details.movingDate}</p>
              <p className="text-slate-500">{booking.details.houseType}</p>
            </div>
          </div>

          {/* Balance Payment info */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs">
            <div>
              <p className="font-bold text-amber-900">Total Bill: ₹{booking.cost.total}</p>
              <p className="text-[11px] text-amber-700">Advance Paid: ₹500</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-amber-700 font-medium">Payable at Delivery</p>
              <p className="font-extrabold text-amber-900 text-sm">
                ₹{booking.cost.total - booking.cost.advance}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-800">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>Our Hassan operational manager will call you within 30 minutes to finalize exact timing!</span>
          </div>

          {/* Actions */}
          <div className="space-y-2 pt-2">
            <button
              onClick={handleDownloadReceipt}
              className="w-full py-3 rounded-xl bg-brand-navy hover:bg-slate-800 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all"
            >
              <Download className="w-4 h-4" /> Download Booking Receipt
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={onViewAdmin}
                className="py-2.5 rounded-xl border border-brand-blue text-brand-blue hover:bg-brand-light font-semibold text-xs transition-all flex items-center justify-center gap-1"
              >
                Track in Admin <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={onClose}
                className="py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-all"
              >
                Close &amp; Return Home
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
