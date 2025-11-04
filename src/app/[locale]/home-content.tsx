"use client";

import { motion } from "framer-motion";
import { Inter } from "next/font/google";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useT, useTranslationsDict } from "@/i18n/use-translations";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

type FeatureProps = {
  title: string;
  text: string;
};

function Feature({ title, text }: FeatureProps) {
  return (
    <div className="flex flex-col gap-2 rounded-xl border border-white/10 bg-white/[0.04] p-5">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="text-sm leading-relaxed text-white/70">{text}</p>
    </div>
  );
}

type StepProps = {
  n: string;
  title: string;
  text: string;
};

function Step({ n, title, text }: StepProps) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-white/30 hover:bg-white/10">
      <span className="text-sm font-medium uppercase tracking-[0.3em] text-white/50">
        {n}
      </span>
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <p className="text-base leading-relaxed text-white/70">{text}</p>
    </div>
  );
}

export default function Home() {
  const t = useT("Home");
  const messages = useTranslationsDict();
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "en";

  // Parse features array from messages
  const home = messages.Home as unknown as {
    features?: Array<{ title: string; text: string }>;
    how?: { steps?: Array<{ n: string; title: string; text: string }> };
  };
  const features = Array.isArray(home?.features) ? home.features : [];
  const howSteps = Array.isArray(home?.how?.steps) ? home.how.steps : [];

  return (
    <div className={`${inter.className} min-h-screen bg-black text-white`}>
      <header className="border-b border-white/10 bg-black/80">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-6 lg:px-8">
          <Image
            src="/logo.png"
            alt="FitGN logo"
            width={120}
            height={40}
            className="opacity-90"
          />
          <select
            value={locale}
            onChange={(event) => router.push(`/${event.target.value}`)}
            className="bg-transparent border border-white/20 rounded px-2 py-1 text-sm text-white/80"
            aria-label="Select language"
          >
            <option value="en">EN</option>
            <option value="nl">NL</option>
          </select>
        </div>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-24 px-6 py-24 lg:px-8 lg:py-32">
        {/* Hero Section */}
        <section className="grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-xl space-y-6"
          >
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
              {t("hero.title")}
            </h1>
            <p className="text-lg leading-relaxed text-white/70">
              {t("hero.subtitle")}
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
              >
                {t("hero.ctaPrimary")}
              </a>
            </div>
          </motion.div>
          <div className="relative aspect-square w-full max-w-md place-self-center overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent">
            <Image
              src="/images/rail-hero.png"
              alt="FitGN Rail prototype installed in a bain-marie"
              fill
              priority
              sizes="(min-width: 1024px) 400px, 70vw"
              className="object-cover"
            />
          </div>
        </section>

        {/* Problem Section */}
        <section id="problem" className="space-y-6">
          <h2 className="text-3xl font-semibold">{t("problem.title")}</h2>
          <p className="text-base leading-relaxed text-white/70">
            {t("problem.body")}
          </p>
        </section>

        {/* Solution & Features Section */}
        <section
          id="solution"
          className="space-y-8 rounded-3xl border border-white/10 bg-white/[0.04] p-10"
        >
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold">{t("solution.title")}</h2>
            <p className="text-base leading-relaxed text-white/70">
              {t("solution.body")}
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {Array.isArray(features) &&
              features.map((feature, idx) => (
                <Feature
                  key={idx}
                  title={feature.title}
                  text={feature.text}
                />
              ))}
          </div>
        </section>

        {/* Detail Section */}
        <section id="detail" className="border-t border-white/10 py-16">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="mb-6 text-2xl font-semibold md:text-3xl">
              Precision-engineered design
            </h2>
            <Image
              src="/images/rail-detail.png"
              alt="Exploded technical view of FitGN Rail"
              width={1600}
              height={1200}
              className="rounded-2xl border border-white/10 object-cover"
            />
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="space-y-6">
          <h2 className="text-3xl font-semibold">{t("about.title")}</h2>
          <p className="text-base leading-relaxed text-white/70">
            {t.rich("about.body", {
              Fitchen: (chunks) => <strong>{chunks}</strong>,
              Koen: (chunks) => <strong>{chunks}</strong>,
              Pauline: (chunks) => <strong>{chunks}</strong>,
              FitGN: (chunks) => <strong>{chunks}</strong>,
            })}
          </p>
        </section>

        {/* How It Works Section */}
        <section className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold">{t("how.title")}</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {Array.isArray(howSteps) &&
              howSteps.map((step, idx) => (
                <Step
                  key={idx}
                  n={step.n}
                  title={step.title}
                  text={step.text}
                />
              ))}
          </div>
        </section>

        {/* CTA Section */}
        <section
          id="cta"
          className="space-y-6 rounded-3xl border border-white/15 bg-white/[0.03] p-10"
        >
          <div className="space-y-3">
            <h2 className="text-3xl font-semibold">{t("cta.title")}</h2>
            <p className="text-base leading-relaxed text-white/70">
              {t("cta.body")}
            </p>
          </div>
          <form className="flex flex-col gap-4 sm:flex-row">
            <label className="sr-only" htmlFor="cta-email">
              {t("cta.fieldLabel")}
            </label>
            <input
              id="cta-email"
              type="email"
              placeholder={t("cta.fieldLabel")}
              className="h-12 flex-1 rounded-full border border-white/20 bg-black/80 px-5 text-sm text-white placeholder:text-white/40 focus:border-white focus:outline-none"
              required
            />
            <button
              type="submit"
              className="h-12 rounded-full bg-white px-6 text-sm font-semibold text-black transition hover:bg-white/90"
            >
              {t("cta.button")}
            </button>
          </form>
          <p className="text-xs text-white/40">{t("cta.microcopy")}</p>
        </section>

        {/* Contact Section - Cloudflare Forms Integration */}
        <section id="contact" className="border-t border-white/10 py-16">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <h2 className="text-2xl font-semibold md:text-3xl mb-4">
              {t("contact.title")}
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto mb-8 leading-relaxed">
              {t.rich("contact.body", {
                strong: (chunks) => <strong>{chunks}</strong>,
              })}
            </p>

            {/* Cloudflare Forms Integration Notes:
                - Cloudflare automatically detects this form via name attribute and data-cf="true".
                - Enable under Cloudflare Dashboard → Workers → Forms.
                - To receive submissions via email:
                  1. Cloudflare → Email Routing → Create address info@fitgn.com → route to your inbox.
                  2. In Workers → Forms settings, select "fitgn-contact" and set destination to "Email: info@fitgn.com".
                  3. Optionally add a webhook to store submissions in a database or external service.
                - Test form: Submit via https://fitgn.com/#contact and verify submission in Cloudflare dashboard.
            */}
            <form
              name="fitgn-contact"
              method="POST"
              data-cf="true"
              className="grid gap-4 max-w-md mx-auto"
            >
              <input
                type="text"
                name="name"
                placeholder={t("contact.name")}
                required
                className="px-4 py-3 rounded-lg bg-white/5 border border-white/15 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
              />
              <input
                type="email"
                name="email"
                placeholder={t("contact.email")}
                required
                className="px-4 py-3 rounded-lg bg-white/5 border border-white/15 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
              />
              <textarea
                name="message"
                placeholder={t("contact.message")}
                rows={4}
                required
                className="px-4 py-3 rounded-lg bg-white/5 border border-white/15 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 resize-none"
              />
              <button
                type="submit"
                className="px-5 py-3 rounded-lg bg-white text-black font-semibold hover:bg-white/90 transition"
              >
                {t("contact.submit")}
              </button>
            </form>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/80">
        <div className="mx-auto max-w-6xl px-6 py-8 lg:px-8">
          <div className="text-sm text-white/60">
            {t("footer.line")}
          </div>
        </div>
      </footer>
    </div>
  );
}
