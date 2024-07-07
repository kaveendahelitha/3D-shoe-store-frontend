import React from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import Experience2 from './com/Experience2'
import Configurator from './com/Configurator'
import { CustomizationProvider } from '../../components/contexts/Customization'

const Modelpage = () => {
  return (
    <>
    <CustomizationProvider>
    <Canvas className='container mt-20 ' style={{ position: 'absolute',  left: 0, width: '100%', height: '90%' }}>
        <fog attach="fog" args={["#e8eaf2", 10, 20]} />
        <color attach="background" args={["#e8eaf2"]} />

      <Experience2/>

    </Canvas>
    <Configurator/>
    </CustomizationProvider>
    </>
    
  )
}

export default Modelpage