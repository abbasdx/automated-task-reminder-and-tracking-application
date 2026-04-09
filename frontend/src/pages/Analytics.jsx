import { useEffect, useMemo, useState } from "react";
import { getTasks, getOverview } from "../api/taskApi";
import { ListTodo, Clock, AlertTriangle, Flame, CalendarDays, Lightbulb, BarChart3 } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell, Legend } from "recharts";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const PRIORITY_COLORS = { HIGH: "#ef4444", MEDIUM: "#f59e0b", LOW: "#10b981" };
const tooltipStyle = { background: "rgba(3, 7, 18, 0.85)", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "12px", color: "#e5e7eb", fontSize: "0.85rem", backdropFilter: "blur(16px)", boxShadow: "0 20px 40px rgba(0,0,0,0.5)" };
const staggerContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const fadeUpAnim = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } } };

const Stat = ({ title, value, icon: Icon, colorClass, danger }) => (
  <motion.div variants={fadeUpAnim} className={`group relative overflow-hidden rounded-2xl sm:rounded-3xl border p-4 sm:p-6 transition-all duration-300 ${danger ? "border-red-500/20 bg-gradient-to-b from-red-500/[0.05] to-transparent hover:border-red-500/30" : "border-white/[0.04] bg-gradient-to-b from-white/[0.02] to-transparent hover:border-white/[0.08]"}`}>
    <div className="mb-3 flex items-center gap-2 sm:mb-4 sm:gap-3">
      <div className={`flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl border border-white/[0.05] bg-white/[0.02] ${colorClass}`}><Icon size={18} strokeWidth={2.5} className="scale-75 sm:scale-100" /></div>
      <span className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400 sm:text-[0.7rem]">{title}</span>
    </div>
    <h3 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl lg:text-4xl">{value}</h3>
  </motion.div>
);

const AnalyticsCard = ({ title, children, wide }) => (
  <motion.div variants={fadeUpAnim} className={`flex flex-col overflow-hidden rounded-2xl sm:rounded-3xl border border-white/[0.04] bg-gradient-to-b from-[#0a0e17]/80 to-[#030712]/80 p-4 sm:p-6 backdrop-blur-xl transition-colors hover:border-white/[0.08] ${wide ? "lg:col-span-2" : "col-span-1"}`}>
    <h6 className="mb-4 sm:mb-6 text-sm font-semibold tracking-wide text-slate-200">{title}</h6><div className="flex-1">{children}</div>
  </motion.div>
);

