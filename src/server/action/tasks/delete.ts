"use server";

import { axiosGenericRequest } from "@/nextjs/server/client";

import { API } from "@/common/api/next-task-service";

export async function deleteTasks(taskIds: string[]) {
  try {
    const route = API.v1.tasks.taskIds.data;
    const url: string = route.getPath(taskIds);
    const method: string = route.method.DELETE;

    const response = await axiosGenericRequest({
      url: url,
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
