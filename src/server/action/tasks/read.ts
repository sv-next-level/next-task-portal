"use server";

import { axiosGenericRequest } from "@/nextjs/server/client";

import { API } from "@/common/api/next-task-service/routes";

import { Task } from "@/data/schema";

export async function getTasks(): Promise<Task[]> {
  try {
    const route = API.v1.tasks.data;
    const url: string = route.getPath();
    const method: string = route.method.GET;

    const response = await axiosGenericRequest({
      url: url,
      method: method,
    });

    const res = response.data;
    return res;
  } catch (error: any) {
    if ("error" in error) {
      throw new Error(error.error);
    }
    throw new Error(error.message);
  }
}
