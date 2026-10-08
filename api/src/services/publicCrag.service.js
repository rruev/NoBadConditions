import { publicCragRepo } from '../repos';

export const getAll = async (filter={}) => {
    filter.search = filter.search || '';
    filter.take = filter.take || 10;
    
    const page = filter.page || 1;
    filter.skip = (page - 1) * filter.take;
    delete filter.page;

    return publicCragRepo.getAll(filter);
}

export const getById = async (publicCragId) => {
    return publicCragRepo.getById(publicCragId);
}

export const create = async (data) => {
    return publicCragRepo.create(data);
}

export const update = async (publicCragId, data) => {
    return publicCragRepo.update(publicCragId, data);
}

export const remove = async (publicCragId) => {
    return publicCragRepo.remove(publicCragId);
}