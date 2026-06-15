import "./MapHeader.css";

type MapHeaderProps = {
  scale: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
  toggleScroll: () => void;
};

function MapHeader({ scale, onZoomIn, onZoomOut, onReset, toggleScroll }: MapHeaderProps) {
  return (
    <header className="map-header">
      <div>
        <h1>Office Map</h1>
        <p>Drag the map around. Zoom with the buttons.</p>
      </div>

      <div className="map-controls">
        <button onClick={onZoomOut}>−</button>
        <span>{Math.round(scale * 100)}%</span>
        <button onClick={onZoomIn}>+</button>
        <button onClick={onReset}>Reset</button>
        <button onClick={toggleScroll}>Toggle Scroll Direction</button>
        <button></button>
      </div>
    </header>
  );
}

export default MapHeader;