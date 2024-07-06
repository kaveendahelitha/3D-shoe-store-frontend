import React, { useRef } from 'react'
import { useGLTF, useTexture } from '@react-three/drei'
import { useCustomization } from '../../../components/contexts/Customization';

import * as THREE from "three";

const Shoe2 = (props)=> {
  const { nodes, materials } = useGLTF('/heels_shoes_steve_madden_womens.glb')
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
      <group scale={0.001}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
       
    

        <mesh
            castShadow
            receiveShadow
            geometry={nodes.Steve_Madden_ASSET_MAT_MR_0.geometry}
            material={materials.ASSET_MAT_MR}
        >
   <meshStandardMaterial {...(material==="leather"
            ? leatherTextureProps : fabricTextureProps
          )}
          color={chairColor.color}
          />

        </mesh>
        <mesh
            castShadow
            receiveShadow
            geometry={nodes.Steve_Madden_ASSET_MAT_MR_0_1.geometry}
            material={materials.ASSET_MAT_MR}
        >
             <meshStandardMaterial {...fabricTextureProps}
        
        color={cushionColor.color}/>

        </mesh>
      </group>
      </group>
    </group>
  )
}



useGLTF.preload('/heels_shoes_steve_madden_womens.glb')
export default Shoe2;