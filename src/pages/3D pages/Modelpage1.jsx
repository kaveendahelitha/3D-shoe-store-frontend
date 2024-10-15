// Modelpage.js
import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import Experience from "./com/Experience1";
import Configurator from "./com/Configurator";
import { CustomizationProvider } from "../../components/contexts/Customization";
import * as THREE from 'three'; // Import THREE for Vector2

const Modelpage = () => {
  const rendererRef = useRef(null); // Reference to store the renderer
  const cameraRef = useRef(null); // Reference to store the camera
  const sceneRef = useRef(null); // Reference to store the scene

  // Function to handle the download of the canvas image
  const handleDownload = () => {
    const widthInput = 1280; // Use numerical values
    const heightInput = 1280;

    if (rendererRef.current && cameraRef.current && sceneRef.current) {
      const renderer = rendererRef.current;
      const camera = cameraRef.current;
      const scene = sceneRef.current;

      // Save original settings
      const originalAspect = camera.aspect;
      const originalSize = new THREE.Vector2();
      renderer.getSize(originalSize);

      // Set new size for screenshot
      camera.aspect = widthInput / heightInput;
      camera.updateProjectionMatrix();
      renderer.setSize(widthInput, heightInput, false);

      // Render the scene with new settings
      renderer.render(scene, camera);

      // Get the data URL of the rendered image
      const image = renderer.domElement.toDataURL('image/png');

      // Restore original settings
      camera.aspect = originalAspect;
      camera.updateProjectionMatrix();
      renderer.setSize(originalSize.width, originalSize.height, false);
      renderer.render(scene, camera); // Re-render the original scene

      // Create a download link and trigger the download
      const a = document.createElement('a');
      a.setAttribute('download', 'screenshot.png');
      a.setAttribute('href', image);
      a.click();
    } else {
      console.error("Renderer, camera, or scene is not available.");
    }
  };

  return (
    <>
      <CustomizationProvider>
        <Canvas
          onCreated={({ gl, camera, scene }) => {
            rendererRef.current = gl; // Store the renderer reference
            cameraRef.current = camera; // Store the camera reference
            sceneRef.current = scene; // Store the scene reference
          }}
          className="container mt-20"
          style={{
            position: "absolute",
            left: 0,
            width: "100%",
            height: "90%",
          }}
        >
          <fog attach="fog" args={["#e8eaf2", 10, 20]} />
          <color attach="background" args={["#e8eaf2"]} />
          
          <Experience />
        </Canvas>

        <Configurator />

        {/* Download button */}
        <div className="fixed left-10 bottom-[70vh]">
          <button
            onClick={handleDownload}
            type="button"
            className="px-5 py-2.5 flex items-center justify-center rounded text-white text-sm tracking-wider font-medium bg-gray-400 hover:bg-blue-700 active:bg-blue-600"
          >
            Download
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16px"
              fill="currentColor"
              className="ml-2 inline"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 16a.749.749 0 0 1-.542-.232l-5.25-5.5A.75.75 0 0 1 6.75 9H9.5V3.25c0-.689.561-1.25 1.25-1.25h2.5c.689 0 1.25.561 1.25 1.25V9h2.75a.75.75 0 0 1 .542 1.268l-5.25 5.5A.749.749 0 0 1 12 16zm10.25 6H1.75C.785 22 0 21.215 0 20.25v-.5C0 18.785.785 18 1.75 18h20.5c.965 0 1.75.785 1.75 1.75v.5c0 .965-.785 1.75-1.75 1.75z"
                data-original="#000000"
              />
            </svg>
          </button>
        </div>
      </CustomizationProvider>
    </>
  );
};

export default Modelpage;
