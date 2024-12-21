import Navigation from '@/components/navigationbar';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './style.css';
import L from 'leaflet';
import { useMap } from 'react-leaflet';
import MarkerEvent from './events/MarkerEvent';
import MoveEvent from './events/MoveEvent';

function FlyToLocation({
  pinnedLocation,
  noFlyTo,
}: { pinnedLocation?: string; noFlyTo?: boolean }) {
  const map = useMap();

  if (pinnedLocation) {
    const location = pinnedLocation.split(',');

    L.marker([Number(location[0]), Number(location[1])]).addTo(map);

    if (!noFlyTo) {
      map.flyTo([Number(location[0]), Number(location[1])]);
    } else {
      map.setView([Number(location[0]), Number(location[1])]);
    }
  }

  return null;
}

export default function CustomMap(props: {
  pinnedLocation?: string;
  noFlyTo?: boolean;
}) {
  return (
    <div className="flex h-full flex-col">
      <MapContainer
        center={[35.710067, 139.8081255]}
        zoom={13}
        className="flex-1"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.jp/styles/maptiler-basic-ja/{z}/{x}/{y}.png"
        />
        <Navigation />
        <MarkerEvent />
        <MoveEvent />
        <FlyToLocation
          pinnedLocation={props.pinnedLocation}
          noFlyTo={props.noFlyTo}
        />
      </MapContainer>
    </div>
  );
}
