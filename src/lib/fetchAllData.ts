// lib/fetchAllData.ts
import { fetchNgombeData } from "./fetchNgombeData";
import { fetchKondooData } from "./fetchKondooData";

export async function fetchAllData(ranchName: string) {
  try {
    const [ngombe, kondoo] = await Promise.all([
      fetchNgombeData(ranchName), // Pass ranchName
      fetchKondooData(ranchName), // Pass ranchName
    ]);

    // Ensure ngombe and kondoo have values and .value exists
    const combined = [
      ...(ngombe && ngombe.value ? ngombe.value : []),
      ...(kondoo && kondoo.value ? kondoo.value : []),
    ];

    console.log("Combined Data:", combined);

    return combined;
  } catch (error) {
    console.error("Error fetching all data:", error);
    throw error;
  }
}
export {fetchKondooData, fetchNgombeData};