import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const adatIstiadat = await prisma.adatIstiadat.findMany({
      include: {
        jorong: true
      },
      orderBy: { createdAt: 'desc' }
    });
    
    return NextResponse.json(adatIstiadat);
  } catch (error) {
    console.error('Error fetching adat istiadat:', error);
    return NextResponse.json(
      { error: 'Failed to fetch adat istiadat' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { jorongId, title, description, content, category, images } = body;

    // Validate required fields
    if (!jorongId || !title || !description || !content || !category) {
      return NextResponse.json(
        { error: 'All required fields must be filled' },
        { status: 400 }
      );
    }

    const adatIstiadat = await prisma.adatIstiadat.create({
      data: {
        jorongId,
        title,
        description,
        content,
        category,
        images: images || null
      },
      include: {
        jorong: true
      }
    });

    return NextResponse.json(adatIstiadat);
  } catch (error) {
    console.error('Error creating adat istiadat:', error);
    return NextResponse.json(
      { error: 'Failed to create adat istiadat' },
      { status: 500 }
    );
  }
}
