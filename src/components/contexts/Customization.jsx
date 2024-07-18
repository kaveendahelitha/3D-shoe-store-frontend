import { createContext, useContext, useState } from "react";

const chairColors = [
  { color: "#683434", name: "brown", price: 100 },
  { color: "#1a5e1a", name: "green", price: 120 },
  { color: "#659994", name: "blue", price: 110 },
  { color: "#896599", name: "mauve", price: 130 },
  { color: "#ffa500", name: "orange", price: 115 },
  { color: "#59555b", name: "grey", price: 105 },
  { color: "#222222", name: "black", price: 125 },
  { color: "#ececec", name: "white", price: 140 },
];

const cushionColors = [
  { color: "#683434", name: "brown", price: 80 },
  { color: "#1a5e1a", name: "green", price: 90 },
  { color: "#659994", name: "blue", price: 85 },
  { color: "#896599", name: "mauve", price: 95 },
  { color: "#ffa500", name: "orange", price: 88 },
  { color: "#59555b", name: "grey", price: 83 },
  { color: "#222222", name: "black", price: 92 },
  { color: "#ececec", name: "white", price: 100 },
];

const materials = [
  { name: "leather", price: 300 },
  { name: "fabric", price: 200 },
];

const CustomizationContext = createContext({});

export const CustomizationProvider = (props) => {
  const [material, setMaterial] = useState(materials[0]);
  const [legs, setLegs] = useState(1);
  const [chairColor, setChairColor] = useState(chairColors[0]);
  const [cushionColor, setCushionColor] = useState(cushionColors[0]);

  const calculateTotalPrice = () => {
    return material.price + chairColor.price + cushionColor.price;
  };

  return (
    <CustomizationContext.Provider
      value={{
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
        materials, // Export materials
      }}
    >
      {props.children}
    </CustomizationContext.Provider>
  );
};

export const useCustomization = () => {
  const context = useContext(CustomizationContext);
  return context;
};
