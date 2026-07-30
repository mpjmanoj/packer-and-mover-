import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, Download, Calendar, Truck, CheckCircle2, DollarSign, Eye, X, Filter, RefreshCw
} from 'lucide-react';
import { Booking } from '../../types';
import { BookingDetailModal } from './BookingDetailModal';
import { AdminLogin } from './AdminLogin';

interface AdminDashboardProps {
  bookings: Booking[];
  onUpdateBookingStatus: (bookingId: string, status: Booking['status']) => void;
  onCloseAdmin: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  bookings,
  onUpdateBookingStatus,
  onCloseAdmin,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={() => setIsAuthenticated(true)} onBack={onCloseAdmin} />;
  }

  // Filter Bookings
  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.details.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.details.phone.includes(searchQuery) ||
      booking.details.toCity.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'All' || booking.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Calculate Dashboard Metrics
  const totalBookings = bookings.length;
  const confirmedCount = bookings.filter((b) => b.status === 'Confirmed').length;
  const inTransitCount = bookings.filter((b) => b.status === 'In Transit').length;
  const completedCount = bookings.filter((b) => b.status === 'Delivered').length;
  const totalRevenue = bookings.reduce((sum, b) => sum + b.cost.total, 0);
  const advanceCollected = bookings.reduce((sum, b) => sum + b.cost.advance, 0);

  // CSV Export Functionality
  const handleExportCSV = () => {
    const headers = [
      'Booking ID',
      'Created Date',
      'Customer Name',
      'Phone',
      'Email',
      'Move Type',
      'Pickup Location',
      'Destination City',
      'Moving Date',
      'House Type',
      'Current Floor',
      'Destination Floor',
      'Total Bill (INR)',
      'Advance Paid (INR)',
      'Booking Status',
      'Payment Status',
      'Transaction ID'
    ];

    const rows = filteredBookings.map((b) => [
      b.id,
      new Date(b.createdAt).toLocaleDateString(),
      `"${b.details.name}"`,
      `"${b.details.phone}"`,
      `"${b.details.email}"`,
      b.details.moveType,
      `"${b.details.fromCity}"`,
      `"${b.details.toCity}"`,
      b.details.movingDate,
      b.details.houseType,
      b.details.currentFloor,
      b.details.destFloor,
      b.cost.total,
      b.cost.advance,
      b.status,
      b.paymentStatus,
      b.transactionId || ''
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Hassan_Packers_Bookings_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans pb-16">
      
      {/* Admin Navbar Header */}
      <header className="bg-slate-800 border-b border-slate-700/80 px-6 py-4 sticky top-0 z-40 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-blue flex items-center justify-center font-bold text-white shadow-md">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-black text-lg text-white tracking-tight">HASSAN PACKERS</h1>
                <span className="bg-blue-600/30 text-blue-300 text-[10px] font-bold px-2 py-0.5 rounded border border-blue-500/30">
                  Admin Dashboard
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Operations Control Panel • BM Road Hassan</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExportCSV}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all"
            >
              <Download className="w-4 h-4" /> Export CSV / Excel
            </button>
            <button
              onClick={onCloseAdmin}
              className="px-3.5 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 font-semibold text-xs transition-colors flex items-center gap-1.5"
            >
              <X className="w-4 h-4" /> Exit Admin
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* Overview Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/80 shadow-md">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold uppercase">Total Bookings</span>
              <Calendar className="w-5 h-5 text-brand-blue" />
            </div>
            <p className="text-3xl font-black text-white">{totalBookings}</p>
            <p className="text-[11px] text-slate-400 mt-1">
              <span className="text-emerald-400 font-bold">{confirmedCount}</span> confirmed upcoming
            </p>
          </div>

          <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/80 shadow-md">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold uppercase">In Transit</span>
              <Truck className="w-5 h-5 text-amber-400" />
            </div>
            <p className="text-3xl font-black text-amber-400">{inTransitCount}</p>
            <p className="text-[11px] text-slate-400 mt-1">Active moves currently on road</p>
          </div>

          <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/80 shadow-md">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold uppercase">Completed Moves</span>
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            </div>
            <p className="text-3xl font-black text-emerald-400">{completedCount}</p>
            <p className="text-[11px] text-slate-400 mt-1">Delivered &amp; unpacked safely</p>
          </div>

          <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/80 shadow-md">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold uppercase">Total Revenue</span>
              <DollarSign className="w-5 h-5 text-emerald-400" />
            </div>
            <p className="text-3xl font-black text-white">₹{totalRevenue.toLocaleString()}</p>
            <p className="text-[11px] text-emerald-400 mt-1 font-semibold">
              Advance Collected: ₹{advanceCollected.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by ID, name, phone, city..."
              className="w-full pl-9 pr-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs font-medium text-white focus:ring-2 focus:ring-brand-blue outline-none"
            />
          </div>

          {/* Status Filter Badges */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
            <span className="text-xs text-slate-400 font-semibold flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Filter:
            </span>
            {['All', 'Confirmed', 'In Transit', 'Delivered', 'Cancelled'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  statusFilter === status
                    ? 'bg-brand-blue text-white shadow-sm'
                    : 'bg-slate-700/80 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

        </div>

        {/* Bookings Data Table */}
        <div className="bg-slate-800 rounded-3xl border border-slate-700 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900/90 uppercase text-[10px] font-bold text-slate-400 tracking-wider border-b border-slate-700">
                <tr>
                  <th className="px-6 py-4">Booking ID &amp; Date</th>
                  <th className="px-6 py-4">Customer Details</th>
                  <th className="px-6 py-4">Route &amp; Date</th>
                  <th className="px-6 py-4">Inventory Items</th>
                  <th className="px-6 py-4">Payment</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/60 font-medium">
                {filteredBookings.length > 0 ? (
                  filteredBookings.map((booking) => {
                    const itemCount = Object.values(booking.details.inventory).reduce((a, b) => a + b, 0);

                    return (
                      <tr key={booking.id} className="hover:bg-slate-700/40 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <p className="font-mono font-bold text-sm text-brand-blue">{booking.id}</p>
                          <p className="text-[10px] text-slate-400">
                            {new Date(booking.createdAt).toLocaleDateString()}
                          </p>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <p className="font-bold text-white">{booking.details.name}</p>
                          <p className="text-[11px] text-slate-400">{booking.details.phone}</p>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <p className="font-semibold text-slate-200">
                            {booking.details.fromCity} ➔ <span className="text-emerald-400 font-bold">{booking.details.toCity}</span>
                          </p>
                          <p className="text-[10px] text-slate-400">
                            Move Date: <span className="text-slate-300 font-bold">{booking.details.movingDate}</span> ({booking.details.houseType})
                          </p>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2.5 py-1 rounded-full bg-slate-700 text-slate-200 font-bold text-[11px]">
                            {itemCount} items
                          </span>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <p className="font-extrabold text-white">₹{booking.cost.total}</p>
                          <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2 py-0.5 rounded">
                            Adv Paid ₹{booking.cost.advance}
                          </span>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <select
                            value={booking.status}
                            onChange={(e) => onUpdateBookingStatus(booking.id, e.target.value as Booking['status'])}
                            className={`px-3 py-1.5 rounded-xl font-bold text-xs bg-slate-900 border outline-none cursor-pointer ${
                              booking.status === 'Confirmed'
                                ? 'border-blue-500 text-blue-300'
                                : booking.status === 'In Transit'
                                ? 'border-amber-500 text-amber-300'
                                : booking.status === 'Delivered'
                                ? 'border-emerald-500 text-emerald-300'
                                : 'border-rose-500 text-rose-300'
                            }`}
                          >
                            <option value="Confirmed">Confirmed</option>
                            <option value="In Transit">In Transit</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <button
                            onClick={() => setSelectedBooking(booking)}
                            className="p-2 rounded-xl bg-slate-700 hover:bg-brand-blue text-slate-200 hover:text-white transition-colors"
                            title="View Full Booking Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-slate-400 italic">
                      No bookings found matching your search query.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </main>

      {/* Booking Detail Modal */}
      <BookingDetailModal
        booking={selectedBooking}
        onClose={() => setSelectedBooking(null)}
        onUpdateStatus={onUpdateBookingStatus}
      />
    </div>
  );
};
