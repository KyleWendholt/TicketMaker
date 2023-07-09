import { api } from "./session";
import type { ListEnvelope } from "./session";

export interface User {
  _id: string | null;
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  role: string;
  profilePic: string;
}



export function autocompleteUsers(query: string) {
  return api<ListEnvelope<User>>("users/autocomplete/" + query);
}

export function getUsers() {
  return api<ListEnvelope<User>>("users");
}

export function getUser(username: string){
  return api<User>("users/" + username);
}

export function addUser(user:{
  firstname: string;
  lastname: string;
  username: string;
  profilePic: string;
  isAdmin: boolean;
  password: string;
}) {
  return api<User>("users", user, "POST");
}

export function deleteUser(user: User) {
  return api<{sucess: boolean}>("users", user, "DELETE");
}

export function updateUser(updatedUser: User, username: string) {
  return api("users/" + username, updatedUser, "PATCH");
}
