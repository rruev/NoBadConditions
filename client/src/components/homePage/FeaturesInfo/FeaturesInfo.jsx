import styles from './FeaturesInfo.module.css';

const features = [
    {
        icon: '☀',
        title: 'Weather data',
        text: 'Up-to-date weather information for your climbing location.',
    },
    {
        icon: '⌁',
        title: 'Smart conditions',
        text: 'Multiple weather factors combined into one useful score.',
    },
    {
        icon: '⌖',
        title: 'Explore crags',
        text: 'Choose from existing climbing areas or add your own.',
    },
    {
        icon: '↗',
        title: 'Best climbing time',
        text: 'See which part of the day is most suitable for climbing.',
    },
];

export default function FeaturesInfo() {
    return (
        <section className={styles.features}>
            {features.map(({ icon, title, text }) => (
                <article key={title}>
                    <div className={styles.icon} aria-hidden="true">{icon}</div>
                    <h3 className={styles.title}>{title}</h3>
                    <p className={styles.description}>{text}</p>
                </article>
            ))}
        </section>
    );
}
