"use client";

import * as React from "react";
import { Range } from "react-range";

const mockApi = async () => {
    // Simulate fetching data from an API
    return { min: 1, max: 100 };
};

export const Exercise1 = () => {
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(100);
    const [values, setValues] = useState([25, 75]);

    useEffect(() => {
        // Fetch min and max values from mock API
        const fetchData = async () => {
            const data = await mockApi();
            setMin(data.min);
            setMax(data.max);
            setValues([data.min, data.max]);
        };

        fetchData();
    }, []);

    const handleInputChange = (index, newValue) => {
        if (newValue >= min && newValue <= max) {
            const newValues = [...values];
            newValues[index] = Math.max(min, Math.min(max, newValue));
            setValues(newValues);
        }
    };

    const handleDrag = (index, newPosition) => {
        const newValues = [...values];
        newValues[index] = Math.max(
            min,
            Math.min(max, newPosition < min ? min : newPosition)
        );
        if (index === 0 && newValues[0] > values[1]) {
            newValues[0] = values[1];
        }
        if (index === 1 && newValues[1] < values[0]) {
            newValues[1] = values[0];
        }
        setValues(newValues);
    };

    return (
        <div className="range-container">
          <div className="range-labels">
            <input
              type="number"
              value={values[0]}
              onChange={(e) => handleInputChange(0, +e.target.value)}
            />
            <span> - </span>
            <input
              type="number"
              value={values[1]}
              onChange={(e) => handleInputChange(1, +e.target.value)}
            />
          </div>
          <div className="range-line">
            <div className="range-track" />
            <div
              className="range-handle"
              style={{
                left: `${((values[0] - min) / (max - min)) * 100}%`,
              }}
              draggable="true"
              onDrag={(e) => handleDrag(0, (e.clientX / window.innerWidth) * max)}
            />
            <div
              className="range-handle"
              style={{
                left: `${((values[1] - min) / (max - min)) * 100}%`,
              }}
              draggable="true"
              onDrag={(e) => handleDrag(1, (e.clientX / window.innerWidth) * max)}
            />
          </div>
        </div>
      );
};
