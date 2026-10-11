import styles from './Result.module.css';
import { useState } from 'react';
import { Link } from 'react-router';
import useConditions from '../../../hooks/useConditions';
import { get12HourForecast } from '../../../utils/results.util';
import ResultHeader from '../ResultHeader/ResultHeader';
import ResultOverview from '../ResultOverview/ResultOverview';
import ResultChart from '../ResultChart/ResultChart';
import ResultHourDetails from '../ResultHourDetails/ResultHourDetails';
import ScoreOverview from '../ScoreOverview/ScoreOverview';

const scoreFactors = [
    { key: 'temperature', label: 'Temperature', color: 'temperatureFactor' },
    { key: 'humidity', label: 'Humidity', color: 'humidityFactor' },
    { key: 'wind', label: 'Wind', color: 'windFactor' },
    { key: 'precipitation', label: 'Precipitation', color: 'precipitationFactor' },
];

// Placeholder until the API returns three days; scores are shifted per day to tell them apart.
// const scoreOffsets = [0, -12, 6];
// const dayFormatter = new Intl.DateTimeFormat('en', { weekday: 'long', month: 'short', day: 'numeric' });

// const days = scoreOffsets.map((offset, dayIndex) => {
//     const date = new Date();
//     date.setDate(date.getDate() + dayIndex);

//     return {
//         label: dayIndex === 0 ? 'Today' : dayIndex === 1 ? 'Tomorrow' : dayFormatter.format(date),
//         date: dayFormatter.format(date),
//         hours: hourlyForecast.map(hour => ({
//             ...hour,
//             score: Math.min(100, Math.max(0, hour.score + offset)),
//         })),
//     };
// });

export default function Result() {
    const { conditions } = useConditions();
    console.log(conditions);
    const [dayIndex, setDayIndex] = useState(0);
    const [selectedHourIndex, setSelectedHourIndex] = useState(10);
    const days = conditions.daily.map((day, index) => index === 0 ? 'Today' : index === 1 ? 'Tomorrow' : `Day ${index + 1}`);
    const day = days[dayIndex];
    const climbingWindow = get12HourForecast(conditions.hourly, dayIndex);
    const bestHour = climbingWindow.reduce((best, hour) => hour.overallScore > (best?.overallScore ?? 0) ? hour : best, 0);
    const averageScore = (climbingWindow.reduce((sum, hour) => sum + Number(hour.overallScore), 0) / climbingWindow.length).toFixed(0);
    
    const selectedHour = conditions.hourly[selectedHourIndex];

    return (
        <div className={styles.page}>
            <div className={styles.content}>
                <Link to="/" className={styles.backLink}>
                    <span aria-hidden="true">←</span>
                    Back to search
                </Link>

                <ResultHeader name={conditions.cragName} location="Gmunden, Austria" />

                <ResultOverview bestHour={bestHour} averageScore={averageScore} currentWeather={conditions.current} />

                <ScoreOverview
                    bestHour={bestHour}
                    averageScore={averageScore}
                    day={day}
                />

                <ResultChart
                    hourlyForecast={conditions.hourly}
                    days={days}
                    dayIndex={dayIndex}
                    setDayIndex={setDayIndex}
                    selectedHourIndex={selectedHourIndex}
                    setSelectedHourIndex={setSelectedHourIndex}
                />

                <ResultHourDetails
                    selectedHour={selectedHour}
                    scoreFactors={scoreFactors}
                />
            </div>
        </div>
    );
}