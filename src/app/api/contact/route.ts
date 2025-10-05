import { NextResponse } from "next/server";

// POST /api/contact
export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 });
    }

    // Send the message to Formspree
    const endpoint = process.env.FORMSPREE_ENDPOINT;
    if (!endpoint) {
      return NextResponse.json({ ok: false, error: "No endpoint configured" }, { status: 503 });
    }

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
    });

    if (!response.ok) {
      const text = await response.text();
      return NextResponse.json({ ok: false, error: text }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
