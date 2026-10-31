import { redirect } from "next/navigation";

export default function PlayPage({ searchParams }: { searchParams: { level?: string } }) {
  const level = Number(searchParams.level);
  redirect(Number.isInteger(level) && level >= 1 && level <= 40 ? `/games/sky-ball?level=${level}` : "/games/sky-ball");
}
