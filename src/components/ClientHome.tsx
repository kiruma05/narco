// // src/components/ClientHome.tsx
// "use client";
// import { useState, useEffect } from "react";
// import { fetchODKData } from "@/lib/fetchODKData";
// import TeacherListPage from "@/app/(dashboard)/list/teachers/page"; //Corrected path to TeacherListPage

// interface ODKItem {
//   text_question_types: { Name: string };
//   numerical_question_types: { animal_code: number; select_one_autocomplete: string };
//   __system: { submitterName: string };
//   __id: string;
// }

// interface ClientHomeProps {
//   userId: string;
// }

// export default function ClientHome({ userId }: ClientHomeProps) {
//   const [data, setData] = useState<{ value: ODKItem[] } | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<Error | null>(null);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const result = await fetchODKData();
//         setData(result);
//         setLoading(false);
//       } catch (err: any) {
//         setError(err);
//         setLoading(false);
//       }
//     }

//     fetchData();
//   }, [userId]);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error.message}</p>;
//   if (!data || !data.value) return <p>No data.</p>;

//   return <TeacherListPage data={data.value} />;
// }