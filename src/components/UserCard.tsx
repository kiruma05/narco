"use client";
import Image from "next/image";
import { fetchKondooData } from "@/lib/fetchKondooData";
import { fetchNgombeData } from "@/lib/fetchNgombeData";
import { useState, useEffect } from "react";

interface UserCardProps {
  type: string;
  count: number;
}

const UserCard = ({ type, count }: UserCardProps) => {
  return (
    <div className="rounded-2xl odd:bg-lamaPurple even:bg-lamaYellow p-4 flex-1 min-w-[130px]">
      <div className="flex justify-between items-center">
        <span className="text-[10px] bg-white px-2 py-1 rounded-full text-green-600">
          2024/25
        </span>
        <Image src="/more.png" alt="" width={30} height={30} />
      </div>
      <h1 className="text-2xl font-semibold my-4">{count.toLocaleString()}</h1>
      <h2 className="capitalize text-lg font-semibold text-gray-500">{type}</h2>
    </div>
  );
};

interface ODKItem {
  __id: string;
}

const UserCardsContainer = () => {
  const [kondoo, setKondoo] = useState<ODKItem[]>([]);
  const [ngombe, setNgombe] = useState<ODKItem[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const kondooData = await fetchKondooData();
        setKondoo(kondooData.value);
        const ngombeData = await fetchNgombeData();
        setNgombe(ngombeData.value);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="flex gap-8 justify-between flex-wrap">
      <UserCard type="TOTAL NG`OMBE" count={ngombe.length} />
      <UserCard type="TOTAL MBUZI" count={0} />
      <UserCard type="TOTAL KONDOO" count={kondoo.length} />
      <UserCard type="TOTAL FARASI" count={0} />
    </div>
  );
};

export { UserCard, UserCardsContainer };
export default UserCard;
