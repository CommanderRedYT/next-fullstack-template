import type { MyModel, Prisma } from '@prisma/client';

import { PrismaClient } from '@prisma/client';

export const addUser = async (
    data: Prisma.MyModelCreateInput,
): Promise<MyModel | false> => {
    const client = new PrismaClient();

    try {
        return await client.myModel.create({
            data,
        });
    } catch (e) {
        console.log('Error adding user:', e);

        return false;
    } finally {
        await client.$disconnect();
    }
};

export const getUsers = async (): Promise<MyModel[] | null> => {
    const client = new PrismaClient();

    try {
        return await client.myModel.findMany();
    } catch (e) {
        console.log('Error getting users:', e);

        return null;
    } finally {
        await client.$disconnect();
    }
};
