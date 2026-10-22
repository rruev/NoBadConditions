import styles from './Result.module.css';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import useConditions from '../../../hooks/useConditions';
import { get12HourForecast, getDate } from '../../../utils/results.util';
import ResultHeader from '../ResultHeader/ResultHeader';
import ResultOverview from '../ResultOverview/ResultOverview';
import ResultChart from '../ResultChart/ResultChart';
import ResultHourDetails from '../ResultHourDetails/ResultHourDetails';
import ScoreOverview from '../ScoreOverview/ScoreOverview';
import ResultSkeleton from '../ResultSkeleton/ResultSkeleton';

const scoreFactors = [
    { key: 'temperature', label: 'Temperature', color: 'temperatureFactor' },
    { key: 'humidity', label: 'Humidity', color: 'humidityFactor' },
    { key: 'wind', label: 'Wind', color: 'windFactor' },
    { key: 'precipitation', label: 'Precipitation', color: 'precipitationFactor' },
];

export default function Result() {
    const { conditions, loading } = useConditions();
    console.log(conditions.length);
    const [dayIndex, setDayIndex] = useState(0);
    const [selectedHourIndex, setSelectedHourIndex] = useState(10);
    
    const days = conditions?.daily?.map((day, index) => index === 0 ? 'Today' : index === 1 ? 'Tomorrow' : getDate(index)) || [];
    const day = days[dayIndex];
    const climbingWindow = get12HourForecast(conditions?.hourly || [], dayIndex);
    const bestHour = climbingWindow.reduce((best, hour) => hour.overallScore > (best?.overallScore ?? 0) ? hour : best, 0);
    const averageScore = (climbingWindow.reduce((sum, hour) => sum + Number(hour.overallScore), 0) / climbingWindow.length).toFixed(0);
    
    const selectedHour = conditions?.hourly?.[selectedHourIndex];
    if (loading) {
        return <ResultSkeleton />;
    }

    
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