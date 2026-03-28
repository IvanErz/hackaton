import { ZoneLookupView } from "@/app/components/zone/ZoneLookupView";
import { Footer } from "@/app/components/landing/Footer";
import { Header } from "@/app/components/landing/Header";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getLocale } from "@/lib/i18n/get-locale";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const dict = getDictionary(locale);
  return {
    title: dict.zonePage.metadata.title,
    description: dict.zonePage.metadata.description,
  };
}

export default async function ZonaPage() {
  const locale = await getLocale();
  const dict = getDictionary(locale);

  return (
    <div className="flex min-h-full flex-col">
      <Header locale={locale} copy={dict.header} />
      <ZoneLookupView copy={dict.zonePage} />
      <div className="mt-auto">
        <Footer copy={dict.footer} />
      </div>
    </div>
  );
}
