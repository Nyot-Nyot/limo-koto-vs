import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const waliNagaris = await prisma.waliNagari.findMany({
      orderBy: { order: 'asc' }
    });
    
    return NextResponse.json(waliNagaris);
  } catch (error) {
    console.error('Error fetching wali nagari:', error);
    return NextResponse.json(
      { error: 'Failed to fetch wali nagari' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, startYear, endYear, photo, biography, achievements, order } = body;

    // Validate required fields
    if (!name || !startYear || !order) {
      return NextResponse.json(
        { error: 'Required fields: name, startYear, order' },
        { status: 400 }
      );
    }

    const waliNagari = await prisma.waliNagari.create({
      data: {
        name,
        startYear: parseInt(startYear),
        endYear: endYear ? parseInt(endYear) : null,
        photo: photo || null,
        biography: biography || null,
        achievements: achievements || null,
        order: parseInt(order)
      }
    });

    return NextResponse.json(waliNagari);
  } catch (error) {
    console.error('Error creating wali nagari:', error);
    return NextResponse.json(
      { error: 'Failed to create wali nagari' },
      { status: 500 }
    );
  }
}
