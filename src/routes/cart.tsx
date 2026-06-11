import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Reveal } from "@/components/site/Reveal";
import { useCart, updateQty, removeItem, cartTotal, CONSULT_URL } from "@/lib/cart";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart · Meri Sehat" },
      { name: "description", content: "Review the items in your Meri Sehat cart." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const items = useCart();
  const total = cartTotal(items);

  return (
    <main className="bg-background text-foreground antialiased min-h-screen">
      <Nav />
      <section className="pt-28 md:pt-36 pb-20">
        <div className="mx-auto max-w-5xl px-5 md:px-8">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.22em] text-forest/70">Your cart</p>
            <h1 className="mt-3 font-serif text-5xl md:text-6xl text-forest-deep leading-[1.02]">
              Review your order.
            </h1>
          </Reveal>

          {items.length === 0 ? (
            <Reveal delay={0.08}>
              <div className="mt-12 p-10 md:p-14 rounded-3xl border border-border bg-card text-center">
                <ShoppingBag size={32} className="mx-auto text-forest" />
                <h2 className="mt-4 font-serif text-2xl text-forest-deep">Your cart is empty</h2>
                <p className="mt-2 text-sm text-foreground/70 max-w-md mx-auto">
                  Add Tirzee to your cart to get started, or speak to a doctor if you don't yet
                  have a prescription.
                </p>
                <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                  <Link
                    to="/product/tirzee"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-forest text-cream px-6 py-3 text-sm font-medium hover:bg-forest-deep transition-colors"
                  >
                    Shop Tirzee <ArrowRight size={14} />
                  </Link>
                  <a
                    href={CONSULT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-medium text-forest-deep hover:border-forest/40 transition-colors"
                  >
                    Consult a doctor
                  </a>
                </div>
              </div>
            </Reveal>
          ) : (
            <div className="mt-12 grid lg:grid-cols-3 gap-8 items-start">
              <div className="lg:col-span-2 space-y-4">
                {items.map((item) => (
                  <Reveal key={item.id}>
                    <article className="flex gap-5 p-5 md:p-6 rounded-2xl border border-border bg-card">
                      <div className="w-24 h-24 md:w-28 md:h-28 rounded-xl overflow-hidden bg-secondary shrink-0 flex items-center justify-center">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-contain p-2"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="font-serif text-2xl text-forest-deep">{item.name}</h3>
                            {item.variant && (
                              <p className="text-xs text-muted-foreground mt-0.5">{item.variant}</p>
                            )}
                          </div>
                          <button
                            aria-label="Remove"
                            onClick={() => removeItem(item.id)}
                            className="p-2 text-muted-foreground hover:text-forest-deep transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <div className="mt-4 flex items-center justify-between gap-3 flex-wrap">
                          <div className="inline-flex items-center rounded-full border border-border bg-background">
                            <button
                              aria-label="Decrease"
                              onClick={() => updateQty(item.id, item.qty - 1)}
                              className="p-2.5 text-forest-deep hover:bg-secondary rounded-l-full"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="px-3 text-sm font-medium w-9 text-center">{item.qty}</span>
                            <button
                              aria-label="Increase"
                              onClick={() => updateQty(item.id, item.qty + 1)}
                              className="p-2.5 text-forest-deep hover:bg-secondary rounded-r-full"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <div className="font-serif text-xl text-forest-deep">
                            PKR {(item.price * item.qty).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </article>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={0.1}>
                <aside className="rounded-3xl border border-border bg-card p-6 md:p-7 lg:sticky lg:top-28">
                  <h2 className="font-serif text-2xl text-forest-deep">Order summary</h2>
                  <div className="mt-5 space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-foreground/70">Subtotal</span>
                      <span className="font-medium text-forest-deep">PKR {total.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-foreground/70">Delivery</span>
                      <span className="font-medium text-forest-deep">Calculated at checkout</span>
                    </div>
                    <div className="border-t border-border pt-3 flex items-center justify-between">
                      <span className="text-foreground/80">Total</span>
                      <span className="font-serif text-2xl text-forest-deep">
                        PKR {total.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <Link
                    to="/checkout"
                    className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-full bg-forest text-cream px-6 py-3.5 text-sm font-medium hover:bg-forest-deep transition-colors"
                  >
                    Checkout <ArrowRight size={16} />
                  </Link>
                  <p className="mt-4 text-xs text-muted-foreground">
                    Tirzee requires a valid prescription. You'll upload it at checkout.
                  </p>
                  <a
                    href={CONSULT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 block text-center text-xs text-forest-deep underline underline-offset-4 hover:text-forest"
                  >
                    Need a prescription? Consult a doctor →
                  </a>
                </aside>
              </Reveal>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
