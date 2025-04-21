export type Todo = {
    _id: string;
    title: string;
    description?: string;
    done: boolean;
    created_at: string;
    updated_at: string;
};

const BASE_URL = "http://localhost:8000";

async function fetchTodos(): Promise<Todo[]> {
    const res = await fetch(`${BASE_URL}/todos/`);
    if (!res.ok) throw new Error("無法取得 todo 清單");
    return res.json();
}

async function createTodo(title: string): Promise<Todo> {
    const res = await fetch(`${BASE_URL}/todos/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, done: false }),
    });
    if (!res.ok) throw new Error("新增 todo 失敗");
    return res.json();
}

async function deleteTodo(id: string): Promise<void> {
    const res = await fetch(`${BASE_URL}/todos/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("刪除 todo 失敗");
}

async function updateTodoDone(id: string, done: boolean): Promise<Todo> {
    console.log("Updating todo:", { id, done });
    const res = await fetch(`${BASE_URL}/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ done }),
    });
    if (!res.ok) {
        const text = await res.text();
        console.error("Update failed:", text);
        throw new Error("更新 todo 失敗");
    }
    return res.json();
}

export const api = {
    fetchTodos,
    createTodo,
    deleteTodo,
    updateTodoDone,
};
