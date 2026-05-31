const app = document.querySelector("#app");
const navToggle = document.querySelector(".nav-toggle");
const langToggle = document.querySelector("[data-lang-toggle]");

const state = {
  lang: localStorage.getItem("bmt-lang") || "nl",
  filters: {
    destination: "all",
    duration: "all",
    budget: "all",
    theme: "all",
  },
  seasonalMonth: null,
  plannerStep: "inquiry",
  trip: {},
};

const dictionary = {
  nl: {
    nav: {
      destinations: "Bestemmingen",
      packages: "Reizen",
      seasonal: "Seizoenen",
      guide: "Reisgids",
      faqs: "FAQ",
      contact: "Contact",
      cta: "Plan mijn reis",
    },
    footer: {
      copy: "Curated comfort en premium reizen door India en Nepal voor Nederlandse en Vlaamse reizigers.",
      explore: "Verkennen",
      custom: "Reis op maat",
      support: "Ondersteuning",
      policies: "Voorwaarden",
      privacy: "Privacy",
      cookies: "Cookies",
      terms: "Algemene voorwaarden",
      cancel: "Annulering",
      responsible: "Verantwoord reizen",
      note: "Alle reizen worden op maat bevestigd na beschikbaarheidscontrole, persoonlijk reisvoorstel en schriftelijk akkoord.",
    },
    common: {
      plan: "Plan mijn reis",
      view: "Bekijk details",
      from: "vanaf",
      days: "dagen",
      bestSeason: "Beste seizoen",
      comfort: "Comfort",
      premium: "Premium",
      country: "Land",
      duration: "Duur",
      budget: "Budget",
      theme: "Thema",
      all: "Alles",
      custom: "Op maat",
      included: "Inbegrepen",
      route: "Route",
      requestStep: "Aanvraag",
      required: "Dit veld is verplicht.",
    },
  },
  en: {
    nav: {
      destinations: "Destinations",
      packages: "Journeys",
      seasonal: "Seasons",
      guide: "Travel guide",
      faqs: "FAQs",
      contact: "Contact",
      cta: "Plan my trip",
    },
    footer: {
      copy: "Curated comfort and premium journeys across India and Nepal for Dutch and Flemish travelers.",
      explore: "Explore",
      custom: "Custom trip",
      support: "Support",
      policies: "Policies",
      privacy: "Privacy",
      cookies: "Cookies",
      terms: "Terms",
      cancel: "Cancellation",
      responsible: "Responsible travel",
      note: "All journeys are confirmed tailor-made after availability checks, a personal travel proposal and written approval.",
    },
    common: {
      plan: "Plan my trip",
      view: "View details",
      from: "from",
      days: "days",
      bestSeason: "Best season",
      comfort: "Comfort",
      premium: "Premium",
      country: "Country",
      duration: "Duration",
      budget: "Budget",
      theme: "Theme",
      all: "All",
      custom: "Custom",
      included: "Included",
      route: "Route",
      requestStep: "Inquiry",
      required: "This field is required.",
    },
  },
};

const localImage = (filename) => `assets/images/${filename}`;

const images = {
  hero: `url('${localImage("taj-mahal.jpg")}')`,
  jaipur: localImage("hawa-mahal-jaipur.jpg"),
  jaipurHome: localImage("pexels-jayanth-muppaneni-1883885743-29002477.jpg"),
  varanasi: localImage("varanasi-ghat-3.jpg"),
  kerala: localImage("kerala-5.jpg"),
  delhi: localImage("india-gate.jpg"),
  agra: localImage("taj-mahal.jpg"),
  goa: localImage("goa-7.jpg"),
  nepal: localImage("kathmandu-9.jpg"),
  mumbai: localImage("mumbai-7.jpg"),
  alleppey: localImage("alleppey-6.jpg"),
  cuisine: localImage("south-india.jpg"),
  contact: localImage("navdeep-singh-panwar-qtgj2nxqyy-unsplash.jpg"),
  holiColors: localImage("udaipur-5.jpg"),
  diwaliDiyas: localImage("mysore-palace-5.jpg"),
  diwaliFireworks: localImage("south-india.jpg"),
  gangaAartiVaranasi: localImage("ganga-arti-2.jpg"),
  gangaAartiHaridwar: localImage("ganga-arti-2.jpg"),
  durgaPuja: localImage("victoria-memorial-4.jpg"),
  onamPookalam: localImage("kerala-5.jpg"),
  pushkarFair: localImage("amber-fort-2.jpg"),
  hemisDance: localImage("sikkin-5.jpg"),
  navratriGarba: localImage("udaipur-5.jpg"),
  hornbillFestival: localImage("shillong-4.jpg"),
  indiaPalace: localImage("udaipur-4.jpg"),
  travelNature: localImage("meghalaya-1.jpg"),
  templeDetail: localImage("kashi-viswanath-2.jpg"),
  rajasthanStreet: localImage("udaipur-5.jpg"),
  indiaMarket: localImage("panjim-goa-7.jpg"),
  southTemple: localImage("south-india.jpg"),
  cityHeritage: localImage("pexels-abdus-samad-mahkri-1624305361-34201914.jpg"),
  himalaya: localImage("himalayan-view-9.jpg"),
  mountainVillage: localImage("kashmir-8.jpg"),
  kedarnath: localImage("himalayan-view-9.jpg"),
  brihadeeswarar: localImage("south-india.jpg"),
  meenakshi: localImage("meenakshi-temple-madurai-5.jpg"),
  konarkSun: localImage("pexels-debphotography-20371109.jpg"),
  kanchenjunga: localImage("sikkin-5.jpg"),
  hampiTemple: localImage("mp-2.jpg"),
  shoreTemple: localImage("rameswaram-ramanathaswamy-55.jpg"),
  indiaGate: localImage("india-gate.jpg"),
  hawaMahal: localImage("hawa-mahal-jaipur.jpg"),
  amberFort: localImage("amber-fort.jpg"),
  keralaBackwater: localImage("kerala-5.jpg"),
  munnarTea: localImage("munnar-6.jpg"),
  munnarHills: localImage("munnar-5.jpg"),
  varanasiGhat: localImage("varanasi-ghat-3.jpg"),
  goaBeach: localImage("goa-7.jpg"),
  darjeelingTea: localImage("darjelling-6.jpg"),
  kolkataVictoria: localImage("victoria-memorial-4.jpg"),
  mumbaiGateway: localImage("gateway-of-india-mumbai-7.jpg"),
  mumbaiMarine: localImage("marine-drive-7.jpg"),
  mahabalipuramTown: localImage("rameswaram-ramanathaswamy-55.jpg"),
  chennaiSkyline: localImage("kovalam-beach-6.jpg"),
  diwaliRangoli: localImage("south-india.jpg"),
  mysorePalace: localImage("mysore-palace-5.jpg"),
  udaipurPalace: localImage("udaipur-4.jpg"),
  meenakshiAerial: localImage("south-india.jpg"),
  tajMahal: localImage("taj-mahal.jpg"),
  tajMahalSunrise: localImage("taj-mahal-2.jpg"),
  tajMahalFramed: localImage("taj-mahal-3.jpg"),
  agraFort: localImage("agra-fort-red.jpg"),
  redFort: localImage("pexels-varan-6776755.jpg"),
  qutubMinar: localImage("india-gate.jpg"),
  mehrangarh: localImage("mp-1.jpg"),
  jaisalmerFort: localImage("amber-fort-2.jpg"),
  basilicaBomJesus: localImage("panjim-goa-7.jpg"),
  boudhanath: localImage("boudhanath-stupa-9.jpg"),
  phewaLake: localImage("phewa-lake-pokhara9.jpg"),
  chineseFishingNets: localImage("kochi-6.jpg"),
  ayodhyaTemple: localImage("ayodhaya-3.jpg"),
  ayodhyaGhat: localImage("ayodhya-ghat.jpg"),
  mathura: localImage("mathura-3.jpg"),
  premMandir: localImage("prem-mandir-vrindavan-3.jpg"),
  mahabodhiTemple: localImage("mahabodhi-temple-bodhgaya-4.jpg"),
  mahabodhiBuddha: localImage("mahabodhi-bodh-gaya-5.jpg"),
  nalanda: localImage("nalanda-bihar-4.jpg"),
  rameswaramCorridor: localImage("rameswaram-ramanathaswamy-5.jpg"),
  rameswaramBridge: localImage("rameswaram-ramanathaswamy-55.jpg"),
  kovalamBeach: localImage("kovalam-beach-6.jpg"),
  padmanabhaswamy: localImage("padmanabhaswamy-temple-trivandrum-6.jpg"),
  panjimGoa: localImage("panjim-goa-7.jpg"),
  mandoviRiver: localImage("mandovi-7.jpg"),
  dalLake: localImage("dal-lake-srinagar-8.jpg"),
  srinagarGarden: localImage("srinagar-8.jpg"),
  gulmarg: localImage("srinagar-gulmarg-8.jpg"),
  pahalgam: localImage("pahalgam-8.jpg"),
  kashmirLandscape: localImage("kashmir-8.jpg"),
  pashupatinath: localImage("pashupatinath-9.jpg"),
  kathmanduDurbar: localImage("kathmandu-9.jpg"),
  shillong: localImage("shillong-4.jpg"),
  mawlynnong: localImage("meghalaya-3.jpg"),
  rootBridge: localImage("meghalaya-2.jpg"),
  meghalayaMisty: localImage("meghalaya-1.jpg"),
  andamanAerial: localImage("andaman-1.jpg"),
  andamanCoast: localImage("andaman-2.jpg"),
  andamanBeach: localImage("andaman-3.jpg"),
  andamanCoral: localImage("andaman-4.jpg"),
  andamanTurtle: localImage("andaman-5.jpg"),
  statueUnity: localImage("gujrat-1.jpg"),
  ahmedabadHeritage: localImage("gujrat-2.jpg"),
  gujaratStepwell: localImage("gujrat-6.jpg"),
  mountAbu: localImage("mount-abu-3.jpg"),
  gwaliorFort: localImage("mp-1.jpg"),
  khajuraho: localImage("mp-2.jpg"),
  orchhaFallback: localImage("mp-4.jpg"),
  sanchiStupa: localImage("mp-3.jpg"),
  omkareshwar: localImage("mp5.jpg"),
};

const heroBannerImages = [
  images.tajMahal,
  images.gangaAartiVaranasi,
  images.meenakshiAerial,
  images.keralaBackwater,
  images.kanchenjunga,
  images.mumbaiGateway,
  images.boudhanath,
  images.jaipurHome,
  images.kolkataVictoria,
  images.goaBeach,
];

const destinationGalleries = {
  "delhi-agra": [images.tajMahal, images.redFort, images.agraFort, images.qutubMinar, images.indiaGate],
  "jaipur-rajasthan": [images.hawaMahal, images.amberFort, images.udaipurPalace, images.indiaPalace, images.rajasthanStreet],
  "varanasi-ayodhya": [images.gangaAartiVaranasi, images.varanasiGhat, images.templeDetail, images.ayodhyaGhat, images.mahabodhiBuddha],
  "kolkata-bodhgaya": [images.kolkataVictoria, images.mahabodhiBuddha, images.mahabodhiTemple, images.nalanda, images.mahabodhiBuddha],
  "south-india": [images.meenakshi, images.shoreTemple, images.brihadeeswarar, images.mysorePalace, images.chennaiSkyline],
  kerala: [images.keralaBackwater, images.munnarTea, images.chineseFishingNets, images.alleppey, images.kerala],
  "goa-mumbai": [images.goaBeach, images.basilicaBomJesus, images.mumbaiGateway, images.mumbaiMarine, images.panjimGoa],
  kashmir: [images.dalLake, images.srinagarGarden, images.gulmarg, images.pahalgam, images.kashmirLandscape],
  nepal: [images.boudhanath, images.pashupatinath, images.kathmanduDurbar, images.phewaLake, images.himalaya],
  "north-east": [images.shillong, images.mawlynnong, images.rootBridge, images.kanchenjunga, images.darjeelingTea],
  andaman: [images.andamanAerial, images.andamanCoral, images.andamanBeach, images.andamanBeach, images.andamanCoast],
  gujarat: [images.statueUnity, images.ahmedabadHeritage, images.mountAbu, images.udaipurPalace, images.gujaratStepwell],
  "mp-heritage": [images.gwaliorFort, images.khajuraho, images.orchhaFallback, images.sanchiStupa, images.omkareshwar],
};

const packageGalleries = {
  "golden-triangle-tour": [images.tajMahalSunrise, images.amberFort, images.hawaMahal, images.agraFort, images.indiaGate],
  "golden-triangle-varanasi-ayodhya": [images.tajMahal, images.gangaAartiVaranasi, images.ayodhyaTemple, images.amberFort, images.varanasiGhat],
  "rama-krishna-spiritual-tour": [images.varanasiGhat, images.mathura, images.premMandir, images.ayodhyaGhat, images.tajMahalFramed],
  "classic-spiritual-india-tour": [images.kolkataVictoria, images.mahabodhiTemple, images.nalanda, images.gangaAartiVaranasi, images.ayodhyaGhat],
  "grand-south-india-tour": [images.meenakshi, images.rameswaramCorridor, images.keralaBackwater, images.munnarHills, images.mysorePalace],
  "kerala-backwaters-hill-stations": [images.keralaBackwater, images.munnarTea, images.chineseFishingNets, images.kovalamBeach, images.padmanabhaswamy],
  "goa-mumbai-leisure-tour": [images.goaBeach, images.panjimGoa, images.mandoviRiver, images.mumbaiGateway, images.mumbaiMarine],
  "kashmir-paradise-tour": [images.dalLake, images.srinagarGarden, images.srinagarGarden, images.pahalgam, images.kashmirLandscape],
  "kathmandu-nepal-tour": [images.boudhanath, images.pashupatinath, images.kathmanduDurbar, images.phewaLake, images.himalaya],
  "north-east-india-tour": [images.shillong, images.mawlynnong, images.rootBridge, images.kanchenjunga, images.darjeelingTea],
  "andaman-nicobar-island-tour": [images.andamanCoral, images.andamanAerial, images.andamanCoast, images.andamanBeach, images.andamanTurtle],
  "gujarat-heritage-tour": [images.statueUnity, images.ahmedabadHeritage, images.mountAbu, images.udaipurPalace, images.gujaratStepwell],
  "mp-heritage-tour": [images.gwaliorFort, images.khajuraho, images.orchhaFallback, images.sanchiStupa, images.omkareshwar],
};

const journeyHeroGallery = [
  localImage("navdeep-singh-panwar-qtgj2nxqyy-unsplash.jpg"),
  images.meenakshiAerial,
  images.keralaBackwater,
  images.varanasiGhat,
  images.kanchenjunga,
  images.mumbai,
  images.kathmanduDurbar,
  images.goaBeach,
];

const seasonalHeroGallery = [
  images.holiColors,
  images.diwaliDiyas,
  images.gangaAartiVaranasi,
  images.durgaPuja,
  images.onamPookalam,
];

const destinations = [
  {
    id: "delhi-agra",
    country: "india",
    featured: true,
    image: images.tajMahal,
    nl: {
      title: "Delhi en Agra",
      short: "De klassieke entree tot India: hoofdstad, keizerlijke monumenten en de Taj Mahal.",
      overview: "Delhi en Agra geven reizigers meteen het gevoel van India: brede boulevards, oude markten, grote tempels, Mughal-erfgoed en natuurlijk de Taj Mahal. Deze route is warm, herkenbaar en ideaal als eerste kennismaking.",
      season: "Oktober tot maart",
      days: "3 tot 6 dagen",
      sights: ["India Gate", "Akshardham Temple", "Red Fort buitenaanzicht", "Taj Mahal", "Agra Fort"],
      experiences: ["Markten en monumenten in Delhi", "Taj Mahal met gidsassistentie", "Agra Fort en lokale bazaar"],
    },
    en: {
      title: "Delhi and Agra",
      short: "The classic gateway to India: capital city energy, imperial monuments and the Taj Mahal.",
      overview: "Delhi and Agra give travelers an immediate feeling for India: grand avenues, old markets, major temples, Mughal heritage and, of course, the Taj Mahal. It is a warm, memorable first chapter.",
      season: "October to March",
      days: "3 to 6 days",
      sights: ["India Gate", "Akshardham Temple", "Red Fort outside view", "Taj Mahal", "Agra Fort"],
      experiences: ["Delhi markets and monuments", "Taj Mahal with guide assistance", "Agra Fort and local bazaar"],
    },
  },
  {
    id: "jaipur-rajasthan",
    country: "india",
    featured: true,
    image: images.hawaMahal,
    nl: {
      title: "Jaipur en Rajasthan",
      short: "Roze stad, paleizen, Amber Fort en kleurrijke markten uit de vaste routes.",
      overview: "Jaipur brengt koninklijk India tot leven met Amber Fort, City Palace, Hawa Mahal en levendige bazaars. Binnen het aanbod vormt Rajasthan vooral de elegante erfgoedschakel tussen Delhi, Agra en West-India.",
      season: "Oktober tot maart",
      days: "1 tot 4 dagen",
      sights: ["Amber Fort", "City Palace", "Hawa Mahal", "Jantar Mantar", "Lokale markten"],
      experiences: ["Pink City sightseeing", "Amber Fort met gids", "Avondmarkt of Chokhi Dhani optioneel"],
    },
    en: {
      title: "Jaipur and Rajasthan",
      short: "Pink City palaces, Amber Fort and colorful markets from the fixed routes.",
      overview: "Jaipur brings royal India to life through Amber Fort, City Palace, Hawa Mahal and vibrant bazaars. In the line-up, Rajasthan is the graceful heritage link between Delhi, Agra and western India.",
      season: "October to March",
      days: "1 to 4 days",
      sights: ["Amber Fort", "City Palace", "Hawa Mahal", "Jantar Mantar", "Local markets"],
      experiences: ["Pink City sightseeing", "Amber Fort with a guide", "Evening market or optional Chokhi Dhani"],
    },
  },
  {
    id: "varanasi-ayodhya",
    country: "india",
    featured: true,
    image: images.gangaAartiVaranasi,
    nl: {
      title: "Varanasi en Ayodhya",
      short: "Ganga Aarti, Kashi Vishwanath Temple en Ram Mandir Darshan in een spirituele route.",
      overview: "Varanasi en Ayodhya zijn de spirituele hoogtepunten in meerdere pakketten. Reizigers beleven de Ganges bij zonsopkomst, de avondceremonie aan de ghats, Kashi Vishwanath Temple en Ram Mandir Darshan.",
      season: "Oktober tot maart",
      days: "2 tot 4 dagen",
      sights: ["Ganga Aarti", "Kashi Vishwanath Temple", "Sarnath", "Ram Mandir", "Saryu River Aarti"],
      experiences: ["Boottocht op de Ganges", "Temple darshan met respectvolle begeleiding", "Avondceremonies aan rivier en ghats"],
    },
    en: {
      title: "Varanasi and Ayodhya",
      short: "Ganga Aarti, Kashi Vishwanath Temple and Ram Mandir Darshan in a spiritual route.",
      overview: "Varanasi and Ayodhya are spiritual highlights in several packages. Travelers experience the Ganges at sunrise, the evening ceremony on the ghats, Kashi Vishwanath Temple and Ram Mandir Darshan.",
      season: "October to March",
      days: "2 to 4 days",
      sights: ["Ganga Aarti", "Kashi Vishwanath Temple", "Sarnath", "Ram Mandir", "Saryu River Aarti"],
      experiences: ["Boat ride on the Ganges", "Temple darshan with respectful guidance", "Evening ceremonies by river and ghats"],
    },
  },
  {
    id: "kolkata-bodhgaya",
    country: "india",
    featured: true,
    image: images.kolkataVictoria,
    nl: {
      title: "Kolkata, Patna en Bodhgaya",
      short: "Culturele monumenten, Boeddhistisch erfgoed en Oost-India binnen Classic Spiritual India.",
      overview: "Deze route verdiept de spirituele reis met Kolkata, Patna, Nalanda, Rajgir en Bodhgaya. Het combineert culturele bezienswaardigheden met de Mahabodhi Temple en belangrijke plekken uit Hindoeïstische en Boeddhistische tradities.",
      season: "Oktober tot maart",
      days: "4 tot 5 dagen",
      sights: ["Victoria Memorial", "Kali Mata Temple", "Patna Museum", "Nalanda ruins", "Mahabodhi Temple"],
      experiences: ["Kolkata city tour", "Village experience near Patna", "Bodhgaya temple visit"],
    },
    en: {
      title: "Kolkata, Patna and Bodhgaya",
      short: "Cultural landmarks, Buddhist heritage and Eastern India within Classic Spiritual India.",
      overview: "This route deepens the spiritual journey with Kolkata, Patna, Nalanda, Rajgir and Bodhgaya. It combines cultural landmarks with the Mahabodhi Temple and important Hindu and Buddhist traditions.",
      season: "October to March",
      days: "4 to 5 days",
      sights: ["Victoria Memorial", "Kali Mata Temple", "Patna Museum", "Nalanda ruins", "Mahabodhi Temple"],
      experiences: ["Kolkata city tour", "Village experience near Patna", "Bodhgaya temple visit"],
    },
  },
  {
    id: "south-india",
    country: "india",
    featured: true,
    image: images.meenakshi,
    nl: {
      title: "Grand South India",
      short: "Tamil Nadu, Kerala en Karnataka met tempels, hill stations, backwaters en paleizen.",
      overview: "Grand South India is rijk en afwisselend: Chennai, Mahabalipuram, Pondicherry, Madurai, Rameswaram, Kanyakumari, Kerala, Munnar, Ooty, Mysore en Bangalore vormen samen een lange, volle reis door Zuid-India.",
      season: "November tot maart",
      days: "9 tot 23 dagen",
      sights: ["Meenakshi Temple", "Rameswaram", "Kanyakumari", "Munnar tea plantations", "Mysore Palace"],
      experiences: ["Tempelroutes en kustplaatsen", "Houseboat en backwaters", "Hill stations en paleisbezoek"],
    },
    en: {
      title: "Grand South India",
      short: "Tamil Nadu, Kerala and Karnataka with temples, hill stations, backwaters and palaces.",
      overview: "Grand South India is rich and varied: Chennai, Mahabalipuram, Pondicherry, Madurai, Rameswaram, Kanyakumari, Kerala, Munnar, Ooty, Mysore and Bangalore create a generous long-form journey.",
      season: "November to March",
      days: "9 to 23 days",
      sights: ["Meenakshi Temple", "Rameswaram", "Kanyakumari", "Munnar tea plantations", "Mysore Palace"],
      experiences: ["Temple routes and coast", "Houseboat and backwaters", "Hill stations and palace visit"],
    },
  },
  {
    id: "kerala",
    country: "india",
    featured: true,
    image: images.keralaBackwater,
    nl: {
      title: "Kerala",
      short: "Backwaters, Munnar, Fort Kochi en Kovalam voor een zachte, groene reis.",
      overview: "Kerala voelt ontspannen, tropisch en gastvrij. De routes combineren Fort Kochi, Munnar, Alleppey houseboat, Kovalam en Trivandrum tot een vriendelijke reis met waterwegen, theeheuvels en kust.",
      season: "Oktober tot maart",
      days: "6 tot 9 dagen",
      sights: ["Fort Kochi", "Munnar tea gardens", "Alleppey houseboat", "Kovalam Beach", "Padmanabhaswamy Temple"],
      experiences: ["Backwater cruise", "Tea gardens and waterfalls", "Beach time and heritage walk"],
    },
    en: {
      title: "Kerala",
      short: "Backwaters, Munnar, Fort Kochi and Kovalam for a soft, green journey.",
      overview: "Kerala feels relaxed, tropical and welcoming. The routes combine Fort Kochi, Munnar, Alleppey houseboat, Kovalam and Trivandrum into a gentle journey of waterways, tea hills and coast.",
      season: "October to March",
      days: "6 to 9 days",
      sights: ["Fort Kochi", "Munnar tea gardens", "Alleppey houseboat", "Kovalam Beach", "Padmanabhaswamy Temple"],
      experiences: ["Backwater cruise", "Tea gardens and waterfalls", "Beach time and heritage walk"],
    },
  },
  {
    id: "goa-mumbai",
    country: "india",
    featured: true,
    image: images.mumbaiGateway,
    nl: {
      title: "Goa en Mumbai",
      short: "Stranden, Panjim, Mandovi River, Gateway of India en Marine Drive.",
      overview: "Goa en Mumbai geven de reis een ontspannen, energieke finale. Goa brengt stranden, Panjim en rivierbeleving; Mumbai voegt grote stadsenergie, koloniale architectuur, Marine Drive en de Gateway of India toe.",
      season: "November tot maart",
      days: "5 tot 10 dagen",
      sights: ["Calangute Beach", "Baga Beach", "Panjim", "Gateway of India", "Marine Drive"],
      experiences: ["Goa beach time", "Mandovi River boat ride", "Mumbai city sightseeing"],
    },
    en: {
      title: "Goa and Mumbai",
      short: "Beaches, Panjim, Mandovi River, Gateway of India and Marine Drive.",
      overview: "Goa and Mumbai bring a relaxed, energetic finale. Goa offers beaches, Panjim and river time; Mumbai adds big-city energy, colonial architecture, Marine Drive and the Gateway of India.",
      season: "November to March",
      days: "5 to 10 days",
      sights: ["Calangute Beach", "Baga Beach", "Panjim", "Gateway of India", "Marine Drive"],
      experiences: ["Goa beach time", "Mandovi River boat ride", "Mumbai city sightseeing"],
    },
  },
  {
    id: "kashmir",
    country: "india",
    featured: true,
    image: images.dalLake,
    nl: {
      title: "Kashmir",
      short: "Srinagar, Dal Lake, Mughal Gardens, Gulmarg en Pahalgam.",
      overview: "Kashmir is een zachte bergdroom: serene meren, tuinen, valleien en de klassieke Shikara-ervaring op Dal Lake. Het is ideaal voor reizigers die natuur, rust en Himalaya-sfeer zoeken.",
      season: "April tot oktober",
      days: "6 tot 9 dagen",
      sights: ["Dal Lake", "Mughal Gardens", "Nishat Bagh", "Gulmarg", "Pahalgam"],
      experiences: ["Shikara ride", "Mughal Gardens sightseeing", "Excursions to Gulmarg and Pahalgam"],
    },
    en: {
      title: "Kashmir",
      short: "Srinagar, Dal Lake, Mughal Gardens, Gulmarg and Pahalgam.",
      overview: "Kashmir is a soft mountain dream: serene lakes, gardens, valleys and the classic Shikara experience on Dal Lake. It is ideal for travelers seeking nature, quiet and Himalayan atmosphere.",
      season: "April to October",
      days: "6 to 9 days",
      sights: ["Dal Lake", "Mughal Gardens", "Nishat Bagh", "Gulmarg", "Pahalgam"],
      experiences: ["Shikara ride", "Mughal Gardens sightseeing", "Excursions to Gulmarg and Pahalgam"],
    },
  },
  {
    id: "nepal",
    country: "nepal",
    featured: true,
    image: images.boudhanath,
    nl: {
      title: "Kathmandu en Nepal",
      short: "Kathmandu Valley, Pashupatinath, Boudhanath, Durbar Square en Pokhara.",
      overview: "Nepal voegt spirituele charme en Himalaya-uitzicht toe aan de route. Kathmandu en Pokhara combineren tempels, stoepa's, pleinen, meren en berglandschap in een toegankelijke 09-daagse reis.",
      season: "Oktober tot april",
      days: "5 tot 9 dagen",
      sights: ["Pashupatinath Temple", "Boudhanath Stupa", "Durbar Square", "Phewa Lake", "Peace Pagoda"],
      experiences: ["Kathmandu heritage visits", "Pokhara lakeside stay", "Himalayan mountain views"],
    },
    en: {
      title: "Kathmandu and Nepal",
      short: "Kathmandu Valley, Pashupatinath, Boudhanath, Durbar Square and Pokhara.",
      overview: "Nepal adds spiritual charm and Himalayan views to the journey. Kathmandu and Pokhara combine temples, stupas, squares, lakes and mountain scenery in an accessible 09-day route.",
      season: "October to April",
      days: "5 to 9 days",
      sights: ["Pashupatinath Temple", "Boudhanath Stupa", "Durbar Square", "Phewa Lake", "Peace Pagoda"],
      experiences: ["Kathmandu heritage visits", "Pokhara lakeside stay", "Himalayan mountain views"],
    },
  },
  {
    id: "north-east",
    country: "india",
    featured: false,
    image: images.kanchenjunga,
    nl: {
      title: "North East India",
      short: "Shillong, Mawlynnong, Guwahati, Gangtok en Darjeeling.",
      overview: "North East India is groen, fris en minder voorspelbaar dan de klassieke routes. Het pakket combineert Meghalaya, Sikkim en Darjeeling met hill stations, dorpen, kloosters en Himalaya-uitzichten.",
      season: "Oktober tot april",
      days: "12 tot 16 dagen",
      sights: ["Shillong", "Mawlynnong Village", "Guwahati", "Gangtok", "Darjeeling"],
      experiences: ["Living Root Bridge region", "Gangtok monasteries", "Darjeeling Himalayan views"],
    },
    en: {
      title: "North East India",
      short: "Shillong, Mawlynnong, Guwahati, Gangtok and Darjeeling.",
      overview: "North East India is green, fresh and less predictable than the classic routes. The package combines Meghalaya, Sikkim and Darjeeling with hill stations, villages, monasteries and Himalayan views.",
      season: "October to April",
      days: "12 to 16 days",
      sights: ["Shillong", "Mawlynnong Village", "Guwahati", "Gangtok", "Darjeeling"],
      experiences: ["Living Root Bridge region", "Gangtok monasteries", "Darjeeling Himalayan views"],
    },
  },
  {
    id: "andaman",
    country: "india",
    featured: false,
    image: images.andamanAerial,
    nl: {
      title: "Andaman & Nicobar Islands",
      short: "Port Blair, Cellular Jail, stranddagen en eilandexcursies.",
      overview: "Andaman & Nicobar brengt een tropische pauze in het aanbod: turquoise water, witte stranden, Port Blair en Cellular Jail. De route blijft eenvoudig en ontspannen.",
      season: "Oktober tot april",
      days: "6 tot 9 dagen",
      sights: ["Port Blair", "Cellular Jail", "Light & Sound Show", "Island excursion", "Beach activities"],
      experiences: ["Cellular Jail visit", "Island excursion", "Beach relaxation"],
    },
    en: {
      title: "Andaman & Nicobar Islands",
      short: "Port Blair, Cellular Jail, beach days and island excursions.",
      overview: "Andaman & Nicobar adds a tropical pause to the line-up: turquoise water, white beaches, Port Blair and Cellular Jail. The route stays simple and relaxed.",
      season: "October to April",
      days: "6 to 9 days",
      sights: ["Port Blair", "Cellular Jail", "Light & Sound Show", "Island excursion", "Beach activities"],
      experiences: ["Cellular Jail visit", "Island excursion", "Beach relaxation"],
    },
  },
  {
    id: "gujarat",
    country: "india",
    featured: false,
    image: images.statueUnity,
    nl: {
      title: "Gujarat, Mount Abu en Udaipur",
      short: "Statue of Unity, Ahmedabad, Mount Abu en Udaipur royal palaces.",
      overview: "Deze erfgoedroute verbindt Gujarat met Mount Abu en Udaipur. De reis draait om de Statue of Unity, Ahmedabad, hill-station sfeer en de koninklijke paleizen van Udaipur.",
      season: "Oktober tot maart",
      days: "8 tot 12 dagen",
      sights: ["Statue of Unity", "Ahmedabad", "Mount Abu", "Udaipur City Palace", "Heritage walk"],
      experiences: ["Statue of Unity visit", "Ahmedabad heritage", "Udaipur palace sightseeing"],
    },
    en: {
      title: "Gujarat, Mount Abu and Udaipur",
      short: "Statue of Unity, Ahmedabad, Mount Abu and Udaipur royal palaces.",
      overview: "This heritage route links Gujarat with Mount Abu and Udaipur. The journey centers on the Statue of Unity, Ahmedabad, hill-station atmosphere and the royal palaces of Udaipur.",
      season: "October to March",
      days: "8 to 12 days",
      sights: ["Statue of Unity", "Ahmedabad", "Mount Abu", "Udaipur City Palace", "Heritage walk"],
      experiences: ["Statue of Unity visit", "Ahmedabad heritage", "Udaipur palace sightseeing"],
    },
  },
  {
    id: "mp-heritage",
    country: "india",
    featured: false,
    image: images.gwaliorFort,
    nl: {
      title: "MP Heritage",
      short: "Gwalior, Khajuraho, Orchha, Sanchi, Indore en Omkareshwar.",
      overview: "MP Heritage richt zich op de historische schatten van Centraal-India. De route is stevig, cultureel rijk en ideaal voor reizigers die UNESCO-tempels, oude steden, stoepa's en heilige plekken willen combineren.",
      season: "Oktober tot maart",
      days: "10 tot 14 dagen",
      sights: ["Gwalior", "Khajuraho temples", "Orchha", "Sanchi Stupa", "Omkareshwar"],
      experiences: ["Khajuraho temple visit", "Orchha heritage town", "Sanchi excursion"],
    },
    en: {
      title: "MP Heritage",
      short: "Gwalior, Khajuraho, Orchha, Sanchi, Indore and Omkareshwar.",
      overview: "MP Heritage focuses on Central India's historical treasures. The route is substantial, culturally rich and ideal for travelers who want UNESCO temples, old towns, stupas and sacred places together.",
      season: "October to March",
      days: "10 to 14 days",
      sights: ["Gwalior", "Khajuraho temples", "Orchha", "Sanchi Stupa", "Omkareshwar"],
      experiences: ["Khajuraho temple visit", "Orchha heritage town", "Sanchi excursion"],
    },
  },
];

