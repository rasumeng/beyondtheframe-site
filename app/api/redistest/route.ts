import { redis } from '@/lib/redis';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { value } = body;

    await redis.set('test:simple', value || 'hello');

    const readBack = await redis.get('test:simple');

    return NextResponse.json({ success: true, value, readBack, type: typeof readBack });
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
