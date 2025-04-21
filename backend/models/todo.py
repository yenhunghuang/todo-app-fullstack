from pydantic import BaseModel, Field, GetJsonSchemaHandler
from pydantic.json_schema import JsonSchemaValue
from typing import Optional, Any, Annotated
from datetime import datetime
from bson import ObjectId

class PyObjectId(str):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v, handler):
        if not isinstance(v, str) and not isinstance(v, ObjectId):
            raise ValueError("Invalid ObjectId")
        if isinstance(v, str) and not ObjectId.is_valid(v):
            raise ValueError("Invalid ObjectId")
        return str(v)

    @classmethod
    def __get_pydantic_json_schema__(
        cls,
        _schema: JsonSchemaValue,
        _handler: GetJsonSchemaHandler,
    ) -> JsonSchemaValue:
        return {"type": "string"}

class TodoBase(BaseModel):
    title: str
    description: Optional[str] = None
    done: bool = False

class TodoCreate(TodoBase):
    pass

class TodoUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    done: Optional[bool] = None

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "done": True
                }
            ]
        }
    }

class Todo(TodoBase):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    model_config = {
        "populate_by_name": True,
        "json_encoders": {ObjectId: str},
        "arbitrary_types_allowed": True
    } 