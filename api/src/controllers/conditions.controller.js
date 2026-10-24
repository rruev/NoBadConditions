import { conditionsService } from "../services/index.js";
import { getErrors } from "../utils/errors.util.js";

export const getByLocation = async (req, res) => {
    const { lat, lon } = req.query;
    try {
        const result = await conditionsService.getConditionsByLocation(lat, lon);
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: getErrors(error) });
    }
}

export const getByCragId = async (req, res) => {
    const cragId = req.params.id;
    try {
        const result = await conditionsService.getConditionsByCragId(cragId);
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: getErrors(error) });
    }
}