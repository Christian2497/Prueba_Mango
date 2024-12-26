export const fetchMockValues = async () => {
    return new Promise<{ min: number; max: number }>((resolve) => {
        setTimeout(() => resolve({ min: 1, max: 100 }), 1000); // Simulated API delay
    });
};

export const fetchMockRangeValues2 = async () => {
    return new Promise<{ rangeValues: number[] }>((resolve) => {
        setTimeout(() => resolve({ rangeValues: [1.99, 5.99, 10.99, 30.99, 50.99, 70.99] }), 1000); // Simulated delay
    });
};
