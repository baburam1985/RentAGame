export type Game = {
  id: string;
  name: string;
  category: string;
  description: string;
  pricePerDay: number;
  image: string;
  players: string;
  dimensions: string;
};

export const CATEGORIES = [
  "All",
  "Lawn Games",
  "Party Games",
  "Kids Games",
  "Team Games",
  "Water Games",
] as const;

export type Category = (typeof CATEGORIES)[number];

export const games: Game[] = [
  {
    id: "giant-jenga",
    name: "Giant Jenga",
    category: "Lawn Games",
    description:
      "The classic stacking game scaled up for outdoor fun. Stack the giant wooden blocks as high as you can without toppling the tower. Perfect for all ages and skill levels.",
    pricePerDay: 45,
    image:
      "https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=600&auto=format&fit=crop",
    players: "2–10 players",
    dimensions: "4 ft tall when fully stacked",
  },
  {
    id: "cornhole-set",
    name: "Cornhole Set",
    category: "Lawn Games",
    description:
      "Premium regulation-size cornhole boards with two sets of bean bags. A backyard staple great for tailgates, BBQs, weddings, and festivals.",
    pricePerDay: 35,
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop",
    players: "2–4 players",
    dimensions: "4 ft × 2 ft boards",
  },
  {
    id: "lawn-bowling",
    name: "Lawn Bowling Set",
    category: "Lawn Games",
    description:
      "Traditional lawn bowling with 8 weighted balls and a target jack. Easy to set up on any flat surface and endlessly competitive.",
    pricePerDay: 40,
    image:
      "https://images.unsplash.com/photo-1569924702640-2a26ecaabf30?w=600&auto=format&fit=crop",
    players: "2–8 players",
    dimensions: "Standard set, balls 4 in diameter",
  },
  {
    id: "giant-4-in-a-row",
    name: "Giant 4-in-a-Row",
    category: "Party Games",
    description:
      "An oversized version of the classic connect-four game. Drop the giant discs and be the first to connect four in a row — hours of strategic fun.",
    pricePerDay: 40,
    image:
      "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=600&auto=format&fit=crop",
    players: "2 players",
    dimensions: "4 ft wide × 3.5 ft tall",
  },
  {
    id: "english-garden-croquet",
    name: "English Garden Croquet",
    category: "Lawn Games",
    description:
      "Classic 6-wicket croquet set with hardwood mallets and colorful balls. Brings elegance and competition to any garden party or lawn event.",
    pricePerDay: 50,
    image:
      "https://images.unsplash.com/photo-1588286492369-a5b2cb9d5e01?w=600&auto=format&fit=crop",
    players: "2–6 players",
    dimensions: "Full court: 35 yd × 28 yd (flexible)",
  },
  {
    id: "ladder-toss",
    name: "Ladder Toss",
    category: "Party Games",
    description:
      "Toss the bolas and wrap them around the rungs to score points. Lightweight, portable, and perfect for beach, backyard, or tailgate.",
    pricePerDay: 25,
    image:
      "https://images.unsplash.com/photo-1504618223053-559bdef9ad5c?w=600&auto=format&fit=crop",
    players: "2–4 players",
    dimensions: "3 ft tall ladder frames",
  },
  {
    id: "bocce-ball-set",
    name: "Bocce Ball Set",
    category: "Team Games",
    description:
      "Premium resin bocce ball set with 8 balls and pallino target. One of the world's oldest and most social lawn games — easy to learn, hard to master.",
    pricePerDay: 30,
    image:
      "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?w=600&auto=format&fit=crop",
    players: "2–8 players",
    dimensions: "107 mm balls, standard court",
  },
  {
    id: "spikeball-set",
    name: "Spikeball Set",
    category: "Team Games",
    description:
      "The fast-paced 360-degree net game that is taking backyards and beaches by storm. Spike the ball off the net and keep it out of reach of your opponents.",
    pricePerDay: 35,
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&auto=format&fit=crop",
    players: "4 players (2v2)",
    dimensions: "3 ft diameter net",
  },
];
