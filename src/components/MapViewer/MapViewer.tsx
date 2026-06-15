import type {Device} from "../DevicePin/DevicePin";
import DevicePin from "../DevicePin/DevicePin";
import "./MapViewer.css";

type MapViewerProps = {
  devices: Device[];
  scale: number;
  onMoveDevice: (id: number, x: number, y: number) => void;
};

function MapViewer({ devices, scale, onMoveDevice }: MapViewerProps) {
  return (
    <div className="office-map">
      <div className="room room-large">Engineering</div>
      <div className="room">Conference</div>
      <div className="room">IT Closet</div>
      <div className="room">Sales</div>
      <div className="room room-wide">Open Office</div>

      {devices.map((device) => (
        <DevicePin
          key={device.id}
          device={device}
          scale={scale}
          onMoveDevice={onMoveDevice}
        />
      ))}
    </div>
  );
}

export default MapViewer;