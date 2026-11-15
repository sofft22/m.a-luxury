import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { settings } from "@/lib/schema";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const db = getDb();
    const result = await db.select().from(settings).where(eq(settings.id, 1));
    return NextResponse.json(result[0] || {}, {
      headers: {
        "Cache-Control": "no-store, max-age=0, must-revalidate",
      },
    });
  } catch (error: any) {
    // If the table doesn't exist, return empty object instead of crashing
    return NextResponse.json({}, {
      headers: {
        "Cache-Control": "no-store, max-age=0, must-revalidate",
      },
    });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const db = getDb();
    
    await db.update(settings)
      .set({
        deliveryZones: body.deliveryZones,
        bannerText: body.bannerText,
        bannerActive: body.bannerActive,
        boxBuilderConfig: body.boxBuilderConfig, 
      })
      .where(eq(settings.id, 1));

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
