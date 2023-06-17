import { api } from "./session";
import type { ListEnvelope } from "./session";
import type { User } from "./users";

export interface Ticket {
  _id: string;
  title: string;
  owner_id: string;
  creationTime: string;
  responsibility: string;
  timestamp: Date;
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

export function getProblemTickets() {
  return api<ListEnvelope<Ticket>>("tickets/problems");
}

export function userTickets(id: string) {
  return api<ListEnvelope<Ticket>>("tickets/" + id);
}

export function addTicket(title: string, description: string, privacy: boolean, status: string) {
  const Ticket = {
    title: title,
    private: privacy,
    status: status,
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
