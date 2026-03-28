import type { Locale } from "./config";

const hr = {
  metadata: {
    title: "ParkSpot Zagreb — slobodna parkirna mjesta",
    description:
      "Pregled slobodnih parkirnih mjesta u Zagrebu. Manje kruženja, brži dolazak na odredište.",
  },
  header: {
    brand: "ParkSpot Zagreb",
    nav: {
      howItWorks: "Kako radi",
      freeSpaces: "Slobodna mjesta",
      pricing: "Cijene",
    },
  },
  hero: {
    kicker: "Zagreb · dostupnost u stvarnom vremenu",
    title: "Pronađite slobodno parkirno mjesto prije nego stignete",
    body:
      "Pregled slobodnih mjesta diljem Zagreba — manje kruženja, manje emisija, više vremena tamo gdje vam treba.",
    ctaPrimary: "Pronađi parking",
    ctaMap: "Otvori kartu",
  },
  stats: [
    { value: "850+", label: "Pratimo mjesta u Zagrebu" },
    { value: "17", label: "Gradskih četvrti" },
    { value: "<5 s", label: "Osvježavanje prikaza" },
  ],
  howItWorks: {
    title: "Kako radi",
    subtitle:
      "Tri koraka od pretrage do mjesta — isti tijek može pokrenuti vaš backend kad spojite API.",
    steps: [
      {
        title: "Odaberite područje",
        body:
          "Pretražite ili odaberite zonu na karti Zagreba i vidite parkirališta s brojem slobodnih mjesta.",
      },
      {
        title: "Usporedite opcije",
        body: "Udaljenost, cijena i broj slobodnih mjesta prilagođavaju se prometu u gradu.",
      },
      {
        title: "Parkirajte s povjerenjem",
        body: "Krenite prema lokaciji gdje još ima mjesta — bez nagađanja u gužvi.",
      },
    ],
  },
  map: {
    title: "Karta Zagreba",
    subtitle:
      "Google karta — javne garaže (Geoportal Grada Zagreba) s procjenom zauzeća (demo, ilustrativno).",
    loadingMap: "Učitavanje karte Zagreba…",
    freeInPopup: "slobodno",
    capacityLabel: "Kapacitet",
    mockEstimateNote: "Procjena zauzeća je ilustrativna.",
    missingApiKey:
      "Nedostaje NEXT_PUBLIC_GOOGLE_MAPS_API_KEY. Dodajte ključ u .env.local da biste prikazali kartu.",
    searchLabel: "Odredište",
    searchPlaceholder: "Upišite adresu ili mjesto (Google predlozi)",
    searchAriaLabel: "Pretražite odredište",
    searchHelper: "Predlozi su prioritizirani oko Zagreba i Hrvatske.",
    nearestTitle: "Najbliže garaže",
    nearestEvTitle: "Najbliže punionice",
    nearestHint: "Odaberite mjesto iz predloga da vidite najbliže garaže i punionice te pomaknete kartu.",
    distanceMeters: "m",
    distanceKilometers: "km",
    evConnectorsLabel: "Utičnice",
    evTypeLabel: "Tip",
    evUnknownConnectors: "Nepoznato",
    evUnknownType: "Nepoznato",
    showEvChargingLabel: "Prikaz punionica za električna vozila na karti",
  },
  grid: {
    title: "Slobodna mjesta sada",
    subtitle:
      "Javne garaže iz Geoportala — broj slobodnih mjesta je demo procjena; povežite kartice na API kad budete spremni.",
    freeLabel: "slobodno",
    capacityLabel: "kapacitet",
    mockEstimateNote: "Ilustrativna procjena.",
    badgeOpen: "Ima mjesta",
    badgeLimited: "Ograničeno",
  },
  pricing: {
    title: "Cijene",
    body: "Cijene po zonama i parkiralištima u Zagrebu razlikuju se. Ovdje kasnije povežite pravila naplate.",
    footnote: "Rezervirano mjesto za tarife — planovi uskoro.",
  },
  footer: {
    copyright: "ParkSpot Zagreb. Demo sučelje — podaci su ilustrativni.",
    privacy: "Privatnost",
    terms: "Uvjeti",
    contact: "Kontakt",
  },
  parkingDefaults: {
    pricePerHour: "—",
    distanceLabel: "—",
  },
  parkingPriceLabels: {
    free: "Besplatno",
    paidUnknown: "Plaćeno parkiranje",
  },
  parking: {},
};

