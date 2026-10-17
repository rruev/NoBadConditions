import { activeCragRepo } from '../repos/index.js';
import { weatherService, conditionScoreService } from './index.js';

export const getAll = async () => {
    const activeCrags = await activeCragRepo.getAll();
    for (const activeCrag of activeCrags) {
        const weather = await weatherService.getWeatherData(activeCrag.crag.latitude, activeCrag.crag.longitude);
        activeCrag.conditions = await conditionScoreService.getConditionScore(weather);
    }
    return activeCrags;
};

export const create = async (cragId, userId) => {
    return await activeCragRepo.create(cragId, userId);
};

export const remove = async (activeCragId) => {
    return await activeCragRepo.remove(activeCragId);
};