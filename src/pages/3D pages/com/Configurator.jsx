import React, { useEffect, useState } from 'react';
import { useCustomization } from '../../../components/contexts/Customization';

const Configurator = () => {
  const {
    material,
    setMaterial,
    legs,
    setLegs,
    chairColors,
    chairColor,
    setChairColor,
    cushionColors,
    cushionColor,
    setCushionColor,
    calculateTotalPrice,
    materials, // Import materials from context
  } = useCustomization();

  const [totalPrice, setTotalPrice] = useState(calculateTotalPrice());

  useEffect(() => {
    setTotalPrice(calculateTotalPrice());
  }, [material, chairColor, cushionColor]);

  return (
    <div className="fixed right-6 w-80 bottom-[1vh] text-white bg-gray-700 p-4 rounded-lg shadow-lg mt-20 overflow-y-auto">
      <div className="configurator__section">
        <div className="configurator__section__title uppercase font-bold font-poppins text-white">Price</div>
        <div className="configurator__section__values flex flex-row gap-8 items-center flex-wrap py-4">
          Rs. {totalPrice}
        </div>
      </div>

      <div className="configurator__section">
        <div className="configurator__section__title uppercase font-bold font-poppins text-white">Material</div>
        <div className="configurator__section__values flex flex-row gap-8 items-center flex-wrap py-4">
          <div
            className={`item ${material.name === "leather" ? "item--active" : ""} flex flex-col items-center transition-all duration-400`}
            onClick={() => setMaterial(materials[0])}
          >
            <div className={`item__label text-center font-bold text-xs text-gray-400 capitalize ${material.name === "leather" ? "text-white" : ""}`}>
              Leather
            </div>
          </div>
          <div
            className={`item ${material.name === "fabric" ? "item--active" : ""} flex flex-col items-center transition-all duration-400`}
            onClick={() => setMaterial(materials[1])}
          >
            <div className={`item__label text-center font-bold text-xs text-gray-400 capitalize ${material.name === "fabric" ? "text-white" : ""}`}>
              Fabric
            </div>
          </div>
        </div>
      </div>

      <div className="configurator__section">
        <div className="configurator__section__title uppercase font-bold font-poppins text-white">Shoe Color</div>
        <div className="configurator__section__values flex flex-row gap-8 items-center flex-wrap py-4">
          {chairColors.map((item, index) => (
            <div
              key={index}
              className={`item ${item.color === chairColor.color ? "item--active" : ""} flex flex-col items-center transition-all duration-400`}
              onClick={() => setChairColor(item)}
            >
              <div className={`item__dot w-8 h-8 rounded-full border-2 ${item.color === chairColor.color ? "border-white" : "border-gray-600"}`} style={{ backgroundColor: item.color }} />
              <div className={`item__label text-center font-bold text-xs text-gray-400 capitalize ${item.color === chairColor.color ? "text-white" : ""}`}>{item.name}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="configurator__section">
        <div className="configurator__section__title uppercase font-bold font-poppins text-white">Cushion Color</div>
        <div className="configurator__section__values flex flex-row gap-8 items-center flex-wrap py-4">
          {cushionColors.map((item, index) => (
            <div
              key={index}
              className={`item ${item.color === cushionColor.color ? "item--active" : ""} flex flex-col items-center transition-all duration-400`}
              onClick={() => setCushionColor(item)}
            >
              <div className={`item__dot w-8 h-8 rounded-full border-2 ${item.color === cushionColor.color ? "border-white" : "border-gray-600"}`} style={{ backgroundColor: item.color }} />
              <div className={`item__label text-center font-bold text-xs text-gray-400 capitalize ${item.color === cushionColor.color ? "text-white" : ""}`}>{item.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Configurator;
