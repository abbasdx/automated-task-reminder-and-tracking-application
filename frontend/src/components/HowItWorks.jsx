import { motion } from "framer-motion";
import { UserPlus, Sparkles, BellRing, TrendingUp } from "lucide-react";

const steps = [
  { num: "01", icon: UserPlus, title: "Create an Account", desc: "Sign up in seconds. Completely free, no credit card required to deploy." },
  { num: "02", icon: Sparkles, title: "Add Your Tasks", desc: "Just type what you need to do. Our AI handles the dates and organization." },
  { num: "03", icon: BellRing, title: "Get Reminders", desc: "Go about your day. We'll email you exactly when a deadline is approaching." },
  { num: "04", icon: TrendingUp, title: "Track Progress", desc: "Check off completed tasks and watch your daily productivity velocity grow." }
];

const containerAnim = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } };
const fadeUpAnim = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } };

export default function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-[#030712] px-4 py-16 sm:px-6 md:px-8 md:py-24" id="how-it-works">
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[400px] w-full max-w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-[120px] mix-blend-screen" />

      <div className="mx-auto w-full max-w-7xl">
        <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-16 lg:mb-24">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6 }}>
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl lg:leading-[1.1]">How it <span className="text-slate-400">works?</span></h2>
            <p className="mx-auto max-w-lg text-sm leading-relaxed text-slate-400 sm:text-base">Get up and running in minutes. Zero complex configurations required to start optimizing your day.</p>
          </motion.div>
        </div>

        <div className="relative">
          <div className="absolute left-[10%] right-[10%] top-[48px] hidden h-[1px] bg-gradient-to-r from-transparent via-white/[0.1] to-transparent lg:block" />

          <motion.div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-8" variants={containerAnim} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
            {steps.map((s, i) => (
              <motion.div key={i} variants={fadeUpAnim} className="group relative flex flex-col rounded-[2rem] border border-white/[0.05] bg-[#0a0e17]/80 p-6 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-white/[0.1] hover:bg-[#0a0e17] sm:p-8">
                <div className="absolute inset-x-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="mb-6 flex items-start justify-between sm:mb-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.02] text-slate-300 transition-colors duration-500 group-hover:border-indigo-500/30 group-hover:bg-indigo-500/10 group-hover:text-indigo-400">
                    <s.icon size={20} strokeWidth={1.5} aria-hidden="true" />
                  </div>
                  <div className="select-none text-4xl font-black tracking-tighter text-white/[0.04] transition-colors duration-500 group-hover:text-white/[0.08]">{s.num}</div>
                </div>

                <h4 className="mb-2 text-lg font-semibold tracking-tight text-white sm:mb-3">{s.title}</h4>
                <p className="text-sm leading-relaxed text-slate-400">{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}