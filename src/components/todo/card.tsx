"use client";

import { format } from "date-fns";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Todo } from "@/interface/todo";
import { Button } from "@/components/ui/button";

interface TodoCardProps {
  todo: Todo;
  onDone: (id: string) => void;
  onUpdate: (todo: Todo) => void;
  onDelete: (todo: Todo) => void;
}

export default function TodoCard(props: Readonly<TodoCardProps>) {
  return (
    <Card className={`${props.todo.done && "bg-white-500"} my-4 w-[350px]`}>
      <div
        onClick={() => {
          props.onDone(String(props.todo.id));
        }}
        className="cursor-pointer"
      >
        {props.todo.done ? (
          <CardHeader>
            <CardTitle className={`${props.todo.done && "line-through"}`}>
              {props.todo.title}
            </CardTitle>
          </CardHeader>
        ) : (
          <>
            <CardHeader>
              <CardTitle>{props.todo.title}</CardTitle>
              <CardDescription>
                {format(props.todo.expiry, "PPP")}
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm">
              {props.todo.description}
            </CardContent>
          </>
        )}
      </div>

      {!props.todo.done ? (
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => {
              props.onDelete(props.todo);
            }}
          >
            Delete
          </Button>
          <Button
            onClick={() => {
              props.onUpdate(props.todo);
            }}
          >
            Update
          </Button>
        </CardFooter>
      ) : null}
    </Card>
  );
}
