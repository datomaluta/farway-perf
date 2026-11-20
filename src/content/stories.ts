export type Region = "mountains" | "coast" | "cities" | "desert";

export interface Credit {
  name: string;
  /** Unsplash username, without the @ */
  username: string;
  /** Unsplash photo ID, used to link back to the original */
  photoId: string;
}

export interface Photo {
  src: string;
  width: number;
  height: number;
  alt: string;
  credit: Credit;
}

export interface Guide {
  id: "getting-there" | "where-to-stay" | "when-to-go";
  title: string;
  summary: string;
  publishedAt: string;
}

export interface Story {
  slug: string;
  title: string;
  dek: string;
  place: string;
  country: string;
  region: Region;
  author: string;
  publishedAt: string;
  readMinutes: number;
  image: Photo;
  /** [latitude, longitude] */
  coords: [number, number];
  body: string[];
  guides: Guide[];
}

export const regions: { value: Region; label: string }[] = [
  { value: "mountains", label: "Mountains" },
  { value: "coast", label: "Coast" },
  { value: "cities", label: "Cities" },
  { value: "desert", label: "Desert" },
];

export const stories: Story[] = [
  {
    slug: "above-the-clouds-in-kazbegi",
    title: "Above the clouds in Kazbegi",
    dek: "Three days on foot around Stepantsminda, where the Georgian Military Road runs out of valley and Mount Kazbek fills the sky.",
    place: "Stepantsminda",
    country: "Georgia",
    region: "mountains",
    author: "Ana Beridze",
    publishedAt: "2026-11-14",
    readMinutes: 7,
    image: {
      src: "/images/kazbegi.jpg",
      width: 2400,
      height: 1590,
      alt: "Gergeti Trinity Church on a green ridge below snow-streaked mountains",
      credit: { name: "Iman Gozal", username: "imangm", photoId: "5iQWgow3_S0" },
    },
    coords: [42.662, 44.62],
    body: [
      "The marshrutka from Tbilisi leaves when it is full, not when the timetable says. Three hours later, after the Jvari Pass and a long run of switchbacks, it drops you in Stepantsminda with a crick in your neck and Mount Kazbek suddenly, absurdly close.",
      "Most visitors ride a 4x4 up to Gergeti Trinity Church and back down before lunch. Walk it instead. The trail climbs through birch and pine for about ninety minutes, and the church appears late, small and dark against a mountain more than twice as high as the ridge it stands on.",
      "Stay a second day and keep going. Beyond the church the path rises towards the Gergeti glacier, the crowds thin out to shepherds and the odd hiker, and the only sounds are the wind and the bells of cattle grazing on the slopes.",
    ],
    guides: [
      {
        id: "getting-there",
        title: "Getting to Kazbegi",
        summary:
          "Shared minibuses leave Tbilisi's Didube station through the morning; the ride along the Georgian Military Road takes about three hours.",
        publishedAt: "2026-11-15",
      },
      {
        id: "where-to-stay",
        title: "Where to stay in Stepantsminda",
        summary:
          "Family guesthouses usually include dinner, and the views from upper-floor rooms beat any hotel lobby.",
        publishedAt: "2026-11-16",
      },
      {
        id: "when-to-go",
        title: "When to go to Kazbegi",
        summary:
          "June to September for hiking. The Jvari Pass can close for a day or two after heavy winter snow.",
        publishedAt: "2026-11-17",
      },
    ],
  },
  {
    slug: "slow-boat-up-the-norwegian-coast",
    title: "A slow boat up the Norwegian coast",
    dek: "Coastal ferries, ochre boathouses and a summer sun that refuses to set.",
    place: "Nordland",
    country: "Norway",
    region: "coast",
    author: "Nora Lindqvist",
    publishedAt: "2026-11-06",
    readMinutes: 6,
    image: {
      src: "/images/lofoten.jpg",
      width: 2400,
      height: 1600,
      alt: "Yellow wooden boathouses on a pier beside a fjord with rocky mountains",
      credit: { name: "Danny Rienecker", username: "danny_rienecker", photoId: "25Bu6uO9xLw" },
    },
    coords: [67.28, 14.4],
    body: [
      "There is a particular kind of quiet on a Norwegian ferry at two in the morning in June. The light is gold, the coffee machine is still running, and the only other passengers are a cyclist asleep on her panniers and a man reading a paperback with a pencil.",
      "We had planned to hop between islands by bus. Instead we kept missing connections and taking the next boat, and the trip became a string of small harbours: a fuel dock, a fish-drying rack, a row of ochre boathouses on stilts.",
      "Nothing in Nordland is quick. Roads wrap around every inlet, ferries run to their own rhythm, and the best thing to do is let them set the pace.",
    ],
    guides: [
      {
        id: "getting-there",
        title: "Getting around Nordland",
        summary:
          "Fly to Bodø, then use the regional ferries and express boats. Book car spaces ahead in July.",
        publishedAt: "2026-11-07",
      },
      {
        id: "where-to-stay",
        title: "Where to stay on the coast",
        summary:
          "Rorbuer, the converted fishermen's cabins, are the classic choice and often come with a kitchen.",
        publishedAt: "2026-11-08",
      },
      {
        id: "when-to-go",
        title: "When to go to northern Norway",
        summary:
          "Late May to late July for the midnight sun; late September onwards for a chance of the northern lights.",
        publishedAt: "2026-11-09",
      },
    ],
  },
  {
    slug: "kyoto-before-the-crowds",
    title: "Kyoto before the crowds",
    dek: "Walking the stone lanes of Higashiyama at six in the morning, when the only company is the street sweepers.",
    place: "Kyoto",
    country: "Japan",
    region: "cities",
    author: "Kenji Morimoto",
    publishedAt: "2026-10-29",
    readMinutes: 5,
    image: {
      src: "/images/kyoto.jpg",
      width: 2400,
      height: 1351,
      alt: "A quiet stone street lined with traditional wooden houses in Kyoto",
      credit: { name: "Flora Hon", username: "florahon", photoId: "SNecSSyXxVs" },
    },
    coords: [34.9987, 135.7808],
    body: [
      "By nine the slopes below Kiyomizu-dera are shoulder to shoulder. At six they belong to shopkeepers rolling up shutters, a monk on a bicycle and the soft scrape of bamboo brooms on stone.",
      "Start at Yasaka Shrine and walk uphill through Ninenzaka and Sannenzaka while the wooden facades are still shut. The lanes are steep and narrow, built for feet rather than tour groups, and in the early light the old machiya houses look exactly as they do on the postcards.",
      "When the first coaches arrive, cut north to the quieter streets around Kodai-ji, find a kissaten that opens early, and order the thick toast. You will have earned it.",
    ],
    guides: [
      {
        id: "getting-there",
        title: "Getting to Higashiyama",
        summary:
          "The lanes are a 15-minute walk from Gion-Shijo station, or take a city bus to Kiyomizu-michi.",
        publishedAt: "2026-10-30",
      },
      {
        id: "where-to-stay",
        title: "Where to stay in Kyoto",
        summary:
          "A ryokan in Gion puts you within walking distance of the old lanes before sunrise.",
        publishedAt: "2026-10-31",
      },
      {
        id: "when-to-go",
        title: "When to go to Kyoto",
        summary:
          "Late November for autumn leaves, early April for cherry blossom. Both are busy, so go early in the day.",
        publishedAt: "2026-11-01",
      },
    ],
  },
  {
    slug: "wind-and-granite-in-torres-del-paine",
    title: "Wind and granite in Torres del Paine",
    dek: "Five days on the W Trek, where the weather changes every twenty minutes and the views never do.",
    place: "Torres del Paine",
    country: "Chile",
    region: "mountains",
    author: "Tomás Ferreira",
    publishedAt: "2026-10-21",
    readMinutes: 8,
    image: {
      src: "/images/patagonia.jpg",
      width: 2400,
      height: 1600,
      alt: "A glacial river rushing below the granite peaks of Torres del Paine",
      credit: { name: "martin bennie", username: "martinbennie", photoId: "fFyIFm0pqNM" },
    },
    coords: [-50.94, -73.4],
    body: [
      "Patagonian wind does not blow so much as lean on you. On the second day of the W Trek it pinned us against a boulder above Lago Nordenskjöld for ten minutes, then stopped as if someone had closed a door.",
      "The route links three valleys along the southern edge of the massif, and each one ends at a view that feels unreasonable: the blue ice of Glacier Grey, the cirque of Valle del Francés, and finally the three granite towers that give the park its name.",
      "Book the campsites and refugios months ahead, pack for four seasons in one afternoon, and leave the last morning free. The sunrise climb to the base of the towers is worth every step in the dark.",
    ],
    guides: [
      {
        id: "getting-there",
        title: "Getting to Torres del Paine",
        summary:
          "Fly to Punta Arenas or Puerto Natales; buses run from Natales to the park entrances in season.",
        publishedAt: "2026-10-22",
      },
      {
        id: "where-to-stay",
        title: "Where to stay on the W Trek",
        summary:
          "Campsites and refugios along the W must be booked in advance, and rangers check reservations.",
        publishedAt: "2026-10-23",
      },
      {
        id: "when-to-go",
        title: "When to hike in Patagonia",
        summary:
          "November to March is the trekking season. December and January bring the longest days and the strongest winds.",
        publishedAt: "2026-10-24",
      },
    ],
  },
  {
    slug: "positano-after-dark",
    title: "Positano after dark",
    dek: "The Amalfi Coast is busiest at noon and best at dusk, when the day-trippers leave and the town lights up.",
    place: "Positano",
    country: "Italy",
    region: "coast",
    author: "Leila Haddad",
    publishedAt: "2026-10-12",
    readMinutes: 5,
    image: {
      src: "/images/amalfi.jpg",
      width: 2400,
      height: 1604,
      alt: "Positano's hillside houses lit up at dusk above a calm sea",
      credit: { name: "Sebastian Leonhardt", username: "icarium_imagery", photoId: "PkWac9CLWVA" },
    },
    coords: [40.628, 14.485],
    body: [
      "Positano spends the day performing for the ferries. Boats unload at the beach, the lanes fill with people looking for the perfect photo, and the whole town seems to hold its breath until the last boat leaves.",
      "Then the light softens, the shops pull in their racks, and the stacked houses start to glow one window at a time. Walk up the stairs towards Santa Maria Assunta and look back: this is the view the crowds came for, and they missed it.",
      "Eat late, as the locals do, and walk the Path of the Gods the next morning while it is still cool. The coast looks even better from 500 metres up.",
    ],
    guides: [
      {
        id: "getting-there",
        title: "Getting to the Amalfi Coast",
        summary:
          "Ferries run from Naples, Sorrento and Salerno in season; the coast road bus is cheaper but slow in summer traffic.",
        publishedAt: "2026-10-13",
      },
      {
        id: "where-to-stay",
        title: "Where to stay in Positano",
        summary:
          "Rooms in the upper town are quieter and cheaper, but count the steps before you book.",
        publishedAt: "2026-10-14",
      },
      {
        id: "when-to-go",
        title: "When to go to the Amalfi Coast",
        summary: "May, June and late September offer warm seas without the August crowds.",
        publishedAt: "2026-10-15",
      },
    ],
  },
  {
    slug: "behind-the-waterfall-at-seljalandsfoss",
    title: "Behind the waterfall at Seljalandsfoss",
    dek: "A south coast road trip measured in waterfalls, black sand and changing light.",
    place: "South Iceland",
    country: "Iceland",
    region: "coast",
    author: "Nora Lindqvist",
    publishedAt: "2026-10-03",
    readMinutes: 6,
    image: {
      src: "/images/iceland.jpg",
      width: 2400,
      height: 1500,
      alt: "Looking out from behind a waterfall at a green plain and a low sun",
      credit: { name: "Joshua Sortino", username: "sortino", photoId: "IlvY3z4KVCI" },
    },
    coords: [63.6156, -19.9886],
    body: [
      "Route 1 east of Reykjavík is a road built for stopping. Every twenty minutes another waterfall drops off the old sea cliffs, and every lay-by has a small crowd in waterproofs pointing cameras at the spray.",
      "Seljalandsfoss is the one you can walk behind. The path is slippery and you will get wet, but standing in the hollow of the cliff with the water roaring past, looking out at the green plain and the low sun, is worth a damp jacket.",
      "Drive on to Skógafoss, the black beach at Reynisfjara and the cliffs of Dyrhólaey, but do it slowly. The light on the south coast changes by the minute, and the best stops are the ones you did not plan.",
    ],
    guides: [
      {
        id: "getting-there",
        title: "Driving Iceland's south coast",
        summary: "Rent a car in Reykjavík; Seljalandsfoss is about a two-hour drive along Route 1.",
        publishedAt: "2026-10-04",
      },
      {
        id: "where-to-stay",
        title: "Where to stay on the south coast",
        summary: "Farm guesthouses between Hvolsvöllur and Vík book up early in summer.",
        publishedAt: "2026-10-05",
      },
      {
        id: "when-to-go",
        title: "When to go to south Iceland",
        summary:
          "June to August for long days. In winter, ice can close the path behind the falls.",
        publishedAt: "2026-10-06",
      },
    ],
  },
  {
    slug: "getting-lost-in-the-blue-city",
    title: "Getting lost in the blue city",
    dek: "Chefchaouen's painted lanes are best explored without a map and with plenty of mint tea.",
    place: "Chefchaouen",
    country: "Morocco",
    region: "cities",
    author: "Leila Haddad",
    publishedAt: "2026-09-24",
    readMinutes: 5,
    image: {
      src: "/images/chefchaouen.jpg",
      width: 2400,
      height: 1600,
      alt: "A narrow lane with blue-painted steps, walls and potted plants",
      credit: { name: "Milad Alizadeh", username: "miladsnaps", photoId: "JibMa0FbyHw" },
    },
    coords: [35.1688, -5.2636],
    body: [
      "Every guidebook says to get lost in Chefchaouen, and for once the guidebooks are right. The medina is small enough that you always find your way out, and tangled enough that you never take the same route twice.",
      "The blue starts at the walls and climbs over steps, doors and window frames until the whole town looks dipped in it. Residents repaint every spring, and in the morning you can find someone on a ladder with a bucket of lime wash.",
      "In the afternoon walk up to the Spanish Mosque on the hill east of town. From there the medina is a pale blue spill against the Rif mountains, and the call to prayer rolls across the valley at sunset.",
    ],
    guides: [
      {
        id: "getting-there",
        title: "Getting to Chefchaouen",
        summary: "CTM buses connect Chefchaouen with Fes and Tangier in roughly four hours.",
        publishedAt: "2026-09-25",
      },
      {
        id: "where-to-stay",
        title: "Where to stay in Chefchaouen",
        summary: "Riads inside the medina have roof terraces with views across the blue rooftops.",
        publishedAt: "2026-09-26",
      },
      {
        id: "when-to-go",
        title: "When to go to Chefchaouen",
        summary:
          "Spring and autumn are mild. Summer afternoons are hot and the town is busiest in August.",
        publishedAt: "2026-09-27",
      },
    ],
  },
  {
    slug: "weather-days-on-the-isle-of-skye",
    title: "Weather days on the Isle of Skye",
    dek: "The Old Man of Storr in mist and drizzle, and why that is the point.",
    place: "Isle of Skye",
    country: "Scotland",
    region: "mountains",
    author: "Sam Okafor",
    publishedAt: "2026-09-15",
    readMinutes: 4,
    image: {
      src: "/images/skye.jpg",
      width: 2400,
      height: 1602,
      alt: "The rock pinnacles of the Old Man of Storr under heavy grey clouds",
      credit: { name: "Reuben Teo", username: "reubenteo", photoId: "fUZWpaUknyI" },
    },
    coords: [57.5074, -6.183],
    body: [
      "We waited three days for clear weather on Skye and it never came. On the fourth we gave up waiting and walked up to the Old Man of Storr in a fine, persistent drizzle.",
      "It was the right call. Cloud poured over the ridge behind the pinnacles, the Sound of Raasay turned silver and slate, and the whole place felt older and stranger than any postcard. We had the top almost to ourselves.",
      "Skye rewards people who go out anyway. Pack a proper waterproof, start early to beat the car parks, and finish the day with chips in Portree, steaming gently.",
    ],
    guides: [
      {
        id: "getting-there",
        title: "Getting to Skye",
        summary:
          "Drive over the Skye Bridge from Kyle of Lochalsh, or take the ferry from Mallaig to Armadale.",
        publishedAt: "2026-09-16",
      },
      {
        id: "where-to-stay",
        title: "Where to stay on Skye",
        summary: "Portree has the most choice; book months ahead for summer.",
        publishedAt: "2026-09-17",
      },
      {
        id: "when-to-go",
        title: "When to go to Skye",
        summary: "May and September tend to be drier, with fewer midges than high summer.",
        publishedAt: "2026-09-18",
      },
    ],
  },
  {
    slug: "ha-long-bay-by-kayak",
    title: "Ha Long Bay by kayak",
    dek: "Leaving the cruise boats behind to paddle among limestone towers and quiet lagoons.",
    place: "Ha Long Bay",
    country: "Vietnam",
    region: "coast",
    author: "Kenji Morimoto",
    publishedAt: "2026-09-04",
    readMinutes: 6,
    image: {
      src: "/images/halong.jpg",
      width: 2400,
      height: 1174,
      alt: "Boats on turquoise water between green limestone islands",
      credit: { name: "Marina Lobato", username: "mlobatopl", photoId: "kG7pOXbBfNs" },
    },
    coords: [20.9101, 107.1839],
    body: [
      "From the deck of a cruise junk, Ha Long Bay is a procession of postcard islands. From a kayak it is something else entirely: limestone walls rising straight out of green water, caves you can paddle into, and lagoons that only open at low tide.",
      "The bay holds nearly two thousand islets, most of them uninhabited. We spent two days paddling between them with a local guide who knew exactly when the tide would let us slip under an arch and into a hidden basin.",
      "Choose a smaller operator that heads for quieter areas such as Bai Tu Long or Lan Ha, and spend at least one night on the water. The bay is calmest at dawn.",
    ],
    guides: [
      {
        id: "getting-there",
        title: "Getting to Ha Long Bay",
        summary: "Shuttle buses run from Hanoi to the Ha Long piers in about two and a half hours.",
        publishedAt: "2026-09-05",
      },
      {
        id: "where-to-stay",
        title: "Where to stay in Ha Long Bay",
        summary:
          "One or two nights aboard a small junk is the classic way; Cat Ba island is a cheaper base.",
        publishedAt: "2026-09-06",
      },
      {
        id: "when-to-go",
        title: "When to go to Ha Long Bay",
        summary:
          "October to April brings calmer, drier weather; summer is hot with occasional storms.",
        publishedAt: "2026-09-07",
      },
    ],
  },
  {
    slug: "lisbon-on-the-28-tram",
    title: "Lisbon on the 28 tram",
    dek: "Riding the city's most famous tram line from end to end, and the stops worth getting off at.",
    place: "Lisbon",
    country: "Portugal",
    region: "cities",
    author: "Tomás Ferreira",
    publishedAt: "2026-08-22",
    readMinutes: 4,
    image: {
      src: "/images/lisbon.jpg",
      width: 2400,
      height: 1596,
      alt: "A yellow tram on a sunny square between ochre buildings in Lisbon",
      credit: { name: "Aayush Gupta", username: "aayush_gupta", photoId: "ljhCEaHYWJ8" },
    },
    coords: [38.7139, -9.1334],
    body: [
      "Tram 28 rattles through the oldest parts of Lisbon on rails laid for a smaller, slower city. It squeezes between houses in Alfama, grinds up hills that seem too steep for it, and occasionally stops dead while a delivery van unloads.",
      "Ride it early, from Martim Moniz, when the carriages are still mostly full of locals. Hop off at Miradouro de Santa Luzia for the view over the river, again at the Sé cathedral, and once more in Estrela for the gardens.",
      "In the afternoon the queues get long and the tram gets crowded, so walk instead. The route is easy to follow on foot, and the climbs are a good excuse for a pastel de nata.",
    ],
    guides: [
      {
        id: "getting-there",
        title: "Getting around Lisbon",
        summary:
          "The airport is 20 minutes from the centre by metro; a rechargeable transit card covers trams and metro.",
        publishedAt: "2026-08-23",
      },
      {
        id: "where-to-stay",
        title: "Where to stay in Lisbon",
        summary: "Alfama and Graça are on the tram line and full of character, but they are hilly.",
        publishedAt: "2026-08-24",
      },
      {
        id: "when-to-go",
        title: "When to go to Lisbon",
        summary: "Spring and autumn are ideal; June brings the Santo António street festivities.",
        publishedAt: "2026-08-25",
      },
    ],
  },
  {
    slug: "the-alps-by-rail",
    title: "The Alps by rail",
    dek: "Slow trains, stone viaducts and window seats across the Swiss mountains.",
    place: "Graubünden",
    country: "Switzerland",
    region: "mountains",
    author: "Sam Okafor",
    publishedAt: "2026-08-10",
    readMinutes: 5,
    image: {
      src: "/images/alps.jpg",
      width: 2400,
      height: 1601,
      alt: "A red train crossing a stone viaduct through autumn forest",
      credit: { name: "Xavier von Erlach", username: "xavier_von_erlach", photoId: "Y_wE4T13uYg" },
    },
    coords: [46.6807, 9.6763],
    body: [
      "Switzerland has fast trains, but the ones worth riding are slow. The narrow-gauge lines of Graubünden take their time, curling through spiral tunnels and over stone viaducts built more than a century ago.",
      "Get a window seat and watch the valley drop away as the train crosses one bridge after another. In October the larches turn gold and the line feels like it runs through a painting.",
      "Buy a regional pass, get off wherever a village looks interesting, and catch the next train an hour later. Swiss timetables are reliable enough to make spontaneity easy.",
    ],
    guides: [
      {
        id: "getting-there",
        title: "Getting to Graubünden",
        summary:
          "Zürich to Chur takes about 75 minutes; the scenic narrow-gauge lines start there.",
        publishedAt: "2026-08-11",
      },
      {
        id: "where-to-stay",
        title: "Where to stay along the line",
        summary:
          "Small towns such as Filisur or Bergün have family hotels a short walk from the station.",
        publishedAt: "2026-08-12",
      },
      {
        id: "when-to-go",
        title: "When to ride the Swiss rails",
        summary: "Late September and October for autumn colour; winter for snow-covered routes.",
        publishedAt: "2026-08-13",
      },
    ],
  },
  {
    slug: "nights-in-wadi-rum",
    title: "Nights in Wadi Rum",
    dek: "Sandstone mountains, a sky full of stars and the long silence of the Jordanian desert.",
    place: "Wadi Rum",
    country: "Jordan",
    region: "desert",
    author: "Ana Beridze",
    publishedAt: "2026-07-28",
    readMinutes: 5,
    image: {
      src: "/images/wadirum.jpg",
      width: 2400,
      height: 1595,
      alt: "Two camels crossing a wide plain of orange sand below sandstone cliffs",
      credit: { name: "Alex Mellado", username: "alexmellado1974", photoId: "v7FVGYpXthI" },
    },
    coords: [29.5759, 35.4202],
    body: [
      "Wadi Rum looks like somewhere you have seen before, mostly because film crews keep using it to stand in for other planets. In person it is quieter and stranger: red sand, sandstone mountains worn into domes and arches, and almost no sound at all.",
      "We spent two nights at a Bedouin camp, riding out in an old pickup by day to climb rock bridges and walk canyons, then sitting by the fire after dinner while our host made tea that was mostly sugar.",
      "When the fire burned down we walked a few minutes away from the tents. With no light for miles, the Milky Way was bright enough to cast a faint shadow.",
    ],
    guides: [
      {
        id: "getting-there",
        title: "Getting to Wadi Rum",
        summary: "Wadi Rum village is about an hour by road from Aqaba and four hours from Amman.",
        publishedAt: "2026-07-29",
      },
      {
        id: "where-to-stay",
        title: "Where to stay in Wadi Rum",
        summary:
          "Bedouin-run camps range from simple tents to domed rooms; most include dinner and jeep tours.",
        publishedAt: "2026-07-30",
      },
      {
        id: "when-to-go",
        title: "When to go to Wadi Rum",
        summary:
          "October to April. Summer days are extremely hot, and winter nights can drop below freezing.",
        publishedAt: "2026-07-31",
      },
    ],
  },
];

export interface ArchiveEntry {
  key: string;
  kind: "Story" | "Guide";
  title: string;
  summary: string;
  href: string;
  region: Region;
  place: string;
  country: string;
  publishedAt: string;
  readMinutes: number;
  image: Photo;
}

/** Stories and their guides as one flat, newest-first list. */
export function archiveEntries(list: Story[]): ArchiveEntry[] {
  const entries = list.flatMap((story): ArchiveEntry[] => [
    {
      key: story.slug,
      kind: "Story",
      title: story.title,
      summary: story.dek,
      href: `/stories/${story.slug}`,
      region: story.region,
      place: story.place,
      country: story.country,
      publishedAt: story.publishedAt,
      readMinutes: story.readMinutes,
      image: story.image,
    },
    ...story.guides.map((guide) => ({
      key: `${story.slug}-${guide.id}`,
      kind: "Guide" as const,
      title: guide.title,
      summary: guide.summary,
      href: `/stories/${story.slug}#${guide.id}`,
      region: story.region,
      place: story.place,
      country: story.country,
      publishedAt: guide.publishedAt,
      readMinutes: 2,
      image: story.image,
    })),
  ]);
  return entries.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}
