import { conditionsService } from "../services";

export const getByLocation = async (req, res) => {
    const { lat, lon } = req.query;
    const result = await conditionsService.getConditionsByLocation(lat, lon);
    res.json(result);
}

export const getByCragId = async (req, res) => {
    const cragId = req.params.id;
    const result = await conditionsService.getConditionsByCragId(cragId);
    res.json(result);
}