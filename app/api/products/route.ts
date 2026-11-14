import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { products } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const db = getDb();
    const allProducts = await db.select().from(products);
    return NextResponse.json(allProducts);
  } catch (error: any) {
    console.error("GET PRODUCTS ERROR:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const db = getDb();
    
    await db.insert(products).values({
      id: `p-${Date.now()}`,
      title: body.title,
      price: body.price,
      description: body.description || "",
      category: body.category,
      image: body.image,
      images: JSON.stringify(body.images || []),
      sizes: JSON.stringify(body.sizes || []),
      inStock: body.inStock ? 1 : 0,
      featured: body.featured ? 1 : 0,
    });

    revalidatePath("/", "layout");
    revalidatePath("/shop", "layout");

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("POST PRODUCT ERROR:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const db = getDb();
    
    await db.update(products)
      .set({
        title: body.title,
        price: body.price,
        description: body.description || "",
        category: body.category,
        image: body.image,
        images: JSON.stringify(body.images || []),
        sizes: JSON.stringify(body.sizes || []),
        inStock: body.inStock ? 1 : 0,
        featured: body.featured ? 1 : 0,
      })
      .where(eq(products.id, body.id));

    revalidatePath("/", "layout");
    revalidatePath("/shop", "layout");

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("PUT PRODUCT ERROR:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

    const db = getDb();
    await db.delete(products).where(eq(products.id, id));
    
    revalidatePath("/", "layout");
    revalidatePath("/shop", "layout");

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("DELETE PRODUCT ERROR:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
