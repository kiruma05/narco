"use client";
import { useUser } from "@clerk/nextjs";

export default function TestComponent() {
  const { isLoaded, isSignedIn, user } = useUser();
  console.log("isLoaded:", isLoaded);
  console.log("isSignedIn:", isSignedIn);
  console.log("user:", user);
  console.log("publicMetadata:", user?.publicMetadata);

  return <div>Testing</div>;
}