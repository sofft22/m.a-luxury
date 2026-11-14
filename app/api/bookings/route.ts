import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { bookings, availabilityExceptions, weeklySchedule } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date");
    
    const db = getDb();
    
    if (date) {
      // 1. Get bookings for this date
      const dayBookings = await db.select().from(bookings).where(eq(bookings.date, date));
      
      // 2. Get admin exception for this specific date (if any)
      const dayException = await db.select().from(availabilityExceptions).where(eq(availabilityExceptions.date, date));
      
      // 3. Get the standard weekly schedule
      const schedule = await db.select().from(weeklySchedule);

      return NextResponse.json({
        bookings: dayBookings,
        exception: dayException.length > 0 ? dayException[0] : null,
        weeklySchedule: schedule
      });
    } else {
      const allBookings = await db.select().from(bookings);
      return NextResponse.json(allBookings);
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
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

    revalidatePath("/admin/bookings", "layout");
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
