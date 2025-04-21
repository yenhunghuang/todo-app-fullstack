import { Todo } from "@/services/api";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";

interface Props {
    todo: Todo;
    onToggleDone: (todo: Todo) => void;
    onDelete: (id: string) => void;
    loading?: boolean;
}

const TodoItem: React.FC<Props> = ({
    todo,
    onToggleDone,
    onDelete,
    loading,
}) => {
    return (
        <div className="flex items-center gap-2 p-2 border rounded">
            <Checkbox
                checked={todo.done}
                onCheckedChange={() => onToggleDone(todo)}
                disabled={loading}
            />
            <span
                className={`flex-1 ${
                    todo.done ? "line-through text-completed" : ""
                }`}
            >
                {todo.title}
            </span>
            <Button
                variant="destructive"
                size="sm"
                onClick={() => onDelete(todo._id)}
                disabled={loading}
            >
                刪除
            </Button>
        </div>
    );
};

export default TodoItem;
