export type Level = { id: number; name: string; stars: number; summary: string };
export const LEVELS: Level[] = [
  { id: 1, name: "First Roll", stars: 1, summary: "A short warm-up: a wide platform, one forgiving bridge and your first checkpoint." },
  { id: 2, name: "Two Bridges", stars: 2, summary: "Two bridges in a row, with a drop down to a lower platform near the end." },
  { id: 3, name: "Ferry Ride", stars: 2, summary: "Your first moving platform: wait for it, hop on, and ride across the gap." },
  { id: 4, name: "Spin Cycle", stars: 4, summary: "Rotating bars sweep the platforms. Use the outer lane and watch the timing." },
  { id: 5, name: "Side to Side", stars: 4, summary: "A platform that slides sideways, a drop, and a bar to dodge." },
  { id: 6, name: "Thin Ice", stars: 4, summary: "The first narrow bridge, followed by two different moving platforms back to back." },
  { id: 7, name: "Long Way Round", stars: 6, summary: "A longer route that mixes bridges, narrow crossings, movers and a spinning bar." },
  { id: 8, name: "Rhythm Section", stars: 6, summary: "Bars, narrow bridges and movers arrive in quick succession. Keep your speed under control." },
  { id: 9, name: "Skyline Run", stars: 8, summary: "A long course where movers and bars are chained with little room to recover." },
  { id: 10, name: "Summit Challenge", stars: 11, summary: "The finale: every obstacle type, faster movers and narrower bridges. Take checkpoints seriously." },
];
