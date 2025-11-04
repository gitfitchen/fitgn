"use client";

import type { ReactNode } from "react";
import { MessagesContext } from "@/i18n/use-translations";

type Props = {
  locale: string;
  messages: Record<string, any>;
  children: ReactNode;
};

export default function LocaleProvider({ messages, children }: Props) {
  return (
    <MessagesContext.Provider value={messages}>
      {children}
    </MessagesContext.Provider>
  );
}
