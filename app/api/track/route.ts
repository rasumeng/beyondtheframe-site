import { redis } from '@/lib/redis';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log('[API] Fetching metrics from Upstash...');
    const metrics = await redis.get('btr:metrics');
    console.log('[API] Raw metrics data:', metrics);
    console.log('[API] Type of metrics:', typeof metrics);

    let parsedMetrics = [];
    if (Array.isArray(metrics)) {
      parsedMetrics = metrics;
    } else if (typeof metrics === 'string') {
      try {
        parsedMetrics = JSON.parse(metrics);
      } catch (e) {
        console.error('[API] Failed to parse metrics string:', e);
        parsedMetrics = [];
      }
    }

    console.log('[API] Parsed metrics count:', parsedMetrics.length);
    return NextResponse.json({ metrics: parsedMetrics });
  } catch (error) {
    console.error('[API] Failed to fetch metrics:', error);
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

    // Use raw REST API to bypass SDK serialization
    const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || '';
    const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || '';

    // Read existing
    const getRes = await fetch(`${url}/get/btr:metrics`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const getData = await getRes.json() as { result?: string | null };
    const rawResult = getData.result;
    let existing: MetricEntry[] = [];
    if (rawResult) {
      try { existing = JSON.parse(rawResult as string); } catch { /* skip */ }
    }

    const updated = [newEntry, ...existing];

    // Write
    const setRes = await fetch(`${url}/set/btr:metrics`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updated),
    });
    const setData = await setRes.json();
    console.log('[API] SET response:', setData);

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
    console.error('Failed to add metric:', error);
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
