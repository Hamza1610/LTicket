import { NextResponse } from 'next/server';
import { Event } from "@/types/events";

// In-memory storage for events (replace with database in production)
let events: Event[] = [];

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const event = events.find((e) => e.id === params.id);
    
    if (!event) {
      return NextResponse.json(
        { error: "Event not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(event);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch event" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const eventIndex = events.findIndex((e) => e.id === params.id);

    if (eventIndex === -1) {
      return NextResponse.json(
        { error: "Event not found" },
        { status: 404 }
      );
    }

    const updatedEvent = {
      ...events[eventIndex],
      ...body,
      updatedAt: new Date().toISOString(),
    };

    events[eventIndex] = updatedEvent;
    return NextResponse.json(updatedEvent);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update event" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const eventIndex = events.findIndex((e) => e.id === params.id);

    if (eventIndex === -1) {
      return NextResponse.json(
        { error: "Event not found" },
        { status: 404 }
      );
    }

    events.splice(eventIndex, 1);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete event" },
      { status: 500 }
    );
  }
} 