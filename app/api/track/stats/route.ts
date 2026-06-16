import { redis } from '@/lib/redis';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const raw = await redis.lrange('btr:metrics', 0, -1);

    const events: { event: string; label?: string; ts: string }[] = [];
    for (const item of raw) {
      if (typeof item === 'string') {
        try { events.push(JSON.parse(item)); } catch { /* skip malformed */ }
      }
    }

    const byEvent: Record<string, number> = {};
    const byLabel: Record<string, number> = {};
    let total = events.length;

    for (const e of events) {
      byEvent[e.event] = (byEvent[e.event] || 0) + 1;
      if (e.label) byLabel[e.label] = (byLabel[e.label] || 0) + 1;
    }

    return NextResponse.json({
      success: true,
      total,
      byEvent,
      byLabel,
    });
  } catch (error) {
    console.error('[Track Stats] Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}
