import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { ArrowRight, FileText, Lock, ShieldCheck, Truck, Upload, X, Check } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Reveal } from "@/components/site/Reveal";
import { useCart, cartTotal, clearCart, CONSULT_URL } from "@/lib/cart";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout · Meri Sehat" },
      { name: "description", content: "Complete your Tirzee order and upload your prescription." },
    ],
  }),
  component: CheckoutPage,
});

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  notes: string;
};

function CheckoutPage() {
  const items = useCart();
  const total = cartTotal(items);
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<FormState>({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    notes: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const onField = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    if (f && f.size > 10 * 1024 * 1024) {
      setError("Prescription file must be 10MB or smaller.");
      return;
    }
    setError(null);
    setFile(f);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (items.length === 0) {
      setError("Your cart is empty.");
      return;
    }
    if (!form.fullName.trim() || !form.email.trim() || !form.phone.trim() || !form.address.trim() || !form.city.trim()) {
      setError("Please fill in all required fields.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!file) {
      setError("Please upload your Tirzee prescription. Don't have one? Consult a doctor first.");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      clearCart();
      setSubmitting(false);
      setSuccess(true);
    }, 900);
  };

  if (success) {
    return (
      <main className="bg-background text-foreground antialiased min-h-screen">
        <Nav />
        <section className="pt-28 md:pt-36 pb-20">
          <div className="mx-auto max-w-2xl px-5 md:px-8 text-center">
            <Reveal>
              <div className="mx-auto w-16 h-16 rounded-full bg-forest text-cream flex items-center justify-center">
                <Check size={28} />
              </div>
              <h1 className="mt-6 font-serif text-5xl md:text-6xl text-forest-deep leading-[1.02]">
                Order received.
              </h1>
              <p className="mt-5 text-foreground/75">
                Thank you, {form.fullName.split(" ")[0] || "friend"}. Our team will verify your
                prescription and reach out within 24 hours with delivery confirmation.
              </p>
              <Link
                to="/"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-forest text-cream px-7 py-3.5 text-sm font-medium hover:bg-forest-deep transition-colors"
              >
                Back to home <ArrowRight size={16} />
              </Link>
            </Reveal>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="bg-background text-foreground antialiased min-h-screen">
      <Nav />
      <section className="pt-28 md:pt-36 pb-20">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.22em] text-forest/70">Checkout</p>
            <h1 className="mt-3 font-serif text-5xl md:text-6xl text-forest-deep leading-[1.02]">
              Almost there.
            </h1>
            <p className="mt-3 text-foreground/70 max-w-xl">
              Tirzee requires a valid prescription. Please upload it below — we'll verify it
              before dispatching your order.
            </p>
          </Reveal>

          <form onSubmit={submit} className="mt-12 grid lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 space-y-6">
              <Reveal>
                <fieldset className="rounded-3xl border border-border bg-card p-6 md:p-7">
                  <legend className="px-2 text-xs uppercase tracking-[0.18em] text-forest">
                    Contact & delivery
                  </legend>
                  <div className="grid sm:grid-cols-2 gap-4 mt-3">
                    <Field label="Full name *" value={form.fullName} onChange={onField("fullName")} />
                    <Field label="Phone *" value={form.phone} onChange={onField("phone")} type="tel" />
                    <Field
                      label="Email *"
                      value={form.email}
                      onChange={onField("email")}
                      type="email"
                      className="sm:col-span-2"
                    />
                    <Field
                      label="Delivery address *"
                      value={form.address}
                      onChange={onField("address")}
                      className="sm:col-span-2"
                    />
                    <Field label="City *" value={form.city} onChange={onField("city")} />
                  </div>
                  <label className="block mt-4">
                    <span className="text-xs text-muted-foreground">Order notes</span>
                    <textarea
                      value={form.notes}
                      onChange={onField("notes")}
                      rows={3}
                      maxLength={500}
                      className="mt-1 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:border-forest/50 transition-colors"
                    />
                  </label>
                </fieldset>
              </Reveal>

              <Reveal delay={0.05}>
                <fieldset className="rounded-3xl border border-border bg-card p-6 md:p-7">
                  <legend className="px-2 text-xs uppercase tracking-[0.18em] text-forest">
                    Prescription
                  </legend>
                  <p className="mt-3 text-sm text-foreground/75">
                    Upload a clear photo or PDF of your Tirzee prescription. Issued by a
                    PMC-registered physician.
                  </p>

                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={onFile}
                    className="hidden"
                  />

                  {!file ? (
                    <button
                      type="button"
                      onClick={() => fileRef.current?.click()}
                      className="mt-4 w-full flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border bg-background p-8 hover:border-forest/50 transition-colors"
                    >
                      <Upload size={22} className="text-forest" />
                      <span className="text-sm font-medium text-forest-deep">
                        Click to upload prescription
                      </span>
                      <span className="text-xs text-muted-foreground">
                        JPG, PNG or PDF · up to 10MB
                      </span>
                    </button>
                  ) : (
                    <div className="mt-4 flex items-center gap-3 rounded-2xl border border-border bg-background p-4">
                      <div className="w-10 h-10 rounded-lg bg-sage/30 flex items-center justify-center text-forest">
                        <FileText size={18} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-forest-deep truncate">{file.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {(file.size / 1024).toFixed(0)} KB
                        </div>
                      </div>
                      <button
                        type="button"
                        aria-label="Remove file"
                        onClick={() => setFile(null)}
                        className="p-2 text-muted-foreground hover:text-forest-deep"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  )}

                  <div className="mt-5 p-4 rounded-2xl bg-gold/10 border border-gold/30 text-sm">
                    <p className="text-forest-deep font-medium">Don't have a prescription?</p>
                    <p className="mt-1 text-foreground/75">
                      Speak to a licensed Pakistani doctor — it's free and most consultations
                      happen the same day.
                    </p>
                    <a
                      href={CONSULT_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-2 rounded-full bg-forest text-cream px-5 py-2.5 text-sm font-medium hover:bg-forest-deep transition-colors"
                    >
                      Consult a doctor now <ArrowRight size={14} />
                    </a>
                  </div>
                </fieldset>
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <aside className="rounded-3xl border border-border bg-card p-6 md:p-7 lg:sticky lg:top-28">
                <h2 className="font-serif text-2xl text-forest-deep">Order summary</h2>

                {items.length === 0 ? (
                  <div className="mt-5 text-sm text-muted-foreground">
                    Your cart is empty.{" "}
                    <Link to="/product/tirzee" className="underline text-forest-deep">
                      Shop Tirzee →
                    </Link>
                  </div>
                ) : (
                  <ul className="mt-5 space-y-3 text-sm">
                    {items.map((i) => (
                      <li key={i.id} className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-secondary shrink-0 flex items-center justify-center">
                          <img src={i.image} alt={i.name} className="w-full h-full object-contain p-1" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-forest-deep">{i.name}</div>
                          <div className="text-xs text-muted-foreground">Qty {i.qty}</div>
                        </div>
                        <div className="text-forest-deep font-medium">
                          PKR {(i.price * i.qty).toLocaleString()}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-5 border-t border-border pt-4 space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-foreground/70">Subtotal</span>
                    <span className="font-medium text-forest-deep">
                      PKR {total.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-foreground/70">Delivery</span>
                    <span className="font-medium text-forest-deep">Free</span>
                  </div>
                  <div className="border-t border-border pt-3 flex items-center justify-between">
                    <span className="text-foreground/80">Total</span>
                    <span className="font-serif text-2xl text-forest-deep">
                      PKR {total.toLocaleString()}
                    </span>
                  </div>
                </div>

                {error && (
                  <p className="mt-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl p-3">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-full bg-forest text-cream px-6 py-3.5 text-sm font-medium hover:bg-forest-deep transition-colors disabled:opacity-60"
                >
                  {submitting ? "Placing order…" : "Place order"} <ArrowRight size={16} />
                </button>

                <div className="mt-6 grid grid-cols-3 gap-3 text-[11px] text-foreground/70">
                  <div className="flex flex-col items-center text-center gap-1">
                    <Truck size={16} className="text-forest" /> 2–5 day delivery
                  </div>
                  <div className="flex flex-col items-center text-center gap-1">
                    <Lock size={16} className="text-forest" /> Private & discreet
                  </div>
                  <div className="flex flex-col items-center text-center gap-1">
                    <ShieldCheck size={16} className="text-forest" /> Verified Rx
                  </div>
                </div>
              </aside>
            </Reveal>
          </form>
        </div>
      </section>
    </main>
  );
}

function Field({
  label,
  className = "",
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string; className?: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="text-xs text-muted-foreground">{label}</span>
      <input
        {...rest}
        maxLength={rest.maxLength ?? 255}
        className="mt-1 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:border-forest/50 transition-colors"
      />
    </label>
  );
}
