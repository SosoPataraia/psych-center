import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export const instant = false

export default async function AdminPage() {
    const requests = await prisma.triageRequest.findMany({
        orderBy: { createdAt: 'desc' },
    })

    return (
        <main className="min-h-screen bg-neutral-50">
            <div className="mx-auto max-w-5xl px-6 py-10">
                <h1 className="text-2xl font-bold">Triage requests</h1>
                <p className="mt-1 text-sm text-neutral-600">
                    {requests.length} total
                </p>

                <div className="mt-8 space-y-3">
                    {requests.map((r) => (
                        <Link
                            key={r.id}
                            href={`/admin/requests/${r.id}`}
                            className="block rounded-lg border border-neutral-200 bg-white p-4 hover:border-blue-300"
                        >
                            <div className="flex items-center justify-between">
                                <span className="font-medium">{r.name}</span>
                                <span className="text-xs uppercase tracking-wide text-neutral-500">
                  {r.urgency}
                </span>
                            </div>
                            <p className="mt-1 line-clamp-2 text-sm text-neutral-600">
                                {r.problem}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    )
}