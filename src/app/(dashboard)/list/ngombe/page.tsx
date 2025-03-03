"use client";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { fetchNgombeData } from "@/lib/fetchNgombeData";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export const dynamic = "force-static"; 

interface ODKItem {
  text_question_types?: { Name?: string };
  numerical_question_types?: { animal_code?: number; select_one_autocomplete?: string };
  __system?: { submitterName?: string };
  __id: string;
}

const NgombeListPage = () => {
  const [data, setData] = useState<ODKItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const ngombe = await fetchNgombeData();
        setData(ngombe.value);
        setLoading(false);
      } catch (err: any) {
        setError(err);
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const renderRow = (item: ODKItem) => (
    <tr key={item.__id}>
      <td>{item.text_question_types?.Name ?? "N/A"}</td>
    </tr>
  );

  return (
    <div>
      <TableSearch />
      <Table columns={[]} renderRow={renderRow} data={data} />
      <Pagination />
    </div>
  );
};

export default NgombeListPage;
