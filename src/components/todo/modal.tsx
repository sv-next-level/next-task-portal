"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { CalendarIcon } from "@/nextjs/assets";
import { cn } from "@/nextjs/lib/utils";

import { Button } from "@/nextjs/components/ui/button";
import { Calendar } from "@/nextjs/components/ui/calendar";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/nextjs/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/nextjs/components/ui/form";
import { Input } from "@/nextjs/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/nextjs/components/ui/popover";
import { Textarea } from "@/nextjs/components/ui/textarea";

import { Todo } from "@/interface/todo";
import { todoSchema } from "@/schema/todo";

interface TodoModalProps {
  todo: Todo | undefined;
  open: boolean | undefined;
  setOpen: (open: boolean | undefined) => void;
  onConfirm: (todo: Todo) => void;
}

export default function TodoModal(props: TodoModalProps) {
  const form = useForm<z.infer<typeof todoSchema>>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      title: props.todo?.title,
      description: props.todo?.description,
      expiry: props.todo?.expiry ? new Date(props.todo.expiry) : undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof todoSchema>) => {
    const todo: Todo = {
      ...props.todo,
      title: values.title,
      description: values.description,
      expiry: values.expiry.getTime(),
    };
    props.onConfirm(todo);
    props.setOpen(undefined);
  };

  return (
    <Dialog open={props.open}>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <DialogHeader>
              <DialogTitle></DialogTitle>
              <DialogDescription>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            disabled={false}
                            placeholder="wake up"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            disabled={false}
                            placeholder="do excercise"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="expiry"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Expiry Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  "pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground",
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>pick a expiry date</span>
                                )}
                                <CalendarIcon className="ml-auto size-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="sm:justify-between">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    props.setOpen(undefined);
                    // props.setTodo(undefined);
                  }}
                >
                  Close
                </Button>
              </DialogClose>
              <Button type="submit">Confirm</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
