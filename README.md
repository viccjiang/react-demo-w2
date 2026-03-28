# FitPulse - Fitness App

React 練習專案，包含健身 APP Landing Page 與後台產品管理系統。

## Tech Stack

- React 19 + TypeScript
- Vite 7
- Tailwind CSS 4
- React Router 7 (Data Mode)
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
VITE_API_BASE=
VITE_API_PATH=
```

## Routes

| Path            | Page           | Description                          |
| --------------- | -------------- | ------------------------------------ |
| `/`             | FitnessLanding | Dark mode 健身 Landing Page          |
| `/products`     | ProductList    | 前台產品列表（分類篩選、搜尋、分頁） |
| `/products/:id` | ProductDetail  | 前台產品詳情（圖片畫廊、數量選擇）   |
| `/admin`        | AdminDashboard | 後台產品 CRUD 管理（需登入）         |

## Project Structure

```
src/
├── main.tsx                # RouterProvider 入口
├── router.tsx              # createBrowserRouter 路由定義（lazy loading）
├── assets/style.css        # Tailwind + 自定義動畫與霓虹光效
├── dto/                    # API 型別定義
├── types/                  # Modal 型別
├── pages/
│   ├── FitnessLanding.tsx  # 健身首頁
│   ├── ProductList.tsx     # 前台產品列表
│   ├── ProductDetail.tsx   # 前台產品詳情
│   └── AdminDashboard.tsx  # 後台管理
└── components/
    ├── Pagination.tsx      # 通用分頁
    ├── ProductModal.tsx    # 後台 CRUD Modal
    └── fitness/            # Landing Page 區塊元件
```

## API

**前台（Public）**

- `GET /api/{path}/products` - 產品列表（支援分頁與分類篩選）
- `GET /api/{path}/product/{id}` - 單一產品詳情

**後台（Admin，需認證）**

- `POST /admin/signin` - 登入
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
