import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const adatIstiadat = await prisma.adatIstiadat.findUnique({
      where: { id: params.id },
      include: {
        jorong: true
      }
    });

    if (!adatIstiadat) {
      return NextResponse.json(
        { error: 'Adat istiadat not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(adatIstiadat);
  } catch (error) {
    console.error('Error fetching adat istiadat:', error);
    return NextResponse.json(
      { error: 'Failed to fetch adat istiadat' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { jorongId, title, description, content, category, images } = body;

    const adatIstiadat = await prisma.adatIstiadat.update({
      where: { id: params.id },
      data: {
        jorongId,
        title,
        description,
        content,
        category,
        images
      },
      include: {
        jorong: true
      }
    });

    return NextResponse.json(adatIstiadat);
  } catch (error) {
    console.error('Error updating adat istiadat:', error);
    return NextResponse.json(
      { error: 'Failed to update adat istiadat' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.adatIstiadat.delete({
      where: { id: params.id }
    });

    return NextResponse.json({ message: 'Adat istiadat deleted successfully' });
  } catch (error) {
    console.error('Error deleting adat istiadat:', error);
    return NextResponse.json(
      { error: 'Failed to delete adat istiadat' },
      { status: 500 }
    );
  }
}
