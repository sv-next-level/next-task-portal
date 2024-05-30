"use client";

import { useState } from "react";
import { PlusIcon } from "@radix-ui/react-icons";

import { Todo } from "@/interface/todo";
import TodoCard from "@/components/todo/card";
import TodoModal from "@/components/todo/modal";
import TodoAlert from "@/components/todo/alert";
import { Button } from "@/components/ui/button";

const todos: Todo[] = [
  {
    id: "1",
    title: "wake up 1",
    description: "do excercise",
    expiry: "2024-05-30T01:57:32.595Z",
    done: false,
  },
  {
    id: "2",
    title: "wake up 2",
    description: "do excercise",
    expiry: "2024-05-30T01:58:04.284Z",
    done: false,
  },
];

export default function Home() {
  const [todoList, setTodoList] = useState<Todo[]>(todos);
  const [todo, setTodo] = useState<Todo | undefined>(undefined);
  const [openAlert, setOpenAlert] = useState<boolean | undefined>(undefined);
  const [openModal, setOpenModal] = useState<boolean | undefined>(undefined);

  const onDone = (id: string) => {
    setTodoList((prev) => {
      const updatedTodoList = prev.map((todo: Todo) => {
        if (todo.id === id) {
          todo.done = !todo.done;
        }
        return todo;
      });

      return updatedTodoList;
    });
  };

  const onUpdate = (todo: Todo) => {
    setOpenModal(true);
    setTodo(todo);
  };

  const onDelete = (todo: Todo) => {
    setOpenAlert(true);
    setTodo(todo);
  };

  const confirmDelete = () => {
    setTodoList((prev) => {
      return prev.filter((filetTodo: Todo) => {
        return filetTodo.id !== todo?.id;
      });
    });
    setTodo(undefined);
  };

  const upsertTodo = (todo: Todo) => {
    if (todo?.id) {
      // update todo
      setTodoList((prev) => {
        const updatedTodoList = prev.map((prevTodo: Todo) => {
          if (prevTodo.id === todo.id) {
            return todo;
          }
          return prevTodo;
        });
        return updatedTodoList;
      });
    } else {
      // add todo
      setTodoList((prev) => {
        return [
          ...prev,
          {
            ...todo,
            done: false,
            id: todo.title,
          },
        ];
      });
    }

    setTodo(undefined);
  };

  return (
    <>
      <div className="absolute bottom-4 left-4 ">
        {!openModal && !openAlert ? (
          <Button
            size="icon"
            variant="outline"
            onClick={() => setOpenModal(true)}
            className="size-14 rounded-full"
          >
            <PlusIcon className="size-6" />
          </Button>
        ) : null}
        {openModal ? (
          <TodoModal
            open={openModal}
            setOpen={setOpenModal}
            todo={todo}
            setTodo={setTodo}
            onConfirm={upsertTodo}
          />
        ) : null}
      </div>

      <div>
        {openAlert ? (
          <TodoAlert
            open={openAlert}
            setOpen={setOpenAlert}
            onConfirm={confirmDelete}
          />
        ) : null}
      </div>
      <div className="item-center my-4 flex justify-center">
        <div>
          {todoList.map((todo: Todo) => {
            return (
              <TodoCard
                key={todo.id}
                todo={todo}
                onDone={onDone}
                onUpdate={onUpdate}
                onDelete={onDelete}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
