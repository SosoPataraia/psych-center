import { PrismaClient } from '../src/generated/prisma'

const prisma = new PrismaClient()

async function main() {
    await prisma.psychologist.createMany({
        data: [
            {
                name: 'Anna Ivanova',
                email: 'anna@example.com',
                bio: 'HSE graduate, CBT specialist focused on anxiety and burnout.',
                approaches: ['CBT'],
                languages: ['ru', 'en'],
                format: ['online'],
                priceTier: 'early',
            },
            {
                name: 'Dmitry Petrov',
                email: 'dmitry@example.com',
                bio: 'Schema therapy, works with relationship issues and personality patterns.',
                approaches: ['Schema therapy'],
                languages: ['ru'],
                format: ['online', 'offline'],
                priceTier: 'experienced',
            },
            {
                name: 'Maria Sokolova',
                email: 'maria@example.com',
                bio: 'Trainee psychologist, affordable sessions for students.',
                approaches: ['CBT', 'Person-centered'],
                languages: ['ru', 'en'],
                format: ['online'],
                priceTier: 'trainee',
            },
        ],
        skipDuplicates: true,
    })
    console.log('Seeded.')
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect())