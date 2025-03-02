import axios from "axios";

export async function fetchKondooData(managerId?: string) {
  try {
    const response = await axios.get("/api/kondoo");
    return response.data;
  } catch (error) {
    console.error("Error fetching Kondoo data:", error);
    throw error;
  }
}
