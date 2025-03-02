// src/types/ODKItem.ts
export interface ODKItem {
    text_question_types?: { Name?: string };
    numerical_question_types?: { animal_code?: number; select_one_autocomplete?: string };
    __system?: { submitterName?: string };
    __id: string;
  }