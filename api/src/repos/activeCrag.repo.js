import { prisma } from '../lib/prisma.js';

export const getAll = async () => {
    return await prisma.activeCrag.findMany({
        include: {
            crag: true
        }
    });
};

export const create = async (cragId, userId) => {
    return await prisma.activeCrag.create({
        data: {
            cragId,
            userId
        }
    });
};

export const remove = async (activeCragId) => {
    return await prisma.activeCrag.delete({
        where: { id: activeCragId }
    });
};