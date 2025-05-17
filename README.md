# Bitcoin-Based Event Ticketing System

A decentralized ticketing platform powered by Bitcoin, allowing event organizers to create and manage events with Bitcoin-based tickets. Each ticket is cryptographically tied to a verifiable Bitcoin transaction, enabling secure ownership verification, resale, and fraud prevention.

## Overview

This application demonstrates how to:

- Create and manage events with Bitcoin-based ticketing
- Generate and verify tickets using Bitcoin transactions
- Handle ticket payments via Lightning Network or on-chain transactions
- Enable secure ticket resale and transfers
- Verify ticket ownership using blockchain explorers
- Build a modern UI for event discovery and ticket management

## Prerequisites

- Node.js v18 or later
- Access to an LND node (we use [Polar](https://lightningpolar.com/) for development)
- Access to a Bitcoin Core node
- Basic understanding of TypeScript and React
- Basic understanding of the Lightning Network and Bitcoin blockchain

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/Hamza1610/bitcoin-ticketing-system.git
cd bitcoin-ticketing-system
```

2. Install dependencies:

```bash
npm install
```

3. Configure your LND connection:

   - Open `src/lib/lnd.ts`
   - Update the `DEFAULT_CONFIG` with your LND node's:
     - `rpcServer` address
     - `tlsCertPath` location
     - `macaroonPath` location

4. Configure your Bitcoin Core connection:

   - Open `src/lib/bitcoin.ts`
   - Update the `DEFAULT_CONFIG` with your Bitcoin node's:
     - `host` address
     - `port` number
     - `username` and `password`
     - `network` type (mainnet/testnet)

5. Start the development server:

```bash
npm run dev
```

## Project Structure

```bash
src/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── events/        # Event management endpoints
│   │   ├── tickets/       # Ticket-related endpoints
│   │   └── bitcoin/       # Bitcoin-related endpoints
│   ├── events/            # Event pages
│   │   ├── create/        # Event creation
│   │   ├── [id]/          # Event details
│   │   └── page.tsx       # Event listing
│   └── components/        # React components
├── lib/
│   ├── lnd.ts            # LND gRPC client
│   ├── bitcoin.ts        # Bitcoin Core client
│   ├── events.ts         # Event management logic
│   └── tickets.ts        # Ticket management logic
└── types.ts              # TypeScript type definitions
```

## Key Features

### 1. Event Management

- Create events with metadata (name, date, location, price)
- Set ticket quantities and pricing
- Manage event status and visibility

### 2. Ticket Issuance

- Generate unique tickets as Bitcoin transactions
- Support both Lightning and on-chain payments
- Embed ticket metadata in transactions
- Optional Ordinal inscriptions for unique ticket identities

### 3. Ticket Verification

- QR code generation for tickets
- Blockchain-based ownership verification
- Real-time payment status monitoring

### 4. Resale & Transfers

- Peer-to-peer ticket transfer system
- Secure resale using Bitcoin scripts
- Transaction history tracking

## API Reference

### Events

```typescript
POST /api/events
Body: {
  name: string;
  date: string;
  location: string;
  price: number;
  quantity: number;
  description: string;
}

GET /api/events
Response: Event[]

GET /api/events/[id]
Response: Event
```

### Tickets

```typescript
POST /api/tickets
Body: {
  eventId: string;
  quantity: number;
  paymentMethod: "lightning" | "onchain";
}

GET /api/tickets/[id]
Response: Ticket

POST /api/tickets/[id]/transfer
Body: {
  newOwner: string;
}
```

## Best Practices

1. **Security**
   - Secure storage of event credentials
   - Proper validation of ticket ownership
   - Protection against double-spending

2. **User Experience**
   - Clear event discovery interface
   - Simple ticket purchase flow
   - Intuitive resale process

3. **Blockchain Integration**
   - Efficient transaction management
   - Proper fee handling
   - Reliable payment confirmation

## Contributing

This is an open-source project. Contributions are welcome:

1. Fork the repository
2. Create a feature branch
3. Submit a pull request

## License

MIT License - Feel free to use this code for learning and development.
