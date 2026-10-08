import { publicCragService } from '../services';

export const getAll = async (req, res) => {
    const filter = req.query;
    try {
        const publicCrags = await publicCragService.getAll(filter);
        res.json(publicCrags);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getById = async (req, res) => {
    const { publicCragId } = req.params;
    try {
        const publicCrag = await publicCragService.getById(publicCragId);
        res.json(publicCrag);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const create = async (req, res) => {
    const data = req.body;
    try {
        const publicCrag = await publicCragService.create(data);
        res.status(201).json(publicCrag);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const update = async (req, res) => {
    const { publicCragId } = req.params;
    const data = req.body;
    try {
        const publicCrag = await publicCragService.update(publicCragId, data);
        res.json(publicCrag);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const remove = async (req, res) => {
    const { publicCragId } = req.params;
    try {
        const publicCrag = await publicCragService.remove(publicCragId);
        res.json(publicCrag);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}