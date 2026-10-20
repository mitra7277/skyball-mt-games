export type Tip = { slug: string; title: string; body: string[] };
export const TIPS: Tip[] = [
  { slug: "small-inputs", title: "Use small, steady inputs", body: [
    "The ball keeps its momentum, so holding a direction key builds speed quickly. On bridges, tap or feather your input instead of holding it down. Short corrections keep you centered.",
    "If you are going too fast, let go and let friction slow you down. The ball loses speed on its own while it is touching a platform. Braking by pushing the opposite way works, but it often makes you wobble sideways." ] },
  { slug: "moving-platforms", title: "Reading moving platforms", body: [
    "Do not step onto a moving platform the instant it arrives. Wait at the edge for one full cycle first and notice how long it stays close to you. Then roll on when it is touching the ledge.",
    "Once you are on, you move with the platform, so you can relax your controls. Aim for the middle, and start moving toward the exit only when its edge meets the next platform." ] },
  { slug: "rotating-bars", title: "Getting past rotating bars", body: [
    "The bar sweeps the middle of its platform, but the outer edges are usually clear. Slow down near the entrance, shift to one side, and then run along the edge past the bar.",
    "If the bar knocks you, do not fight it. Let it carry you, then correct your direction. Being pushed toward the edge is the main danger, so keep some distance from the drop." ] },
  { slug: "narrow-bridges", title: "Crossing narrow bridges", body: [
    "Line up with the center of the bridge before you enter it, on the platform before. Entering at an angle means correcting sideways while moving, which is when most falls happen.",
    "Cross at a moderate pace. Too slow and small mistakes feel large; too fast and a bump sends you off the side." ] },
  { slug: "checkpoints-and-stars", title: "Checkpoints, stars and best times", body: [
    "Glowing circles are checkpoints. Roll through one and it turns gold. If you fall, you restart there with no penalty besides lost time, so you can take chances after you have claimed a checkpoint.",
    "Stars give points, and your best time for each level is saved in your browser. For a first run, collect stars as you go; for a time run, replay and skip the ones that cost seconds." ] },
];
