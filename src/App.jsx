import { useState } from "react";
import Layout from "./components/Layout";
import VehicleTabs from "./components/VehicleTabs";
import CarForm from "./components/form/CarForm";
import MotoForm from "./components/form/MotoForm";
import TruckForm from "./components/form/TruckForm";
import BusForm from "./components/form/BusForm";
import ResultPanel from "./components/UI/ResultPanel";

console.log("App component loaded");

export default function App() {
  const [vehicleType, setVehicleType] = useState("car");
  const [calculationResult, setCalculationResult] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleFormSubmit = (formData) => {
    setIsCalculating(true);
    setTimeout(() => {
      setCalculationResult({
        vehicleType,
        formData,
        timestamp: new Date().toISOString(),
      });
      setIsCalculating(false);
    }, 500);
  };

  const resetResult = () => {
    setCalculationResult(null);
  };

  const renderForm = () => {
    switch (vehicleType) {
      case "car": return <CarForm onSubmit={handleFormSubmit} />;
      case "moto": return <MotoForm onSubmit={handleFormSubmit} />;
      case "truck": return <TruckForm onSubmit={handleFormSubmit} />;
      case "bus": return <BusForm onSubmit={handleFormSubmit} />;
      default: return <CarForm onSubmit={handleFormSubmit} />;
    }
  };

  return (
    <Layout>
      <VehicleTabs vehicleType={vehicleType} setVehicleType={setVehicleType} />
      <div className="mt-6 grid grid-cols-2 gap-6">
        {renderForm()}
        <ResultPanel 
          result={calculationResult} 
          isLoading={isCalculating}
          vehicleType={vehicleType}
        />
      </div>
    </Layout>
  );
}
