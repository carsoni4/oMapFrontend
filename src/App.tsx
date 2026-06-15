import React, { useRef, useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar.tsx";
import MapHeader from "./components/MapHeader/MapHeader.tsx";
import OfficeMap from "./components/MapViewer/MapViewer.tsx";
import type { Device } from "./components/DevicePin/DevicePin.tsx";
import "./App.css";

function App() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [scrollDirection, setScrollDirection] = useState(false);

  //TODO: Replace Sample Device Data with API Call
  const [devices, setDevices] = useState<Device[]>([
  {
    id: 1,
    name: "Printer",
    type: "Printer",
    x: 450,
    y: 140,
    color: "#4e4bff",
  },
  {
    id: 2,
    name: "Router",
    type: "Network",
    x: 610,
    y: 170,
    color: "#16a34a",
  },
  {
    id: 3,
    name: "Workstation",
    type: "Computer",
    x: 250,
    y: 285,
    color: "#dc2626",
  },
  ]);

  const MAX_ZOOM = 4;
  const MIN_ZOOM = 0.5;

  const dragStart = useRef({ x: 0, y: 0 });
  const mapStart = useRef({ x: 0, y: 0 });

  function toggleScrollDirection() {
    setScrollDirection((prev) => !prev);
  }

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    setIsDragging(true);

    dragStart.current = {
      x: e.clientX,
      y: e.clientY,
    };

    mapStart.current = {
      x: position.x,
      y: position.y,
    };

    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!isDragging) return;

    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;

    setPosition({
      x: mapStart.current.x + dx,
      y: mapStart.current.y + dy,
    });
  }

  function handlePointerUp(e: React.PointerEvent<HTMLDivElement>) {
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  }

  function zoomIn() {
    setScale((prev) => Math.min(prev + 0.1, MAX_ZOOM));
  }

  function zoomOut() {
    setScale((prev) => Math.max(prev - 0.1, MIN_ZOOM));
  }

  function resetView() {
    setPosition({ x: 0, y: 0 });
    setScale(1);
  }

  function handleWheel(e: React.WheelEvent<HTMLDivElement>) {
    e.preventDefault();

    const viewport = e.currentTarget.getBoundingClientRect();

    const mouseX = e.clientX - viewport.left;
    const mouseY = e.clientY - viewport.top;

    const scrollValue = scrollDirection ? -1 : 1;

    const zoomSpeed = 0.001;
    const zoomFactor = 1 - e.deltaY * zoomSpeed * scrollValue;

    const newScale = Math.min(Math.max(scale * zoomFactor, MIN_ZOOM), MAX_ZOOM);

    const scaleRatio = newScale / scale;

    setPosition((prev) => ({
      x: mouseX - (mouseX - prev.x) * scaleRatio,
      y: mouseY - (mouseY - prev.y) * scaleRatio,
    }));

    setScale(newScale);
  }

    function moveDevice(id: number, x: number, y: number) {
    setDevices((prev) =>
      prev.map((device) =>
        device.id === id
          ? {
              ...device,
              x,
              y,
            }
          : device
      )
    );
  }

  return (
    <main className="app">
      <Sidebar devices={devices}/>

      <section className="map-section">
        <MapHeader
          scale={scale}
          onZoomIn={zoomIn}
          onZoomOut={zoomOut}
          onReset={resetView}
          toggleScroll={toggleScrollDirection}
        />

        <div
          className={`map-viewport ${isDragging ? "dragging" : ""}`}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onWheel={handleWheel}
        >
          <div
            className="map-content"
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            }}
          >
            <OfficeMap devices={devices} onMoveDevice={moveDevice} scale={scale} />
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;