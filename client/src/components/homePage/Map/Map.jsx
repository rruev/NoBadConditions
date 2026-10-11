import styles from './Map.module.css';
import 'leaflet/dist/leaflet.css';
import {
    MapContainer,
    TileLayer
} from 'react-leaflet'
import LocationMarker from './LocationMarker';

export default function Map({
    location,
    handleLocationChange
}) {

    return (
        <MapContainer className={styles.map} center={[46.2957133089894, 21.905915512870294]} zoom={5}>
            {/* Satellite */}
            <TileLayer
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                attribution="Tiles © Esri"
            />

            {/* Labels, borders, roads */}
            <TileLayer
                url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
                attribution="Labels © Esri"
            />
            <LocationMarker {...location} handleLocationChange={handleLocationChange} />
        </MapContainer>
    );
}