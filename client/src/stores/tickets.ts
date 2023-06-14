import { api } from "./session";
import type { ListEnvelope } from "./session";
import type { User } from "./users";

export interface Ticket {
  _id: string;
  title: string;
  owner_id: string;
  creationTime: string;
  status: string;
  content: { description: string; updates: TicketUpdate[] };
}

export interface TicketUpdate {
  timestamp: Date;
  content: string;
  author_id: string;
  private: boolean;
  previousStatus: string;
  newStatus: string;
}


export function getTickets() {
  return api<ListEnvelope<Ticket>>("tickets");
}

export function userTickets(id: string) {
  return api<ListEnvelope<Ticket>>("tickets/" + id);
}

export function addTicket(user: User, date: string, description: string) {
  const Ticket = {
    userID: user._id,
    time: date,
    content: {
      description: description,
    },
  };
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