const packages = [
  {
    id: "golden-triangle-tour",
    image: images.tajMahalSunrise,
    country: "india",
    duration: 9,
    durationLabel: "09 DAYS",
    budget: "comfort",
    theme: "culture",
    price: null,
    destinations: ["Delhi", "Jaipur", "Agra"],
    highlights: [
      "Guided sightseeing in Delhi, Jaipur and Agra",
      "Visit the Taj Mahal at Agra",
      "Explore Amber Fort and City Palace in Jaipur",
      "Cultural experience at local markets",
      "Private vehicle with professional driver",
    ],
    inclusions: ["Accommodation with breakfast", "Private air-conditioned vehicle", "English-speaking guide during sightseeing", "Airport transfers", "All applicable taxes"],
    exclusions: ["International flights", "Monument entry tickets", "Personal expenses & tips"],
    nl: {
      title: "GOLDEN TRIANGLE TOUR",
      short: "Discover India's most famous travel circuit covering Delhi, Jaipur and Agra.",
      overview: "Discover India’s most famous travel circuit covering Delhi, Jaipur and Agra. This journey introduces you to India’s royal heritage, magnificent architecture and vibrant culture, highlighted by a visit to the world-famous Taj Mahal.",
      route: ["Delhi", "Jaipur", "Agra", "Mathura", "Vrindavan", "Delhi"],
      itinerary: [
        { day: "Day 01", title: "Arrival in Delhi", summary: "Arrival at Delhi International Airport. Meet and greet followed by transfer to your hotel. Overnight stay in Delhi." },
        { day: "Day 02", title: "Delhi Sightseeing", summary: "After breakfast, enjoy a full-day guided tour of Old and New Delhi visiting India Gate, President House (drive past), Lotus Temple, Akshardham Temple and Red Fort (outside view). Evening free for shopping at Karol Bagh Market. Overnight stay in Delhi." },
        { day: "Day 03", title: "Delhi to Jaipur (275 km / 6 hrs)", summary: "Drive to Jaipur, known as the Pink City. Upon arrival, check in at the hotel. Evening optional visit to Chokhi Dhani ethnic village for cultural performances and traditional dinner. Overnight stay in Jaipur." },
        { day: "Day 04", title: "Jaipur Sightseeing", summary: "Full-day guided tour including City Palace, Hawa Mahal, Jantar Mantar and Amber Fort. Enjoy local market exploration in the evening. Overnight stay in Jaipur." },
        { day: "Day 05", title: "Jaipur to Agra via Fatehpur Sikri", summary: "Drive to Agra visiting Fatehpur Sikri en route, the former capital of Emperor Akbar. Evening at leisure or optional rickshaw ride in local market. Overnight stay in Agra." },
        { day: "Day 06", title: "Agra Sightseeing", summary: "Visit the magnificent Taj Mahal and Agra Fort with guide assistance. Overnight stay in Agra." },
        { day: "Day 07", title: "Agra – Mathura – Vrindavan – Delhi", summary: "Drive to Delhi visiting Mathura and Vrindavan, associated with Lord Krishna. Transfer to hotel upon arrival. Overnight stay in Delhi." },
        { day: "Day 08", title: "Delhi Leisure Day", summary: "Day free for independent activities or shopping. Overnight stay in Delhi." },
        { day: "Day 09", title: "Departure", summary: "Transfer to airport for onward flight." },
      ],
    },
    en: {
      title: "GOLDEN TRIANGLE TOUR",
      short: "Discover India's most famous travel circuit covering Delhi, Jaipur and Agra.",
      overview: "Discover India’s most famous travel circuit covering Delhi, Jaipur and Agra. This journey introduces you to India’s royal heritage, magnificent architecture and vibrant culture, highlighted by a visit to the world-famous Taj Mahal.",
      route: ["Delhi", "Jaipur", "Agra", "Mathura", "Vrindavan", "Delhi"],
      itinerary: [
        { day: "Day 01", title: "Arrival in Delhi", summary: "Arrival at Delhi International Airport. Meet and greet followed by transfer to your hotel. Overnight stay in Delhi." },
        { day: "Day 02", title: "Delhi Sightseeing", summary: "After breakfast, enjoy a full-day guided tour of Old and New Delhi visiting India Gate, President House (drive past), Lotus Temple, Akshardham Temple and Red Fort (outside view). Evening free for shopping at Karol Bagh Market. Overnight stay in Delhi." },
        { day: "Day 03", title: "Delhi to Jaipur (275 km / 6 hrs)", summary: "Drive to Jaipur, known as the Pink City. Upon arrival, check in at the hotel. Evening optional visit to Chokhi Dhani ethnic village for cultural performances and traditional dinner. Overnight stay in Jaipur." },
        { day: "Day 04", title: "Jaipur Sightseeing", summary: "Full-day guided tour including City Palace, Hawa Mahal, Jantar Mantar and Amber Fort. Enjoy local market exploration in the evening. Overnight stay in Jaipur." },
        { day: "Day 05", title: "Jaipur to Agra via Fatehpur Sikri", summary: "Drive to Agra visiting Fatehpur Sikri en route, the former capital of Emperor Akbar. Evening at leisure or optional rickshaw ride in local market. Overnight stay in Agra." },
        { day: "Day 06", title: "Agra Sightseeing", summary: "Visit the magnificent Taj Mahal and Agra Fort with guide assistance. Overnight stay in Agra." },
        { day: "Day 07", title: "Agra – Mathura – Vrindavan – Delhi", summary: "Drive to Delhi visiting Mathura and Vrindavan, associated with Lord Krishna. Transfer to hotel upon arrival. Overnight stay in Delhi." },
        { day: "Day 08", title: "Delhi Leisure Day", summary: "Day free for independent activities or shopping. Overnight stay in Delhi." },
        { day: "Day 09", title: "Departure", summary: "Transfer to airport for onward flight." },
      ],
    },
  },
  {
    id: "golden-triangle-varanasi-ayodhya",
    image: images.tajMahal,
    country: "india",
    duration: 9,
    durationLabel: "09 DAYS",
    budget: "comfort",
    theme: "spirituality",
    price: null,
    destinations: ["Delhi", "Mathura", "Vrindavan", "Agra", "Jaipur", "Varanasi", "Ayodhya"],
    highlights: ["Taj Mahal visit", "Ganga Aarti ceremony in Varanasi", "Kashi Vishwanath Temple darshan", "Ram Mandir visit in Ayodhya"],
    nl: {
      title: "GOLDEN TRIANGLE + VARANASI + AYODHYA TOUR",
      short: "An inspiring journey combining India's historical landmarks with its most sacred spiritual destinations including Varanasi and Ayodhya.",
      overview: "An inspiring journey combining India’s historical landmarks with its most sacred spiritual destinations including Varanasi and Ayodhya.",
      route: ["Delhi", "Mathura", "Vrindavan", "Agra", "Jaipur", "Varanasi", "Ayodhya", "Delhi"],
      itinerary: [
        { day: "Day 01", title: "Arrival Delhi", summary: "Arrival and transfer to hotel." },
        { day: "Day 02", title: "Delhi Sightseeing", summary: "Full-day guided city tour of Delhi. Overnight stay." },
        { day: "Day 03", title: "Delhi – Mathura – Vrindavan – Agra", summary: "Drive to Agra visiting sacred towns of Mathura and Vrindavan. Overnight stay in Agra." },
        { day: "Day 04", title: "Agra – Fatehpur Sikri – Jaipur", summary: "Morning Taj Mahal visit followed by drive to Jaipur via Fatehpur Sikri." },
        { day: "Day 05", title: "Jaipur Sightseeing", summary: "Explore Amber Fort, City Palace, Hawa Mahal and Jantar Mantar." },
        { day: "Day 06", title: "Jaipur to Varanasi (Flight)", summary: "Transfer to airport for flight to Varanasi. Evening attend Ganga Aarti ceremony." },
        { day: "Day 07", title: "Varanasi – Ayodhya", summary: "Morning boat ride on River Ganges and visit Kashi Vishwanath Temple. Later drive to Ayodhya for Ram Mandir darshan." },
        { day: "Day 08", title: "Ayodhya to Delhi (Flight)", summary: "Fly to Delhi. Half-day city orientation tour. Overnight stay." },
        { day: "Day 09", title: "Departure", summary: "Transfer to airport." },
      ],
    },
    en: {
      title: "GOLDEN TRIANGLE + VARANASI + AYODHYA TOUR",
      short: "An inspiring journey combining India's historical landmarks with its most sacred spiritual destinations including Varanasi and Ayodhya.",
      overview: "An inspiring journey combining India’s historical landmarks with its most sacred spiritual destinations including Varanasi and Ayodhya.",
      route: ["Delhi", "Mathura", "Vrindavan", "Agra", "Jaipur", "Varanasi", "Ayodhya", "Delhi"],
      itinerary: [
        { day: "Day 01", title: "Arrival Delhi", summary: "Arrival and transfer to hotel." },
        { day: "Day 02", title: "Delhi Sightseeing", summary: "Full-day guided city tour of Delhi. Overnight stay." },
        { day: "Day 03", title: "Delhi – Mathura – Vrindavan – Agra", summary: "Drive to Agra visiting sacred towns of Mathura and Vrindavan. Overnight stay in Agra." },
        { day: "Day 04", title: "Agra – Fatehpur Sikri – Jaipur", summary: "Morning Taj Mahal visit followed by drive to Jaipur via Fatehpur Sikri." },
        { day: "Day 05", title: "Jaipur Sightseeing", summary: "Explore Amber Fort, City Palace, Hawa Mahal and Jantar Mantar." },
        { day: "Day 06", title: "Jaipur to Varanasi (Flight)", summary: "Transfer to airport for flight to Varanasi. Evening attend Ganga Aarti ceremony." },
        { day: "Day 07", title: "Varanasi – Ayodhya", summary: "Morning boat ride on River Ganges and visit Kashi Vishwanath Temple. Later drive to Ayodhya for Ram Mandir darshan." },
        { day: "Day 08", title: "Ayodhya to Delhi (Flight)", summary: "Fly to Delhi. Half-day city orientation tour. Overnight stay." },
        { day: "Day 09", title: "Departure", summary: "Transfer to airport." },
      ],
    },
  },
  {
    id: "rama-krishna-spiritual-tour",
    image: images.varanasiGhat,
    country: "india",
    duration: 9,
    durationLabel: "09 DAYS",
    budget: "comfort",
    theme: "spirituality",
    price: null,
    destinations: ["Delhi", "Vrindavan", "Mathura", "Agra", "Jaipur", "Varanasi", "Ayodhya"],
    highlights: ["Taj Mahal visit", "Vrindavan & Mathura temples", "Varanasi Ganga Aarti", "Ayodhya Ram Mandir Darshan"],
    nl: {
      title: "RAMA KRISHNA SPIRITUAL TOUR",
      short: "A deeply spiritual journey covering India's most sacred Hindu pilgrimage destinations associated with Lord Rama and Lord Krishna.",
      overview: "A deeply spiritual journey covering India’s most sacred Hindu pilgrimage destinations associated with Lord Rama and Lord Krishna.",
      route: ["Delhi", "Vrindavan", "Mathura", "Agra", "Jaipur", "Varanasi", "Ayodhya", "Delhi"],
      itinerary: [
        { day: "Day 01", title: "Arrival Delhi", summary: "Airport transfer and hotel check-in." },
        { day: "Day 02", title: "Delhi Sightseeing", summary: "Guided exploration of major historical monuments." },
        { day: "Day 03", title: "Delhi – Vrindavan – Mathura – Agra", summary: "Visit Krishna birthplaces and continue to Agra." },
        { day: "Day 04", title: "Agra – Jaipur", summary: "Visit Taj Mahal and continue to Jaipur." },
        { day: "Day 05", title: "Jaipur Sightseeing", summary: "Full-day exploration of Pink City attractions." },
        { day: "Day 06", title: "Jaipur to Varanasi", summary: "Flight to Varanasi. Evening Ganga Aarti experience." },
        { day: "Day 07", title: "Varanasi – Ayodhya", summary: "Temple visits followed by drive to Ayodhya." },
        { day: "Day 08", title: "Ayodhya – Delhi", summary: "Flight back to Delhi." },
        { day: "Day 09", title: "Departure", summary: "Departure." },
      ],
    },
    en: {
      title: "RAMA KRISHNA SPIRITUAL TOUR",
      short: "A deeply spiritual journey covering India's most sacred Hindu pilgrimage destinations associated with Lord Rama and Lord Krishna.",
      overview: "A deeply spiritual journey covering India’s most sacred Hindu pilgrimage destinations associated with Lord Rama and Lord Krishna.",
      route: ["Delhi", "Vrindavan", "Mathura", "Agra", "Jaipur", "Varanasi", "Ayodhya", "Delhi"],
      itinerary: [
        { day: "Day 01", title: "Arrival Delhi", summary: "Airport transfer and hotel check-in." },
        { day: "Day 02", title: "Delhi Sightseeing", summary: "Guided exploration of major historical monuments." },
        { day: "Day 03", title: "Delhi – Vrindavan – Mathura – Agra", summary: "Visit Krishna birthplaces and continue to Agra." },
        { day: "Day 04", title: "Agra – Jaipur", summary: "Visit Taj Mahal and continue to Jaipur." },
        { day: "Day 05", title: "Jaipur Sightseeing", summary: "Full-day exploration of Pink City attractions." },
        { day: "Day 06", title: "Jaipur to Varanasi", summary: "Flight to Varanasi. Evening Ganga Aarti experience." },
        { day: "Day 07", title: "Varanasi – Ayodhya", summary: "Temple visits followed by drive to Ayodhya." },
        { day: "Day 08", title: "Ayodhya – Delhi", summary: "Flight back to Delhi." },
        { day: "Day 09", title: "Departure", summary: "Departure." },
      ],
    },
  },
  {
    id: "classic-spiritual-india-tour",
    image: images.kolkataVictoria,
    country: "india",
    duration: 10,
    durationLabel: "10 DAYS",
    budget: "comfort",
    theme: "spirituality",
    price: null,
    destinations: ["Delhi", "Kolkata", "Patna", "Bodhgaya", "Varanasi", "Ayodhya"],
    highlights: ["Visit Kolkata cultural landmarks", "Bodhgaya – place of Buddha’s enlightenment", "Ganga Aarti ceremony in Varanasi", "Ram Mandir Darshan in Ayodhya", "Spiritual experiences with comfortable travel"],
    inclusions: ["Accommodation with daily breakfast", "Private air-conditioned vehicle", "English speaking guides", "Airport transfers", "All applicable taxes"],
    exclusions: ["International airfare", "Monument entry tickets", "Personal expenses", "Tips & gratuities"],
    nl: {
      title: "CLASSIC SPIRITUAL INDIA TOUR",
      short: "This spiritual journey explores sacred destinations connected with Hindu and Buddhist traditions.",
      overview: "This spiritual journey explores some of India’s most sacred destinations connected with Hindu and Buddhist traditions. The tour combines pilgrimage sites, cultural heritage and spiritual experiences across Eastern and Northern India.",
      route: ["Kolkata", "Patna", "Bodhgaya", "Varanasi", "Ayodhya", "Delhi"],
      itinerary: [
        { day: "Day 01", title: "Arrival in Delhi", summary: "Arrival at Delhi International Airport. Meet and greet followed by transfer to hotel. Overnight stay in Delhi." },
        { day: "Day 02", title: "Delhi to Kolkata (Flight)", summary: "After breakfast, transfer to airport for flight to Kolkata. Upon arrival, transfer to hotel. Evening free for leisure or local market visit. Overnight stay in Kolkata." },
        { day: "Day 03", title: "Kolkata Sightseeing", summary: "Full-day city tour visiting Victoria Memorial, Kali Mata Temple, Ganga Ghats and Vivekananda Memorial. Overnight stay in Kolkata." },
        { day: "Day 04", title: "Kolkata to Patna (Flight)", summary: "Fly to Patna. After hotel check-in, afternoon sightseeing including Gandhi Maidan, Patna Museum, Gandhi Setu Bridge and village experience tour. Overnight stay in Patna." },
        { day: "Day 05", title: "Patna – Nalanda – Rajgir – Bodhgaya", summary: "After breakfast, drive to Bodhgaya visiting Nalanda University ruins and Rajgir historical sites. Arrival in Bodhgaya and hotel check-in. Overnight stay." },
        { day: "Day 06", title: "Bodhgaya to Varanasi", summary: "Morning visit Mahabodhi Temple complex. Later drive to Varanasi. Evening attend the famous Ganga Aarti ceremony at the ghats. Overnight stay in Varanasi." },
        { day: "Day 07", title: "Varanasi Sightseeing", summary: "Early morning boat ride on River Ganges followed by Kashi Vishwanath Temple Darshan, Sarnath visit and local market exploration. Overnight stay in Varanasi." },
        { day: "Day 08", title: "Varanasi to Ayodhya", summary: "Drive to Ayodhya. Upon arrival, Ram Mandir Darshan and Evening Aarti at Saryu River. Overnight stay in Ayodhya." },
        { day: "Day 09", title: "Ayodhya to Delhi (Flight)", summary: "Transfer to airport for flight to Delhi. Arrival and transfer to hotel. Evening free for shopping or relaxation." },
        { day: "Day 10", title: "Departure from Delhi", summary: "Transfer to airport for onward international flight." },
      ],
    },
    en: {
      title: "CLASSIC SPIRITUAL INDIA TOUR",
      short: "This spiritual journey explores sacred destinations connected with Hindu and Buddhist traditions.",
      overview: "This spiritual journey explores some of India’s most sacred destinations connected with Hindu and Buddhist traditions. The tour combines pilgrimage sites, cultural heritage and spiritual experiences across Eastern and Northern India.",
      route: ["Kolkata", "Patna", "Bodhgaya", "Varanasi", "Ayodhya", "Delhi"],
      itinerary: [
        { day: "Day 01", title: "Arrival in Delhi", summary: "Arrival at Delhi International Airport. Meet and greet followed by transfer to hotel. Overnight stay in Delhi." },
        { day: "Day 02", title: "Delhi to Kolkata (Flight)", summary: "After breakfast, transfer to airport for flight to Kolkata. Upon arrival, transfer to hotel. Evening free for leisure or local market visit. Overnight stay in Kolkata." },
        { day: "Day 03", title: "Kolkata Sightseeing", summary: "Full-day city tour visiting Victoria Memorial, Kali Mata Temple, Ganga Ghats and Vivekananda Memorial. Overnight stay in Kolkata." },
        { day: "Day 04", title: "Kolkata to Patna (Flight)", summary: "Fly to Patna. After hotel check-in, afternoon sightseeing including Gandhi Maidan, Patna Museum, Gandhi Setu Bridge and village experience tour. Overnight stay in Patna." },
        { day: "Day 05", title: "Patna – Nalanda – Rajgir – Bodhgaya", summary: "After breakfast, drive to Bodhgaya visiting Nalanda University ruins and Rajgir historical sites. Arrival in Bodhgaya and hotel check-in. Overnight stay." },
        { day: "Day 06", title: "Bodhgaya to Varanasi", summary: "Morning visit Mahabodhi Temple complex. Later drive to Varanasi. Evening attend the famous Ganga Aarti ceremony at the ghats. Overnight stay in Varanasi." },
        { day: "Day 07", title: "Varanasi Sightseeing", summary: "Early morning boat ride on River Ganges followed by Kashi Vishwanath Temple Darshan, Sarnath visit and local market exploration. Overnight stay in Varanasi." },
        { day: "Day 08", title: "Varanasi to Ayodhya", summary: "Drive to Ayodhya. Upon arrival, Ram Mandir Darshan and Evening Aarti at Saryu River. Overnight stay in Ayodhya." },
        { day: "Day 09", title: "Ayodhya to Delhi (Flight)", summary: "Transfer to airport for flight to Delhi. Arrival and transfer to hotel. Evening free for shopping or relaxation." },
        { day: "Day 10", title: "Departure from Delhi", summary: "Transfer to airport for onward international flight." },
      ],
    },
  },
  {
    id: "grand-south-india-tour",
    image: images.meenakshi,
    country: "india",
    duration: 23,
    durationLabel: "23 DAYS",
    budget: "comfort",
    theme: "culture",
    price: null,
    destinations: ["Delhi", "Chennai", "Pondicherry", "Madurai", "Rameswaram", "Kanyakumari", "Kovalam", "Alleppey", "Cochin", "Munnar", "Coimbatore", "Ooty", "Mysore", "Bangalore"],
    highlights: ["Meenakshi Temple in Madurai", "Rameswaram Jyotirlinga Temple", "Kanyakumari – Southernmost tip of India", "Kerala Backwaters Houseboat experience", "Tea plantations in Munnar", "Mysore Palace & Bangalore city tour"],
    nl: {
      title: "GRAND SOUTH INDIA TOUR",
      short: "Explore the cultural and natural beauty of South India covering Tamil Nadu, Kerala and Karnataka.",
      overview: "Explore the cultural and natural beauty of South India covering Tamil Nadu, Kerala and Karnataka. This journey combines temples, hill stations, backwaters, beaches and heritage cities.",
      route: ["Delhi", "Chennai", "Pondicherry", "Madurai", "Rameswaram", "Kanyakumari", "Kovalam", "Alleppey", "Cochin", "Munnar", "Coimbatore", "Ooty", "Mysore", "Bangalore", "Delhi"],
      itinerary: [
        { day: "Day 01", title: "Arrival in Delhi", summary: "Arrival and transfer to hotel. Overnight stay in Delhi." },
        { day: "Day 02", title: "Delhi to Chennai (Flight)", summary: "Transfer to airport for flight to Chennai. Overnight stay in Chennai." },
        { day: "Day 03", title: "Chennai Sightseeing", summary: "Visit Kapaleeshwarar Temple, Government Museum and Marina Beach." },
        { day: "Day 04", title: "Chennai – Mahabalipuram – Pondicherry", summary: "Drive to Pondicherry visiting Mahabalipuram temples en route." },
        { day: "Day 05", title: "Pondicherry – Thanjavur – Madurai", summary: "Drive to Madurai via Thanjavur (Brihadeeswara Temple). Overnight stay in Madurai." },
        { day: "Day 06", title: "Madurai Sightseeing", summary: "Visit Meenakshi Temple, Thirumalai Palace and Gandhi Museum." },
        { day: "Day 07", title: "Madurai – Rameswaram", summary: "Drive to Rameswaram. Visit Ramanathaswamy Temple." },
        { day: "Day 08", title: "Rameswaram – Kanyakumari", summary: "Drive to Kanyakumari. Visit Vivekananda Rock Memorial." },
        { day: "Day 09", title: "Kanyakumari – Kovalam", summary: "Drive to Kovalam. Evening free for relaxation at the beach." },
        { day: "Day 10", title: "Kovalam – Trivandrum – Kovalam", summary: "Visit Padmanabhaswamy Temple and city highlights." },
        { day: "Day 11", title: "Kovalam – Alleppey", summary: "Drive to Alleppey. Check-in to houseboat for backwater cruise." },
        { day: "Day 12", title: "Alleppey – Cochin", summary: "Drive to Cochin. Evening cultural show (optional)." },
        { day: "Day 13", title: "Cochin Sightseeing", summary: "Visit Fort Kochi, Chinese Fishing Nets and local markets." },
        { day: "Day 14", title: "Cochin – Munnar", summary: "Drive to Munnar hill station." },
        { day: "Day 15", title: "Munnar Sightseeing", summary: "Visit tea plantations and scenic viewpoints." },
        { day: "Day 16", title: "Munnar – Coimbatore", summary: "Drive to Coimbatore. Visit Adiyogi Shiva Statue." },
        { day: "Day 17", title: "Coimbatore – Ooty", summary: "Drive to Ooty hill station." },
        { day: "Day 18", title: "Ooty – Mysore", summary: "Drive to Mysore. Evening city orientation." },
        { day: "Day 19", title: "Mysore Sightseeing", summary: "Visit Mysore Palace and Brindavan Gardens." },
        { day: "Day 20", title: "Mysore – Bangalore", summary: "Drive to Bangalore." },
        { day: "Day 21", title: "Bangalore Sightseeing", summary: "Visit Lalbagh Garden, ISKCON Temple and city landmarks." },
        { day: "Day 22", title: "Bangalore – Delhi (Flight)", summary: "Fly back to Delhi. Overnight stay." },
        { day: "Day 23", title: "Departure", summary: "Transfer to airport." },
      ],
    },
    en: {
      title: "GRAND SOUTH INDIA TOUR",
      short: "Explore the cultural and natural beauty of South India covering Tamil Nadu, Kerala and Karnataka.",
      overview: "Explore the cultural and natural beauty of South India covering Tamil Nadu, Kerala and Karnataka. This journey combines temples, hill stations, backwaters, beaches and heritage cities.",
      route: ["Delhi", "Chennai", "Pondicherry", "Madurai", "Rameswaram", "Kanyakumari", "Kovalam", "Alleppey", "Cochin", "Munnar", "Coimbatore", "Ooty", "Mysore", "Bangalore", "Delhi"],
      itinerary: [
        { day: "Day 01", title: "Arrival in Delhi", summary: "Arrival and transfer to hotel. Overnight stay in Delhi." },
        { day: "Day 02", title: "Delhi to Chennai (Flight)", summary: "Transfer to airport for flight to Chennai. Overnight stay in Chennai." },
        { day: "Day 03", title: "Chennai Sightseeing", summary: "Visit Kapaleeshwarar Temple, Government Museum and Marina Beach." },
        { day: "Day 04", title: "Chennai – Mahabalipuram – Pondicherry", summary: "Drive to Pondicherry visiting Mahabalipuram temples en route." },
        { day: "Day 05", title: "Pondicherry – Thanjavur – Madurai", summary: "Drive to Madurai via Thanjavur (Brihadeeswara Temple). Overnight stay in Madurai." },
        { day: "Day 06", title: "Madurai Sightseeing", summary: "Visit Meenakshi Temple, Thirumalai Palace and Gandhi Museum." },
        { day: "Day 07", title: "Madurai – Rameswaram", summary: "Drive to Rameswaram. Visit Ramanathaswamy Temple." },
        { day: "Day 08", title: "Rameswaram – Kanyakumari", summary: "Drive to Kanyakumari. Visit Vivekananda Rock Memorial." },
        { day: "Day 09", title: "Kanyakumari – Kovalam", summary: "Drive to Kovalam. Evening free for relaxation at the beach." },
        { day: "Day 10", title: "Kovalam – Trivandrum – Kovalam", summary: "Visit Padmanabhaswamy Temple and city highlights." },
        { day: "Day 11", title: "Kovalam – Alleppey", summary: "Drive to Alleppey. Check-in to houseboat for backwater cruise." },
        { day: "Day 12", title: "Alleppey – Cochin", summary: "Drive to Cochin. Evening cultural show (optional)." },
        { day: "Day 13", title: "Cochin Sightseeing", summary: "Visit Fort Kochi, Chinese Fishing Nets and local markets." },
        { day: "Day 14", title: "Cochin – Munnar", summary: "Drive to Munnar hill station." },
        { day: "Day 15", title: "Munnar Sightseeing", summary: "Visit tea plantations and scenic viewpoints." },
        { day: "Day 16", title: "Munnar – Coimbatore", summary: "Drive to Coimbatore. Visit Adiyogi Shiva Statue." },
        { day: "Day 17", title: "Coimbatore – Ooty", summary: "Drive to Ooty hill station." },
        { day: "Day 18", title: "Ooty – Mysore", summary: "Drive to Mysore. Evening city orientation." },
        { day: "Day 19", title: "Mysore Sightseeing", summary: "Visit Mysore Palace and Brindavan Gardens." },
        { day: "Day 20", title: "Mysore – Bangalore", summary: "Drive to Bangalore." },
        { day: "Day 21", title: "Bangalore Sightseeing", summary: "Visit Lalbagh Garden, ISKCON Temple and city landmarks." },
        { day: "Day 22", title: "Bangalore – Delhi (Flight)", summary: "Fly back to Delhi. Overnight stay." },
        { day: "Day 23", title: "Departure", summary: "Transfer to airport." },
      ],
    },
  },
  {
    id: "kerala-backwaters-hill-stations",
    image: images.keralaBackwater,
    country: "india",
    duration: 9,
    durationLabel: "09 DAYS",
    budget: "comfort",
    theme: "wellness",
    price: null,
    destinations: ["Cochin", "Munnar", "Alleppey", "Kovalam", "Trivandrum"],
    highlights: ["Kovalam Beach", "Alleppey Houseboat", "Fort Kochi heritage walk", "Munnar tea gardens"],
    nl: {
      title: "KERALA BACKWATERS & HILL STATIONS",
      short: "A relaxing journey through Kerala's scenic landscapes including beaches, backwaters and tea plantations.",
      overview: "A relaxing journey through Kerala’s scenic landscapes including beaches, backwaters and tea plantations.",
      route: ["Cochin", "Munnar", "Alleppey", "Kovalam", "Trivandrum", "Cochin"],
      itinerary: [
        { day: "Day 01", title: "Arrival Cochin", summary: "Transfer to hotel." },
        { day: "Day 02", title: "Cochin Sightseeing", summary: "Visit Fort Kochi and cultural attractions." },
        { day: "Day 03", title: "Cochin – Munnar", summary: "Drive to Munnar hill station." },
        { day: "Day 04", title: "Munnar Sightseeing", summary: "Tea gardens and waterfalls visit." },
        { day: "Day 05", title: "Munnar – Alleppey", summary: "Drive to Alleppey. Check-in to houseboat." },
        { day: "Day 06", title: "Alleppey – Kovalam", summary: "Drive to Kovalam beach." },
        { day: "Day 07", title: "Kovalam – Trivandrum – Kovalam", summary: "City visit including Padmanabhaswamy Temple." },
        { day: "Day 08", title: "Kovalam – Cochin", summary: "Drive back to Cochin." },
        { day: "Day 09", title: "Departure", summary: "Departure." },
      ],
    },
    en: {
      title: "KERALA BACKWATERS & HILL STATIONS",
      short: "A relaxing journey through Kerala's scenic landscapes including beaches, backwaters and tea plantations.",
      overview: "A relaxing journey through Kerala’s scenic landscapes including beaches, backwaters and tea plantations.",
      route: ["Cochin", "Munnar", "Alleppey", "Kovalam", "Trivandrum", "Cochin"],
      itinerary: [
        { day: "Day 01", title: "Arrival Cochin", summary: "Transfer to hotel." },
        { day: "Day 02", title: "Cochin Sightseeing", summary: "Visit Fort Kochi and cultural attractions." },
        { day: "Day 03", title: "Cochin – Munnar", summary: "Drive to Munnar hill station." },
        { day: "Day 04", title: "Munnar Sightseeing", summary: "Tea gardens and waterfalls visit." },
        { day: "Day 05", title: "Munnar – Alleppey", summary: "Drive to Alleppey. Check-in to houseboat." },
        { day: "Day 06", title: "Alleppey – Kovalam", summary: "Drive to Kovalam beach." },
        { day: "Day 07", title: "Kovalam – Trivandrum – Kovalam", summary: "City visit including Padmanabhaswamy Temple." },
        { day: "Day 08", title: "Kovalam – Cochin", summary: "Drive back to Cochin." },
        { day: "Day 09", title: "Departure", summary: "Departure." },
      ],
    },
  },
  {
    id: "goa-mumbai-leisure-tour",
    image: images.goaBeach,
    country: "india",
    duration: 10,
    durationLabel: "10 DAYS",
    budget: "comfort",
    theme: "leisure",
    price: null,
    destinations: ["Delhi", "Goa", "Mumbai"],
    highlights: ["Goa beaches (Calangute & Baga)", "Mandovi River boat ride", "Gateway of India", "Marine Drive"],
    nl: {
      title: "GOA & MUMBAI LEISURE TOUR",
      short: "A perfect combination of beaches, vibrant nightlife and historic city experiences.",
      overview: "A perfect combination of beaches, vibrant nightlife and historic city experiences.",
      route: ["Delhi", "Goa", "Mumbai", "Delhi"],
      itinerary: [
        { day: "Day 01", title: "Arrival Delhi", summary: "Arrival Delhi." },
        { day: "Day 02", title: "Delhi to Goa (Flight)", summary: "Transfer to hotel." },
        { day: "Day 03", title: "Goa Sightseeing", summary: "Visit North & South Goa beaches and Panjim." },
        { day: "Day 04", title: "Leisure in Goa", summary: "Leisure in Goa." },
        { day: "Day 05", title: "Goa to Mumbai (Flight)", summary: "Transfer to hotel." },
        { day: "Day 06", title: "Mumbai Sightseeing", summary: "Visit Gateway of India, Marine Drive and Bollywood houses (outside view)." },
        { day: "Day 07", title: "Mumbai Leisure Day", summary: "Mumbai Leisure Day." },
        { day: "Day 08", title: "Mumbai to Delhi (Flight)", summary: "Mumbai to Delhi (Flight)." },
        { day: "Day 09", title: "Delhi Sightseeing", summary: "Delhi Sightseeing." },
        { day: "Day 10", title: "Departure", summary: "Departure." },
      ],
    },
    en: {
      title: "GOA & MUMBAI LEISURE TOUR",
      short: "A perfect combination of beaches, vibrant nightlife and historic city experiences.",
      overview: "A perfect combination of beaches, vibrant nightlife and historic city experiences.",
      route: ["Delhi", "Goa", "Mumbai", "Delhi"],
      itinerary: [
        { day: "Day 01", title: "Arrival Delhi", summary: "Arrival Delhi." },
        { day: "Day 02", title: "Delhi to Goa (Flight)", summary: "Transfer to hotel." },
        { day: "Day 03", title: "Goa Sightseeing", summary: "Visit North & South Goa beaches and Panjim." },
        { day: "Day 04", title: "Leisure in Goa", summary: "Leisure in Goa." },
        { day: "Day 05", title: "Goa to Mumbai (Flight)", summary: "Transfer to hotel." },
        { day: "Day 06", title: "Mumbai Sightseeing", summary: "Visit Gateway of India, Marine Drive and Bollywood houses (outside view)." },
        { day: "Day 07", title: "Mumbai Leisure Day", summary: "Mumbai Leisure Day." },
        { day: "Day 08", title: "Mumbai to Delhi (Flight)", summary: "Mumbai to Delhi (Flight)." },
        { day: "Day 09", title: "Delhi Sightseeing", summary: "Delhi Sightseeing." },
        { day: "Day 10", title: "Departure", summary: "Departure." },
      ],
    },
  },
  {
    id: "kashmir-paradise-tour",
    image: images.dalLake,
    country: "india",
    duration: 9,
    durationLabel: "09 DAYS",
    budget: "comfort",
    theme: "nature",
    price: null,
    destinations: ["Delhi", "Srinagar", "Gulmarg", "Pahalgam"],
    highlights: ["Shikara ride on Dal Lake", "Excursion to Gulmarg & Pahalgam", "Mughal Gardens visit", "Himalayan scenic beauty"],
    nl: {
      title: "KASHMIR PARADISE TOUR",
      short: "Experience the breathtaking beauty of Kashmir, often called Paradise on Earth.",
      overview: "Experience the breathtaking beauty of Kashmir, often called Paradise on Earth. Enjoy serene lakes, mountain landscapes and traditional Kashmiri culture.",
      route: ["Delhi", "Srinagar", "Gulmarg", "Pahalgam", "Delhi"],
      itinerary: [
        { day: "Day 01", title: "Arrival Delhi", summary: "Arrival and transfer to hotel. Overnight stay in Delhi." },
        { day: "Day 02", title: "Delhi to Srinagar (Flight)", summary: "Fly to Srinagar. Transfer to hotel or houseboat. Evening free. Overnight stay." },
        { day: "Day 03", title: "Srinagar Sightseeing", summary: "Visit Mughal Gardens, Nishat Bagh and Shalimar Bagh. Enjoy Shikara ride on Dal Lake." },
        { day: "Day 04", title: "Excursion to Gulmarg", summary: "Full-day visit to Gulmarg, famous for meadows and mountain views." },
        { day: "Day 05", title: "Excursion to Pahalgam", summary: "Drive to Pahalgam valley along Lidder River." },
        { day: "Day 06", title: "Srinagar Leisure Day", summary: "Free day for shopping or relaxation." },
        { day: "Day 07", title: "Srinagar to Delhi (Flight)", summary: "Return to Delhi. Overnight stay." },
        { day: "Day 08", title: "Delhi Sightseeing", summary: "City tour of major monuments." },
        { day: "Day 09", title: "Departure", summary: "Departure." },
      ],
    },
    en: {
      title: "KASHMIR PARADISE TOUR",
      short: "Experience the breathtaking beauty of Kashmir, often called Paradise on Earth.",
      overview: "Experience the breathtaking beauty of Kashmir, often called Paradise on Earth. Enjoy serene lakes, mountain landscapes and traditional Kashmiri culture.",
      route: ["Delhi", "Srinagar", "Gulmarg", "Pahalgam", "Delhi"],
      itinerary: [
        { day: "Day 01", title: "Arrival Delhi", summary: "Arrival and transfer to hotel. Overnight stay in Delhi." },
        { day: "Day 02", title: "Delhi to Srinagar (Flight)", summary: "Fly to Srinagar. Transfer to hotel or houseboat. Evening free. Overnight stay." },
        { day: "Day 03", title: "Srinagar Sightseeing", summary: "Visit Mughal Gardens, Nishat Bagh and Shalimar Bagh. Enjoy Shikara ride on Dal Lake." },
        { day: "Day 04", title: "Excursion to Gulmarg", summary: "Full-day visit to Gulmarg, famous for meadows and mountain views." },
        { day: "Day 05", title: "Excursion to Pahalgam", summary: "Drive to Pahalgam valley along Lidder River." },
        { day: "Day 06", title: "Srinagar Leisure Day", summary: "Free day for shopping or relaxation." },
        { day: "Day 07", title: "Srinagar to Delhi (Flight)", summary: "Return to Delhi. Overnight stay." },
        { day: "Day 08", title: "Delhi Sightseeing", summary: "City tour of major monuments." },
        { day: "Day 09", title: "Departure", summary: "Departure." },
      ],
    },
  },
  {
    id: "kathmandu-nepal-tour",
    image: images.boudhanath,
    country: "nepal",
    duration: 9,
    durationLabel: "09 DAYS",
    budget: "comfort",
    theme: "culture",
    price: null,
    destinations: ["Delhi", "Kathmandu", "Pokhara"],
    highlights: ["Kathmandu heritage temples", "Himalayan mountain views", "Pokhara lakeside experience", "Cultural exploration"],
    nl: {
      title: "KATHMANDU & NEPAL TOUR",
      short: "Discover Nepal's spiritual charm with visits to Kathmandu Valley and scenic Pokhara.",
      overview: "Discover Nepal’s spiritual charm with visits to Kathmandu Valley and scenic Pokhara.",
      route: ["Delhi", "Kathmandu", "Pokhara", "Kathmandu", "Delhi"],
      itinerary: [
        { day: "Day 01", title: "Arrival Delhi", summary: "Arrival Delhi." },
        { day: "Day 02", title: "Delhi to Kathmandu (Flight)", summary: "Transfer to hotel." },
        { day: "Day 03", title: "Kathmandu Sightseeing", summary: "Visit Pashupatinath Temple, Boudhanath Stupa and Durbar Square." },
        { day: "Day 04", title: "Kathmandu to Pokhara (Flight)", summary: "Transfer to hotel near Phewa Lake." },
        { day: "Day 05", title: "Pokhara Sightseeing", summary: "Visit Davis Falls, Peace Pagoda and enjoy mountain views." },
        { day: "Day 06", title: "Pokhara to Kathmandu", summary: "Pokhara to Kathmandu." },
        { day: "Day 07", title: "Kathmandu Leisure Day", summary: "Kathmandu Leisure Day." },
        { day: "Day 08", title: "Kathmandu to Delhi", summary: "Kathmandu to Delhi." },
        { day: "Day 09", title: "Departure", summary: "Departure." },
      ],
    },
    en: {
      title: "KATHMANDU & NEPAL TOUR",
      short: "Discover Nepal's spiritual charm with visits to Kathmandu Valley and scenic Pokhara.",
      overview: "Discover Nepal’s spiritual charm with visits to Kathmandu Valley and scenic Pokhara.",
      route: ["Delhi", "Kathmandu", "Pokhara", "Kathmandu", "Delhi"],
      itinerary: [
        { day: "Day 01", title: "Arrival Delhi", summary: "Arrival Delhi." },
        { day: "Day 02", title: "Delhi to Kathmandu (Flight)", summary: "Transfer to hotel." },
        { day: "Day 03", title: "Kathmandu Sightseeing", summary: "Visit Pashupatinath Temple, Boudhanath Stupa and Durbar Square." },
        { day: "Day 04", title: "Kathmandu to Pokhara (Flight)", summary: "Transfer to hotel near Phewa Lake." },
        { day: "Day 05", title: "Pokhara Sightseeing", summary: "Visit Davis Falls, Peace Pagoda and enjoy mountain views." },
        { day: "Day 06", title: "Pokhara to Kathmandu", summary: "Pokhara to Kathmandu." },
        { day: "Day 07", title: "Kathmandu Leisure Day", summary: "Kathmandu Leisure Day." },
        { day: "Day 08", title: "Kathmandu to Delhi", summary: "Kathmandu to Delhi." },
        { day: "Day 09", title: "Departure", summary: "Departure." },
      ],
    },
  },
  {
    id: "north-east-india-tour",
    image: images.shillong,
    country: "india",
    duration: 16,
    durationLabel: "16 DAYS",
    budget: "comfort",
    theme: "nature",
    price: null,
    destinations: ["Delhi", "Guwahati", "Shillong", "Mawlynnong", "Gangtok", "Darjeeling"],
    highlights: ["Shillong hill station", "Living Root Bridges", "Gangtok monasteries", "Darjeeling Himalayan views"],
    nl: {
      title: "NORTH EAST INDIA TOUR",
      short: "Explore the untouched beauty of North East India including Meghalaya, Sikkim and Darjeeling.",
      overview: "Explore the untouched beauty of North East India including Meghalaya, Sikkim and Darjeeling.",
      route: ["Delhi", "Guwahati", "Shillong", "Mawlynnong", "Gangtok", "Darjeeling", "Delhi"],
      itinerary: [
        { day: "Day 01", title: "Arrival Delhi", summary: "Arrival Delhi." },
        { day: "Day 02", title: "Delhi Sightseeing", summary: "Delhi Sightseeing." },
        { day: "Day 03", title: "Delhi to Guwahati – Shillong", summary: "Drive to Shillong." },
        { day: "Day 04", title: "Shillong Sightseeing", summary: "Shillong Sightseeing." },
        { day: "Day 05", title: "Excursion to Mawlynnong Village", summary: "Excursion to Mawlynnong Village." },
        { day: "Day 06", title: "Shillong to Guwahati", summary: "Shillong to Guwahati." },
        { day: "Day 07", title: "Guwahati Sightseeing", summary: "Guwahati Sightseeing." },
        { day: "Day 08", title: "Guwahati – Bagdogra – Gangtok", summary: "Guwahati – Bagdogra – Gangtok." },
        { day: "Day 09", title: "Gangtok Sightseeing", summary: "Gangtok Sightseeing." },
        { day: "Day 10", title: "Gangtok Leisure Day", summary: "Gangtok Leisure Day." },
        { day: "Day 11", title: "Gangtok to Darjeeling", summary: "Gangtok to Darjeeling." },
        { day: "Day 12", title: "Darjeeling Sightseeing", summary: "Darjeeling Sightseeing." },
        { day: "Day 13", title: "Darjeeling Leisure Day", summary: "Darjeeling Leisure Day." },
        { day: "Day 14", title: "Return to Delhi", summary: "Return to Delhi." },
        { day: "Day 15", title: "Free Day in Delhi", summary: "Free Day in Delhi." },
        { day: "Day 16", title: "Departure", summary: "Departure." },
      ],
    },
    en: {
      title: "NORTH EAST INDIA TOUR",
      short: "Explore the untouched beauty of North East India including Meghalaya, Sikkim and Darjeeling.",
      overview: "Explore the untouched beauty of North East India including Meghalaya, Sikkim and Darjeeling.",
      route: ["Delhi", "Guwahati", "Shillong", "Mawlynnong", "Gangtok", "Darjeeling", "Delhi"],
      itinerary: [
        { day: "Day 01", title: "Arrival Delhi", summary: "Arrival Delhi." },
        { day: "Day 02", title: "Delhi Sightseeing", summary: "Delhi Sightseeing." },
        { day: "Day 03", title: "Delhi to Guwahati – Shillong", summary: "Drive to Shillong." },
        { day: "Day 04", title: "Shillong Sightseeing", summary: "Shillong Sightseeing." },
        { day: "Day 05", title: "Excursion to Mawlynnong Village", summary: "Excursion to Mawlynnong Village." },
        { day: "Day 06", title: "Shillong to Guwahati", summary: "Shillong to Guwahati." },
        { day: "Day 07", title: "Guwahati Sightseeing", summary: "Guwahati Sightseeing." },
        { day: "Day 08", title: "Guwahati – Bagdogra – Gangtok", summary: "Guwahati – Bagdogra – Gangtok." },
        { day: "Day 09", title: "Gangtok Sightseeing", summary: "Gangtok Sightseeing." },
        { day: "Day 10", title: "Gangtok Leisure Day", summary: "Gangtok Leisure Day." },
        { day: "Day 11", title: "Gangtok to Darjeeling", summary: "Gangtok to Darjeeling." },
        { day: "Day 12", title: "Darjeeling Sightseeing", summary: "Darjeeling Sightseeing." },
        { day: "Day 13", title: "Darjeeling Leisure Day", summary: "Darjeeling Leisure Day." },
        { day: "Day 14", title: "Return to Delhi", summary: "Return to Delhi." },
        { day: "Day 15", title: "Free Day in Delhi", summary: "Free Day in Delhi." },
        { day: "Day 16", title: "Departure", summary: "Departure." },
      ],
    },
  },
  {
    id: "andaman-nicobar-island-tour",
    image: images.andamanCoral,
    country: "india",
    duration: 9,
    durationLabel: "09 DAYS",
    budget: "comfort",
    theme: "leisure",
    price: null,
    destinations: ["Delhi", "Port Blair"],
    highlights: ["Port Blair sightseeing", "Cellular Jail visit", "Beach relaxation", "Island excursions"],
    nl: {
      title: "ANDAMAN & NICOBAR ISLAND TOUR",
      short: "A relaxing tropical holiday featuring turquoise waters, white sand beaches and island experiences.",
      overview: "A relaxing tropical holiday featuring turquoise waters, white sand beaches and island experiences.",
      route: ["Delhi", "Port Blair", "Delhi"],
      itinerary: [
        { day: "Day 01", title: "Arrival Delhi", summary: "Arrival Delhi." },
        { day: "Day 02", title: "Delhi to Port Blair (Flight)", summary: "Transfer to hotel." },
        { day: "Day 03", title: "Port Blair Sightseeing", summary: "Visit Cellular Jail and Light & Sound Show." },
        { day: "Day 04", title: "Island Excursion", summary: "Island Excursion." },
        { day: "Day 05", title: "Beach Activities", summary: "Beach Activities." },
        { day: "Day 06", title: "Leisure Day", summary: "Leisure Day." },
        { day: "Day 07", title: "Port Blair to Delhi", summary: "Port Blair to Delhi." },
        { day: "Day 08", title: "Delhi Sightseeing", summary: "Delhi Sightseeing." },
        { day: "Day 09", title: "Departure", summary: "Departure." },
      ],
    },
    en: {
      title: "ANDAMAN & NICOBAR ISLAND TOUR",
      short: "A relaxing tropical holiday featuring turquoise waters, white sand beaches and island experiences.",
      overview: "A relaxing tropical holiday featuring turquoise waters, white sand beaches and island experiences.",
      route: ["Delhi", "Port Blair", "Delhi"],
      itinerary: [
        { day: "Day 01", title: "Arrival Delhi", summary: "Arrival Delhi." },
        { day: "Day 02", title: "Delhi to Port Blair (Flight)", summary: "Transfer to hotel." },
        { day: "Day 03", title: "Port Blair Sightseeing", summary: "Visit Cellular Jail and Light & Sound Show." },
        { day: "Day 04", title: "Island Excursion", summary: "Island Excursion." },
        { day: "Day 05", title: "Beach Activities", summary: "Beach Activities." },
        { day: "Day 06", title: "Leisure Day", summary: "Leisure Day." },
        { day: "Day 07", title: "Port Blair to Delhi", summary: "Port Blair to Delhi." },
        { day: "Day 08", title: "Delhi Sightseeing", summary: "Delhi Sightseeing." },
        { day: "Day 09", title: "Departure", summary: "Departure." },
      ],
    },
  },
  {
    id: "gujarat-heritage-tour",
    image: images.statueUnity,
    country: "india",
    duration: 12,
    durationLabel: "12 DAYS",
    budget: "comfort",
    theme: "heritage",
    price: null,
    destinations: ["Delhi", "Vadodara", "Kevadia", "Ahmedabad", "Mount Abu", "Udaipur"],
    highlights: ["Statue of Unity", "Ahmedabad heritage walk", "Mount Abu hill station", "Udaipur royal palaces"],
    nl: {
      title: "GUJARAT HERITAGE TOUR",
      short: "Explore Gujarat's rich culture, temples and heritage cities including the Statue of Unity.",
      overview: "Explore Gujarat’s rich culture, temples and heritage cities including the Statue of Unity.",
      route: ["Delhi", "Vadodara", "Kevadia", "Ahmedabad", "Mount Abu", "Udaipur", "Delhi"],
      itinerary: [
        { day: "Day 01", title: "Arrival Delhi", summary: "Arrival Delhi." },
        { day: "Day 02", title: "Delhi to Vadodara – Kevadia", summary: "Delhi to Vadodara – Kevadia." },
        { day: "Day 03", title: "Statue of Unity Visit", summary: "Statue of Unity Visit." },
        { day: "Day 04", title: "Kevadia to Ahmedabad", summary: "Kevadia to Ahmedabad." },
        { day: "Day 05", title: "Ahmedabad Sightseeing", summary: "Ahmedabad Sightseeing." },
        { day: "Day 06", title: "Ahmedabad to Mount Abu", summary: "Ahmedabad to Mount Abu." },
        { day: "Day 07", title: "Mount Abu Sightseeing", summary: "Mount Abu Sightseeing." },
        { day: "Day 08", title: "Mount Abu to Udaipur", summary: "Mount Abu to Udaipur." },
        { day: "Day 09", title: "Udaipur Sightseeing", summary: "Udaipur Sightseeing." },
        { day: "Day 10", title: "Udaipur to Delhi", summary: "Udaipur to Delhi." },
        { day: "Day 11", title: "Leisure Day", summary: "Leisure Day." },
        { day: "Day 12", title: "Departure", summary: "Departure." },
      ],
    },
    en: {
      title: "GUJARAT HERITAGE TOUR",
      short: "Explore Gujarat's rich culture, temples and heritage cities including the Statue of Unity.",
      overview: "Explore Gujarat’s rich culture, temples and heritage cities including the Statue of Unity.",
      route: ["Delhi", "Vadodara", "Kevadia", "Ahmedabad", "Mount Abu", "Udaipur", "Delhi"],
      itinerary: [
        { day: "Day 01", title: "Arrival Delhi", summary: "Arrival Delhi." },
        { day: "Day 02", title: "Delhi to Vadodara – Kevadia", summary: "Delhi to Vadodara – Kevadia." },
        { day: "Day 03", title: "Statue of Unity Visit", summary: "Statue of Unity Visit." },
        { day: "Day 04", title: "Kevadia to Ahmedabad", summary: "Kevadia to Ahmedabad." },
        { day: "Day 05", title: "Ahmedabad Sightseeing", summary: "Ahmedabad Sightseeing." },
        { day: "Day 06", title: "Ahmedabad to Mount Abu", summary: "Ahmedabad to Mount Abu." },
        { day: "Day 07", title: "Mount Abu Sightseeing", summary: "Mount Abu Sightseeing." },
        { day: "Day 08", title: "Mount Abu to Udaipur", summary: "Mount Abu to Udaipur." },
        { day: "Day 09", title: "Udaipur Sightseeing", summary: "Udaipur Sightseeing." },
        { day: "Day 10", title: "Udaipur to Delhi", summary: "Udaipur to Delhi." },
        { day: "Day 11", title: "Leisure Day", summary: "Leisure Day." },
        { day: "Day 12", title: "Departure", summary: "Departure." },
      ],
    },
  },
  {
    id: "mp-heritage-tour",
    image: images.gwaliorFort,
    country: "india",
    duration: 14,
    durationLabel: "14 DAYS",
    budget: "comfort",
    theme: "heritage",
    price: null,
    destinations: ["Delhi", "Gwalior", "Khajuraho", "Jhansi", "Orchha", "Bhopal", "Sanchi", "Indore", "Omkareshwar"],
    highlights: ["Khajuraho temples (UNESCO Site)", "Orchha heritage town", "Sanchi Stupa", "Cultural cities of Madhya Pradesh"],
    nl: {
      title: "MP HERITAGE TOUR",
      short: "Discover Central India's historical treasures including Gwalior, Khajuraho and Orchha.",
      overview: "Discover Central India’s historical treasures including Gwalior, Khajuraho and Orchha.",
      route: ["Delhi", "Gwalior", "Khajuraho", "Jhansi", "Orchha", "Bhopal", "Sanchi", "Indore", "Omkareshwar", "Delhi"],
      itinerary: [
        { day: "Day 01", title: "Arrival Delhi", summary: "Arrival Delhi." },
        { day: "Day 02", title: "Delhi to Gwalior", summary: "Delhi to Gwalior." },
        { day: "Day 03", title: "Gwalior Sightseeing", summary: "Gwalior Sightseeing." },
        { day: "Day 04", title: "Gwalior to Khajuraho", summary: "Gwalior to Khajuraho." },
        { day: "Day 05", title: "Khajuraho Temple Visit", summary: "Khajuraho Temple Visit." },
        { day: "Day 06", title: "Khajuraho – Jhansi – Orchha", summary: "Khajuraho – Jhansi – Orchha." },
        { day: "Day 07", title: "Orchha to Bhopal", summary: "Orchha to Bhopal." },
        { day: "Day 08", title: "Sanchi Excursion", summary: "Sanchi Excursion." },
        { day: "Day 09", title: "Bhopal to Indore", summary: "Bhopal to Indore." },
        { day: "Day 10", title: "Omkareshwar Excursion", summary: "Omkareshwar Excursion." },
        { day: "Day 11", title: "Indore Sightseeing", summary: "Indore Sightseeing." },
        { day: "Day 12", title: "Indore to Delhi", summary: "Indore to Delhi." },
        { day: "Day 13", title: "Leisure Day", summary: "Leisure Day." },
        { day: "Day 14", title: "Departure", summary: "Departure." },
      ],
    },
    en: {
      title: "MP HERITAGE TOUR",
      short: "Discover Central India's historical treasures including Gwalior, Khajuraho and Orchha.",
      overview: "Discover Central India’s historical treasures including Gwalior, Khajuraho and Orchha.",
      route: ["Delhi", "Gwalior", "Khajuraho", "Jhansi", "Orchha", "Bhopal", "Sanchi", "Indore", "Omkareshwar", "Delhi"],
      itinerary: [
        { day: "Day 01", title: "Arrival Delhi", summary: "Arrival Delhi." },
        { day: "Day 02", title: "Delhi to Gwalior", summary: "Delhi to Gwalior." },
        { day: "Day 03", title: "Gwalior Sightseeing", summary: "Gwalior Sightseeing." },
        { day: "Day 04", title: "Gwalior to Khajuraho", summary: "Gwalior to Khajuraho." },
        { day: "Day 05", title: "Khajuraho Temple Visit", summary: "Khajuraho Temple Visit." },
        { day: "Day 06", title: "Khajuraho – Jhansi – Orchha", summary: "Khajuraho – Jhansi – Orchha." },
        { day: "Day 07", title: "Orchha to Bhopal", summary: "Orchha to Bhopal." },
        { day: "Day 08", title: "Sanchi Excursion", summary: "Sanchi Excursion." },
        { day: "Day 09", title: "Bhopal to Indore", summary: "Bhopal to Indore." },
        { day: "Day 10", title: "Omkareshwar Excursion", summary: "Omkareshwar Excursion." },
        { day: "Day 11", title: "Indore Sightseeing", summary: "Indore Sightseeing." },
        { day: "Day 12", title: "Indore to Delhi", summary: "Indore to Delhi." },
        { day: "Day 13", title: "Leisure Day", summary: "Leisure Day." },
        { day: "Day 14", title: "Departure", summary: "Departure." },
      ],
    },
  },
];

