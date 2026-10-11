import styles from "./ScoreOverview.module.css";
import shared from "../../../styles/shared.module.css";
import { getScoreLevel } from '../../../utils/results.util';

export default function ScoreOverview({ bestHour, averageScore, day }) {
    const bestScoreLevel = getScoreLevel(bestHour.overallScore);
    const averageScoreLevel = getScoreLevel(averageScore);

    return (
        <div className={styles.scoreOverview}>
            <div className={styles.scoreMetric} >
                <p className={shared.sectionEyebrow}>BEST WINDOW</p>
                <div className={`${styles.metricValue} ${shared[bestScoreLevel]}`}>
                    {bestHour.overallScore}<span>/100</span>
                </div>
                <strong>{bestHour.time}</strong>
                <span className={styles.metricNote}>{bestScoreLevel} conditions</span>
            </div>
            <div className={styles.metricDivider} />
            <div className={styles.scoreMetric} >
                <p className={shared.sectionEyebrow}>12-HOUR AVERAGE</p>
                <div className={`${styles.metricValue} ${shared[averageScoreLevel]}`}>
                    {averageScore}<span>/100</span>
                </div>
                <strong>{day}</strong>
                <span className={styles.metricNote}>08:00–19:00 {averageScoreLevel} conditions</span>
            </div>
        </div>
    );
}