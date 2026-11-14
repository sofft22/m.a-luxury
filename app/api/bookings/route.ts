import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { bookings, availabilityExceptions, weeklySchedule } from "@/lib/schema";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date");
    
    const db = getDb();
    
    if (date) {
      const dayBookings = await db.select().from(bookings).where(eq(bookings.date, date));
      const dayException = await db.select().from(availabilityExceptions).where(eq(availabilityExceptions.date, date));
      const schedule = await db.select().from(weeklySchedule);

      return NextResponse.json({
        bookings: dayBookings,
        exception: dayException.length > 0 ? dayException[0] : null,
        weeklySchedule: schedule || [] // Fallback to empty array
      });
    } else {
      const allBookings = await db.select().from(bookings);
      return NextResponse.json(allBookings);
    }
  } catch (error: any) {
    console.error("GET BOOKINGS ERROR:", error.message);
    // Return safe fallbacks so the frontend doesn't crash
    return NextResponse.json({ 
      bookings: [], 
      exception: null, 
      weeklySchedule: [] 
    });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const db = getDb();
    
    await db.insert(bookings).values({
      id: `bkg-${Date.now()}`,
      serviceId: body.serviceId,
      serviceName: body.serviceName,
      customerName: body.customerName,
      phone: body.phone,
      email: body.email || "",
      date: body.date,
      startTime: body.startTime,
      endTime: body.endTime,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
