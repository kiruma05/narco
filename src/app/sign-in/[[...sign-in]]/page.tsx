"use client";
import { SignIn, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import TestComponent from "@/components/TestComponent";
//import TestComponent from "./TestComponent"; // Import the test component

export default function Page() {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && isSignedIn && user?.publicMetadata) {
      setTimeout(() => {
        console.log(user);
        console.log(user?.publicMetadata);
        if (user.publicMetadata.role === "manager") {
          router.push("/manager");
        } else if (user.publicMetadata.role === "admin") {
          router.push("/admin/managers");
        }
      }, 100);
    }
  }, [isLoaded, isSignedIn, user, router]);

  return (
    <div>
      <TestComponent /> {/* Render the test component */}
      <div className="h-screen w-full flex items-center justify-center bg-blue-100">
        <div className="flex flex-col gap-6 items-center">
          <Image
            src="/narco-logo.png"
            alt="Narco Logo"
            width={150}
            height={150}
            className="rounded-lg shadow-md"
          />
          <SignIn />
        </div>
      </div>
    </div>
  );
}