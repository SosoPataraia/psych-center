import { prisma } from '../src/lib/prisma'

async function main() {
    const count = await prisma.psychologist.count()
    console.log('Psychologists in DB:', count)
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect())