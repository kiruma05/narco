"use client";
import { useUser, SignOutButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchAllData } from "@/lib/fetchAllData";
import { ODKItem } from "@/types/ODKItem";
import NgombeListPage from "../list/ngombe/page";
import UserCard from "../../../components/UserCard";

const ManagerDashboard = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();
  const [ranchData, setRanchData] = useState<ODKItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      if (user?.publicMetadata?.role !== "manager") {
        router.push("/sign-in");
      } else if (user?.publicMetadata?.ranchName) {
        const loadData = async () => {
          try {
            setLoading(true);
            const data = await fetchAllData(user.publicMetadata.ranchName as string);
            setRanchData(data);
            setLoading(false);
          } catch (err: any) {
            setError(err);
            setLoading(false);
          }
        };
        loadData();
      }
    }
  }, [isLoaded, isSignedIn, user, router]);

  if (!isLoaded) return <div>Loading...</div>;
  if (!isSignedIn) return <div>Please sign in.</div>;
  if (user?.publicMetadata?.role !== "manager") return <div>Unauthorized.</div>;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const ngombeCount = ranchData.length;
  const mbuziCount = 0;
  const kondooCount = 0;
  const farasiCount = 0;

  return (
    <div className="p-5 m-5">
      <h1>Welcome, {user.firstName}!</h1>
      <p>This is your manager dashboard.</p>
      <div className="flex gap-8 justify-between flex-wrap">
        <UserCard type="TOTAL NG'OMBE" count={ngombeCount} />
        <UserCard type="TOTAL MBUZI" count={mbuziCount} />
        <UserCard type="TOTAL KONDOO" count={kondooCount} />
        <UserCard type="TOTAL FARASI" count={farasiCount} />
      </div>
      <div className="w-full m-5 h-[500px]">
        <NgombeListPage filteredData={ranchData} />
      </div>
      <SignOutButton />
    </div>
  );
};

export default ManagerDashboard;