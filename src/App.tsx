import React, { useState, useEffect } from 'react';
import { Booking } from './types';
import { INITIAL_BOOKINGS } from './data/initialBookings';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BookingWizard } from './components/BookingWizard/BookingWizard';
import { HowItWorks } from './components/HowItWorks';
import { WhyChooseUs } from './components/WhyChooseUs';
import { AboutUs } from './components/AboutUs';
import { Testimonials } from './components/Testimonials';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AdminDashboard } from './components/AdminDashboard/AdminDashboard';

export function App() {
  const [isAdminView, setIsAdminView] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('hassan_packers_bookings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing stored bookings:', e);
      }
    }
    return INITIAL_BOOKINGS;
  });

  useEffect(() => {
    localStorage.setItem('hassan_packers_bookings', JSON.stringify(bookings));
  }, [bookings]);

  const handleNewBookingCreated = (newBooking: Booking) => {
    setBookings((prev) => [newBooking, ...prev]);
  };

  const handleUpdateBookingStatus = (bookingId: string, status: Booking['status']) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status } : b))
    );
  };

  const scrollToSection = (id: string) => {
    setIsAdminView(false);
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  if (isAdminView) {
    return (
      <AdminDashboard
        bookings={bookings}
        onUpdateBookingStatus={handleUpdateBookingStatus}
        onCloseAdmin={() => setIsAdminView(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-brand-ice text-brand-navy flex flex-col font-sans selection:bg-brand-blue selection:text-white">
      {/* Sticky Header Navigation */}
      <Navbar
        onOpenAdmin={() => setIsAdminView(true)}
        isAdminActive={isAdminView}
        onScrollToSection={scrollToSection}
      />

      {/* Main Page Sections */}
      <main className="flex-grow">
        {/* Fullscreen Hero with Animated Moving Truck */}
        <Hero onBookClick={() => scrollToSection('booking')} />

        {/* Floating Multi-Step Booking Wizard */}
        <BookingWizard
          onNewBookingCreated={handleNewBookingCreated}
          onViewAdmin={() => setIsAdminView(true)}
        />

        {/* How It Works (4 Process Steps) */}
        <HowItWorks />

        {/* Why Choose Us (6 Feature Cards) */}
        <WhyChooseUs />

        {/* About Us (Narrative & Image) */}
        <AboutUs />

        {/* Customer Reviews & Testimonials */}
        <Testimonials />

        {/* Contact Section & Map Embed */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer
        onScrollToSection={scrollToSection}
        onOpenAdmin={() => setIsAdminView(true)}
      />
    </div>
  );
}

export default App;
