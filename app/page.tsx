import { Footer } from "./components/landing/Footer";
import { FreeSpacesGrid } from "./components/landing/FreeSpacesGrid";
import { Header } from "./components/landing/Header";
import { Hero } from "./components/landing/Hero";
import { HowItWorks } from "./components/landing/HowItWorks";
import { MapPlaceholder } from "./components/landing/MapPlaceholder";
import { PricingPlaceholder } from "./components/landing/PricingPlaceholder";
import { StatsRow } from "./components/landing/StatsRow";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getLocale } from "@/lib/i18n/get-locale";
import { mergeParkingForLocale } from "@/lib/i18n/merge-parking";
import { MOCK_PARKING_SPACES } from "@/lib/mock-parking-spaces";

export default async function Home() {
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const locations = mergeParkingForLocale(MOCK_PARKING_SPACES, dict);

  return (
    <div className="flex min-h-full flex-col">
      <Header locale={locale} copy={dict.header} />
      <Hero copy={dict.hero} />
      <StatsRow stats={dict.stats} />
      <HowItWorks copy={dict.howItWorks} />
      <MapPlaceholder copy={dict.map} locations={locations} />
      <FreeSpacesGrid grid={dict.grid} locations={locations} />
      <PricingPlaceholder copy={dict.pricing} />
      <Footer copy={dict.footer} />
    </div>
  );
}
