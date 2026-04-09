import { motion } from "framer-motion";
import { Sparkles, ListChecks, Clock3, MailCheck, BarChart3, Download } from "lucide-react";

const features = [
  { icon: Sparkles, title: "AI Task Creation", desc: "Type naturally ('Buy groceries at 5 PM'). AI automatically extracts the date, time, and priority.", highlight: true },
  { icon: ListChecks, title: "Simple Organization", desc: "Keep all your to-dos in one clean place. Easily sort and filter your tasks by priority or category." },
  { icon: MailCheck, title: "Helpful Reminders", desc: "Never forget an important task. We'll send an automated email reminder right to your inbox." },
  { icon: Clock3, title: "Clear Deadlines", desc: "Instantly see what needs your attention with bright, color-coded tags for overdue and pending tasks." },
  { icon: BarChart3, title: "Progress Insights", desc: "Stay motivated. Simple visual charts show exactly how many tasks you've knocked out today." },
  { icon: Download, title: "Easy Export", desc: "Download a complete history of all your tasks into a simple spreadsheet anytime you need." }
];

const stagger = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

export default function Features() {
  return (
    <section id="features" className="bg-[#030712] px-4 py-16 sm:px-6 md:px-8 md:py-24">
      <div className="mx-auto w-full max-w-7xl">
        
        <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-12 md:mb-16">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">Everything you need.</h2>
          <p className="text-sm leading-relaxed text-slate-400 sm:text-base">We removed the complex menus and confusing settings, leaving only the beautifully designed tools you actually need to stay productive.</p>
        </div>

        <motion.div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}>
          {features.map((f, i) => (
            <motion.article key={i} variants={fadeUp} className="group relative flex flex-col rounded-[2rem] border border-white/[0.05] bg-white/[0.01] p-6 transition-colors hover:bg-white/[0.02] sm:p-8">
              <div className="mb-5 flex items-center justify-between sm:mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-slate-300 transition-colors group-hover:text-white">
                  <f.icon size={20} strokeWidth={1.5} />
                </div>
                {f.highlight && <span className="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-indigo-300">AI Integrated</span>}
              </div>
              <h3 className="mb-2 text-lg font-semibold tracking-tight text-white sm:text-xl">{f.title}</h3>
              <p className="text-sm leading-relaxed text-slate-400">{f.desc}</p>
            </motion.article>
          ))}
        </motion.div>

      </div>
    </section>
  );
}