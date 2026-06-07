import Link from "next/link";

export default function StateNotFound() {
  return (
    <main className="min-h-screen bg-zinc-50">
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <h1 className="text-4xl font-bold text-zinc-900">State not found</h1>
        <p className="mt-3 text-zinc-600">
          We don&apos;t have a mortgage calculator for that state yet.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
        >
          Back to the national mortgage calculator
        </Link>
      </div>
    </main>
  );
}
