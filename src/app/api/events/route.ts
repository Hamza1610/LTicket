import { NextResponse } from 'next/server';
import { CreateEventRequest } from '@/types/events';
import { EventManager } from '@/lib/events';
import { LndClient } from '@/lib/lnd';
import { BitcoinClient } from '@/lib/bitcoin';

// Initialize clients and manager
const lndClient = new LndClient();
const bitcoinClient = new BitcoinClient();
const eventManager = new EventManager(lndClient, bitcoinClient);

export async function POST(request: Request) {
  try {
    const body: CreateEventRequest = await request.json();
    const event = await eventManager.createEvent(body);
    return NextResponse.json(event);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create event' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
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

    const events = await eventManager.searchEvents(query);
    return NextResponse.json(events);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch events' },
      { status: 500 }
    );
  }
} 