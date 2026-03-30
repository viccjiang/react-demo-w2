# RepX - Fitness App

React 練習專案，包含健身 APP Landing Page（前台）與後台管理系統。全站採用 Dark Mode 霓虹科技風格。

## Tech Stack

- React 19 + TypeScript
- Vite 7
- Tailwind CSS 4
- React Router 7 (Hash Mode, Data Mode)
- Redux Toolkit + React Redux (全域狀態管理、訊息通知)
- React Hook Form (表單驗證)
- react-loader-spinner (Loading 效果)
- Axios (API 服務層封裝)
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

## Features

### 前台

- 健身 APP Landing Page（Dark Mode 霓虹科技風格）
- 產品列表（分類篩選、搜尋、分頁）
- 產品詳情（圖片畫廊、數量選擇、加入購物車）
- 購物車（數量調整、刪除、清空）
- 結帳表單（React Hook Form 驗證：姓名、Email、電話、地址、留言）
- 訂單成功頁（3 秒倒數自動跳轉）
- Toast 訊息通知（Redux Toolkit，操作成功/失敗即時回饋，2 秒自動消失）
- Loading 效果（react-loader-spinner）

### 後台

- 登入驗證（React Hook Form：Email 格式 + 密碼至少 6 碼）
- 登出功能（清除 token + API 登出）
- 產品 CRUD 管理（Modal 新增/編輯/刪除）
- 訂單列表（付款狀態、分頁）
- 優惠券管理（待實作）
- Cookie + Token 認證，401 自動重導登入
- Toast 訊息通知（操作成功/失敗即時回饋）

## State Management (Redux Toolkit)

使用 Redux Toolkit 管理全域訊息通知系統：

- **Store**（`src/store/store.ts`）：`configureStore` 集中管理 state
- **Message Slice**（`src/slice/messageSlice.ts`）：訊息的新增/移除 + `createAsyncThunk` 2 秒自動消失
- **MessageToast**（`src/components/MessageToast.tsx`）：全域 Toast 元件，固定右上角顯示
- **useMessage Hook**（`src/hooks/useMessage.ts`）：封裝 `showSuccess()` / `showError()`，元件只表達意圖

```
元件呼叫 showSuccess / showError
  → useMessage dispatch createAsyncMessage
    → messageSlice 新增訊息
      → MessageToast 從 Redux state 讀取並渲染
        → 2 秒後自動移除（也可手動關閉）
```

## Routes

| Path | Layout | Page | Description |
| --- | --- | --- | --- |
| `/` | `FrontLayout` | `FitnessLanding` | 健身 Landing Page |
| `/products` | `FrontLayout` | `ProductList` | 產品列表（分類、搜尋、分頁） |
| `/product/:id` | `FrontLayout` | `ProductDetail` | 產品詳情（圖片畫廊、數量選擇） |
| `/cart` | `FrontLayout` | `Cart` | 購物車 + 結帳表單 |
| `/order-success` | `FrontLayout` | `OrderSuccess` | 訂單成功頁（3 秒跳轉） |
| `/login` | — | `Login` | 登入頁面 |
| `/admin/products` | `AdminLayout` | `AdminProducts` | 後台產品 CRUD 管理 |
| `/admin/orders` | `AdminLayout` | `AdminOrders` | 後台訂單列表 |
| `/admin/coupons` | `AdminLayout` | `AdminCoupons` | 後台優惠券管理（待實作） |
| `*` | `FrontLayout` | `NotFound` | 404 頁面 |

## Project Structure

```
src/
├── main.tsx                # createHashRouter + RouterProvider + Redux Provider
├── routes/index.tsx        # 路由表
├── store/store.ts          # Redux store（configureStore）
├── slice/
│   └── messageSlice.ts     # 訊息通知 slice（createMessage、removeMessage、createAsyncMessage）
├── hooks/
│   └── useMessage.ts       # 訊息通知 hook（showSuccess、showError）
├── services/               # API 服務層（集中管理所有 API 呼叫）
│   ├── api.ts              # axios instance（api / apiAuth）+ interceptors
│   ├── auth.ts             # 認證 API（login、checkUserAuth、logout）
│   ├── products.ts         # 產品 API（前台 + 後台 CRUD）
│   ├── cart.ts             # 購物車 API
│   └── orders.ts           # 訂單 API（submitOrder、getAdminOrders）
├── layouts/
│   ├── FrontLayout.tsx     # 前台 Layout（Navbar + Outlet + Footer）
│   └── AdminLayout.tsx     # 後台 Layout（側邊欄 + Outlet，含驗證 + 登出）
├── assets/style.css        # Tailwind + 自定義動畫與霓虹光效
├── dto/                    # API 型別定義（Product、Cart、Auth、Order）
├── types/                  # Modal 型別
├── pages/
│   ├── FitnessLanding.tsx  # 健身首頁
│   ├── ProductList.tsx     # 前台產品列表
│   ├── ProductDetail.tsx   # 前台產品詳情
│   ├── Cart.tsx            # 購物車 + 結帳表單
│   ├── OrderSuccess.tsx    # 訂單成功頁
│   ├── Login.tsx           # 登入頁面
│   ├── AdminProducts.tsx   # 後台產品管理
│   ├── AdminOrders.tsx     # 後台訂單列表
│   ├── AdminCoupons.tsx    # 後台優惠券管理
│   └── NotFound.tsx        # 404 頁面
└── components/
    ├── Pagination.tsx      # 通用分頁
    ├── ProductModal.tsx    # 後台 CRUD Modal
    ├── FullPageLoader.tsx  # 全頁 Loading 遮罩
    ├── MessageToast.tsx    # 全域 Toast 訊息通知元件
    └── fitness/            # 前台共用元件
```

## API

**前台（Public）**

- `GET /api/{path}/products` - 產品列表（分頁、分類篩選）
- `GET /api/{path}/product/{id}` - 單一產品詳情
- `POST /api/{path}/cart` - 加入購物車（相同產品自動累加）
- `GET /api/{path}/cart` - 取得購物車
- `PUT /api/{path}/cart/{id}` - 更新購物車品項數量
- `DELETE /api/{path}/cart/{id}` - 刪除購物車品項
- `DELETE /api/{path}/carts` - 清空購物車
- `POST /api/{path}/order` - 結帳送出訂單

**後台（Admin，需認證）**

- `POST /admin/signin` - 登入
- `POST /logout` - 登出
- `POST /api/user/check` - 驗證 token
- `GET /api/{path}/admin/products` - 管理產品列表
- `POST /api/{path}/admin/product` - 新增產品
- `PUT /api/{path}/admin/product/{id}` - 更新產品
- `DELETE /api/{path}/admin/product/{id}` - 刪除產品
- `GET /api/{path}/admin/orders` - 訂單列表

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
