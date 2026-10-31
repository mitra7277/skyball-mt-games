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
  guide: { steps: string[]; advanced: string[]; mistakes: string[] };
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
    guide: {
      steps: ["Choose an unlocked course and start from its opening platform.", "Build a little speed on broad ground, then center the ball before a bridge.", "Pause your steering on moving platforms until you can read their direction.", "Touch checkpoints to make the next recovery safer, then roll onto the green finish pad."],
      advanced: ["Use short taps instead of holding a direction near edges; momentum continues after releasing the control.", "On rotating-bar sections, watch a complete sweep before crossing and aim for the widest opening.", "Stars are optional. Secure a difficult finish first, then replay an unlocked course for its collectibles and best time."],
      mistakes: ["If the ball drifts toward an edge, release the direction and use short corrections; momentum continues after you let go.", "If a moving platform is out of reach, wait for it to line up with the landing surface before rolling onto it.", "If a fall sends you back to the start, touch the glowing checkpoint marker before attempting the next hazard."],
    },
    faqs: [
      { question: "How many levels are in Sky Ball?", answer: "Sky Ball has 40 levels. Finishing a level unlocks the next one." },
      { question: "Where is my progress saved?", answer: "Unlocks, completions, best times, and settings are stored in local storage in this browser on this device." },
      { question: "Can I play on a phone?", answer: "Yes. Use the touch joystick in the game. A browser with WebGL enabled is required." },
      { question: "What happens when I fall?", answer: "You return to the last checkpoint you activated; if you have not reached one, you restart from the start pad." },
      { question: "Do stars block level completion?", answer: "No. Reach the finish pad to complete the course; stars add an optional collection goal." },
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
    guide: {
      steps: ["Start a run when the track is clear.", "Watch the near edge of the road to judge when an object reaches your lane.", "Change lanes to avoid a barrier, or jump over one when the timing is safe.", "Collect gold orbs for bonus points and keep moving as the pace climbs."],
      advanced: ["Move one lane at a time; a late double lane change can put you into a second obstacle.", "Save jumps for barriers that cannot be avoided with a safe lane change.", "An orb is a bonus, not a reason to run into a barrier. Choose a safe route first."],
      mistakes: ["If a jump ends before a barrier, wait until it is closer before jumping; a jump cannot be held indefinitely.", "If you overshoot a lane with a swipe, use one deliberate swipe at a time and wait for the next obstacle before steering again.", "If the lane ahead looks clear but the next obstacle blocks it, scan farther down the track before committing."],
    },
    faqs: [
      { question: "Does the runner have an ending?", answer: "No. It is an endless game; the run ends when you hit an obstacle." },
      { question: "Is my best score saved?", answer: "Yes. Your best distance is stored locally in this browser." },
      { question: "How do I collect the gold orbs?", answer: "Stay in the orb's lane as it reaches the foreground. Each collected orb adds points to your run." },
      { question: "Can I steer while jumping?", answer: "Yes. Lane changes remain available while the character is in the air." },
    ],
  },
  {
    slug: "block-puzzle",
    title: "Prism Pop: Match-3",
    shortTitle: "Prism Pop",
    tagline: "Make a match. Start a cascade.",
    description: "Swap glowing gems on an eight-by-eight board to create lines of three or more. Chain falling matches, reach each score goal within 20 moves, and unlock increasingly challenging levels. Your highest unlocked level and best score stay in this browser.",
    category: "Puzzle",
    thumbnail: "/games/prism-pop.svg",
    isNew: true,
    objective: "Reach the level's score target in 20 successful swaps. Match at least three neighboring gems horizontally or vertically; cascades increase the points awarded.",
    controls: ["Touch or mouse: tap a gem, then tap one of its neighboring gems to swap.", "The two gems must be adjacent; an unmatched swap returns no move and does not change the board.", "Use the shared Pause, Restart, and Settings controls above the board."],
    tips: ["Look for moves that complete more than one line at once.", "A match near the bottom can make several gems fall and trigger a chain reaction.", "Plan around the 20-move limit: ordinary matches score, but cascades are especially valuable."],
    guide: {
      steps: ["Read the level's score target above the board.", "Tap one gem and then an adjacent gem; a legal swap must make a line of at least three.", "Matched gems disappear, the gems above fall, and new gems enter from the top.", "Keep matching until the goal is reached; each valid swap uses one move."],
      advanced: ["Check both the horizontal and vertical lines created by a swap before choosing it.", "Clearing lower rows gives more pieces room to fall and can produce a chain reaction.", "A four- or five-gem match scores more than a simple three, so scan the whole board before committing."],
      mistakes: ["If two gems will not swap, select one directly adjacent to it; diagonal and longer-distance swaps are not supported.", "If a swap makes no line of three, the board returns to its previous state and the move is not used; look for a different neighbor.", "If only a few moves remain, compare each legal match against the score still needed and choose the one most likely to trigger a cascade."],
    },
    faqs: [
      { question: "How do I swap two gems?", answer: "Select one gem and then select an adjacent gem above, below, left, or right. Diagonal swaps are not allowed." },
      { question: "Do unsuccessful swaps use a move?", answer: "No. A swap only counts when it creates a match; otherwise the board stays in place." },
      { question: "What is a chain reaction?", answer: "After a match clears, falling and newly added gems may form another match. Each consecutive clear adds a higher score multiplier." },
      { question: "How is my progress saved?", answer: "Your highest unlocked level and best score are saved locally in this browser." },
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
    guide: {
      steps: ["Start with the center lane and scan the road ahead.", "Move left or right before a traffic car reaches your row.", "Keep to the lane with the clearest path and continue as speed rises.", "Pause for a break; restart when you are ready for a fresh run."],
      advanced: ["Plan your next lane change based on both the approaching car and the traffic behind it.", "Avoid rapid back-and-forth steering; the car takes a moment to settle into each lane.", "A safe, steady route earns more distance than a last-second dodge."],
      mistakes: ["If traffic is already close, move as soon as a safe lane opens instead of waiting for the car to reach the bottom of the road.", "If a second steering input takes you into traffic, make one lane change and check the next approaching car before changing again.", "If a lane change seems delayed, allow the car to finish moving between lanes before issuing another command."],
    },
    faqs: [
      { question: "Is racing against other players?", answer: "No. This is a single-player arcade driving game." },
      { question: "Does the car accelerate?", answer: "Traffic and road speed increase as your distance grows." },
      { question: "How do I control the car on a phone?", answer: "Tap the left or right steering button, or swipe horizontally across the game." },
      { question: "Why did my run end?", answer: "The run ends when your car and a traffic car occupy the same lane as they pass." },
    ],
  },
];

export const GAME_CATEGORIES = ["All", ...new Set(GAMES.map((game) => game.category))];
export const getGame = (slug: string) => GAMES.find((game) => game.slug === slug);