export type Dictionary = typeof hr;

const en: Dictionary = {
  metadata: {
    title: "ParkSpot Zagreb — free parking spaces",
    description:
      "See available parking in Zagreb before you arrive. Less circling, faster trips to your destination.",
  },
  header: {
    brand: "ParkSpot Zagreb",
    nav: {
      howItWorks: "How it works",
      freeSpaces: "Free spaces",
      pricing: "Pricing",
    },
  },
  hero: {
    kicker: "Zagreb · live availability",
    title: "Find a free parking space before you arrive",
    body:
      "Browse open spots across Zagreb — less circling, lower emissions, more time where you need to be.",
    ctaPrimary: "Find parking",
    ctaMap: "Open map",
  },
  stats: [
    { value: "850+", label: "Spaces we track in Zagreb" },
    { value: "17", label: "City districts" },
    { value: "<5 s", label: "Display refresh" },
  ],
  howItWorks: {
    title: "How it works",
    subtitle:
      "Three steps from search to spot — your backend can power the same flow once you connect an API.",
    steps: [
      {
        title: "Choose an area",
        body: "Search or pick a zone on the Zagreb map and see car parks with live free-space counts.",
      },
      {
        title: "Compare options",
        body: "Distance, price, and availability update as traffic in the city changes.",
      },
      {
        title: "Park with confidence",
        body: "Head to a location that still has room — no more guessing in busy areas.",
      },
    ],
  },
  map: {
    title: "Zagreb map",
    subtitle:
      "Google Maps — public garages (City of Zagreb Geoportal) with illustrative occupancy estimates (demo).",
    loadingMap: "Loading Zagreb map…",
    freeInPopup: "free",
    capacityLabel: "Capacity",
    mockEstimateNote: "Availability is an illustrative estimate.",
    missingApiKey:
      "NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is missing. Add your key to .env.local to show the map.",
    searchLabel: "Destination",
    searchPlaceholder: "Type an address or place (Google suggestions)",
    searchAriaLabel: "Search for a destination",
    searchHelper: "Suggestions are biased toward Zagreb and Croatia.",
    nearestTitle: "Nearest garages",
    nearestEvTitle: "Nearest charging",
    nearestHint: "Pick a place from suggestions to see nearby garages and chargers and move the map.",
    distanceMeters: "m",
    distanceKilometers: "km",
    evConnectorsLabel: "Connectors",
    evTypeLabel: "Type",
    evUnknownConnectors: "Unknown",
    evUnknownType: "Unknown",
    showEvChargingLabel: "Show EV charging stations on the map",
  },
  grid: {
    title: "Spaces available now",
    subtitle:
      "Public garages from Geoportal — free-space counts are demo estimates; connect cards to your API when ready.",
    freeLabel: "free",
    capacityLabel: "capacity",
    mockEstimateNote: "Illustrative estimate.",
    badgeOpen: "Spaces available",
    badgeLimited: "Limited",
  },
  pricing: {
    title: "Pricing",
    body: "Rates vary by zone and car park in Zagreb. Connect your billing rules here when you build the product layer.",
    footnote: "Placeholder for tariffs — plans coming soon.",
  },
  footer: {
    copyright: "ParkSpot Zagreb. Demo UI — data is illustrative.",
    privacy: "Privacy",
    terms: "Terms",
    contact: "Contact",
  },
  parkingDefaults: {
    pricePerHour: "—",
    distanceLabel: "—",
  },
  parkingPriceLabels: {
    free: "Free",
    paidUnknown: "Paid parking",
  },
  parking: {},
};

const byLocale: Record<Locale, Dictionary> = {
  hr,
  en,
};

export function getDictionary(locale: Locale): Dictionary {
  return byLocale[locale];
}