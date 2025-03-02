import { NextResponse } from "next/server";

export async function GET() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_KONDOO_API_URL;
    const username = process.env.ODK_USERNAME;
    const password = process.env.ODK_PASSWORD;

    if (!apiUrl || !username || !password) {
      console.error("Missing ODK API URL or Credentials");
      return NextResponse.json({ error: "Missing ODK API URL or Credentials" }, { status: 500 });
    }

    const encodedCredentials = Buffer.from(`${username}:${password}`).toString("base64");

    const odkResponse = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Basic ${encodedCredentials}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!odkResponse.ok) {
      const errorText = await odkResponse.text();
      console.error(`ODK API Error: ${odkResponse.status} - ${errorText}`);
      return NextResponse.json({ error: `ODK API Error: ${odkResponse.status}` }, { status: odkResponse.status });
    }

    const data = await odkResponse.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Server Error:", error.message);
    return NextResponse.json({ error: `Server Error: ${error.message}` }, { status: 500 });
  }
}
