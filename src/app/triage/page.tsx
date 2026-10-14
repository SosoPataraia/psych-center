import TriageForm from '@/components/TriageForm'

export default function TriagePage() {
    return (
        <main className="min-h-screen bg-white">
            <div className="mx-auto max-w-2xl px-6 py-16">
                <h1 className="text-3xl font-bold tracking-tight">Free triage</h1>
                <p className="mt-3 text-neutral-600">
                    Tell us a bit about what you're looking for. A qualified psychologist
                    will read your request and recommend a specialist.
                </p>
                <div className="mt-10">
                    <TriageForm />
                </div>
            </div>
        </main>
    )
}