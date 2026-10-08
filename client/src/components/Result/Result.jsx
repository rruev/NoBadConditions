import styles from './Result.module.css';
import { useState } from 'react';
import { Link } from 'react-router';
import useConditions from '../../hooks/useConditions';

const hourlyForecast = [
    { time: '00:00', shortTime: '00', score: 35, temperature: 43, condition: 'Clear night', humidity: 70, wind: 4, precipitation: 0, factors: { temperature: 42, humidity: 50, wind: 88, precipitation: 100 } },
    { time: '01:00', shortTime: '01', score: 31, temperature: 42, condition: 'Clear night', humidity: 72, wind: 4, precipitation: 0, factors: { temperature: 39, humidity: 48, wind: 88, precipitation: 100 } },
    { time: '02:00', shortTime: '02', score: 28, temperature: 41, condition: 'Clear night', humidity: 74, wind: 3, precipitation: 0, factors: { temperature: 36, humidity: 45, wind: 91, precipitation: 100 } },
    { time: '03:00', shortTime: '03', score: 26, temperature: 40, condition: 'Clear night', humidity: 76, wind: 3, precipitation: 0, factors: { temperature: 34, humidity: 43, wind: 91, precipitation: 100 } },
    { time: '04:00', shortTime: '04', score: 25, temperature: 40, condition: 'Clear night', humidity: 77, wind: 3, precipitation: 0, factors: { temperature: 33, humidity: 42, wind: 91, precipitation: 100 } },
    { time: '05:00', shortTime: '05', score: 29, temperature: 41, condition: 'Clear night', humidity: 75, wind: 4, precipitation: 0, factors: { temperature: 37, humidity: 44, wind: 88, precipitation: 100 } },
    { time: '06:00', shortTime: '06', score: 36, temperature: 43, condition: 'Dawn, mostly clear', humidity: 70, wind: 5, precipitation: 0, factors: { temperature: 44, humidity: 50, wind: 84, precipitation: 100 } },
    { time: '07:00', shortTime: '07', score: 47, temperature: 48, condition: 'Clouds clearing', humidity: 64, wind: 7, precipitation: 0, factors: { temperature: 53, humidity: 60, wind: 70, precipitation: 100 } },
    { time: '08:00', shortTime: '08', score: 58, temperature: 54, condition: 'Clouds clearing', humidity: 58, wind: 9, precipitation: 0, factors: { temperature: 62, humidity: 72, wind: 48, precipitation: 100 } },
    { time: '09:00', shortTime: '09', score: 66, temperature: 58, condition: 'Mostly sunny', humidity: 52, wind: 8, precipitation: 0, factors: { temperature: 71, humidity: 78, wind: 58, precipitation: 100 } },
    { time: '10:00', shortTime: '10', score: 74, temperature: 63, condition: 'Mostly sunny', humidity: 45, wind: 7, precipitation: 0, factors: { temperature: 82, humidity: 85, wind: 66, precipitation: 100 } },
    { time: '11:00', shortTime: '11', score: 82, temperature: 68, condition: 'Sunny', humidity: 39, wind: 6, precipitation: 0, factors: { temperature: 91, humidity: 91, wind: 76, precipitation: 100 } },
    { time: '12:00', shortTime: '12', score: 91, temperature: 72, condition: 'Sunny', humidity: 34, wind: 4, precipitation: 0, factors: { temperature: 96, humidity: 96, wind: 83, precipitation: 100 } },
    { time: '13:00', shortTime: '13', score: 96, temperature: 75, condition: 'Sunny', humidity: 31, wind: 3, precipitation: 0, factors: { temperature: 98, humidity: 98, wind: 91, precipitation: 100 } },
    { time: '14:00', shortTime: '14', score: 94, temperature: 77, condition: 'Sunny', humidity: 29, wind: 4, precipitation: 0, factors: { temperature: 94, humidity: 96, wind: 90, precipitation: 100 } },
    { time: '15:00', shortTime: '15', score: 88, temperature: 76, condition: 'Mostly sunny', humidity: 30, wind: 6, precipitation: 0, factors: { temperature: 92, humidity: 95, wind: 82, precipitation: 100 } },
    { time: '16:00', shortTime: '16', score: 79, temperature: 73, condition: 'Partly cloudy', humidity: 34, wind: 9, precipitation: 0, factors: { temperature: 88, humidity: 92, wind: 69, precipitation: 100 } },
    { time: '17:00', shortTime: '17', score: 72, temperature: 68, condition: 'Partly cloudy', humidity: 39, wind: 11, precipitation: 0, factors: { temperature: 81, humidity: 88, wind: 59, precipitation: 100 } },
    { time: '18:00', shortTime: '18', score: 64, temperature: 62, condition: 'Mostly cloudy', humidity: 46, wind: 10, precipitation: 5, factors: { temperature: 72, humidity: 82, wind: 52, precipitation: 95 } },
    { time: '19:00', shortTime: '19', score: 51, temperature: 57, condition: 'Cloudy', humidity: 53, wind: 8, precipitation: 10, factors: { temperature: 63, humidity: 74, wind: 48, precipitation: 88 } },
    { time: '20:00', shortTime: '20', score: 44, temperature: 53, condition: 'Mostly cloudy', humidity: 58, wind: 7, precipitation: 10, factors: { temperature: 56, humidity: 68, wind: 64, precipitation: 88 } },
    { time: '21:00', shortTime: '21', score: 40, temperature: 50, condition: 'Mostly cloudy', humidity: 62, wind: 6, precipitation: 10, factors: { temperature: 51, humidity: 63, wind: 72, precipitation: 88 } },
    { time: '22:00', shortTime: '22', score: 37, temperature: 48, condition: 'Cloudy', humidity: 66, wind: 5, precipitation: 15, factors: { temperature: 47, humidity: 57, wind: 80, precipitation: 82 } },
    { time: '23:00', shortTime: '23', score: 34, temperature: 46, condition: 'Cloudy', humidity: 68, wind: 5, precipitation: 15, factors: { temperature: 44, humidity: 54, wind: 80, precipitation: 82 } },
];

