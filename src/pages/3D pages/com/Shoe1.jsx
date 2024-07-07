import React, { useRef } from 'react'
import { useGLTF, useTexture } from '@react-three/drei'
import { useCustomization } from '../../../components/contexts/Customization';

import * as THREE from "three";

const Shoe1 = (props)=> {
  const { nodes, materials } = useGLTF('/Poimandres.gltf')
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
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh geometry={nodes.Object_2.geometry}>
          <meshStandardMaterial {...(material==="leather"
            ? leatherTextureProps : fabricTextureProps
          )}
          color={chairColor.color}
          />
        </mesh>
        <mesh geometry={nodes.Object_3.geometry} material={materials['Shoes_-_Metal']} />
        <mesh geometry={nodes.Object_4.geometry} material={materials['Shoes_-_Plastic']} />
        <mesh geometry={nodes.Object_5.geometry} material={materials['Shoes_-_Sole']}  visible={legs === 1}/>
        <mesh geometry={nodes.Object_6.geometry} material={materials['Shoes_-_Velvet']}  visible={legs === 1}>

        <meshStandardMaterial {...fabricTextureProps}
        
        color={cushionColor.color}/>
        </mesh>
      </group>
    </group>
  )
}



useGLTF.preload('/Poimandres.gltf')
export default Shoe1;