import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';

export async function POST(request) {
  await connectDB();
  try {
    const { email, name, photoURL } = await request.json();

    let user = await User.findOne({ email });

    if (user) {
      // Update existing user
      user.lastLogin = new Date();
      if (photoURL) user.photoURL = photoURL;
      await user.save();
      console.log('✅ User updated:', user.email);
    } else {
      // Create new user
      user = await User.create({
        email,
        name,
        photoURL,
      });
      console.log('✅ New user created:', user.email);
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error('❌ Error syncing user:', error);
    return NextResponse.json({ error: 'Failed to sync user' }, { status: 500 });
  }
}
