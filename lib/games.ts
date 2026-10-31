export type Game = {
  slug: string;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  category: string;
  thumbnail: string;
  featured?: boolean;
  isNew?: boolean;
  objective: string;
  controls: string[];
  tips: string[];
  faqs: Array<{ question: string; answer: string }>;
};

export const GAMES: Game[] = [
  {
    slug: "sky-ball",
    title: "Sky Ball: 3D Challenge",
    shortTitle: "Sky Ball",
    tagline: "Balance above the clouds.",
    description: "Roll across floating platforms, ride moving platforms, dodge rotating bars, collect stars, and reach the finish across 40 levels. Your level progress and best times are saved in this browser.",
    category: "3D & Adventure",
    thumbnail: "/games/sky-ball.svg",
    featured: true,
    objective: "Reach the green finish pad in each course. Touch checkpoints to save a restart point, and collect stars for score.",
    controls: ["Keyboard: WASD or arrow keys to roll; Space, P, or Esc to pause.", "Touch: drag the on-screen joystick to steer.", "Mouse or touch: use the game menus and buttons."],
    tips: ["Make small steering corrections before narrow bridges.", "Wait for moving platforms to line up before rolling on.", "Use checkpoints as safe recovery points before attempting hazards."],
    faqs: [
      { question: "How many levels are in Sky Ball?", answer: "Sky Ball has 40 levels. Finishing a level unlocks the next one." },
      { question: "Where is my progress saved?", answer: "Unlocks, completions, best times, and settings are stored in local storage in this browser on this device." },
      { question: "Can I play on a phone?", answer: "Yes. Use the touch joystick in the game. A browser with WebGL enabled is required." },
    ],
  },
  {
    slug: "endless-runner",
    title: "Cloud Sprint: Endless Runner",
    shortTitle: "Cloud Sprint",
    tagline: "Keep moving. How far can you go?",
    description: "Switch lanes, leap over barriers, and pick up glowing orbs in an original endless run. The pace climbs as your distance grows, and your best distance is saved on this device.",
    category: "Arcade",
    thumbnail: "/games/endless-runner.svg",
    isNew: true,
    objective: "Stay on the track for as long as possible, avoid barriers, and gather orbs to grow your score.",
    controls: ["Keyboard: Left/Right or A/D to switch lanes; Space or Up to jump; P or Esc to pause.", "Touch: use the on-screen lane and jump buttons; swipe left/right or up.", "Tap the pause and restart buttons at any time."],
    tips: ["Look ahead and move lanes before an obstacle reaches you.", "Jump only when a barrier is close; you can still steer in the air.", "Collectibles add points, but survival is the priority."],
    faqs: [
      { question: "Does the runner have an ending?", answer: "No. It is an endless game; the run ends when you hit an obstacle." },
      { question: "Is my best score saved?", answer: "Yes. Your best distance is stored locally in this browser." },
    ],
  },
  {
    slug: "block-puzzle",
    title: "Block Bloom: Puzzle",
    shortTitle: "Block Bloom",
    tagline: "Place, clear, and plan ahead.",
    description: "Fit the supplied block shapes onto a 10-by-10 board. Complete full rows or columns to clear space, build your score, and keep the board open for the next set.",
    category: "Puzzle",
    thumbnail: "/games/block-puzzle.svg",
    isNew: true,
    objective: "Place each available shape on the board, clear complete rows or columns, and score as much as possible before no shape fits.",
    controls: ["Tap or click a shape to select it, then tap or click a board cell to place it.", "Keyboard: use Tab and Enter/Space to select a shape and a board cell.", "Choose Restart to begin a fresh board."],
    tips: ["Keep several open areas for large shapes.", "Clear rows and columns when practical, but avoid sealing off corners.", "Check every remaining shape before committing to a tight space."],
    faqs: [
      { question: "Can blocks be rotated?", answer: "The current game uses fixed orientations; choose a different shape when a rotated fit is not available." },
      { question: "When does the puzzle end?", answer: "The game ends when none of the remaining shapes can be placed on the board." },
    ],
  },
  {
    slug: "car-racing",
    title: "Neon Drift: 3D Car Racing",
    shortTitle: "Neon Drift",
    tagline: "Thread the traffic. Chase the distance.",
    description: "Steer a car down a glowing three-lane road, avoid traffic, and see how far you can travel. Traffic arrives faster as distance builds; your best distance is kept in this browser.",
    category: "Racing",
    thumbnail: "/games/car-racing.svg",
    isNew: true,
    objective: "Avoid traffic for as long as possible and build the greatest distance without a collision.",
    controls: ["Keyboard: Left/Right or A/D to change lanes; P or Esc to pause.", "Touch: use the left and right buttons or swipe horizontally.", "Use Pause and Restart controls above the road."],
    tips: ["Move early into a clear lane instead of waiting until the last moment.", "Use the full width of the road to plan around traffic.", "Distance increases the challenge, so prioritize open lanes over risky moves."],
    faqs: [
      { question: "Is racing against other players?", answer: "No. This is a single-player arcade driving game." },
      { question: "Does the car accelerate?", answer: "Traffic and road speed increase as your distance grows." },
    ],
  },
];

export const GAME_CATEGORIES = ["All", ...new Set(GAMES.map((game) => game.category))];
export const getGame = (slug: string) => GAMES.find((game) => game.slug === slug);
