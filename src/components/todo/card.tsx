"use client";

import { format } from "date-fns";

import { TrashIcon } from "@/nextjs/assets";
import { cn } from "@/nextjs/lib/utils";

import { Button } from "@/nextjs/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/nextjs/components/ui/card";

import { Todo } from "@/interface/todo";

interface TodoCardProps {
  todo: Todo;
  index: number;
  onDone: (index: number) => void;
  onUpdate: (index: number) => void;
  onDelete: (index: number) => void;
}

export default function TodoCard(props: Readonly<TodoCardProps>) {
  return (
    <Card className={`${props.todo.done && "bg-white"} my-4`}>
      <CardFooter className="flex justify-between py-4">
        <div
          onClick={() => {
            props.onDone(props.index);
          }}
          className="w-full cursor-pointer"
        >
          <CardTitle className={`${props.todo.done && "line-through"}`}>
            {props.todo.title}
          </CardTitle>
          <CardDescription
            className={cn(
              props.todo.expiry < new Date().getTime() && "text-destructive",
            )}
          >
            {format(props.todo.expiry, "PPP")}
          </CardDescription>
        </div>
        <Button
          variant="secondary"
          className="z-50 hover:bg-destructive hover:text-accent"
          onClick={() => {
            props.onDelete(props.index);
          }}
        >
          <TrashIcon />
        </Button>
      </CardFooter>
      {!props.todo.done ? (
        <div
          className="cursor-pointer pb-4"
          onClick={() => {
            props.onUpdate(props.index);
          }}
        >
          <CardContent className="max-h-[100px] overflow-auto py-0 text-sm">
            {props.todo.description}
          </CardContent>
        </div>
      ) : null}
    </Card>
  );
}
