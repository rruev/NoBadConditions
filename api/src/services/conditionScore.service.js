import calculateConditionScore from '../scoringEngine/scoringEngine.js';

export const getConditionScore = (weatherData) => {
    const conditionScore = calculateConditionScore(weatherData);
    return conditionScore;
}