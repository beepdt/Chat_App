
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";


export default function LiquidBlobsBackground({
  color = "#ff4911",
  speed = 32,
  blobCount = 10,
  blurAmount = 100,
  width = null,
  height = null
}) {

    
  const [dimensions, setDimensions] = useState({ width: 1000, height: 1000 });

  // Update dimensions on window resize
  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  // Generate blobs
  const generateBlobs = () => {
    const blobs = [];
    const actualBlobCount = blobCount;

    for (let i = 0; i < actualBlobCount; i++) {
      const size = Math.min(dimensions.width, dimensions.height) * (0.3 + Math.random() * 0.3);
      const x = Math.random() * dimensions.width;
      const y = Math.random() * dimensions.height;
      const blobSpeed = speed * (0.8 + Math.random() * 0.4);
      const blobOpacity = 0.2 + Math.random() * 0.3;
      const filterId = `blur-filter-${i}`;

      blobs.push(
        <g key={i}>
          <defs>
            <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation={blurAmount * (0.5 + Math.random() * 0.5)} />
            </filter>
          </defs>
          <motion.path
            d={generateBlobPath(size)}
            fill={color}
            opacity={blobOpacity}
            filter={`url(#${filterId})`}
            initial={{
              x,
              y,
              scale: 0.8 + Math.random() * 0.4,
              rotate: Math.random() * 360,
            }}
            animate={{
              x: [x, x + (Math.random() * 100 - 50), x],
              y: [y, y + (Math.random() * 100 - 50), y],
              scale: [0.8 + Math.random() * 0.4, 1 + Math.random() * 0.3, 0.8 + Math.random() * 0.4],
              rotate: [Math.random() * 360, Math.random() * 360, Math.random() * 360],
            }}
            transition={{
              duration: 100 / blobSpeed,
              repeat: Infinity,
              ease: "easeInOut",
              repeatType: "mirror",
            }}
          />
        </g>
      );
    }

    return blobs;
  };

  // Generate a random blob path
  const generateBlobPath = (size) => {
    const points = 8;
    const angleStep = (Math.PI * 2) / points;
    const radius = size / 2;

    let angle = Math.random() * Math.PI * 2;
    const startX = Math.cos(angle) * radius;
    const startY = Math.sin(angle) * radius;
    let path = `M ${startX} ${startY} `;

    for (let i = 0; i < points; i++) {
      angle += angleStep;
      const currentRadius = radius * (0.8 + Math.random() * 0.4);
      const x = Math.cos(angle) * currentRadius;
      const y = Math.sin(angle) * currentRadius;
      const cp1Angle = angle - angleStep / 2;
      const cp1Radius = radius * (0.5 + Math.random() * 1);
      const cp1x = Math.cos(cp1Angle) * cp1Radius;
      const cp1y = Math.sin(cp1Angle) * cp1Radius;

      path += `Q ${cp1x} ${cp1y}, ${x} ${y} `;
    }

    path += "Z";
    return path;
  };

  return (
    <>

      {/* Blob background */}
      <div className="fixed inset-0 w-full h-full overflow-hidden bg-[#111111] -z-10">
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
          preserveAspectRatio="none"
          className="absolute inset-0"
        >
          {/* Background gradient */}
          <defs>
            <linearGradient id="bgGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={color} stopOpacity="0.2" />
              <stop offset="100%" stopColor="#000" stopOpacity="0.5" />
            </linearGradient>
          </defs>

          {/* Background rectangle */}
          <rect width="100%" height="100%" fill="url(#bgGradient)" />

          {/* Animated blobs */}
          <g className="blobs">{generateBlobs()}</g>
        </svg>
      </div>
    </>
  );
}
