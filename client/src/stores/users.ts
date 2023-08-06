import { api } from "./session";
import type { ListEnvelope } from "./session";

export interface User {
  _id: string;
  firstname: string;
  lastname: string;
  roles: string[];
  email: string;
  profilePicture: string;
}

export function autocompleteUsers(query: string) {
  return api<ListEnvelope<User>>("users/autocomplete/" + query);
}

export function getUsers() {
  return api<ListEnvelope<User>>("users");
}

export function getUserById(id: string){
  return api<User>("users/" + id);
}

export function addUser(user: User) {
  return api<User>("users", {user}, "POST");
}

export function deleteUser(_id: string) {
  return api<{sucess: boolean}>("users", _id, "DELETE");
}

export function updateUser(updatedUser: User, _id: string) {
  return api("users/" + _id, updatedUser, "PATCH");
}
