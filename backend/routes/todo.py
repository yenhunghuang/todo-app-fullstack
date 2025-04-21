from fastapi import APIRouter, HTTPException, status
from bson import ObjectId
from typing import List
from models.todo import TodoCreate, TodoUpdate, Todo
from db.mongo import db
from datetime import datetime

router = APIRouter()

@router.get("/", response_model=List[Todo])
async def get_todos():
    """獲取所有待辦事項"""
    todos = []
    cursor = db.todos.find({})
    async for document in cursor:
        todos.append(Todo(**document))
    return todos

@router.post("/", response_model=Todo, status_code=status.HTTP_201_CREATED)
async def create_todo(todo: TodoCreate):
    """創建新的待辦事項"""
    new_todo = {
        "_id": ObjectId(),
        "title": todo.title,
        "description": todo.description,
        "done": todo.done,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    }
    await db.todos.insert_one(new_todo)
    return Todo(**new_todo)

@router.put("/{id}", response_model=Todo)
async def update_todo(id: str, todo: TodoUpdate):
    """更新待辦事項"""
    print(f"Updating todo {id} with data: {todo.model_dump()}")
    try:
        object_id = ObjectId(id)
    except:
        print(f"Invalid ID format: {id}")
        raise HTTPException(status_code=400, detail="Invalid ID format")
    
    update_data = {k: v for k, v in todo.model_dump().items() if v is not None}
    if not update_data:
        print("No valid update data provided")
        raise HTTPException(status_code=400, detail="No valid update data provided")

    update_data["updated_at"] = datetime.utcnow()
    print(f"Update data: {update_data}")
    
    # 先檢查文檔是否存在
    existing_todo = await db.todos.find_one({"_id": object_id})
    if not existing_todo:
        print(f"Todo not found with id: {id}")
        raise HTTPException(status_code=404, detail="Todo not found")
    
    result = await db.todos.update_one(
        {"_id": object_id},
        {"$set": update_data}
    )
    
    if result.modified_count == 0:
        print("No changes made to the document")
    
    updated_todo = await db.todos.find_one({"_id": object_id})
    print(f"Updated todo: {updated_todo}")
    return Todo(**updated_todo)

@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_todo(id: str):
    """刪除待辦事項"""
    try:
        object_id = ObjectId(id)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"無效的ID格式: {str(e)}")
    
    # 先檢查文檔是否存在
    existing_todo = await db.todos.find_one({"_id": object_id})
    if not existing_todo:
        raise HTTPException(status_code=404, detail="找不到待辦事項")
    
    # 刪除待辦事項
    result = await db.todos.delete_one({"_id": object_id})
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="刪除失敗")
    
    return {"message": "待辦事項已成功刪除"} 