import { NextResponse } from 'next/server';
import { EventManager } from '@/lib/events';
import { lndClient } from '@/lib/lnd';
import { bitcoin } from '@/lib/bitcoin';

// Initialize clients and manager
// const lndClient = new LndClient();
// const bitcoinClient = new bitcoin();
const eventManager = new EventManager(lndClient, bitcoin);

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const stats = await eventManager.getEventStats(params.id);
    return NextResponse.json(stats);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch event stats' },
      { status: 500 }
    );
  }
} 