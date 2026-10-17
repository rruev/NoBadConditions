import { cragRepo } from '../repos/index.js';

export const create = async (userId, data) => {
    return await cragRepo.create({...data, userId});
};

export const getById = async (cragId) => {
    return await cragRepo.getById(cragId);
};

export const getAll = async (filter) => {
    return await cragRepo.getAll(filter);
};

export const update = async (cragId, userId, data) => {
    return await cragRepo.update(cragId, userId, data);
};

export const remove = async (cragId, userId) => {
    return await cragRepo.remove(cragId, userId);
};
