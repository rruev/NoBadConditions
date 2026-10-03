import { weatherService, conditionScoreService } from "../services";
// import { cragService } from "../services";

export const getConditionsByCragId = async (cragId) => {
    // const crag = await cragService.getCragById(cragId);
    // const { lon, lat } = crag;
    // const result = await weatherService.getConditions(lon, lat);
    // return result;
};

export const getConditionsByLocation = async (lat, lon) => {
    const weatherData = await weatherService.getWeatherData(lat, lon);
    const conditionScore = await conditionScoreService.getConditionScore(weatherData);

    return {
        weatherData,
        conditionScore
    };
};