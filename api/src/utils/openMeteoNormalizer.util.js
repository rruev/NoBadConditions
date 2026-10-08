export const normalizeWeatherData = (response) => {
    const latitude = response.latitude();
    const longitude = response.longitude();
    const elevation = response.elevation();
    const timezone = response.timezone();
    const utcOffsetSeconds = response.utcOffsetSeconds();
    const hourly = response.hourly();

    // Note: The order of weather variables in the URL query and the indices below need to match!
    const rawData = {
        latitude,
        longitude,
        elevation,
        timezone,
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

    const weatherData = {
        ...rawData,
        hourly: getHourlyData(rawData),
    };

    return weatherData;
}


const getHourlyData = (data) => {
    const hourlyData = data.hourly.time.map((time, index) => {
        const date = new Date(time);
        return {
            time: date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
            date: date.toLocaleDateString('en-GB'),
            temperature: data.hourly.temperature_2m[index].toFixed(1),
            humidity: data.hourly.relative_humidity_2m[index].toFixed(1),
            wind_speed: data.hourly.wind_speed_10m[index].toFixed(1),
            apparent_temperature: data.hourly.apparent_temperature[index].toFixed(1),
            precipitation_probability: data.hourly.precipitation_probability[index].toFixed(1),
            precipitation: data.hourly.precipitation[index].toFixed(1),
            rain: data.hourly.rain[index].toFixed(1),
            showers: data.hourly.showers[index].toFixed(1),
            snowfall: data.hourly.snowfall[index].toFixed(1),
            snow_depth: data.hourly.snow_depth[index].toFixed(1),
            cloud_cover: data.hourly.cloud_cover[index].toFixed(1),
            wind_direction: data.hourly.wind_direction_10m[index].toFixed(1),
            wind_gusts: data.hourly.wind_gusts_10m[index].toFixed(1),
        };
    });
    return hourlyData;
}