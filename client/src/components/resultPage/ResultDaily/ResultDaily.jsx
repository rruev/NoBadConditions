import styles from "./ResultDaily.module.css";
import shared from "../../../styles/shared.module.css";

import { useState } from 'react';

import { getDate } from "../../../utils/results.util";

import DailyCard from "../DailyCard/DailyCard";

export default function ResultDaily({
    dailyConditions
}) {
    const VISIBLE_DAYS = 7;
    const [firstDayIndex, setFirstDayIndex] = useState(4);

    const maxFirstDayIndex = Math.max(dailyConditions.length - VISIBLE_DAYS, 0);
    const canGoPrevious = firstDayIndex > 0;
    const canGoNext = firstDayIndex < maxFirstDayIndex;

    const showPrevious = () => setFirstDayIndex((index) => Math.max(index - 4, 0));
    const showNext = () => setFirstDayIndex((index) => Math.min(index + 4, maxFirstDayIndex));

    const visibleConditions = dailyConditions.slice(firstDayIndex, firstDayIndex + VISIBLE_DAYS);

    return(
        <section className={styles.dailySection} aria-labelledby="daily-title">
            <div className={styles.dailyHeader}>
                <div>
                    <p className={shared.sectionEyebrow}>DAY BY DAY</p>
                    <h2 id="daily-title">Daily forecast</h2>
                </div>

                <div className={styles.dailyNav}>
                    <button
                        type="button"
                        className={styles.dailyArrow}
                        onClick={showPrevious}
                        disabled={!canGoPrevious}
                        aria-label="Show previous day"
                    >
                        ‹
                    </button>
                    <button
                        type="button"
                        className={styles.dailyArrow}
                        onClick={showNext}
                        disabled={!canGoNext}
                        aria-label="Show next day"
                    >
                        ›
                    </button>
                </div>
            </div>

            <div className={styles.dailyCards} aria-live="polite">
                {visibleConditions.map((condition) => (
                    <DailyCard
                        key={condition.date}
                        date={getDate(firstDayIndex + visibleConditions.indexOf(condition))}
                        cloudCoverMean={condition.cloud_cover_mean}
                        tempMin={condition.temperature_min}
                        tempMax={condition.temperature_max}
                        precipitationSum={condition.precipitation_sum}
                    />
                ))}
            </div>
        </section>
    );
}
