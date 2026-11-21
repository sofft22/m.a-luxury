import dynamic from "next/dynamic";

// This tells Next.js to ONLY load this component in the browser (client-side)
const CheckoutContent = dynamic(() => import("./CheckoutContent"), { 
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-[#FAF7FE] flex items-center justify-center">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-brand-200 border-t-brand-700" />
    </div>
  )
});

export default function CheckoutPage() {
  return <CheckoutContent />;
}
