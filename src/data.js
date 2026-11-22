// Demo content. Replace with API data once a backend exists.

export const COUNTIES = [
  "Carlow", "Cavan", "Clare", "Cork", "Donegal", "Dublin", "Galway", "Kerry",
  "Kildare", "Kilkenny", "Laois", "Leitrim", "Limerick", "Longford", "Louth",
  "Mayo", "Meath", "Monaghan", "Offaly", "Roscommon", "Sligo", "Tipperary",
  "Waterford", "Westmeath", "Wexford", "Wicklow",
];

// mode: "hourly" = handyman & maintenance, "quote" = building & trade projects
// typicalHours / fromRate drive the instant estimate in the booking flow.
export const SERVICES = [
  { id: "handyman", name: "General handyman", icon: "wrench", mode: "hourly", fromRate: 35, typicalHours: 2,
    blurb: "Odd jobs, fixes and the to-do list you never get to." },
  { id: "assembly", name: "Furniture assembly", icon: "sofa", mode: "hourly", fromRate: 30, typicalHours: 2,
    blurb: "Flat-pack wardrobes, beds, desks and garden furniture." },
  { id: "mounting", name: "TV & wall mounting", icon: "tv", mode: "hourly", fromRate: 35, typicalHours: 1.5,
    blurb: "TVs, shelves, mirrors, curtain poles and blinds." },
  { id: "painting", name: "Painting & touch-ups", icon: "brush", mode: "hourly", fromRate: 32, typicalHours: 6,
    blurb: "A room, a door, a fence. Small decorating jobs." },
  { id: "garden", name: "Garden & hedge work", icon: "leaf", mode: "hourly", fromRate: 30, typicalHours: 3,
    blurb: "Lawns, hedges, power-washing and green-waste runs." },
  { id: "plumbing-repair", name: "Plumbing repairs", icon: "drop", mode: "hourly", fromRate: 55, typicalHours: 1.5,
    blurb: "Leaks, taps, toilets, radiators and blocked sinks." },
  { id: "electrical-repair", name: "Electrical repairs", icon: "bolt", mode: "hourly", fromRate: 55, typicalHours: 1.5,
    blurb: "Sockets, lights and fault-finding by Safe Electric registered sparks." },
  { id: "cleaning", name: "Cleaning", icon: "sparkle", mode: "hourly", fromRate: 25, typicalHours: 3,
    blurb: "End-of-tenancy, deep cleans, gutters and windows." },
  { id: "moving", name: "Moving help", icon: "van", mode: "hourly", fromRate: 40, typicalHours: 3,
    blurb: "A van and a pair of hands for flat moves and collections." },

  { id: "extension", name: "Extensions", icon: "house", mode: "quote", fromPrice: 25000,
    blurb: "Single and two-storey extensions, from plans to handover." },
  { id: "kitchen", name: "Kitchen fitting", icon: "kitchen", mode: "quote", fromPrice: 3500,
    blurb: "Supply-and-fit or fit-only, including worktops and tiling." },
  { id: "bathroom", name: "Bathroom refits", icon: "bath", mode: "quote", fromPrice: 4500,
    blurb: "Full refits, wet rooms and accessible bathrooms." },
  { id: "roofing", name: "Roofing", icon: "roof", mode: "quote", fromPrice: 1200,
    blurb: "Re-roofs, slates, flat roofs, fascia, soffit and guttering." },
  { id: "plastering", name: "Plastering & rendering", icon: "wall", mode: "quote", fromPrice: 900,
    blurb: "Skim coats, re-plastering and external render." },
  { id: "driveway", name: "Driveways & paving", icon: "road", mode: "quote", fromPrice: 3000,
    blurb: "Tarmac, cobble-lock, gravel and patios." },
  { id: "retrofit", name: "Insulation & retrofit", icon: "leafHouse", mode: "quote", fromPrice: 2000,
    blurb: "Attic, wall and external insulation. Ask about SEAI grants." },
  { id: "rewire", name: "Rewiring", icon: "bolt", mode: "quote", fromPrice: 4000,
    blurb: "Full and partial rewires with RECI/Safe Electric certification." },
];

export const NIXERS = [
  { id: 1, name: "Seán M.", county: "Dublin", town: "Rathfarnham", services: ["handyman", "mounting", "assembly"],
    rate: 38, rating: 4.9, jobs: 412, insured: true, initials: "SM",
    bio: "Fifteen years fixing things around Dublin homes. Tidy, on time, brings his own kit." },
  { id: 2, name: "Aoife K.", county: "Cork", town: "Douglas", services: ["painting", "handyman"],
    rate: 34, rating: 5.0, jobs: 198, insured: true, initials: "AK",
    bio: "Painter and decorator. Clean lines, dust sheets down, furniture back where it was." },
  { id: 3, name: "Darragh O'B.", county: "Galway", town: "Salthill", services: ["plumbing-repair", "bathroom"],
    rate: 58, rating: 4.8, jobs: 276, insured: true, initials: "DO",
    bio: "Qualified plumber. Small repairs by the hour; full bathroom refits by quote." },
  { id: 4, name: "Niamh R.", county: "Limerick", town: "Castletroy", services: ["cleaning", "garden"],
    rate: 27, rating: 4.9, jobs: 331, insured: true, initials: "NR",
    bio: "Deep cleans and garden tidy-ups. Eco products on request." },
  { id: 5, name: "Ciarán D.", county: "Kildare", town: "Naas", services: ["electrical-repair", "rewire"],
    rate: 60, rating: 4.9, jobs: 154, insured: true, initials: "CD",
    bio: "Safe Electric registered contractor. Certs issued for all notifiable work." },
  { id: 6, name: "Tomás F.", county: "Dublin", town: "Swords", services: ["moving", "assembly"],
    rate: 42, rating: 4.7, jobs: 520, insured: true, initials: "TF",
    bio: "Long-wheelbase van, strong back, careful with your good furniture." },
  { id: 7, name: "Gráinne L.", county: "Wicklow", town: "Bray", services: ["garden", "handyman"],
    rate: 32, rating: 4.8, jobs: 87, insured: true, initials: "GL",
    bio: "Hedges, fences, sheds and power-washing. Takes the green waste away." },
  { id: 8, name: "Kehoe Build Ltd", county: "Wexford", town: "Enniscorthy", services: ["extension", "kitchen", "plastering"],
    rate: null, rating: 4.9, jobs: 63, insured: true, initials: "KB", company: true,
    bio: "Family building firm. Extensions and renovations with fixed, itemised quotes." },
  { id: 9, name: "Murphy Roofing", county: "Cork", town: "Mallow", services: ["roofing"],
    rate: null, rating: 4.8, jobs: 141, insured: true, initials: "MR", company: true,
    bio: "Slate, tile and flat roofs across Munster. 10-year workmanship guarantee." },
];

export const TESTIMONIALS = [
  { quote: "Had a wardrobe built and two shelves up within a day of posting. Paid for two and a half hours, which was exactly what it took.",
    name: "Orla, Drumcondra", service: "Hourly · Furniture assembly" },
  { quote: "Three quotes for our kitchen in four days, all itemised. The milestone payments meant we never felt exposed.",
    name: "Brian & Lisa, Ennis", service: "Fixed quote · Kitchen fitting" },
  { quote: "Finally someone who turns up when they say they will. The leak was sorted in under an hour.",
    name: "Margaret, Tralee", service: "Hourly · Plumbing repair" },
];

export const serviceById = (id) => SERVICES.find((s) => s.id === id);
