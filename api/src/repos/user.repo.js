import { prisma } from '../lib/prisma.js';

export const getById = async (id) => {
    return prisma.user.findUnique({
        where: { id },
    });
};

export const getByEmail = async (email) => {
    return prisma.user.findUnique({
        where: { email },
    });
};

export const create = async (data) => {
    return prisma.user.create({
        data,
    });
};

export const update = async (id, data) => {
    return prisma.user.update({
        where: { id },
        data,
    });
};

export const remove = async (id) => {
    return prisma.user.delete({
        where: { id },
    });
};