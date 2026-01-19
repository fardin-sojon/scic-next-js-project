import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Item from '@/models/Item';

export async function GET() {
  await connectDB();
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch items' }, { status: 500 });
  }
}

export async function POST(request) {
  await connectDB();
  try {
    const body = await request.json();
    console.log('📝 Received item data:', body);

    const item = await Item.create(body);
    console.log('✅ Item created in DB:', item);

    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error('❌ Error creating item:', error);
    return NextResponse.json({ error: 'Failed to create item' }, { status: 400 });
  }
}
