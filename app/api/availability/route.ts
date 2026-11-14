import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { weeklySchedule, availabilityExceptions } from "@/lib/schema";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const db = getDb();
    const schedule = await db.select().from(weeklySchedule).orderBy(weeklySchedule.id);
    const exceptions = await db.select().from(availabilityExceptions);
    return NextResponse.json({ schedule, exceptions });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const db = getDb();

    // 1. Update Weekly Schedule
    if (body.type === "weekly") {
      for (const day of body.schedule) {
        await db.update(weeklySchedule)
          .set({ isOpen: day.isOpen, startTime: day.startTime, endTime: day.endTime })
          .where(eq(weeklySchedule.id, day.id));
      }
      return NextResponse.json({ success: true });
    }

    // 2. Add/Update Exception
    if (body.type === "exception") {
      const existing = await db.select().from(availabilityExceptions).where(eq(availabilityExceptions.date, body.date));
      
      if (existing.length > 0) {
        await db.update(availabilityExceptions)
          .set({ isOpen: body.isOpen, startTime: body.startTime, endTime: body.endTime })
          .where(eq(availabilityExceptions.date, body.date));
      } else {
        await db.insert(availabilityExceptions).values({
          id: `ex-${Date.now()}`,
          date: body.date,
          isOpen: body.isOpen,
          startTime: body.startTime,
          endTime: body.endTime,
        });
      }
      return NextResponse.json({ success: true });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

    const db = getDb();
    await db.delete(availabilityExceptions).where(eq(availabilityExceptions.id, id));
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