const policyContent = {
  privacy: {
    nl: {
      title: "Privacybeleid",
      body: "Bharat Mata Tours gebruikt gegevens uit het reisformulier om een persoonlijk reisvoorstel te kunnen voorbereiden. Gegevens worden zorgvuldig behandeld en niet verkocht aan derden.",
    },
    en: {
      title: "Privacy Policy",
      body: "Bharat Mata Tours uses information from the trip form to prepare a personal travel proposal. Data is handled carefully and is not sold to third parties.",
    },
  },
  cookies: {
    nl: {
      title: "Cookiebeleid",
      body: "De website kan noodzakelijke cookies gebruiken voor basisfunctionaliteit. Analytics, advertentiepixels of chattools worden alleen toegevoegd met passende toestemming en cookie-instellingen.",
    },
    en: {
      title: "Cookie Policy",
      body: "The website may use necessary cookies for basic functionality. Analytics, ad pixels or chat tools are only added with proper consent and cookie controls.",
    },
  },
  terms: {
    nl: {
      title: "Algemene voorwaarden",
      body: "Alle reizen zijn aanvraagreizen. Een boeking is pas definitief nadat route, beschikbaarheid, prijs, inbegrepen diensten, uitsluitingen en financiele voorwaarden schriftelijk zijn gedeeld en door de reiziger zijn geaccepteerd.",
    },
    en: {
      title: "Terms and Conditions",
      body: "All journeys are inquiry-based. A booking is confirmed only after the route, availability, price, included services, exclusions and financial terms have been shared in writing and accepted by the traveler.",
    },
  },
  cancellation: {
    nl: {
      title: "Annuleringsbeleid",
      body: "Annuleringsregels kunnen per pakket verschillen door hotels, binnenlandse vluchten, gidsen en lokale partners. De geldende voorwaarden worden gedeeld voordat een reis definitief wordt bevestigd.",
    },
    en: {
      title: "Cancellation Policy",
      body: "Cancellation rules can differ by package because of hotels, domestic flights, guides and local partners. The applicable terms are shared before a journey is finally confirmed.",
    },
  },
  refund: {
    nl: {
      title: "Restitutiebeleid",
      body: "Restituties zijn afhankelijk van de uiteindelijke leveranciersvoorwaarden, bevestigde diensten en boekingsfase. De specifieke regels worden gedeeld voordat een reis definitief wordt vastgelegd.",
    },
    en: {
      title: "Refund Policy",
      body: "Refunds depend on final supplier terms, confirmed services and booking stage. Specific rules are shared before a journey is finalized.",
    },
  },
  disclaimer: {
    nl: {
      title: "Reisdisclaimer",
      body: "Reizen kunnen wijzigen door weer, lokale regels, wegomstandigheden, vluchtwijzigingen of operationele redenen. Advies over visa, gezondheid en verzekering moet altijd worden gecontroleerd bij officiele instanties.",
    },
    en: {
      title: "Travel Disclaimer",
      body: "Trips may change because of weather, local rules, road conditions, flight changes or operational reasons. Visa, health and insurance advice should always be checked with official sources.",
    },
  },
  responsible: {
    nl: {
      title: "Verantwoord reizen",
      body: "Bharat Mata Tours wil reizen ontwikkelen met respect voor lokale gemeenschappen, religieuze plekken, natuur, fotografie-etiquette en eerlijke lokale samenwerking.",
    },
    en: {
      title: "Responsible Travel",
      body: "Bharat Mata Tours aims to develop journeys that respect local communities, religious places, nature, photography etiquette and fair local partnerships.",
    },
  },
};

