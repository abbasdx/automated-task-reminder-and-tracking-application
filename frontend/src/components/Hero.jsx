import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, CheckCircle2, Zap } from "lucide-react";
import { isLoggedIn } from "../api/taskApi";

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };
const floatAnim1 = { initial: { y: 0 }, animate: { y: [-6, 6, -6], transition: { duration: 6, repeat: Infinity, ease: "easeInOut" } } };
const floatAnim2 = { initial: { y: 0 }, animate: { y: [6, -6, 6], transition: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 } } };

export default function Hero() {
  const navigate = useNavigate();
  const loggedIn = isLoggedIn();

  return (
    <section className="relative flex min-h-fit items-center overflow-hidden bg-[#030712] pb-16 pt-34 sm:pb-20 sm:pt-32 md:pt-40 lg:pb-32">
      <div className="pointer-events-none absolute inset-0 flex justify-center overflow-hidden">
        <div className="absolute top-[10%] h-[300px] w-[400px] -translate-x-1/3 rounded-full bg-indigo-500/10 blur-[100px] sm:h-[400px] sm:w-[600px] sm:blur-[140px]" />
        <div className="absolute bottom-[20%] right-[-10%] h-[300px] w-[300px] rounded-full bg-indigo-500/5 blur-[100px] sm:h-[500px] sm:w-[500px] sm:blur-[140px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-5 sm:px-6 md:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          
          <div className="mx-auto max-w-[680px] text-center lg:mx-0 lg:text-left">
            <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.6 }}>
              <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.02] px-3 py-1.5 text-[0.65rem] font-medium uppercase tracking-widest text-slate-300 sm:px-4 sm:text-xs">
                <Sparkles size={14} className="text-indigo-400" aria-hidden="true" /> Smart Task Management
              </span>
            </motion.div>
            <motion.h1 initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.6, delay: 0.1 }} className="text-[2.5rem] font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[4.2rem]">
              Plan your day. <br className="hidden sm:block"/><span className="text-slate-400">Stay in control.</span>
            </motion.h1>
            <motion.p initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.6, delay: 0.2 }} className="mx-auto mt-5 max-w-[520px] text-sm leading-relaxed text-slate-400 sm:mt-6 sm:text-base lg:mx-0 lg:text-lg">
              TaskTracker helps you organize tasks, set AI-driven reminders, and track your progress natively—without feeling overwhelmed. Completely free.
            </motion.p>
            <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.6, delay: 0.3 }} className="mt-8 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row sm:gap-4 lg:justify-start">
              <button onClick={() => navigate(loggedIn ? "/dashboard" : "/login")} className="group flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-slate-950 transition-all hover:bg-slate-200 active:scale-95 sm:w-auto sm:px-8 sm:py-4 sm:text-[0.95rem]">
                {loggedIn ? "Launch Workspace" : "Get Started Free"} <ArrowRight size={18} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
              </button>
              <button onClick={() => navigate("/features")} className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.02] px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/[0.06] active:scale-95 sm:w-auto sm:px-8 sm:py-4 sm:text-[0.95rem]">
                Explore Features
              </button>
            </motion.div>
          </div>

          <div className="relative hidden w-full lg:block">
            <motion.div initial={{ opacity: 0, scale: 0.95, rotateX: 10, rotateY: -10 }} animate={{ opacity: 1, scale: 1, rotateX: 0, rotateY: 0 }} transition={{ duration: 1, delay: 0.2, ease: "easeOut" }} className="relative z-10 w-full rounded-[2rem] border border-white/[0.06] bg-[#0a0e17]/80 p-8 shadow-2xl backdrop-blur-2xl" style={{ perspective: 1000 }}>
              <div className="mb-6 flex items-center justify-between border-b border-white/[0.05] pb-4">
                <div className="flex items-center gap-2.5"><div className="h-3 w-3 rounded-full bg-white/[0.1]" /><div className="h-3 w-3 rounded-full bg-white/[0.1]" /><div className="h-3 w-3 rounded-full bg-white/[0.1]" /></div>
                <div className="h-4 w-24 rounded bg-white/[0.05]" />
              </div>
              <div className="mb-6 flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 shadow-inner transition-colors hover:bg-white/[0.04]">
                <Sparkles size={18} className="text-slate-400" /><div className="h-4 w-64 rounded bg-white/[0.08]" /><div className="ml-auto h-8 w-16 rounded-lg bg-indigo-500/20" />
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between rounded-xl border border-white/[0.04] bg-white/[0.01] p-4 transition-colors hover:bg-white/[0.03]">
                  <div className="flex items-center gap-4"><CheckCircle2 size={20} className="text-slate-600" /><div><div className="mb-2 h-3 w-40 rounded bg-slate-300" /><div className="flex gap-2"><div className="h-2 w-16 rounded bg-indigo-500/40" /><div className="h-2 w-12 rounded bg-slate-500/40" /></div></div></div>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-white/[0.04] bg-white/[0.01] p-4 opacity-50 transition-colors hover:bg-white/[0.03] hover:opacity-100">
                  <div className="flex items-center gap-4"><CheckCircle2 size={20} className="text-emerald-500" /><div><div className="mb-2 h-3 w-48 rounded bg-slate-500 line-through" /><div className="flex gap-2"><div className="h-2 w-12 rounded bg-slate-600/40" /></div></div></div>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-white/[0.04] bg-white/[0.01] p-4 transition-colors hover:bg-white/[0.03]">
                  <div className="flex items-center gap-4"><CheckCircle2 size={20} className="text-slate-600" /><div><div className="mb-2 h-3 w-32 rounded bg-slate-300" /><div className="flex gap-2"><div className="h-2 w-20 rounded bg-indigo-500/40" /></div></div></div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={floatAnim1} initial="initial" animate="animate" className="absolute -left-10 top-12 z-20 rounded-2xl border border-white/[0.08] bg-[#0a0e17] p-4 shadow-[0_20px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.05] bg-white/[0.03] text-emerald-400"><CheckCircle2 size={18} aria-hidden="true" /></div>
                <div><p className="text-[0.65rem] font-semibold uppercase tracking-widest text-slate-500">Productivity</p><p className="text-lg font-bold text-white">99.9%</p></div>
              </div>
            </motion.div>

            <motion.div variants={floatAnim2} initial="initial" animate="animate" className="absolute -right-8 bottom-12 z-20 rounded-2xl border border-white/[0.08] bg-[#0a0e17] p-4 shadow-[0_20px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.05] bg-white/[0.03] text-indigo-400"><Zap size={18} aria-hidden="true" /></div>
                <div><p className="text-[0.65rem] font-semibold uppercase tracking-widest text-slate-500">AI Engine</p><p className="text-lg font-bold text-white">Active</p></div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}