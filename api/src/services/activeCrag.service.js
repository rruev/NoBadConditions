import { activeCragRepo } from '../repos/index.js';

export const getAll = async () => {
    return await activeCragRepo.getAll();
};

export const create = async (cragId, userId) => {
    return await activeCragRepo.create(cragId, userId);
};

export const remove = async (activeCragId) => {
    return await activeCragRepo.remove(activeCragId);
};