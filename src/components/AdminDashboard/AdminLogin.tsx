import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Truck, ArrowLeft, ShieldAlert } from 'lucide-react';

interface AdminLoginProps {
  onLoginSuccess: () => void;
  onBack: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, onBack }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Default admin passcode
    if (password === 'admin123' || password === 'admin' || password === '1234') {
      onLoginSuccess();
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-slate-800 rounded-3xl p-8 shadow-2xl border border-slate-700 space-y-6 relative"
      >
        <button
          onClick={onBack}
          className="absolute top-6 left-6 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2 pt-4">
          <div className="w-14 h-14 rounded-2xl bg-brand-blue text-white mx-auto flex items-center justify-center shadow-lg shadow-blue-500/30">
            <Truck className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-black text-white">Staff Admin Login</h2>
          <p className="text-xs text-slate-400">Hassan Packers &amp; Movers Operations Management</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
              Admin Passcode
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                placeholder="Enter passcode (default: admin123)"
                className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-sm font-medium text-white focus:ring-2 focus:ring-brand-blue outline-none"
              />
            </div>
            {error && (
              <p className="text-xs text-rose-400 mt-1.5 flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5" /> Incorrect passcode. Try 'admin123'
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl bg-brand-blue hover:bg-brand-darkBlue text-white font-extrabold text-sm shadow-lg shadow-blue-500/25 transition-all"
          >
            Authenticate &amp; Enter Dashboard
          </button>
        </form>

        <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-700/60 text-[11px] text-slate-400 text-center">
          🔑 Demo Staff Password: <span className="font-mono text-emerald-400 font-bold">admin123</span>
        </div>
      </motion.div>
    </div>
  );
};