function t(path) {
  return path.split(".").reduce((obj, key) => obj?.[key], dictionary[state.lang]) || path;
}

function local(item) {
  return item[state.lang] || item.nl || item.en;
}

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function titleCase(value) {
  return String(value)
    .replaceAll("-", " ")
    .replace(/\b\w/g, (match) => match.toUpperCase());
}

function formatPrice(amount) {
  if (amount == null || !Number.isFinite(Number(amount)) || Number(amount) <= 0) {
    return state.lang === "nl" ? "Prijs op aanvraag" : "Price on request";
  }
  return `EUR ${Number(amount).toLocaleString("nl-NL")}`;
}

function packagePriceLabel(pkg) {
  return formatPrice(pkg.price);
}

function packageDurationLabel(pkg) {
  return pkg.durationLabel || `${pkg.duration} ${t("common.days")}`;
}

function itineraryDayLabel(item, idx, isNl) {
  if (item && typeof item === "object" && item.day) return item.day;
  return `${isNl ? "Dag" : "Day"} ${idx + 1}`;
}

function itineraryTitle(item) {
  return item && typeof item === "object" ? item.title : item;
}

function itinerarySummary(item) {
  return item && typeof item === "object" ? item.summary : "";
}

function updateStaticText() {
  document.documentElement.lang = state.lang;
  langToggle.textContent = state.lang === "nl" ? "EN" : "NL";
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });
}

function pageHero({ title, eyebrow, text, image, gallery = null, actions = "" }) {
  const selectedGallery = gallery?.length ? gallery.slice(0, 5) : null;
  return `
    <section class="page-hero ${selectedGallery ? "page-hero-gallery" : ""}" style="--hero-image: url('${image}')">
      ${selectedGallery ? `
        <div class="page-hero-media" aria-hidden="true">
          <div class="image-track" style="--slide-count: ${selectedGallery.length}">
            ${selectedGallery.map((src) => `<img src="${src}" alt="" loading="eager" />`).join("")}
          </div>
        </div>
      ` : ""}
      <div>
        <p class="eyebrow">${escapeHtml(eyebrow)}</p>
        <h1>${escapeHtml(title)}</h1>
        <p>${escapeHtml(text)}</p>
        ${actions}
      </div>
    </section>
  `;
}

function imageCarousel(gallery, alt) {
  const slides = [...gallery];
  while (slides.length < 5) slides.push(gallery[slides.length % gallery.length]);
  const selected = slides.slice(0, 5);
  return `
    <div class="image-carousel">
      <div class="image-track" style="--slide-count: ${selected.length}">
        ${selected
          .map(
            (src, index) =>
              `<img src="${src}" alt="${escapeHtml(alt)} ${index + 1}" loading="${index === 0 ? "eager" : "lazy"}" />`
          )
          .join("")}
      </div>
    </div>
  `;
}

function packageGallery(pkg) {
  if (packageGalleries[pkg.id]) return packageGalleries[pkg.id];
  return [pkg.image, images.tajMahal, images.keralaBackwater, images.gangaAartiVaranasi, images.boudhanath];
}

function homeFeaturedPackages() {
  const curated = [
    "golden-triangle-tour",
    "golden-triangle-varanasi-ayodhya",
    "classic-spiritual-india-tour",
    "grand-south-india-tour",
    "kerala-backwaters-hill-stations",
    "kashmir-paradise-tour",
    "kathmandu-nepal-tour",
    "north-east-india-tour",
  ];
  const byId = new Map(packages.map((pkg) => [pkg.id, pkg]));
  return curated.map((id) => byId.get(id)).filter(Boolean);
}

function carouselControls(target, viewAllHref, viewAllLabel) {
  return `
    <div class="section-actions">
      <button class="icon-button" type="button" data-carousel-prev="${target}" aria-label="Previous">‹</button>
      <button class="icon-button" type="button" data-carousel-next="${target}" aria-label="Next">›</button>
      <a class="button button-secondary button-small" href="${viewAllHref}">${viewAllLabel}</a>
    </div>
  `;
}

