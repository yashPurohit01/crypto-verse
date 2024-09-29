// app/api/ohlc/route.ts
import { NextResponse } from 'next/server';
import axios from 'axios';

const COINGECKO_API_BASE = 'https://api.coingecko.com/api/v3/coins';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const coinId = searchParams.get('coinId');
  const currency = searchParams.get('currency');
  const days = searchParams.get('days');

  if (!coinId || !currency || !days) {
    return NextResponse.json({ error: 'Missing required query parameters' }, { status: 400 });
  }

  try {
    const response = await axios.get(`${COINGECKO_API_BASE}/${coinId}/ohlc`, {
      params: {
        vs_currency: currency,
        days: days,
      },
    });

    return NextResponse.json(response.data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to fetch OHLC data' }, { status: 500 });
  }
}
