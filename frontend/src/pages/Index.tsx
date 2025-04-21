import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import TodoItem from "@/components/TodoItem";
import TodoInput from "@/components/TodoInput";
import { api, Todo } from "@/services/api";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const Index: React.FC = () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    // 取得 todo 清單
    const {
        data: todos,
        isLoading,
        isError,
    } = useQuery<Todo[]>({
        queryKey: ["todos"],
        queryFn: api.fetchTodos,
        staleTime: 1000 * 30,
    });

    // 新增 todo
    const addTodoMutation = useMutation({
        mutationFn: (title: string) => api.createTodo(title),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todos"] });
            toast({ title: "新增成功", description: "已新增 todo" });
        },
        meta: {
            onError: (error: Error) =>
                toast({
                    title: "新增失敗",
                    description: error.message,
                }),
        },
    });

    // 刪除 todo
    const deleteTodoMutation = useMutation({
        mutationFn: (id: string) => api.deleteTodo(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todos"] });
            toast({ title: "刪除成功", description: "已刪除此項目" });
        },
        meta: {
            onError: (error: Error) =>
                toast({
                    title: "刪除失敗",
                    description: error.message,
                }),
        },
    });

    // 切換完成狀態
    const toggleDoneMutation = useMutation({
        mutationFn: (todo: Todo) => api.updateTodoDone(todo._id, !todo.done),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todos"] });
        },
        meta: {
            onError: (error: Error) =>
                toast({
                    title: "更新失敗",
                    description: error.message,
                }),
        },
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-accent py-8 font-sans">
            <div className="mx-auto max-w-lg px-4">
                <h1 className="text-3xl font-bold mb-5 text-primary text-center tracking-tight drop-shadow-sm">
                    Todo List
                </h1>
                <div className="bg-white/90 shadow-md rounded-xl p-7">
                    <TodoInput
                        onAdd={(title) => addTodoMutation.mutate(title)}
                        loading={addTodoMutation.isPending}
                    />

                    <section className="space-y-2">
                        {isLoading ? (
                            <div className="py-9 flex justify-center">
                                <Loader2
                                    className="animate-spin text-primary"
                                    size={32}
                                />
                            </div>
                        ) : isError ? (
                            <div className="py-8 text-center text-red-500">
                                無法取得 todo 清單，請稍後再試。
                            </div>
                        ) : (
                            todos?.map((todo) => (
                                <TodoItem
                                    key={todo._id}
                                    todo={todo}
                                    onToggleDone={() =>
                                        toggleDoneMutation.mutate(todo)
                                    }
                                    onDelete={(id) =>
                                        deleteTodoMutation.mutate(id)
                                    }
                                    loading={
                                        toggleDoneMutation.isPending ||
                                        deleteTodoMutation.isPending
                                    }
                                />
                            ))
                        )}
                    </section>
                </div>
                <footer className="text-xs mt-8 text-gray-400 text-center select-none">
                    Powered by React, Tailwind, shadcn • 部署於 Zeabur
                </footer>
            </div>
        </div>
    );
};

export default Index;
