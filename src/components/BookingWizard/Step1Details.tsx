import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Home, Layers, ArrowRight, User, Phone, Mail, Navigation, Check } from 'lucide-react';
import { BookingDetails, MoveType, HouseType, FloorLevel } from '../../types';
import { ALL_DESTINATION_CITIES } from '../../data/citiesData';

interface Step1Props {
  details: BookingDetails;
  onChange: (updated: Partial<BookingDetails>) => void;
  onNext: () => void;
}

export const Step1Details: React.FC<Step1Props> = ({ details, onChange, onNext }) => {
  const [citySearch, setCitySearch] = useState('');
  const [showCityDropdown, setShowCityDropdown] = useState(false);

  const filteredCities = ALL_DESTINATION_CITIES.filter(city =>
    city.toLowerCase().includes(citySearch.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!details.name || !details.phone || !details.movingDate) {
      alert('Please fill in your Name, Phone Number, and Moving Date.');
      return;
    }
    onNext();
  };

  const HOUSE_TYPES: HouseType[] = ['1 BHK', '2 BHK', '3 BHK', 'Villa', 'Office'];
  const FLOOR_LEVELS: FloorLevel[] = ['Ground', '1st', '2nd', '3rd', '4th+'];

  return (
    <motion.form
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* Move Type Tabs Header */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Option 1: Within Hassan City */}
        <div
          onClick={() => onChange({ moveType: 'within-city', fromCity: 'Hassan City', toCity: 'Within Hassan City' })}
          className={`cursor-pointer p-5 rounded-2xl border-2 transition-all flex items-start gap-4 relative overflow-hidden ${
            details.moveType === 'within-city'
              ? 'border-brand-blue bg-blue-50/80 shadow-md ring-2 ring-brand-blue/20'
              : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
          }`}
        >
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
            details.moveType === 'within-city' ? 'bg-brand-blue text-white' : 'bg-slate-100 text-slate-600'
          }`}>
            <Home className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-base text-brand-navy">Within Hassan City</h3>
              {details.moveType === 'within-city' && (
                <span className="bg-brand-blue text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5">
                  <Check className="w-3 h-3" /> Selected
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Service available inside Hassan city (Vidya Nagar, BM Road, Kuvempu Nagar, Housing Board, etc.)
            </p>
          </div>
        </div>

        {/* Option 2: Between Cities */}
        <div
          onClick={() => onChange({ moveType: 'between-cities', fromCity: 'Hassan', toCity: details.toCity || 'Bengaluru' })}
          className={`cursor-pointer p-5 rounded-2xl border-2 transition-all flex items-start gap-4 relative overflow-hidden ${
            details.moveType === 'between-cities'
              ? 'border-brand-blue bg-blue-50/80 shadow-md ring-2 ring-brand-blue/20'
              : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
          }`}
        >
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
            details.moveType === 'between-cities' ? 'bg-brand-blue text-white' : 'bg-slate-100 text-slate-600'
          }`}>
            <Navigation className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-base text-brand-navy">Between Cities</h3>
              {details.moveType === 'between-cities' && (
                <span className="bg-brand-blue text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5">
                  <Check className="w-3 h-3" /> Selected
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Relocation starting from Hassan to any city in Karnataka &amp; across India.
            </p>
          </div>
        </div>
      </div>

      {/* Location Fields Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
        {/* From Location (Fixed / Default: Hassan) */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Pickup City / Area
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <MapPin className="w-4 h-4 text-emerald-600" />
            </div>
            <input
              type="text"
              readOnly
              value={details.fromCity}
              className="w-full pl-10 pr-4 py-3 bg-slate-100 border border-slate-300 rounded-xl text-slate-800 text-sm font-bold cursor-not-allowed"
            />
            <span className="absolute right-3 top-3 text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
              Fixed Origin
            </span>
          </div>
        </div>

        {/* Destination Location */}
        <div className="relative">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Destination City
          </label>
          {details.moveType === 'within-city' ? (
            <input
              type="text"
              value={details.toCity}
              onChange={(e) => onChange({ toCity: e.target.value })}
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 text-sm font-semibold focus:ring-2 focus:ring-brand-blue outline-none"
              placeholder="e.g. Kuvempu Nagar, Hassan"
            />
          ) : (
            <div className="relative">
              <input
                type="text"
                value={details.toCity}
                onFocus={() => setShowCityDropdown(true)}
                onChange={(e) => {
                  setCitySearch(e.target.value);
                  onChange({ toCity: e.target.value });
                  setShowCityDropdown(true);
                }}
                placeholder="Search destination city (e.g. Bengaluru, Mysuru)..."
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 text-sm font-semibold focus:ring-2 focus:ring-brand-blue outline-none"
              />

              {showCityDropdown && (
                <div className="absolute z-30 left-0 right-0 mt-1 max-h-48 overflow-y-auto bg-white border border-slate-200 rounded-xl shadow-xl">
                  {filteredCities.length > 0 ? (
                    filteredCities.map((city) => (
                      <div
                        key={city}
                        onClick={() => {
                          onChange({ toCity: city });
                          setShowCityDropdown(false);
                        }}
                        className="px-4 py-2.5 hover:bg-brand-light hover:text-brand-blue cursor-pointer text-xs font-medium border-b border-slate-100 last:border-0"
                      >
                        📍 {city}
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-xs text-slate-400">No matching city found. Type custom city name.</div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Customer Contact Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name *</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <User className="w-4 h-4" />
            </div>
            <input
              type="text"
              required
              value={details.name}
              onChange={(e) => onChange({ name: e.target.value })}
              placeholder="e.g. Ramesh Gowda"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-brand-blue outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Number *</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Phone className="w-4 h-4" />
            </div>
            <input
              type="tel"
              required
              value={details.phone}
              onChange={(e) => onChange({ phone: e.target.value })}
              placeholder="+91 98765 43210"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-brand-blue outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Mail className="w-4 h-4" />
            </div>
            <input
              type="email"
              value={details.email}
              onChange={(e) => onChange({ email: e.target.value })}
              placeholder="ramesh@example.com"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-brand-blue outline-none"
            />
          </div>
        </div>
      </div>

      {/* Moving Date & House Type */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Moving Date */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Moving Date *</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Calendar className="w-4 h-4 text-brand-blue" />
            </div>
            <input
              type="date"
              required
              value={details.movingDate}
              onChange={(e) => onChange({ movingDate: e.target.value })}
              min={new Date().toISOString().split('T')[0]}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-brand-blue outline-none"
            />
          </div>
        </div>

        {/* House Type Selector */}
        <div className="md:col-span-2">
          <label className="block text-xs font-bold text-slate-700 mb-1">House / Property Type</label>
          <div className="grid grid-cols-5 gap-2">
            {HOUSE_TYPES.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => onChange({ houseType: type })}
                className={`py-3 rounded-xl text-xs font-bold transition-all border ${
                  details.houseType === type
                    ? 'bg-brand-blue text-white border-brand-blue shadow-md'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Floor Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
          <label className="block text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-brand-blue" /> Current Pickup Floor
          </label>
          <div className="grid grid-cols-5 gap-1.5">
            {FLOOR_LEVELS.map((floor) => (
              <button
                key={floor}
                type="button"
                onClick={() => onChange({ currentFloor: floor })}
                className={`py-2 rounded-xl text-xs font-semibold transition-all border ${
                  details.currentFloor === floor
                    ? 'bg-slate-800 text-white border-slate-800'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                }`}
              >
                {floor}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
          <label className="block text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-emerald-600" /> Destination Drop Floor
          </label>
          <div className="grid grid-cols-5 gap-1.5">
            {FLOOR_LEVELS.map((floor) => (
              <button
                key={floor}
                type="button"
                onClick={() => onChange({ destFloor: floor })}
                className={`py-2 rounded-xl text-xs font-semibold transition-all border ${
                  details.destFloor === floor
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                }`}
              >
                {floor}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Next Button */}
      <div className="pt-4 flex justify-end">
        <button
          type="submit"
          className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-brand-blue hover:bg-brand-darkBlue text-white font-bold text-base shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
        >
          Next Step: Select Inventory <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </motion.form>
  );
};
