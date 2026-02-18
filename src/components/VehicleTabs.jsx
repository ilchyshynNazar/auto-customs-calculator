import Button from "./UI/Button";

export default function VehicleTabs({ vehicleType, setVehicleType }) {
  const tabs = [
    { type: "car", label: "Легковий" },
    { type: "moto", label: "Мото" },
    { type: "truck", label: "Вантажний" },
    { type: "bus", label: "Автобус" },
  ];

  return (
    <div className="flex gap-4">
      {tabs.map(tab => (
        <Button
          key={tab.type}
          active={vehicleType === tab.type}
          onClick={() => setVehicleType(tab.type)}
        >
          <span>{tab.label}</span>
        </Button>
      ))}
    </div>
  );
}
