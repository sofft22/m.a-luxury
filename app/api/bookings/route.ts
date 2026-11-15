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
        weeklySchedule: schedule 
      });
    } else {
      // Fetch ALL bookings for the admin panel
      const allBookings = await db.select().from(bookings);
      return NextResponse.json(allBookings);
    }
  } catch (error: any) {
    return NextResponse.json({ bookings: [], exception: null, weeklySchedule: [] });
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
      status: "Pending",
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const db = getDb();
    
    await db.update(bookings)
      .set({ status: body.status })
      .where(eq(bookings.id, body.id));

    return NextResponse.json({ success: true });
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
    await db.delete(bookings).where(eq(bookings.id, id));
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
