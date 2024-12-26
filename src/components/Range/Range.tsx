"use client";

import React, { useState, useRef } from "react";
import styles from "./Range.module.css";

interface RangeProps {
    min: number;
    max: number;
    step?: number;
    initialValues?: [number, number];
}

export const Range: React.FC<RangeProps> = ({ min, max, step = 0.1, initialValues = [min, max] }) => {
    const [values, setValues] = useState<[number, number]>(initialValues);
    const trackRef = useRef<HTMLDivElement | null>(null);

    const handleInputChange = (index: 0 | 1, value: number) => {
        const clampedValue = parseFloat(
          Math.max(min, Math.min(max, value)).toFixed(2)
        );
        const newValues = [...values] as [number, number];
    
        if (index === 0) {
          newValues[0] = Math.min(clampedValue, values[1]);
        } else {
          newValues[1] = Math.max(clampedValue, values[0]);
        }
    
        setValues(newValues);
      };

    const handleDrag = (index: 0 | 1, clientX: number) => {
        if (!trackRef.current) return;

        const trackRect = trackRef.current.getBoundingClientRect();
        const trackWidth = trackRect.width;

        // Calcula la posición relativa del cursor en porcentaje
        const relativePosition = Math.min(
            Math.max(clientX - trackRect.left, 0),
            trackWidth
        );

        // Convierte la posición relativa a un valor en el rango
        const newValue = parseFloat(((relativePosition / trackWidth) * (max - min) + min).toFixed(2));

        const newValues = [...values] as [number, number];

        if (index === 0) {
            newValues[0] = Math.min(newValue, values[1]); // No cruza al segundo handle
        } else if (index === 1) {
            newValues[1] = Math.max(newValue, values[0]); // No cruza al primer handle
        }

        setValues(newValues);
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
            <div className={styles.labels}>
                <input
                    type="number"
                    value={values[0]}
                    onChange={(e) => handleInputChange(0, parseInt(e.target.value, 10))}
                    className={styles.input}
                />
                <input
                    type="number"
                    value={values[1]}
                    onChange={(e) => handleInputChange(1, parseInt(e.target.value, 10))}
                    className={styles.input}
                />
            </div>
            <div className={styles.track} id="track" ref={trackRef}>
                <div
                    className={styles.range}
                    style={{
                        left: `${((values[0] - min) / (max - min)) * 100}%`,
                        right: `${100 - ((values[1] - min) / (max - min)) * 100}%`,
                    }}
                />
                <div
                    className={`${styles.handle} ${styles.handleLeft}`}
                    style={{ left: `${((values[0] - min) / (max - min)) * 100}%` }}
                    draggable="true"
                    onDrag={(e) => handleDrag(0, e.clientX)}
                    onMouseDown={handleMouseDown(0)}
                />
                <div
                    className={`${styles.handle} ${styles.handleRight}`}
                    style={{ left: `${((values[1] - min) / (max - min)) * 100}%` }}
                    draggable="true"
                    onDrag={(e) => handleDrag(1, e.clientX)}
                    onMouseDown={handleMouseDown(1)}
                />
            </div>
        </div>
    );
};
