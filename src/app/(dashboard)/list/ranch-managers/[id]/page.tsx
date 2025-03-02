"use client";
import { useUser, SignOutButton } from "@clerk/nextjs";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import Table from "@/components/Table";

const RanchManagerDetailsPage = () => { // Renamed component
  const { id: idParam } = useParams();
  const id = typeof idParam === "string" ? idParam : idParam?.[0];

  // Hardcoded manager data with index signature
  const managerData: { [key: string]: { id: string; name: string; ranch: string; } } = {
    "1": { id: "1", name: "John Doe", ranch: "Sunnyvale Ranch" },
    "2": { id: "2", name: "Jane Smith", ranch: "Mountain View Farm" },
    "3": { id: "3", name: "David Lee", ranch: "Riverdale Acres" },
    // Add more hardcoded managers as needed
  };

  const manager = managerData[id] || { id: "N/A", name: "Manager Not Found", ranch: "N/A" };

  const columns = [
    { header: "ID", accessor: "id" },
    { header: "Name", accessor: "name" },
    { header: "Ranch", accessor: "ranch" },
  ];

  const renderRow = (data: { [key: string]: string }) => (
    <tr key={data.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight">
      <td className="p-4">{data.id}</td>
      <td className="p-4">{data.name}</td>
      <td className="p-4">{data.ranch}</td>
    </tr>
  );

  const tableData = [manager];

  return (
    <div className="p-5 m-5">
      <h1>Ranch Manager Details</h1> {/* Updated heading */}
      <Table columns={columns} renderRow={renderRow} data={tableData} />
      <Link href="/ranch-managers">Back to Managers</Link> {/* Updated link */}
      <SignOutButton />
    </div>
  );
};

export default RanchManagerDetailsPage; // Renamed export