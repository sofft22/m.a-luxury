import { AdminLoginForm } from "@/components/AdminLoginForm";

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FAF7FE] px-6">
      <div className="w-full max-w-md rounded-2xl border border-brand-100 bg-white p-8 md:p-10 shadow-xl shadow-brand-900/5">
        
        <div className="mb-8 text-center">
          <h1 className="text-[32px] font-normal text-ink tracking-[0.1em]" style={{ fontFamily: "var(--font-cormorant), serif" }}>
            M.A LUXURY
          </h1>
          <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-700" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
            Admin Portal
          </p>
        </div>

        <AdminLoginForm />

      </div>
    </div>
  );
}
