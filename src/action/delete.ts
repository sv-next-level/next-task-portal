import axios from "axios";

import { URL } from "@/config/env";

export async function deleteTodo(data: any) {
  try {
    const method: string = "DELETE";
    const url: string = URL.GATEWAY;
    const headers = {
      "Content-Type": "application/json",
    };

    const response = await axios(url, {
      data: data,
      method: method,
      headers: headers,
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
