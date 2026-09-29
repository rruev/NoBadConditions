import './FeaturesInfo.css';

export default function FeaturesInfo() {
    return (
        <section className="features">

            <article className="feature">

                <div className="feature-icon">
                    ☀
                </div>

                <h3>
                    Weather data
                </h3>

                <p>
                    Up-to-date weather information
                    for your climbing location.
                </p>

            </article>


            <article className="feature">

                <div className="feature-icon">
                    ⌁
                </div>

                <h3>
                    Smart conditions
                </h3>

                <p>
                    Multiple weather factors combined
                    into one useful score.
                </p>

            </article>


            <article className="feature">

                <div className="feature-icon">
                    ⌖
                </div>

                <h3>
                    Explore crags
                </h3>

                <p>
                    Choose from existing climbing areas
                    or add your own.
                </p>

            </article>


            <article className="feature">

                <div className="feature-icon">
                    ↗
                </div>

                <h3>
                    Best climbing time
                </h3>

                <p>
                    See which part of the day is most
                    suitable for climbing.
                </p>

            </article>

        </section>
    );
}