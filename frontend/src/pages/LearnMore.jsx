import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles, ListChecks, BarChart3, Clock3, Download, Mail, BellRing, CalendarClock, ShieldCheck, CheckCircle2 } from "lucide-react";
import { isLoggedIn } from "../api/taskApi"; 
import Footer from "../components/Footer";

const features = [
  { icon: Sparkles, title: "AI Task Creation", desc: "Just type naturally (like 'Buy groceries tomorrow at 5 PM'). Our AI automatically extracts the date, time, and priority.", colSpan: "md:col-span-2 lg:col-span-2", highlight: true, points: ["Types like a normal sentence", "Auto-sorts by category", "Smart date recognition"] },
  { icon: ListChecks, title: "Simple Organization", desc: "Keep all your to-dos in one clean place. Easily sort and filter your tasks by priority, category, or due date.", colSpan: "md:col-span-1 lg:col-span-1", points: ["Clean, distraction-free view", "Easy filtering", "Sort by importance"] },
  { icon: Clock3, title: "Clear Deadlines", desc: "Instantly see what needs your attention with bright, color-coded tags for overdue, pending, and completed tasks.", colSpan: "md:col-span-1 lg:col-span-1", points: ["Color-coded labels", "Overdue alerts", "Clear daily goals"] },
  { icon: BarChart3, title: "Progress Insights", desc: "Stay motivated by tracking your daily productivity. Simple visual charts show how many tasks you've knocked out.", colSpan: "md:col-span-1 lg:col-span-1", points: ["Daily progress tracking", "Visual success charts", "Category breakdown"] },
  { icon: Download, title: "Easy Export", desc: "Download a complete history of all your tasks into a simple spreadsheet anytime you need to save or print them.", colSpan: "md:col-span-2 lg:col-span-1", points: ["One-click download", "Spreadsheet format", "Keep a personal backup"] }
];

const steps = [
  { num: "1", title: "Create an Account", desc: "Sign up in seconds. It's completely free and requires no credit card." },
  { num: "2", title: "Add Your Tasks", desc: "Just type what you need to do. Our AI handles the dates and organization." },
  { num: "3", title: "Get Reminders", desc: "Go about your day. We'll email you when a deadline is approaching." },
  { num: "4", title: "Track Progress", desc: "Check off completed tasks and watch your daily productivity grow." }
];

const staggerContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } } };
const floatAnim = { initial: { y: 0 }, animate: { y: [-5, 5, -5], transition: { duration: 6, repeat: Infinity, ease: "easeInOut" } } };

