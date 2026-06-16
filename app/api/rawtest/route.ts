import { NextRequest, NextResponse } from 'next/server';

export async function POST() {
  try {
    const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || 'NONE';
    const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || 'NONE';

    // Test GET on a simple key
    const getRes = await fetch(`${url}/get/test:simple`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const getText = await getRes.text();
    const getStatus = getRes.status;

    // Test SET
    const setRes = await fetch(`${url}/set/test:simple2`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify('raw_test_value'),
    });
    const setText = await setRes.text();
    const setStatus = setRes.status;

    return NextResponse.json({
      url: url.substring(0, 20) + '...',
      token: token.substring(0, 8) + '...',
      get: { status: getStatus, text: getText },
      set: { status: setStatus, text: setText },
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
