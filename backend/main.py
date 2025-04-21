from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import os

from routes import todo

# 載入環境變數
load_dotenv()

# 從環境變量獲取 MongoDB URI 或使用默認值
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
DB_NAME = os.getenv("DB_NAME", "todo_db")

# 創建 MongoDB 客戶端
client = AsyncIOMotorClient(MONGO_URI)
db = client[DB_NAME]

app = FastAPI(title="TodoList API")

# CORS 設定
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 註冊路由
app.include_router(todo.router, prefix="/todos", tags=["todos"])

@app.on_event("startup")
async def startup_db_client():
    try:
        # 測試資料庫連線
        await client.admin.command('ping')
        print("Successfully connected to MongoDB!")
        print(f"Database: {DB_NAME}")
    except Exception as e:
        print(f"Error connecting to MongoDB: {e}")
        raise e

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)