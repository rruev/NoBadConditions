import { prisma } from '../lib/prisma';

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

export const getById = async (id) => {
    return prisma.publicCrag.findUnique({
        where: { id }
    });
}

export const create = async (data) => {
    return prisma.publicCrag.create({
        data
    });
}

export const update = async (id, data) => {
    return prisma.publicCrag.update({
        where: { id },
        data
    });
}

export const remove = async (id) => {
    return prisma.publicCrag.delete({
        where: { id }
    });
}