function heroBannerSlideshow() {
  return `
    <div class="hero-carousel" aria-hidden="true">
      <div class="hero-carousel-track" style="--hero-slide-count: ${heroBannerImages.length}">
        ${heroBannerImages
          .map(
            (src, index) =>
              `<img src="${src}" alt="" loading="${index < 3 ? "eager" : "lazy"}" style="--hero-delay: ${index * 3 - 0.6}s" />`
          )
          .join("")}
      </div>
    </div>
  `;
}

function storyShortcuts() {
  const isNl = state.lang === "nl";
  const item = (href, src, label) =>
    `<a href="${href}"><img src="${src}" alt="" loading="lazy" /><span>${label}</span></a>`;
  return `
    <section class="story-section" aria-label="${isNl ? "Populaire bestemmingen" : "Popular destinations"}">
      <nav class="story-nav">
        ${item("#destination-delhi-agra", images.tajMahalSunrise, "Delhi Agra")}
        ${item("#destination-jaipur-rajasthan", images.amberFort, "Jaipur")}
        ${item("#destination-varanasi-ayodhya", images.varanasiGhat, "Varanasi Ayodhya")}
        ${item("#destination-kolkata-bodhgaya", images.mahabodhiBuddha, "Kolkata Bodhgaya")}
        ${item("#destination-kerala", images.alleppey, "Kerala")}
        ${item("#destination-south-india", images.meenakshiAerial, isNl ? "Zuid-India" : "South India")}
        ${item("#destination-goa-mumbai", images.mumbaiGateway, "Goa Mumbai")}
        ${item("#destination-kashmir", images.kashmirLandscape, "Kashmir")}
        ${item("#destination-nepal", images.kathmanduDurbar, "Nepal")}
        ${item("#destination-north-east", images.shillong, isNl ? "Noordoost-India" : "North East India")}
      </nav>
    </section>
  `;
}

function homePage() {
  const isNl = state.lang === "nl";
  return `
    <div class="page">
      <section class="hero hero-carousel-hero" style="--hero-image: ${images.hero}">
        ${heroBannerSlideshow()}
        <div class="hero-content">
          <p class="eyebrow">${isNl ? "Voor Nederlandse en Vlaamse reizigers" : "For Dutch and Flemish travelers"}</p>
          <h1>Bharat Mata Tours</h1>
          <p>${isNl
            ? "Warme, zorgvuldig begeleide reizen door India en Nepal: van de Taj Mahal, Jaipur en Varanasi tot Kerala, Kashmir, Zuid-India, Ayodhya en Kathmandu."
            : "Warm, carefully guided journeys through India and Nepal: from the Taj Mahal, Jaipur and Varanasi to Kerala, Kashmir, South India, Ayodhya and Kathmandu."}</p>
          <div class="button-row">
            <a class="button button-primary" href="#planner">${t("common.plan")}</a>
            <a class="button button-ghost" href="#packages">${isNl ? "Bekijk reizen" : "Explore journeys"}</a>
          </div>
        </div>
      </section>

      ${storyShortcuts()}

      <section class="section section-tight">
        <div class="grid grid-4">
          <div class="feature"><strong>2</strong><h3>${isNl ? "Landen" : "Countries"}</h3><p>${isNl ? "India als hoofdroute, met Nepal als aparte 09-daagse reis." : "India as the main focus, with Nepal as its own 09-day journey."}</p></div>
          <div class="feature"><strong>${packages.length}</strong><h3>${isNl ? "Reisroutes" : "Journeys"}</h3><p>${isNl ? "Alle pakketnamen, routes en reisdagen sluiten aan op de vaste pakketlijst." : "All package names, routes and durations match the fixed tour line-up."}</p></div>
          <div class="feature"><strong>09-23</strong><h3>${isNl ? "Dagen" : "Days"}</h3><p>${isNl ? "Korte spirituele routes, klassiek erfgoed en lange Zuid-India rondreizen." : "Short spiritual routes, classic heritage circuits and long South India tours."}</p></div>
          <div class="feature"><strong>NL/EN</strong><h3>${isNl ? "Tweetalig" : "Bilingual"}</h3><p>${isNl ? "Nederlands en Engels voor duidelijke voorbereiding." : "Dutch and English for clear trip preparation."}</p></div>
        </div>
      </section>

      <section class="section band">
        <div class="section-heading">
          <div>
            <p class="eyebrow">${isNl ? "Populaire routes" : "Popular routes"}</p>
            <h2>${isNl ? "Begin met een route die past bij je reisstijl" : "Start with a route that fits your travel style"}</h2>
          </div>
          ${carouselControls("featured-packages", "#packages", isNl ? "Bekijk alles" : "View all")}
        </div>
        <p>${isNl
          ? "Kies een reis die je aanspreekt en gebruik de planner om je voorkeuren, tempo en reisdata door te geven."
          : "Choose a journey that appeals to you and use the planner to share your preferred pace, dates and travel style."}</p>
        <div class="carousel-shell">
          <div class="carousel-track" data-carousel="featured-packages">
            ${homeFeaturedPackages().map(packageCard).join("")}
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-heading">
          <div>
            <p class="eyebrow">${isNl ? "Bestemmingen" : "Destinations"}</p>
            <h2>${isNl ? "India in de hoofdrol, Nepal als spirituele uitbreiding" : "India first, Nepal as a spiritual extension"}</h2>
          </div>
          ${carouselControls("home-destinations", "#destinations", isNl ? "Bekijk alles" : "View all")}
        </div>
        <p>${isNl
          ? "Elke bestemming sluit aan op een of meer pakketten, zodat bezoekers snel routes zien die echt bij die plek horen."
          : "Every destination connects to one or more packages, so visitors quickly see routes that truly include that place."}</p>
        <div class="carousel-shell">
          <div class="carousel-track" data-carousel="home-destinations">
            ${destinations.filter((d) => d.featured).map(destinationCard).join("")}
          </div>
        </div>
      </section>

      <section class="section band-accent">
        <div class="split">
          <div>
            <p class="eyebrow">${isNl ? "Van idee tot voorstel" : "From idea to proposal"}</p>
            <h2>${isNl ? "Een heldere aanvraagflow" : "A clear inquiry flow"}</h2>
            <p>${isNl
              ? "De aanvraagflow laat zien hoe een bezoeker een reis ontdekt, voorkeuren doorgeeft, een reisvoorstel bekijkt en de aanvraag afrondt."
              : "The inquiry flow shows how a visitor discovers a journey, shares preferences, reviews a travel proposal and completes the request."}</p>
            <div class="button-row">
              <a class="button button-primary" href="#planner">${t("common.plan")}</a>
              <a class="button button-secondary" href="#guide">${isNl ? "Lees praktische gids" : "Read practical guide"}</a>
            </div>
          </div>
          <div class="summary-panel">
            <div class="summary-list">
              ${[
                isNl ? "1. Kies een pakket of bestemming" : "1. Choose a package or destination",
                isNl ? "2. Vul reisvoorkeuren in" : "2. Share travel preferences",
                isNl ? "3. Bekijk je reisvoorstel" : "3. Review your trip proposal",
                isNl ? "4. Kies je vervolgvoorkeur" : "4. Choose your follow-up preference",
                isNl ? "5. Ontvang je aanvraagbevestiging" : "5. Receive your inquiry confirmation",
              ].map((line) => `<div class="summary-line"><span>${escapeHtml(line)}</span><strong>${line.charAt(0)}</strong></div>`).join("")}
            </div>
          </div>
        </div>
      </section>
    </div>
  `;
}

function aboutPage() {
  const isNl = state.lang === "nl";
  return `
    ${pageHero({
      title: isNl ? "Over Bharat Mata Tours" : "About Bharat Mata Tours",
      eyebrow: isNl ? "Boutique reisontwerp" : "Boutique travel design",
      text: isNl
        ? "Een reisorganisatie die Dutch-friendly planning combineert met lokale expertise in India en Nepal."
        : "A travel company combining Dutch-friendly planning with local India and Nepal expertise.",
      image: images.jaisalmerFort,
    })}
    <section class="section">
      <div class="split">
        <div>
          <h2>${isNl ? "Discovering Heritage, Creating Memories" : "Discovering Heritage, Creating Memories"}</h2>
          <p>${isNl
            ? "Bharat Mata Tours wordt gepositioneerd als travel agency, local destination expert, custom itinerary planner, guided sightseeing provider en boutique travel designer. De website spreekt reizigers aan die comfort, cultuur en duidelijke begeleiding belangrijk vinden."
            : "Bharat Mata Tours is positioned as a travel agency, local destination expert, custom itinerary planner, guided sightseeing provider and boutique travel designer. The website speaks to travelers who value comfort, culture and clear guidance."}</p>
          <p>${isNl
            ? "De toon is warm, praktisch en cultureel rijk. Reizigers krijgen heldere routes, duidelijke verwachtingen en persoonlijk advies."
            : "The tone is warm, practical and culturally rich. Travelers get clear routes, transparent expectations and personal advice."}</p>
        </div>
        <div class="image-card"><img src="${images.gangaAartiVaranasi}" alt="${isNl ? "Rivier en cultuur in India" : "River and culture in India"}" /></div>
      </div>
    </section>
    <section class="section band">
      <div class="grid grid-3">
        <div class="feature"><strong>01</strong><h3>${isNl ? "Comfort voorop" : "Comfort first"}</h3><p>${isNl ? "Rustige routes, duidelijke verwachtingen en zorgvuldig gekozen service." : "Calm routes, clear expectations and carefully selected service."}</p></div>
        <div class="feature"><strong>02</strong><h3>${isNl ? "Cultuur met context" : "Culture with context"}</h3><p>${isNl ? "Erfgoed, spiritualiteit en festivals worden begrijpelijk gemaakt voor eerste bezoekers." : "Heritage, spirituality and festivals are made understandable for first-time visitors."}</p></div>
        <div class="feature"><strong>03</strong><h3>${isNl ? "Op maat voorbereid" : "Prepared custom travel"}</h3><p>${isNl ? "De vaste routes blijven het uitgangspunt; tempo, hotels en voorkeuren worden persoonlijk afgestemd." : "The fixed routes remain the reference; pace, hotels and preferences are shaped personally."}</p></div>
      </div>
    </section>
  `;
}

function destinationCard(destination) {
  const copy = local(destination);
  const gallery = destinationGalleries[destination.id] || [destination.image, images.tajMahal, images.keralaBackwater, images.boudhanath, images.gangaAartiVaranasi];
  return `
    <article class="destination-card" data-card-link="#destination-${destination.id}" tabindex="0" role="link" aria-label="${escapeHtml(t("common.view"))}: ${escapeHtml(copy.title)}">
      ${imageCarousel(gallery, copy.title)}
      <div class="content">
        <div class="tag-row">
          <span class="tag teal">${titleCase(destination.country)}</span>
          <span class="tag gold">${escapeHtml(copy.season)}</span>
        </div>
        <h3>${escapeHtml(copy.title)}</h3>
        <p>${escapeHtml(copy.short)}</p>
        <div class="button-row">
          <a class="button button-secondary button-small" href="#destination-${destination.id}">${t("common.view")}</a>
          <a class="button button-primary button-small" href="#planner" data-plan-destination="${destination.id}">${t("common.plan")}</a>
        </div>
      </div>
    </article>
  `;
}

function destinationsPage() {
  const isNl = state.lang === "nl";
  return `
    ${pageHero({
      title: isNl ? "Bestemmingen" : "Destinations",
      eyebrow: isNl ? "India en Nepal" : "India and Nepal",
      text: isNl
        ? "Een overzicht van de bestemmingen die terugkomen in de pakketten: erfgoed, spiritualiteit, natuur, stranden en Zuid-India."
        : "An overview of the destinations covered by the packages: heritage, spirituality, nature, beaches and South India.",
      image: images.cityHeritage,
    })}
    <section class="section">
      <div class="section-heading">
        <div>
          <p class="eyebrow">${isNl ? "Vaste routes" : "Fixed routes"}</p>
          <h2>${isNl ? "Bestemmingen uit het pakketaanbod" : "Destinations from the package line-up"}</h2>
        </div>
        <p>${isNl
          ? "Elke pagina toont waarom de bestemming aantrekkelijk is, welke lokale ervaringen logisch passen en welke pakketten deze plek aandoen."
          : "Each page shows why the destination is worth visiting, which local experiences fit naturally and which packages include it."}</p>
      </div>
      <div class="grid grid-3">${destinations.map(destinationCard).join("")}</div>
    </section>
  `;
}

const destinationPackageTerms = {
  "delhi-agra": ["agra", "taj mahal", "agra fort", "fatehpur sikri", "akshardham", "red fort"],
  "jaipur-rajasthan": ["jaipur", "hawa mahal", "amber fort", "city palace", "jantar mantar", "fatehpur sikri", "udaipur", "mount abu"],
  "varanasi-ayodhya": ["varanasi", "ganga aarti", "kashi vishwanath", "sarnath", "river ganges", "ayodhya", "ram mandir", "saryu"],
  "kolkata-bodhgaya": ["kolkata", "patna", "bodhgaya", "nalanda", "rajgir", "mahabodhi", "victoria memorial", "kali mata"],
  "south-india": ["chennai", "mahabalipuram", "pondicherry", "thanjavur", "madurai", "rameswaram", "kanyakumari", "mysore", "bangalore", "coimbatore", "ooty"],
  kerala: ["kerala", "cochin", "kochi", "munnar", "alleppey", "kovalam", "trivandrum", "backwater"],
  "goa-mumbai": ["goa", "mumbai", "calangute", "baga", "panjim", "mandovi", "gateway of india", "marine drive"],
  kashmir: ["kashmir", "srinagar", "gulmarg", "pahalgam", "dal lake", "shikara"],
  nepal: ["nepal", "kathmandu", "pokhara", "pashupatinath", "boudhanath", "phewa"],
  "north-east": ["north east", "shillong", "mawlynnong", "guwahati", "gangtok", "darjeeling"],
  andaman: ["andaman", "nicobar", "port blair", "cellular jail", "island excursion"],
  gujarat: ["gujarat", "vadodara", "kevadia", "statue of unity", "ahmedabad", "mount abu", "udaipur"],
  "mp-heritage": ["gwalior", "khajuraho", "jhansi", "orchha", "bhopal", "sanchi", "indore", "omkareshwar", "madhya pradesh"],
};

function packageSearchText(pkg) {
  const copy = local(pkg);
  const itineraryText = copy.itinerary
    .map((item) => `${itineraryTitle(item) || ""} ${itinerarySummary(item) || ""}`)
    .join(" ");
  return [
    copy.title,
    copy.short,
    copy.overview,
    copy.route.join(" "),
    pkg.destinations.join(" "),
    pkg.highlights?.join(" "),
    itineraryText,
  ].join(" ").toLowerCase();
}

const seasonalPackageData = [
  {
    key: "jan",
    nlMonth: "Jan",
    enMonth: "Jan",
    nlText: "Start het jaar met zachte winterzon, heldere luchten en levendige markten. Ideaal voor paleizen, tempels, stranden en erfgoedsteden zonder de zware zomerhitte.",
    enText: "Begin the year with soft winter sun, clear skies and lively markets. Ideal for palaces, temples, beaches and heritage cities without the heavy summer heat.",
    image: images.jaisalmerFort,
    packageIds: ["golden-triangle-tour", "kerala-backwaters-hill-stations", "goa-mumbai-leisure-tour", "gujarat-heritage-tour", "mp-heritage-tour"],
  },
  {
    key: "feb",
    nlMonth: "Feb",
    enMonth: "Feb",
    nlText: "Een romantische en rustige reismaand met aangenaam weer voor rivierceremonies, tempelbezoeken, theeheuvels en ontspannen kustdagen.",
    enText: "A romantic, easy-going travel month with pleasant weather for river ceremonies, temple visits, tea hills and relaxed coastal days.",
    image: images.gangaAartiVaranasi,
    packageIds: ["golden-triangle-varanasi-ayodhya", "rama-krishna-spiritual-tour", "classic-spiritual-india-tour", "kerala-backwaters-hill-stations", "goa-mumbai-leisure-tour", "grand-south-india-tour", "mp-heritage-tour"],
  },
  {
    key: "mar",
    nlMonth: "Mar",
    enMonth: "Mar",
    nlText: "Maart brengt lentekleur en vaak Holi-energie: een fotogenieke tijd voor cultuur, ghats, tempels en routes die nog steeds comfortabel aanvoelen.",
    enText: "March brings spring color and often Holi energy: a photogenic time for culture, ghats, temples and routes that still feel comfortable.",
    image: images.holiColors,
    packageIds: ["golden-triangle-tour", "golden-triangle-varanasi-ayodhya", "rama-krishna-spiritual-tour", "classic-spiritual-india-tour", "kerala-backwaters-hill-stations", "grand-south-india-tour", "kathmandu-nepal-tour"],
  },
  {
    key: "apr",
    nlMonth: "Apr",
    enMonth: "Apr",
    nlText: "April voelt fris en open in de heuvels en Himalaya-regio. Denk aan bloeiende landschappen, meren, kloosters, eilandbries en rustigere reisroutes.",
    enText: "April feels fresh and open in the hills and Himalayan region. Think blooming landscapes, lakes, monasteries, island breezes and quieter routes.",
    image: images.phewaLake,
    packageIds: ["kathmandu-nepal-tour", "kashmir-paradise-tour", "north-east-india-tour", "andaman-nicobar-island-tour"],
  },
  {
    key: "may",
    nlMonth: "Mei",
    enMonth: "May",
    nlText: "Wanneer de vlaktes warmer worden, lonken valleien, meren en berglandschappen. Een mooie maand voor reizigers die natuur en verkoeling zoeken.",
    enText: "As the plains warm up, valleys, lakes and mountain landscapes become tempting. A fine month for travelers seeking nature and cooler air.",
    image: images.kashmirLandscape,
    packageIds: ["kashmir-paradise-tour", "kathmandu-nepal-tour", "north-east-india-tour", "andaman-nicobar-island-tour"],
  },
  {
    key: "jun",
    nlMonth: "Jun",
    enMonth: "Jun",
    nlText: "Juni is voor slimme, selectieve planning: zomerse bergontsnappingen, dramatische wolkenluchten en het begin van India’s groene seizoen.",
    enText: "June is for smart, selective planning: summer mountain escapes, dramatic skies and the beginning of India’s green season.",
    image: images.kanchenjunga,
    packageIds: ["kashmir-paradise-tour", "north-east-india-tour"],
  },
  {
    key: "jul",
    nlMonth: "Jul",
    enMonth: "Jul",
    nlText: "Juli heeft moessonromantiek: mistige heuvels, volle rivieren en een rustiger reistempo voor wie natuur, fotografie en sfeer belangrijk vindt.",
    enText: "July has monsoon romance: misty hills, full rivers and a slower pace for travelers who value nature, photography and atmosphere.",
    image: images.meghalayaMisty,
    packageIds: ["kashmir-paradise-tour", "north-east-india-tour"],
  },
  {
    key: "aug",
    nlMonth: "Aug",
    enMonth: "Aug",
    nlText: "Augustus is weelderig en groen. Kerala, backwaters en hill stations krijgen een filmische sfeer, met Onam-cultuur en ruimte voor langzamer reizen.",
    enText: "August is lush and green. Kerala, backwaters and hill stations gain a cinematic mood, with Onam culture and room for slower travel.",
    image: images.keralaBackwater,
    packageIds: ["kerala-backwaters-hill-stations", "grand-south-india-tour", "kashmir-paradise-tour"],
  },
  {
    key: "sep",
    nlMonth: "Sep",
    enMonth: "Sep",
    nlText: "September is de stille opbouw naar het hoogseizoen: fris groen, minder drukte en vaak Navratri-sfeer richting het najaar.",
    enText: "September is the quiet build-up to peak season: fresh greenery, fewer crowds and often Navratri atmosphere as autumn approaches.",
    image: images.navratriGarba,
    packageIds: ["kathmandu-nepal-tour", "north-east-india-tour", "kashmir-paradise-tour", "kerala-backwaters-hill-stations"],
  },
  {
    key: "oct",
    nlMonth: "Okt",
    enMonth: "Oct",
    nlText: "Oktober opent het klassieke India-seizoen: helderder weer, feestelijke avonden, tempels, paleizen en soms Diwali-voorpret.",
    enText: "October opens the classic India season: clearer weather, festive evenings, temples, palaces and sometimes the build-up to Diwali.",
    image: images.diwaliDiyas,
    packageIds: ["golden-triangle-tour", "golden-triangle-varanasi-ayodhya", "rama-krishna-spiritual-tour", "classic-spiritual-india-tour", "kathmandu-nepal-tour", "gujarat-heritage-tour", "mp-heritage-tour"],
  },
  {
    key: "nov",
    nlMonth: "Nov",
    enMonth: "Nov",
    nlText: "November is topseizoen op zijn mooist: Diwali-licht, koele avonden, levendige bazaars, spirituele ceremonies en comfortabele rondreizen.",
    enText: "November is peak season at its best: Diwali lights, cool evenings, lively bazaars, spiritual ceremonies and comfortable touring.",
    image: images.diwaliFireworks,
    packageIds: ["golden-triangle-tour", "golden-triangle-varanasi-ayodhya", "rama-krishna-spiritual-tour", "classic-spiritual-india-tour", "kerala-backwaters-hill-stations", "grand-south-india-tour", "gujarat-heritage-tour", "mp-heritage-tour"],
  },
  {
    key: "dec",
    nlMonth: "Dec",
    enMonth: "Dec",
    nlText: "December voelt feestelijk en zonnig: perfect voor stranddagen, Zuid-India, erfgoedsteden en een bijzondere kerst- of eindejaarsreis.",
    enText: "December feels festive and sunny: perfect for beach days, South India, heritage cities and a memorable Christmas or year-end journey.",
    image: images.goaBeach,
    packageIds: ["goa-mumbai-leisure-tour", "kerala-backwaters-hill-stations", "golden-triangle-tour", "grand-south-india-tour", "gujarat-heritage-tour", "mp-heritage-tour"],
  },
];

function seasonalPackageMonth(key) {
  return seasonalPackageData.find((item) => item.key === key) || null;
}

function packagesForDestination(destination) {
  const terms = destinationPackageTerms[destination.id] || [local(destination).title];
  return packages.filter((pkg) => {
    const text = packageSearchText(pkg);
    return terms.some((term) => text.includes(term.toLowerCase()));
  });
}

function destinationWhyParagraphs(destination, copy, isNl) {
  const sights = copy.sights.slice(0, 4).join(", ");
  if (isNl) {
    return [
      copy.overview,
      `${copy.title} past vooral goed wanneer reizigers ${sights} willen combineren zonder de reis te gehaast te maken. De aanbevolen duur van ${copy.days.toLowerCase()} helpt om de belangrijkste bezienswaardigheden met voldoende rust, gidscontext en realistische reistijd te plannen.`,
      `De beste periode is ${copy.season.toLowerCase()}. In die maanden is het programma doorgaans comfortabeler voor sightseeing, fotografie, marktbezoeken en tempel- of erfgoedmomenten.`,
    ];
  }
  return [
    copy.overview,
    `${copy.title} works especially well when travelers want to combine ${sights} without making the route feel rushed. The recommended duration of ${copy.days.toLowerCase()} keeps the main sights, guide context and realistic travel time in balance.`,
    `The best season is ${copy.season.toLowerCase()}. During this period, sightseeing, photography, market visits and temple or heritage experiences are usually more comfortable.`,
  ];
}

