export interface Event {
  id: string;              // Unique identifier for the event
  name: string;            // Event name
  description: string;     // Detailed event description
  date: string;            // Event date in ISO format
  location: string;        // Event venue
  price: number;           // Ticket price in satoshis
  quantity: number;        // Total number of tickets available
  remainingTickets: number; // Number of unsold tickets
  organizer: string;       // Event organizer's identifier
  createdAt: string;       // Creation timestamp
  updatedAt: string;       // Last update timestamp
  status: 'draft' | 'published' | 'cancelled' | 'completed'; // Event lifecycle state
  paymentMethod: 'lightning' | 'onchain' | 'both'; // Accepted payment methods
}

export interface Ticket {
  id: string;              // Unique ticket identifier
  eventId: string;         // Associated event ID
  owner: string;           // Current ticket owner
  status: 'pending' | 'confirmed' | 'transferred' | 'used'; // Ticket state
  transactionId: string;   // Bitcoin transaction ID
  paymentMethod: 'lightning' | 'onchain'; // Payment method used
  purchaseDate: string;    // Purchase timestamp
  transferHistory: TicketTransfer[]; // History of ticket transfers
  qrCode: string;          // QR code for ticket verification
}

export interface TicketTransfer {
  from: string;            // Previous owner
  to: string;              // New owner
  transactionId: string;   // Transfer transaction ID
  timestamp: string;       // Transfer timestamp
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