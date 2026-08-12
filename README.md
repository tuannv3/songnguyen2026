# Song Nguyên Essential Oils

Website thương hiệu tinh dầu thiên nhiên cao cấp Song Nguyên — xây dựng bằng Next.js (App Router), TypeScript và Tailwind CSS v4, hỗ trợ song ngữ Việt/Anh. Toàn bộ nội dung (slide trang chủ, sản phẩm, tin tức, tuyển dụng, trang Giới thiệu/Quà tặng doanh nghiệp, thông tin liên hệ) được quản lý qua trang quản trị `/admin`, lưu trong database — không cần sửa code hay deploy lại khi cập nhật nội dung.

## Công nghệ

- **Next.js 16** (App Router, Turbopack, Server Actions)
- **TypeScript**
- **Tailwind CSS v4**
- **Prisma ORM** + **PostgreSQL** (dùng [Neon](https://neon.tech))
- **Vercel Blob** — lưu trữ ảnh do admin tải lên
- **jose** + **bcryptjs** — đăng nhập quản trị bằng session cookie ký JWT
- **lucide-react** cho icon hệ thống

## Cấu trúc trang công khai

- `/` — Trang chủ
- `/san-pham`, `/san-pham/[slug]` — Danh mục & chi tiết sản phẩm
- `/qua-tang-doanh-nghiep` — Quà tặng doanh nghiệp
- `/ve-chung-toi` — Về chúng tôi
- `/tin-tuc`, `/tin-tuc/[slug]` — Tin tức
- `/tuyen-dung` — Tuyển dụng
- `/lien-he` — Liên hệ

## Trang quản trị (`/admin`)

Đăng nhập bằng tài khoản quản trị duy nhất (tạo lúc seed database) để chỉnh sửa:

- Slide trang chủ (nội dung + ảnh + thứ tự hiển thị)
- Sản phẩm (kèm ảnh, link Shopee)
- Tin tức
- Tin tuyển dụng + nội dung giới thiệu trang Tuyển dụng
- Nội dung trang Giới thiệu, trang Quà tặng doanh nghiệp
- Thông tin liên hệ/footer (địa chỉ, hotline, email, Zalo/Messenger/Facebook/Instagram)
- Đổi mật khẩu quản trị

Mọi thay đổi được lưu vào database và hiển thị lên trang công khai ngay lập tức (không cần build/deploy lại).

## Bắt đầu

### 1. Cài đặt

```bash
npm install
```

### 2. Cấu hình biến môi trường

Tạo file `.env.local` ở thư mục gốc với các biến sau:

| Biến | Mô tả |
| --- | --- |
| `DATABASE_URL` | Chuỗi kết nối PostgreSQL (lấy từ [neon.tech](https://neon.tech), dùng "Pooled connection") |
| `BLOB_READ_WRITE_TOKEN` | Token Vercel Blob để upload ảnh (Vercel → Storage → Blob store → tab `.env.local`) |
| `SESSION_SECRET` | Chuỗi bí mật bất kỳ để ký session admin (ví dụ: `openssl rand -base64 32`) |
| `ADMIN_EMAIL` | Email đăng nhập admin ban đầu |
| `ADMIN_INITIAL_PASSWORD` | Mật khẩu admin ban đầu — nên đổi ngay sau lần đăng nhập đầu tiên trong mục Cài đặt |

### 3. Khởi tạo database

```bash
npx prisma migrate dev   # tạo bảng theo schema
npm run db:seed          # tạo tài khoản admin + nội dung khởi tạo cho các trang singleton
```

### 4. Chạy dev server

```bash
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000) để xem trang web, hoặc [http://localhost:3000/admin](http://localhost:3000/admin) để vào trang quản trị.

## Build

```bash
npm run build
npm run start
```

## Các lệnh liên quan đến database

```bash
npm run db:migrate   # tạo/áp dụng migration mới sau khi sửa prisma/schema.prisma
npm run db:generate  # sinh lại Prisma Client
npm run db:seed      # chạy lại seed (an toàn, không ghi đè dữ liệu đã có)
npm run db:studio    # mở Prisma Studio để xem/sửa dữ liệu trực tiếp
```

## Ghi chú

- Logo chính thức hiện dùng bản phác lại tại `components/icons/logo.tsx` và `public/brand/logo.jpg` — thay bằng file gốc khi có.
- Sản phẩm chưa có ảnh thật sẽ hiển thị minh họa SVG placeholder (`components/icons/product-bottle.tsx`) — thêm ảnh qua trang quản trị để thay thế.
- `lib/data/*.ts` chỉ còn giữ lại `type` định nghĩa dữ liệu (dùng chung giữa admin và trang công khai) — dữ liệu thật nằm trong database, không còn hardcode trong code.
