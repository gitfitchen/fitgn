import { NextIntlClientProvider, type AbstractIntlMessages } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { isLocale, type Locale } from "@/i18n/config";

type LocaleLayoutProps = Readonly<{
  children: ReactNode;
  params: { locale: string };
}>;

async function getMessages(locale: Locale): Promise<AbstractIntlMessages | null> {
  try {
    const messages = (await import(`../../messages/${locale}.json`)).default;
    return messages;
  } catch {
    return null;
  }
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale: localeParam } = params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale = localeParam as Locale;

  unstable_setRequestLocale(locale);

  const messages = await getMessages(locale);

  if (!messages) {
    notFound();
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
