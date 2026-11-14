import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { services } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const db = getDb();
    const allServices = await db.select().from(services);
    return NextResponse.json(allServices);
  } catch (error: any) {
    console.error("GET SERVICES ERROR:", error.message);
    // Return an empty array so the frontend doesn't crash if the table doesn't exist yet
    return NextResponse.json([]); 
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const db = getDb();
    
    await db.insert(services).values({
      id: `srv-${Date.now()}`,
      title: body.title,
      category: body.category,
      description: body.description || "",
      options: JSON.stringify(body.options || []),
      inStock: body.inStock ? 1 : 0,
    });

    revalidatePath("/", "layout");
    revalidatePath("/services", "layout");

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("POST SERVICE ERROR:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const db = getDb();
    
    await db.update(services)
      .set({
        title: body.title,
        category: body.category,
        description: body.description || "",
        options: JSON.stringify(body.options || []),
        inStock: body.inStock ? 1 : 0,
      })
      .where(eq(services.id, body.id));

    revalidatePath("/", "layout");
    revalidatePath("/services", "layout");

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("PUT SERVICE ERROR:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

    const db = getDb();
    await db.delete(services).where(eq(services.id, id));
    
    revalidatePath("/", "layout");
    revalidatePath("/services", "layout");

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("DELETE SERVICE ERROR:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
