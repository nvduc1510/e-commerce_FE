# Furnixar E-Commerce — Frontend

Ứng dụng giao diện người dùng cho dự án thương mại điện tử Furnixar. Xây dựng bằng **React 18 + TypeScript + Vite**.

---

## 🛠 Yêu cầu hệ thống

| Công cụ | Phiên bản tối thiểu |
|---|---|
| Node.js | 18+ |
| npm | 9+ |

---

## 🚀 Hướng dẫn chạy

### 1. Cài dependencies

```bash
cd e-commerce_FE
npm install
```

### 2. Chạy development server

```bash
npm run dev
```

Frontend khởi động tại: **http://localhost:5173**

> ⚠️ **Backend phải chạy trước** tại `http://localhost:8080`, nếu không API calls sẽ thất bại.

---

## ⚙️ Cấu hình API URL

File cấu hình base URL nằm ở:

```
src/service/commonApi.tsx
```

Mặc định kết nối tới backend local:

```ts
const BASE_URL = "http://localhost:8080";
```

Nếu backend chạy ở địa chỉ khác, cập nhật giá trị này.

---

## 📋 Các lệnh npm

| Lệnh | Mô tả |
|---|---|
| `npm run dev` | Chạy development server (hot reload) |
| `npm run build` | Build production bundle |
| `npm run preview` | Xem trước bản build production |
| `npm run lint` | Kiểm tra lỗi ESLint |

---

## 🏗 Cấu trúc project

```
src/
├── components/      # Reusable UI components
│   ├── navbar/      # Navigation bar
│   ├── product/     # Product card, listing components
│   └── ...
├── pages/           # Page components
│   ├── auth/        # Login, Register
│   ├── shop/        # Product listing, Cart
│   ├── account/     # My Profile, Order History, Wishlist
│   └── admin/       # Admin dashboard, management pages
├── router/          # React Router config (AppRouter.tsx)
├── service/         # API calls (commonApi.tsx)
├── store/           # State management (Redux/Context)
├── hooks/           # Custom React hooks
├── model/           # TypeScript interfaces/types
└── data/            # Static data
```

---

## 🔐 Phân quyền

| Trang | Quyền truy cập |
|---|---|
| Trang chủ, Shop, Chi tiết sản phẩm | Public |
| Đăng nhập / Đăng ký | Public |
| Giỏ hàng, Wishlist, Đặt hàng | Đăng nhập (ROLE_USER) |
| Dashboard Admin | ROLE_ADMIN |

---

## 🔗 Kết nối Backend

Frontend giao tiếp với backend qua REST API:

- **Base URL**: `http://localhost:8080`
- **Authentication**: JWT Bearer Token (lưu trong `localStorage`)
- **CORS**: Backend đã cấu hình cho phép `localhost:5173`

Đảm bảo backend đang chạy trước khi mở frontend. Xem hướng dẫn chạy backend tại [`e-commerce_be/README.md`](../e-commerce_be/README.md).
