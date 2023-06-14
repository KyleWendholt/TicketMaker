import myFetch from "../services/myFetch";
import type { User } from "./users";

import { computed, reactive } from "vue";

const session = reactive({
  user: null as User | null,
  loading: 0,
  error: null as string | null,
  messages: [] as Message[],
});

export function login(username: string, password: string) {
  api<{JWTtoken:string}>("/auth", { username, password }, "POST").then((response) => {
    localStorage.setItem("JWTtoken", response.JWTtoken);
  });
  const user_id = localStorage.getItem("JWTtoken");
  return api<User>("/users/" + user_id);
}


export function logout() {
  session.user = null;
}

export async function api<T>(url: string, data: any = null, method?: string) {
  session.loading++;
  setError(null);
  try {
    return await myFetch<T>(url, data, method);
  } catch (error: any) {
    setError(error.message ?? (error as string));
  } finally {
    session.loading--;
  }
  return {} as T;
}

export const isLoading = computed(() => !!session.loading);

export function setError(error: string | null) {
  session.error = error;
  if (error) {
    session.messages.push({ type: "danger", text: error });
  }
}
export interface Message {
  text: string;
  type: "danger" | "warning" | "success" | "info";
}

export interface ListEnvelope<T> {
  list: T[];
  total: number;
}

export default session;
