import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Truck, ArrowLeft, ShieldAlert, Shield } from 'lucide-react';

interface AdminLoginProps {
  onLoginSuccess: () => void;
  onBack: () => void;
}

// Secure hash function using Web Crypto API
const hashPassword = async (pass: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(pass + 'hpm_salt_2026');
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
};

// Admin password: Hassan@2026!
// To change: update the password string in hashPassword comparison below
const ADMIN_PASSWORD = 'Hassan@2026!';

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, onBack }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [lockoutUntil, setLockoutUntil] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check lockout
    if (lockoutUntil && new Date() < lockoutUntil) {
      const secsLeft = Math.ceil((lockoutUntil.getTime() - Date.now()) / 1000);
      setError(`Too many failed attempts. Try again in ${secsLeft} seconds.`);
      return;
    }

    if (!password.trim()) {
      setError('Please enter your password.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const inputHash = await hashPassword(password);
      const correctHash = await hashPassword(ADMIN_PASSWORD);

      if (inputHash === correctHash) {
        setAttempts(0);
        onLoginSuccess();
      } else {
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);

        if (newAttempts >= 3) {
          // Lock for 5 minutes
          const lockout = new Date(Date.now() + 5 * 60 * 1000);
          setLockoutUntil(lockout);
          setError('Access locked for 5 minutes due to multiple failed attempts.');
        } else {
          setError(`Incorrect credentials. ${3 - newAttempts} attempt(s) remaining before lockout.`);
        }
        setPassword('');
      }
    } catch {
      setError('Authentication error. Please refresh and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const isLocked = lockoutUntil ? new Date() < lockoutUntil : false;

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
          aria-label="Back to website"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2 pt-4">
          <div className="w-14 h-14 rounded-2xl bg-brand-blue text-white mx-auto flex items-center justify-center shadow-lg shadow-blue-500/30">
            <Shield className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-black text-white">Staff Portal Login</h1>
          <p className="text-xs text-slate-400">Hassan Packers &amp; Movers — Operations Management</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
              Staff Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                placeholder="Enter your password"
                autoComplete="current-password"
                disabled={isLocked || isLoading}
                className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-sm font-medium text-white focus:ring-2 focus:ring-brand-blue outline-none disabled:opacity-50"
              />
            </div>
            {error && (
              <p className="text-xs text-rose-400 mt-1.5 flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLocked || isLoading}
            className="w-full py-3.5 rounded-2xl bg-brand-blue hover:bg-brand-darkBlue text-white font-extrabold text-sm shadow-lg shadow-blue-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Verifying...' : isLocked ? 'Account Locked' : 'Authenticate & Enter Dashboard'}
          </button>
        </form>

        <div className="text-center">
          <button
            onClick={onBack}
            className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
          >
            ← Back to Website
          </button>
        </div>
      </motion.div>
    </div>
  );
};