const scoreFactors = [
    { key: 'temperature', label: 'Temperature', color: 'temperatureFactor' },
    { key: 'humidity', label: 'Humidity', color: 'humidityFactor' },
    { key: 'wind', label: 'Wind', color: 'windFactor' },
    { key: 'precipitation', label: 'Precipitation', color: 'precipitationFactor' },
];

function getScoreLevel(score) {
    if (score >= 90) return 'excellent';
    if (score >= 75) return 'good';
    if (score >= 60) return 'fair';
    return 'low';
}

export default function Result() {
    const [selectedHourIndex, setSelectedHourIndex] = useState(10);
    const selectedHour = hourlyForecast[selectedHourIndex];
    const climbingWindow = hourlyForecast.slice(8, 20);
    const bestHour = climbingWindow.reduce((best, hour) => hour.score > best.score ? hour : best);
    const averageScore = (climbingWindow.reduce((sum, hour) => sum + hour.score, 0) / climbingWindow.length).toFixed(1);

    const { conditions } = useConditions();
    console.log(conditions);

    return (
        <div className={styles.page}>
            <div className={styles.content}>
                <Link to="/" className={styles.backLink}>
                    <span aria-hidden="true">←</span>
                    Back to search
                </Link>

                <header className={styles.pageHeader}>
                    <div>
                        <p className={styles.eyebrow}>CRAG CONDITIONS · DEMO FORECAST</p>
                        <h1>Boulder Canyon</h1>
                        <p className={styles.location}>Boulder, Colorado <span aria-hidden="true">·</span> Today, October 8</p>
                    </div>
                    <div className={styles.forecastRange}>
                        <span className={styles.liveDot} />
                        <span>24-hour outlook</span>
                        <span className={styles.rangeDivider} />
                        <span>00:00 – 23:00</span>
                    </div>
                </header>

                <section className={styles.overview} aria-label="Current weather and 12-hour scores">
                    <div className={styles.currentWeather}>
                        <p className={styles.sectionEyebrow}>CURRENT WEATHER <span>·</span> 10:15 AM</p>
                        <div className={styles.currentCondition}>
                            <span className={styles.sunIcon} aria-hidden="true">☼</span>
                            <span className={styles.currentTemperature}>68<span>°</span></span>
                            <div className={styles.conditionText}>
                                <strong>Mostly sunny</strong>
                                <span>Feels like 67°</span>
                            </div>
                        </div>
                        <div className={styles.weatherStats}>
                            <div><span>Wind</span><strong>5 <small>mph</small></strong></div>
                            <div><span>Humidity</span><strong>38<small>%</small></strong></div>
                            <div><span>Precip.</span><strong>0<small>%</small></strong></div>
                        </div>
                    </div>

                    <div className={styles.scoreOverview}>
                        <div className={styles.scoreMetric}>
                            <span className={styles.sectionEyebrow}>BEST WINDOW</span>
                            <div className={`${styles.metricValue} ${styles.excellentText}`}>
                                {bestHour.score}<span>/100</span>
                            </div>
                            <strong>{bestHour.time}</strong>
                            <span className={styles.metricNote}>Excellent conditions</span>
                        </div>
                        <div className={styles.metricDivider} />
                        <div className={styles.scoreMetric}>
                            <span className={styles.sectionEyebrow}>12-HOUR AVERAGE</span>
                            <div className={`${styles.metricValue} ${styles.averageText}`}>
                                {averageScore}<span>/100</span>
                            </div>
                            <strong>Today</strong>
                            <span className={styles.metricNote}>08:00–19:00 climbing window</span>
                        </div>
                    </div>
                </section>

                <section className={styles.chartSection} aria-labelledby="chart-title">
                    <div className={styles.chartHeader}>
                        <div>
                            <p className={styles.sectionEyebrow}>HOUR BY HOUR</p>
                            <h2 id="chart-title">Climbing score</h2>
                        </div>
                        <div className={styles.scoreLegend} aria-label="Score ranges">
                            <span><i className={styles.legendExcellent} /> Excellent</span>
                            <span><i className={styles.legendGood} /> Good</span>
                            <span><i className={styles.legendFair} /> Fair</span>
                        </div>
                    </div>

                    <div className={styles.chart}>
                        <div className={styles.axisLabels} aria-hidden="true">
                            <span>100</span>
                            <span>75</span>
                            <span>50</span>
                            <span>25</span>
                        </div>
                        <div className={styles.hourlyBars}>
                            {hourlyForecast.map((hour, index) => {
                                const level = getScoreLevel(hour.score);
                                const selected = selectedHourIndex === index;

                                return (
                                    <button
                                        key={hour.time}
                                        type="button"
                                        className={`${styles.hourButton} ${selected ? styles.selectedHour : ''}`}
                                        aria-label={`${hour.time}, climbing score ${hour.score} out of 100`}
                                        aria-pressed={selected}
                                        onClick={() => setSelectedHourIndex(index)}
                                    >
                                        <span className={styles.barTrack} style={{ '--score-height': `${hour.score}%` }}>
                                            <span className={`${styles.scoreTooltip} ${styles[level]}`}>
                                                {hour.score}
                                            </span>
                                            <span
                                                className={`${styles.scoreBar} ${styles[`${level}Bar`]}`}
                                                style={{ height: `${hour.score}%` }}
                                            />
                                        </span>
                                        <span className={styles.hourLabel}>{hour.shortTime}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </section>

                <section className={styles.hourDetails} aria-live="polite" aria-labelledby="hour-details-title">
                    <div className={styles.detailsHeader}>
                        <div>
                            <p className={styles.sectionEyebrow}>SELECTED HOUR</p>
                            <h2 id="hour-details-title">{selectedHour.time}</h2>
                        </div>
                        <span className={`${styles.conditionBadge} ${styles[getScoreLevel(selectedHour.score)]}`}>
                            {selectedHour.condition}
                        </span>
                    </div>

                    <div className={styles.hourSummary}>
                        <div className={styles.hourWeather}>
                            <div className={styles.hourTemperature}>{selectedHour.temperature}<span>°</span></div>
                            <div className={styles.hourWeatherStats}>
                                <div><span>Humidity</span><strong>{selectedHour.humidity}%</strong></div>
                                <div><span>Wind</span><strong>{selectedHour.wind} mph</strong></div>
                                <div><span>Precipitation</span><strong>{selectedHour.precipitation}%</strong></div>
                            </div>
                        </div>
                        <div className={styles.selectedScore}>
                            <span className={styles.sectionEyebrow}>CLIMBING SCORE</span>
                            <strong className={styles[getScoreLevel(selectedHour.score)]}>{selectedHour.score}<span>/100</span></strong>
                        </div>
                    </div>

                    <div className={styles.factorSection}>
                        <div className={styles.factorHeading}>
                            <h3>Score factors</h3>
                            <span>Impact by condition</span>
                        </div>
                        <div className={styles.factorGrid}>
                            {scoreFactors.map(factor => {
                                const score = selectedHour.factors[factor.key];

                                return (
                                    <div className={styles.factor} key={factor.key}>
                                        <div className={styles.factorLabel}>
                                            <span>{factor.label}</span>
                                            <strong>{score}<small>/100</small></strong>
                                        </div>
                                        <div className={styles.factorTrack}>
                                            <span
                                                className={`${styles.factorFill} ${styles[factor.color]}`}
                                                style={{ width: `${score}%` }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}