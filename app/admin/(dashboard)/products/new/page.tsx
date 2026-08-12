import { createProduct } from "@/lib/cms/actions/products";
import { ProductForm } from "@/components/admin/product-form";

export default function NewProductPage() {
  return (
    <div>
      <h1 className="font-serif-display text-2xl text-ink">Thêm sản phẩm</h1>
      <div className="mt-6 max-w-2xl rounded-xl border border-border bg-card p-6 shadow-soft">
        <ProductForm action={createProduct} />
      </div>
    </div>
  );
}
