import { NextResponse } from 'next/server';
import { Event } from '@/types/events';
import { EventManager } from '@/lib/events';
import { lndClient } from '@/lib/lnd';
import { bitcoin } from '@/lib/bitcoin';

// Initialize clients and manager
// const lndClient = new LndClient();
// const bitcoin = new BitcoinClient();
const eventManager = new EventManager(lndClient, bitcoin);

// In-memory storage for events (replace with database in production)
let events: Event[] = [];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    
    // If no search parameters are provided, return all events
    if (searchParams.toString() === '') {
      return NextResponse.json(events);
    }

    // Otherwise, perform search
    const query = {
      name: searchParams.get('name') || undefined,
      location: searchParams.get('location') || undefined,
      status: searchParams.get('status') as any || undefined,
      dateRange: searchParams.get('start') && searchParams.get('end')
        ? {
            start: searchParams.get('start')!,
            end: searchParams.get('end')!,
          }
        : undefined,
    };

    const filteredEvents = await eventManager.searchEvents(query);
    return NextResponse.json(filteredEvents);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch events' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ["name", "description", "date", "location", "price", "quantity", "paymentMethod"];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Create new event
    const newEvent: Event = {
      id: crypto.randomUUID(),
      name: body.name,
      description: body.description,
      date: new Date(body.date).toISOString(),
      location: body.location,
      price: parseInt(body.price),
      quantity: parseInt(body.quantity),
      remainingTickets: parseInt(body.quantity),
      organizer: "default", // TODO: Replace with actual organizer ID
      status: "draft",
      paymentMethod: body.paymentMethod,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    events.push(newEvent);
    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 }
    );
  }
} 