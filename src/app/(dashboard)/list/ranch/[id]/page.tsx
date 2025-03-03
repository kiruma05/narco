"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Table from "@/components/Table";
import Loading from "@/components/Loading";
import { fetchNgombeData } from "@/lib/fetchNgombeData";
import { fetchKondooData } from "@/lib/fetchKondooData";

interface ODKItem {
  text_question_types?: { Name?: string; Name_officer?: string };
  numerical_question_types?: { animal_code?: number; select_one_autocomplete?: string; Tarehe?: string; };
  __system?: { submitterName?: string };
  __id: string;
  animal_data_one?: { animal_code?: number; };
  Jinsia?: { select_one_autocomplete?: string };
  Rangi?: { select_one_autocomplete?: string };
}

const RanchDetailsPage = () => {
  const { id } = useParams();
  const [ranchData, setRanchData] = useState<ODKItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const ngombeResult = await fetchNgombeData();
        const kondooResult = await fetchKondooData();

        if (ngombeResult && ngombeResult.value && kondooResult && kondooResult.value) {
          const combinedData = [...ngombeResult.value, ...kondooResult.value];
          const filteredData = combinedData.filter((item: ODKItem) => {
            const ranchName = item.text_question_types?.Name?.trim().toUpperCase();
            if (id === "RUVU") {
              return ranchName?.includes("RUVU");
            } else if (id === "MKATA") {
              return ranchName?.includes("MKATA");
            }
            return false;
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
  }, [id]);

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
      <td className="p-4">{data.animalCode}</td>
      <td className="p-4">{data.breed}</td>
      <td className="p-4">{data.gender}</td>
      <td className="p-4">{data.color}</td>
      <td className="p-4">{data.submitter}</td>
      <td className="p-4">{data.date}</td>
    </tr>
  );

  const tableData = ranchData.map((item) => ({
    animalCode: item.numerical_question_types?.animal_code,
    breed: item.numerical_question_types?.select_one_autocomplete,
    gender: item.Jinsia?.select_one_autocomplete,
    color: item.Rangi?.select_one_autocomplete,
    submitter: item.__system?.submitterName,
    date: item.numerical_question_types?.Tarehe,
  }));

  return (
    <div className="p-5 m-5">
      <h1>{id} Details</h1>
      <Link href="/list/ranch">Back to Ranch List</Link>
      <Table columns={columns} renderRow={renderRow} data={tableData} />
    </div>
  );
}
  export default RanchDetailsPage;