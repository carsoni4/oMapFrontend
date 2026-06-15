import "./Sidebar.css";
import type { Device } from "../DevicePin/DevicePin";

type SidebarProps = {
  devices: Device[];
};

function Sidebar({ devices }: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div>
          <h2>Office Devices</h2>
          <p>Track devices by location.</p>
        </div>

        <span className="device-count">{devices.length}</span>
      </div>

      <button className="primary-button">Add Device</button>

      <div className="device-list">
        {devices.map((device) => (
          <div className="device-card" key={device.id}>
            <div
              className="device-color-dot"
              style={{ backgroundColor: device.color }}
            />

            <div className="device-info">
              <h3>{device.name}</h3>
              <p>{device.type}</p>

              <div className="device-location">
                X: {Math.round(device.x)} · Y: {Math.round(device.y)}
              </div>
            </div>

            <button className="device-card-button">View</button>
          </div>
        ))}
      </div>
    </aside>
  );
}

export default Sidebar;