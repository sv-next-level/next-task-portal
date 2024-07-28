import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { CalendarIcon } from "@/nextjs/assets";
import { cn } from "@/nextjs/lib/utils";

import { Button } from "@/nextjs/components/ui/button";
import { Calendar } from "@/nextjs/components/ui/calendar";
import {
  DialogResponsiveClose,
  DialogResponsiveContent,
  DialogResponsiveDescription,
  DialogResponsiveFooter,
  DialogResponsiveHeader,
  DialogResponsiveTitle,
} from "@/nextjs/components/ui/dialog-responsive";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/nextjs/components/ui/select";
import { Textarea } from "@/nextjs/components/ui/textarea";

import { Wrapper as ThemeWrapper } from "@/nextjs/components/themes/wrapper";

import { title } from "@/common/functions";

import { taskSchema } from "@/data/schema";
import { PRIORITIES } from "@/functions";

interface TaskModalProps {
  setOpen: (open: boolean) => void;
  task?: z.infer<typeof taskSchema>;
}

export function TaskModal(props: TaskModalProps) {
  const form = useForm<z.infer<typeof taskSchema>>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: props.task?.title,
      priority: props.task?.priority,
      description: props.task?.description,
      due: props.task?.due ? new Date(props.task.due).getTime() : undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof taskSchema>) => {
    const task = {
      ...props.task,
      title: values.title,
      priority: values.priority,
      description: values.description,
      due: new Date(values.due).getTime(),
    };

    console.log("🚀 ~ onSubmit ~ task:", task);
    props.setOpen(false);
  };

  return (
    <DialogResponsiveContent>
      <ThemeWrapper>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="md:space-y-6">
            <DialogResponsiveHeader>
              <DialogResponsiveTitle className="mb-3">
                Task
              </DialogResponsiveTitle>
              <DialogResponsiveDescription className="max-h-96 overflow-y-auto p-px">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex text-left">Title</FormLabel>
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
                        <FormLabel className="flex text-left">
                          Description
                        </FormLabel>
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
                    name="priority"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex text-left">
                          Priority
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a priority" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Object.values(PRIORITIES).map((priority) => {
                              return (
                                <SelectItem key={priority} value={priority}>
                                  {title(priority)}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="due"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="flex text-left">
                          Due Date
                        </FormLabel>
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
                                  <span>pick a due date</span>
                                )}
                                <CalendarIcon className="ml-auto size-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={new Date(field.value)}
                              onSelect={(date) => {
                                field.onChange(date?.getTime());
                              }}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </DialogResponsiveDescription>
            </DialogResponsiveHeader>
            <DialogResponsiveFooter>
              <Button type="submit">Save</Button>
              <DialogResponsiveClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogResponsiveClose>
            </DialogResponsiveFooter>
          </form>
        </Form>
      </ThemeWrapper>
    </DialogResponsiveContent>
  );
}
