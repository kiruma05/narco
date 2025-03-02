// src/utils/fetchODKData.ts
interface ODKItem {
    text_question_types: { Name: string };
    numerical_question_types: { animal_code: number; select_one_autocomplete: string };
    __system: { submitterName: string };
    __id: string;
  }
  
  interface ODKData {
    value: ODKItem[];
    "@odata.context": string;
  }
  
  export async function fetchODKData(): Promise<ODKData> {
    const response = await fetch("/api/odk");
    if (!response.ok) {
      throw new Error(`API route request failed: ${response.status}`);
    }
    return response.json();
  }





