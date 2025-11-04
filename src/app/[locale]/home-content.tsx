"use client";

import { motion } from "framer-motion";
import { Inter } from "next/font/google";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

type StepProps = {
  number: string;
  title: string;
  description: string;
};

function Step({ number, title, description }: StepProps) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-white/30 hover:bg-white/10">
      <span className="text-sm font-medium uppercase tracking-[0.3em] text-white/50">
        {number}
      </span>
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <p className="text-base leading-relaxed text-white/70">{description}</p>
    </div>
  );
}

type SpecProps = {
  title: string;
  description: string;
};

function Spec({ title, description }: SpecProps) {
  return (
    <div className="flex flex-col gap-2 rounded-xl border border-white/10 bg-white/[0.04] p-5">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="text-sm leading-relaxed text-white/70">{description}</p>
    </div>
  );
}

export default function Home() {
  const t = useTranslations("Home");
  const locale = useLocale();
  const router = useRouter();
  const currentYear = new Date().getFullYear();

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
        <section className="grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-xl space-y-6"
          >
            <span className="text-sm uppercase tracking-[0.4em] text-white/50">
              {t("hero.label")}
            </span>
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
              {t("hero.title")}
            </h1>
            <p className="text-lg leading-relaxed text-white/70">
              {t("hero.tagline")}
            </p>
            <p className="text-lg leading-relaxed text-white/70">
              {t("hero.description")}
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <a
                href="#pilot"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
              >
                {t("hero.primaryButton")}
              </a>
              <a
                href="#solution"
                className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
              >
                {t("hero.secondaryButton")}
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

        <section id="problem" className="space-y-6">
          <h2 className="text-3xl font-semibold">{t("problem.heading")}</h2>
          <p className="text-base leading-relaxed text-white/70">
            {t("problem.paragraph1")}
          </p>
          <p className="text-base leading-relaxed text-white/70">
            {t("problem.paragraph2")}
          </p>
        </section>

        <section
          id="solution"
          className="space-y-8 rounded-3xl border border-white/10 bg-white/[0.04] p-10"
        >
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold">{t("solution.heading")}</h2>
            <p className="text-base leading-relaxed text-white/70">
              {t("solution.description")}
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <Spec
              title={t("specs.universalTitle")}
              description={t("specs.universalDescription")}
            />
            <Spec
              title={t("specs.stabilityTitle")}
              description={t("specs.stabilityDescription")}
            />
            <Spec
              title={t("specs.cleanTitle")}
              description={t("specs.cleanDescription")}
            />
          </div>
        </section>

        <section id="detail" className="border-t border-white/10 py-16">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="mb-6 text-2xl font-semibold md:text-3xl">
              {t("detail.heading")}
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

        <section className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold">{t("howItWorks.heading")}</h2>
            <p className="text-base leading-relaxed text-white/70">
              {t("howItWorks.description")}
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <Step
              number="01"
              title={t("howItWorks.steps.dropInTitle")}
              description={t("howItWorks.steps.dropInDescription")}
            />
            <Step
              number="02"
              title={t("howItWorks.steps.clickTitle")}
              description={t("howItWorks.steps.clickDescription")}
            />
            <Step
              number="03"
              title={t("howItWorks.steps.cleanTitle")}
              description={t("howItWorks.steps.cleanDescription")}
            />
          </div>
        </section>

        <section
          id="pilot"
          className="space-y-6 rounded-3xl border border-white/15 bg-white/[0.03] p-10"
        >
          <div className="space-y-3">
            <h2 className="text-3xl font-semibold">{t("pilot.heading")}</h2>
            <p className="text-base leading-relaxed text-white/70">
              {t("pilot.description")}
            </p>
          </div>
          <form className="flex flex-col gap-4 sm:flex-row">
            <label className="sr-only" htmlFor="pilot-email">
              {t("pilot.emailLabel")}
            </label>
            <input
              id="pilot-email"
              type="email"
              placeholder={t("pilot.emailPlaceholder")}
              className="h-12 flex-1 rounded-full border border-white/20 bg-black/80 px-5 text-sm text-white placeholder:text-white/40 focus:border-white focus:outline-none"
              required
            />
            <button
              type="submit"
              className="h-12 rounded-full bg-white px-6 text-sm font-semibold text-black transition hover:bg-white/90"
            >
              {t("pilot.submit")}
            </button>
          </form>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-black/80">
        <div className="mx-auto max-w-6xl px-6 py-8 lg:px-8">
          <div className="flex flex-col items-start gap-4 lg:flex-row lg:items-center lg:justify-between">
            <span className="text-sm text-white/50">
              {t("footer.copyright", { year: currentYear })}
            </span>
            <a
              href="#problem"
              className="text-sm font-medium text-white/60 transition hover:text-white"
            >
              {t("footer.backToTop")}
            </a>
          </div>
          <div className="mt-6 text-sm text-white/60">
            {t.rich("footer.companyDetails", {
              link: (chunks) => (
                <a href="mailto:info@fitgn.com" className="underline">
                  {chunks}
                </a>
              ),
            })}
          </div>
        </div>
      </footer>
    </div>
  );
}
