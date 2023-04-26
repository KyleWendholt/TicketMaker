import { api } from "./session";
import type { ListEnvelope, User } from "./users"

export class Ticket {
  public _id: string = "";
  public userID: string = "";
  public time: string = "";
  public content: string = "";
}

export function getTickets() {
  return api<ListEnvelope<Ticket>>("tickets");
}

export function userTickets(id: string) {
  return api<ListEnvelope<Ticket>>("tickets/" + id);
}

export function addTicket(user: User, date: string, content: string) {
  const Ticket = {
    userID: user._id,
    time: date,
    content: content,
  }
  console.log(Ticket);
  return api<Ticket>("tickets", Ticket, "POST");
}

export function updateTicket(id: string, Ticket: Ticket) {
  return api<Ticket>("tickets/" + id, Ticket, "PATCH");
}

export function deleteTicket(id: string) {
  console.log("delete" + id);
  return api<boolean>("tickets/" + id, null, "DELETE");
}