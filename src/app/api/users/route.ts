import { NextResponse } from "next/server";

export async function GET() {
  try {
    return NextResponse.json({ data: SAMPLE_USER }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
