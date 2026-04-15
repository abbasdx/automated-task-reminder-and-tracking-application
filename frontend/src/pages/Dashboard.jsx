import { useEffect, useState, useCallback } from "react";
import { getTasks, getOverview, getUser } from "../api/taskApi";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import OtpModal from "../components/OtpModal"; 
// Added 'X' to the lucide-react imports
import { ListTodo, Clock, AlertTriangle, Loader2, AlertCircle, CheckCircle2, Plus, Mail, ArrowRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [overview, setOverview] = useState({ totalTasks: 0, completedTasks: 0, pendingTasks: 0 });
  const [overdueTasks, setOverdueTasks] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Modals & Banners
  const [showAddTask, setShowAddTask] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [dismissBanner, setDismissBanner] = useState(false); // New state to hide banner
  
  const [user, setUser] = useState(getUser());
  const pct = overview.totalTasks ? Math.round((overview.completedTasks / overview.totalTasks) * 100) : 0;

  const loadData = useCallback(async () => {
    try {
      setError(null);
      const [tRes, oRes] = await Promise.all([getTasks(), getOverview()]);
      setTasks(tRes.data); 
      setOverview(oRes.data);
      setOverdueTasks(tRes.data.filter(t => t.dueDate && new Date(t.dueDate) < new Date() && !t.completed).length);
    } catch (err) { 
      setError("Failed to load your tasks. Please check your connection."); 
    } finally { 
      setIsLoading(false); 
    }
  }, []);

  useEffect(() => {
    loadData();
    const openModal = () => setShowAddTask(true);
    const handleKeyDown = (e) => e.key === "Escape" && setShowAddTask(false);
    
    window.addEventListener("openAddTask", openModal); 
    document.addEventListener("keydown", handleKeyDown);
    
    return () => { 
      window.removeEventListener("openAddTask", openModal); 
      document.removeEventListener("keydown", handleKeyDown); 
    };
  }, [loadData]);

  const handleTaskAdded = (newTask) => {
    if (newTask) {
      setTasks(prev => [newTask, ...prev]);
      setOverview(prev => ({
        ...prev,
        totalTasks: prev.totalTasks + 1,
        pendingTasks: prev.pendingTasks + 1
      }));
    }
    setShowAddTask(false);
    loadData();
  };

  // Called when the OtpModal successfully verifies the code
  const handleVerificationSuccess = () => {
    const updatedUser = { ...user, emailVerified: true };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser)); 
    window.dispatchEvent(new Event("userUpdated"));
    setShowOtpModal(false);
  };

  const kpiCards = [
    { id: "ALL", label: "All Tasks", value: overview.totalTasks, icon: ListTodo, color: "text-indigo-400", bg: "bg-indigo-500/10", border: "border-indigo-500/20" },
    { id: "COMPLETED", label: "Completed", value: overview.completedTasks, icon: CheckCircle2, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20", radial: true },
    { id: "PENDING", label: "Pending", value: overview.pendingTasks, icon: Clock, color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20" },
    { id: "OVERDUE", label: "Overdue", value: overdueTasks, icon: AlertTriangle, color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/20" }
  ];

  if (isLoading) return <div className="flex min-h-[80vh] flex-col items-center justify-center gap-4 bg-[#030712] text-slate-400"><Loader2 className="h-8 w-8 animate-spin text-indigo-500" /><p className="text-sm font-medium tracking-wide">Loading tasks...</p></div>;

  return (
    <div className="min-h-screen bg-[#030712] px-4 pb-28 pt-24 sm:px-6 md:px-8 lg:pb-16 lg:pt-32">
      <div className="mx-auto max-w-[1400px]">
        
        <header className="mb-6 lg:mb-8">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Dashboard</h2>
          <p className="mt-1.5 text-sm text-slate-400">Keep track of your tasks and stay organized.</p>
        </header>

{/* Verification Banner */}
        <AnimatePresence>
          {user && !user.emailVerified && !dismissBanner && (
            <motion.div 
              initial={{ opacity: 0, height: 0, marginBottom: 0 }} 
              animate={{ opacity: 1, height: "auto", marginBottom: 32 }} 
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              className="overflow-hidden"
            >
              <div className="relative flex flex-col gap-4 rounded-3xl border border-indigo-500/20 bg-indigo-500/10 p-5 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between sm:p-6">
                
                {/* Dismiss Button - Vertically centered on desktop, top-right on mobile */}
                <button 
                  onClick={() => setDismissBanner(true)}
                  className="absolute right-3 top-4 flex items-center justify-center rounded-full p-1.5 text-indigo-400/60 transition-all hover:bg-indigo-500/20 hover:text-indigo-300 sm:right-4 sm:top-1/2 sm:-translate-y-1/2"
                  title="Dismiss banner"
                >
                  <X size={20} />
                </button>

                <div className="flex items-start gap-4 sm:items-center">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-indigo-500/20 bg-indigo-500/10 text-indigo-400">
                    <Mail size={24} strokeWidth={1.5} />
                  </div>
                  <div className="pr-8 sm:pr-0">
                    <h4 className="text-lg font-bold text-white">Enable Email Reminders</h4>
                    <p className="mt-1 text-sm text-slate-400">Verify your email to receive automatic task reminders before deadlines.</p>
                  </div>
                </div>
                
                {/* Notice the added sm:mr-10 here to create a "safe zone" away from the X button */}
                <button 
                  onClick={() => setShowOtpModal(true)}
                  className="group flex w-full cursor-pointer shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-slate-950 transition-all hover:bg-slate-200 active:scale-95 sm:w-auto sm:mr-10"
                >
                  Verify Email
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </button>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Dashboard Error Banner */}
        {error && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8 flex flex-col gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3"><AlertCircle size={18} className="shrink-0" /> <span className="font-medium">{error}</span></div>
            <button onClick={loadData} className="w-full cursor-pointer rounded-lg bg-red-500/20 px-4 py-2 font-semibold text-red-300 transition-colors hover:bg-red-500/30 sm:w-auto">Retry</button>
          </motion.div>
        )}

        {/* KPI Cards */}
        <div className="mb-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {kpiCards.map((c, i) => (
            <motion.div key={c.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.1 }} className="group relative flex flex-col justify-between overflow-hidden rounded-2xl sm:rounded-3xl border border-white/[0.05] bg-white/[0.02] p-4 transition-all hover:bg-white/[0.04] sm:p-5">
              <div className="flex w-full items-center justify-between">
                <div className="mb-2 flex items-center gap-2 sm:mb-4">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-lg border ${c.bg} ${c.border}`}>
                    <c.icon size={16} className={c.color} strokeWidth={2.5} />
                  </div>
                  <span className="hidden text-[0.65rem] font-bold uppercase tracking-widest text-slate-400 xl:inline-block">{c.label}</span>
                </div>
                {c.radial && (
                  <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full sm:flex" style={{ background: `conic-gradient(#10b981 ${pct * 3.6}deg, rgba(255,255,255,0.05) 0deg)` }}>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#030712] text-[0.55rem] font-bold text-slate-300">{pct}%</div>
                  </div>
                )}
              </div>
              <div>
                <span className="mb-1 block text-[0.6rem] font-bold uppercase tracking-widest text-slate-400 xl:hidden">{c.label}</span>
                <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">{c.value}</h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Task List */}
        <div className="rounded-3xl border border-white/[0.04] bg-white/[0.01] p-3 backdrop-blur-xl sm:p-6 md:p-8">
          <TaskList tasks={tasks} refresh={loadData} />
        </div>
      </div>

      <motion.button whileTap={{ scale: 0.9 }} onClick={() => setShowAddTask(true)} className="fixed bottom-6 right-6 z-[90] flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-white text-slate-950 shadow-[0_8px_30px_rgba(255,255,255,0.15)] transition-all hover:bg-slate-200 lg:hidden">
        <Plus size={24} strokeWidth={2.5} />
      </motion.button>

      <AnimatePresence>
        {showAddTask && (
          <div className="fixed inset-0 z-[100] flex flex-col justify-end sm:items-center sm:justify-center">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 cursor-pointer bg-[#030712]/80 backdrop-blur-sm" onClick={() => setShowAddTask(false)} />
            <motion.div initial={{ y: "100%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: "100%", opacity: 0 }} transition={{ type: "spring", damping: 25, stiffness: 200 }} className="relative w-full rounded-t-[2rem] border border-white/[0.08] bg-[#0a0e17] shadow-2xl sm:max-w-lg sm:rounded-3xl" onClick={e => e.stopPropagation()}>
              <div className="mx-auto mt-4 h-1.5 w-12 rounded-full bg-white/10 sm:hidden" />
              <TaskForm onTaskAdded={handleTaskAdded} onClose={() => setShowAddTask(false)} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <OtpModal 
        isOpen={showOtpModal} 
        onClose={() => setShowOtpModal(false)} 
        user={user} 
        onSuccess={handleVerificationSuccess} 
      />

    </div>
  );
}