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
      } catch (e) {
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

    // Use raw REST API with proper Upstash pipeline format
    const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || '';
    const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || '';

    // Read existing value as raw text
    const getRes = await fetch(`${url}/get/btr:metrics`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const getText = await getRes.text();
    let existing: MetricEntry[] = [];
    try {
      const getParsed = JSON.parse(getText);
      if (getParsed.result && typeof getParsed.result === 'string') {
        existing = JSON.parse(getParsed.result);
      }
    } catch {
      // skip if empty or invalid
    }

    const updated = [newEntry, ...existing];

    // Write - Upstash REST API expects value as raw JSON in the body
    const setRes = await fetch(`${url}/set/btr:metrics`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updated),
    });
    const setText = await setRes.text();

    // Try to parse but don't crash on failure
    let setParsed: unknown;
    try { setParsed = JSON.parse(setText); } catch { setParsed = setText; }

    return NextResponse.json(
      { success: true, entry: newEntry, response: setParsed },
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
