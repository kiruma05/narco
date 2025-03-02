"use client";
import Image from "next/image";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Mkata",
    ngombe: 68,
    mbuzi: 44,
    kondoo: 30,
    farasi: 20,
  },
  {
    name: "Ruvu",
    ngombe: 63,
    mbuzi: 10,
    kondoo: 50,
    farasi: 49,
  },
  {
    name: "Kongwa",
    ngombe: 20,
    mbuzi: 60,
    kondoo: 20,
    farasi: 60,
  },
  {
    name: "Misenye",
    ngombe: 65,
    mbuzi: 44,
    kondoo: 50,
    farasi: 30,
  },
  {
    name: "Morogoro",
    ngombe: 62,
    mbuzi: 48,
    kondoo: 20,
    farasi: 46,
  },
];

const AttendanceChart = () => {
  return (
    <div className="bg-white rounded-lg p-4 h-full">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Takwimu ya Mifugo Katika Ranch</h1>
        <Image src="/moreDark.png" alt="" width={20} height={20} />
      </div>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart width={500} height={300} data={data} barSize={20}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ddd" />
          <XAxis
            dataKey="name"
            axisLine={false}
            tick={{ fill: "#d1d5db" }}
            tickLine={false}
          />
          <YAxis axisLine={false} tick={{ fill: "#d1d5db" }} tickLine={false} />
          <Tooltip
            contentStyle={{ borderRadius: "10px", borderColor: "lightgray" }}
          />
          <Legend
            align="left"
            verticalAlign="top"
            wrapperStyle={{ paddingTop: "20px", paddingBottom: "40px" }}
          />
         <Bar
          dataKey="ngombe"
          fill="#FAE27C" // Yellowish
          legendType="circle"
           radius={[10, 10, 0, 0]}
/>
          <Bar
          dataKey="kondoo"
          fill="#82CA9D" // Green
          legendType="circle"
          radius={[10, 10, 0, 0]}
         />
<         Bar
         dataKey="farasi"
         fill="#8884D8" // Purple
         legendType="circle"
          radius={[10, 10, 0, 0]}
/>
        <Bar
        dataKey="mbuzi"
        fill="#E57373" // Red
        legendType="circle"
        radius={[10, 10, 0, 0]}
/>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AttendanceChart;
