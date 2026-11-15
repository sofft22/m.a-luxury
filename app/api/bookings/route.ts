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
      let dayBookings: any[] = [];
      let dayException: any = null;
      let schedule: any[] = [];

      try {
        dayBookings = await db.select().from(bookings).where(eq(bookings.date, date));
      } catch (e) { console.error("Bookings fetch error:", e); }

      try {
        const ex = await db.select().from(availabilityExceptions).where(eq(availabilityExceptions.date, date));
        dayException = ex.length > 0 ? ex[0] : null;
      } catch (e) { console.error("Exception fetch error:", e); }

      try {
        schedule = await db.select().from(weeklySchedule);
      } catch (e) { console.error("Schedule fetch error:", e); }

      return NextResponse.json({
        bookings: dayBookings,
        exception: dayException,
        weeklySchedule: schedule 
      });
    } else {
      const allBookings = await db.select().from(bookings);
      return NextResponse.json(allBookings);
    }
  } catch (error: any) {
    console.error("GLOBAL GET ERROR:", error.message);
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
    console.error("POST ERROR:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
