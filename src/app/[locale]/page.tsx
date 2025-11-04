import { locales } from "../layout";
import HomeContent from "./home-content";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function Page() {
  return <HomeContent />;
}
