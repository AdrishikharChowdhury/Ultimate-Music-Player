import React, { Children, useState } from "react";
import { useEffect, useRef } from "react";
import { NeatGradient } from "@firecms/neat";

const Canvas = ({ children }) => {
  const config = {
    colors: [
      {
        color: "#554226",
        enabled: true,
      },
      {
        color: "#03162D",
        enabled: true,
      },
      {
        color: "#002027",
        enabled: true,
      },
      {
        color: "#020210",
        enabled: true,
      },
      {
        color: "#02152A",
        enabled: true,
      },
    ],
    speed: 2,
    horizontalPressure: 3,
    verticalPressure: 5,
    waveFrequencyX: 1,
    waveFrequencyY: 3,
    waveAmplitude: 8,
    shadows: 0,
    highlights: 2,
    colorBrightness: 1,
    colorSaturation: 6,
    wireframe: false,
    colorBlending: 7,
    backgroundColor: "#003FFF",
    backgroundAlpha: 1,
    grainScale: 2,
    grainSparsity: 0,
    grainIntensity: 0.175,
    grainSpeed: 1,
    resolution: 1,
    yOffset: 0,
  };

  const canvasRef = useRef(null);

  useEffect(() => {
    let neat;
    const ref = canvasRef;

    if (ref.current) {
      neat = new NeatGradient({
        ref: ref.current,
        ...config,
      });
    }

    return () => {
      if (neat) neat.destroy();
    };
  }, []);

  return (
    <div className="relative w-full h-screen">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      {children}
    </div>
  );
};

export default Canvas;
