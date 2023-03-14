import "./MapComponent.css";
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const iconPerson = new L.Icon({
    iconUrl: require('../../../../../image/marker.png'),
    iconSize: new L.Point(40, 25),
    className: 'leaflet-div-icon'
});

function MapComponent({ lat, lng }: { lat: number, lng: number }): JSX.Element {

    return (
        <div className="MapComponent">
            <MapContainer style={{ zIndex: 10, height: '80vh', width: '80vw', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} center={[lat, lng]} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[lat, lng]} icon={iconPerson}>
                    <Popup>
                    </Popup>
                </Marker>
            </MapContainer>,
        </div>
    );
}

export default MapComponent;