export default function Analytics() {
  const [tasks, setTasks] = useState([]);
  const [overview, setOverview] = useState({ totalTasks: 0, completedTasks: 0, pendingTasks: 0 });
  const navigate = useNavigate();
  const now = new Date();

  useEffect(() => {
    (async () => {
      const [tasksRes, overviewRes] = await Promise.all([getTasks(), getOverview()]);
      setTasks(tasksRes.data || []); setOverview(overviewRes.data || {});
    })();
  }, []);

  const completionRate = overview.totalTasks ? Math.round((overview.completedTasks / overview.totalTasks) * 100) : 0;
  const overdueCount = tasks.filter(t => t.dueDate && new Date(t.dueDate) < now && !t.completed).length;
  const highPriorityCount = tasks.filter(t => t.priority === "HIGH").length;
  const todayCount = tasks.filter(t => t.dueDate?.startsWith(now.toISOString().split("T")[0])).length;

  const dailyTrendData = useMemo(() => Object.values(tasks.reduce((acc, t) => {
    if (!t.dueDate) return acc;
    const d = t.dueDate.split("T")[0];
    if (!acc[d]) acc[d] = { date: d, completed: 0, pending: 0, overdue: 0 };
    t.completed ? acc[d].completed++ : (new Date(t.dueDate) < now ? acc[d].overdue++ : acc[d].pending++);
    return acc;
  }, {})).sort((a, b) => new Date(a.date) - new Date(b.date)), [tasks, now]);

  const categoryData = useMemo(() => Object.entries(tasks.reduce((acc, t) => { acc[t.category] = (acc[t.category] || 0) + 1; return acc; }, {})).map(([category, count]) => ({ category, count })), [tasks]);
  const priorityData = useMemo(() => Object.entries(tasks.reduce((acc, t) => { acc[t.priority] = (acc[t.priority] || 0) + 1; return acc; }, {})).map(([priority, count]) => ({ priority, count })), [tasks]);

  const insightConfig = useMemo(() => completionRate >= 70 ? { type: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400", message: "Great job! You are consistently staying on top of your tasks." } : completionRate >= 40 ? { type: "border-amber-500/20 bg-amber-500/10 text-amber-400", message: "You're making steady progress. Try tackling some older pending tasks." } : { type: "border-red-500/20 bg-red-500/10 text-red-400", message: "Tasks are piling up. Focus on clearing your overdue tasks first." }, [completionRate]);

  if (tasks.length === 0) return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
      <div className="mb-6 flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl sm:rounded-3xl border border-white/[0.05] bg-white/[0.02] text-slate-500 shadow-2xl"><BarChart3 size={32} /></div>
      <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">No Data Available</h2>
      <p className="mt-2 max-w-md text-sm text-slate-400">Your analytics dashboard will automatically populate once you begin adding and completing tasks.</p>
      <button onClick={() => navigate("/dashboard")} className="mt-8 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-indigo-500">Return to Dashboard</button>
    </div>
  );

  return (
    <div className="min-h-screen px-4 mt-24 pb-20 sm:px-6 md:px-8 lg:px-12 xl:px-16 sm:mt-28 lg:pb-24">
      <div className="mx-auto max-w-[1400px]">
        <header className="mb-8 sm:mb-10"><h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Your Analytics</h2><p className="mt-1.5 sm:mt-2 text-sm text-slate-400 sm:text-base">A clear overview of your productivity and task progress.</p></header>
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="flex flex-col gap-4 sm:gap-6">
          
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-5">
            <Stat title="Total Tasks" value={overview.totalTasks} icon={ListTodo} colorClass="text-blue-400" />
            <Stat title="Pending" value={overview.pendingTasks} icon={Clock} colorClass="text-amber-400" />
            <Stat title="Overdue" value={overdueCount} icon={AlertTriangle} colorClass="text-red-400" danger />
            <Stat title="High Priority" value={highPriorityCount} icon={Flame} colorClass="text-red-400" />
            <Stat title="Due Today" value={todayCount} icon={CalendarDays} colorClass="text-indigo-400" />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-3">
            <AnalyticsCard title="Your Progress">
              <div className="flex h-full flex-col justify-between pb-1">
                <div>
                  <div className="mb-2 flex items-center gap-2 text-slate-400"><Lightbulb size={16} className="text-indigo-400" /><span className="text-xs font-semibold uppercase tracking-widest">Smart Insight</span></div>
                  <div className="mt-3 sm:mt-4 flex items-baseline gap-2"><h3 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">{completionRate}%</h3><span className="text-xs sm:text-sm font-medium text-slate-500">completion rate</span></div>
                </div>
                <div className={`mt-5 sm:mt-6 rounded-xl sm:rounded-2xl border p-3 sm:p-4 text-xs sm:text-sm font-medium leading-relaxed ${insightConfig.type}`}>{insightConfig.message}</div>
              </div>
            </AnalyticsCard>
            
            <AnalyticsCard title="Tasks Over Time" wide>
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={dailyTrendData} margin={{ top: 5, right: 10, bottom: 0, left: -25 }}>
                  <CartesianGrid stroke="rgba(255,255,255,0.03)" vertical={false} />
                  <XAxis dataKey="date" tickFormatter={d => new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric" })} tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} minTickGap={15} />
                  <YAxis allowDecimals={false} tick={{ fill: "#64748b", fontSize: 11 }} width={35} axisLine={false} tickLine={false} />
                  <Tooltip cursor={{ fill: "rgba(255,255,255,0.02)" }} contentStyle={tooltipStyle} />
                  <Line type="monotone" dataKey="completed" name="Completed" stroke="#10b981" strokeWidth={3} dot={false} activeDot={{ r: 5, strokeWidth: 0 }} />
                  <Line type="monotone" dataKey="pending" name="Pending" stroke="#f59e0b" strokeWidth={3} dot={false} activeDot={{ r: 5, strokeWidth: 0 }} />
                  <Line type="monotone" dataKey="overdue" name="Overdue" stroke="#ef4444" strokeWidth={3} dot={false} activeDot={{ r: 5, strokeWidth: 0 }} />
                </LineChart>
              </ResponsiveContainer>
            </AnalyticsCard>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
            <AnalyticsCard title="Tasks by Priority">
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie data={priorityData} dataKey="count" nameKey="priority" cx="50%" cy="50%" innerRadius="55%" outerRadius="75%" paddingAngle={4} stroke="none">
                    {priorityData.map((p, i) => <Cell key={i} fill={PRIORITY_COLORS[p.priority]} />)}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} itemStyle={{ color: "#fff" }} />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" formatter={value => <span className="ml-1 text-xs sm:text-sm font-medium text-slate-400">{value}</span>} />
                </PieChart>
              </ResponsiveContainer>
            </AnalyticsCard>
            
            <AnalyticsCard title="Category Breakdown">
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={categoryData} margin={{ top: 10, right: 10, bottom: 0, left: -25 }}>
                  <CartesianGrid stroke="rgba(255,255,255,0.03)" vertical={false} />
                  <XAxis dataKey="category" tickFormatter={val => val.charAt(0).toUpperCase() + val.slice(1).toLowerCase()} tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis allowDecimals={false} tick={{ fill: "#64748b", fontSize: 11 }} width={35} axisLine={false} tickLine={false} />
                  <Tooltip cursor={{ fill: "rgba(255,255,255,0.02)" }} contentStyle={tooltipStyle} labelFormatter={label => label.charAt(0).toUpperCase() + label.slice(1).toLowerCase()} />
                  <Bar dataKey="count" name="Tasks" fill="#6366f1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </AnalyticsCard>
          </div>

        </motion.div>
      </div>
    </div>
  );
}