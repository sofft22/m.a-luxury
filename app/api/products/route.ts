import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { products } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const db = getDb();
    
    // Check if the request is coming from the Admin panel
    const { searchParams } = new URL(request.url);
    const isAdmin = searchParams.get("admin") === "true";

    if (isAdmin) {
      // FAST FETCH FOR ADMIN (No heavy images)
      const allProducts = await db.select({
        id: products.id,
        title: products.title,
        price: products.price,
        weight: products.weight,
        description: products.description,
        category: products.category,
        inStock: products.inStock,
        featured: products.featured,
        sizes: products.sizes,
      }).from(products);
      return NextResponse.json(allProducts);
    } else {
      // FULL FETCH FOR PUBLIC SHOP (Includes images)
      const allProducts = await db.select().from(products);
      return NextResponse.json(allProducts);
    }

  } catch (error: any) {
    return NextResponse.json([]); 
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
      weight: Number(body.weight) || 0, 
      description: body.description || "",
      category: body.category,
      image: body.image,
      images: typeof body.images === 'string' ? body.images : JSON.stringify(body.images || []),
      sizes: typeof body.sizes === 'string' ? body.sizes : JSON.stringify(body.sizes || []),
      inStock: body.inStock ? 1 : 0,
      featured: body.featured ? 1 : 0,
    });

    revalidatePath("/", "layout");
    revalidatePath("/shop", "layout");

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("POST PRODUCT ERROR:", error);
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
        weight: Number(body.weight) || 0,
        description: body.description || "",
        category: body.category,
        image: body.image,
        images: typeof body.images === 'string' ? body.images : JSON.stringify(body.images || []),
        sizes: typeof body.sizes === 'string' ? body.sizes : JSON.stringify(body.sizes || []),
        inStock: body.inStock ? 1 : 0,
        featured: body.featured ? 1 : 0,
      })
      .where(eq(products.id, body.id));

    revalidatePath("/", "layout");
    revalidatePath("/shop", "layout");

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("PUT PRODUCT ERROR:", error);
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
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
