// src/components/AnimalDetailsTable.tsx
"use client";
import React from "react";

interface AnimalRecord {
  text_question_types: { Name: string; Name_officer: string };
  numerical_question_types: {
    animal_code: number;
    select_one_autocomplete: string;
    Tarehe: string | null;
  };
  Jinsia: { select_one_autocomplete: string | null };
  Rangi: { select_one_autocomplete: string | null };
  // ... other properties
}

interface AnimalDetailsTableProps {
  animals: AnimalRecord[];
}

const AnimalDetailsTable: React.FC<AnimalDetailsTableProps> = ({ animals }) => {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr>
          <th className="border p-2">Ranch</th>
          <th className="border p-2">Animal Code</th>
          <th className="border p-2">Type</th>
          <th className="border p-2">Gender</th>
          <th className="border p-2">Color</th>
          <th className="border p-2">Date</th>
          {/* Add other headers as needed */}
        </tr>
      </thead>
      <tbody>
        {animals.map((animal, index) => (
          <tr key={index}>
            <td className="border p-2">{animal.text_question_types.Name}</td>
            <td className="border p-2">
              {animal.numerical_question_types.animal_code}
            </td>
            <td className="border p-2">
              {animal.numerical_question_types.select_one_autocomplete}
            </td>
            <td className="border p-2">{animal.Jinsia.select_one_autocomplete}</td>
            <td className="border p-2">{animal.Rangi.select_one_autocomplete}</td>
            <td className="border p-2">{animal.numerical_question_types.Tarehe}</td>
            {/* Add other data cells as needed */}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AnimalDetailsTable;