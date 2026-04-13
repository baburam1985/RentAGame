export type Game = {
  id: string;
  name: string;
  category: string;
  description: string;
  pricePerDay: number;
  image: string;
  images: string[];
  players: string;
  dimensions: string;
  howToPlay: string[];
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
    images: [
      "https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1528819622765-d6bcf132f793?w=600&auto=format&fit=crop",
    ],
    players: "2–10 players",
    dimensions: "4 ft tall when fully stacked",
    howToPlay: [
      "Stack all 54 blocks in layers of three to build the tower.",
      "Players take turns removing one block from any layer below the top.",
      "Place the removed block on top of the tower.",
      "The player who causes the tower to fall loses the round.",
    ],
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
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&auto=format&fit=crop",
    ],
    players: "2–4 players",
    dimensions: "4 ft × 2 ft boards",
    howToPlay: [
      "Set up the two boards 27 feet apart facing each other.",
      "Teams of two stand at opposite boards and take turns tossing bean bags.",
      "A bag through the hole scores 3 points; a bag on the board scores 1 point.",
      "Cancellation scoring applies — the first team to reach 21 points wins.",
    ],
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
    images: [
      "https://images.unsplash.com/photo-1569924702640-2a26ecaabf30?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1526401281623-44987c0082e9?w=600&auto=format&fit=crop",
    ],
    players: "2–8 players",
    dimensions: "Standard set, balls 4 in diameter",
    howToPlay: [
      "Toss the small white jack ball down the green to set the target.",
      "Players take turns rolling their bowls toward the jack.",
      "The bowl closest to the jack scores points.",
      "Play continues for an agreed number of ends — highest score wins.",
    ],
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
    images: [
      "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1566977776052-6e61e35bf9be?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1632501641765-e568d28b0015?w=600&auto=format&fit=crop",
    ],
    players: "2 players",
    dimensions: "4 ft wide × 3.5 ft tall",
    howToPlay: [
      "Players choose a color (yellow or red) and take turns.",
      "On your turn, drop one disc into any column from the top.",
      "Discs fall and stack in the column.",
      "The first player to connect four discs in a row — horizontally, vertically, or diagonally — wins.",
    ],
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
    images: [
      "https://images.unsplash.com/photo-1588286492369-a5b2cb9d5e01?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1599058918144-1ffcbe1eba6e?w=600&auto=format&fit=crop",
    ],
    players: "2–6 players",
    dimensions: "Full court: 35 yd × 28 yd (flexible)",
    howToPlay: [
      "Set up the six wickets and center peg in the standard layout.",
      "Players take turns striking their ball through each wicket in order.",
      "Hitting another player's ball earns an extra stroke.",
      "The first player to pass through all wickets and hit the center peg wins.",
    ],
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
    images: [
      "https://images.unsplash.com/photo-1504618223053-559bdef9ad5c?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1624713742494-f4b6a6b8e24a?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?w=600&auto=format&fit=crop",
    ],
    players: "2–4 players",
    dimensions: "3 ft tall ladder frames",
    howToPlay: [
      "Place the two ladder frames 15 feet apart.",
      "Players take turns tossing all three bolas at the opposite ladder.",
      "Top rung scores 3 points, middle rung 2 points, bottom rung 1 point.",
      "The first player or team to reach exactly 21 points wins.",
    ],
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
    images: [
      "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1548438294-1ad5d5f4f063?w=600&auto=format&fit=crop",
    ],
    players: "2–8 players",
    dimensions: "107 mm balls, standard court",
    howToPlay: [
      "Toss the small pallino ball to set the target.",
      "Players alternate rolling or tossing their bocce balls toward the pallino.",
      "The team with the ball closest to the pallino scores one point per ball that is closer than the opposing team's closest ball.",
      "Play continues to 12 points — the team that reaches 12 first wins.",
    ],
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
    images: [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560969184-10fe8719e047?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1526676037777-05a232554f77?w=600&auto=format&fit=crop",
    ],
    players: "4 players (2v2)",
    dimensions: "3 ft diameter net",
    howToPlay: [
      "Teams of two line up on opposite sides of the round net.",
      "Serve by bouncing the ball off the net to the opposing team.",
      "Teams have up to three touches to return the ball back onto the net.",
      "A point is scored when the opposing team fails to return the ball cleanly; first to 21 wins.",
    ],
  },
];
