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
    subtitle: "OpenStreetMap — označena su demo parkirališta u gradu.",
    loadingMap: "Učitavanje karte Zagreba…",
    freeInPopup: "slobodno",
  },
  grid: {
    title: "Slobodna mjesta sada",
    subtitle: "Demo podaci za Zagreb — kartice kasnije povežite na svoj API.",
    freeLabel: "slobodno",
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
  parking: {
    "1": {
      name: "Garaža Glavni kolodvor",
      pricePerHour: "2,00 € / h",
      distanceLabel: "240 m",
    },
    "2": {
      name: "Langov trg — otvoreno parkiralište",
      pricePerHour: "1,50 € / h",
      distanceLabel: "0,5 km",
    },
    "3": {
      name: "Garaža Importanne / Green Gold",
      pricePerHour: "2,50 € / h",
      distanceLabel: "120 m",
    },
    "4": {
      name: "Garaža Arena Zagreb",
      pricePerHour: "Prvi sat besplatno",
      distanceLabel: "1,2 km",
    },
  },
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
    subtitle: "OpenStreetMap — demo parking locations are marked in the city.",
    loadingMap: "Loading Zagreb map…",
    freeInPopup: "free",
  },
  grid: {
    title: "Spaces available now",
    subtitle: "Demo data for Zagreb — wire these cards to your API when ready.",
    freeLabel: "free",
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
  parking: {
    "1": {
      name: "Main station garage",
      pricePerHour: "€2.00 / h",
      distanceLabel: "240 m",
    },
    "2": {
      name: "Langov trg — surface parking",
      pricePerHour: "€1.50 / h",
      distanceLabel: "0.5 km",
    },
    "3": {
      name: "Importanne / Green Gold garage",
      pricePerHour: "€2.50 / h",
      distanceLabel: "120 m",
    },
    "4": {
      name: "Arena Zagreb garage",
      pricePerHour: "First hour free",
      distanceLabel: "1.2 km",
    },
  },
};

const byLocale: Record<Locale, Dictionary> = {
  hr,
  en,
};

export function getDictionary(locale: Locale): Dictionary {
  return byLocale[locale];
}