function destinationExperienceDetail(experience, copy, isNl) {
  const text = experience.toLowerCase();
  if (/market|bazaar|bazar|fontainhas|panjim|colaba|fort/.test(text)) {
    return isNl
      ? "Goed met een lokale gids zodat de wandeling inhoud krijgt: ambachten, eten, fotomomenten en praktische etiquette worden onderweg rustig uitgelegd."
      : "Best handled with a local guide so the walk has context: crafts, food, photo stops and practical etiquette are explained at a calm pace.";
  }
  if (/boat|cruise|backwater|ganges|ganga|marine|beach|strand|lake/.test(text)) {
    return isNl
      ? "Ingepland op het juiste moment van de dag, met aandacht voor licht, drukte, veiligheid en voldoende vrije tijd om de sfeer op te nemen."
      : "Timed for the right part of the day, with attention to light, crowds, safety and enough free time to absorb the atmosphere.";
  }
  if (/temple|tempel|aarti|ceremony|ashram|klooster|monastery|spiritual|darshan|ritual/.test(text)) {
    return isNl
      ? "Respectvol begeleid, inclusief kledingadvies, gedrag bij religieuze plekken en uitleg over de betekenis van het ritueel of de plek."
      : "Handled respectfully, including dress guidance, conduct at sacred places and context around the meaning of the ritual or site.";
  }
  if (/walk|wandeling|trek|hike|nature|natuur|hill|mountain|himalaya|tea|thee|plantation|valley|garden/.test(text)) {
    return isNl
      ? "Opgebouwd met een rustig tempo, fotostops en praktische planning rond weer, terrein en vermoeidheid, zodat de ervaring comfortabel blijft."
      : "Planned at a measured pace, with photo stops and practical timing around weather, terrain and fatigue so the experience stays comfortable.";
  }
  if (/cooking|kook|lunch|food|local flavors|keuken|dance|dans|craft|ambacht|textile/.test(text)) {
    return isNl
      ? "Een goede manier om de bestemming persoonlijker te maken, met lokale ontmoetingen en culturele uitleg zonder het programma te overladen."
      : "A useful way to make the destination feel more personal, with local interaction and cultural context without overloading the schedule.";
  }
  return isNl
    ? `Deze ervaring verdiept het verblijf in ${copy.title} en wordt afgestemd op reistempo, comfortniveau en beschikbare tijd.`
    : `This experience adds depth to the stay in ${copy.title} and can be adjusted to pace, comfort level and available time.`;
}

function destinationDetailPage(id) {
  const destination = destinations.find((item) => item.id === id);
  if (!destination) return notFoundPage();
  const copy = local(destination);
  const isNl = state.lang === "nl";
  const heroGallery = destinationGalleries[destination.id] || [destination.image];
  const whyParagraphs = destinationWhyParagraphs(destination, copy, isNl);
  const relatedPackages = packagesForDestination(destination);
  return `
    ${pageHero({
      title: copy.title,
      eyebrow: titleCase(destination.country),
      text: copy.short,
      image: heroGallery[0],
      gallery: heroGallery,
    })}
    <section class="section">
      <div class="split">
        <div>
          <h2>${isNl ? "Waarom deze bestemming" : "Why this destination"}</h2>
          ${whyParagraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}
          <div class="grid grid-2">
            <div class="feature"><strong>${escapeHtml(copy.days.split(" ")[0])}</strong><h3>${isNl ? "Aanbevolen duur" : "Recommended duration"}</h3><p>${escapeHtml(copy.days)}</p></div>
            <div class="feature"><strong>${copy.season.slice(0, 3)}</strong><h3>${t("common.bestSeason")}</h3><p>${escapeHtml(copy.season)}</p></div>
          </div>
        </div>
        <div class="summary-panel">
          <h3>${isNl ? "Hoogtepunten" : "Highlights"}</h3>
          <ul class="plain-list">${copy.sights.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
        </div>
      </div>
    </section>
    <section class="section band">
      <div class="section-heading">
        <div>
          <p class="eyebrow">${isNl ? "Ter plekke" : "On the ground"}</p>
          <h2>${isNl ? "Lokale ervaringen" : "Local experiences"}</h2>
        </div>
        <p>${isNl
          ? "Deze ervaringen zijn bedoeld als concrete bouwstenen binnen de pakketten of een aanvraag op maat."
          : "These experiences are practical building blocks inside the packages or a tailored inquiry."}</p>
      </div>
      <div class="grid grid-3">
        ${copy.experiences.map((item) => `
          <div class="feature">
            <strong>${item.slice(0, 2).toUpperCase()}</strong>
            <h3>${escapeHtml(item)}</h3>
            <p>${escapeHtml(destinationExperienceDetail(item, copy, isNl))}</p>
          </div>
        `).join("")}
      </div>
      <div class="button-row" style="margin-top: 2rem">
        <a class="button button-primary" href="#planner" data-plan-destination="${destination.id}">${t("common.plan")}</a>
        <a class="button button-secondary" href="#packages">${isNl ? "Vergelijk alle reizen" : "Compare all journeys"}</a>
      </div>
    </section>
    <section class="section">
      <div class="section-heading">
        <div>
          <p class="eyebrow">${isNl ? "Passende pakketten" : "Matching packages"}</p>
          <h2>${isNl ? "Pakketten die deze bestemming aandoen" : "Packages covering this destination"}</h2>
        </div>
        <p>${isNl
          ? "We tonen alleen pakketten die deze bestemming echt aandoen, zodat je meteen een passende route kunt vergelijken."
          : "We show only packages that truly include this destination, so you can quickly compare a relevant route."}</p>
      </div>
      <div class="grid grid-3">
        ${relatedPackages.length
          ? relatedPackages.map(packageCard).join("")
          : `<div class="empty-state full-span">${isNl ? "Er is nog geen pakket dat deze bestemming expliciet aandoet." : "No package currently lists this destination explicitly."}</div>`}
      </div>
    </section>
  `;
}

function packageCard(pkg) {
  const copy = local(pkg);
  return `
    <article class="package-card" data-package="${pkg.id}" data-card-link="#package-${pkg.id}" tabindex="0" role="link" aria-label="${escapeHtml(t("common.view"))}: ${escapeHtml(copy.title)}">
      ${imageCarousel(packageGallery(pkg), copy.title)}
      <div class="content">
        <div class="tag-row">
          <span class="tag teal">${titleCase(pkg.country)}</span>
          <span class="tag gold">${packageDurationLabel(pkg)}</span>
          <span class="tag">${pkg.budget === "premium" ? t("common.premium") : t("common.comfort")}</span>
          <span class="tag">${titleCase(pkg.theme)}</span>
        </div>
        <h3>${escapeHtml(copy.title)}</h3>
        <p>${escapeHtml(copy.short)}</p>
        <div class="meta-row">
          <span class="meta">${packagePriceLabel(pkg)}</span>
        </div>
        <div class="button-row">
          <a class="button button-secondary button-small" href="#package-${pkg.id}">${t("common.view")}</a>
          <a class="button button-primary button-small" href="#planner" data-plan-package="${pkg.id}">${t("common.plan")}</a>
        </div>
      </div>
    </article>
  `;
}

function packageFilters() {
  const isNl = state.lang === "nl";
  const unique = (key) => Array.from(new Set(packages.map((pkg) => pkg[key])));
  const option = (value, label) => `<option value="${value}">${label}</option>`;
  const count = packages.filter(packageMatches).length;
  const activeMonth = seasonalPackageMonth(state.seasonalMonth);
  return `
    ${activeMonth ? `
      <div class="notice" data-seasonal-filter-notice>
        <p>${isNl
          ? `Je bekijkt pakketten die passen bij ${activeMonth.nlMonth}. Deze selectie gebruikt alleen pakketten uit het vaste aanbod.`
          : `You are viewing packages that fit ${activeMonth.enMonth}. This selection uses only packages from the fixed line-up.`}</p>
      </div>
    ` : ""}
    <form class="filter-bar" data-package-filters>
      <div class="field">
        <label for="filter-destination">${t("common.country")}</label>
        <select id="filter-destination" name="destination">
          ${option("all", t("common.all"))}
          ${unique("country").map((value) => option(value, titleCase(value))).join("")}
        </select>
      </div>
      <div class="field">
        <label for="filter-duration">${t("common.duration")}</label>
        <select id="filter-duration" name="duration">
          ${option("all", t("common.all"))}
          ${option("7", "7-9")}
          ${option("10", "10-12")}
          ${option("14", "13+")}
        </select>
      </div>
      <div class="field">
        <label for="filter-budget">${t("common.budget")}</label>
        <select id="filter-budget" name="budget">
          ${option("all", t("common.all"))}
          ${unique("budget").map((value) => option(value, titleCase(value))).join("")}
        </select>
      </div>
      <div class="field">
        <label for="filter-theme">${t("common.theme")}</label>
        <select id="filter-theme" name="theme">
          ${option("all", t("common.all"))}
          ${unique("theme").map((value) => option(value, titleCase(value))).join("")}
        </select>
      </div>
    </form>
    <div class="filter-summary" data-filter-summary>
      <span data-filter-count>${count}</span>
      <span>${isNl ? "reizen passen bij je voorkeuren" : "journeys match your preferences"}</span>
      <button type="button" class="link-button" data-filter-reset>${isNl ? "Filters wissen" : "Clear filters"}</button>
    </div>
  `;
}

function packageMatches(pkg) {
  const { destination, duration, budget, theme } = state.filters;
  const activeMonth = seasonalPackageMonth(state.seasonalMonth);
  const seasonalMatch = !activeMonth || activeMonth.packageIds.includes(pkg.id);
  const durationMatch =
    duration === "all" ||
    (duration === "7" && pkg.duration >= 7 && pkg.duration <= 9) ||
    (duration === "10" && pkg.duration >= 10 && pkg.duration <= 12) ||
    (duration === "14" && pkg.duration >= 13);
  return (
    seasonalMatch &&
    (destination === "all" || pkg.country === destination) &&
    durationMatch &&
    (budget === "all" || pkg.budget === budget) &&
    (theme === "all" || pkg.theme === theme)
  );
}

function packagesPage() {
  const isNl = state.lang === "nl";
  const visiblePackages = packages.filter(packageMatches);
  const activeMonth = seasonalPackageMonth(state.seasonalMonth);
  return `
    ${pageHero({
      title: activeMonth
        ? (isNl ? `Pakketten voor ${activeMonth.nlMonth}` : `Packages for ${activeMonth.enMonth}`)
        : (isNl ? "Reizen en pakketten" : "Journeys and packages"),
      eyebrow: activeMonth
        ? (isNl ? "Seizoensselectie uit het aanbod" : "Seasonal selection from the line-up")
        : (isNl ? "Vaste inspiratie, reizen op maat" : "Fixed inspiration, custom journeys"),
      text: activeMonth
        ? (isNl
          ? "Deze pakketten komen uit het vaste aanbod en sluiten aan op de maandkaart die je hebt gekozen."
          : "These packages come from the fixed line-up and match the month card you selected.")
        : (isNl
          ? "Vergelijk de pakketten op land, duur, comfortniveau en thema. De kernroute en reisdagen blijven leidend."
          : "Compare packages by country, duration, comfort level and theme. The core route and duration remain the reference."),
      image: journeyHeroGallery[0],
      gallery: journeyHeroGallery,
    })}
    <section class="section">
      ${packageFilters()}
      <div class="grid grid-3" data-package-grid>
        ${visiblePackages.length ? visiblePackages.map(packageCard).join("") : `<div class="empty-state full-span">${isNl ? "Geen reizen gevonden voor deze filters." : "No journeys found for these filters."}</div>`}
      </div>
    </section>
  `;
}

const THEME_LABELS = {
  culture: { nl: "cultureel erfgoed", en: "cultural heritage" },
  heritage: { nl: "historisch erfgoed", en: "historical heritage" },
  wellness: { nl: "wellness en rust", en: "wellness and rest" },
  spirituality: { nl: "spiritualiteit en rituelen", en: "spirituality and rituals" },
  nature: { nl: "natuur en landschap", en: "nature and landscapes" },
  leisure: { nl: "strand en leisure", en: "beach and leisure" },
};

function packageOverviewText(pkg, copy, isNl) {
  if (copy.overview) return copy.overview;
  const theme = (THEME_LABELS[pkg.theme] || {})[isNl ? "nl" : "en"] || pkg.theme;
  const tier = pkg.budget === "premium"
    ? (isNl ? "premium" : "premium")
    : (isNl ? "comfort" : "comfort");
  const duration = packageDurationLabel(pkg).toLowerCase();
  if (isNl) {
    return `${copy.short} Deze reis van ${duration} volgt de route ${copy.route.join(" → ")} in een rustig ${tier}tempo, met de focus op ${theme}. Elke dag is zorgvuldig opgebouwd met persoonlijke begeleiding, comfortabele accommodatie en lokale ervaringen die je verbinden met de plekken die je bezoekt.`;
  }
  return `${copy.short} This ${duration} journey follows the route ${copy.route.join(" → ")} at a relaxed ${tier} pace, focused on ${theme}. Each day is carefully shaped with personal guidance, comfortable accommodation, and local experiences that connect you with the places you visit.`;
}

function packageHighlightsList(pkg, copy, isNl) {
  if (pkg.highlights?.length) return pkg.highlights;
  const baseHighlights = copy.itinerary
    .map(itineraryTitle)
    .filter((line) => !/aankomst|vertrek|terug|arrival|departure|return|bufferdag|buffer day/i.test(line))
    .slice(0, 6);
  const extras = isNl
    ? [`${packageDurationLabel(pkg)} volgens de vaste route`, "Sightseeing met Engelssprekende gids waar vermeld", "Vervoer en transfers volgens het definitieve voorstel"]
    : [`${packageDurationLabel(pkg)} following the fixed route`, "Sightseeing with English-speaking guide where listed", "Transport and transfers as per the final proposal"];
  return [...baseHighlights, ...extras].slice(0, 8);
}

function packageInclusionsList(pkg, isNl) {
  if (pkg.inclusions?.length) return pkg.inclusions;
  return isNl
    ? [
        "Accommodatie met ontbijt",
        "Privé airconditioned voertuig voor transfers en ritten waar van toepassing",
        "Engelssprekende gids tijdens sightseeing waar vermeld",
        "Airport transfers volgens route",
        "Alle toepasselijke belastingen",
      ]
    : [
        "Accommodation with breakfast",
        "Private air-conditioned vehicle for transfers and drives where applicable",
        "English-speaking guide during sightseeing where listed",
        "Airport transfers according to the route",
        "All applicable taxes",
      ];
}

function packageExclusionsList(isNl, pkg) {
  if (pkg?.exclusions?.length) return pkg.exclusions;
  return isNl
    ? [
        "Internationale vluchten",
        "Monumententickets",
        "Persoonlijke uitgaven en fooien",
        "Niet genoemde maaltijden, activiteiten en upgrades",
      ]
    : [
        "International flights",
        "Monument entry tickets",
        "Personal expenses and tips",
        "Meals, activities and upgrades not mentioned",
      ];
}

function packageOtherInfo(pkg, isNl) {
  const seasonByPackage = {
    "kashmir-paradise-tour": { nl: "April tot oktober past goed bij Srinagar, Dal Lake, Gulmarg en Pahalgam.", en: "April to October suits Srinagar, Dal Lake, Gulmarg and Pahalgam well." },
    "kathmandu-nepal-tour": { nl: "Oktober tot april is een sterke periode voor Kathmandu, Pokhara en Himalaya-uitzichten.", en: "October to April is a strong period for Kathmandu, Pokhara and Himalayan views." },
    "north-east-india-tour": { nl: "Oktober tot april is prettig voor Shillong, Gangtok en Darjeeling.", en: "October to April is comfortable for Shillong, Gangtok and Darjeeling." },
    "andaman-nicobar-island-tour": { nl: "Oktober tot april is populair voor Port Blair, stranddagen en eilandexcursies.", en: "October to April is popular for Port Blair, beach days and island excursions." },
    "grand-south-india-tour": { nl: "November tot maart is meestal het prettigst voor Zuid-India, Kerala en Karnataka.", en: "November to March is usually most comfortable for South India, Kerala and Karnataka." },
    "kerala-backwaters-hill-stations": { nl: "Oktober tot maart is fijn voor Fort Kochi, Munnar, Alleppey en Kovalam.", en: "October to March is pleasant for Fort Kochi, Munnar, Alleppey and Kovalam." },
    "goa-mumbai-leisure-tour": { nl: "November tot maart past goed bij Goa, Mumbai en stranddagen.", en: "November to March suits Goa, Mumbai and beach days well." },
  };
  const seasonNote = seasonByPackage[pkg.id] || {
    nl: "Oktober tot maart biedt vaak aangenaam weer voor erfgoedroutes, spirituele steden en sightseeing.",
    en: "October to March often brings pleasant weather for heritage routes, spiritual cities and sightseeing.",
  };
  const themeInfo = {
    wellness: isNl ? "Breng comfortabele kleding mee voor wandelingen, backwaters en ontspannen kustdagen." : "Pack comfortable clothing for walks, backwaters and relaxed coastal days.",
    spirituality: isNl ? "Bedek schouders en knieën bij tempelbezoek; sjaal handig." : "Cover shoulders and knees at temples; a shawl is useful.",
    culture: isNl ? "Lichte katoenen kleding en stevige wandelschoenen worden aanbevolen." : "Light cotton clothing and sturdy walking shoes are recommended.",
    heritage: isNl ? "Comfortabele wandelschoenen voor forten, paleizen en oude steden." : "Comfortable walking shoes for forts, palaces and old towns.",
    nature: isNl ? "Neem laagjes mee voor koele avonden, berglucht of wisselend weer." : "Pack layers for cool evenings, mountain air or changing weather.",
    leisure: isNl ? "Neem lichte kleding, strandbenodigdheden en comfortabele schoenen voor stadstours mee." : "Pack light clothing, beach essentials and comfortable shoes for city touring.",
  }[pkg.theme] || "";
  return [
    {
      titleNl: "Beste reisperiode", titleEn: "Best time to travel",
      bodyNl: `${seasonNote.nl} Plan vroeg voor populaire vakantieperiodes, tempeldarshan en Ganga Aarti-momenten waar deze in de route voorkomen.`,
      bodyEn: `${seasonNote.en} Plan early for popular holiday periods, temple darshan and Ganga Aarti moments where they are part of the route.`,
    },
    {
      titleNl: "Wat mee te nemen", titleEn: "What to pack",
      bodyNl: `Lichte laagjes, een windjack voor avonden, zonnebrand, een herbruikbare waterfles en een adapterstekker (type C, D of M). ${themeInfo}`,
      bodyEn: `Light layers, a windbreaker for evenings, sunscreen, a reusable water bottle and an adapter plug (type C, D or M). ${themeInfo}`,
    },
    {
      titleNl: "Aanpassen op maat", titleEn: "Tailor to you",
      bodyNl: "De vaste route en reisduur blijven de basis. Tempo, accommodatieniveau, dieet en aankomst-/vertrekdata kunnen in het persoonlijke voorstel worden afgestemd.",
      bodyEn: "The fixed route and duration remain the basis. Pace, accommodation level, dietary needs and arrival/departure dates can be refined in the personal proposal.",
    },
    {
      titleNl: "Annulering en wijzigingen", titleEn: "Cancellation and changes",
      bodyNl: "Wijzigings- en annuleringsvoorwaarden hangen af van hotels, binnenlandse vluchten en lokale diensten. De voorwaarden worden gedeeld voordat de reis definitief wordt bevestigd.",
      bodyEn: "Change and cancellation terms depend on hotels, domestic flights and local services. Terms are shared before the journey is finally confirmed.",
    },
  ];
}

function dayImageForText(text, pkg) {
  const t = `${itineraryTitle(text) || ""} ${itinerarySummary(text) || ""}`.toLowerCase();
  // ── Specific cities & landmarks ──────────────────────────────────────────
  if (/taj mahal|agra/.test(t))                       return images.tajMahal;
  if (/agra fort/.test(t))                            return images.agraFort;
  if (/mathura|vrindavan|ram mandir|ayodhya|saryu|bodhgaya|mahabodhi|nalanda|rajgir/.test(t)) return images.templeDetail;
  if (/red fort|old delhi/.test(t))                   return images.redFort;
  if (/qutub|qutb/.test(t))                           return images.qutubMinar;
  if (/delhi/.test(t))                                return images.indiaGate;
  if (/hawa mahal|city palace.*jaipur/.test(t))       return images.hawaMahal;
  if (/amber fort|amer/.test(t))                      return images.amberFort;
  if (/jaipur/.test(t))                               return images.hawaMahal;
  if (/ganga aarti|aarti/.test(t))                    return images.gangaAartiVaranasi;
  if (/varanasi|sarnath|ghat/.test(t))                return images.varanasiGhat;
  if (/mehrangarh|jodhpur/.test(t))                   return images.mehrangarh;
  if (/jaisalmer/.test(t))                            return images.jaisalmerFort;
  if (/udaipur/.test(t))                              return images.udaipurPalace;
  if (/pushkar/.test(t))                              return images.pushkarFair;
  if (/munnar/.test(t))                               return images.munnarTea;
  if (/alleppey|alappuzha|backwater/.test(t))         return images.keralaBackwater;
  if (/kochi|cochin|chinese fishing/.test(t))         return images.chineseFishingNets;
  if (/kerala/.test(t))                               return images.keralaBackwater;
  if (/hampi|virupaksha/.test(t))                     return images.hampiTemple;
  if (/mysore|mysuru/.test(t))                        return images.mysorePalace;
  if (/meenakshi|madurai/.test(t))                    return images.meenakshi;
  if (/mahabalipuram|mamallapuram|shore temple/.test(t)) return images.shoreTemple;
  if (/chennai/.test(t))                              return images.chennaiSkyline;
  if (/brihadeeswarar|thanjavur|tanjore/.test(t))     return images.brihadeeswarar;
  if (/gateway of india|mumbai/.test(t))              return images.mumbaiGateway;
  if (/marine drive/.test(t))                         return images.mumbaiMarine;
  if (/goa|basilica/.test(t))                         return images.goaBeach;
  if (/darjeeling/.test(t))                           return images.darjeelingTea;
  if (/srinagar|gulmarg|pahalgam|dal lake|shikara|kashmir/.test(t)) return images.himalaya;
  if (/shillong|mawlynnong|guwahati|gangtok|sikkim|north east/.test(t)) return images.kanchenjunga;
  if (/kolkata|victoria memorial/.test(t))            return images.kolkataVictoria;
  if (/patna|gandhi maidan|gandhi setu/.test(t))      return images.cityHeritage;
  if (/rameswaram|ramanathaswamy|kanyakumari|vivekananda rock|trivandrum|padmanabhaswamy|kovalam/.test(t)) return images.southTemple;
  if (/coimbatore|adiyogi|ooty|bangalore|lalbagh|iskcon/.test(t)) return images.mysorePalace;
  if (/port blair|cellular jail|andaman|nicobar|island excursion/.test(t)) return images.goaBeach;
  if (/vadodara|kevadia|statue of unity|ahmedabad|mount abu/.test(t)) return images.cityHeritage;
  if (/gwalior|khajuraho|jhansi|orchha|sanchi|bhopal|indore|omkareshwar|madhya pradesh/.test(t)) return images.templeDetail;
  if (/konark|sun temple/.test(t))                    return images.konarkSun;
  if (/boudhanath|kathmandu/.test(t))                 return images.boudhanath;
  if (/pokhara|phewa/.test(t))                        return images.phewaLake;
  if (/nepal/.test(t))                                return images.boudhanath;
  if (/holi/.test(t))                                 return images.holiColors;
  if (/diwali/.test(t))                               return images.diwaliDiyas;
  if (/durga puja/.test(t))                           return images.durgaPuja;
  if (/onam/.test(t))                                 return images.onamPookalam;
  if (/navratri|garba/.test(t))                       return images.navratriGarba;
  if (/hornbill/.test(t))                             return images.hornbillFestival;
  // ── Generic day types ─────────────────────────────────────────────────────
  if (/beach/.test(t))                                return images.goaBeach;
  if (/cuisine|food|culinair|kook|cooking|dining|diner|thali/.test(t)) return images.cuisine;
  if (/temple|mandir/.test(t))                        return images.templeDetail;
  if (/fort|palace/.test(t))                          return images.mehrangarh;
  if (/market|bazaar/.test(t))                        return images.cuisine;
  if (/mountain|himalaya/.test(t))                    return images.himalaya;
  if (/tea plantation|tea garden/.test(t))            return images.munnarTea;
  if (/arrival|aankomst/.test(t))                     return pkg.image || images.indiaGate;
  if (/departure|vertrek|terugreis|return/.test(t))   return pkg.image || images.indiaGate;
  // ── Fallback to package hero ──────────────────────────────────────────────
  return pkg.image || images.indiaGate;
}

