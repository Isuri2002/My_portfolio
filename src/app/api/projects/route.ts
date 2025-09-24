import { NextResponse } from "next/server"
import data from "@/data/projects.json" // ✅ import static JSON

export async function GET() {
  return NextResponse.json(data, { status: 200 })
}
