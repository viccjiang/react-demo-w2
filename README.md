# RepX - Fitness App

React 練習專案，包含健身 APP Landing Page（前台）與後台產品管理系統。

## Tech Stack

- React 19 + TypeScript
- Vite 7
- Tailwind CSS 4
- React Router 7 (Hash Mode, Data Mode)
- Axios
- Lucide React (Icons)

## Getting Started

```bash
# 安裝依賴
npm install

# 複製環境變數
cp .env.example .env

# 啟動開發伺服器
npm run dev
```

## Environment Variables

在 `.env` 中設定：

```
VITE_API_BASE=https://ec-course-api.hexschool.io/v2
VITE_API_PATH=<你的六角學院 API 路徑>
```

## Routes

使用 `createHashRouter`，路由表定義在 `src/routes/index.tsx`。前台共用 `FrontLayout`（Navbar + Outlet + Footer），後台共用 `AdminLayout`（側邊欄 + Outlet，含 token 驗證）。

| Path | Layout | Page | Description |
| --- | --- | --- | --- |
| `/` | `FrontLayout` | `FitnessLanding` | Dark mode 健身 Landing Page |
| `/products` | `FrontLayout` | `ProductList` | 前台產品列表（分類篩選、搜尋、分頁） |
| `/product/:id` | `FrontLayout` | `ProductDetail` | 前台產品詳情（圖片畫廊、數量選擇） |
| `/cart` | `FrontLayout` | `Cart` | 購物車頁面 |
| `/login` | — | `Login` | 登入頁面 |
| `/admin/products` | `AdminLayout` | `AdminProducts` | 後台產品 CRUD 管理 |
| `/admin/orders` | `AdminLayout` | `AdminOrders` | 後台訂單列表 |
| `/admin/coupons` | `AdminLayout` | `AdminCoupons` | 後台優惠券管理 |
| `*` | `FrontLayout` | `NotFound` | 404 頁面 |

## Project Structure

```
src/
├── main.tsx                # createHashRouter + RouterProvider 入口
├── routes/index.tsx        # 路由表（匯出 routes 陣列）
├── layouts/
│   ├── FrontLayout.tsx     # 前台 Layout（Navbar + Outlet + Footer）
│   └── AdminLayout.tsx     # 後台 Layout（側邊欄 + Outlet，含驗證）
├── assets/style.css        # Tailwind + 自定義動畫與霓虹光效
├── dto/                    # API 型別定義（Product、Cart、Auth）
├── types/                  # Modal 型別
├── pages/
│   ├── FitnessLanding.tsx  # 健身首頁
│   ├── ProductList.tsx     # 前台產品列表
│   ├── ProductDetail.tsx   # 前台產品詳情
│   ├── Cart.tsx            # 購物車頁面
│   ├── Login.tsx           # 登入頁面
│   ├── AdminProducts.tsx   # 後台產品管理
│   ├── AdminOrders.tsx     # 後台訂單列表
│   ├── AdminCoupons.tsx    # 後台優惠券管理
│   └── NotFound.tsx        # 404 頁面
└── components/
    ├── Pagination.tsx      # 通用分頁
    ├── ProductModal.tsx    # 後台 CRUD Modal
    └── fitness/            # 前台共用元件
```

## API

**前台（Public）**

- `GET /api/{path}/products` - 產品列表（支援分頁與分類篩選）
- `GET /api/{path}/product/{id}` - 單一產品詳情
- `POST /api/{path}/cart` - 加入購物車
- `GET /api/{path}/cart` - 取得購物車
- `PUT /api/{path}/cart/{id}` - 更新購物車品項數量
- `DELETE /api/{path}/cart/{id}` - 刪除購物車品項
- `DELETE /api/{path}/carts` - 清空購物車

**後台（Admin，需認證）**

- `POST /admin/signin` - 登入
- `POST /api/user/check` - 驗證 token
- `GET /api/{path}/admin/products` - 管理產品列表
- `POST /api/{path}/admin/product` - 新增產品
- `PUT /api/{path}/admin/product/{id}` - 更新產品
- `DELETE /api/{path}/admin/product/{id}` - 刪除產品

## Scripts

```bash
npm run dev       # 開發伺服器（HMR）
npm run build     # TypeScript 檢查 + 打包
npm run lint      # ESLint 靜態分析
npm run preview   # 預覽 production build
npm run deploy    # 部署至 GitHub Pages
```

## Deploy

```bash
npm run deploy
```
