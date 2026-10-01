import { Marker, Popup, useMapEvents } from 'react-leaflet';
import { useEffect } from 'react';

export default function LocationMarker({ lat, lon, handleLocationChange }) {
    const map = useMapEvents({
        click(e) {
            handleLocationChange(e.latlng.lat, e.latlng.lng);
        },
    });

    useEffect(() => {
        if (lat && lon) {
            map.setView([lat, lon]);
        }
    }, [lat, lon]);

    return (
        (lat && lon) &&
        <Marker position={[lat, lon]}>
            <Popup>You are here</Popup>
        </Marker>
    )
}