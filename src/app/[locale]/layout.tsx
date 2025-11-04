import { NextIntlClientProvider, type AbstractIntlMessages } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { isLocale } from "@/i18n/config";

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }> | { locale?: string } | undefined;
};

export default async function LocaleLayout({ children, params }: Props) {
  const resolvedParams = await params;
  const locale = resolvedParams?.locale;

  if (!locale || !isLocale(locale)) notFound();
  setRequestLocale(locale);

  const messages = (await import(`../../messages/${locale}.json`))
    .default as AbstractIntlMessages;

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
