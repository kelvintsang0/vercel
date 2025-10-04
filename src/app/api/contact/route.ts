import { NextResponse } from "next/server";
export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();
    if (!name || !email || !message) return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 });
    const endpoint = process.env.FORMSPREE_ENDPOINT;
    if (!endpoint) return NextResponse.json({ ok: false, error: "No endpoint configured" }, { status: 503 });
    const r = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, email, message }) });
    if (!r.ok) throw new Error("Forward failed"); return NextResponse.json({ ok: true });
  } catch { return NextResponse.json({ ok: false, error: "Send failed" }, { status: 500 }); }
}