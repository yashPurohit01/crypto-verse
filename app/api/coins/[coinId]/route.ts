import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { coinId: string } }) {
  const { searchParams } = new URL(request.url);
  const vsCurrency = searchParams.get('vs_currency') || 'usd'; // Default to USD if no currency provided

  const { coinId } = params;

  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}?vs_currency=${vsCurrency}`
    );
    const data = await response.json();

    // Return the coin details in JSON format
    return NextResponse.json(data);
  } catch (error: any) {
    console.error(`Error fetching details for coin ${coinId}:`, error.message);
    return NextResponse.json({ error: `Failed to fetch details for coin ${coinId}` }, { status: 500 });
  }
}
