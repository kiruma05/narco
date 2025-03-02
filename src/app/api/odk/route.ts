// src/app/api/odk/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_ODK_API_URL;
    if (!apiUrl) {
      console.error("ODK API URL not configured.");
      return NextResponse.json({ error: "ODK API URL not configured" }, { status: 500 });
    }

    const username = process.env.ODK_USERNAME;
    const password = process.env.ODK_PASSWORD;

    if (!username || !password) {
      console.error("ODK credentials not configured.");
      return NextResponse.json({ error: "ODK credentials not configured" }, { status: 500 });
    }

    const encodedCredentials = Buffer.from(`${username}:${password}`).toString("base64");

    const odkResponse = await fetch(apiUrl, {
      headers: {
        Authorization: `Basic ${encodedCredentials}`,
        "Content-Type": "application/json", // Explicitly set content type
        "Accept": "application/json", // Explicitly accept json
      },
    });

    if (!odkResponse.ok) {
      const errorText = await odkResponse.text(); // Get the error message from the response
      console.error(`ODK API request failed: ${odkResponse.status} - ${errorText}`);
      return NextResponse.json({ error: `ODK API request failed: ${odkResponse.status} - ${errorText}` }, { status: odkResponse.status });
    }

    const odkData = await odkResponse.json();

    if (!odkData) {
        console.error("ODK API returned empty data");
        return NextResponse.json({error: "ODK API returned empty data"}, {status: 500});
    }

    return NextResponse.json(odkData);
  } catch (error: any) { // Type the error as any
    console.error("Error fetching ODK data:", error.message); // Log error message
    return NextResponse.json({ error: `Internal Server Error: ${error.message}` }, { status: 500 });
  }
}