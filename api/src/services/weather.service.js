import { openMeteoProvider } from "../providers/index.js";
import { normalizeWeatherData } from "../utils/openMeteoNormalizer.util.js";

export const getWeatherData = async (lat, lon) => {
    const result = await openMeteoProvider.getWeatherData(lat, lon);
    const weatherData = normalizeWeatherData(result);
    return weatherData;
};