function packageItineraryDay(pkg, dayText, idx, isNl) {
  const dayTitle = itineraryTitle(dayText) || "";
  const daySummary = itinerarySummary(dayText);
  const text = `${dayTitle} ${daySummary}`.toLowerCase();
  const isArrival = /aankomst|arrival/.test(text);
  const isDeparture = /vertrek|departure|terug|return/.test(text);
  const isTransfer = /rit|drive|vlucht|flight|trein|train/.test(text);

  let plan;
  if (daySummary) {
    plan = daySummary;
  } else if (isNl) {
    plan = isArrival
      ? `Welkom in ${pkg.destinations[0]}. Onze lokale vertegenwoordiger ontvangt je bij aankomst voor een vlotte transfer naar het hotel. Rust uit, acclimatiseer en geniet 's avonds van een eerste kennismaking met de stad.`
      : isDeparture
        ? `Een rustige laatste ochtend om indrukken te laten bezinken. Na de check-out brengt onze chauffeur je tijdig naar de luchthaven voor je vlucht of vervolgreis.`
        : isTransfer
          ? `Een comfortabele verplaatsing met privévervoer. We plannen onderweg een stop voor verfrissingen en korte bezienswaardigheden waar mogelijk.`
          : `Vandaag verkennen we ${dayTitle.toLowerCase()}. Onze gids deelt context en achtergrond, met voldoende tijd voor eigen ontdekking en fotografie.`;
  } else {
    plan = isArrival
      ? `Welcome to ${pkg.destinations[0]}. Our local representative meets you on arrival for a smooth transfer to your hotel. Rest, acclimatize, and enjoy a first taste of the city in the evening.`
      : isDeparture
        ? `A quiet final morning to let impressions settle. After check-out our chauffeur takes you to the airport in good time for your onward flight.`
        : isTransfer
          ? `A comfortable transfer in private transport. We plan a refreshment stop along the way and short sightseeing where time allows.`
          : `Today we explore ${dayTitle.toLowerCase()}. Your guide shares context and background, with plenty of time for your own discovery and photography.`;
  }

  const stayLabel = isNl ? "Overnachting" : "Stay";
  const mealsLabel = isNl ? "Maaltijden" : "Meals";
  const stay = isNl ? "Hotel volgens de vaste route en het definitieve voorstel" : "Hotel as per the fixed route and final proposal";
  const meals = isNl ? "Ontbijt waar accommodatie op ontbijtbasis is opgenomen" : "Breakfast where accommodation is included on breakfast basis";

  const image = dayImageForText(dayText, pkg);
  return { plan, stay, meals, stayLabel, mealsLabel, image };
}

function packageDetailPage(id) {
  const pkg = packages.find((item) => item.id === id);
  if (!pkg) return notFoundPage();
  const copy = local(pkg);
  const isNl = state.lang === "nl";
  const heroGallery = packageGallery(pkg);
  const overview = packageOverviewText(pkg, copy, isNl);
  const highlights = packageHighlightsList(pkg, copy, isNl);
  const inclusions = packageInclusionsList(pkg, isNl);
  const exclusions = packageExclusionsList(isNl, pkg);
  const otherInfo = packageOtherInfo(pkg, isNl);

  const tabs = [
    { id: "pkg-overview", label: isNl ? "Overzicht" : "Overview" },
    { id: "pkg-highlights", label: isNl ? "Hoogtepunten" : "Highlights" },
    { id: "pkg-itinerary", label: isNl ? "Dagindeling" : "Itinerary" },
    { id: "pkg-inclusions", label: isNl ? "Inbegrepen" : "Inclusions" },
    { id: "pkg-exclusions", label: isNl ? "Niet inbegrepen" : "Exclusions" },
    { id: "pkg-info", label: isNl ? "Goed om te weten" : "Other info" },
  ];

  // Hero action row ─ price label + two CTA buttons
  const perPersonPrice = pkg.price ? `${formatPrice(Math.round(pkg.price * 0.6))}/- ${isNl ? "p.p." : "Per Person"}` : packagePriceLabel(pkg);
  const heroActions = `
    <div class="hero-actions">
      <div class="hero-price-line">
        <span class="hero-price-badge" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="5" x2="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>
        </span>
        <span class="hero-price-label">${isNl ? "Prijs:" : "Price:"}</span>
        <span class="hero-price-amount">${perPersonPrice}</span>
      </div>
      <div class="hero-cta-buttons">
        <button type="button" class="hero-btn hero-btn-callback" data-hero-callback>
          <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.49 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.4 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.68a16 16 0 0 0 6 6l.78-.78a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2z"/></svg>
          ${isNl ? "Terugbelverzoek" : "Request a Callback"}
        </button>
        <button type="button" class="hero-btn hero-btn-chat" data-hero-chat>
          <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.52 3.48A11.86 11.86 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.12.55 4.16 1.6 5.98L0 24l6.18-1.62A11.94 11.94 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.21-3.48-8.52zM12 22a9.94 9.94 0 0 1-5.07-1.39l-.36-.21-3.67.96.98-3.58-.24-.37A9.94 9.94 0 0 1 2 12C2 6.48 6.48 2 12 2s10 4.48 10 10-4.48 10-10 10zm5.45-7.55c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51-.17-.01-.37-.01-.57-.01-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.87 1.22 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.22 1.36.19 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35z"/></svg>
          ${isNl ? "Contactopties" : "Contact Options"}
        </button>
      </div>
    </div>
  `;

  return `
    ${pageHero({
      title: copy.title,
      eyebrow: `${packageDurationLabel(pkg)} | ${titleCase(pkg.country)} | ${packagePriceLabel(pkg)}`,
      text: copy.short,
      image: heroGallery[0],
      gallery: heroGallery,
      actions: heroActions,
    })}
    <nav class="pkg-tabs" data-pkg-tabs aria-label="${isNl ? "Reisdetails" : "Trip details"}">
      <div class="pkg-tabs-inner">
        ${tabs.map((tab) => `<a href="#${tab.id}" data-pkg-tab="${tab.id}">${tab.label}</a>`).join("")}
      </div>
    </nav>
    <section class="section pkg-detail">
      <div class="split">
        <div class="pkg-content">
          <article class="pkg-section" id="pkg-overview">
            <h2>${isNl ? "Overzicht" : "Overview"}</h2>
            <p>${escapeHtml(overview)}</p>
          </article>

          <article class="pkg-section" id="pkg-highlights">
            <h2>${isNl ? "Hoogtepunten" : "Highlights"}</h2>
            <ul class="highlight-grid">
              ${highlights.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
            </ul>
          </article>

          <article class="pkg-section" id="pkg-itinerary">
            <h2>${isNl ? "Dag-tot-dag indeling" : "Day-by-day itinerary"}</h2>
            <p class="pkg-section-lead">${isNl ? "Klik op een dag om de uitgewerkte planning, accommodatie en maaltijden te bekijken." : "Click any day to expand the detailed plan, accommodation and meals."}</p>
            <div class="itinerary itinerary-accordion">
              ${copy.itinerary.map((line, idx) => {
                const detail = packageItineraryDay(pkg, line, idx, isNl);
                const open = idx === 0;
                const dayLabel = itineraryDayLabel(line, idx, isNl);
                const dayTitle = itineraryTitle(line);
                return `
                  <div class="itinerary-day ${open ? "is-open" : ""}" data-itinerary-day>
                    <button type="button" class="itinerary-day-header" data-itinerary-toggle aria-expanded="${open}">
                      <span class="itinerary-day-index">${dayLabel}</span>
                      <span class="itinerary-day-title">${escapeHtml(dayTitle)}</span>
                      <span class="itinerary-day-chevron" aria-hidden="true">▾</span>
                    </button>
                    <div class="itinerary-day-body">
                      <div class="itinerary-day-banner" style="background-image:url('${detail.image}')">
                        <div class="itinerary-day-banner-overlay">
                          <span class="itinerary-day-banner-index">${dayLabel}</span>
                          <span class="itinerary-day-banner-title">${escapeHtml(dayTitle)}</span>
                        </div>
                      </div>
                      <div class="itinerary-day-content">
                        <p>${escapeHtml(detail.plan)}</p>
                        <div class="itinerary-day-meta">
                          <div><span>${detail.stayLabel}</span><strong>${escapeHtml(detail.stay)}</strong></div>
                          <div><span>${detail.mealsLabel}</span><strong>${escapeHtml(detail.meals)}</strong></div>
                        </div>
                      </div>
                    </div>
                  </div>
                `;
              }).join("")}
            </div>
          </article>

          <article class="pkg-section" id="pkg-inclusions">
            <h2>${isNl ? "Wat is inbegrepen" : "What's included"}</h2>
            <ul class="checklist">
              ${inclusions.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
            </ul>
          </article>

          <article class="pkg-section" id="pkg-exclusions">
            <h2>${isNl ? "Niet inbegrepen" : "Not included"}</h2>
            <ul class="exclude-list">
              ${exclusions.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
            </ul>
          </article>

          <article class="pkg-section" id="pkg-info">
            <h2>${isNl ? "Goed om te weten" : "Good to know"}</h2>
            <div class="info-grid">
              ${otherInfo.map((card) => `
                <div class="info-card">
                  <h3>${escapeHtml(isNl ? card.titleNl : card.titleEn)}</h3>
                  <p>${escapeHtml(isNl ? card.bodyNl : card.bodyEn)}</p>
                </div>
              `).join("")}
            </div>
          </article>
        </div>

        <aside class="summary-panel pkg-summary">
          <h3>${isNl ? "Reisoverzicht" : "Journey summary"}</h3>
          <div class="summary-list">
            <div class="summary-line"><span>${t("common.route")}</span><strong>${copy.route.join(", ")}</strong></div>
            <div class="summary-line"><span>${t("common.duration")}</span><strong>${packageDurationLabel(pkg)}</strong></div>
            <div class="summary-line"><span>${t("common.budget")}</span><strong>${titleCase(pkg.budget)}</strong></div>
            <div class="summary-line"><span>${isNl ? "Thema" : "Theme"}</span><strong>${titleCase(pkg.theme)}</strong></div>
            <div class="summary-line"><span>${isNl ? "Prijs" : "Price"}</span><strong>${packagePriceLabel(pkg)}</strong></div>
          </div>
          <div class="notice" style="margin-top: 1rem">
            <p>${isNl
              ? "Internationale vluchten zijn niet inbegrepen. De prijs wordt op aanvraag bevestigd na beschikbaarheidscontrole."
              : "International flights are not included. The price is confirmed on request after availability checks."}</p>
          </div>
          <div class="button-row" style="margin-top: 1rem">
            <a class="button button-primary" href="#planner" data-plan-package="${pkg.id}">${t("common.plan")}</a>
          </div>
        </aside>
      </div>
    </section>
  `;
}

function seasonalPage() {
  const isNl = state.lang === "nl";
  return `
    ${pageHero({
      title: isNl ? "Seizoenen en festivals" : "Seasons and festivals",
      eyebrow: isNl ? "Reizen op het juiste moment" : "Travel at the right time",
      text: isNl
        ? "Maandadvies, Nederlandse schoolvakanties en festivalinspiratie helpen reizigers een passende periode kiezen."
        : "Monthly guidance, Dutch school holidays and festival inspiration help travelers choose the right period.",
      image: seasonalHeroGallery[0],
      gallery: seasonalHeroGallery,
    })}
    <section class="section">
      <div class="section-heading">
        <div><p class="eyebrow">${isNl ? "Per maand" : "By month"}</p><h2>${isNl ? "Wanneer waarheen" : "Where to go when"}</h2></div>
        <p>${isNl
            ? "Klik op een maand om direct naar pakketten uit het aanbod te gaan die bij die reisperiode passen."
            : "Click a month to jump directly to packages that fit that travel period."}</p>
      </div>
      <div class="months-grid">
        ${seasonalPackageData.map((item) => `
          <a class="month-item" href="#packages-season-${item.key}" data-seasonal-month="${item.key}" style="--month-image: url('${item.image}')">
            <h3>${isNl ? item.nlMonth : item.enMonth}</h3>
            <p>${escapeHtml(isNl ? item.nlText : item.enText)}</p>
            <span class="link-button">${isNl ? "Bekijk passende pakketten" : "View matching packages"}</span>
          </a>
        `).join("")}
      </div>
    </section>
    <section class="section">
      <div class="notice">
        <p>${isNl
          ? "Nederlandse schoolvakanties worden meegenomen in aanbevelingen voor families en werkende reizigers, vooral zomer, herfst en kerst/nieuwjaar."
          : "Dutch school holidays are considered in recommendations for families and working travelers, especially summer, autumn and Christmas/New Year."}</p>
      </div>
    </section>
  `;
}

function guidePage() {
  const isNl = state.lang === "nl";
  const items = isNl
    ? [
        ["Veiligheid", "Kies rustige routes, betrouwbare chauffeurs en lokale begeleiding bij drukke plekken."],
        ["Medische ondersteuning", "Neem reisverzekering, basisapotheek en actuele gezondheidsinformatie serieus."],
        ["Culturele verschillen", "Religieuze plekken, kleding, fotografie en persoonlijke ruimte vragen soms andere verwachtingen dan in Nederland."],
        ["Eten en drinken", "Start rustig, kies hygiënische restaurants en drink flessenwater of gefilterd water."],
        ["Visa en documenten", "Controleer visa, paspoortgeldigheid en eventuele permits ruim voor vertrek bij officiële bronnen."],
        ["Transport", "Afstanden lijken kort op de kaart, maar reistijd kan langer zijn door verkeer en wegen."],
      ]
    : [
        ["Safety", "Choose calm routes, reliable drivers and local guidance around busy places."],
        ["Medical support", "Take travel insurance, a basic medical kit and current health information seriously."],
        ["Cultural differences", "Religious places, clothing, photography and personal space can differ from Dutch expectations."],
        ["Food and water", "Start gently, choose hygienic restaurants and drink bottled or filtered water."],
        ["Visas and documents", "Check visas, passport validity and permits early through official sources."],
        ["Transport", "Distances can look short on a map, but travel time may be longer because of traffic and roads."],
      ];
  return `
    ${pageHero({
      title: isNl ? "Reisgids voor Nederlandse reizigers" : "Travel guide for Dutch travelers",
      eyebrow: isNl ? "Praktisch voorbereid" : "Practically prepared",
      text: isNl
        ? "Heldere voorbereiding voor eerste reizen naar India en Nepal, zonder de bestemming moeilijker te maken dan nodig."
        : "Clear preparation for first India and Nepal trips, without making the destination feel harder than it needs to be.",
      image: images.indiaGate,
    })}
    <section class="section">
      <div class="grid grid-3">
        ${items.map(([title, text]) => `<div class="feature"><strong>${title.slice(0, 2)}</strong><h3>${title}</h3><p>${text}</p></div>`).join("")}
      </div>
    </section>
    <section class="section band">
      <div class="split">
        <div>
          <h2>${isNl ? "Taal, geld en verwachtingen" : "Language, money and expectations"}</h2>
          <p>${isNl
            ? "De website gebruikt euro's, Nederlands en Engels, en legt uit wat reizigers kunnen verwachten rond gidsen, hotels, fooien, kleding en lokale omgangsvormen."
            : "The website uses euros, Dutch and English, and explains what travelers can expect around guides, hotels, tipping, clothing and local customs."}</p>
        </div>
        <div class="summary-panel">
          <h3>${isNl ? "Niet inbegrepen in pakketten" : "Not included in packages"}</h3>
          <ul class="plain-list">
            <li>${isNl ? "Internationale vluchten" : "International flights"}</li>
            <li>${isNl ? "Reisverzekering" : "Travel insurance"}</li>
            <li>${isNl ? "Persoonlijke uitgaven" : "Personal expenses"}</li>
            <li>${isNl ? "Visakosten en medische adviezen" : "Visa costs and medical advice"}</li>
          </ul>
        </div>
      </div>
    </section>
  `;
}

function faqsPage() {
  const isNl = state.lang === "nl";
  const faqs = isNl
    ? [
        ["Kan ik direct boeken?", "Je kunt een reisaanvraag afronden. Definitieve boeking volgt na beschikbaarheidscontrole, persoonlijk voorstel en schriftelijk akkoord."],
        ["Zijn internationale vluchten inbegrepen?", "Nee. De pakketten richten zich op landarrangementen na aankomst. Vluchtadvies kan later apart worden toegevoegd."],
        ["Voor wie zijn de reizen bedoeld?", "Voor koppels, families, senioren en premium reizigers die comfort, cultuur en begeleiding zoeken."],
        ["Kan ik een route aanpassen?", "Ja. De pakketnaam, reisduur en kernroute blijven het uitgangspunt van de vaste pakketlijst; tempo, hotelniveau, vrije tijd en voorkeuren kunnen in het voorstel worden afgestemd."],
        ["Waarom staat er prijs op aanvraag?", "Omdat er geen vaste prijzen op de website staan. De definitieve prijs hangt af van data, hotels, beschikbaarheid, groepsgrootte en binnenlandse vluchten waar van toepassing."],
        ["Welke landen zijn opgenomen?", "Het huidige aanbod richt zich op India en een aparte Kathmandu & Nepal route. Andere landen worden niet als pakketten of bestemmingen getoond."],
        ["Welke reisthema's zijn beschikbaar?", "Erfgoed, spiritualiteit, Zuid-India, Kerala backwaters, stranden en steden, Kashmir, North East India, Gujarat en MP Heritage. De filters volgen de vaste routes."],
        ["Wanneer kan ik het beste reizen?", "Oktober tot maart past goed bij veel klassieke en spirituele routes. Kashmir, Nepal, North East India en Andaman hebben ook sterke maanden buiten die periode; bekijk de maandkaarten voor passende pakketten."],
      ]
    : [
        ["Can I book directly?", "You can complete a travel request. Final booking follows after availability checks, a personal proposal and written approval."],
        ["Are international flights included?", "No. Packages focus on land arrangements after arrival. Flight guidance can be added separately later."],
        ["Who are the trips for?", "Couples, families, seniors and premium travelers seeking comfort, culture and guidance."],
        ["Can I customize a route?", "Yes. The package name, duration and core route stay aligned with the fixed package list; pace, hotel level, free time and preferences can be refined in the proposal."],
        ["Why are prices on request?", "Because fixed prices are not shown on the website. The final price depends on dates, hotels, availability, group size and domestic flights where applicable."],
        ["Which countries are included?", "The current line-up focuses on India and one dedicated Kathmandu & Nepal route. Other countries are not shown as packages or destinations."],
        ["Which travel themes are available?", "Heritage, spirituality, South India, Kerala backwaters, beaches and cities, Kashmir, North East India, Gujarat and MP Heritage. Filters follow the fixed routes."],
        ["When is the best time to travel?", "October to March suits many classic and spiritual routes. Kashmir, Nepal, North East India and Andaman also have strong months outside that period; use the month cards for matching packages."],
      ];
  return `
    ${pageHero({
      title: isNl ? "Veelgestelde vragen" : "Frequently asked questions",
      eyebrow: isNl ? "Duidelijkheid voor vertrek" : "Clarity before travel",
      text: isNl ? "Antwoorden op veelvoorkomende vragen over reizen, aanvragen, prijzen en voorbereiding." : "Answers to common questions about travel, inquiries, pricing and preparation.",
      image: images.munnarHills,
    })}
    <section class="section">
      <div class="faq-list">
        ${faqs.map(([question, answer], index) => `<details class="faq-item" ${index === 0 ? "open" : ""}><summary>${question}</summary><p>${answer}</p></details>`).join("")}
      </div>
    </section>
  `;
}

function contactPage() {
  const isNl = state.lang === "nl";
  return `
    ${pageHero({
      title: isNl ? "Contact" : "Contact",
      eyebrow: isNl ? "Reisaanvraag en advies" : "Trip inquiry and advice",
      text: isNl
        ? "Gebruik de planner voor een volledig reisverzoek. Zo kan het team snel zien welke route, reisduur en voorkeuren bij je passen."
        : "Use the planner for a full trip request. It helps the team see which route, duration and preferences fit you best.",
      image: images.contact,
    })}
    <section class="section">
      <div class="contact-strip">
        <div class="feature"><strong>01</strong><h3>${isNl ? "Start met de planner" : "Start with the planner"}</h3><p>${isNl ? "De snelste manier om pakket, data, reizigers en wensen overzichtelijk door te geven." : "The fastest way to share package, dates, travelers and preferences clearly."}</p></div>
        <div class="feature"><strong>02</strong><h3>${isNl ? "Persoonlijk voorstel" : "Personal proposal"}</h3><p>${isNl ? "Na controle van beschikbaarheid, route en diensten volgt een voorstel op maat." : "After checking availability, route and services, a tailored proposal can be shared."}</p></div>
        <div class="feature"><strong>NL</strong><h3>${isNl ? "Markt" : "Market"}</h3><p>${isNl ? "Nederland en Vlaams Belgie" : "The Netherlands and Flemish Belgium"}</p></div>
      </div>
      <div class="button-row" style="margin-top: 2rem">
        <a class="button button-primary" href="#planner">${t("common.plan")}</a>
        <a class="button button-secondary" href="#packages">${isNl ? "Bekijk pakketten" : "Explore packages"}</a>
      </div>
    </section>
  `;
}

function plannerPage() {
  const isNl = state.lang === "nl";
  const selectedPackage = packages.find((pkg) => pkg.id === state.trip.packageId || pkg.id === state.trip.packageInterest);
  const selectedDestination = destinations.find((dest) => dest.id === state.trip.destinationId || dest.id === state.trip.destinationInterest);
  const heroGallery = selectedPackage
    ? packageGallery(selectedPackage)
    : selectedDestination
      ? destinationGalleries[selectedDestination.id] || [selectedDestination.image]
      : packageGalleries["golden-triangle-tour"];
  const heroTitle = selectedPackage
    ? local(selectedPackage).title
    : selectedDestination
      ? local(selectedDestination).title
      : isNl
        ? "Plan mijn reis"
        : "Plan my trip";
  const heroText = selectedPackage
    ? local(selectedPackage).short
    : selectedDestination
      ? local(selectedDestination).short
      : isNl
        ? "Vul je voorkeuren in, bekijk je reisoverzicht en kies hoe je de aanvraag wilt afronden."
        : "Enter your preferences, review your travel summary and choose how you want to complete the request.";
  return `
    ${pageHero({
      title: heroTitle,
      eyebrow: isNl ? "Persoonlijk reisvoorstel" : "Personal travel proposal",
      text: heroText,
      image: heroGallery[0],
      gallery: heroGallery,
    })}
    <section class="section">
      <div class="workflow">
        <nav class="step-list" aria-label="${isNl ? "Planner stappen" : "Planner steps"}">
          ${[
            ["inquiry", isNl ? "Aanvraag" : "Inquiry"],
            ["quote", isNl ? "Voorstel" : "Proposal"],
            ["followup", isNl ? "Vervolg" : "Follow-up"],
            ["confirmation", isNl ? "Bevestiging" : "Confirmation"],
          ]
            .map(
              ([id, label], index) => `
                <button class="step-button ${state.plannerStep === id ? "active" : ""}" type="button" data-step="${id}">
                  <span>${index + 1}</span><span>${label}</span>
                </button>
              `
            )
            .join("")}
        </nav>
        <div>
          ${state.plannerStep === "inquiry" ? inquiryStep(selectedPackage, selectedDestination) : ""}
          ${state.plannerStep === "quote" ? quoteStep() : ""}
          ${state.plannerStep === "followup" ? followupStep() : ""}
          ${state.plannerStep === "confirmation" ? confirmationStep() : ""}
        </div>
      </div>
    </section>
  `;
}

