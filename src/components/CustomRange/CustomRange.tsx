"use client";

import React, { useEffect, useState, useRef } from "react";
import styles from "./CustomRange.module.css";

interface CustomRangeProps {
  values: number[];
}

export const CustomRange: React.FC<CustomRangeProps> = ({ values }) => {
  const [range, setRange] = useState<[number, number]>([values[0], values[values.length - 1]]);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const handleDrag = (index: 0 | 1, clientX: number) => {
    if (!trackRef.current) return;

    const trackRect = trackRef.current.getBoundingClientRect();
    const trackWidth = trackRect.width;

    const relativePosition = Math.min(
      Math.max(clientX - trackRect.left, 0),
      trackWidth
    );

    const stepWidth = trackWidth / (values.length - 1);
    const stepIndex = Math.round(relativePosition / stepWidth);

    const newValue = values[stepIndex];
    const newRange = [...range] as [number, number];

    if (index === 0) {
      newRange[0] = Math.min(newValue, range[1]);
    } else {
      newRange[1] = Math.max(newValue, range[0]);
    }

    setRange(newRange);
  };

  const handleMouseDown = (index: 0 | 1) => (e: React.MouseEvent) => {
    const onMouseMove = (moveEvent: MouseEvent) => {
      handleDrag(index, moveEvent.clientX);
    };

    const onMouseUp = () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  return (
    <div className={styles.container}>
      <div className={styles.track} ref={trackRef}>
        <div
          className={styles.range}
          style={{
            left: `${(values.indexOf(range[0]) / (values.length - 1)) * 100}%`,
            right: `${100 - (values.indexOf(range[1]) / (values.length - 1)) * 100}%`,
          }}
        />
        <div
          className={`${styles.handle} ${styles.handleLeft}`}
          style={{
            left: `${(values.indexOf(range[0]) / (values.length - 1)) * 100}%`,
          }}
          onMouseDown={handleMouseDown(0)}
        />
        <div
          className={`${styles.handle} ${styles.handleRight}`}
          style={{
            left: `${(values.indexOf(range[1]) / (values.length - 1)) * 100}%`,
          }}
          onMouseDown={handleMouseDown(1)}
        />
      </div>
      <div className={styles.labels}>
        {values.map((value, index) => (
          <span
            key={index}
            className={`${styles.label} ${
              value >= range[0] && value <= range[1] ? styles.labelActive : ""
            }`}
          >
            {value.toFixed(2)}€
          </span>
        ))}
      </div>
    </div>
  );
};
