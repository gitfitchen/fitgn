/**
 * CLOUDFLARE EMAIL ROUTING CONFIGURATION
 *
 * To set up email routing for info@fitgn.com -> your destination:
 *
 * VIA CLOUDFLARE API:
 * 1. Get your Cloudflare API Token (Cloudflare Dashboard > My Profile > API Tokens)
 * 2. Run this curl command to create the email routing rule:
 *
 * curl --request POST \
 *   --url https://api.cloudflare.com/client/v4/accounts/{account_id}/email/routing/address/forwarding \
 *   --header "Authorization: Bearer {api_token}" \
 *   --header "Content-Type: application/json" \
 *   --data '{
 *     "source": "info@fitgn.com",
 *     "destination": "{your-email@example.com}"
 *   }'
 *
 * Replace:
 * - {account_id}: Your Cloudflare Account ID (found in URL or via API)
 * - {api_token}: Your Cloudflare API token
 * - {your-email@example.com}: Your destination email address
 *
 * VIA CLOUDFLARE DASHBOARD (Manual):
 * 1. Go to Email > Email Routing in Cloudflare Dashboard
 * 2. Create routing rule:
 *    - Address: info@fitgn.com
 *    - Forward to: [your destination email]
 * 3. Verify the destination email (confirmation link will be sent)
 * 4. Enable the routing rule
 *
 * TERRAFORM (Infrastructure as Code):
 * provider "cloudflare" {
 *   api_token = var.cloudflare_api_token
 * }
 *
 * resource "cloudflare_email_routing_rule" "info_fitgn" {
 *   zone_id  = var.cloudflare_zone_id
 *   name     = "FitGN Info to Sales"
 *   enabled  = true
 *   matchers = [{
 *     type = "literal"
 *     field = "to"
 *     value = "info@fitgn.com"
 *   }]
 *   actions = [{
 *     type = "forward"
 *     values = ["pauline@example.com"]  # Update with real destination
 *   }]
 * }
 */

"use client";

import { motion } from "framer-motion";
import { Inter } from "next/font/google";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useT, useTranslationsDict } from "@/i18n/use-translations";
import { useState } from "react";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

type FeatureProps = {
  title: string;
  text: string;
};

type RailSizeProps = {
  title: string;
  text: string;
};

