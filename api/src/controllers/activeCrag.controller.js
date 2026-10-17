import { activeCragService } from '../services/index.js';
import { getErrors } from '../utils/errors.util.js';

export const getAll = async (req, res) => {
    try {
        const activeCrags = await activeCragService.getAll();
        res.json(activeCrags);
    } catch (error) {
        res.status(500).json({ error: getErrors(error) });
    }
};

export const create = async (req, res) => {
    const { cragId } = req.body;
    const userId = req.user.id;
    try {
        const newActiveCrag = await activeCragService.create(cragId, userId);
        res.status(201).json(newActiveCrag);
    } catch (error) {
        res.status(500).json({ error: getErrors(error) });
    }
};

export const remove = async (req, res) => {
    const { activeCragId } = req.params;
    try {
        const deletedActiveCrag = await activeCragService.remove(activeCragId);
        res.json(deletedActiveCrag);
    } catch (error) {
        res.status(500).json({ error: getErrors(error) });
    }
};