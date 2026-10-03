import { conditionsService } from "../services";

export const getByLocation = async (req, res) => {
    const { lat, lon } = req.query;
    try {
        const result = await conditionsService.getConditionsByLocation(lat, lon);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getByCragId = async (req, res) => {
    const cragId = req.params.id;
    try {
        const result = await conditionsService.getConditionsByCragId(cragId);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}