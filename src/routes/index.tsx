import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Video,
  FileText,
  Package,
  Brain,
  Soup,
  Droplets,
  Stethoscope,
  ShieldCheck,
  Lock,
  Truck,
  Sparkles,
  MessageCircle,
  Star,
  Plus,
  Minus,
  ShoppingBag,
} from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Reveal } from "@/components/site/Reveal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import heroWoman from "@/assets/hero-woman.jpg";
import logo from "@/assets/logo.svg";
import painWoman from "@/assets/pain-woman.jpg";
import doctor1 from "@/assets/doctor-1.jpg";
import doctor2 from "@/assets/doctor-2.jpg";
import life1 from "@/assets/life-1.jpg";
import life2 from "@/assets/life-2.jpg";
import life3 from "@/assets/life-3.jpg";
import prodTirzee from "@/assets/prod-tirzee.png";
import bgTirzee from "@/assets/bg-tirzee.png";
import { CONSULT_URL, TIRZEE_VARIANTS } from "@/lib/cart";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Meri Sehat — Tirzee (Tirzepatide) Weight Management in Pakistan" },
      {
        name: "description",
        content:
          "Tirzee (tirzepatide) — next-generation GLP-1 weight management prescribed by licensed Pakistani doctors and delivered to your door.",
      },
      { property: "og:title", content: "Meri Sehat — Tirzee Weight Management" },
      {
        property: "og:description",
        content:
          "Doctor-prescribed Tirzee (tirzepatide), delivered to your door across Pakistan.",
      },
    ],
  }),
  component: Landing,
});