export default function LearnMore() {
  const navigate = useNavigate();
  const loggedIn = isLoggedIn(); // ✨ Check if user is logged in

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#030712] font-sans antialiased selection:bg-indigo-500/30 selection:text-white">
      
      {/* 1. HERO SECTION */}
      <section className="relative flex flex-col justify-center px-4 pb-16 pt-34 sm:px-6 md:px-8 md:pt-40 lg:min-h-[90vh] lg:pb-32">
        <div className="pointer-events-none absolute left-1/2 top-[10%] -z-10 h-[300px] w-full max-w-[600px] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-[120px] sm:h-[400px]" />
        <div className="mx-auto w-full max-w-7xl">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <div className="text-center lg:text-left">
              <motion.div initial="hidden" animate="visible" variants={fadeUp}>
                <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-[0.7rem] font-medium tracking-wide text-slate-300 backdrop-blur-md sm:px-4 sm:text-xs">
                  <BellRing size={14} className="text-slate-400" aria-hidden="true" /> <span>Peace of mind, automated.</span>
                </span>
              </motion.div>
              <motion.h1 initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.1 }} className="mb-5 text-4xl font-bold leading-[1.1] tracking-tight text-white sm:mb-6 sm:text-5xl lg:text-[4rem]">
                Never forget an <br className="hidden sm:block"/> <span className="text-slate-400">important task again.</span>
              </motion.h1>
              <motion.p initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.2 }} className="mx-auto mb-8 max-w-[520px] text-sm leading-relaxed text-slate-400 sm:text-base lg:mx-0 lg:text-lg">
                TaskTracker doesn't just store your to-dos. It actively watches your deadlines and sends friendly email reminders directly to your inbox so nothing slips through the cracks.
              </motion.p>
              <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.3 }} className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
                
                <button onClick={() => navigate(loggedIn ? "/dashboard" : "/login")} className="group flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-slate-950 transition-all hover:bg-slate-200 active:scale-95 sm:w-auto sm:px-8 sm:py-4 sm:text-[0.95rem]">
                  <span>{loggedIn ? "Go to Dashboard" : "Start for Free"}</span> 
                  <ArrowRight size={18} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
                </button>

              </motion.div>
            </div>

            <div className="relative hidden w-full lg:block">
              <motion.div initial={{ opacity: 0, scale: 0.95, rotateY: -10 }} animate={{ opacity: 1, scale: 1, rotateY: 0 }} transition={{ duration: 1, delay: 0.2, ease: "easeOut" }} className="relative z-10 w-full rounded-[2rem] border border-white/[0.06] bg-white/[0.02] p-8 shadow-2xl backdrop-blur-2xl" style={{ perspective: 1000 }}>
                <div className="mb-6 flex items-center gap-2 border-b border-white/[0.05] pb-4">
                  <div className="h-3 w-3 rounded-full bg-white/[0.1]" /><div className="h-3 w-3 rounded-full bg-white/[0.1]" /><div className="h-3 w-3 rounded-full bg-white/[0.1]" />
                </div>
                <div className="flex flex-col gap-4 opacity-20 blur-[2px]">
                  <div className="h-14 w-full rounded-xl bg-white/[0.04]" /><div className="h-14 w-3/4 rounded-xl bg-white/[0.04]" /><div className="h-14 w-full rounded-xl bg-white/[0.04]" />
                </div>
              </motion.div>
              <motion.div variants={floatAnim} initial="initial" animate="animate" className="absolute -left-8 top-1/2 z-20 w-[105%] -translate-y-1/2 rounded-2xl border border-white/[0.08] bg-[#0a0e17] p-5 shadow-[0_30px_60px_rgba(0,0,0,0.6)] backdrop-blur-xl">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.05] bg-white/[0.03] text-slate-300"><Mail size={18} aria-hidden="true" /></div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Reminder: Task Due Soon</h4>
                    <p className="mt-1 text-[0.85rem] leading-relaxed text-slate-400">Hi there, your task <span className="font-medium text-slate-200">"Finalize quarterly presentation"</span> is due in 1 hour. Time to wrap it up!</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/[0.04] bg-[#020617] px-4 py-16 sm:px-6 md:px-8 md:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="rounded-[2rem] border border-white/[0.05] bg-white/[0.01] p-6 sm:rounded-[2.5rem] sm:p-12 md:p-16">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] text-slate-300 sm:mb-6 sm:h-16 sm:w-16"><CalendarClock size={28} strokeWidth={1.5} aria-hidden="true" /></div>
            <h2 className="mb-3 text-2xl font-bold tracking-tight text-white sm:mb-4 sm:text-3xl md:text-4xl">We remember so you don't have to.</h2>
            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base md:text-lg">Life gets busy. That's why TaskTracker includes a built-in automated email engine. Simply set a due date, and we will safely land a reminder in your inbox before the deadline hits. Close your tabs, step away from the desk, and rest easy.</p>
          </motion.div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 md:px-8 md:py-32 lg:py-20">
        <div className="mx-auto w-full max-w-7xl">
          <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-16 md:mb-20">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">Everything else you need.</h2>
            <p className="text-sm leading-relaxed text-slate-400 sm:text-base">We removed the complicated menus and confusing settings, leaving only the beautifully designed tools you actually need to stay productive.</p>
          </div>
          <motion.div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}>
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.article key={i} variants={fadeUp} className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/[0.05] bg-[#0a0e17]/50 p-6 transition-colors hover:bg-white/[0.02] sm:p-8 ${f.colSpan}`}>
                  <div className="relative z-10">
                    <div className="mb-6 flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-slate-300 transition-colors group-hover:text-white"><Icon size={20} strokeWidth={1.5} aria-hidden="true" /></div>
                      {f.highlight && <span className="inline-flex items-center rounded-full border border-indigo-500/20 bg-indigo-500/10 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-indigo-300">AI Integrated</span>}
                    </div>
                    <h3 className="mb-2 text-lg font-semibold tracking-tight text-white sm:mb-3">{f.title}</h3>
                    <p className="mb-6 text-sm leading-relaxed text-slate-400">{f.desc}</p>
                    {f.points && (
                      <ul className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6">
                        {f.points.map((p, j) => <li key={j} className="flex items-center gap-2 text-xs font-medium text-slate-500 transition-colors group-hover:text-slate-400"><CheckCircle2 size={14} className="shrink-0 text-slate-600" aria-hidden="true" /><span>{p}</span></li>)}
                      </ul>
                    )}
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section className="border-t border-white/[0.04] bg-[#020617] px-4 py-16 sm:px-6 md:px-8 md:py-20">
        <div className="mx-auto w-full max-w-7xl">
          <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-16 md:mb-20">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">Start in seconds.</h2>
            <p className="text-sm leading-relaxed text-slate-400 sm:text-base">Getting started is incredibly easy. You'll be organized and ready to tackle your day in just a few minutes.</p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {steps.map((s, i) => (
              <div key={i} className="relative rounded-3xl border border-white/[0.04] bg-white/[0.01] p-6 transition-colors hover:bg-white/[0.02] sm:p-8">
                <div className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-sm font-bold text-slate-300 sm:mb-6">{s.num}</div>
                <h4 className="mb-2 text-base font-semibold tracking-tight text-white sm:mb-3">{s.title}</h4>
                <p className="text-sm leading-relaxed text-slate-400">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden px-4 py-20 sm:px-6 md:px-8 md:py-32 lg:py-20">
        <div className="pointer-events-none absolute bottom-0 left-1/2 -z-10 h-[300px] w-full max-w-[800px] -translate-x-1/2 rounded-full bg-indigo-600/10 blur-[100px] sm:h-[400px] sm:blur-[140px]" />
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.05] bg-white/[0.02] text-slate-300 sm:mb-6 sm:h-16 sm:w-16"><ShieldCheck size={28} strokeWidth={1.5} aria-hidden="true" /></div>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-white sm:mb-6 sm:text-4xl md:text-5xl">Ready to get organized?</h2>
          <p className="mb-8 text-sm leading-relaxed text-slate-400 sm:mb-10 sm:text-base md:text-lg">Join thousands of people using TaskTracker to simplify their lives, never miss a deadline, and get more done every single day.</p>
          
          <button onClick={() => navigate(loggedIn ? "/dashboard" : "/login")} className="group flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-slate-950 transition-all hover:bg-slate-200 active:scale-95 sm:w-auto sm:px-10 sm:py-4 sm:text-[0.95rem]">
            <span>{loggedIn ? "Open Dashboard" : "Create your free account"}</span> 
            <ArrowRight size={18} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
          </button>

        </div>
      </section>
    <Footer/>
      
    </div>
  );
}