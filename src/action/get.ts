import axios from "axios";

import { envConfig } from "@/config/env";

export async function getTodos() {
  try {
    const method: string = "GET";
    const url: string = envConfig.BASE_URL;
    const headers = {
      "Content-Type": "application/json",
    };

    const response = await axios(url, {
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
