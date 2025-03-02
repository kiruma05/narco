import axios from "axios";

interface NgombeItem {
  text_question_types: { Name: string; Name_officer?: string };
  numerical_question_types: { animal_code: number; select_one_autocomplete: string };
  __system: { submitterName: string };
  __id: string;
}

interface NgombeData {
  value: NgombeItem[];
  "@odata.context": string;
}

export async function fetchNgombeData(managerId?: string): Promise<NgombeData> {
  try {
    const response = await axios.get("/api/ngombe");
    return response.data;
  } catch (error) {
    console.error("Error fetching Ng'ombe data:", error);
    throw error;
  }
}
