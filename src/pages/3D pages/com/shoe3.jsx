import React, { useRef } from 'react'
import { useGLTF, useTexture } from '@react-three/drei'
import { useCustomization } from '../../../components/contexts/Customization';

import * as THREE from "three";

const Shoe3 = (props)=> {
  const { nodes, materials } = useGLTF('/warrior_sneaker.glb')
  const { material, legs, chairColor, cushionColor } = useCustomization();


  const leatherTextureProps = useTexture({
    //map: "./textures/leather/Leather_008_Base Color.jpg",
    normalMap: "./textures/leather/Leather_008_Normal.jpg",
    roughnessMap: "./textures/leather/Leather_008_Roughness.jpg",
    aoMap: "./textures/leather/Leather_008_Ambient Occlusion.jpg",
  });

  const fabricTextureProps = useTexture({
    //map: "./textures/fabric/Fabric_Knitted_006_basecolor.jpg",
    normalMap: "./textures/fabric/Fabric_Knitted_006_normal.jpg",
    roughnessMap: "./textures/fabric/Fabric_Knitted_006_roughness.jpg",
    aoMap: "./textures/fabric/Fabric_Knitted_006_ambientOcclusion.jpg",
  })





  //eatherTextureProps.map.repeat.set(3, 3);
  leatherTextureProps.normalMap.repeat.set(3, 3);
  leatherTextureProps.roughnessMap.repeat.set(3, 3);
  leatherTextureProps.aoMap.repeat.set(3, 3);


  //leatherTextureProps.map.wrapS = leatherTextureProps.map.wrapT =
    //THREE.MirroredRepeatWrapping;
  leatherTextureProps.normalMap.wrapS = leatherTextureProps.normalMap.wrapT =
    THREE.MirroredRepeatWrapping;
  leatherTextureProps.roughnessMap.wrapS =
    leatherTextureProps.roughnessMap.wrapT = THREE.MirroredRepeatWrapping;
  leatherTextureProps.aoMap.wrapS = leatherTextureProps.aoMap.wrapT =
    THREE.RepeatWrapping;


   // fabricTextureProps.map.repeat.set(3, 3);
    fabricTextureProps.normalMap.repeat.set(3, 3);
    fabricTextureProps.roughnessMap.repeat.set(3, 3);
    fabricTextureProps.aoMap.repeat.set(3, 3);

   // fabricTextureProps.map.wrapS = fabricTextureProps.map.wrapT =
      //THREE.RepeatWrapping;
    fabricTextureProps.normalMap.wrapS = fabricTextureProps.normalMap.wrapT =
      THREE.RepeatWrapping;
    fabricTextureProps.roughnessMap.wrapS =
      fabricTextureProps.roughnessMap.wrapT = THREE.RepeatWrapping;
    fabricTextureProps.aoMap.wrapS = fabricTextureProps.aoMap.wrapT =
      THREE.RepeatWrapping;

  return (
    <group {...props} dispose={null}>
      <group name="PurpelShoe_1" rotation={[0, 1.499, 0]}>
        <mesh name="Object_4" geometry={nodes.Object_4.geometry} material={materials.Purpleshoe} >
        <meshStandardMaterial {...(material==="leather"
            ? leatherTextureProps : fabricTextureProps
          )}
          color={chairColor.color}
          />

        </mesh>
        <mesh
          name="Object_6"
          geometry={nodes.Object_6.geometry}
          material={materials.LacesFlatMaterial}
          position={[0.152, -0.087, -0.346]}
          rotation={[-Math.PI, 0.045, -Math.PI]}
        >
            <meshStandardMaterial {...fabricTextureProps}
        
        color={cushionColor.color}/>

        </mesh>
      </group>

    </group>
  )
}



useGLTF.preload('/warrior_sneaker.glb')
export default Shoe3;