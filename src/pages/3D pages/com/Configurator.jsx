import React from 'react'
import { useCustomization } from '../../../components/contexts/Customization'
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
  } = useCustomization()

  return (
    <div className="fixed right-6 w-80 bottom-[10vh] text-white bg-gray-800 p-4 rounded-lg shadow-lg mt-20">
    <div className="configurator__section">
        <div className="configurator__section__title uppercase font-bold font-poppins text-white">
        shoe color
        </div>
      <div className="configurator__section__values flex flex-row gap-8 items-center flex-wrap py-4">
           <div className={`item ${material === "leather" ? "item--active" : ""} flex flex-col items-center transition-all duration-400`} onClick={() => setMaterial("leather")}>
              <div className={`item__label text-center font-bold text-xs text-gray-400 capitalize ${material === "leather" ? "text-white" : ""}`}>Leather</div>
           </div>
           <div className={`item ${material === "fabric" ? "item--active" : ""} flex flex-col items-center transition-all duration-400`} onClick={() => setMaterial("fabric")}>
             <div className={`item__label text-center font-bold text-xs text-gray-400 capitalize ${material === "fabric" ? "text-white" : ""}`}>Fabric</div>
           </div>
      </div>
    </div>


    <div className="configurator__section">
         <div className="configurator__section__title uppercase font-bold font-poppins text-white">Parts color</div>
         <div className="configurator__section__values flex flex-row gap-8 items-center flex-wrap py-4">
           {chairColors.map((item, index) => (
             <div
               key={index}
               className={`item ${item.color === chairColor.color ? "item--active" : ""} flex flex-col items-center transition-all duration-400`}
               onClick={() => setChairColor(item)}
             >
               <div
                 className={`item__dot w-8 h-8 rounded-full border-2 ${item.color === chairColor.color ? "border-white" : "border-gray-600"}`}
                 style={{ backgroundColor: item.color }}
               />
               <div className={`item__label text-center font-bold text-xs text-gray-400 capitalize ${item.color === chairColor.color ? "text-white" : ""}`}>{item.name}</div>
             </div>
           ))}
         </div>
     </div>

     <div className="configurator__section">
        <div className="configurator__section__title uppercase font-bold font-poppins text-white">Parts color</div>
        <div className="configurator__section__values flex flex-row gap-8 items-center flex-wrap py-4">
          {cushionColors.map((item, index) => (
            <div
              key={index}
              className={`item ${item.color === cushionColor.color ? "item--active" : ""} flex flex-col items-center transition-all duration-400`}
              onClick={() => setCushionColor(item)}
            >
              <div
                className={`item__dot w-8 h-8 rounded-full border-2 ${item.color === cushionColor.color ? "border-white" : "border-gray-600"}`}
                style={{ backgroundColor: item.color }}
              />
              <div className={`item__label text-center font-bold text-xs text-gray-400 capitalize ${item.color === cushionColor.color ? "text-white" : ""}`}>{item.name}</div>
            </div>
          ))}
        </div>
     </div>





    <div className="configurator__section">
         <div className="configurator__section__title uppercase font-bold font-poppins text-white">
           Legs
         </div>
         <div className="configurator__section__values flex flex-row gap-8 items-center flex-wrap py-4">
           <div
             className={`item ${legs === 1 ? "item--active" : ""} flex flex-col items-center transition-all duration-400`}
             onClick={() => setLegs(1)}
           >
             <div className={`item__label text-center font-bold text-xs text-gray-400 capitalize ${legs === 1 ? "text-white" : ""}`}>Design</div>
           </div>
           <div
             className={`item ${legs === 2 ? "item--active" : ""} flex flex-col items-center transition-all duration-400`}
             onClick={() => setLegs(2)}
           >
             <div className={`item__label text-center font-bold text-xs text-gray-400 capitalize ${legs === 2 ? "text-white" : ""}`}>Classic</div>
           </div>
         </div>
     </div>

    
 </div>
  )
}


export default Configurator;
