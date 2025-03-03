"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Table from "@/components/Table";
import Loading from "@/components/Loading";
import { fetchNgombeData } from "@/lib/fetchNgombeData";
import { fetchKondooData } from "@/lib/fetchKondooData";

interface ODKItem {
  text_question_types?: { Name?: string; Name_officer?: string };
  numerical_question_types?: { animal_code?: number; select_one_autocomplete?: string };
  __system?: { submitterName?: string };
  __id: string;
  animal_data_one?: { animal_code?: number; };
  Jinsia?: { select_one_autocomplete?: string };
  Rangi?: { select_one_autocomplete?: string };
}

const RanchListPage = () => {
  const [ranchList, setRanchList] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const ngombeResult = await fetchNgombeData();
        const kondooResult = await fetchKondooData();

        if (ngombeResult && ngombeResult.value && kondooResult && kondooResult.value) {
          const ranches = new Set<string>();
          [...ngombeResult.value, ...kondooResult.value].forEach((item: ODKItem) => {
            if (item.text_question_types?.Name) {
              const ranchName = item.text_question_types.Name.trim().toUpperCase();
              if (ranchName.includes("RUVU")) {
                ranches.add("RUVU");
              } else if (ranchName.includes("MKATA")) {
                ranches.add("MKATA");
              }
            }
          });
          setRanchList(Array.from(ranches));
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
    { header: "Ranch Name", accessor: "name" },
    { header: "Actions", accessor: "actions" },
  ];

  const renderRow = (ranch: string) => (
    <tr key={ranch} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight">
      <td className="p-4">{ranch}</td>
      <td className="p-4">
        <Link href={`/list/ranch/${ranch}`}>View Details</Link>
      </td>
    </tr>
  );

  return (
    <div className="p-5 m-5">
      <h1>Ranch List</h1>
      <div className="overflow-y-scroll max-h-[500px] border border-gray-0 rounded-md shadow-sm ">
      <Table columns={columns} renderRow={renderRow} data={ranchList} />
      </div>
    </div>
  );
};

export default RanchListPage;