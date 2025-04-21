import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface Props {
    onAdd: (title: string) => void;
    loading?: boolean;
}

const TodoInput: React.FC<Props> = ({ onAdd, loading }) => {
    const [title, setTitle] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;
        onAdd(title.trim());
        setTitle("");
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
            <Input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="新增待辦事項..."
                className="flex-1"
                disabled={loading}
            />
            <Button type="submit" disabled={loading || !title.trim()}>
                新增
            </Button>
        </form>
    );
};

export default TodoInput;
