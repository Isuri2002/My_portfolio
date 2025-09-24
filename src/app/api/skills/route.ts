import { NextResponse } from "next/server"
import data from "@/data/skills.json"

export async function GET() {
  return NextResponse.json(data, { status: 200 })
}
