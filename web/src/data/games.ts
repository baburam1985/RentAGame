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
  occasions?: string[];
};

export const CATEGORIES = [
  "All",
  "Lawn Games",
  "Party Games",
  "Kids Games",
  "Team Games",
] as const;

export type Category = (typeof CATEGORIES)[number];

export const games: Game[] = [
  {
    id: "giant-jenga",
    name: "Giant Jenga",
    category: "Lawn Games",
    description:
      "The #1 rented outdoor game. Stack giant cedar wood blocks as high as you dare — then watch the tower tumble. Works on any surface and thrills every age group.",
    pricePerDay: 45,
    image:
      "https://images.unsplash.com/photo-1749320128113-10793ef5a82a?w=600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1749320128113-10793ef5a82a?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1489850846882-35ef10a4b480?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584225064281-429e7fce4961?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1596962390809-2c147eeb9aff?w=800&auto=format&fit=crop",
    ],
    players: "2–10 players",
    dimensions: "4 ft tall when fully stacked",
    occasions: ["Wedding", "Corporate", "Kids Party"],
    howToPlay: [
      "Stack all 54 blocks into a tower — 18 levels of 3 blocks each, alternating direction every level.",
      "Players take turns removing one block at a time using only one hand.",
      "Carefully place the removed block on top to keep building the tower higher.",
      "You may tap a block to test stability before committing to pull it.",
      "The player who causes the tower to fall loses — pick it back up and go again!",
    ],
  },
  {
    id: "cornhole-set",
    name: "Cornhole Set",
    category: "Lawn Games",
    description:
      "America's favorite backyard game. Regulation-size boards with two sets of bean bags — the go-to for tailgates, BBQs, weddings, and festivals.",
    pricePerDay: 35,
    image:
      "https://images.unsplash.com/photo-1607962837359-5e7e89f86776?w=600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1607962837359-5e7e89f86776?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519058082700-08a0b56da9b4?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1504270997636-07ddfbd48945?w=800&auto=format&fit=crop",
    ],
    players: "2–4 players",
    dimensions: "4 ft × 2 ft boards",
    occasions: ["Wedding", "Corporate"],
    howToPlay: [
      "Place boards 27 feet apart (hole-to-hole) on a flat surface.",
      "Teams of 2 stand at the same board and throw toward the opposite board.",
      "Alternate throws — toss underhand trying to land in or on the board.",
      "Bag in the hole = 3 points. Bag on the board = 1 point. Cancel your opponent's points each round.",
      "First team to reach exactly 21 points wins. Going over resets you to 15.",
    ],
  },
  {
    id: "bocce-ball-set",
    name: "Bocce Ball Set",
    category: "Team Games",
    description:
      "Premium resin bocce set with 8 balls and a pallino. One of the world's oldest social games — relaxed yet competitive, perfect for any crowd.",
    pricePerDay: 30,
    image:
      "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?w=600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&auto=format&fit=crop",
    ],
    players: "2–8 players",
    dimensions: "107 mm balls, standard court",
    occasions: ["Wedding", "Corporate"],
    howToPlay: [
      "Toss the small white pallino onto the court to set the target.",
      "Teams alternate rolling bocce balls, trying to land closest to the pallino.",
      "Only the team with the closest ball scores — they earn 1 point for each ball closer than the opponent's nearest.",
      "The team that scored last throws the pallino to start the next frame.",
      "First team to reach 12 points wins the match.",
    ],
  },
  {
    id: "giant-connect-four",
    name: "Giant Connect Four",
    category: "Party Games",
    description:
      "Oversized connect-four that draws a crowd. Drop giant discs and be the first to line up four in a row — fast, strategic, and endlessly replayable.",
    pricePerDay: 40,
    image:
      "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1580541832626-2a7131ee809f?w=800&auto=format&fit=crop",
    ],
    players: "2 players",
    dimensions: "4 ft wide × 3.5 ft tall",
    occasions: ["Wedding", "Kids Party"],
    howToPlay: [
      "Each player picks a color (yellow or red discs) — one color per player.",
      "Players take turns dropping one disc at a time into any column from the top.",
      "Discs fall to the lowest available slot in the chosen column.",
      "First player to connect 4 of their discs in a row — horizontal, vertical, or diagonal — wins!",
      "Pull the release lever at the bottom to drop all discs and start a new game.",
    ],
  },
  {
    id: "spikeball-set",
    name: "Spikeball Set",
    category: "Team Games",
    description:
      "The fast-paced 360-degree net game taking every backyard and beach by storm. Spike the ball, defend from every angle — pure competitive fun.",
    pricePerDay: 35,
    image:
      "https://images.unsplash.com/photo-1611153390859-33cce9fe1b45?w=600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1611153390859-33cce9fe1b45?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop",
    ],
    players: "4 players (2v2)",
    dimensions: "3 ft diameter net",
    occasions: ["Corporate", "Kids Party"],
    howToPlay: [
      "Set up the circular net on the ground between two teams of two.",
      "Serve by bouncing the ball off the net to the opposing team.",
      "Each team has up to 3 touches (like volleyball) to return the ball onto the net.",
      "No boundaries — play moves 360 degrees around the net at all times.",
      "A team scores when the opposing team can't return the ball cleanly. First to 21 (win by 2) wins.",
    ],
  },
  {
    id: "horseshoes-set",
    name: "Horseshoes Set",
    category: "Lawn Games",
    description:
      "The all-time classic American yard game. Steel horseshoes, two metal stakes, and hours of satisfying ringers. Great for reunions, cookouts, and casual hangouts.",
    pricePerDay: 25,
    image:
      "https://images.unsplash.com/photo-1584304474795-74fb0b42e66a?w=600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1584304474795-74fb0b42e66a?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1473773508845-188df298d2d1?w=800&auto=format&fit=crop",
    ],
    players: "2–4 players",
    dimensions: "Stakes 40 ft apart",
    occasions: ["Wedding", "Corporate"],
    howToPlay: [
      "Drive two stakes into the ground 40 feet apart, leaning slightly toward each other.",
      "Each player stands beside one stake and throws both horseshoes underhand toward the opposite stake.",
      "A ringer (horseshoe encircling the stake) scores 3 points.",
      "If no ringers, the closest horseshoe within 6 inches of the stake scores 1 point. Cancel scoring applies.",
      "First player or team to reach 21 points wins the game.",
    ],
  },
  {
    id: "kan-jam",
    name: "KanJam Disc Game",
    category: "Party Games",
    description:
      "The hottest frisbee game in the country. Throw, tip, and slam the disc into the goal to score. Fast-moving, easy to learn, and insanely competitive.",
    pricePerDay: 25,
    image:
      "https://images.unsplash.com/photo-1575503802870-45de6a6217c8?w=600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1575503802870-45de6a6217c8?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1558008258-3256797b43f3?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1547347298-4074fc3086f0?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=800&auto=format&fit=crop",
    ],
    players: "4 players (2v2)",
    dimensions: "Goals 50 ft apart",
    occasions: ["Corporate", "Wedding"],
    howToPlay: [
      "Set up the two goal cans 50 feet apart. Teams of 2 stand at opposite goals.",
      "The thrower launches the flying disc toward the opponent's goal.",
      "The partner (deflector) can tip or redirect the disc — but not catch or carry it.",
      "Scoring: Deflector hits the can = 1 pt · Thrower hits the can = 2 pts · Deflector tips it into the slot = 3 pts · Disc goes straight into the slot = instant win!",
      "First team to exactly 21 points wins. Going over resets to 15.",
    ],
  },
  {
    id: "ladder-toss",
    name: "Ladder Toss",
    category: "Party Games",
    description:
      "Wrap bolas around the rungs of a freestanding ladder to rack up points. Lightweight, portable, and endlessly competitive — a crowd favorite at tailgates, beach days, and backyard parties.",
    pricePerDay: 25,
    image:
      "https://images.unsplash.com/photo-1584304474795-74fb0b42e66a?w=600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1584304474795-74fb0b42e66a?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519058082700-08a0b56da9b4?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=800&auto=format&fit=crop",
    ],
    players: "2–4 players",
    dimensions: "Two 3 ft tall ladder frames, set 15 ft apart",
    occasions: ["Wedding", "Kids Party"],
    howToPlay: [
      "Set the two ladder frames 15 feet apart on level ground.",
      "Each team stands behind their own ladder and takes turns tossing all 3 bolas underhand toward the opponent's ladder.",
      "Top rung = 3 points · Middle rung = 2 points · Bottom rung = 1 point.",
      "Bolas must stay wrapped around a rung at the end of the round to score — knocked-off bolas don't count.",
      "Cancel scoring applies: subtract the other team's points from yours each round. First team to exactly 21 wins.",
    ],
  },
  {
    id: "agility-cone-set",
    name: "Agility Cone Set",
    category: "Kids Games",
    description:
      "Bright multi-color sports cones that turn any open space into an obstacle course, relay race track, or soccer drill. Perfect for birthday parties, school field days, and family reunions.",
    pricePerDay: 20,
    image:
      "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?w=600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1575503802870-45de6a6217c8?w=800&auto=format&fit=crop",
    ],
    players: "4–20+ players",
    dimensions: "50 cones, 9 in tall each",
    occasions: ["Kids Party", "Corporate"],
    howToPlay: [
      "Lay out cones in any pattern — straight lines for relay races, zigzags for slalom, circles for drills.",
      "Relay race: split into teams, run to the far cone and back, tag the next teammate — first team to finish wins.",
      "Slalom: weave through a line of cones as fast as possible — time each player and compare.",
      "Four Corners: place a cone at each corner of a square; one player in the middle tries to tag others as they swap corners.",
      "Mix and match activities to keep energy high — the cones reset in seconds for a brand-new game.",
    ],
  },
  {
    id: "outdoor-badminton",
    name: "Outdoor Badminton Set",
    category: "Team Games",
    description:
      "Full outdoor badminton kit with a portable net, 4 rackets, and 6 shuttlecocks. Sets up on any lawn in minutes — great for casual rallies or full competitive matches at picnics, BBQs, and family gatherings.",
    pricePerDay: 30,
    image:
      "https://images.unsplash.com/photo-1722003180803-577efd6d2ecc?w=600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1722003180803-577efd6d2ecc?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1564226803380-91139fdcb4d0?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1762423570127-c36ff11b883f?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&auto=format&fit=crop",
    ],
    players: "2–4 players",
    dimensions: "Net 20 ft wide × 5 ft tall",
    occasions: ["Wedding", "Kids Party"],
    howToPlay: [
      "Set up the net across the middle of your play area — full court is 44 ft long, but any length works casually.",
      "Serve diagonally underhand from behind your back boundary line to start each rally.",
      "Hit the shuttlecock back and forth over the net — it must not touch the ground on your side.",
      "A point is scored when the shuttle lands in bounds on the opponent's side or they hit it out/into the net.",
      "Singles games go to 21 points (win by 2). Doubles use the same scoring with both players sharing the court.",
    ],
  },
  {
    id: "beginner-pickleball",
    name: "Beginner Pickleball Set",
    category: "Team Games",
    description:
      "Everything you need to play pickleball anywhere — portable net, 4 paddles, and 6 balls. Designed for first-timers with lightweight paddles and a compact court setup that fits any driveway, parking lot, or open lawn.",
    pricePerDay: 35,
    image:
      "https://images.unsplash.com/photo-1693142518820-78d7a05f1546?w=600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1693142518820-78d7a05f1546?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1762423570127-c36ff11b883f?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1599058917765-a780eda07a3e?w=800&auto=format&fit=crop",
    ],
    players: "2–4 players",
    dimensions: "Net 22 ft wide, court 44 ft × 20 ft",
    occasions: ["Corporate", "Wedding"],
    howToPlay: [
      "Set up the net at 36 inches on the sides and 34 inches in the center. Mark the 7-ft no-volley zone (the 'kitchen') on each side.",
      "Serve underhand diagonally cross-court — the ball must bounce once on the receiver's side before they return it.",
      "After the serve and return, both teams must let the ball bounce once before volleying — this is the two-bounce rule.",
      "Once the two-bounce rule is satisfied, players can volley freely — except inside the kitchen (no-volley zone).",
      "Games go to 11 points (win by 2) and only the serving team can score. Rally scoring is a beginner-friendly alternative where every rally scores a point.",
    ],
  },
  {
    id: "giant-chess",
    name: "Giant Chess Set",
    category: "Lawn Games",
    description:
      "Life-size chess on the lawn — a showstopper at any event. Oversize pieces crafted from solid resin. Photo-worthy, brain-teasing, and perfect for all ages.",
    pricePerDay: 55,
    image:
      "https://images.unsplash.com/photo-1586165368502-1bad197a6461?w=600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1586165368502-1bad197a6461?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1580541832626-2a7131ee809f?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&auto=format&fit=crop",
    ],
    players: "2 players",
    dimensions: "King piece 18 in tall, 8×8 board",
    occasions: ["Wedding", "Corporate"],
    howToPlay: [
      "Set up the 8×8 board with each side's pieces in starting position — rooks in corners, knights next, then bishops, queen on her color, king in the last square.",
      "White always moves first. Players alternate turns moving one piece per turn.",
      "Each piece type moves differently: pawns advance forward, rooks move in straight lines, bishops diagonally, knights in an L-shape, queens any direction, kings one square.",
      "Capture opponent pieces by landing on their square. Protect your king at all times.",
      "The game ends when a player's king is in checkmate — put your opponent in check with no escape to win!",
    ],
  },
];
