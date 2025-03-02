// // src/app/page.tsx
// import { auth } from "@clerk/nextjs/server";
// import { redirect } from "next/navigation";
// import ClientHome from "@/components/ClientHome"; // Updated import

// interface ODKItem {
//   text_question_types: { Name: string };
//   numerical_question_types: { animal_code: number; select_one_autocomplete: string };
//   __system: { submitterName: string };
//   __id: string;
// }

// async function Home() {
//   const authData = await auth();

//   if (!authData?.userId) {
//     redirect("/sign-in");
//   }

//   return <ClientHome userId={authData.userId} />;
// }

// export default Home;


// src/app/page.tsx
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

async function Home() {
  const authData = await auth();

  if (!authData?.userId) {
    redirect("/sign-in");
  }

  // If authenticated, you can render a component or redirect elsewhere
  return redirect("/dashboard"); // example of redirecting authenticated user.
}

export default Home;