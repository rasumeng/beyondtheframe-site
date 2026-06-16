import { redis } from '@/lib/redis';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { event, label, meta } = body || {};

    if (!event) {
      return NextResponse.json(
        { success: false, error: 'Missing event name' },
        { status: 400 }
      );
    }

    const entry = {
      event,
      label: label || null,
      meta: meta || null,
      ts: new Date().toISOString(),
    };

    console.log('[Track]', JSON.stringify(entry));
    await redis.lpush('btf:tracking:events', JSON.stringify(entry));

    return NextResponse.json({ success: true }, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  } catch (error) {
    console.error('[Track] Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
