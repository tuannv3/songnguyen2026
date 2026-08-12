import Link from "next/link";
import Image from "next/image";
import { Pencil, Trash2, Plus } from "lucide-react";
import { prisma } from "@/lib/db/client";
import { deleteProduct } from "@/lib/cms/actions/products";
import { AdminTable } from "@/components/admin/admin-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({ orderBy: { createdAt: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif-display text-2xl text-ink">Sản phẩm</h1>
          <p className="mt-1 text-sm text-muted-foreground">{products.length} sản phẩm</p>
        </div>
        <Button href="/admin/products/new" size="sm">
          <Plus className="h-4 w-4" aria-hidden="true" />
          Thêm sản phẩm
        </Button>
      </div>

      <div className="mt-6">
        <AdminTable headers={["Ảnh", "Tên sản phẩm", "Danh mục", "Giá từ", "Thao tác"]}>
          {products.map((product) => (
            <tr key={product.id}>
              <td className="px-4 py-3">
                <div className="relative h-12 w-12 overflow-hidden rounded-lg" style={{ backgroundColor: product.accentColor }}>
                  {product.image ? <Image src={product.image} alt="" fill className="object-contain p-1" /> : null}
                </div>
              </td>
              <td className="px-4 py-3 text-ink">
                {product.nameVi}
                {product.badge ? (
                  <Badge tone="accent" className="ml-2">
                    {product.badge}
                  </Badge>
                ) : null}
              </td>
              <td className="px-4 py-3 text-ink/70">{product.category}</td>
              <td className="px-4 py-3 text-ink/70">{product.priceFrom.toLocaleString("vi-VN")}₫</td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <Link href={`/admin/products/${product.id}`} className="text-primary hover:underline" aria-label="Sửa">
                    <Pencil className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <form action={deleteProduct.bind(null, product.id)}>
                    <button type="submit" aria-label="Xoá" className="cursor-pointer text-destructive/80 hover:text-destructive">
                      <Trash2 className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </form>
                </div>
              </td>
            </tr>
          ))}
        </AdminTable>
      </div>
    </div>
  );
}
