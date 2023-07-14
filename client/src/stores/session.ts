import router from "../router";
import myFetch from "../services/myFetch";
import type { User } from "./users";

import { computed, reactive } from "vue";

const session = reactive({
  user: null as User | null,
  loading: 0,
  error: null as { message: string; status?: number } | null,
  messages: [] as Message[],
  token: null as string | null,
});

export function login(username: string, password: string) {
  api<{ accessToken: string, user: User}>(
    "auth/login",
    { username, password },
    "POST"
  ).then((res) => {
    if (res.accessToken) {
      session.token = res.accessToken;
      session.user = res.user;
      router.push("/");
    }
  }
  );
}

export function register(user: User) {
  return api<{ accessToken: string, user:User }>("auth/register", { user }, "POST");
}

async function refreshToken() {
  return api<{ accessToken: string, user: User }>("auth/refresh", null, "POST");
}

export function logout() {
  clearError();
  session.user = null;
  session.token = null;
  router.push("/login");
  api("auth/logout", null, "POST").then(() => {
    console.log("logged out");
    return;
  }
  );
  return;
}

export async function api<T>(url: string, data: any = null, method?: string) {
  session.loading++;
  clearError();
  try {
    return await myFetch<T>(url, data, method);
  } catch (error: any) {
    setError(error.message ?? (error as string), error.status);
  } finally {
    session.loading--;
  }
  return {} as T;
}

export function reAuthenticate() {
  console.log("reauthenticating");
  refreshToken().then((res) => {
    if (res.accessToken) {
      session.token = res.accessToken;
      session.user = res.user;
      console.log("reauthenticated");
      clearError();
      return true;
    } else {
      console.log("reauthentication failed");
      //const error = session.error;
      logout();
      return false;
    }
  });
  return false;
}

export const isLoading = computed(() => !!session.loading);

export function setError(message: string, status?: number) {
  if (status) {
    session.error = { message, status };
  }
  session.messages.push({ type: "danger", text: message });
}

export function clearError() {
  session.error = null;
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
