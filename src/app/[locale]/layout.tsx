import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { isLocale, locales } from "@/i18n/config";
import type { AbstractIntlMessages } from "next-intl";
import LocaleProvider from "./locale-provider";

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }> | { locale?: string } | undefined;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const dynamicParams = false;

async function loadMessages(locale: string): Promise<AbstractIntlMessages> {
  try {
    return (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    console.error(`Failed to load messages for locale ${locale}:`, error);
    return {};
  }
}

export default async function LocaleLayout({ children, params }: Props) {
  const resolvedParams = await params;
  const locale = resolvedParams?.locale;

  if (!locale || !isLocale(locale)) notFound();

  const messages = await loadMessages(locale);

  return (
    <LocaleProvider locale={locale} messages={messages}>
      {children}
    </LocaleProvider>
  );
}
