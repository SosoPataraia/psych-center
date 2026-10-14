import Link from 'next/link'

export default function Home() {
  return (
      <main className="min-h-screen bg-white text-neutral-900">
        <section className="mx-auto max-w-3xl px-6 py-24">
          <p className="text-sm font-medium uppercase tracking-widest text-blue-700">
            HSE-Affiliated
          </p>
          <h1 className="mt-4 text-5xl font-bold tracking-tight">
            A psychological center built on trust.
          </h1>
          <p className="mt-6 text-lg text-neutral-600">
            Free professional triage. Matched with the right specialist — not the
            loudest advertiser.
          </p>
          <div className="mt-10">
            <Link
                href="/triage"
                className="inline-flex items-center rounded-lg bg-blue-700 px-6 py-3 text-white hover:bg-blue-800"
            >
              Start free triage →
            </Link>
          </div>
          <p className="mt-4 text-sm text-neutral-500">
            Takes 3 minutes. No payment required.
          </p>
        </section>

        <section className="border-t border-neutral-200 bg-neutral-50">
          <div className="mx-auto grid max-w-5xl gap-8 px-6 py-20 md:grid-cols-3">
            {[
              {
                t: 'Qualified triage',
                d: 'A real psychologist reads your request — not a sales form.',
              },
              {
                t: 'Matched specialists',
                d: 'Approach, budget, language, format — all considered.',
              },
              {
                t: 'Supervised practice',
                d: 'All therapists work under regular clinical supervision.',
              },
            ].map((x) => (
                <div key={x.t}>
                  <h3 className="font-semibold">{x.t}</h3>
                  <p className="mt-2 text-sm text-neutral-600">{x.d}</p>
                </div>
            ))}
          </div>
        </section>
      </main>
  )
}