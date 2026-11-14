"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function AdminLoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // The login credentials
    if (username === "admin" && password === "luxury2024") {
      // Save the NEW key
      localStorage.setItem("ma_admin_logged_in", "true");
      // Push straight to products
      router.push("/admin/products");
    } else {
      setError("Invalid username or password.");
    }
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-5">
      <div>
        <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.15em] text-ink/60" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
          Username
        </label>
        <input 
          value={username} onChange={e => setUsername(e.target.value)} 
          type="text" placeholder="Enter username" 
          className="w-full rounded-md border border-ink/20 bg-[#FAF7FE] px-4 py-3.5 text-[14px] text-ink outline-none transition-colors focus:border-brand-700" 
          required
        />
      </div>
      
      <div>
        <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.15em] text-ink/60" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
          Password
        </label>
        <input 
          value={password} onChange={e => setPassword(e.target.value)} 
          type="password" placeholder="Enter password" 
          className="w-full rounded-md border border-ink/20 bg-[#FAF7FE] px-4 py-3.5 text-[14px] text-ink outline-none transition-colors focus:border-brand-700" 
          required
        />
      </div>

      {error && <p className="text-[12px] text-red-600 font-medium text-center">{error}</p>}

      <button 
        type="submit" 
        className="mt-2 w-full rounded-full bg-brand-700 py-4 text-center text-[11px] font-bold uppercase tracking-[0.15em] text-white transition-all hover:bg-brand-900"
        style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
      >
        Sign In
      </button>
    </form>
  );
}