type PillarProps = {
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

function RailSize({ title, text }: RailSizeProps) {
  return (
    <div className="flex flex-col gap-2 rounded-2xl border border-white/15 bg-white/[0.02] p-6">
      <span className="text-sm font-medium uppercase tracking-[0.3em] text-white/40">
        {title}
      </span>
      <p className="text-base leading-relaxed text-white/70">{text}</p>
    </div>
  );
}

function Pillar({ title, text }: PillarProps) {
  return (
    <div className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
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

type CopyEmailButtonProps = {
  email: string;
  label: string;
};

function CopyEmailButton({ email, label }: CopyEmailButtonProps) {
  const t = useT("Home");
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy email:", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
      aria-live="polite"
    >
      {copied ? t("contact.copied") : label}
    </button>
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
    lineup?: {
      title?: string;
      body?: string;
      sizes?: Array<{ title: string; text: string }>;
    };
    flemish?: {
      title?: string;
      body?: string;
      pillars?: Array<{ title: string; text: string }>;
    };
    about?: {
      proofPoints?: string[];
    };
  };
  const features = Array.isArray(home?.features) ? home.features : [];
  const howSteps = Array.isArray(home?.how?.steps) ? home.how.steps : [];
  const lineup = home?.lineup;
  const lineupSizes = Array.isArray(lineup?.sizes) ? lineup.sizes : [];
  const flemish = home?.flemish;
  const flemishPillars = Array.isArray(flemish?.pillars) ? flemish.pillars : [];
  const proofPoints = Array.isArray(home?.about?.proofPoints)
    ? home.about?.proofPoints
    : [];

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
            <option value="de">DE</option>
            <option value="fr">FR</option>
            <option value="es">ES</option>
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
            <p className="text-base leading-relaxed text-white/60">
              {t("hero.supporting")}
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
              >
                {t("hero.ctaPrimary")}
              </a>
              <a
                href="#how"
                className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
              >
                {t("hero.ctaSecondary")}
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

        {/* Rail Size Section */}
        {(lineup?.title || lineupSizes.length > 0) && (
          <section id="lineup" className="space-y-8">
            <div className="space-y-4">
              {lineup?.title && (
                <h2 className="text-3xl font-semibold">{lineup.title}</h2>
              )}
              {lineup?.body && (
                <p className="text-base leading-relaxed text-white/70">
                  {lineup.body}
                </p>
              )}
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {lineupSizes.map((size, idx) => (
                <RailSize key={idx} title={size.title} text={size.text} />
              ))}
            </div>
          </section>
        )}

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

        {/* Flemish Quality Section */}
        {(flemish?.title || flemish?.body) && (
          <section id="craft" className="space-y-8 rounded-3xl border border-white/10 bg-white/[0.03] p-10">
            <div className="space-y-4">
              {flemish?.title && (
                <h2 className="text-3xl font-semibold">{flemish.title}</h2>
              )}
              {flemish?.body && (
                <p className="text-base leading-relaxed text-white/70">
                  {flemish.body}
                </p>
              )}
            </div>
            {flemishPillars.length > 0 && (
              <div className="grid gap-6 md:grid-cols-3">
                {flemishPillars.map((pillar, idx) => (
                  <Pillar key={idx} title={pillar.title} text={pillar.text} />
                ))}
              </div>
            )}
          </section>
        )}

        {/* About Section */}
        <section id="about" className="space-y-6">
          <h2 className="text-3xl font-semibold">{t("about.title")}</h2>
          <p className="text-base leading-relaxed text-white/70">
            {t.rich("about.body", {
              strong: (chunks) => <strong>{chunks}</strong>,
            })}
          </p>
          {proofPoints.length > 0 && (
            <ul className="grid gap-3 text-sm text-white/70 sm:grid-cols-2">
              {proofPoints.map((point, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4"
                >
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-white/60" />
                  <span className="leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* How It Works Section */}
        <section id="how" className="space-y-8">
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

        {/* Pre-order & Updates Section */}
        <section id="contact" className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold">{t("contact.title")}</h2>
            <p className="text-base leading-relaxed text-white/70 max-w-2xl">
              {t("contact.body")}
            </p>
          </div>

          {/* Email Contact Card */}
          <div className="flex flex-col gap-6 rounded-3xl border border-white/15 bg-white/[0.03] p-10 max-w-md">
            <div>
              <p className="text-xs text-white/50 uppercase tracking-widest mb-3">
                {t("contact.emailLabel")}
              </p>
              <a
                href={`mailto:info@fitgn.com?subject=${encodeURIComponent(
                  t("contact.mailSubject")
                )}&body=${encodeURIComponent(t("contact.mailBody"))}`}
                className="text-2xl font-semibold text-white hover:text-white/80 transition break-all"
              >
                info@fitgn.com
              </a>
            </div>
            <div className="border-t border-white/10" />
            <div className="flex flex-col gap-4">
              <a
                href={`mailto:info@fitgn.com?subject=${encodeURIComponent(
                  t("contact.mailSubject")
                )}&body=${encodeURIComponent(t("contact.mailBody"))}`}
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
              >
                {t("contact.emailCta")}
              </a>
              <CopyEmailButton
                email="info@fitgn.com"
                label={t("contact.copyCta")}
              />
            </div>
            <div className="border-t border-white/10" />
            <div>
              <p className="text-xs text-white/50 uppercase tracking-widest mb-3">
                {t("contact.responseTime")}
              </p>
              <p className="text-sm text-white/70">
                {t("contact.responseText")}
              </p>
            </div>
          </div>

          <p className="text-xs text-white/40">{t("cta.microcopy")}</p>
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
