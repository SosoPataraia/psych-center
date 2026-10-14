'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
    name: z.string().min(1, 'Required'),
    contact: z.string().min(3, 'Telegram handle, phone, or email'),
    problem: z.string().min(10, 'Please describe in a bit more detail'),
    budgetTier: z.enum(['low', 'medium', 'high']),
    preferredFormat: z.enum(['online', 'offline']),
    language: z.enum(['ru', 'en']),
    approachPref: z.string().optional(),
    urgency: z.enum(['low', 'medium', 'high']),
})

type FormValues = z.infer<typeof schema>

export default function TriageForm() {
    const [submitted, setSubmitted] = useState(false)
    const [serverError, setServerError] = useState<string | null>(null)

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            budgetTier: 'medium',
            preferredFormat: 'online',
            language: 'ru',
            urgency: 'medium',
        },
    })

    async function onSubmit(values: FormValues) {
        setServerError(null)
        const res = await fetch('/api/triage', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values),
        })
        if (!res.ok) {
            setServerError('Something went wrong. Please try again.')
            return
        }
        setSubmitted(true)
    }

    if (submitted) {
        return (
            <div className="rounded-lg border border-green-200 bg-green-50 p-6">
                <h2 className="font-semibold text-green-900">Request received.</h2>
                <p className="mt-2 text-sm text-green-800">
                    A triage psychologist will contact you within 24 hours.
                </p>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Field label="Your name" error={errors.name?.message}>
                <input {...register('name')} className={inputCls} />
            </Field>

            <Field
                label="How should we contact you?"
                hint="Telegram handle, phone, or email"
                error={errors.contact?.message}
            >
                <input {...register('contact')} className={inputCls} />
            </Field>

            <Field label="What brings you here?" error={errors.problem?.message}>
        <textarea
            {...register('problem')}
            rows={5}
            className={inputCls}
            placeholder="Briefly describe what you'd like help with."
        />
            </Field>

            <div className="grid gap-6 md:grid-cols-2">
                <Field label="Budget" error={errors.budgetTier?.message}>
                    <select {...register('budgetTier')} className={inputCls}>
                        <option value="low">Lower budget (trainees)</option>
                        <option value="medium">Medium</option>
                        <option value="high">Higher (experienced)</option>
                    </select>
                </Field>

                <Field label="Format" error={errors.preferredFormat?.message}>
                    <select {...register('preferredFormat')} className={inputCls}>
                        <option value="online">Online</option>
                        <option value="offline">In person (Moscow)</option>
                    </select>
                </Field>

                <Field label="Language" error={errors.language?.message}>
                    <select {...register('language')} className={inputCls}>
                        <option value="ru">Russian</option>
                        <option value="en">English</option>
                    </select>
                </Field>

                <Field label="Urgency" error={errors.urgency?.message}>
                    <select {...register('urgency')} className={inputCls}>
                        <option value="low">Not urgent</option>
                        <option value="medium">Within a week</option>
                        <option value="high">As soon as possible</option>
                    </select>
                </Field>
            </div>

            <Field
                label="Preferred approach (optional)"
                hint="CBT, schema therapy, psychoanalysis…"
            >
                <input {...register('approachPref')} className={inputCls} />
            </Field>

            {serverError && (
                <p className="text-sm text-red-600">{serverError}</p>
            )}

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-lg bg-blue-700 px-6 py-3 text-white hover:bg-blue-800 disabled:opacity-50"
            >
                {isSubmitting ? 'Sending…' : 'Submit request'}
            </button>
        </form>
    )
}

const inputCls =
    'mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none'

function Field({
                   label,
                   hint,
                   error,
                   children,
               }: {
    label: string
    hint?: string
    error?: string
    children: React.ReactNode
}) {
    return (
        <label className="block">
            <span className="text-sm font-medium text-neutral-900">{label}</span>
            {hint && <span className="ml-2 text-xs text-neutral-500">{hint}</span>}
            {children}
            {error && <span className="mt-1 block text-xs text-red-600">{error}</span>}
        </label>
    )
}