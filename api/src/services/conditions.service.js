import { weatherService } from "../services";
// import { cragService } from "../services";

export const getConditionsByCragId = async (cragId) => {
    // const crag = await cragService.getCragById(cragId);
    // const { lon, lat } = crag;
    // const result = await weatherService.getConditions(lon, lat);
    // return result;
};

export const getConditionsByLocation = async (lat, lon) => {
    const result = await weatherService.getConditions(lat, lon);
    return result;
};