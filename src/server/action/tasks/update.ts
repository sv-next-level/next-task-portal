"use server";

import { axiosGenericRequest } from "@/nextjs/server/client";

import { API } from "@/common/api/next-task-service";

import { Task } from "@/data/schema";

export async function updateTask(taskId: string, data: Task) {
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

    if (res.error) {
      throw res.error;
    }

    return res.data;
  } catch (error: any) {
    if ("error" in error) {
      throw new Error(error.error);
    }
    throw new Error(error.message);
  }
}

export async function updateTaskStatus(taskId: string, data: Task) {
  try {
    const route = API.v1.tasks.taskId.data;
    const url: string = route.getPath(taskId);
    const method: string = route.method.PATCH;

    const response = await axiosGenericRequest({
      url: url,
      data: data,
      method: method,
    });

    const res = response.data;

    if (res.error) {
      throw res.error;
    }

    return res.data;
  } catch (error: any) {
    if ("error" in error) {
      throw new Error(error.error);
    }
    throw new Error(error.message);
  }
}

export async function updateTaskPriority(taskId: string, data: Task) {
  try {
    const route = API.v1.tasks.taskId.data;
    const url: string = route.getPath(taskId);
    const method: string = route.method.PATCH;

    const response = await axiosGenericRequest({
      url: url,
      data: data,
      method: method,
    });

    const res = response.data;

    if (res.error) {
      throw res.error;
    }

    return res.data;
  } catch (error: any) {
    if ("error" in error) {
      throw new Error(error.error);
    }
    throw new Error(error.message);
  }
}
