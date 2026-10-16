import { fetchWeatherApi } from "openmeteo";

export const getWeatherData = async (lat, lon) => {

    const params = {
        latitude: lat,
        longitude: lon,
        daily: [
            "temperature_2m_max", 
            "temperature_2m_min"
        ],
        hourly: [
            "temperature_2m",
            "relative_humidity_2m",
            "wind_speed_10m",
            "apparent_temperature",
            "precipitation_probability",
            "precipitation",
            "rain",
            "showers",
            "snowfall",
            "snow_depth",
            "cloud_cover",
            "wind_direction_10m",
            "wind_gusts_10m"],
        current: ["temperature_2m", "relative_humidity_2m", "apparent_temperature", "precipitation"],
        timezone: "auto",
        forecast_days: 7,
    };
    const url = process.env.OPEN_METEO_URL;

    const responses = await fetchWeatherApi(url, params);

    return responses[0];
};