import { Footer } from "./components/landing/Footer";
import { FreeSpacesGrid } from "./components/landing/FreeSpacesGrid";
import { Header } from "./components/landing/Header";
import { Hero } from "./components/landing/Hero";
import { HowItWorks } from "./components/landing/HowItWorks";
import { MapPlaceholder } from "./components/landing/MapPlaceholder";
import { PricingPlaceholder } from "./components/landing/PricingPlaceholder";
import { StatsRow } from "./components/landing/StatsRow";
import { MOCK_PARKING_SPACES } from "@/lib/mock-parking-spaces";

export default function Home() {
  return (
    <div className="flex min-h-full flex-col">
      <Header />
      <Hero />
      <StatsRow />
      <HowItWorks />
      <MapPlaceholder />
      <FreeSpacesGrid locations={MOCK_PARKING_SPACES} />
      <PricingPlaceholder />
      <Footer />
    </div>
  );
}
