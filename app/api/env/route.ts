import { NextResponse } from 'next/server';

export async function GET() {
  const keys = Object.keys(process.env).filter(k =>
    k.includes('UPSTASH') || k.includes('KV_') || k.includes('REDIS')
  );
  const env = keys.reduce((acc, k) => {
    acc[k] = process.env[k] ? `${(process.env[k] || '').substring(0, 8)}...` : null;
    return acc;
  }, {} as Record<string, string | null | undefined>);

  return NextResponse.json({ envKeys: keys, env });
}
