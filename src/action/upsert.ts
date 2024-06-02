import axios from "axios";

export async function upsertTodo(data: any) {
  try {
    const method: string = "POST";
    const url: string = "http://localhost:3001/";
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
