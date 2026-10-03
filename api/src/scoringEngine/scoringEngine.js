import { defaultPreferences } from './defaultPreferences.js';

const calculateConditionScore = (weatherData, preferences=defaultPreferences) => {
    const tempScore = calculateTempScore(weatherData.hourly[0].temperature, preferences);
    const humidityScore = calculateHumidityScore(weatherData.hourly[0].humidity, preferences);

    const score =
        Math.pow(tempScore / 100, 0.6) *
        Math.pow(humidityScore / 100, 0.4);

    return {
        overallScore: score * 100,
        tempScore: tempScore,
        humidityScore: humidityScore,
    };
};

const calculateTempScore = (temp, preferences) => {
    if (temp >= preferences.ideal_temp_low && temp <= preferences.ideal_temp_high) {
        // 100 at the middle 
        // 90 at the edges 
        const middle = (preferences.ideal_temp_low + preferences.ideal_temp_high) / 2;
        const distance = Math.abs(temp - middle);

        return 100 - (distance / ((preferences.ideal_temp_high - preferences.ideal_temp_low) / 2)) * 10;
    }

    if (temp >= preferences.good_temp_low && temp < preferences.ideal_temp_low) {
        // 90 at max → 60 at min
        return 60 + ((temp - preferences.good_temp_low) / (preferences.ideal_temp_low - preferences.good_temp_low)) * 30;
    }

    if (temp > preferences.ideal_temp_high && temp <= preferences.good_temp_high) {
        // 90 at min → 60 at max
        return 90 - ((temp - preferences.ideal_temp_high) / (preferences.good_temp_high - preferences.ideal_temp_high)) * 30; //
    }

    if (temp >= preferences.compromise_temp_low && temp < preferences.good_temp_low) {
        // 60 at max → 30 at min
        return 30 + ((temp - preferences.compromise_temp_low) / (preferences.good_temp_low - preferences.compromise_temp_low)) * 30;
    }

    if (temp > preferences.good_temp_high && temp <= preferences.compromise_temp_high) {
        // 60 at min → 30 at max
        return 60 - ((temp - preferences.good_temp_high) / (preferences.compromise_temp_high - preferences.good_temp_high)) * 30;
    }

    if (temp < preferences.compromise_temp_low) {
        // Gradually approach 0 as temperature becomes extreme (below min)
        return Math.max(0, 30 - ((preferences.compromise_temp_low - temp) / 20) * 30);
    }

    if (temp > preferences.compromise_temp_high) {
        // Gradually approach 0 as temperature becomes extreme (above max)
        return Math.max(0, 30 - ((temp - preferences.compromise_temp_high) / 20) * 30);
    }

    return 0;
};

const calculateHumidityScore = (humidity, preferences=defaultPreferences) => {
    if (humidity >= preferences.ideal_humidity_low && humidity <= preferences.ideal_humidity_high) {
        // 100 at the middle
        // 90 at the edges
        const middle = (preferences.ideal_humidity_low + preferences.ideal_humidity_high) / 2;
        const distance = Math.abs(humidity - middle);

        return 100 - (distance / ((preferences.ideal_humidity_high - preferences.ideal_humidity_low) / 2)) * 10;
    }

    if (humidity >= preferences.good_humidity_low && humidity < preferences.ideal_humidity_low) {
        // 60 at min → 90 at max
        return 60 + ((humidity - preferences.good_humidity_low) / (preferences.ideal_humidity_low - preferences.good_humidity_low)) * 30;
    }

    if (humidity > preferences.ideal_humidity_high && humidity <= preferences.good_humidity_high) {
        // 90 at min → 60 at max
        return 90 - ((humidity - preferences.ideal_humidity_high) / (preferences.good_humidity_high - preferences.ideal_humidity_high)) * 30;
    }

    if (humidity >= preferences.compromise_humidity_low && humidity < preferences.good_humidity_low) {
        // 30 at max → 60 at min
        return 30 + ((humidity - preferences.compromise_humidity_low) / (preferences.good_humidity_low - preferences.compromise_humidity_low)) * 30;
    }

    if (humidity > preferences.good_humidity_high && humidity <= preferences.compromise_humidity_high) {
        // 60 at min → 30 at max
        return 60 - ((humidity - preferences.good_humidity_high) / (preferences.compromise_humidity_high - preferences.good_humidity_high)) * 30;
    }

    if (humidity < preferences.compromise_humidity_low) {
        // Gradually approach 0 as humidity becomes extreme (below min)
        return Math.max(0, 30 - ((preferences.compromise_humidity_low - humidity) / 20) * 30);
    }

    if (humidity > preferences.compromise_humidity_high) {
        // Gradually approach 0 as humidity becomes extreme (above max)
        return Math.max(0, 30 - ((humidity - preferences.compromise_humidity_high) / 20) * 30);
    }

    return 0;
};

export default calculateConditionScore;