export const API_ROOT = import.meta.env.VITE_API_ROOT;
import session from "../stores/session";

export default function myFetch<T>(
  url: string,
  data: any = null,
  method?: string
): Promise<T> {
  const options: RequestInit = {
    method: method ?? (data ? "POST" : "GET"),
    mode: "cors",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + session.token,
    },
    body: data ? JSON.stringify(data) : undefined,
  };
  return fetch(API_ROOT + url, options).then((x) => {
    if (x.ok) {
      return x.json();
    } else {
      return x.json().then((y) => {
        throw y;
      });
    }
  });
}
