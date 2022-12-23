import './App.css';
import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Popup,
  useMapEvents,
} from 'react-leaflet';
import { useEffect, useState } from 'react';
import { LatLngExpression, LatLng } from 'leaflet';
// import 'leaflet/dist/leaflet.css';

function LocationMarker() {
  const [position, setPosition] = useState<LatLng | null>(null);
  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
}

function App() {
  const [position, setPosition] = useState<LatLngExpression>([51.505, -0.09]);

  // const map = useMapEvents({
  //   click() {
  //     map.locate()
  //   },
  //   locationfound(e) {
  //     setPosition(e.latlng);
  //     map.flyTo(e.latlng, map.getZoom());
  //   }
  // });

  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition(
  //     (pos) =>
  //       const crd = pos.coords;
  //       setPosition([crd.latitude, crd.longitude]);
  //       console.log('launched')
  //     },
  //     () => {},
  //     { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
  //   );
  // }, []);

  return (
    <div>
      <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker />
      </MapContainer>
    </div>
  );
}

export default App;
