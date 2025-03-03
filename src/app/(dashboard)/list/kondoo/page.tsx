"use client";
import Loading from "@/components/Loading";
//import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { fetchKondooData } from "@/lib/fetchKondooData";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

interface ODKItem {
  text_question_types?: { Name?: string };
  numerical_question_types?: { animal_code?: number; select_one_autocomplete?: string };
  __system?: { submitterName?: string };
  __id: string;

  animal_data_one?: { animal_code?: number;}
}

const columns = [
  { header: "INFO", accessor: "info" },
  { header: "ANIMAL CODE", accessor: "animalCode", className: "hidden md:table-cell" },
  { header: "RANCH NAME", accessor: "ranchName", className: "hidden md:table-cell" },
  { header: "SUBMITTER", accessor: "submitter", className: "hidden md:table-cell" },
  { header: "BREED", accessor: "breed", className: "hidden lg:table-cell" },
  { header: "ACTIONS", accessor: "action" },
];

const KondooListPage = () => {
  const [data, setData] = useState<ODKItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const kondoo = await fetchKondooData();
        setData(kondoo.value);
        setLoading(false);
      } catch (err: any) {
        setError(err);
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) return <p><Loading /></p>;
  if (error) return <p>Error: {error.message}</p>;

  const renderRow = (item: ODKItem) => (
    <tr key={item.__id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight">
      <td className="p-4">
        <h3 className="font-semibold">{item.text_question_types?.Name ?? "N/A"}</h3>
        <p className="text-xs text-gray-500">Animal Code: {item.numerical_question_types?.animal_code ?? "N/A"}</p>
      </td>
      <td className="hidden md:table-cell">{item.animal_data_one?.animal_code ?? "N/A"}</td>
      <td className="hidden md:table-cell">{item.text_question_types?.Name ?? "N/A"}</td>
      <td className="hidden md:table-cell">{item.__system?.submitterName ?? "N/A"}</td>
      <td className="hidden lg:table-cell">{item.numerical_question_types?.select_one_autocomplete ?? "N/A"}</td>
      <td>
        <Link href={`/list/kondoo/${item.animal_data_one?.animal_code}`}>
          <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
            <Image src="/view.png" alt="View" width={16} height={16} />
          </button>
        </Link>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md m-4 mt-0">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold hidden md:block">DATA ZA KONDOO...</h1>
        <TableSearch />
      </div>
      <div className="overflow-y-scroll max-h-[500px] border border-gray-0 rounded-md shadow-sm">
      {data.length > 0 ? (
        <Table columns={columns} renderRow={renderRow} data={data} />
      ) : (
        <p className="text-center text-gray-500">No Data Available</p>
      )}
      </div>
      <Pagination />
    </div>
  );
};

export default KondooListPage;
