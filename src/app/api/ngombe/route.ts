import { NextResponse } from "next/server";

export async function GET() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_NGOMBE_API_URL;
    if (!apiUrl) {
      console.error("Ng'ombe API URL not configured.");
      return NextResponse.json({ error: "Ng'ombe API URL not configured" }, { status: 500 });
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
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!odkResponse.ok) {
      const errorText = await odkResponse.text();
      console.error(`Ng'ombe API request failed: ${odkResponse.status} - ${errorText}`);
      return NextResponse.json({ error: `Ng'ombe API request failed: ${odkResponse.status} - ${errorText}` }, { status: odkResponse.status });
    }

    const odkData = await odkResponse.json();
    return NextResponse.json(odkData);
  } catch (error: any) {
    console.error("Error fetching Ng'ombe data:", error.message);
    return NextResponse.json({ error: `Internal Server Error: ${error.message}` }, { status: 500 });
  }
}
