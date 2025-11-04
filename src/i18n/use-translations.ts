"use client";

import { useContext, useMemo, ReactNode } from "react";
import { createContext } from "react";

type Messages = {
  [key: string]: any;
};

type RichTranslationValue = {
  [key: string]: (children: string) => ReactNode;
};

export const MessagesContext = createContext<Messages>({});

export function useTranslationsDict(): Messages {
  const messages = useContext(MessagesContext);
  return messages;
}

export function useT(namespace: string) {
  const messages = useTranslationsDict();
  const section = messages[namespace] || {};

  const t = useMemo(
    () => (key: string, params?: Record<string, any>) => {
      const keys = key.split(".");
      let value: any = section;

      for (const k of keys) {
        value = value?.[k];
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
    },
    [section]
  ) as ((key: string, params?: Record<string, any>) => string) & {
    rich: (key: string, components: RichTranslationValue) => ReactNode;
  };

  t.rich = function (key: string, components: RichTranslationValue) {
    const keys = key.split(".");
    let value: any = section;

    for (const k of keys) {
      value = value?.[k];
    }

    if (typeof value !== "string") {
      return key;
    }

    // Replace <tag>content</tag> with component calls
    let result: ReactNode = [];
    let lastIndex = 0;
    const regex = /<(\w+)>(.*?)<\/\1>/g;
    let match;

    while ((match = regex.exec(value)) !== null) {
      const [fullMatch, componentName, content] = match;
      const startIndex = match.index;

      // Add text before this match
      if (startIndex > lastIndex) {
        result = [
          ...(Array.isArray(result) ? result : [result]),
          value.substring(lastIndex, startIndex),
        ];
      }

      // Add the component
      const component = components[componentName];
      if (component) {
        result = [
          ...(Array.isArray(result) ? result : [result]),
          component(content),
        ];
      } else {
        result = [
          ...(Array.isArray(result) ? result : [result]),
          fullMatch,
        ];
      }

      lastIndex = regex.lastIndex;
    }

    // Add remaining text
    if (lastIndex < value.length) {
      result = [
        ...(Array.isArray(result) ? result : [result]),
        value.substring(lastIndex),
      ];
    }

    return result;
  };

  return t;
}
