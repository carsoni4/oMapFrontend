import { useRef, useState } from "react";
import "./DevicePin.css";

export type Device = {
  id: number;
  name: string;
  type: string;
  x: number;
  y: number;
  color: string;
};

type DevicePinProps = {
  device: Device;
  scale: number;
  onMoveDevice: (id: number, x: number, y: number) => void;
};

function DevicePin({ device, scale, onMoveDevice }: DevicePinProps) {
  const [isDragging, setIsDragging] = useState(false);

  const dragStart = useRef({ x: 0, y: 0 });
  const deviceStart = useRef({ x: 0, y: 0 });

  function handlePointerDown(e: React.PointerEvent<HTMLButtonElement>) {
    e.stopPropagation();

    setIsDragging(true);

    dragStart.current = {
      x: e.clientX,
      y: e.clientY,
    };

    deviceStart.current = {
      x: device.x,
      y: device.y,
    };

    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function handlePointerMove(e: React.PointerEvent<HTMLButtonElement>) {
    if (!isDragging) return;

    e.stopPropagation();

    const dx = (e.clientX - dragStart.current.x) / scale;
    const dy = (e.clientY - dragStart.current.y) / scale;

    onMoveDevice(
      device.id,
      deviceStart.current.x + dx,
      deviceStart.current.y + dy
    );
  }

  function handlePointerUp(e: React.PointerEvent<HTMLButtonElement>) {
    e.stopPropagation();

    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  }

  return (
    <button
      className={`device-pin ${isDragging ? "dragging" : ""}`}
      title={`${device.name} - ${device.type}`}
      style={{
        left: `${device.x}px`,
        top: `${device.y}px`,
        backgroundColor: device.color,
        borderColor: device.color,
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {device.name.charAt(0).toUpperCase()}
    </button>
  );
}

export default DevicePin;