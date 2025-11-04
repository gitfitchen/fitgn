"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Inter } from "next/font/google";

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
  const currentYear = new Date().getFullYear();

  return (
    <div className={`${inter.className} min-h-screen bg-black text-white`}>
      <main className="mx-auto flex max-w-6xl flex-col gap-24 px-6 py-24 lg:px-8 lg:py-32">
        <section className="grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-xl space-y-6"
          >
            <span className="text-sm uppercase tracking-[0.4em] text-white/50">
              FitGN Rail
            </span>
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
              FitGN Rail — Locking Gastronorm Rails
            </h1>
            <p className="text-lg leading-relaxed text-white/70">
              Keep every GN pan where it belongs. FitGN Rail locks frames in
              bain-maries and saladettes so chefs stay focused on service—not on
              re-seating rails mid-rush.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <a
                href="#pilot"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
              >
                Join the pilot
              </a>
              <a
                href="#solution"
                className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
              >
                See how it locks
              </a>
            </div>
          </motion.div>
          <div className="relative aspect-square w-full max-w-md place-self-center overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent">
            <Image
              src="/images/rail-hero.jpg"
              alt="FitGN Rail prototype installed in a bain-marie"
              fill
              priority
              sizes="(min-width: 1024px) 400px, 70vw"
              className="object-cover"
            />
          </div>
        </section>

        <section id="problem" className="space-y-6">
          <h2 className="text-3xl font-semibold">When rails slip, service slows</h2>
          <p className="text-base leading-relaxed text-white/70">
            Standard Gastronorm frames ride loose in bain-maries and saladettes.
            Every bump from a ladle or rapid pan swap sends rails drifting,
            breaking chill chains and forcing constant resets. Hardware fixes are
            clunky, and gaffer tape never survives cleaning.
          </p>
          <p className="text-base leading-relaxed text-white/70">
            The result: crooked pans, inconsistent presentation, and lost seconds
            that compound across the line. FitGN Rail is purpose-built to eliminate
            the wobble.
          </p>
        </section>

        <section
          id="solution"
          className="space-y-8 rounded-3xl border border-white/10 bg-white/[0.04] p-10"
        >
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold">Locking or magnetic—your call</h2>
            <p className="text-base leading-relaxed text-white/70">
              FitGN Rail adapts to existing wells with either a mechanical latch or
              a magnetic capture point. Both approaches deliver a tight, repeatable
              seal that keeps rails aligned from prep to close.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <Spec
              title="Universal drop-in"
              description="Retrofits standard GN1/1 and GN2/1 openings with no tooling or permanent alteration."
            />
            <Spec
              title="Service-proof stability"
              description="Rails stay true even under aggressive ladling, heavy pans, and constant reloading."
            />
            <Spec
              title="Clean-in-place ready"
              description="Smooth edges and detachable components survive daily sanitizing without trapping debris."
            />
          </div>
        </section>

        <section className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold">How it works</h2>
            <p className="text-base leading-relaxed text-white/70">
              Everyday usability was the first requirement. FitGN Rail installs in
              minutes and removes without tools for nightly cleaning.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <Step
              number="01"
              title="Drop-in frame"
              description="Set the FitGN frame into the existing GN well—no screws, drilling, or adhesives."
            />
            <Step
              number="02"
              title="Click the rails"
              description="Slide each Gastronorm rail into place until you feel the lock or magnetic pull engage."
            />
            <Step
              number="03"
              title="Clean without stress"
              description="Lift the frame out after service. The open profile rinses fast and air-dries without residue."
            />
          </div>
        </section>

        <section
          id="pilot"
          className="space-y-6 rounded-3xl border border-white/15 bg-white/[0.03] p-10"
        >
          <div className="space-y-3">
            <h2 className="text-3xl font-semibold">Join the pilot program</h2>
            <p className="text-base leading-relaxed text-white/70">
              We&apos;re partnering with forward-thinking kitchens to validate the
              locking rail platform. Drop your email and we&apos;ll reach out with
              scheduling details.
            </p>
          </div>
          <form className="flex flex-col gap-4 sm:flex-row">
            <label className="sr-only" htmlFor="pilot-email">
              Work email
            </label>
            <input
              id="pilot-email"
              type="email"
              placeholder="chef@yourkitchen.com"
              className="h-12 flex-1 rounded-full border border-white/20 bg-black/80 px-5 text-sm text-white placeholder:text-white/40 focus:border-white focus:outline-none"
              required
            />
            <button
              type="submit"
              className="h-12 rounded-full bg-white px-6 text-sm font-semibold text-black transition hover:bg-white/90"
            >
              Request invite
            </button>
          </form>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-black/80">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-8 lg:px-8">
          <span className="text-sm text-white/50">
            © {currentYear} FitGN. All rights reserved.
          </span>
          <a
            href="#problem"
            className="text-sm font-medium text-white/60 transition hover:text-white"
          >
            Back to top
          </a>
        </div>
      </footer>
    </div>
  );
}
