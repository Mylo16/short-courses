import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

const CircleProgressBar = ({ percentage }) => {
  const [isVisible, setIsVisible] = useState(false);
  const controls = useAnimation();

  const circleRadius = 25; // Radius of the circle
  const circleCircumference = 2 * Math.PI * circleRadius;
  const progressOffset = circleCircumference - (percentage / 100) * circleCircumference;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          controls.start({ value: percentage });
        }
      },
      { threshold: 0.5 }
    );

    const element = document.getElementById("circle-progress-bar");
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [controls, percentage]);

  return (
    <div
      id="circle-progress-bar"
      className="relative w-32 h-32 flex items-center justify-center mx-auto"
    >
      {/* Circle Background */}
      <svg className="absolute top-0 left-0" width="60" height="60">
        <circle
          cx="28"
          cy="28"
          r={circleRadius}
          stroke="#e0e0e0"
          strokeWidth="3"
          fill="none"
        />
        {/* Animated Circle Progress */}
        <motion.circle
          cx="32"
          cy="28"
          r={circleRadius}
          stroke="#4caf50"
          strokeWidth="3"
          fill="none"
          strokeDasharray={circleCircumference}
          strokeDashoffset={isVisible ? progressOffset : circleCircumference}
          initial={{ strokeDashoffset: circleCircumference }}
          animate={{ strokeDashoffset: isVisible ? progressOffset : circleCircumference }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          strokeLinecap="round"
          style={{
            transform: "rotate(-90deg)", // Rotate to start from top
            transformOrigin: "center", // Rotate around the center
          }}
        />
      </svg>

      {/* Percentage in the middle */}
      <motion.div
        className="text absolute text-2xl font-bold text-gray-800"
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
      >
        <motion.span
          initial={{ count: 0 }}
          animate={{ count: isVisible ? percentage : 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          {Math.round(isVisible ? percentage : 0)}
        </motion.span>
        %
      </motion.div>
    </div>
  );
};

export default CircleProgressBar;
