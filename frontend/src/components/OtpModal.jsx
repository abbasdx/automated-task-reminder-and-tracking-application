import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, X, Loader2, AlertCircle } from "lucide-react";
import { sendOtp, verifyOtp } from "../api/taskApi";

export default function OtpModal({ isOpen, onClose, user, onSuccess }) {
  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [error, setError] = useState(null);

  // Handle the timer for the "Resend" button
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  // Send OTP automatically ONLY when the modal first opens
  useEffect(() => {
    if (isOpen && user?.email) {
      setOtp("");
      setError(null);
      setCountdown(60); 
      sendOtp(user.email).catch(() => {
        setCountdown(0);
        setError("Failed to send verification email. Please try again.");
      });
    } else {
      // Reset state when modal closes
      setOtp("");
      setError(null);
    }
  }, [isOpen, user?.email]);

  // Manual Resend Handler
  const handleResendOtp = async () => {
    if (countdown > 0) return;
    setError(null);
    setCountdown(60); 
    
    try {
      await sendOtp(user?.email);
    } catch (err) {
      setCountdown(0);
      setError("Failed to send verification email. Please try again.");
    }
  };

  const handleVerifySubmit = async (e) => {
    e.preventDefault();
    setIsVerifying(true);
    setError(null);

    try {
      await verifyOtp(user.email, otp);
      onSuccess(); // Triggers the dashboard update
    } catch (err) {
      // Capture the exact Exception message thrown by Spring Boot
      const backendError = err.response?.data?.message 
        || err.response?.data 
        || err.message 
        || "Invalid OTP. Please try again.";
        
      setError(backendError);
      setOtp(""); // Clear input on error
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex flex-col justify-end sm:items-center sm:justify-center">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="absolute inset-0 cursor-pointer bg-[#030712]/80 backdrop-blur-sm" 
            onClick={onClose} 
          />
          
          {/* Modal Content */}
          <motion.div 
            initial={{ y: "100%", opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            exit={{ y: "100%", opacity: 0 }} 
            transition={{ type: "spring", damping: 25, stiffness: 200 }} 
            className="relative w-full rounded-t-[2rem] border border-white/[0.08] bg-[#0a0e17] p-6 shadow-2xl sm:max-w-md sm:rounded-[2rem] sm:p-8" 
            onClick={e => e.stopPropagation()}
          >
            <div className="mx-auto mb-6 h-1.5 w-12 rounded-full bg-white/10 sm:hidden" />
            
            <div className="mb-8 flex items-center justify-between border-b border-white/[0.06] pb-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-indigo-500/20 bg-indigo-500/10 text-indigo-400">
                  <Mail size={24} strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="text-xl font-bold tracking-tight text-white">Enter Verification Code</h4>
                  <p className="mt-1 text-sm text-slate-400">Security check</p>
                </div>
              </div>
              <button onClick={onClose} className="hidden h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white/[0.04] text-slate-400 transition-colors hover:bg-white/[0.08] hover:text-white sm:flex">
                <X size={18} />
              </button>
            </div>

            <p className="mb-6 text-sm leading-relaxed text-slate-400">
              We've sent a 6-digit code to <span className="font-medium text-indigo-400">{user?.email}</span>. Valid for 10 minutes.
            </p>

            {/* Error Banner */}
            {error && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm font-medium text-red-400">
                <AlertCircle size={18} className="shrink-0" />
                {error}
              </motion.div>
            )}
            
            <form onSubmit={handleVerifySubmit}>
              <input 
                type="text" 
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                placeholder="000000"
                className="peer h-14 w-full rounded-xl border border-white/[0.06] bg-white/[0.02] text-center text-3xl font-bold tracking-[0.5em] text-slate-200 outline-none transition-all placeholder-slate-600 hover:bg-white/[0.04] focus:border-white/[0.1] focus:bg-white/[0.04] disabled:opacity-50"
                required
              />
              
              <div className="mt-8 flex flex-col gap-3">
                <button 
                  type="submit" 
                  disabled={otp.length !== 6 || isVerifying}
                  className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-white px-8 py-3.5 text-sm font-bold text-slate-950 transition-all hover:bg-slate-200 active:scale-95 disabled:pointer-events-none disabled:opacity-70"
                >
                  {isVerifying ? <><Loader2 size={16} className="animate-spin" /> Verifying...</> : "Verify & Enable Reminders"}
                </button>

                <div className="mt-2 text-center text-sm text-slate-400">
                  Didn't receive the code?{" "}
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={countdown > 0}
                    className="cursor-pointer font-medium text-indigo-400 hover:text-indigo-300 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:text-indigo-400"
                  >
                    {countdown > 0 ? `Resend in ${countdown}s` : "Resend OTP"}
                  </button>
                </div>
                
                {/* SKIP BUTTON ADDED HERE */}
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-1 flex w-full cursor-pointer items-center justify-center rounded-xl bg-transparent px-8 py-3 text-sm font-medium text-slate-400 transition-all hover:bg-white/[0.04] hover:text-slate-200 active:scale-95"
                >
                  Skip, I'll verify later
                </button>
                
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}