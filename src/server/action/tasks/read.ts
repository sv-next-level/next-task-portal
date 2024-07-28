"use server";

import { axiosGenericRequest } from "@/nextjs/server/client";

import { API } from "@/common/api/next-task-service/routes";

import { Task } from "@/data/schema";
import { tasks } from "@/data/tasks";

export async function getTasks(): Promise<Task[]> {
  try {
    const route = API.v1.tasks.data;
    const url: string = route.getPath();
    const method: string = route.method.GET;

    return tasks;
    const response = await axiosGenericRequest({
      url: url,
      method: method,
    });

    const res = response.data;
    console.log("🚀 ~ getTasks ~ res:", res);
    console.log("🚀 ~ getTasks ~ response:", response);

    if (res.error) {
      throw res.error;
    }

    return res.data;
  } catch (error: any) {
    console.log("🚀 ~ getTasks ~ error:", error);
    return [];
    if ("error" in error) {
      throw new Error(error.error);
    }
    throw new Error(error.message);
  }
}
