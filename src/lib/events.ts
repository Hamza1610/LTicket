import { Event, CreateEventRequest } from '../types/events';
import { LndClient } from './lnd';
import { BitcoinClient } from './bitcoin';

export class EventManager {
  private lndClient: LndClient;
  private bitcoinClient: BitcoinClient;
  private events: Map<string, Event>;

  constructor(lndClient: LndClient, bitcoinClient: BitcoinClient) {
    this.lndClient = lndClient;
    this.bitcoinClient = bitcoinClient;
    this.events = new Map();
  }

  async createEvent(request: CreateEventRequest): Promise<Event> {
    // Validate request
    if (request.price <= 0) {
      throw new Error('Price must be greater than 0');
    }
    if (request.quantity <= 0) {
      throw new Error('Quantity must be greater than 0');
    }

    const event: Event = {
      id: crypto.randomUUID(),
      ...request,
      remainingTickets: request.quantity,
      organizer: 'current-user', // TODO: Get from auth context
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'draft',
    };

    // Store event
    this.events.set(event.id, event);
    return event;
  }

  async publishEvent(eventId: string): Promise<Event> {
    const event = this.events.get(eventId);
    if (!event) {
      throw new Error('Event not found');
    }

    if (event.status !== 'draft') {
      throw new Error('Only draft events can be published');
    }

    event.status = 'published';
    event.updatedAt = new Date().toISOString();
    this.events.set(eventId, event);

    return event;
  }

  async getEvent(eventId: string): Promise<Event> {
    const event = this.events.get(eventId);
    if (!event) {
      throw new Error('Event not found');
    }
    return event;
  }

  async listEvents(): Promise<Event[]> {
    return Array.from(this.events.values());
  }

  async updateEvent(eventId: string, updates: Partial<Event>): Promise<Event> {
    const event = this.events.get(eventId);
    if (!event) {
      throw new Error('Event not found');
    }

    if (event.status !== 'draft') {
      throw new Error('Only draft events can be updated');
    }

    // Prevent updating certain fields
    const { id, createdAt, organizer, ...allowedUpdates } = updates;

    const updatedEvent = {
      ...event,
      ...allowedUpdates,
      updatedAt: new Date().toISOString(),
    };

    this.events.set(eventId, updatedEvent);
    return updatedEvent;
  }

  async cancelEvent(eventId: string): Promise<Event> {
    const event = this.events.get(eventId);
    if (!event) {
      throw new Error('Event not found');
    }

    if (event.status === 'completed' || event.status === 'cancelled') {
      throw new Error('Event cannot be cancelled');
    }

    event.status = 'cancelled';
    event.updatedAt = new Date().toISOString();
    this.events.set(eventId, event);

    return event;
  }

  async completeEvent(eventId: string): Promise<Event> {
    const event = this.events.get(eventId);
    if (!event) {
      throw new Error('Event not found');
    }

    if (event.status !== 'published') {
      throw new Error('Only published events can be completed');
    }

    event.status = 'completed';
    event.updatedAt = new Date().toISOString();
    this.events.set(eventId, event);

    return event;
  }

  async getEventStats(eventId: string): Promise<{
    totalTickets: number;
    soldTickets: number;
    remainingTickets: number;
    revenue: number;
  }> {
    const event = this.events.get(eventId);
    if (!event) {
      throw new Error('Event not found');
    }

    const soldTickets = event.quantity - event.remainingTickets;
    const revenue = soldTickets * event.price;

    return {
      totalTickets: event.quantity,
      soldTickets,
      remainingTickets: event.remainingTickets,
      revenue,
    };
  }

  async searchEvents(query: {
    name?: string;
    location?: string;
    dateRange?: { start: string; end: string };
    status?: Event['status'];
  }): Promise<Event[]> {
    return Array.from(this.events.values()).filter(event => {
      if (query.name && !event.name.toLowerCase().includes(query.name.toLowerCase())) {
        return false;
      }
      if (query.location && !event.location.toLowerCase().includes(query.location.toLowerCase())) {
        return false;
      }
      if (query.dateRange) {
        const eventDate = new Date(event.date);
        const startDate = new Date(query.dateRange.start);
        const endDate = new Date(query.dateRange.end);
        if (eventDate < startDate || eventDate > endDate) {
          return false;
        }
      }
      if (query.status && event.status !== query.status) {
        return false;
      }
      return true;
    });
  }
} 