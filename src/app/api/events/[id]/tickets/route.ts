import { NextResponse } from "next/server";
import { Event, Ticket } from "@/types/events";

// In-memory storage for events and tickets (replace with database in production)
let events: Event[] = [];
let tickets: Ticket[] = [];

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { quantity, paymentMethod } = body;

    // Validate request
    if (!quantity || quantity < 1) {
      return NextResponse.json(
        { error: "Invalid ticket quantity" },
        { status: 400 }
      );
    }

    // Find event
    const event = events.find((e) => e.id === params.id);
    if (!event) {
      return NextResponse.json(
        { error: "Event not found" },
        { status: 404 }
      );
    }

    // Check ticket availability
    if (event.remainingTickets < quantity) {
      return NextResponse.json(
        { error: "Not enough tickets available" },
        { status: 400 }
      );
    }

    // Check payment method
    if (event.paymentMethod !== "both" && event.paymentMethod !== paymentMethod) {
      return NextResponse.json(
        { error: `Payment method ${paymentMethod} not accepted for this event` },
        { status: 400 }
      );
    }

    // Calculate total price
    const totalPrice = event.price * quantity;

    // TODO: Generate payment request based on payment method
    // For now, we'll just return a mock payment request
    const paymentRequest = {
      id: crypto.randomUUID(),
      amount: totalPrice,
      method: paymentMethod,
      status: "pending",
      expiresAt: new Date(Date.now() + 15 * 60 * 1000).toISOString(), // 15 minutes
    };

    // Create pending tickets
    const newTickets: Ticket[] = Array(quantity).fill(null).map(() => ({
      id: crypto.randomUUID(),
      eventId: event.id,
      owner: "pending", // Will be updated after payment
      status: "pending",
      transactionId: "",
      paymentMethod,
      purchaseDate: new Date().toISOString(),
      transferHistory: [],
      qrCode: "", // Will be generated after payment
    }));

    // Add tickets to storage
    tickets.push(...newTickets);

    // Update event's remaining tickets
    event.remainingTickets -= quantity;

    return NextResponse.json({
      paymentRequest,
      tickets: newTickets,
    });
  } catch (error) {
    console.error("Error creating tickets:", error);
    return NextResponse.json(
      { error: "Failed to create tickets" },
      { status: 500 }
    );
  }
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Find event
    const event = events.find((e) => e.id === params.id);
    if (!event) {
      return NextResponse.json(
        { error: "Event not found" },
        { status: 404 }
      );
    }

    // Get all tickets for this event
    const eventTickets = tickets.filter((t) => t.eventId === params.id);

    return NextResponse.json(eventTickets);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch tickets" },
      { status: 500 }
    );
  }
} 