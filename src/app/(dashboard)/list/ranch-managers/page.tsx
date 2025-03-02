"use client";
import { useUser, SignOutButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Table from "@/components/Table";

interface Manager {
  id: string;
  name: string;
  ranch: string;
}

const AdminManagersPage = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  // Hardcoded managers data with index signature
  const managersData: { [key: string]: Manager } = {
    "1": { id: "1", name: "Agostine sililo Agostine ", ranch: "Ruvu Ranch" },
    "2": { id: "2", name: "FREDRICK NYOMBI", ranch: "Mkata Ranch" },
    // Add more hardcoded managers as needed
  };

  // Convert managersData to an array for the Table component
  const managers: Manager[] = Object.values(managersData);

  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Ranch", accessor: "ranch" },
    { header: "Actions", accessor: "actions" },
  ];

  const renderRow = (manager: Manager) => (
    <tr key={manager.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight">
      <td className="p-4">{manager.name}</td>
      <td className="p-4">{manager.ranch}</td>
      <td className="p-4">
        <Link href={`/admin/managers/${manager.id}`}>View Details</Link>
      </td>
    </tr>
  );

  return (
    <div className="p-5 m-5">
      <h1>Admin: Manage Managers</h1>
      <Table columns={columns} renderRow={renderRow} data={managers} />
      <SignOutButton />
    </div>
  );
};

export default AdminManagersPage;