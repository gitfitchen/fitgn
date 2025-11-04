"use client";

import { useContext, useMemo, ReactNode } from "react";
import { createContext } from "react";

type Messages = Record<string, unknown>;

type RichTranslationValue = {
  [key: string]: (children: string) => ReactNode;
};

type TranslationFunction = {
  (key: string, params?: Record<string, unknown>): string;
  rich: (key: string, components: RichTranslationValue) => ReactNode;
};

export const MessagesContext = createContext<Messages>({});

export function useTranslationsDict(): Messages {
  const messages = useContext(MessagesContext);
  return messages;
}

export function useT(namespace: string): TranslationFunction {
  const messages = useTranslationsDict();
  const section = useMemo(() => {
    const val = messages[namespace];
    return typeof val === "object" && val !== null ? val : {};
  }, [messages, namespace]);

  const t = useMemo((): TranslationFunction => {
    const baseT = (key: string, params?: Record<string, unknown>): string => {
      const keys = key.split(".");
      let value: unknown = section;

      for (const k of keys) {
        if (typeof value === "object" && value !== null && k in value) {
          value = (value as Record<string, unknown>)[k];
        } else {
          return key;
        }
      }

      if (typeof value !== "string") {
        return key;
      }

      // Simple template interpolation: replace {key} with value
      if (params) {
        return value.replace(/\{(\w+)\}/g, (match: string, paramKey: string) => {
          return String(params[paramKey] ?? match);
        });
      }

      return value;
    };

    const rich = (key: string, components: RichTranslationValue): ReactNode => {
      const keys = key.split(".");
      let value: unknown = section;

      for (const k of keys) {
        if (typeof value === "object" && value !== null && k in value) {
          value = (value as Record<string, unknown>)[k];
        } else {
          return key;
        }
      }

      if (typeof value !== "string") {
        return key;
      }

      // Replace <tag>content</tag> with component calls
      const result: ReactNode[] = [];
      let lastIndex = 0;
      const regex = /<(\w+)>(.*?)<\/\1>/g;
      let match;

      while ((match = regex.exec(value)) !== null) {
        const [fullMatch, componentName, content] = match;
        const startIndex = match.index;

        // Add text before this match
        if (startIndex > lastIndex) {
          result.push(value.substring(lastIndex, startIndex));
        }

        // Add the component
        const component = components[componentName];
        if (component) {
          result.push(component(content));
        } else {
          result.push(fullMatch);
        }

        lastIndex = regex.lastIndex;
      }

      // Add remaining text
      if (lastIndex < value.length) {
        result.push(value.substring(lastIndex));
      }

      return result;
    };

    return Object.assign(baseT, { rich });
  }, [section]);

  return t;
}
