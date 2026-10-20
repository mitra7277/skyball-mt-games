import Link from "next/link";
export default function NotFound() {
  return (
    <div className="prose-page py-10 text-center">
      <h1>404 – Page not found</h1>
      <p>This page rolled off the edge. Try one of these instead:</p>
      <p><Link href="/" className="btn !no-underline">Home</Link> <Link href="/play" className="btn !no-underline">Play</Link></p>
    </div>
  );
}
