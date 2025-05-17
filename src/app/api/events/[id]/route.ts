import { NextResponse } from 'next/server';
import { EventManager } from '@/lib/events';
import { LndClient } from '@/lib/lnd';
import { BitcoinClient } from '@/lib/bitcoin';

// Initialize clients and manager
const lndClient = new LndClient();
const bitcoinClient = new BitcoinClient();
const eventManager = new EventManager(lndClient, bitcoinClient);

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const event = await eventManager.getEvent(params.id);
    return NextResponse.json(event);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch event' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const updates = await request.json();
    const event = await eventManager.updateEvent(params.id, updates);
    return NextResponse.json(event);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update event' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const event = await eventManager.cancelEvent(params.id);
    return NextResponse.json(event);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to cancel event' },
      { status: 500 }
    );
  }
} 