function inquiryStep(selectedPackage, selectedDestination) {
  const isNl = state.lang === "nl";
  const packageOptions = packages
    .map((pkg) => `<option value="${pkg.id}" ${state.trip.packageId === pkg.id ? "selected" : ""}>${escapeHtml(local(pkg).title)}</option>`)
    .join("");
  const destinationOptions = destinations
    .map((dest) => `<option value="${dest.id}" ${state.trip.destinationId === dest.id ? "selected" : ""}>${escapeHtml(local(dest).title)}</option>`)
    .join("");
  return `
    <form class="form-panel" data-inquiry-form novalidate>
      <h2>${isNl ? "Reisaanvraag" : "Trip inquiry"}</h2>
      <p>${isNl
        ? "Deze aanvraag helpt ons een passend reisvoorstel te maken. Definitieve bevestiging volgt pas na beschikbaarheidscontrole en persoonlijk akkoord."
        : "This inquiry helps us prepare a suitable travel proposal. Final confirmation follows only after availability checks and personal approval."}</p>
      ${(selectedPackage || selectedDestination)
        ? `<div class="notice"><p>${isNl ? "Voorselectie" : "Preselection"}: ${escapeHtml(selectedPackage ? local(selectedPackage).title : local(selectedDestination).title)}</p></div>`
        : ""}
      <div class="form-grid">
        ${field("name", isNl ? "Naam" : "Name", "text", true)}
        ${field("email", "Email", "email", true)}
        ${field("phone", isNl ? "Telefoon / WhatsApp" : "Phone / WhatsApp", "tel", true)}
        ${field("country", isNl ? "Woonland" : "Country of residence", "text", true, isNl ? "Nederland" : "Netherlands")}
        ${field("dates", isNl ? "Gewenste reisdata" : "Preferred travel dates", "text", true, isNl ? "Bijv. oktober 2026" : "E.g. October 2026")}
        ${field("travelers", isNl ? "Aantal reizigers" : "Number of travelers", "number", true, "", "1")}
        <div class="field">
          <label for="budget">${isNl ? "Budgetrange" : "Budget range"}</label>
          <select id="budget" name="budget" required>
            <option value="">${isNl ? "Kies budget" : "Choose budget"}</option>
            <option value="comfort">Comfort</option>
            <option value="premium">Premium</option>
          </select>
          <span class="error"></span>
        </div>
        <div class="field">
          <label for="packageInterest">${isNl ? "Pakketinteresse" : "Package interest"}</label>
          <select id="packageInterest" name="packageInterest" required>
            <option value="">${isNl ? "Kies pakket" : "Choose package"}</option>
            ${packageOptions}
            <option value="custom">${isNl ? "Volledig op maat" : "Fully custom"}</option>
          </select>
          <span class="error"></span>
        </div>
        <div class="field">
          <label for="destinationInterest">${isNl ? "Bestemming" : "Destination"}</label>
          <select id="destinationInterest" name="destinationInterest" required>
            <option value="">${isNl ? "Kies bestemming" : "Choose destination"}</option>
            ${destinationOptions}
          </select>
          <span class="error"></span>
        </div>
        <div class="field">
          <label for="style">${isNl ? "Reisstijl" : "Travel style"}</label>
          <select id="style" name="style" required>
            <option value="">${isNl ? "Kies stijl" : "Choose style"}</option>
            <option>${isNl ? "Cultuur en erfgoed" : "Culture and heritage"}</option>
            <option>${isNl ? "Spiritualiteit en festivals" : "Spirituality and festivals"}</option>
            <option>${isNl ? "Tempels en pelgrimage" : "Temples and pilgrimage"}</option>
            <option>${isNl ? "Backwaters en hill stations" : "Backwaters and hill stations"}</option>
            <option>${isNl ? "Strand en stadsbeleving" : "Beach and city experience"}</option>
            <option>${isNl ? "Rustig comforttempo" : "Calm comfort pace"}</option>
            <option>${isNl ? "Premium maatwerk" : "Premium custom travel"}</option>
          </select>
          <span class="error"></span>
        </div>
        <div class="field">
          <label for="accommodation">${isNl ? "Accommodatievoorkeur" : "Accommodation preference"}</label>
          <select id="accommodation" name="accommodation" required>
            <option value="">${isNl ? "Kies voorkeur" : "Choose preference"}</option>
            <option>Comfort</option>
            <option>Premium</option>
            <option>Boutique</option>
            <option>${isNl ? "Mix van comfort en premium" : "Mix of comfort and premium"}</option>
          </select>
          <span class="error"></span>
        </div>
        <div class="field full-span">
          <label for="needs">${isNl ? "Speciale wensen of medische aandachtspunten" : "Special wishes or medical notes"}</label>
          <textarea id="needs" name="needs">${escapeHtml(state.trip.needs || "")}</textarea>
          <span class="error"></span>
        </div>
        <div class="field full-span">
          <label for="message">${isNl ? "Bericht" : "Message"}</label>
          <textarea id="message" name="message" required>${escapeHtml(state.trip.message || "")}</textarea>
          <span class="error"></span>
        </div>
      </div>
      <div class="button-row" style="margin-top: 1.1rem">
        <button class="button button-primary" type="submit">${isNl ? "Bekijk reisvoorstel" : "View travel proposal"}</button>
      </div>
    </form>
  `;
}

function field(name, label, type, required, placeholder = "", min = "") {
  const value = escapeHtml(state.trip[name] || "");
  return `
    <div class="field">
      <label for="${name}">${label}</label>
      <input id="${name}" name="${name}" type="${type}" ${required ? "required" : ""} ${placeholder ? `placeholder="${placeholder}"` : ""} ${min ? `min="${min}"` : ""} value="${value}" />
      <span class="error"></span>
    </div>
  `;
}

function getSelectedPackageForQuote() {
  return packages.find((pkg) => pkg.id === state.trip.packageInterest) || packages.find((pkg) => pkg.id === state.trip.packageId) || packages[0];
}

function quoteStep() {
  const isNl = state.lang === "nl";
  const pkg = getSelectedPackageForQuote();
  const travelerCount = Math.max(Number(state.trip.travelers || 1), 1);
  const totalLabel = pkg.price ? formatPrice(pkg.price * travelerCount) : packagePriceLabel(pkg);
  return `
    <div class="summary-panel">
      <p class="eyebrow">${isNl ? "Reisvoorstel" : "Travel proposal"}</p>
      <h2>${isNl ? "Voorlopige reissamenvatting" : "Preliminary trip summary"}</h2>
      <p>${isNl
        ? "Dit overzicht is gebaseerd op je voorkeuren. Een adviseur kan de route, hotels en beschikbaarheid verder met je afstemmen."
        : "This overview is based on your preferences. A travel advisor can refine the route, hotels and availability with you."}</p>
      <div class="summary-list">
        <div class="summary-line"><span>${isNl ? "Naam" : "Name"}</span><strong>${escapeHtml(state.trip.name || "-")}</strong></div>
        <div class="summary-line"><span>${isNl ? "Reis" : "Journey"}</span><strong>${escapeHtml(local(pkg).title)}</strong></div>
        <div class="summary-line"><span>${isNl ? "Data" : "Dates"}</span><strong>${escapeHtml(state.trip.dates || "-")}</strong></div>
        <div class="summary-line"><span>${isNl ? "Reizigers" : "Travelers"}</span><strong>${travelerCount}</strong></div>
        <div class="summary-line"><span>${isNl ? "Prijsstatus" : "Price status"}</span><strong>${totalLabel}</strong></div>
      </div>
      <div class="notice">
        <p>${isNl
          ? "Internationale vluchten, reisverzekering, visa en persoonlijke uitgaven zijn niet inbegrepen."
          : "International flights, travel insurance, visas and personal expenses are not included."}</p>
      </div>
      <div class="button-row" style="margin-top: 1rem">
        <button class="button button-secondary" type="button" data-step="inquiry">${isNl ? "Aanpassen" : "Edit"}</button>
        <button class="button button-primary" type="button" data-step="followup">${isNl ? "Kies vervolgvoorkeur" : "Choose follow-up preference"}</button>
      </div>
    </div>
  `;
}

function followupStep() {
  const isNl = state.lang === "nl";
  const pkg = getSelectedPackageForQuote();
  const travelerCount = Math.max(Number(state.trip.travelers || 1), 1);
  const amountLabel = pkg.price ? formatPrice(pkg.price * travelerCount) : packagePriceLabel(pkg);
  return `
    <form class="form-panel" data-followup-form novalidate>
      <p class="eyebrow">${t("common.requestStep")}</p>
      <h2>${isNl ? "Vervolgvoorkeur" : "Follow-up preference"}</h2>
      <div class="followup-box">
        <p>${isNl
          ? "Kies hoe je het persoonlijke reisvoorstel wilt ontvangen. Een boeking wordt pas definitief na beschikbaarheidscontrole, voorwaarden en schriftelijk akkoord."
          : "Choose how you would like to receive the personal travel proposal. A booking becomes final only after availability checks, terms and written approval."}</p>
        <div class="summary-line"><span>${isNl ? "Prijsstatus" : "Price status"}</span><strong>${amountLabel}</strong></div>
      </div>
      <div class="form-grid" style="margin-top: 1rem">
        <div class="field">
          <label for="followupName">${isNl ? "Contactnaam" : "Contact name"}</label>
          <input id="followupName" name="followupName" required value="${escapeHtml(state.trip.name || "")}" />
          <span class="error"></span>
        </div>
        <div class="field">
          <label for="followupMethod">${isNl ? "Voorkeur voor vervolg" : "Preferred follow-up"}</label>
          <select id="followupMethod" name="followupMethod" required>
            <option value="">${isNl ? "Kies voorkeur" : "Choose preference"}</option>
            <option>${isNl ? "Voorstel per email ontvangen" : "Receive proposal by email"}</option>
            <option>${isNl ? "WhatsApp of telefoongesprek plannen" : "Plan a WhatsApp or phone call"}</option>
            <option>${isNl ? "Eerst extra wensen bespreken" : "Discuss extra wishes first"}</option>
          </select>
          <span class="error"></span>
        </div>
        <label class="field full-span">
          <span class="choice-label">${isNl ? "Bevestiging" : "Acknowledgement"}</span>
          <span style="display: flex; gap: .65rem; align-items: start">
            <input type="checkbox" name="acknowledge" required style="width: 20px; min-height: 20px; margin-top: .18rem" />
            <span>${isNl
              ? "Ik begrijp dat definitieve boeking pas volgt na persoonlijk reisvoorstel, voorwaarden en akkoord."
              : "I understand final booking follows only after a personal travel proposal, terms and approval."}</span>
          </span>
          <span class="error"></span>
        </label>
      </div>
      <div class="button-row" style="margin-top: 1rem">
        <button class="button button-secondary" type="button" data-step="quote">${isNl ? "Terug naar voorstel" : "Back to proposal"}</button>
        <button class="button button-primary" type="submit">${isNl ? "Rond aanvraag af" : "Complete request"}</button>
      </div>
    </form>
  `;
}

function confirmationStep() {
  const isNl = state.lang === "nl";
  const pkg = getSelectedPackageForQuote();
  return `
    <div class="summary-panel">
      <p class="eyebrow">${isNl ? "Aanvraagbevestiging" : "Request confirmation"}</p>
      <h2>${isNl ? "Aanvraagflow afgerond" : "Inquiry flow complete"}</h2>
      <p>${isNl
        ? "Je reisvoorkeuren zijn samengebracht in een overzicht. Een adviseur kan hiermee een persoonlijk reisvoorstel voorbereiden."
        : "Your travel preferences have been brought together in one summary. A travel advisor can use this to prepare a personal proposal."}</p>
      <div class="summary-list">
        <div class="summary-line"><span>${isNl ? "Referentie" : "Reference"}</span><strong>BMT-${Date.now().toString().slice(-6)}</strong></div>
        <div class="summary-line"><span>${isNl ? "Reis" : "Journey"}</span><strong>${escapeHtml(local(pkg).title)}</strong></div>
        <div class="summary-line"><span>${isNl ? "Contact" : "Contact"}</span><strong>${escapeHtml(state.trip.email || "-")}</strong></div>
      </div>
      <div class="notice">
        <p>${isNl
          ? "Een reis wordt pas definitief nadat route, prijs, voorwaarden en beschikbaarheid schriftelijk zijn bevestigd."
          : "A journey becomes final only after route, price, terms and availability are confirmed in writing."}</p>
      </div>
      <div class="button-row" style="margin-top: 1rem">
        <a class="button button-primary" href="#packages">${isNl ? "Terug naar reizen" : "Back to journeys"}</a>
        <button class="button button-secondary" type="button" data-reset-flow>${isNl ? "Nieuwe aanvraag" : "New inquiry"}</button>
      </div>
    </div>
  `;
}

function policyPage(type) {
  const content = policyContent[type] || policyContent.privacy;
  const copy = content[state.lang];
  const isNl = state.lang === "nl";
  return `
    <section class="section policy-page">
      <p class="eyebrow">${isNl ? "Reisinformatie" : "Travel information"}</p>
      <h1>${copy.title}</h1>
      <div class="policy-panel">
        <p>${copy.body}</p>
        <div class="notice">
          <p>${isNl
            ? "De definitieve voorwaarden worden altijd samen met het persoonlijke reisvoorstel gedeeld voordat een reis wordt bevestigd."
            : "Final terms are always shared with the personal travel proposal before a journey is confirmed."}</p>
        </div>
      </div>
    </section>
  `;
}

function notFoundPage() {
  const isNl = state.lang === "nl";
  return `
    <section class="section">
      <div class="empty-state">
        <h1>${isNl ? "Pagina niet gevonden" : "Page not found"}</h1>
        <p>${isNl ? "Kies een onderdeel uit de navigatie." : "Choose a section from the navigation."}</p>
        <a class="button button-primary" href="#home">${isNl ? "Naar home" : "Go home"}</a>
      </div>
    </section>
  `;
}

function renderRoute() {
  const route = (window.location.hash || "#home").replace("#", "");
  updateStaticText();
  closeNav();

  if (route.startsWith("destination-")) {
    app.innerHTML = destinationDetailPage(route.replace("destination-", ""));
  } else if (route.startsWith("package-")) {
    app.innerHTML = packageDetailPage(route.replace("package-", ""));
  } else if (route.startsWith("packages-season-")) {
    state.seasonalMonth = route.replace("packages-season-", "");
    state.filters = { destination: "all", duration: "all", budget: "all", theme: "all" };
    app.innerHTML = packagesPage();
  } else if (route.startsWith("policy-")) {
    app.innerHTML = policyPage(route.replace("policy-", ""));
  } else {
    if (route === "packages") {
      state.seasonalMonth = null;
    }
    const routes = {
      home: homePage,
      about: aboutPage,
      destinations: destinationsPage,
      packages: packagesPage,
      planner: plannerPage,
      seasonal: seasonalPage,
      guide: guidePage,
      faqs: faqsPage,
      contact: contactPage,
    };
    app.innerHTML = (routes[route] || notFoundPage)();
  }

  triggerPageFade();
  bindDynamicEvents();
  highlightNav(route);
  updateScrollAtmosphere();
  app.focus({ preventScroll: true });
  window.scrollTo({ top: 0, behavior: "auto" });
  updateScrollAtmosphere();
}

function triggerPageFade() {
  app.classList.remove("is-entering");
  void app.offsetWidth;
  app.classList.add("is-entering");
}

function bindCardLinks(scope = document) {
  scope.querySelectorAll("[data-card-link]").forEach((card) => {
    if (card.dataset.cardBound === "true") return;
    card.dataset.cardBound = "true";
    const navigate = () => {
      const target = card.dataset.cardLink;
      if (!target) return;
      window.location.hash = target.replace(/^#/, "");
    };

    card.addEventListener("click", (event) => {
      if (event.target.closest("a, button, input, select, textarea, label, summary")) return;
      navigate();
    });

    card.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      if (event.target.closest("a, button, input, select, textarea, label, summary")) return;
      event.preventDefault();
      navigate();
    });
  });
}

function updatePackageGrid() {
  const grid = document.querySelector("[data-package-grid]");
  const countNode = document.querySelector("[data-filter-count]");
  const summary = document.querySelector("[data-filter-summary]");
  if (!grid) return;
  const isNl = state.lang === "nl";
  const visiblePackages = packages.filter(packageMatches);
  grid.innerHTML = visiblePackages.length
    ? visiblePackages.map(packageCard).join("")
    : `<div class="empty-state full-span">${isNl ? "Geen reizen gevonden voor deze filters." : "No journeys found for these filters."}</div>`;
  if (countNode) countNode.textContent = visiblePackages.length;
  if (summary) {
    summary.classList.remove("is-flash");
    void summary.offsetWidth;
    summary.classList.add("is-flash");
  }
  bindCardLinks(grid);
  document.querySelectorAll("[data-package-grid] [data-plan-package]").forEach((node) => {
    node.addEventListener("click", () => {
      state.trip.packageId = node.dataset.planPackage;
      state.trip.packageInterest = node.dataset.planPackage;
      state.plannerStep = "inquiry";
    });
  });
}

function highlightNav(route) {
  document.querySelectorAll(".site-nav a").forEach((link) => {
    const target = link.getAttribute("href").replace("#", "");
    link.classList.toggle("active", route === target || route.startsWith(`${target}-`));
  });
}

function bindDynamicEvents() {
  bindCardLinks();

  document.querySelectorAll("[data-plan-package]").forEach((node) => {
    node.addEventListener("click", () => {
      state.trip.packageId = node.dataset.planPackage;
      state.trip.packageInterest = node.dataset.planPackage;
      state.plannerStep = "inquiry";
    });
  });

  document.querySelectorAll("[data-plan-destination]").forEach((node) => {
    node.addEventListener("click", () => {
      state.trip.destinationId = node.dataset.planDestination;
      state.trip.destinationInterest = node.dataset.planDestination;
      state.plannerStep = "inquiry";
    });
  });

  const filterForm = document.querySelector("[data-package-filters]");
  if (filterForm) {
    Object.entries(state.filters).forEach(([key, value]) => {
      const fieldNode = filterForm.elements[key];
      if (fieldNode) fieldNode.value = value;
    });
    filterForm.addEventListener("change", () => {
      const data = new FormData(filterForm);
      state.filters = Object.fromEntries(data.entries());
      updatePackageGrid();
    });
  }

  const filterReset = document.querySelector("[data-filter-reset]");
  if (filterReset) {
    filterReset.addEventListener("click", () => {
      state.filters = { destination: "all", duration: "all", budget: "all", theme: "all" };
      state.seasonalMonth = null;
      if (filterForm) {
        Object.entries(state.filters).forEach(([key, value]) => {
          const fieldNode = filterForm.elements[key];
          if (fieldNode) fieldNode.value = value;
        });
      }
      if (window.location.hash.startsWith("#packages-season-")) {
        window.location.hash = "packages";
      } else {
        updatePackageGrid();
      }
    });
  }

  const inquiryForm = document.querySelector("[data-inquiry-form]");
  if (inquiryForm) {
    if (state.trip.budget) inquiryForm.elements.budget.value = state.trip.budget;
    if (state.trip.packageInterest) inquiryForm.elements.packageInterest.value = state.trip.packageInterest;
    if (state.trip.destinationInterest) inquiryForm.elements.destinationInterest.value = state.trip.destinationInterest;
    if (state.trip.style) inquiryForm.elements.style.value = state.trip.style;
    if (state.trip.accommodation) inquiryForm.elements.accommodation.value = state.trip.accommodation;

    attachLiveValidation(inquiryForm);
    inquiryForm.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!validateForm(inquiryForm)) return;
      state.trip = {
        ...state.trip,
        ...Object.fromEntries(new FormData(inquiryForm).entries()),
      };
      state.plannerStep = "quote";
      renderRoute();
    });
  }

  const followupForm = document.querySelector("[data-followup-form]");
  if (followupForm) {
    attachLiveValidation(followupForm);
    followupForm.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!validateForm(followupForm)) return;
      state.plannerStep = "confirmation";
      renderRoute();
    });
  }

  document.querySelectorAll("[data-step]").forEach((node) => {
    node.addEventListener("click", () => {
      const nextStep = node.dataset.step;
      if (nextStep !== "inquiry" && !state.trip.name) {
        state.plannerStep = "inquiry";
      } else {
        state.plannerStep = nextStep;
      }
      if (window.location.hash !== "#planner") {
        window.location.hash = "planner";
      } else {
        renderRoute();
      }
    });
  });

  document.querySelectorAll("[data-reset-flow]").forEach((node) => {
    node.addEventListener("click", () => {
      state.trip = {};
      state.plannerStep = "inquiry";
      renderRoute();
    });
  });

  document.querySelectorAll("[data-carousel-prev], [data-carousel-next]").forEach((node) => {
    node.addEventListener("click", () => {
      const target = node.dataset.carouselPrev || node.dataset.carouselNext;
      const track = document.querySelector(`[data-carousel="${target}"]`);
      if (!track) return;
      const direction = node.dataset.carouselPrev ? -1 : 1;
      track.scrollBy({ left: direction * Math.round(track.clientWidth * 0.82), behavior: "smooth" });
    });
  });

  // ── Hero CTA buttons ────────────────────────────────────────────────────
  document.querySelectorAll("[data-hero-callback]").forEach((btn) => {
    btn.addEventListener("click", () => {
      // Scroll to the trip planner and pre-select callback intent
      window.location.hash = "planner";
    });
  });

  document.querySelectorAll("[data-hero-chat]").forEach((btn) => {
    btn.addEventListener("click", () => {
      window.location.hash = "contact";
    });
  });

  // ── Itinerary accordion ──────────────────────────────────────────────────
  document.querySelectorAll("[data-itinerary-toggle]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const day = btn.closest("[data-itinerary-day]");
      if (!day) return;
      const isOpen = day.classList.contains("is-open");
      day.classList.toggle("is-open", !isOpen);
      btn.setAttribute("aria-expanded", String(!isOpen));
    });
  });

  // ── Package tabs: smooth scroll with header offset ───────────────────────
  const pkgTabNav = document.querySelector("[data-pkg-tabs]");
  if (pkgTabNav) {
    pkgTabNav.querySelectorAll("a[data-pkg-tab]").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = link.dataset.pkgTab;
        const section = document.getElementById(targetId);
        if (!section) return;
        const headerEl = document.querySelector("[data-header]") || document.querySelector("header");
        const headerH = headerEl ? headerEl.offsetHeight : 0;
        const tabsH = pkgTabNav.offsetHeight;
        const top = section.getBoundingClientRect().top + window.scrollY - headerH - tabsH - 8;
        window.scrollTo({ top, behavior: "smooth" });
      });
    });

    // ── Scroll-spy: highlight active tab as user scrolls ─────────────────
    const tabSections = Array.from(pkgTabNav.querySelectorAll("a[data-pkg-tab]"))
      .map((a) => ({ link: a, el: document.getElementById(a.dataset.pkgTab) }))
      .filter((item) => item.el);

    if (tabSections.length) {
      const setActiveTab = () => {
        const scrollMid = window.scrollY + window.innerHeight * 0.35;
        let active = tabSections[0];
        for (const item of tabSections) {
          if (item.el.getBoundingClientRect().top + window.scrollY <= scrollMid) {
            active = item;
          }
        }
        tabSections.forEach(({ link }) => link.classList.toggle("is-active", link === active.link));
      };
      window.addEventListener("scroll", setActiveTab, { passive: true });
      setActiveTab();
    }
  }
}

function validateForm(form) {
  let valid = true;
  let firstInvalid = null;

  form.querySelectorAll(".field").forEach((wrapper) => {
    wrapper.classList.remove("is-invalid");
    const errorNode = wrapper.querySelector(".error");
    if (errorNode) errorNode.textContent = "";
  });

  form.querySelectorAll("[required]").forEach((fieldNode) => {
    const isCheckbox = fieldNode.type === "checkbox";
    const missing = isCheckbox ? !fieldNode.checked : !fieldNode.value.trim();
    if (missing) {
      valid = false;
      const wrapper = fieldNode.closest(".field");
      if (wrapper) {
        wrapper.classList.add("is-invalid");
        const errorNode = wrapper.querySelector(".error");
        if (errorNode) errorNode.textContent = t("common.required");
      }
      if (!firstInvalid) firstInvalid = fieldNode;
    }
  });

  const email = form.querySelector('input[type="email"]');
  if (email && email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    valid = false;
    const wrapper = email.closest(".field");
    if (wrapper) {
      wrapper.classList.add("is-invalid");
      const errorNode = wrapper.querySelector(".error");
      if (errorNode) {
        errorNode.textContent =
          state.lang === "nl" ? "Voer een geldig emailadres in." : "Enter a valid email address.";
      }
    }
    if (!firstInvalid) firstInvalid = email;
  }

  if (!valid && firstInvalid) {
    firstInvalid.focus({ preventScroll: false });
    firstInvalid.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  return valid;
}

function attachLiveValidation(form) {
  if (!form || form.dataset.liveValidationAttached === "true") return;
  form.dataset.liveValidationAttached = "true";
  form.addEventListener("input", (event) => {
    const target = event.target;
    if (!target || !target.closest) return;
    const wrapper = target.closest(".field");
    if (!wrapper || !wrapper.classList.contains("is-invalid")) return;
    const valueOk = target.type === "checkbox" ? target.checked : !!target.value.trim();
    if (valueOk) {
      wrapper.classList.remove("is-invalid");
      const errorNode = wrapper.querySelector(".error");
      if (errorNode) errorNode.textContent = "";
    }
  });
}

function closeNav() {
  document.body.classList.remove("nav-open");
  navToggle.setAttribute("aria-expanded", "false");
}

navToggle.addEventListener("click", () => {
  const open = !document.body.classList.contains("nav-open");
  document.body.classList.toggle("nav-open", open);
  navToggle.setAttribute("aria-expanded", String(open));
});

langToggle.addEventListener("click", () => {
  state.lang = state.lang === "nl" ? "en" : "nl";
  localStorage.setItem("bmt-lang", state.lang);
  renderRoute();
});

window.addEventListener("hashchange", renderRoute);
window.addEventListener("scroll", updateScrollAtmosphere, { passive: true });
window.addEventListener("resize", updateScrollAtmosphere);

if (!window.location.hash) {
  window.location.hash = "home";
} else {
  renderRoute();
}

function updateScrollAtmosphere() {
  const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
  const progress = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);
  document.documentElement.style.setProperty("--scroll-progress", progress.toFixed(4));
}
