import { NextResponse } from 'next/server';
import { getFeaturedClients } from '@/lib/mongodb';

export async function GET() {
  try {
    const clients = await getFeaturedClients();
    return NextResponse.json(clients);
  } catch (error) {
    console.error('Error fetching clients:', error);
    return NextResponse.json(
      { error: 'Failed to fetch clients' },
      { status: 500 }
    );
  }
}