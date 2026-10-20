import { prisma } from '../lib/prisma.js';

export const create = async (data) => {
    return await prisma.crag.create({
        data
    });
};

export const getById = async (cragId) => {
    return await prisma.crag.findUnique({
        where: { id: cragId }
    });
};

export const getAll = async (userId,filter) => {
    return prisma.crag.findMany({
        where: {
            userId,
            name: {
                contains: filter.search || '',
                mode: 'insensitive'
            }
        },
        take: filter.take || undefined,
        skip: filter.skip || undefined,
        include: {
            active: true
        }
    });
};

export const update = async (cragId, userId, data) => {
    return await prisma.crag.update({
        where: { id: cragId, userId: userId },
        data
    });
};

export const remove = async (cragId, userId) => {
    return await prisma.crag.delete({
        where: { id: cragId, userId: userId }
    });
};