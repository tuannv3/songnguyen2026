import { notFound } from "next/navigation";
import { prisma } from "@/lib/db/client";
import { updateProduct } from "@/lib/cms/actions/products";
import { ProductForm } from "@/components/admin/product-form";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) notFound();

  return (
    <div>
      <h1 className="font-serif-display text-2xl text-ink">Sửa sản phẩm</h1>
      <div className="mt-6 max-w-2xl rounded-xl border border-border bg-card p-6 shadow-soft">
        <ProductForm action={updateProduct.bind(null, id)} defaults={product} />
      </div>
    </div>
  );
}
