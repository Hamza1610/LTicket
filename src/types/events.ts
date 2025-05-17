export interface Event {
  id: string;
  name: string;
  description: string;
  date: string;
  location: string;
  price: number;
  quantity: number;
  remainingTickets: number;
  organizer: string;
  createdAt: string;
  updatedAt: string;
  status: 'draft' | 'published' | 'cancelled' | 'completed';
  paymentMethod: 'lightning' | 'onchain' | 'both';
}

export interface Ticket {
  id: string;
  eventId: string;
  owner: string;
  status: 'pending' | 'confirmed' | 'transferred' | 'used';
  transactionId: string;
  paymentMethod: 'lightning' | 'onchain';
  purchaseDate: string;
  transferHistory: TicketTransfer[];
  qrCode: string;
}

export interface TicketTransfer {
  from: string;
  to: string;
  transactionId: string;
  timestamp: string;
}

export interface CreateEventRequest {
  name: string;
  description: string;
  date: string;
  location: string;
  price: number;
  quantity: number;
  paymentMethod: 'lightning' | 'onchain' | 'both';
}

export interface CreateTicketRequest {
  eventId: string;
  quantity: number;
  paymentMethod: 'lightning' | 'onchain';
}

export interface TransferTicketRequest {
  ticketId: string;
  newOwner: string;
} 