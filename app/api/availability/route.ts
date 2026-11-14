import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { availability } from "@/lib/schema";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

// GET all availability
export async function GET() {
  try {
    const db = getDb();
    const allAvailability = await db.select().from(availability);
    return NextResponse.json(allAvailability);
  } catch (error: any) {
    return NextResponse.json([]);
  }
}

// POST to save/update a specific day
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const db = getDb();
    
    // Check if date already exists
    const existing = await db.select().from(availability).where(eq(availability.date, body.date));
    
    if (existing.length > 0) {
      // Update
      await db.update(availability)
        .set({
          isOpen: body.isOpen ? 1 : 0,
          startTime: body.startTime,
          endTime: body.endTime,
        })
        .where(eq(availability.date, body.date));
    } else {
      // Insert
      await db.insert(availability).values({
        id: `av-${Date.now()}`,
        date: body.date,
        isOpen: body.isOpen ? 1 : 0,
        startTime: body.startTime,
        endTime: body.endTime,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
