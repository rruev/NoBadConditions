import { openMeteoProvider } from "../providers";

export const getConditions = async (lat, lon) => {
    const result = await openMeteoProvider.getConditions(lat, lon);
    return result;
};