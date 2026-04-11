import { useState } from "react";
import { completeTask, incompleteTask, deleteTask, exportCsv, addAiTask, updateTask } from "../api/taskApi";
import { CheckCircle2, Trash2, Download, Plus, Sparkles, Clock, Flag, Folder, Loader2, Circle, ArrowUp, Pencil, X, Save } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function TaskList({ tasks, refresh }) {
  const [filter, setFilter] = useState({ status: "ALL", priority: "ALL", category: "ALL" });
  const [visibleCount, setVisibleCount] = useState(10);
  const [prompt, setPrompt] = useState("");
  const [loadingAi, setLoadingAi] = useState(false);

  // --- Inline Edit State ---
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  const handleAiCreate = async () => {
    if (!prompt.trim()) return;
    try {
      setLoadingAi(true); 
      await addAiTask(prompt); 
      setPrompt("");
      if (filter.status === "COMPLETED") setFilter({ ...filter, status: "ALL" });
      refresh();
    } catch (e) { 
      alert("Failed to orchestrate AI task"); 
    } finally { 
      setLoadingAi(false); 
    }
  };

  // --- Completion Toggle Handler ---
  const toggleCompletion = async (task) => {
    try {
      if (task.completed) {
        await incompleteTask(task.id);
      } else {
        await completeTask(task.id);
      }
      refresh(); // Refresh the list to reflect the new state
    } catch (error) {
      console.error("Failed to toggle task status", error);
    }
  };

  // --- Inline Edit Handlers ---
  const startEditing = (task) => {
    setEditingTaskId(task.id);
    setEditFormData({
      title: task.title || '',
      description: task.description || '',
      dueDate: task.dueDate ? new Date(task.dueDate).toISOString().slice(0, 16) : '',
      priority: task.priority || 'MEDIUM',
      category: task.category || 'WORK',
    });
  };

  const cancelEditing = () => {
    setEditingTaskId(null);
    setEditFormData({});
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({ ...prev, [name]: value }));
  };

  const saveEdit = async () => {
    setIsSaving(true);
    try {
      const payload = {
        ...editFormData,
        dueDate: editFormData.dueDate ? new Date(editFormData.dueDate).toISOString() : null
      };
      await updateTask(editingTaskId, payload);
      setEditingTaskId(null);
      refresh();
    } catch (error) {
      console.error("Failed to update task", error);
    } finally {
      setIsSaving(false);
    }
  };

  const filteredTasks = tasks.filter((t) => {
    const isOverdue = t.dueDate && new Date(t.dueDate) < new Date() && !t.completed;
    if (filter.status === "COMPLETED" && !t.completed) return false;
    if (filter.status === "PENDING" && t.completed) return false;
    if (filter.status === "OVERDUE" && !isOverdue) return false;
    if (filter.priority !== "ALL" && t.priority !== filter.priority) return false;
    if (filter.category !== "ALL" && t.category !== filter.category) return false;
    return true;
  }).slice().reverse().slice(0, visibleCount);

  const selectClasses = "h-10 appearance-none rounded-xl border border-white/[0.08] bg-[#0a0e17] px-3 pr-8 text-xs font-medium text-slate-200 outline-none transition-all hover:bg-white/[0.04] focus:border-indigo-500/50 sm:px-4 sm:pr-10 sm:text-sm bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22%239ca3af%22%20viewBox%3D%220%200%2016%2016%22%3E%3Cpath%20d%3D%22M3.204%205.5%208%2010.296%2012.796%205.5z%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[position:right_10px_center] sm:bg-[position:right_12px_center] bg-[length:12px] sm:bg-[length:14px]";
  const inputClasses = "w-full rounded-lg border border-white/[0.08] bg-white/[0.02] p-2 text-sm text-slate-200 outline-none transition-all placeholder:text-slate-600 focus:border-indigo-500/50 focus:bg-white/[0.04]";

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 lg:flex-row">
        <div className="relative flex w-full flex-1 items-center rounded-2xl border border-indigo-500/30 bg-gradient-to-r from-[#0a0e17] to-indigo-500/[0.02] p-1.5 shadow-[0_8px_30px_rgba(99,102,241,0.05)] transition-all focus-within:border-indigo-500/60 focus-within:ring-4 focus-within:ring-indigo-500/10">
          <div className="pl-3 pr-2 text-indigo-400">{loadingAi ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />}</div>
          <input type="text" placeholder="AI: 'Deploy backend by 8 PM'" value={prompt} onChange={e => setPrompt(e.target.value)} onKeyDown={e => e.key === "Enter" && handleAiCreate()} className="h-10 w-full bg-transparent pr-12 text-sm text-white placeholder-slate-500 outline-none sm:pr-0" disabled={loadingAi} />
          <button onClick={handleAiCreate} disabled={!prompt.trim() || loadingAi} className="absolute right-2 flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-600 text-white transition-all disabled:opacity-0 disabled:scale-75 sm:hidden"><ArrowUp size={16} strokeWidth={2.5} /></button>
          <button onClick={handleAiCreate} disabled={!prompt.trim() || loadingAi} className="hidden sm:flex h-10 items-center justify-center rounded-xl bg-indigo-600 px-5 text-sm font-bold text-white transition-all hover:bg-indigo-500 disabled:opacity-0 disabled:w-0 disabled:px-0 disabled:overflow-hidden">Generate</button>
        </div>
        <button onClick={() => window.dispatchEvent(new Event("openAddTask"))} className="hidden lg:flex h-[56px] shrink-0 items-center justify-center gap-2 rounded-2xl bg-white px-6 text-sm font-bold text-slate-950 transition-all hover:bg-slate-200 active:scale-95"><Plus size={18} /> Add Task</button>
      </div>

      <div className="flex flex-col gap-3 border-b border-white/[0.04] pb-5 sm:flex-row sm:items-center sm:justify-between sm:pb-6">
        <div className="w-full overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="flex w-max rounded-xl border border-white/[0.08] bg-[#0a0e17] p-1 sm:w-200px">
            {["ALL", "PENDING", "COMPLETED", "OVERDUE"].map((s) => (
              <button key={s} onClick={() => { setFilter({ ...filter, status: s }); setVisibleCount(10); }} className={`flex-none rounded-lg px-4 py-1.5 text-xs font-semibold transition-all ${filter.status === s ? "bg-white/[0.08] text-white shadow-sm" : "text-slate-500 hover:text-slate-300"}`}>{s.charAt(0) + s.slice(1).toLowerCase()}</button>
            ))}
          </div>
        </div>
        <div className="flex w-full items-center gap-2 sm:w-auto sm:gap-3">
          <select className={`${selectClasses} flex-1 sm:flex-none`} value={filter.priority} onChange={e => setFilter({...filter, priority: e.target.value})}>
            <option value="ALL">Priority: All</option><option value="HIGH">High</option><option value="MEDIUM">Medium</option><option value="LOW">Low</option>
          </select>
          <select className={`${selectClasses} flex-1 sm:flex-none`} value={filter.category} onChange={e => setFilter({...filter, category: e.target.value})}>
            <option value="ALL">Category: All</option><option value="WORK">Work</option><option value="PERSONAL">Personal</option><option value="STUDY">Study</option><option value="HEALTH">Health</option><option value="FINANCE">Finance</option><option value="SHOPPING">Shopping</option><option value="OTHER">Other</option>
          </select>
          <button onClick={exportCsv} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.02] text-slate-400 transition-colors hover:bg-white/[0.06] hover:text-white" title="Export CSV"><Download size={16} /></button>
        </div>
      </div>

      {filteredTasks.length === 0 ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-12 text-center text-slate-500 sm:py-16">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.05] bg-white/[0.02] text-slate-600 sm:h-16 sm:w-16"><CheckCircle2 size={28} /></div>
          <p className="text-base font-semibold text-slate-300 sm:text-lg">{filter.status === "ALL" ? "No tasks yet." : `No ${filter.status.toLowerCase()} tasks.`}</p>
          <p className="mt-1 text-xs sm:text-sm">Use the command bar above to orchestrate new tasks.</p>
        </motion.div>
      ) : (
        <div className="flex flex-col gap-3">
          <AnimatePresence mode="popLayout">
            {filteredTasks.map((t) => {
              const isOverdue = t.dueDate && new Date(t.dueDate) < new Date() && !t.completed;
              const isEditing = editingTaskId === t.id;

              return (
                <motion.div 
                  layout 
                  initial={{ opacity: 0, scale: 0.98, y: 10 }} 
                  animate={{ opacity: 1, scale: 1, y: 0 }} 
                  exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }} 
                  transition={{ duration: 0.25 }} 
                  key={t.id} 
                  className={`group relative flex items-start gap-3 rounded-2xl border p-4 transition-all duration-300 sm:gap-4 sm:p-5 ${
                    isEditing ? "border-indigo-500/50 bg-[#0a0e17] shadow-[0_0_20px_rgba(99,102,241,0.1)]" :
                    t.completed ? "border-white/[0.02] bg-white/[0.01] items-center" : 
                    isOverdue ? "border-red-500/20 bg-gradient-to-r from-red-500/[0.05] to-transparent shadow-[inset_3px_0_0_rgba(239,68,68,0.5)] items-center" : 
                    "border-white/[0.06] bg-[#0a0e17]/60 hover:border-white/[0.12] hover:bg-white/[0.02] items-center"
                  }`}
                >
                  
                  {/* Status Toggle Button (Hidden while editing) */}
                  {!isEditing && (
                    <button 
                      onClick={() => toggleCompletion(t)} 
                      className={`mt-0.5 shrink-0 transition-all duration-300 sm:mt-0 ${
                        t.completed 
                          ? "text-emerald-500 hover:text-emerald-400 hover:scale-110" 
                          : "text-slate-600 hover:scale-110 hover:text-emerald-400"
                      }`}
                    >
                      {t.completed ? <CheckCircle2 size={22} strokeWidth={2.5} /> : <Circle size={22} strokeWidth={2} />}
                    </button>
                  )}

                  <div className="flex min-w-0 flex-1 flex-col sm:pr-0">
                    
                    {/* INLINE EDIT MODE */}
                    {isEditing ? (
                      <div className="flex flex-col gap-3">
                        <input type="text" name="title" value={editFormData.title} onChange={handleEditChange} placeholder="Task title" className={`${inputClasses} font-semibold text-white`} autoFocus />
                        <textarea name="description" value={editFormData.description} onChange={handleEditChange} placeholder="Description (optional)" rows={2} className={`${inputClasses} resize-none`} />
                        
                        <div className="flex flex-wrap gap-3">
                          <div className="flex-1 min-w-[140px]">
                            <label className="mb-1 block text-[0.65rem] font-bold uppercase tracking-wider text-slate-500">Due Date</label>
                            <input type="datetime-local" name="dueDate" value={editFormData.dueDate} onChange={handleEditChange} className={inputClasses} style={{ colorScheme: 'dark' }} />
                          </div>
                          <div className="flex-1 min-w-[120px]">
                            <label className="mb-1 block text-[0.65rem] font-bold uppercase tracking-wider text-slate-500">Priority</label>
                            <select name="priority" value={editFormData.priority} onChange={handleEditChange} className={inputClasses}>
                              <option value="LOW">Low</option><option value="MEDIUM">Medium</option><option value="HIGH">High</option>
                            </select>
                          </div>
                          <div className="flex-1 min-w-[120px]">
                            <label className="mb-1 block text-[0.65rem] font-bold uppercase tracking-wider text-slate-500">Category</label>
                            <select name="category" value={editFormData.category} onChange={handleEditChange} className={inputClasses}>
                              <option value="WORK">Work</option><option value="PERSONAL">Personal</option><option value="STUDY">Study</option><option value="HEALTH">Health</option><option value="FINANCE">Finance</option><option value="SHOPPING">Shopping</option><option value="OTHER">Other</option>
                            </select>
                          </div>
                        </div>

                        <div className="mt-2 flex justify-end gap-2">
                          <button onClick={cancelEditing} disabled={isSaving} className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-400 transition-colors hover:bg-white/[0.04] hover:text-slate-200">
                            <X size={14} /> Cancel
                          </button>
                          <button onClick={saveEdit} disabled={isSaving} className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-1.5 text-xs font-bold text-white transition-all hover:bg-indigo-500 disabled:opacity-50">
                            {isSaving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} Save
                          </button>
                        </div>
                      </div>

                    // DISPLAY MODE
                    ) : (
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pr-16 sm:pr-0">
                        <div className="flex flex-col sm:pr-4">
                          <h6 className={`text-sm font-semibold transition-all duration-300 ${t.completed ? "text-slate-500 line-through decoration-slate-600" : "text-slate-100"}`}>{t.title}</h6>
                          {t.description && <p className={`mt-1 line-clamp-2 text-xs sm:text-sm ${t.completed ? "text-slate-600" : "text-slate-400"}`}>{t.description}</p>}
                          <div className="mt-2.5 flex flex-wrap items-center gap-1.5 text-[0.6rem] font-bold uppercase tracking-wider sm:gap-2 sm:text-[0.65rem]">
                            {isOverdue && <span className="rounded bg-red-500/10 px-1.5 py-0.5 border border-red-500/20 text-red-400 sm:px-2">Overdue</span>}
                            {t.dueDate && <span className={`flex items-center gap-1 ${t.completed ? 'text-slate-600' : isOverdue ? 'text-red-400' : 'text-indigo-400'}`}><Clock size={10} /> {new Date(t.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>}
                            {t.priority && <span className={`flex items-center gap-1 ${t.completed ? 'text-slate-600' : t.priority === 'HIGH' ? 'text-red-400' : t.priority === 'MEDIUM' ? 'text-amber-400' : 'text-emerald-400'}`}><Flag size={10} /> {t.priority}</span>}
                            {t.category && <span className={`flex items-center gap-1 ${t.completed ? 'text-slate-600' : 'text-slate-400'}`}><Folder size={10} /> {t.category}</span>}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons (Hidden while editing) */}
                  {!isEditing && (
                    <div className="absolute right-3 top-3 flex items-center gap-1 sm:relative sm:right-auto sm:top-auto sm:gap-2">
                      {!t.completed && (
                        <button onClick={() => startEditing(t)} className="flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.04] text-slate-500 transition-all hover:bg-indigo-500/10 hover:text-indigo-400 sm:rounded-lg sm:bg-transparent sm:text-slate-600 sm:opacity-0 sm:group-hover:opacity-100" title="Edit Task">
                          <Pencil size={14} />
                        </button>
                      )}
                      <button onClick={() => deleteTask(t.id).then(refresh)} className="flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.04] text-slate-500 transition-all hover:bg-red-500/10 hover:text-red-400 sm:rounded-lg sm:bg-transparent sm:text-slate-600 sm:opacity-0 sm:group-hover:opacity-100" title="Delete Task">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  )}
                  
                </motion.div>
              );
            })}
          </AnimatePresence>
          {filteredTasks.length >= visibleCount && <button onClick={() => setVisibleCount(v => v + 10)} className="mt-3 rounded-xl border border-white/[0.04] bg-white/[0.01] py-3.5 text-sm font-semibold text-slate-400 transition-all hover:bg-white/[0.03] hover:text-slate-200 active:scale-[0.99]">Load Previous Tasks</button>}
        </div>
      )}
    </div>
  );
}