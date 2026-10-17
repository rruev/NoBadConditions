import { prisma } from '../lib/prisma.js';

export const getAll = async (filter) => {
    return prisma.publicCrag.findMany({
        where: {
            name: {
                contains: filter.search || '',
                mode: 'insensitive'
            }
        },
        take: filter.take || undefined,
        skip: filter.skip || undefined
    });
}

export const getById = async (publicCragId) => {
    return prisma.publicCrag.findUnique({
        where: { id: publicCragId }
    });
}

export const create = async (data) => {
    return prisma.publicCrag.create({
        data
    });
}

export const update = async (publicCragId, data) => {
    return prisma.publicCrag.update({
        where: { id: publicCragId },
        data
    });
}

export const remove = async (publicCragId) => {
    return prisma.publicCrag.delete({
        where: { id: publicCragId }
    });
}