import { redis } from '@/lib/redis';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log('[API] Fetching reviews from Upstash...');
    const reviews = await redis.get('btr:reviews');
    console.log('[API] Raw reviews data:', reviews);
    console.log('[API] Type of reviews:', typeof reviews);
    
    // Handle different data formats
    let parsedReviews = [];
    if (Array.isArray(reviews)) {
      parsedReviews = reviews;
    } else if (typeof reviews === 'string') {
      try {
        parsedReviews = JSON.parse(reviews);
      } catch (e) {
        console.error('[API] Failed to parse reviews string:', e);
        parsedReviews = [];
      }
    }
    
    console.log('[API] Parsed reviews count:', parsedReviews.length);
    return NextResponse.json({ reviews: parsedReviews });
  } catch (error) {
    console.error('[API] Failed to fetch reviews:', error);
    return NextResponse.json({ reviews: [], error: 'Failed to fetch reviews' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, message, type, rating, email } = body;

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const newReview = {
      id: Date.now(),
      name: name || 'Anonymous',
      text: message,
      date: new Date().toISOString().split('T')[0],
      type: type || 'general',
      rating: rating || null,
      email: email || null,
    };

    const existing = (await redis.get('btr:reviews') as Review[] | null) || [];
    const updated = [newReview, ...existing];

    await redis.set('btr:reviews', updated);

    return NextResponse.json(
      { success: true, review: newReview },
      { 
        status: 201,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        }
      }
    );
  } catch (error) {
    console.error('Failed to add review:', error);
    return NextResponse.json({ error: 'Failed to add review' }, { status: 500 });
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

interface Review {
  id: number;
  name: string;
  text: string;
  date: string;
  type?: string;
  rating?: number | null;
  email?: string | null;
}