"use client"
import { useState, useEffect } from 'react';

interface RotationConfig {
  maxRotation?: number;
  minRotation?: number;
  rotationSpeed?: number;
  intervalSpeed?: number;
}

export const useRotationAnimation = ({
  maxRotation = 40,
  minRotation = -90,
  rotationSpeed = 2,
  intervalSpeed = 50,
}: RotationConfig = {}) => {
  const [rotation, setRotation] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prevRotation) => {
        const newRotation = prevRotation + (rotationSpeed * direction);
        
        // Change direction when reaching max or min
        if (newRotation >= maxRotation) {
          setDirection(-1);
          return maxRotation;
        }
        if (newRotation <= minRotation) {
          setDirection(1);
          return minRotation;
        }
        
        return newRotation;
      });
    }, intervalSpeed);

    return () => clearInterval(interval);
  }, [direction, maxRotation, minRotation, rotationSpeed, intervalSpeed]);

  return rotation;
};
