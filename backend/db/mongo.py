from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv

# 載入環境變數
load_dotenv()

# 獲取 MongoDB 連接字串
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
DB_NAME = os.getenv("DB_NAME", "todo_db")

# 創建 MongoDB 客戶端
client = AsyncIOMotorClient(MONGO_URI)

# 獲取資料庫實例
db = client[DB_NAME]