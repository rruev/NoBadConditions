import { cragService } from '../services/index.js';
import { createCragSchema, updateCragSchema } from '../schemas/crag.schema.js';
import { getErrors } from '../utils/errors.util.js';

export const create = async (req, res) => {
    const userId = req.user.id;

    try {
        const validatedData = createCragSchema.parse(req.body);
        const crag = await cragService.create(userId, validatedData);
        res.status(201).json(crag);
    } catch (error) {
        res.status(400).json({ error: getErrors(error) });
    }
};

export const update = async (req, res) => {
    const { cragId } = req.params;
    const userId = req.user.id;

    try {
        const validatedData = updateCragSchema.parse(req.body);
        const crag = await cragService.update(cragId, userId, validatedData);
        res.status(200).json(crag);
    } catch (error) {
        res.status(400).json({ error: getErrors(error) });
    }
};

export const getAll = async (req, res) => {
    const userId = req.user.id;
    try {
        const filter = req.query;
        const crags = await cragService.getAll(userId, filter);
        res.status(200).json(crags);
    } catch (error) {
        res.status(400).json({ error: getErrors(error) });
    }
};

export const remove = async (req, res) => {
    const { cragId } = req.params;
    const userId = req.user.id;

    try {
        const crag = await cragService.remove(cragId, userId);
        res.status(200).json(crag);
    } catch (error) {
        res.status(400).json({ error: getErrors(error) });
    }
};

export const getById = async (req, res) => {
    const { cragId } = req.params;

    try {
        const crag = await cragService.getById(cragId);
        res.status(200).json(crag);
    } catch (error) {
        res.status(400).json({ error: getErrors(error) });
    }
};
