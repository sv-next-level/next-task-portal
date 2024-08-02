"use server";

import { axiosGenericRequest } from "@/nextjs/server/client";

import { API } from "@/common/api/next-task-service";

import { Task } from "@/data/schema";

export async function createTask(data: Task) {
  try {
    const route = API.v1.tasks.data;
    const url: string = route.getPath();
    const method: string = route.method.POST;

    const response = await axiosGenericRequest({
      url: url,
      data: data,
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
