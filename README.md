# Song Nguyên Essential Oils

Website thương hiệu tinh dầu thiên nhiên cao cấp Song Nguyên — xây dựng bằng Next.js (App Router), TypeScript và Tailwind CSS v4, hỗ trợ song ngữ Việt/Anh.

## Công nghệ

- **Next.js 16** (App Router, Turbopack)
- **TypeScript**
- **Tailwind CSS v4**
- **lucide-react** cho icon hệ thống

## Cấu trúc trang

- `/` — Trang chủ
- `/san-pham`, `/san-pham/[slug]` — Danh mục & chi tiết sản phẩm
- `/qua-tang-doanh-nghiep` — Quà tặng doanh nghiệp
- `/ve-chung-toi` — Về chúng tôi
- `/tin-tuc`, `/tin-tuc/[slug]` — Tin tức
- `/tuyen-dung` — Tuyển dụng
- `/lien-he` — Liên hệ

## Bắt đầu

```bash
npm install
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000) để xem trang web.

## Ghi chú nội dung placeholder

Toàn bộ sản phẩm, bài viết, tin tuyển dụng, thông tin liên hệ (địa chỉ/hotline/email) trong dự án là **nội dung mẫu** để minh họa bố cục và phong cách thương hiệu. Cần thay thế bằng:

- Ảnh sản phẩm thật (hiện đang dùng minh họa SVG placeholder tại `components/icons/product-bottle.tsx`)
- Logo chính thức (hiện đang dùng bản phác lại tại `components/icons/logo.tsx` — thay bằng file logo gốc khi có)
- Thông tin liên hệ thật trong `lib/i18n/dictionaries.ts` (mục `footer.addressValue`, `phoneValue`, `emailValue`)
- Dữ liệu sản phẩm/tin tức/tuyển dụng trong `lib/data/`

## Build

```bash
npm run build
npm run start
```
