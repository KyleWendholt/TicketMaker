import { api } from "./session";
import type { ListEnvelope } from "./session";
import type { User } from "./users";

export interface Ticket {
  _id: string;
  title: string;
  creatorEmail: string;
  requestorEmail: string;
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

export function getTicketsByResponsibility() {
  return api<ListEnvelope<Ticket>>("tickets/responsibility", null, "GET");
}

export function userTickets(id: string) {
  return api<ListEnvelope<Ticket>>("tickets/" + id);
}

export function addTicket(ticket: Ticket) {
  return api<Ticket["_id"]>("tickets", {ticket}, "POST");
}

export function updateTicket(id: string, update: TicketUpdate) {
  return api<Ticket>("tickets/" + id, update, "PATCH");
}

export function deleteTicket(id: string) {
  return api<boolean>("tickets/" + id, null, "DELETE");
}

export function getTicket(id: string) {
  return api<Ticket>("tickets/" + id);
}

export function openTicketWin(id: string) {
  window.open("/tickets/" + id, `Ticket ${id}`, "popup");
}