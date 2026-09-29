import './SearchCrag.css';

export default function SearchCrag() {
    return (
        <section className="search-card">

            <div className="mode-switch">

                <button className="mode-option active">
                    ⌖ &nbsp; Find by location
                </button>

                <button className="mode-option">
                    ◆ &nbsp; Choose existing crag
                </button>

            </div>


            <div className="fields">

                <div className="field">

                    <label htmlFor="latitude">
                        Latitude
                    </label>

                    <div className="input-wrap">

                        <span>⌖</span>

                        <input
                            id="latitude"
                            type="number"
                            step="any"
                            placeholder="e.g. 47.0722"
                        />

                    </div>

                </div>


                <div className="field">

                    <label htmlFor="longitude">
                        Longitude
                    </label>

                    <div className="input-wrap">

                        <span>⌖</span>

                        <input
                            id="longitude"
                            type="number"
                            step="any"
                            placeholder="e.g. 13.0550"
                        />

                    </div>

                </div>


                <div className="field">

                    <label htmlFor="elevation">
                        Elevation (m)
                    </label>

                    <div className="input-wrap">

                        <span>△</span>

                        <input
                            id="elevation"
                            type="number"
                            step="1"
                            placeholder="e.g. 1200"
                        />

                    </div>

                </div>

            </div>


            {/* <!--
                    Temporary map.

                    Later replace this div with:
                    <div id="map"></div>

                    and initialize Leaflet.
      --> */}

            <div
                className="map"
                aria-label="Map placeholder"
            >

                <div className="map-controls">

                    <button type="button">
                        +
                    </button>

                    <button type="button">
                        −
                    </button>

                </div>


                <div className="map-pin"></div>


                <button
                    className="map-toggle"
                    type="button"
                >
                    Satellite
                </button>


                <span className="map-attribution">
                    Map preview · OpenStreetMap
                </span>

            </div>


            <button
                className="submit"
                type="button"
            >
                Show climbing conditions
            </button>

        </section>
    );
}