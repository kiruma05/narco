"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Table from "@/components/Table";
import Loading from "@/components/Loading";
import { fetchNgombeData } from "@/lib/fetchNgombeData";
import { fetchKondooData } from "@/lib/fetchKondooData";

interface ODKItem {
  text_question_types?: { Name?: string; Name_officer?: string };
  numerical_question_types?: { animal_code?: number; select_one_autocomplete?: string; Tarehe?: string };
  __system?: { submitterName?: string };
  __id: string;
  animal_data_one?: { animal_code?: number; };
  Jinsia?: { select_one_autocomplete?: string };
  Rangi?: { select_one_autocomplete?: string };
}

const MkataRanchDetailsPage = () => {
  const [ranchData, setRanchData] = useState<ODKItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [activeTab, setActiveTab] = useState("Ngombe");

  useEffect(() => {
    async function fetchData() {
      try {
        const ngombeResult = await fetchNgombeData();
        const kondooResult = await fetchKondooData();

        if (ngombeResult && ngombeResult.value && kondooResult && kondooResult.value) {
          const combinedData = [...ngombeResult.value, ...kondooResult.value];
          const filteredData = combinedData.filter((item: ODKItem) => {
            const ranchName = item.text_question_types?.Name?.trim().toUpperCase();
            return ranchName?.includes("MKATA");
          });
          setRanchData(filteredData);
          setLoading(false);
        } else {
          setLoading(false);
          setError(new Error("Failed to fetch data."));
        }
      } catch (err: any) {
        setError(err);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <Loading />;
  if (error) return <p>Error: {error.message}</p>;

  const columns = [
    { header: "Animal Code", accessor: "animalCode" },
    { header: "Breed", accessor: "breed" },
    { header: "Gender", accessor: "gender" },
    { header: "Color", accessor: "color" },
    { header: "Submitter", accessor: "submitter" },
    { header: "Date", accessor: "date" },
  ];

  const renderRow = (data: { [key: string]: string | number | undefined }) => (
    <tr key={data.animalCode?.toString()} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight">
      <td className="p-4 w-1/6">{data.animalCode}</td>
      <td className="p-4 w-1/6">{data.breed}</td>
      <td className="p-4 w-1/6">{data.gender}</td>
      <td className="p-4 w-1/6">{data.color}</td>
      <td className="p-4 w-1/6">{data.submitter}</td>
      <td className="p-4 w-1/6">{data.date}</td>
    </tr>
  );

  const tableData = ranchData
    .filter((item) => {
      // Check if the data came from fetchKondooData
      const isKondoo = item.__id.startsWith("kondoo_"); // Assuming you can use __id.
      const isNgombe = !isKondoo; // Everything else is Ngombe.

      if (activeTab === "Ngombe") return isNgombe;
      if (activeTab === "Kondoo") return isKondoo;
      return true;
    })
    .map((item) => ({
      animalCode: item.numerical_question_types?.animal_code,
      breed: item.numerical_question_types?.select_one_autocomplete,
      gender: item.Jinsia?.select_one_autocomplete,
      color: item.Rangi?.select_one_autocomplete,
      submitter: item.__system?.submitterName,
      date: item.numerical_question_types?.Tarehe,
    }));

  return (
    <div className="p-5 m-5">
      <h1 className="text-center">MKATA Ranch Details</h1>
      <Link href="/list/ranch">Back to Ranch List</Link>

      <div className="flex justify-center mt-4">
        <button
          className={`px-4 py-2 rounded ${activeTab === "Ngombe" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setActiveTab("Ngombe")}
        >
          Ngombe
        </button>
        <button
          className={`px-4 py-2 rounded ml-2 ${activeTab === "Kondoo" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setActiveTab("Kondoo")}
        >
          Kondoo
        </button>
      </div>

      <div className="overflow-x-auto mt-4">
        <table className="w-full">
          <thead className="sticky top-0 bg-white">
            <tr className="text-left text-gray-500 text-sm">
              {columns.map((col) => (
                <th key={col.accessor} className="p-4">
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="max-h-96 overflow-y-auto">
            {tableData.map((item, index) => renderRow(item))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MkataRanchDetailsPage;