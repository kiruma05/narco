"use client";
import { fetchKondooData } from "@/lib/fetchKondooData";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Table from "@/components/Table";

interface ODKItem {
  text_question_types?: { Name?: string; Name_officer?: string };
  numerical_question_types?: { animal_code?: number; select_one_autocomplete?: string };
  __system?: { submitterName?: string };
  __id: string;
  animal_data_one?: { animal_code?: number; };
  Jinsia?: { select_one_autocomplete?: string };
  Rangi?: { select_one_autocomplete?: string };
}

const KondooDetails = () => {
  const { id: idParam } = useParams();
  const id = typeof idParam === "string" ? idParam : idParam?.[0];
  const [item, setItem] = useState<ODKItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await fetchKondooData();
        const animalCode = parseInt(id, 10);
        const foundItem = result.value.find(
          (data: ODKItem) =>
            data.numerical_question_types?.animal_code === animalCode ||
            data.animal_data_one?.animal_code === animalCode
        );
        setItem(foundItem ?? null);
        setLoading(false);
      } catch (err: any) {
        setError(err);
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!item) return <p className="text-center text-gray-500">Data not found</p>;

  const columns = [
    { header: "Ranch Name", accessor: "ranchName" },
    { header: "Animal Code", accessor: "animalCode" },
    { header: "Submitter", accessor: "submitter" },
    { header: "Breed", accessor: "breed" },
    { header: "Gender", accessor: "gender" },
    { header: "Color", accessor: "color" },
  ];

  const renderRow = (data: { [key: string]: string | number | undefined }) => (
    <tr key={data.animalCode?.toString()} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight">
      <td className="p-4">{data.ranchName}</td>
      <td className="p-4">{data.animalCode}</td>
      <td className="p-4">{data.submitter}</td>
      <td className="p-4">{data.breed}</td>
      <td className="p-4">{data.gender}</td>
      <td className="p-4">{data.color}</td>
    </tr>
  );

  const tableData = item
    ? [
        {
          ranchName: item.text_question_types?.Name ?? "N/A",
          animalCode: item.animal_data_one?.animal_code ?? item.numerical_question_types?.animal_code ?? "N/A",
          submitter: item.__system?.submitterName ?? "N/A",
          breed: item.numerical_question_types?.select_one_autocomplete ?? "N/A",
          gender: item.Jinsia?.select_one_autocomplete ?? "N/A",
          color: item.Rangi?.select_one_autocomplete ?? "N/A",
        },
      ]
    : [];

  return (
    <div className="bg-white p-6 rounded-md shadow-md m-4">
      <Link href="/admin">
        <button className="bg-lamaSky text-white p-2 rounded-md mb-4">
          🔙 Back to List
        </button>
      </Link>
      <h1 className="text-xl font-semibold mb-4 text-lamaPurple">Kondoo Details</h1>
      <Table columns={columns} renderRow={renderRow} data={tableData} />

      <div className="mt-6">
        <Image src="/kondoo.png" alt="Kondoo" width={200} height={200} className="rounded-md" />
      </div>
    </div>
  );
};

export default KondooDetails;