function ConsultLink({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={CONSULT_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
}

/* ---------- HERO ---------- */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <section ref={ref} id="top" className="relative pt-28 md:pt-32 pb-20 md:pb-28 overflow-hidden">
      <div aria-hidden className="absolute inset-0 bg-grain pointer-events-none" />
      <div aria-hidden className="absolute -top-40 -right-40 w-[520px] h-[520px] rounded-full bg-gold/15 blur-3xl" />
      <div aria-hidden className="absolute -bottom-40 -left-40 w-[520px] h-[520px] rounded-full bg-sage/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8 grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 backdrop-blur px-3 py-1.5 text-xs text-foreground/70"
          >
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-forest animate-pulse" />
            Prescribed by Licensed Pakistani Doctors
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 font-serif text-[2.6rem] sm:text-6xl lg:text-7xl leading-[1.02] text-forest-deep text-balance"
          >
            You've tried everything.
            <span className="block italic text-forest/90">
              This time, science is on your side.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 max-w-xl text-lg text-foreground/75 text-pretty"
          >
            Tirzee — next-generation GLP-1 weight loss, prescribed by a licensed
            doctor and delivered to your door. Real results. Real medical support.
            All from home.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="mt-9 flex flex-col sm:flex-row gap-3 sm:items-center"
          >
            <ConsultLink className="group inline-flex items-center justify-center gap-2 rounded-full bg-forest text-cream px-7 py-4 text-base font-medium hover:bg-forest-deep transition-all shadow-soft hover:shadow-card hover:-translate-y-0.5">
              Consult Now — It's Free
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </ConsultLink>
            <a
              href="#how"
              className="inline-flex items-center justify-center gap-2 px-5 py-4 text-sm text-forest-deep hover:text-forest transition-colors"
            >
              See how it works
              <ChevronDown size={16} />
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-3 text-xs text-muted-foreground"
          >
            Already have a prescription? Order Tirzee directly.
          </motion.p>

          <Reveal delay={0.4} className="mt-10 md:mt-14">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-4">
              {[
                { Icon: Stethoscope, t: "Licensed PK Doctors" },
                { Icon: ShieldCheck, t: "FDA-Approved Meds" },
                { Icon: Truck, t: "Home Delivery 2–5 Days" },
                { Icon: Lock, t: "100% Confidential" },
              ].map(({ Icon, t }) => (
                <div key={t} className="flex items-center gap-2 text-xs sm:text-sm text-foreground/70">
                  <Icon size={16} className="text-forest" />
                  {t}
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-secondary shadow-card">
              <motion.img
                src={heroWoman}
                alt="Confident Pakistani woman walking outdoors"
                width={1024}
                height={1280}
                style={{ y, scale }}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-forest-deep/30 via-transparent to-transparent" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20, x: -10 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ duration: 0.9, delay: 0.6 }}
              className="absolute -left-4 sm:-left-10 bottom-12 bg-card/95 backdrop-blur rounded-2xl p-4 shadow-card border border-border max-w-[230px]"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-sage/30 flex items-center justify-center">
                  <Sparkles size={18} className="text-forest" />
                </div>
                <div>
                  <div className="text-sm font-medium text-forest-deep">Lost 14 kg</div>
                  <div className="text-xs text-muted-foreground">Ayesha · Lahore</div>
                </div>
              </div>
              <div className="mt-3 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={12} className="fill-gold text-gold" />
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20, x: 10 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ duration: 0.9, delay: 0.75 }}
              className="absolute -right-3 sm:-right-8 top-10 bg-card/95 backdrop-blur rounded-2xl p-4 shadow-card border border-border"
            >
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="inline-block w-2 h-2 rounded-full bg-forest animate-pulse" />
                Doctors available today
              </div>
              <div className="mt-1 text-sm font-medium text-forest-deep">Consult in &lt; 24h</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------- PAIN VALIDATION ---------- */
function Pain() {
  const items = [
    { icon: "🍽️", t: "I eat less than my friends but gain more weight" },
    { icon: "😴", t: "I'm always tired, even when I sleep enough" },
    { icon: "🔁", t: "I lose weight, then gain it all back" },
    { icon: "😞", t: "I've tried every diet. Nothing sticks." },
    { icon: "💊", t: "I don't want to live on supplements forever" },
    { icon: "🪞", t: "I avoid mirrors and photos of myself" },
  ];
  return (
    <section className="relative py-24 md:py-32 bg-secondary/40">
      <div className="mx-auto max-w-7xl px-5 md:px-8 grid lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-5 lg:sticky lg:top-28">
          <Reveal>
            <span className="text-xs uppercase tracking-[0.2em] text-forest/70">A real conversation</span>
            <h2 className="mt-3 font-serif text-4xl md:text-5xl text-forest-deep text-balance leading-[1.05]">
              Weight loss isn't about willpower. Your body has been working against you.
            </h2>
            <p className="mt-5 text-foreground/70 text-pretty">
              Millions fail at diets not because they lack discipline — but because hunger hormones,
              slow metabolism, and insulin resistance are biological forces no meal plan can overcome
              alone.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-8 aspect-[4/5] rounded-3xl overflow-hidden shadow-card max-w-md">
              <img src={painWoman} alt="" loading="lazy" width={1024} height={1280} className="w-full h-full object-cover" />
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal>
            <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground mb-5">
              Sound familiar?
            </p>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-4">
            {items.map((it, i) => (
              <Reveal key={it.t} delay={i * 0.06}>
                <div className="group h-full p-5 md:p-6 rounded-2xl bg-card border border-border hover:border-forest/30 transition-all hover:-translate-y-1 hover:shadow-soft">
                  <div className="text-2xl mb-3">{it.icon}</div>
                  <p className="text-foreground/85 leading-snug">{it.t}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.3}>
            <div className="mt-8 p-6 md:p-7 rounded-2xl bg-forest text-cream">
              <p className="font-serif text-xl md:text-2xl leading-snug text-balance">
                If any of these sound like you — you're not failing. Your biology is.
              </p>
              <p className="mt-3 text-cream/80 text-sm">
                Tirzee was developed to address the exact hormonal imbalances behind
                weight gain.
              </p>
              <ConsultLink className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-gold hover:text-cream transition-colors">
                Find out if you're eligible <ArrowRight size={16} />
              </ConsultLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- SCIENCE ---------- */
function Science() {
  const cols = [
    { Icon: Brain, t: "Reduces Hunger Signals", d: "Tirzee tells your brain you're full — faster, longer." },
    { Icon: Soup, t: "Slows Digestion", d: "Food moves slowly, reducing cravings between meals." },
    { Icon: Droplets, t: "Balances Blood Sugar", d: "Stabilizes energy and reduces fat storage triggers." },
  ];
  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.22em] text-forest/70 text-center">
            The science behind your results
          </p>
          <h2 className="mt-4 text-center font-serif text-4xl md:text-6xl text-forest-deep text-balance leading-[1.05]">
            GLP-1 + GIP: the hormones <span className="italic">your body</span> was missing.
          </h2>
          <p className="mt-5 max-w-2xl mx-auto text-center text-foreground/70">
            Tirzee (tirzepatide) is a dual-action medication that targets both GLP-1 and GIP
            receptors — controlling hunger, slowing digestion, and regulating blood sugar.
            It works with your biology, not against it.
          </p>
        </Reveal>

        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {cols.map(({ Icon, t, d }, i) => (
            <Reveal key={t} delay={i * 0.1}>
              <div className="h-full rounded-3xl border border-border bg-card p-7 hover:border-gold/50 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-sage/25 flex items-center justify-center text-forest">
                  <Icon size={22} />
                </div>
                <h3 className="mt-5 font-serif text-2xl text-forest-deep">{t}</h3>
                <p className="mt-2 text-foreground/70 text-[15px] leading-relaxed">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <figure className="mt-20 max-w-4xl mx-auto text-center">
            <blockquote className="font-serif text-3xl md:text-4xl text-forest-deep leading-[1.15] text-balance">
              "Tirzepatide is the most clinically significant breakthrough in obesity
              treatment in 30 years."
            </blockquote>
            <figcaption className="mt-6 text-sm text-muted-foreground">
              — Dr. Aisha Qureshi, Internal Medicine · Meri Sehat Medical Panel
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- PRODUCT (TIRZEE) ---------- */
function ProductSection() {
  const fromPrice = Math.min(...TIRZEE_VARIANTS.map((v) => v.price));

  const bullets = [
    "Once-weekly injection",
    "Dual-action: GLP-1 + GIP receptors",
    "Same molecule as Mounjaro®",
    "Doctor-prescribed · home delivered",
  ];

  return (
    <section id="products" className="relative py-24 md:py-32 bg-secondary/40">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <div className="flex items-end justify-between flex-wrap gap-6">
            <div className="max-w-2xl">
              <p className="text-xs uppercase tracking-[0.22em] text-forest/70">
                Our medication
              </p>
              <h2 className="mt-3 font-serif text-4xl md:text-5xl text-forest-deep text-balance leading-[1.05]">
                Tirzee. <span className="italic">The next generation of GLP-1.</span>
              </h2>
            </div>
            <p className="text-foreground/70 max-w-sm">
              Tirzee requires a valid prescription. Already have one? Order directly.
              If not, consult one of our doctors first.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid lg:grid-cols-2 gap-8 items-stretch">
          <Reveal>
            <article className="group relative h-full rounded-3xl bg-card border border-border overflow-hidden hover:border-forest/40 transition-all duration-500 hover:shadow-card">
              <div
                className="relative aspect-[5/4] overflow-hidden bg-cover bg-center"
                style={{ backgroundImage: `url(${bgTirzee})` }}
              >
                <img
                  src={prodTirzee}
                  alt="Tirzee tirzepatide pen"
                  loading="lazy"
                  className="absolute bottom-0 right-0 w-[78%] h-[88%] object-contain object-bottom-right transition-transform duration-700 group-hover:scale-105 origin-bottom-right"
                />
                <span className="absolute top-4 right-4 inline-flex items-center justify-center w-9 h-9 rounded-full bg-forest text-cream text-[10px] font-medium tracking-wider">
                  Rx
                </span>
              </div>
            </article>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="h-full flex flex-col p-2 md:p-4">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-serif text-4xl text-forest-deep">Tirzee</h3>
                <span className="text-xs uppercase tracking-wider text-muted-foreground">
                  Tirzepatide
                </span>
              </div>
              <p className="mt-2 text-xs uppercase tracking-[0.16em] text-gold">
                Best for · Maximum results, dual-action
              </p>
              <p className="mt-4 text-foreground/75 text-[15px] leading-relaxed max-w-xl">
                Tirzepatide targets both GLP-1 and GIP receptors for superior outcomes
                versus single-action GLP-1 therapies. Once-weekly, doctor-prescribed,
                and delivered discreetly to your door.
              </p>
              <ul className="mt-5 space-y-2">
                {bullets.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-sm text-foreground/80">
                    <Check size={14} className="text-forest" /> {b}
                  </li>
                ))}
              </ul>

              <div className="mt-7 flex items-baseline gap-3">
                <span className="text-sm text-muted-foreground">from</span>
                <span className="font-serif text-3xl text-forest-deep">
                  PKR {fromPrice.toLocaleString()}
                </span>
                <span className="text-sm text-muted-foreground">per pen</span>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {TIRZEE_VARIANTS.map((v) => (
                  <span
                    key={v.id}
                    className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-3 py-1 text-xs text-forest-deep"
                  >
                    {v.dose} <span className="text-muted-foreground">· {v.volume}</span>
                  </span>
                ))}
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => openOrder()}
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-forest text-cream px-7 py-3.5 text-sm font-medium hover:bg-forest-deep transition-all shadow-soft hover:-translate-y-0.5"
                >
                  <ShoppingBag size={16} />
                  Place Order
                </button>
              </div>




              <div className="mt-5 p-4 rounded-2xl bg-gold/10 border border-gold/30 text-sm text-forest-deep">
                Don't have a prescription?{" "}
                <ConsultLink className="font-medium underline underline-offset-4 hover:text-forest">
                  Consult a doctor now →
                </ConsultLink>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- HOW IT WORKS ---------- */
function HowItWorks() {
  const steps = [
    {
      Icon: Video,
      n: "01",
      t: "Meet your doctor online",
      d: "Book a consultation with a licensed Pakistani doctor via secure video — same day in most cases.",
    },
    {
      Icon: FileText,
      n: "02",
      t: "Receive your prescription",
      d: "If eligible, your doctor prescribes Tirzee and you can upload the prescription at checkout.",
    },
    {
      Icon: Package,
      n: "03",
      t: "Delivered to your home",
      d: "Discreet packaging within 2–5 business days. Ongoing doctor support included.",
    },
  ];
  return (
    <section id="how" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.22em] text-forest/70">How it works</p>
          <h2 className="mt-3 font-serif text-4xl md:text-6xl text-forest-deep text-balance leading-[1.05] max-w-3xl">
            From consultation to your door <span className="italic">— in days, not weeks.</span>
          </h2>
          <p className="mt-5 max-w-xl text-foreground/70">
            No clinic visits. No waiting rooms. No awkward conversations.
          </p>
        </Reveal>

        <div className="mt-16 relative">
          <div
            aria-hidden
            className="hidden md:block absolute top-12 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-forest/25 to-transparent"
          />
          <div className="grid md:grid-cols-3 gap-10 md:gap-8">
            {steps.map(({ Icon, n, t, d }, i) => (
              <Reveal key={n} delay={i * 0.1}>
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-cream border border-border flex items-center justify-center mx-auto md:mx-0 shadow-soft">
                    <Icon size={28} className="text-forest" />
                  </div>
                  <div className="mt-5 text-center md:text-left">
                    <div className="font-serif text-sm text-gold tracking-wider">{n}</div>
                    <h3 className="mt-1 font-serif text-2xl text-forest-deep">{t}</h3>
                    <p className="mt-2 text-foreground/70 text-[15px] leading-relaxed">{d}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.2}>
          <div className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-5 p-6 md:p-7 rounded-2xl border border-gold/40 bg-gold/10">
            <p className="font-serif text-xl md:text-2xl text-forest-deep text-balance">
              ⚡ Most patients complete consultation and prescription in under 24 hours.
            </p>
            <ConsultLink className="inline-flex items-center gap-2 rounded-full bg-forest text-cream px-6 py-3 text-sm font-medium whitespace-nowrap hover:bg-forest-deep transition-colors">
              Consult Now <ArrowRight size={16} />
            </ConsultLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- RESULTS ---------- */
function Results() {
  const stats = [
    { n: "21%", l: "avg. body weight reduction in clinical trials" },
    { n: "6\"", l: "avg. waist reduction in 12 weeks" },
    { n: "86%", l: "of patients report improved energy" },
    { n: "89%", l: "would recommend Tirzee to a friend" },
  ];
  const tests = [
    {
      q: "I had been 'trying to lose weight' for 11 years. After 3 months on Tirzee, I've lost more than I ever did in a year of dieting. But what surprised me most was the energy — I feel like myself again.",
      n: "Ayesha R.",
      c: "Lahore",
      m: "Lost 14 kg in 14 weeks · Tirzee",
    },
    {
      q: "The doctor was kind, professional, and made everything feel safe. Tirzee changed the way my body responds to food — for the first time in years I'm not constantly thinking about my next meal.",
      n: "Imran K.",
      c: "Karachi",
      m: "Lost 9 kg in 10 weeks · Tirzee",
    },
    {
      q: "I avoided weddings for years. Three months in and I'm the one taking the photos again. The doctor check-ins made me feel safe the whole way through.",
      n: "Sana M.",
      c: "Islamabad",
      m: "Lost 11 kg in 12 weeks · Tirzee",
    },
  ];
  return (
    <section id="results" className="relative py-24 md:py-32 bg-forest-deep text-cream overflow-hidden">
      <div aria-hidden className="absolute inset-0 bg-grain opacity-40" />
      <div aria-hidden className="absolute -top-40 right-0 w-[600px] h-[600px] rounded-full bg-gold/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.22em] text-gold">Real results · Real patients</p>
          <h2 className="mt-3 font-serif text-4xl md:text-6xl text-balance leading-[1.05] max-w-3xl">
            The numbers that <span className="italic">change everything.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
          {stats.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08}>
              <div className="border-l border-cream/15 pl-5">
                <div className="font-serif text-5xl md:text-6xl text-cream">{s.n}</div>
                <p className="mt-2 text-cream/70 text-sm leading-snug">{s.l}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-20 grid md:grid-cols-3 gap-6">
          {tests.map((t, i) => (
            <Reveal key={t.n} delay={i * 0.1}>
              <figure className="h-full rounded-3xl bg-cream/5 border border-cream/10 backdrop-blur p-7 flex flex-col">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Star key={k} size={14} className="fill-gold text-gold" />
                  ))}
                </div>
                <blockquote className="font-serif text-lg leading-snug text-cream/95 flex-1">
                  "{t.q}"
                </blockquote>
                <figcaption className="mt-6 pt-5 border-t border-cream/10">
                  <div className="text-cream font-medium">{t.n} · {t.c}</div>
                  <div className="text-xs text-gold mt-1">{t.m}</div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-cream/60">
            <span className="inline-flex items-center gap-2"><ShieldCheck size={14} /> Meri Sehat verified</span>
            <span className="inline-flex items-center gap-2"><Lock size={14} /> Confidential</span>
            <span className="inline-flex items-center gap-2"><Stethoscope size={14} /> Doctor supervised</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- DOCTORS ---------- */
function Doctors() {
  const docs = [
    {
      img: doctor1,
      n: "Dr. Aisha Qureshi",
      cred: "MBBS, FCPS (Internal Medicine)",
      spec: "Metabolic health & obesity medicine",
      q: "I see patients every day who've been told to 'just eat less.' Tirzee lets me give them a real medical solution — not a lecture.",
    },
    {
      img: doctor2,
      n: "Dr. Faisal Ahmed",
      cred: "MBBS, MRCP (UK)",
      spec: "Endocrinology & diabetes care",
      q: "Tirzepatide gives us a tool that actually addresses biology. Combined with proper monitoring, the outcomes for our patients have been remarkable.",
    },
  ];
  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.22em] text-forest/70">Your medical team</p>
          <h2 className="mt-3 font-serif text-4xl md:text-6xl text-forest-deep text-balance leading-[1.05] max-w-3xl">
            Real doctors. Real conversations. <span className="italic">Real care.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-foreground/70">
            Every consultation is conducted by a licensed physician registered with the Pakistan
            Medical Commission. This isn't an app — it's a medical practice.
          </p>
        </Reveal>

        <div className="mt-14 grid md:grid-cols-2 gap-6">
          {docs.map((d, i) => (
            <Reveal key={d.n} delay={i * 0.1}>
              <article className="group rounded-3xl border border-border bg-card overflow-hidden flex flex-col sm:flex-row hover:border-forest/30 transition-all hover:shadow-card">
                <div className="sm:w-2/5 aspect-square sm:aspect-auto overflow-hidden bg-secondary">
                  <img
                    src={d.img}
                    alt={d.n}
                    loading="lazy"
                    width={1024}
                    height={1024}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-7 flex-1 flex flex-col">
                  <h3 className="font-serif text-2xl text-forest-deep">{d.n}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{d.cred}</p>
                  <p className="mt-2 text-sm text-gold">{d.spec}</p>
                  <blockquote className="mt-5 font-serif text-lg leading-snug text-foreground/85 italic">
                    "{d.q}"
                  </blockquote>
                  <div className="mt-auto pt-5 inline-flex items-center gap-2 text-xs text-muted-foreground">
                    <ShieldCheck size={14} className="text-forest" /> Meri Sehat Medical Panel
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-2"><Check size={14} className="text-forest" /> PMC Registered</span>
            <span className="inline-flex items-center gap-2"><Check size={14} className="text-forest" /> GLP-1 Certified Prescribers</span>
            <span className="inline-flex items-center gap-2"><Check size={14} className="text-forest" /> Available Same-Day</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
function Faq() {
  const items = [
    {
      q: "Is Tirzee safe?",
      a: "Yes. Tirzepatide is FDA-approved and has been used in controlled clinical trials involving hundreds of thousands of patients. Our doctors assess your medical eligibility before prescribing — people with certain conditions are not eligible, which is exactly why a consultation is required.",
    },
    {
      q: "Is this legal in Pakistan?",
      a: "Absolutely. Meri Sehat operates as a licensed telehealth platform under Pakistan's healthcare regulations. Our prescribing doctors are registered with the Pakistan Medical Commission and prescriptions are dispensed by licensed partner pharmacies.",
    },
    {
      q: "Do I need a prescription to order Tirzee?",
      a: "Yes. Tirzee is a prescription medication. If you already have a valid prescription, you can upload it at checkout. If not, book a free consultation with one of our doctors first.",
    },
    {
      q: "Do I have to inject myself?",
      a: "Tirzee is a once-weekly self-injection using a pre-filled pen. Your doctor will walk you through exactly how to use it, and our support team is available throughout your treatment.",
    },
    {
      q: "How much does it cost?",
      a: "Consultation is free. Tirzee is priced per pen and is shown on the product page. We offer ongoing doctor support included with your order.",
    },
    {
      q: "What if it doesn't work for me?",
      a: "Tirzee has strong clinical evidence behind it, but individual results vary. Our doctors monitor your progress and can adjust dosage as needed. You are never alone in this process.",
    },
    {
      q: "Will I gain the weight back when I stop?",
      a: "Outcomes depend on your overall health plan. Our doctors discuss long-term strategy with you — including lifestyle guidance that helps sustain your results. This is a partnership, not a prescription-and-goodbye.",
    },
    {
      q: "Is my consultation really private?",
      a: "100%. Your health data is protected under our privacy policy. Consultations are conducted via secure, encrypted video. Your employer, family, or insurance will not be notified.",
    },
  ];
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="relative py-24 md:py-32 bg-secondary/40">
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.22em] text-forest/70 text-center">FAQ</p>
          <h2 className="mt-3 text-center font-serif text-4xl md:text-6xl text-forest-deep text-balance leading-[1.05]">
            We know what you're thinking. <span className="italic">Here's the truth.</span>
          </h2>
        </Reveal>

        <div className="mt-14 divide-y divide-border border-y border-border">
          {items.map((it, i) => {
            const isOpen = open === i;
            return (
              <div key={it.q}>
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="w-full flex items-center justify-between gap-5 py-6 text-left group"
                >
                  <span className="font-serif text-xl md:text-2xl text-forest-deep group-hover:text-forest transition-colors">
                    {it.q}
                  </span>
                  <span className="shrink-0 w-9 h-9 rounded-full border border-border flex items-center justify-center text-forest group-hover:bg-forest group-hover:text-cream group-hover:border-forest transition-colors">
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                  </span>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="pb-7 pr-14 text-foreground/75 text-[15px] leading-relaxed">{it.a}</p>
                </motion.div>
              </div>
            );
          })}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-10 text-center text-sm text-muted-foreground">
            Still have questions?{" "}
            <ConsultLink className="text-forest-deep underline underline-offset-4 hover:text-forest">
              Chat with our team
            </ConsultLink>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- VISION ---------- */
function Vision() {
  const cols = [
    { t: "Physical", items: ["Lose medically significant weight", "More energy, every day", "Improved health markers"] },
    { t: "Emotional", items: ["Rebuild body confidence", "No more shame cycles", "Feel like yourself again"] },
    { t: "Practical", items: ["Works around your schedule", "No clinic visits ever", "Delivered to your door"] },
  ];
  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.22em] text-forest/70 text-center">Your life, rewritten</p>
          <h2 className="mt-3 text-center font-serif text-4xl md:text-6xl lg:text-7xl text-forest-deep text-balance leading-[1.02] max-w-4xl mx-auto">
            Imagine waking up and <span className="italic">not thinking</span> about your weight.
          </h2>
          <p className="mt-6 max-w-2xl mx-auto text-center text-foreground/75 text-pretty">
            Not obsessing over what to eat. Not avoiding events because of how you look. Not feeling
            tired before the day starts. Just living — fully, confidently, comfortably in your body.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-12 gap-4">
          <Reveal className="col-span-12 md:col-span-7" delay={0.05}>
            <div className="aspect-[16/10] rounded-3xl overflow-hidden">
              <img src={life1} alt="" loading="lazy" width={1024} height={1024} className="w-full h-full object-cover" />
            </div>
          </Reveal>
          <Reveal className="col-span-6 md:col-span-5" delay={0.15}>
            <div className="aspect-[4/5] md:aspect-auto md:h-full rounded-3xl overflow-hidden">
              <img src={life2} alt="" loading="lazy" width={1024} height={1024} className="w-full h-full object-cover" />
            </div>
          </Reveal>
          <Reveal className="col-span-6 md:col-span-5" delay={0.2}>
            <div className="aspect-[4/5] md:h-full rounded-3xl overflow-hidden">
              <img src={life3} alt="" loading="lazy" width={1024} height={1024} className="w-full h-full object-cover" />
            </div>
          </Reveal>
          <Reveal className="col-span-12 md:col-span-7" delay={0.25}>
            <div className="h-full p-8 md:p-10 rounded-3xl bg-forest text-cream flex flex-col justify-center">
              <p className="font-serif text-3xl md:text-4xl leading-tight text-balance">
                "This isn't just weight loss.
                <span className="block italic text-gold">It's getting your life back."</span>
              </p>
            </div>
          </Reveal>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {cols.map((c, i) => (
            <Reveal key={c.t} delay={i * 0.08}>
              <div className="p-7 rounded-2xl border border-border bg-card h-full">
                <div className="text-xs uppercase tracking-[0.18em] text-gold">{c.t}</div>
                <ul className="mt-4 space-y-3">
                  {c.items.map((it) => (
                    <li key={it} className="flex items-start gap-2 text-foreground/85">
                      <Check size={16} className="text-forest mt-1 shrink-0" /> {it}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- FINAL CTA ---------- */
function FinalCta() {
  return (
    <section className="relative py-24 md:py-36 bg-forest-radial text-cream overflow-hidden">
      <div aria-hidden className="absolute inset-0 bg-grain opacity-30" />
      <div className="relative mx-auto max-w-4xl px-5 md:px-8 text-center">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.22em] text-gold">Begin today</p>
          <h2 className="mt-3 font-serif text-5xl md:text-7xl text-balance leading-[1.02]">
            Two paths. <span className="italic">One you.</span>
          </h2>
          <p className="mt-6 max-w-xl mx-auto text-cream/80 text-pretty">
            Already have a Tirzee prescription? Order it now and we'll deliver it to your door.
            New to Tirzee? Speak to a licensed doctor — it's free.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 text-sm text-cream/80">
            <span className="inline-flex items-center gap-2"><Video size={16} className="text-gold" /> Doctor consultation</span>
            <span className="hidden sm:block text-gold">→</span>
            <span className="inline-flex items-center gap-2"><FileText size={16} className="text-gold" /> Upload prescription</span>
            <span className="hidden sm:block text-gold">→</span>
            <span className="inline-flex items-center gap-2"><Package size={16} className="text-gold" /> Medication delivered</span>
          </div>
        </Reveal>

        <Reveal delay={0.25}>
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-3">
            <ConsultLink className="group inline-flex items-center gap-3 rounded-full bg-gold text-forest-deep px-9 py-5 text-base font-medium hover:bg-cream transition-all hover:-translate-y-0.5 shadow-card">
              Consult Now — It's Free
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </ConsultLink>
            <button
              type="button"
              onClick={() => openOrder()}
              className="inline-flex items-center gap-3 rounded-full border border-cream/30 text-cream px-9 py-5 text-base font-medium hover:bg-cream/10 transition-all"
            >
              Order Tirzee
              <ShoppingBag size={18} />
            </button>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-cream/70">
            <span className="inline-flex items-center gap-1.5"><Lock size={12} /> 100% private</span>
            <span className="inline-flex items-center gap-1.5"><Stethoscope size={12} /> Licensed PK Doctors</span>
            <span className="inline-flex items-center gap-1.5"><Truck size={12} /> Home delivery</span>
          </div>
          <p className="mt-6 text-xs text-cream/60">
            <span className="inline-block w-2 h-2 rounded-full bg-gold mr-1.5 align-middle animate-pulse" />
            Doctors available today — consultations filling up fast.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- FOOTER ---------- */
function Footer() {
  const cols = [
    { h: "Product", l: ["Tirzee", "How pricing works", "Prescription guide"] },
    { h: "Company", l: ["About Meri Sehat", "Our doctors", "Pharmacy partners", "Press / Media"] },
    { h: "Support", l: ["FAQs", "WhatsApp support", "Contact us", "Refund policy"] },
    { h: "Legal", l: ["Privacy policy", "Terms of service", "Medical disclaimer"] },
  ];
  return (
    <footer className="bg-cream border-t border-border">
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-16 md:py-20 grid md:grid-cols-12 gap-10">
        <div className="md:col-span-4">
          <img src={logo} alt="Meri Sehat" className="h-10 w-auto object-contain" />
          <p className="mt-4 text-sm text-foreground/70 max-w-xs">
            Healthcare, delivered. Doctor-prescribed Tirzee weight management for Pakistan.
          </p>
        </div>
        <div className="md:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          {cols.map((c) => (
            <div key={c.h}>
              <div className="text-xs uppercase tracking-[0.18em] text-forest mb-4">{c.h}</div>
              <ul className="space-y-2.5">
                {c.l.map((i) => (
                  <li key={i}>
                    <a href="#" className="text-sm text-foreground/75 hover:text-forest-deep transition-colors">
                      {i}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-5 md:px-8 py-6 text-xs text-muted-foreground flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Meri Sehat. All rights reserved.</p>
          <p className="md:text-right max-w-2xl">
            Medications dispensed by licensed pharmacies only. This platform does not replace
            emergency medical care. Prescribed by Pakistan Medical Commission registered physicians.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ---------- MOBILE STICKY CTA ---------- */
function MobileCta() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 p-3 bg-cream/95 backdrop-blur border-t border-border flex gap-2">
      <ConsultLink className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-forest text-cream py-3.5 text-sm font-medium">
        Consult Now <ArrowRight size={16} />
      </ConsultLink>
      <button
        type="button"
        onClick={() => openOrder()}
        aria-label="Place order"
        className="inline-flex items-center justify-center gap-2 rounded-full border border-forest/30 bg-cream text-forest-deep px-4 py-3.5 text-sm font-medium"
      >
        <ShoppingBag size={16} />
      </button>
    </div>
  );
}

/* ---------- WHATSAPP FAB ---------- */
function WhatsappFab() {
  return (
    <a
      href="#"
      aria-label="Chat on WhatsApp"
      className="hidden md:inline-flex fixed bottom-6 right-6 z-40 items-center gap-2 rounded-full bg-[#25D366] text-white px-4 py-3 shadow-card hover:scale-105 transition-transform"
    >
      <MessageCircle size={18} />
      <span className="text-sm font-medium">Chat on WhatsApp</span>
    </a>
  );
}

/* ---------- ORDER DIALOG ---------- */
function openOrder(variantId?: string) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("open-order", { detail: { variantId } }),
    );
  }
}

function OrderDialog() {
  const [open, setOpen] = useState(false);
  const [variantId, setVariantId] = useState(TIRZEE_VARIANTS[0].id);
  const [form, setForm] = useState({
    name: "",
    number: "",
    email: "",
    address: "",
    city: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const variant =
    TIRZEE_VARIANTS.find((v) => v.id === variantId) ?? TIRZEE_VARIANTS[0];

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ variantId?: string }>).detail;
      if (detail?.variantId) setVariantId(detail.variantId);
      setOpen(true);
    };
    window.addEventListener("open-order", handler);
    return () => window.removeEventListener("open-order", handler);
  }, []);

  const onChange = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setOpen(false);
      setForm({ name: "", number: "", email: "", address: "", city: "" });
      toast.success("Order placed! Our team will call you shortly to confirm.");
    }, 400);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl text-forest-deep">
            Place your Tirzee order
          </DialogTitle>
          <DialogDescription>
            Free home delivery across Pakistan. Pay on delivery.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">
              Choose your dose
            </Label>
            <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-2">
              {TIRZEE_VARIANTS.map((v) => {
                const active = v.id === variantId;
                return (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setVariantId(v.id)}
                    className={`rounded-xl border px-3 py-2 text-sm transition-all ${
                      active
                        ? "border-forest bg-forest text-cream"
                        : "border-border bg-card text-forest-deep hover:border-forest/40"
                    }`}
                  >
                    <div className="font-medium">{v.dose}</div>
                    <div
                      className={`text-[11px] ${active ? "text-cream/80" : "text-muted-foreground"}`}
                    >
                      PKR {v.price.toLocaleString()}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <Label htmlFor="o-name">Full name</Label>
              <Input id="o-name" required value={form.name} onChange={onChange("name")} />
            </div>
            <div>
              <Label htmlFor="o-number">Phone number</Label>
              <Input
                id="o-number"
                type="tel"
                required
                value={form.number}
                onChange={onChange("number")}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="o-email">Email</Label>
            <Input
              id="o-email"
              type="email"
              required
              value={form.email}
              onChange={onChange("email")}
            />
          </div>
          <div>
            <Label htmlFor="o-address">Address</Label>
            <Input
              id="o-address"
              required
              value={form.address}
              onChange={onChange("address")}
            />
          </div>
          <div>
            <Label htmlFor="o-city">City</Label>
            <Input id="o-city" required value={form.city} onChange={onChange("city")} />
          </div>

          <div className="flex items-center justify-between rounded-xl border border-border bg-secondary/40 px-4 py-3 text-sm">
            <span className="text-foreground/70">
              {variant.dose} · {variant.volume}
            </span>
            <span className="font-serif text-lg text-forest-deep">
              PKR {variant.price.toLocaleString()}
            </span>
          </div>

          <DialogFooter>
            <button
              type="submit"
              disabled={submitting}
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-forest text-cream px-7 py-3.5 text-sm font-medium hover:bg-forest-deep transition-all disabled:opacity-60"
            >
              {submitting ? "Placing order…" : "Place Order"}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function Landing() {
  return (
    <main className="bg-background text-foreground antialiased">
      <Nav />
      <Hero />
      <Pain />
      <Science />
      <ProductSection />
      <HowItWorks />
      <Results />
      <Doctors />
      <Faq />
      <Vision />
      <FinalCta />
      <Footer />
      <MobileCta />
      <WhatsappFab />
      <OrderDialog />
    </main>
  );
}
