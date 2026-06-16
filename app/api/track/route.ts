import { redis } from '@/lib/redis';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const metrics = await redis.get('btr:metrics');

    let parsedMetrics = [];
    if (Array.isArray(metrics)) {
      parsedMetrics = metrics;
    } else if (typeof metrics === 'string') {
      try {
        parsedMetrics = JSON.parse(metrics);
      } catch {
        parsedMetrics = [];
      }
    }

    return NextResponse.json({ metrics: parsedMetrics });
  } catch (error) {
    return NextResponse.json({ metrics: [], error: 'Failed to fetch metrics' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { event, label, meta } = body;

    if (!event) {
      return NextResponse.json({ error: 'Event name is required' }, { status: 400 });
    }

    const newEntry = {
      id: Date.now(),
      event,
      label: label || null,
      meta: meta || null,
      ts: new Date().toISOString(),
    };

    const raw = await redis.get('btr:metrics');
    let existing: MetricEntry[] = [];
    if (Array.isArray(raw)) {
      existing = raw;
    } else if (typeof raw === 'string') {
      try { existing = JSON.parse(raw); } catch { /* skip malformed */ }
    }

    await redis.set('btr:metrics', JSON.stringify([newEntry, ...existing]));

    return NextResponse.json(
      { success: true, entry: newEntry },
      {
        status: 201,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      }
    );
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: 'Failed to add metric', detail: msg }, { status: 500 });
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

interface MetricEntry {
  id: number;
  event: string;
  label?: string | null;
  meta?: Record<string, unknown> | null;
  ts: string;
}
