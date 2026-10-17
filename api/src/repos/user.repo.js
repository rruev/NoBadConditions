import { prisma } from '../lib/prisma.js';

export const getById = async (userId) => {
    return prisma.user.findUnique({
        where: { id: userId },
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

export const update = async (userId, data) => {
    return prisma.user.update({
        where: { id: userId },
        data,
    });
};

export const remove = async (userId) => {
    return prisma.user.delete({
        where: { id: userId },
    });
};