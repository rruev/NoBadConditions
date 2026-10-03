import { openMeteoProvider } from "../providers";
import { normalizeWeatherData } from "../utils/openMeteoNormalizer.util";

export const getWeatherData = async (lat, lon) => {
    const result = await openMeteoProvider.getWeatherData(lat, lon);
    const weatherData = normalizeWeatherData(result);
    return weatherData;
};