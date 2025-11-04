import { locales } from "@/i18n/config";
import HomeContent from "./home-content";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const dynamicParams = false;

export default function Page() {
  return <HomeContent />;
}
