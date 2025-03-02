"use client";
import AttendanceChart from "@/components/AttendanceChart";
import CountChart from "@/components/CountChart";
import UserCard from "@/components/UserCard";
import KondooListPage from "../list/kondoo/page";
import { useState, useEffect } from "react";
import { fetchKondooData } from "@/lib/fetchKondooData";
import { fetchNgombeData } from "@/lib/fetchNgombeData";
import NgombeListPage from "../list/ngombe/page";
//import { checkRole } from "@/utils/roles";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";


interface ODKItem {
  text_question_types: { Name: string };
  numerical_question_types: { animal_code: number; select_one_autocomplete: string };
  __system: { submitterName: string };
  __id: string;
}

const AdminPage = () => {
  const [kondoo, setKondoo] = useState<ODKItem[]>([]);
  const [ngombe, setNgombe] = useState<ODKItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [activeTab, setActiveTab] = useState("ngombe"); // Default to Ngombe
  const router = useRouter();

  useEffect(() => {
    // async function checkAdminStatus() {
    //   const isAdmin = await checkRole("admin");
    //   if (!isAdmin) {
    //     router.push("/");
    //   }
    // }
    //checkAdminStatus();

    async function fetchData() {
      try {
        const kondooData = await fetchKondooData();
        setKondoo(kondooData.value);
        const ngombeData = await fetchNgombeData();
        setNgombe(ngombeData.value);
        setLoading(false);
      } catch (err: any) {
        setError(err);
        setLoading(false);
      }
    }
    fetchData();
  }, [router]);

  if (loading) return <Loading />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row">
      {/* LEFT */}
      <div className="w-full lg:w-3/3 flex flex-col gap-8">
        {/* USER CARDS */}
        <div className="flex gap-8 justify-between flex-wrap">
          <UserCard type="TOTAL NG'OMBE" count={ngombe.length} />
          <UserCard type="TOTAL MBUZI" count={0} />
          <UserCard type="TOTAL KONDOO" count={kondoo.length} />
          <UserCard type="TOTAL FARASI" count={0} />
        </div>
        {/* MIDDLE CHARTS */}
        <div className="flex gap-4 flex-col lg:flex-row">
          {/* COUNT CHART */}
          <div className="w-full lg:w-1/3 h-[450px]">
            <CountChart />
          </div>
          {/* ATTENDANCE CHART */}
          <div className="w-full lg:w-2/3 h-[450px]">
            <AttendanceChart />
          </div>
        </div>
        {/* BOTTOM CHART */}
        <div className="w-full h-[500px]">
          {/* Tabs */}
          <div className="flex border-b">
            <button
              className={`px-4 py-2 ${activeTab === "ngombe" ? "border-b-2 border-blue-500 bg-amber-300" : ""}`}
              onClick={() => setActiveTab("ngombe")}
            >
              DATA ZA NG'OMBE
            </button>
            <button
              className={`px-4 py-2 ${activeTab === "kondoo" ? "border-b-2 border-blue-500" : ""}`}
              onClick={() => setActiveTab("kondoo")}
            >
              DATA ZA KONDOO
            </button>
          </div>
          {/* Tab Content */}
          {activeTab === "ngombe" && <NgombeListPage />}
          {activeTab === "kondoo" && <KondooListPage />}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;


