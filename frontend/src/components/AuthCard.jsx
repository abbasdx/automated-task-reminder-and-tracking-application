import { useState } from "react";
import { login, register, saveAuth } from "../api/taskApi";
import { Mail, Lock, User, AlertCircle, Loader2, ArrowRight } from "lucide-react";

const Input = ({ icon: Icon, show = true, ...p }) => show && (
  <div className="relative flex items-center"><Icon size={18} className="absolute left-4 text-slate-500" />
    <input {...p} required className="w-full rounded-xl border border-white/[0.06] bg-[#030712] py-3.5 pl-11 pr-4 text-sm text-slate-200 outline-none transition-all focus:border-indigo-500/50" />
  </div>
);

export default function AuthCard() {
  const [isLogin, setIsLogin] = useState(true), [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" }), [error, setError] = useState("");

  const handleChange = (e) => { setForm({ ...form, [e.target.name]: e.target.value }); setError(""); };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLogin && form.password !== form.confirm) return setError("Passwords do not match");
    setLoading(true);
    try {
      saveAuth((await (isLogin ? login : register)(form)).data);
      window.location.href = "/dashboard";
    } catch (err) { setError(typeof err.response?.data === "string" ? err.response.data : "Authentication failed.");
    } finally { setLoading(false); }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#030712] px-5 py-12">
      <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[400px] w-full max-w-[800px] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-[120px]" />
      <div className="w-full max-w-[420px] rounded-[2rem] border border-white/[0.05] bg-[#0a0e17]/80 p-8 shadow-2xl backdrop-blur-xl sm:p-10">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">{isLogin ? "Welcome Back" : "Create Account"}</h2>
          <p className="mt-2 text-sm text-slate-400">{isLogin ? "Sign in to access your workspace." : "Start organizing your life today."}</p>
        </div>
        {error && <div className="mb-6 flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-3.5 text-sm font-medium text-red-400"><AlertCircle size={16} className="shrink-0" /> <span>{error}</span></div>}
        
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <Input show={!isLogin} icon={User} type="text" name="name" placeholder="Full Name" value={form.name} onChange={handleChange} disabled={loading} />
          <Input icon={Mail} type="email" name="email" placeholder="Email address" value={form.email} onChange={handleChange} disabled={loading} />
          <Input icon={Lock} type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} disabled={loading} />
          <Input show={!isLogin} icon={Lock} type="password" name="confirm" placeholder="Confirm Password" value={form.confirm} onChange={handleChange} disabled={loading} />
          <button disabled={loading} className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3.5 text-sm font-bold text-slate-950 transition-all hover:bg-slate-200 active:scale-95 disabled:opacity-50">
            {loading ? <Loader2 size={18} className="animate-spin" /> : <>{isLogin ? "Sign In" : "Create Account"} <ArrowRight size={16} /></>}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-slate-400">
          <button type="button" onClick={() => { setIsLogin(!isLogin); setError(""); setForm({ name: "", email: "", password: "", confirm: "" }); }} className="font-medium text-slate-400 transition-colors hover:text-white">
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Login"}
          </button>
        </div>
      </div>
    </div>
  );
}