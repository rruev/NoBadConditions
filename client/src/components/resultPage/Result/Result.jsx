import styles from './Result.module.css';
import { useState } from 'react';
import useConditions from '../../../hooks/useConditions'

import { Link, useParams } from 'react-router';
import { getDailyStats } from '../../../utils/results.util';

import ResultHeader from '../ResultHeader/ResultHeader';
import ResultOverview from '../ResultOverview/ResultOverview';
import ResultChart from '../ResultChart/ResultChart';
import ResultHourDetails from '../ResultHourDetails/ResultHourDetails';
import ScoreOverview from '../ScoreOverview/ScoreOverview';
import ResultSkeleton from '../ResultSkeleton/ResultSkeleton';
import ErrorMessage from '../../ui/ErrorMessage/ErrorMessage';

const scoreFactors = [
    { key: 'temperature', label: 'Temperature', color: 'temperatureFactor' },
    { key: 'humidity', label: 'Humidity', color: 'humidityFactor' },
    { key: 'wind', label: 'Wind', color: 'windFactor' },
    { key: 'precipitation', label: 'Precipitation', color: 'precipitationFactor' },
];

export default function Result() {
    const { conditions, loading, error } = useConditions();
    const [dayIndex, setDayIndex] = useState(0);
    const [selectedHourIndex, setSelectedHourIndex] = useState(10);

    const { page } = useParams();
    const home = page === 'home';

    const {
        days,
        bestHour,
        averageScore
    } = getDailyStats(conditions, dayIndex);

    const selectedHour = conditions?.hourly?.[selectedHourIndex];

    if (loading) {
        return <ResultSkeleton />;
    }

    return (
        <div className={styles.page}>
            <div className={styles.content}>
                <Link to={home ? '/' : `/${page}`} className={styles.backLink}>
                    <span aria-hidden="true">←</span>
                    Back
                </Link>

                {error ?
                    <ErrorMessage error={error} />
                    :
                    <>
                        <ResultHeader name={conditions.cragName} city={conditions.city} country={conditions.country} />

                        <ResultOverview bestHour={bestHour} averageScore={averageScore} currentWeather={conditions.current} />

                        <ScoreOverview
                            bestHour={bestHour}
                            averageScore={averageScore}
                            day={days[dayIndex]}
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
                    </>
                }
            </div>
        </div>
    );
}