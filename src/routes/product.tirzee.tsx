import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Check, ShieldCheck, ShoppingBag, Truck, Lock, Minus, Plus } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Reveal } from "@/components/site/Reveal";
import prodTirzee from "@/assets/prod-tirzee.png";
import bgTirzee from "@/assets/bg-tirzee.png";
import { addToCart, removeItem, useCart, CONSULT_URL, TIRZEE_PRODUCT } from "@/lib/cart";

export const Route = createFileRoute("/product/tirzee")({
  head: () => ({
    meta: [
      { title: "Tirzee (Tirzepatide) — Order Online · Meri Sehat" },
      {
        name: "description",
        content:
          "Order Tirzee (tirzepatide) online in Pakistan. Prescription required — upload at checkout or consult a doctor first.",
      },
    ],
  }),
  component: ProductPage,
});

function ProductPage() {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(
      {
        id: TIRZEE_PRODUCT.id,
        name: TIRZEE_PRODUCT.name,
        variant: TIRZEE_PRODUCT.variant,
        price: TIRZEE_PRODUCT.price,
        image: prodTirzee,
      },
      qty,
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const bullets = [
    "Once-weekly self-injection (pre-filled pen)",
    "Dual-action: targets GLP-1 + GIP receptors",
    "Same active molecule as Mounjaro®",
    "Ongoing doctor support included",
    "Discreet home delivery in 2–5 business days",
  ];

  return (
    <main className="bg-background text-foreground antialiased min-h-screen">
      <Nav />
      <section className="pt-28 md:pt-36 pb-16 md:pb-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <Reveal>
            <nav className="text-xs text-muted-foreground mb-8">
              <Link to="/" className="hover:text-forest-deep">Home</Link>
              <span className="mx-2">/</span>
              <span className="text-forest-deep">Tirzee</span>
            </nav>
          </Reveal>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <Reveal>
              <div
                className="relative aspect-square rounded-3xl overflow-hidden bg-cover bg-center shadow-card"
                style={{ backgroundImage: `url(${bgTirzee})` }}
              >
                <img
                  src={prodTirzee}
                  alt="Tirzee tirzepatide pen"
                  className="absolute bottom-0 right-0 w-[78%] h-[88%] object-contain object-bottom-right"
                />
                <span className="absolute top-5 right-5 inline-flex items-center justify-center w-10 h-10 rounded-full bg-forest text-cream text-[10px] font-medium tracking-wider">
                  Rx
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-gold">
                  Prescription medication
                </p>
                <h1 className="mt-3 font-serif text-5xl md:text-6xl text-forest-deep leading-[1.02]">
                  Tirzee
                </h1>
                <p className="mt-2 text-muted-foreground">{TIRZEE_PRODUCT.variant}</p>

                <div className="mt-6 flex items-baseline gap-3">
                  <span className="font-serif text-4xl text-forest-deep">
                    PKR {TIRZEE_PRODUCT.price.toLocaleString()}
                  </span>
                  <span className="text-sm text-muted-foreground">per pen</span>
                </div>

                <p className="mt-6 text-foreground/75 text-[15px] leading-relaxed max-w-xl">
                  Tirzee (tirzepatide) is a next-generation GLP-1 + GIP receptor agonist for
                  medically supervised weight management. It works with your biology — reducing
                  appetite, slowing digestion, and improving blood sugar regulation.
                </p>

                <ul className="mt-6 space-y-2.5">
                  {bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-sm text-foreground/85">
                      <Check size={16} className="text-forest mt-0.5 shrink-0" /> {b}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex items-center gap-5">
                  <div className="inline-flex items-center rounded-full border border-border bg-card">
                    <button
                      aria-label="Decrease"
                      onClick={() => setQty(Math.max(1, qty - 1))}
                      className="p-3 text-forest-deep hover:bg-secondary rounded-l-full transition-colors"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="px-4 text-sm font-medium w-10 text-center">{qty}</span>
                    <button
                      aria-label="Increase"
                      onClick={() => setQty(qty + 1)}
                      className="p-3 text-forest-deep hover:bg-secondary rounded-r-full transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <button
                    onClick={handleAdd}
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-forest text-cream px-7 py-4 text-sm font-medium hover:bg-forest-deep transition-all shadow-soft hover:-translate-y-0.5"
                  >
                    <ShoppingBag size={16} />
                    {added ? "Added to cart" : "Add to cart"}
                  </button>
                </div>

                <Link
                  to="/cart"
                  className="mt-3 block text-center text-sm text-forest-deep underline underline-offset-4 hover:text-forest"
                >
                  Go to cart →
                </Link>

                <div className="mt-7 p-5 rounded-2xl bg-gold/10 border border-gold/30">
                  <p className="text-sm text-forest-deep font-medium">
                    Tirzee requires a valid prescription.
                  </p>
                  <p className="mt-1 text-sm text-foreground/75">
                    You'll be asked to upload your prescription at checkout. Don't have one?
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

                <div className="mt-7 grid grid-cols-3 gap-4 text-xs text-foreground/70">
                  <div className="flex flex-col items-center text-center gap-1.5">
                    <Truck size={18} className="text-forest" /> Home delivery 2–5 days
                  </div>
                  <div className="flex flex-col items-center text-center gap-1.5">
                    <Lock size={18} className="text-forest" /> Discreet packaging
                  </div>
                  <div className="flex flex-col items-center text-center gap-1.5">
                    <ShieldCheck size={18} className="text-forest" /> Licensed pharmacy
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
