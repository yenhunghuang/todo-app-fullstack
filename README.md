# 全堆疊待辦事項應用

這是一個使用 Python FastAPI 後端和 TypeScript React 前端開發的全堆疊待辦事項應用程式。

## 功能

-   創建待辦事項
-   查看所有待辦事項
-   標記待辦事項為已完成/未完成
-   刪除待辦事項

## 專案資訊

**後端 GitHub**: [fastapi-mongodb-todolist](https://github.com/yenhunghuang/fastapi-mongodb-todolist)
**前端 URL**: https://lovable.dev/projects/42232a25-a643-41dc-a052-08c70ca714e6

## 技術棧

### 後端

-   **框架**: FastAPI
-   **資料庫**: MongoDB
-   **驅動程式**: Motor (非同步 MongoDB 驅動)
-   **資料驗證**: Pydantic

### 前端

-   **框架**: React
-   **建構工具**: Vite
-   **語言**: TypeScript
-   **UI 框架**: shadcn-ui
-   **樣式**: Tailwind CSS

## 目錄結構

```
/
├── backend/
│   ├── main.py        # 主應用程式入口
│   ├── db/            # 資料庫連接設定
│   │   └── mongo.py   # MongoDB 連接設定
│   ├── models/        # 資料模型
│   │   └── todo.py    # Todo 資料模型
│   ├── routes/        # API 路由
│   │   └── todo.py    # Todo 相關的路由
│   └── requirements.txt  # 相依套件列表
├── frontend/          # React 前端專案
└── README.md         # 專案說明
```

## API 端點

-   `GET /todos/`: 獲取所有待辦事項
-   `POST /todos/`: 創建新的待辦事項
-   `PUT /todos/{id}/`: 更新特定待辦事項
-   `DELETE /todos/{id}/`: 刪除特定待辦事項

## 安裝與運行

### 前置需求

-   Python 3.x
-   Node.js 和 npm
-   MongoDB

### 後端設定

1. 進入 backend 目錄:

```
cd backend
```

2. 安裝所需套件:

```
pip install -r requirements.txt
```

3. 啟動後端服務:

```
PYTHONPATH=$PWD python -m uvicorn main:app --reload
```

後端服務將運行在 http://localhost:8000

### 前端設定

1. 進入 frontend 目錄:

```
cd frontend
```

2. 安裝所需套件:

```
npm install
```

3. 啟動前端開發服務器:

```
npm run dev
```

前端應用將運行在 http://localhost:3000

## API 文檔

啟動後端後，可以在以下位置訪問 API 文檔:

-   Swagger UI: http://localhost:8000/docs
-   ReDoc: http://localhost:8000/redoc

## 項目結構

```
.
├── backend/                 # 後端 Python FastAPI 應用
│   ├── db/                  # 資料庫連接設定
│   ├── models/              # Pydantic 數據模型
│   ├── routes/              # API 路由
│   └── main.py              # 應用入口點
└── frontend/                # 前端 React 應用
    ├── public/              # 靜態資源
    └── src/                 # 源碼目錄
        ├── components/      # React 組件
        ├── services/        # API 服務
        └── App.tsx          # 主要 App 組件
```

## 授權

MIT
