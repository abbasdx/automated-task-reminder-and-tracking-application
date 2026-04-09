import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { isLoggedIn } from "../api/taskApi";

const stats = [
  { value: "10K+", label: "Tasks Created" }, { value: "98%", label: "On-time Reminders" },
  { value: "500+", label: "Active Users" }, { value: "4.9/5", label: "User Rating" }
];

const stagger = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } } };

export default function CtaBanner() {
  const navigate = useNavigate();
  const loggedIn = isLoggedIn();

  return (
    <div className="bg-[#030712] selection:bg-indigo-500/30 selection:text-white">
      
      <section className="border-t border-white/[0.04] px-5 py-8 sm:px-8 md:py-8">
        <div className="mx-auto max-w-7xl">
          <motion.div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-6" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}>
            {stats.map((s) => (
              <motion.div key={s.label} variants={fadeUp} className="group relative flex flex-col items-center justify-center overflow-hidden rounded-3xl border border-white/[0.04] bg-white/[0.01] p-8 text-center transition-colors duration-300 hover:bg-white/[0.02]">
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-500/[0.03] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <h3 className="mb-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">{s.value}</h3>
                <p className="text-[0.65rem] font-semibold uppercase tracking-widest text-slate-500 transition-colors group-hover:text-slate-400">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="relative overflow-hidden px-5 py-24 sm:px-8 md:py-12 lg:py-14">
        <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[300px] w-full max-w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-[120px] sm:h-[400px]" />
        <div className="mx-auto w-full max-w-5xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="relative overflow-hidden rounded-[2.5rem] border border-white/[0.05] bg-[#0a0e17]/50 p-10 text-center shadow-[0_20px_60px_rgba(0,0,0,0.4)] backdrop-blur-xl sm:p-16 lg:p-20">
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white/[0.02] to-transparent" />
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/[0.05] bg-white/[0.02] text-slate-300"><ShieldCheck size={28} strokeWidth={1.5} aria-hidden="true" /></div>
            <h2 className="mb-6 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">Ready to get organized?</h2>
            <p className="mx-auto mb-10 max-w-xl text-sm leading-relaxed text-slate-400 sm:text-base md:text-lg">Join thousands of people using TaskTracker to simplify their lives, never miss a deadline, and get more done every single day.</p>
            <button onClick={() => navigate(loggedIn ? "/dashboard" : "/login")} className="group relative inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-slate-950 transition-all hover:bg-slate-200 active:scale-95 sm:w-auto sm:px-10 sm:py-4 sm:text-[0.95rem]">
              <span>{loggedIn ? "Launch Workspace" : "Create your free account"}</span> <ArrowRight size={18} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>
        </div>
      </section>
      
    </div>
  );
}