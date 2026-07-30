import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Calendar, Package, CreditCard } from 'lucide-react';
import { BookingDetails, CostBreakdown, Booking } from '../../types';
import { Step1Details } from './Step1Details';
import { Step2Inventory } from './Step2Inventory';
import { Step3Review } from './Step3Review';
import { SuccessModal } from './SuccessModal';

interface BookingWizardProps {
  onNewBookingCreated: (booking: Booking) => void;
  onViewAdmin: () => void;
}

export const BookingWizard: React.FC<BookingWizardProps> = ({
  onNewBookingCreated,
  onViewAdmin,
}) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  const [bookingDetails, setBookingDetails] = useState<BookingDetails>({
    moveType: 'within-city',
    fromCity: 'Hassan City',
    toCity: 'Within Hassan City',
    name: '',
    phone: '',
    email: '',
    movingDate: '',
    houseType: '2 BHK',
    currentFloor: 'Ground',
    destFloor: '1st',
    inventory: {},
  });

  const handleUpdateDetails = (updated: Partial<BookingDetails>) => {
    setBookingDetails((prev) => ({ ...prev, ...updated }));
  };

  const handleInventoryChange = (updatedInventory: Record<string, number>) => {
    setBookingDetails((prev) => ({ ...prev, inventory: updatedInventory }));
  };

  const handleBookingConfirmed = (cost: CostBreakdown, transactionId: string) => {
    const bookingId = 'HPM-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000);
    const newBooking: Booking = {
      id: bookingId,
      createdAt: new Date().toISOString(),
      details: bookingDetails,
      cost,
      status: 'Confirmed',
      paymentStatus: 'Paid Advance (₹500)',
      transactionId,
    };

    setConfirmedBooking(newBooking);
    onNewBookingCreated(newBooking);
  };

  return (
    <section id="booking" className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto -mt-16 relative z-30">
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-200/80 p-6 sm:p-8 lg:p-10 relative overflow-hidden">
        
        {/* Subtle decorative glow */}
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-brand-light rounded-full blur-3xl -z-10" />

        {/* Wizard Header & Progress Bar */}
        <div className="mb-8 space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-blue bg-brand-light px-3 py-1 rounded-full">
              Instant Online Booking &amp; Cost Calculator
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-brand-navy">
              Book Your Relocation in 3 Simple Steps
            </h2>
          </div>

          {/* Progress Indicator */}
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between relative">
              {/* Connecting Line */}
              <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-slate-200 -z-10 rounded-full" />
              <div
                className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-brand-blue transition-all duration-500 rounded-full -z-10"
                style={{ width: currentStep === 1 ? '0%' : currentStep === 2 ? '50%' : '100%' }}
              />

              {/* Step 1 Pill */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                    currentStep >= 1
                      ? 'bg-brand-blue text-white shadow-md ring-4 ring-blue-100'
                      : 'bg-slate-200 text-slate-500'
                  }`}
                >
                  {currentStep > 1 ? <Check className="w-5 h-5" /> : <Calendar className="w-5 h-5" />}
                </div>
                <span className="text-xs font-bold text-slate-700 mt-1.5 hidden sm:inline">1. Trip Details</span>
              </div>

              {/* Step 2 Pill */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                    currentStep >= 2
                      ? 'bg-brand-blue text-white shadow-md ring-4 ring-blue-100'
                      : 'bg-slate-200 text-slate-500'
                  }`}
                >
                  {currentStep > 2 ? <Check className="w-5 h-5" /> : <Package className="w-5 h-5" />}
                </div>
                <span className="text-xs font-bold text-slate-700 mt-1.5 hidden sm:inline">2. Select Inventory</span>
              </div>

              {/* Step 3 Pill */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                    currentStep >= 3
                      ? 'bg-brand-blue text-white shadow-md ring-4 ring-blue-100'
                      : 'bg-slate-200 text-slate-500'
                  }`}
                >
                  <CreditCard className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-slate-700 mt-1.5 hidden sm:inline">3. Review &amp; Pay</span>
              </div>
            </div>
          </div>
        </div>

        {/* Step Views */}
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <Step1Details
              key="step1"
              details={bookingDetails}
              onChange={handleUpdateDetails}
              onNext={() => setCurrentStep(2)}
            />
          )}

          {currentStep === 2 && (
            <Step2Inventory
              key="step2"
              details={bookingDetails}
              onInventoryChange={handleInventoryChange}
              onNext={() => setCurrentStep(3)}
              onPrev={() => setCurrentStep(1)}
            />
          )}

          {currentStep === 3 && (
            <Step3Review
              key="step3"
              details={bookingDetails}
              onPrev={() => setCurrentStep(2)}
              onBookingConfirmed={handleBookingConfirmed}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Success Modal */}
      <SuccessModal
        booking={confirmedBooking}
        onClose={() => {
          setConfirmedBooking(null);
          setCurrentStep(1);
        }}
        onViewAdmin={onViewAdmin}
      />
    </section>
  );
};
