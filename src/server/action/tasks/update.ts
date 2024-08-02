"use server";

import { axiosGenericRequest } from "@/nextjs/server/client";

import { API } from "@/common/api/next-task-service";

import { Task } from "@/data/schema";
import { PRIORITIES, STATUS } from "@/functions";

export async function updateTask(taskId: string, data: Task): Promise<Task> {
  try {
    const route = API.v1.tasks.taskId.data;
    const url: string = route.getPath(taskId);
    const method: string = route.method.PUT;

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

export async function updateTaskStatus(taskId: string, data: STATUS) {
  try {
    const route = API.v1.tasks.taskId.status.data;
    const url: string = route.getPath(taskId);
    const method: string = route.method.PATCH;

    const response = await axiosGenericRequest({
      url: url,
      data: {
        status: data,
      },
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

export async function updateTaskPriority(taskId: string, data: PRIORITIES) {
  try {
    const route = API.v1.tasks.taskId.priority.data;
    const url: string = route.getPath(taskId);
    const method: string = route.method.PATCH;

    const response = await axiosGenericRequest({
      url: url,
      data: {
        priority: data,
      },
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
