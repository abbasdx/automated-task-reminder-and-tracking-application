import { useState } from "react";
import { addTask } from "../api/taskApi";
import { Plus, Type, AlignLeft, Calendar, Flag, Tag, AlertCircle, Loader2, X } from "lucide-react";

const baseCls = "peer h-12 w-full rounded-xl border border-white/[0.06] bg-white/[0.02] pl-11 text-sm font-medium text-slate-200 outline-none transition-all hover:bg-white/[0.04] focus:border-white/[0.1] focus:bg-white/[0.04] disabled:opacity-50";

const Field = ({ label, name, icon: Icon, type = "text", opts, span, value, onChange, loading }) => (
  <div className={`flex flex-col ${span ? "md:col-span-2" : ""}`}>
    <label htmlFor={name} className="mb-2 ml-1 text-[0.65rem] font-bold uppercase tracking-widest text-slate-500">{label}</label>
    <div className="relative flex items-center">
      <Icon size={16} className="absolute left-4 z-10 pointer-events-none text-slate-500 transition-colors peer-focus:text-white" />
      {opts ? (
        <select id={name} name={name} value={value} onChange={onChange} disabled={loading} className={`${baseCls} appearance-none pr-10 bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22%239ca3af%22%20viewBox%3D%220%200%2016%2016%22%3E%3Cpath%20d%3D%22M3.204%205.5%208%2010.296%2012.796%205.5z%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[position:right_14px_center] bg-[length:14px]`}>
          {opts.map(o => <option key={o} value={o} className="bg-[#0f172a]">{o.charAt(0) + o.slice(1).toLowerCase()}</option>)}
        </select>
      ) : (
        <input 
          id={name} type={type} name={name} value={value} onChange={onChange} required={name === "title"} disabled={loading} 
          placeholder={name === "title" ? "e.g., Finalize presentation..." : name === "description" ? "Add notes or links..." : ""} 
          className={`${baseCls} pr-4 placeholder-slate-600 ${type === "datetime-local" ? "[color-scheme:dark]" : ""}`} 
        />
      )}
    </div>
  </div>
);

export default function TaskForm({ onTaskAdded, onClose }) {
  const [task, setTask] = useState({ title: "", description: "", dueDate: "", priority: "MEDIUM", category: "WORK" });
  const [loading, setLoading] = useState(false), [error, setError] = useState("");

  const handleChange = (e) => { setTask({ ...task, [e.target.name]: e.target.value }); setError(""); };
  
  const submit = async (e) => {
    e.preventDefault(); if (loading) return;
    try {
      setLoading(true); await addTask({ ...task, dueDate: task.dueDate ? `${task.dueDate}:00` : null });
      onTaskAdded(); setTask({ title: "", description: "", dueDate: "", priority: "MEDIUM", category: "WORK" });
      if (onClose) onClose();
    } catch (err) { setError(typeof err.response?.data === "string" ? err.response.data : "Failed to add task."); } 
    finally { setLoading(false); }
  };

  return (
    <form onSubmit={submit} className="flex w-full flex-col p-6 sm:p-8">
      <div className="mb-8 flex items-center justify-between border-b border-white/[0.06] pb-6">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-slate-300"><Plus size={24} strokeWidth={1.5} /></div>
          <div><h4 className="text-xl font-bold tracking-tight text-white">New Task</h4><p className="mt-1 text-sm text-slate-400">What needs to be done?</p></div>
        </div>
        {onClose && <button type="button" onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.04] text-slate-400 transition-colors hover:bg-white/[0.08] hover:text-white sm:hidden"><X size={18} /></button>}
      </div>

      {error && <div className="mb-6 flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-400"><AlertCircle size={16} className="shrink-0" /><span>{error}</span></div>}

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-6">
        <Field label="Task Title" name="title" icon={Type} span value={task.title} onChange={handleChange} loading={loading} />
        <Field label="Description (Optional)" name="description" icon={AlignLeft} span value={task.description} onChange={handleChange} loading={loading} />
        <Field label="Target Deadline" name="dueDate" icon={Calendar} type="datetime-local" span value={task.dueDate} onChange={handleChange} loading={loading} />
        <Field label="Priority" name="priority" icon={Flag} opts={["LOW", "MEDIUM", "HIGH"]} value={task.priority} onChange={handleChange} loading={loading} />
        <Field label="Category" name="category" icon={Tag} opts={["WORK", "PERSONAL", "STUDY", "HEALTH", "FINANCE", "SHOPPING", "OTHER"]} value={task.category} onChange={handleChange} loading={loading} />
      </div>

      <div className="mt-10 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        {onClose && <button type="button" onClick={onClose} disabled={loading} className="flex w-full items-center justify-center rounded-xl px-6 py-3.5 text-sm font-bold text-slate-400 transition-colors hover:bg-white/[0.04] hover:text-white disabled:opacity-50 sm:w-auto">Cancel</button>}
        <button type="submit" disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-xl bg-white px-8 py-3.5 text-sm font-bold text-slate-950 transition-all hover:bg-slate-200 active:scale-95 disabled:pointer-events-none disabled:opacity-70 sm:w-auto">
          {loading ? <><Loader2 size={16} className="animate-spin" /> Saving...</> : "Create Task"}
        </button>
      </div>
    </form>
  );
}