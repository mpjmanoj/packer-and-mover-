import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Lock, CheckCircle2, CreditCard, QrCode, Building, Shield } from 'lucide-react';
import { BookingDetails, CostBreakdown } from '../../types';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingDetails: BookingDetails;
  costBreakdown: CostBreakdown;
  onPaymentSuccess: (transactionId: string) => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  bookingDetails,
  costBreakdown,
  onPaymentSuccess,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [upiId, setUpiId] = useState('user@upi');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8910');

  if (!isOpen) return null;

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const txId = 'pay_' + Math.random().toString(36).substring(2, 12).toUpperCase();
      onPaymentSuccess(txId);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100"
      >
        {/* Gateway Header */}
        <div className="bg-gradient-to-r from-brand-navy via-slate-800 to-brand-navy p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-white shadow-md">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base">Razorpay Gateway</h3>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-semibold">
                  Secured 256-bit
                </span>
              </div>
              <p className="text-xs text-slate-300">Hassan Packers &amp; Movers Advance Token</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Amount Banner */}
        <div className="bg-brand-light/80 px-6 py-4 border-b border-blue-100 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 font-medium">Token Advance Amount</p>
            <p className="text-2xl font-extrabold text-brand-blue">₹{costBreakdown.advance}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-500">Customer: <span className="font-semibold text-slate-800">{bookingDetails.name}</span></p>
            <p className="text-xs text-slate-500">{bookingDetails.moveType === 'within-city' ? 'Within Hassan Move' : `Hassan ➔ ${bookingDetails.toCity}`}</p>
          </div>
        </div>

        {/* Payment Tabs */}
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-3 gap-2 p-1 bg-slate-100 rounded-2xl">
            <button
              type="button"
              onClick={() => setPaymentMethod('upi')}
              className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                paymentMethod === 'upi'
                  ? 'bg-white text-brand-blue shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <QrCode className="w-4 h-4" /> UPI / QR
            </button>
            <button
              type="button"
              onClick={() => setPaymentMethod('card')}
              className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                paymentMethod === 'card'
                  ? 'bg-white text-brand-blue shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <CreditCard className="w-4 h-4" /> Card
            </button>
            <button
              type="button"
              onClick={() => setPaymentMethod('netbanking')}
              className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                paymentMethod === 'netbanking'
                  ? 'bg-white text-brand-blue shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Building className="w-4 h-4" /> NetBanking
            </button>
          </div>

          <form onSubmit={handlePay} className="space-y-4">
            {paymentMethod === 'upi' && (
              <div className="space-y-3">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center space-y-2">
                  <div className="w-28 h-28 bg-white mx-auto border-2 border-dashed border-brand-blue/40 rounded-xl p-2 flex items-center justify-center relative">
                    <QrCode className="w-20 h-20 text-brand-navy" />
                    <div className="absolute inset-0 flex items-center justify-center bg-white/70">
                      <span className="text-[10px] font-bold text-brand-blue px-2 py-1 bg-white rounded shadow border">Scan with GPay / PhonePe / Paytm</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500">Scan QR Code or enter UPI ID below</p>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">VPA / UPI ID</label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-blue outline-none"
                    placeholder="e.g. 9876543210@ybl"
                  />
                </div>
              </div>
            )}

            {paymentMethod === 'card' && (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Card Number</label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-blue outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Expiry</label>
                    <input
                      type="text"
                      defaultValue="08/29"
                      required
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-blue outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">CVV</label>
                    <input
                      type="password"
                      defaultValue="789"
                      required
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-blue outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'netbanking' && (
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700">Select Bank</label>
                <select className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-blue outline-none">
                  <option>State Bank of India (SBI)</option>
                  <option>HDFC Bank</option>
                  <option>ICICI Bank</option>
                  <option>Canara Bank (Hassan Branch)</option>
                  <option>Axis Bank</option>
                  <option>Karnataka Bank</option>
                </select>
              </div>
            )}

            <div className="pt-2">
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all disabled:opacity-75"
              >
                {isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processing Payment...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Pay Advance ₹{costBreakdown.advance}</span>
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
            <Shield className="w-3.5 h-3.5 text-emerald-500" />
            <span>Guaranteed slot booking. Fully refundable up to 24 hrs before move.</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
