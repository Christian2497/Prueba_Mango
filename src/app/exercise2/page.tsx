"use client";

import React, { useEffect, useState } from "react";
import { CustomRange } from "../../components/CustomRange/CustomRange";
import { fetchMockRangeValues2 } from "@/utils/api";

const Exercise2 = () => {
    const [rangeValues, setRangeValues] = useState<number[] | null>(null);

    // Usamos useEffect para llamar a la función asincrónica
    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchMockRangeValues2();
            setRangeValues(data.rangeValues);
        };

        fetchData();
    }, []);

    if (!rangeValues) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1 style={{ margin: '15px' }}>Fixed Values Range</h1>
            <CustomRange values={rangeValues} />
        </div>
    );
};

export default Exercise2;
