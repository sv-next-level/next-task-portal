"use client";

import { useEffect, useState } from "react";
import { PlusIcon } from "@radix-ui/react-icons";

import { Todo } from "@/interface/todo";
import { getTodos } from "@/action/get";
import { upsertTodo } from "@/action/upsert";
import { deleteTodo } from "@/action/delete";
import TodoCard from "@/components/todo/card";
import TodoModal from "@/components/todo/modal";
import TodoAlert from "@/components/todo/alert";
import { Button } from "@/components/ui/button";
import TodoToast from "@/components/todo/toast";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";

export default function Home() {
  const { toast } = useToast();
  const [todoNumber, setTodoNumber] = useState<number>(-1);
  const [todoList, setTodoList] = useState<Todo[] | undefined>(undefined);
  const [openAlert, setOpenAlert] = useState<boolean | undefined>(undefined);
  const [openModal, setOpenModal] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    getTodos()
      .then((todos) => {
        setTodoList(todos);
      })
      .catch((error) => {
        TodoToast({
          toast: toast,
          variant: "destructive",
          description: error?.message ?? error,
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onDone = (todoNumber: number) => {
    if (!todoList) return;
    upsertTodo({
      _id: todoList[todoNumber]._id,
      done: !todoList[todoNumber].done,
    })
      .then((todo) => {
        setTodoList((prev) => {
          return prev?.map((prevTodo: Todo) => {
            if (prevTodo._id === todo._id) {
              return todo;
            }
            return prevTodo;
          });
        });
      })
      .catch((error) => {
        TodoToast({
          toast: toast,
          variant: "destructive",
          description: error?.message ?? error,
        });
      });
  };

  const onUpdate = (todoNumber: number) => {
    setOpenModal(true);
    setTodoNumber(todoNumber);
  };

  const onDelete = (todoNumber: number) => {
    setOpenAlert(true);
    setTodoNumber(todoNumber);
  };

  const confirmDelete = (todoId: string) => {
    deleteTodo({ _id: todoId })
      .then((deletedTodo) => {
        setTodoList((prev) => {
          return prev?.filter((filetTodo: Todo) => {
            return filetTodo._id !== deletedTodo?._id;
          });
        });
        TodoToast({
          toast: toast,
          description: "Deleted!",
        });
      })
      .catch((error) => {
        TodoToast({
          toast: toast,
          variant: "destructive",
          description: error?.message ?? error,
        });
      });
  };

  const onUpsertTodo = (todo: Todo) => {
    if (todo?._id) {
      upsertTodo(todo)
        .then((updatedTodo) => {
          setTodoList((prev) => {
            const updatedTodoList = prev?.map((prevTodo: Todo) => {
              if (prevTodo._id === updatedTodo._id) {
                return updatedTodo;
              }
              return prevTodo;
            });
            return updatedTodoList;
          });
          TodoToast({
            toast: toast,
            description: "Updated!",
          });
        })
        .catch((error) => {
          TodoToast({
            toast: toast,
            variant: "destructive",
            description: error?.message ?? error,
          });
        });
    } else {
      upsertTodo(todo)
        .then((updatedTodo) => {
          setTodoList((prev) => {
            return [...(prev ? prev : []), updatedTodo];
          });
          TodoToast({
            toast: toast,
            description: "Created!",
          });
        })
        .catch((error) => {
          TodoToast({
            toast: toast,
            variant: "destructive",
            description: error?.message ?? error,
          });
        });
    }
  };

  return (
    <>
      <Toaster />

      {openModal ? (
        <TodoModal
          open={openModal}
          setOpen={setOpenModal}
          onConfirm={onUpsertTodo}
          todo={todoNumber > -1 && todoList ? todoList[todoNumber] : undefined}
        />
      ) : null}

      {openAlert ? (
        <TodoAlert
          open={openAlert}
          setOpen={setOpenAlert}
          onConfirm={confirmDelete}
          todoId={todoList?.[todoNumber]._id || ""}
        />
      ) : null}

      <div className="fixed bottom-4 left-4">
        {!openModal && !openAlert ? (
          <Button
            size="icon"
            onClick={() => {
              setTodoNumber(-1);
              setOpenModal(true);
            }}
            className="size-14 rounded-full"
          >
            <PlusIcon className="size-6" />
          </Button>
        ) : null}
      </div>

      <div className="m-10">
        {todoList &&
          todoList?.map((todo: Todo, index: number) => {
            return (
              <TodoCard
                todo={todo}
                index={index}
                key={todo._id}
                onDone={onDone}
                onUpdate={onUpdate}
                onDelete={onDelete}
              />
            );
          })}
      </div>
    </>
  );
}
