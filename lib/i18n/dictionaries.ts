import type { Locale } from "./config";

const hr = {
  metadata: {
    title: "ParkSpot Zagreb â€” slobodna parkirna mjesta",
    description:
      "Pregled slobodnih parkirnih mjesta u Zagrebu. Manje kruÅ¾enja, brÅ¾i dolazak na odrediÅ¡te.",
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
    kicker: "Zagreb Â· dostupnost u stvarnom vremenu",
    title: "PronaÄ‘ite slobodno parkirno mjesto prije nego stignete",
    body:
      "Pregled slobodnih mjesta diljem Zagreba â€” manje kruÅ¾enja, manje emisija, viÅ¡e vremena tamo gdje vam treba.",
    ctaPrimary: "PronaÄ‘i parking",
    ctaMap: "Otvori kartu",
  },
  stats: [
    { value: "850+", label: "Pratimo mjesta u Zagrebu" },
    { value: "17", label: "Gradskih Äetvrti" },
    { value: "<5 s", label: "OsvjeÅ¾avanje prikaza" },
  ],
  howItWorks: {
    title: "Kako radi",
    subtitle:
      "Tri koraka od pretrage do mjesta â€” isti tijek moÅ¾e pokrenuti vaÅ¡ backend kad spojite API.",
    steps: [
      {
        title: "Odaberite podruÄje",
        body:
          "PretraÅ¾ite ili odaberite zonu na karti Zagreba i vidite parkiraliÅ¡ta s brojem slobodnih mjesta.",
      },
      {
        title: "Usporedite opcije",
        body: "Udaljenost, cijena i broj slobodnih mjesta prilagoÄ‘avaju se prometu u gradu.",
      },
      {
        title: "Parkirajte s povjerenjem",
        body: "Krenite prema lokaciji gdje joÅ¡ ima mjesta â€” bez nagaÄ‘anja u guÅ¾vi.",
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
    nearestTitle: "Najbliže garaže",
    nearestHint: "Odaberite mjesto iz predloga da vidite najbliže garaže i pomaknete kartu.",
    distanceMeters: "m",
    distanceKilometers: "km",
  },
  grid: {
    title: "Slobodna mjesta sada",
    subtitle:
      "Javne garaÅ¾e iz Geoportala â€” broj slobodnih mjesta je demo procjena; poveÅ¾ite kartice na API kad budete spremni.",
    freeLabel: "slobodno",
    capacityLabel: "kapacitet",
    mockEstimateNote: "Ilustrativna procjena.",
    badgeOpen: "Ima mjesta",
    badgeLimited: "OgraniÄeno",
  },
  pricing: {
    title: "Cijene",
    body: "Cijene po zonama i parkiraliÅ¡tima u Zagrebu razlikuju se. Ovdje kasnije poveÅ¾ite pravila naplate.",
    footnote: "Rezervirano mjesto za tarife â€” planovi uskoro.",
  },
  footer: {
    copyright: "ParkSpot Zagreb. Demo suÄelje â€” podaci su ilustrativni.",
    privacy: "Privatnost",
    terms: "Uvjeti",
    contact: "Kontakt",
  },
  parkingDefaults: {
    pricePerHour: "â€”",
    distanceLabel: "â€”",
  },
  parking: {},
};

export type Dictionary = typeof hr;

const en: Dictionary = {
  metadata: {
    title: "ParkSpot Zagreb â€” free parking spaces",
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
    kicker: "Zagreb Â· live availability",
    title: "Find a free parking space before you arrive",
    body:
      "Browse open spots across Zagreb â€” less circling, lower emissions, more time where you need to be.",
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
      "Three steps from search to spot â€” your backend can power the same flow once you connect an API.",
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
        body: "Head to a location that still has room â€” no more guessing in busy areas.",
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
    nearestTitle: "Nearest garages",
    nearestHint: "Pick a place from suggestions to see nearby garages and move the map.",
    distanceMeters: "m",
    distanceKilometers: "km",
  },
  grid: {
    title: "Spaces available now",
    subtitle:
      "Public garages from Geoportal â€” free-space counts are demo estimates; connect cards to your API when ready.",
    freeLabel: "free",
    capacityLabel: "capacity",
    mockEstimateNote: "Illustrative estimate.",
    badgeOpen: "Spaces available",
    badgeLimited: "Limited",
  },
  pricing: {
    title: "Pricing",
    body: "Rates vary by zone and car park in Zagreb. Connect your billing rules here when you build the product layer.",
    footnote: "Placeholder for tariffs â€” plans coming soon.",
  },
  footer: {
    copyright: "ParkSpot Zagreb. Demo UI â€” data is illustrative.",
    privacy: "Privacy",
    terms: "Terms",
    contact: "Contact",
  },
  parkingDefaults: {
    pricePerHour: "â€”",
    distanceLabel: "â€”",
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
