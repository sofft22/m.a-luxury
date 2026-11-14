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
  } catch (error) {
    console.error("GET PRODUCTS ERROR:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
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
  } catch (error) {
    console.error("POST PRODUCT ERROR:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
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
  } catch (error) {
    console.error("PUT PRODUCT ERROR:", error);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
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
  } catch (error) {
    console.error("DELETE PRODUCT ERROR:", error);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
