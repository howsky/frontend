import { useMapEvent } from 'react-leaflet';
import L from 'leaflet';
import { useMarkerContext } from '@/context/markerContext';
import { useActionContext } from '@/context/actionContext';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
});

export default function MarkerEvent() {
  const { markerState, setMarkerState } = useMarkerContext();
  const { buttonState } = useActionContext();

  const map = useMapEvent('click', async (location) => {
    if (!buttonState) return;

    if (markerState) {
      map.removeLayer(markerState);
    }

    const marker = L.marker(location.latlng).addTo(map);

    setMarkerState(marker);
  });

  return null;
}
