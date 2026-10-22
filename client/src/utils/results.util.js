export const getScoreLevel = (score) => {
    if (score >= 90) return 'excellent';
    if (score >= 60) return 'good';
    if (score >= 30) return 'fair';
    return 'low';
};

export const getDate = (dayIndex) => {
    if (dayIndex === 0) return 'Today';
    if (dayIndex === 1) return 'Tomorrow';
    const dayFormatter = new Intl.DateTimeFormat('en', { weekday: 'long', month: 'short', day: 'numeric' });
    const date = new Date();
    date.setDate(date.getDate() + dayIndex);
    return dayFormatter.format(date);
};

export const get12HourForecast = (hourlyForecast, dayIndex) => {
    const start = dayIndex * 24;
    const end = start + 24;
    const dayForecast = hourlyForecast.slice(start, end);
    return dayForecast.slice(8, 20);
}

export const getDailyStats = (weatherData, dayIndex) => {
    const days = weatherData?.daily?.map((day, index) => index === 0 ? 'Today' : index === 1 ? 'Tomorrow' : getDate(index)) || [];
    const climbingWindow = get12HourForecast(weatherData?.hourly || [], dayIndex);
    const bestHour = climbingWindow.reduce((best, hour) => hour.overallScore > (best?.overallScore ?? 0) ? hour : best, 0);
    const averageScore = (climbingWindow.reduce((sum, hour) => sum + Number(hour.overallScore), 0) / climbingWindow.length).toFixed(0);
    return { days, climbingWindow, bestHour, averageScore };
}
