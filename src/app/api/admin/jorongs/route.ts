import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const jorongs = await prisma.jorong.findMany({
      orderBy: { name: 'asc' }
    });
    
    return NextResponse.json(jorongs);
  } catch (error) {
    console.error('Error fetching jorongs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch jorongs' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, area, population, kepalaJorong } = body;

    // Validate required fields
    if (!name || !description) {
      return NextResponse.json(
        { error: 'Name and description are required' },
        { status: 400 }
      );
    }

    const jorong = await prisma.jorong.create({
      data: {
        name,
        description,
        area: area ? parseFloat(area) : null,
        population: population ? parseInt(population) : 0,
        kepalaJorong: kepalaJorong || null
      }
    });

    return NextResponse.json(jorong);
  } catch (error) {
    console.error('Error creating jorong:', error);
    return NextResponse.json(
      { error: 'Failed to create jorong' },
      { status: 500 }
    );
  }
}
