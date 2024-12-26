import React from "react";
import { Range } from "@/components/Range/Range";
import { fetchMockValues } from "@/utils/api";

const Exercise1 = async () => {
  const { min, max } = await fetchMockValues();

  return (
    <div>
      <h1 style={{ margin: '15px'}}>Normal Range</h1>
      <Range min={min} max={max} step={0.1} initialValues={[min, max]} />
    </div>
  );
};

export default Exercise1;
