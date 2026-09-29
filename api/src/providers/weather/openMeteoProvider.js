import { fetchWeatherApi } from "openmeteo";

export const getConditions = async (lat, lon) => {

    const params = {
        latitude: lat,
        longitude: lon,
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
        timezone: "auto",
        forecast_days: 1,
    };
    const url = "https://api.open-meteo.com/v1/forecast";

    const responses = await fetchWeatherApi(url, params);

    const response = responses[0];

    // Attributes for timezone and location
    const latitude = response.latitude();
    const longitude = response.longitude();
    const elevation = response.elevation();
    const timezone = response.timezone();
    const utcOffsetSeconds = response.utcOffsetSeconds();

    console.log(
        `\nCoordinates: ${latitude}°N ${longitude}°E`,
        `\nElevation: ${elevation}m asl`,
        `\nTimezone: ${timezone}`,
        `\nTimezone difference to GMT+0: ${utcOffsetSeconds}s`,
    );

    const hourly = response.hourly();

    // Note: The order of weather variables in the URL query and the indices below need to match!
    const weatherData = {
        latitude,
        longitude,
        elevation,
        timezone,
        utcOffsetSeconds,
        hourly: {
            time: Array.from(
                { length: (Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval() },
                (_, i) => new Date((Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) * 1000)
            ),
            temperature_2m: hourly.variables(0).valuesArray(),
            relative_humidity_2m: hourly.variables(1).valuesArray(),
            wind_speed_10m: hourly.variables(2).valuesArray(),
            apparent_temperature: hourly.variables(3).valuesArray(),
            precipitation_probability: hourly.variables(4).valuesArray(),
            precipitation: hourly.variables(5).valuesArray(),
            rain: hourly.variables(6).valuesArray(),
            showers: hourly.variables(7).valuesArray(),
            snowfall: hourly.variables(8).valuesArray(),
            snow_depth: hourly.variables(9).valuesArray(),
            cloud_cover: hourly.variables(10).valuesArray(),
            wind_direction_10m: hourly.variables(11).valuesArray(),
            wind_gusts_10m: hourly.variables(12).valuesArray(),
        },
    };

    return weatherData;
}