import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  // Extract query parameters from the URL
  const currency = searchParams.get('vs_currency') || 'usd'; // default to 'usd'
  const pageSize = searchParams.get('per_page') || '100'; // default to '100'
  const page = searchParams.get('page') || '1'; // default to '1'

  try {
    // Make the request to the CoinGecko API with dynamic parameters
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${pageSize}&page=${page}&sparkline=false`
    );
    const data = await response.json();

    // Return the fetched data as a JSON response
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error fetching coin list:', error.message);
    return NextResponse.json({ error: 'Failed to fetch coins list' }, { status: 500 });
  }
}
