import { execSync } from 'child_process';

import { PrismaClient } from '@prisma/client';

const buf = execSync('prisma db push --skip-generate');
console.log(buf.toString());

const prisma = new PrismaClient();

async function main(): Promise<void> {
    await prisma.myModel.create({
        data: {
            name: 'Alice',
            email: 'alice@example.com',
        },
    });
}

main()
    .then(async () => {
        console.log('Successfully seeded database');
    })
    .catch(async e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
