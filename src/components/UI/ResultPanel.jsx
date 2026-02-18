import { useEffect, useState } from "react";
import SidebarLinks from "./SidebarLinks";
import calculateCustoms from "../../utils/calculateCustoms";

export default function ResultPanel({ result, isLoading, vehicleType }) {
  const [customsData, setCustomsData] = useState(null);

  useEffect(() => {
    if (result && result.formData) {
      const customs = calculateCustoms(vehicleType, result.formData);
      setCustomsData(customs);
    }
  }, [result, vehicleType]);

  return (
    <div className="bg-gray-700 rounded-xl p-4 space-y-2">
      <h3 className="font-semibold text-lg mb-2">Тип податку</h3>
      
      {isLoading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin">⏳</div>
          <p className="text-sm text-gray-300 mt-2">Розраховуємо...</p>
        </div>
      )}

      {!result && !isLoading && (
        <div className="text-center py-8 text-gray-400">
          <p className="text-sm">Виберіть параметри та натисніть</p>
          <p className="text-sm">"Розрахувати"</p>
        </div>
      )}

      {customsData && !isLoading && (
        <>
          <div className="flex justify-between">
            <span>Ввізне мито</span>
            <span>{customsData.importDuty} €</span>
          </div>
          <div className="flex justify-between">
            <span>Акцизне мито</span>
            <span>{customsData.exciseTax} €</span>
          </div>
          <div className="flex justify-between">
            <span>ПДВ</span>
            <span>{customsData.vat} €</span>
          </div>
          <div className="flex justify-between font-bold text-green-500 border-t border-gray-600 pt-2 mt-2">
            <span>Вартість авто із розмитненням</span>
            <span>{customsData.totalCost} €</span>
          </div>
          
          {customsData.details && (
            <div className="mt-4 pt-4 border-t border-gray-600 text-xs text-gray-400 space-y-1">
              {customsData.details.adjustedPrice && (
                <div>Коригована вартість: {customsData.details.adjustedPrice} €</div>
              )}
              {customsData.details.exciseRate && (
                <div>Ставка акцизу: {customsData.details.exciseRate}%</div>
              )}
            </div>
          )}
        </>
      )}

      <SidebarLinks />
    </div>
  );
}