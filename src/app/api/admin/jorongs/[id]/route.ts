import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const jorong = await prisma.jorong.findUnique({
      where: { id: params.id }
    });

    if (!jorong) {
      return NextResponse.json(
        { error: 'Jorong not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(jorong);
  } catch (error) {
    console.error('Error fetching jorong:', error);
    return NextResponse.json(
      { error: 'Failed to fetch jorong' },
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
    const { name, description, kepalaJorong, population, area } = body;

    const jorong = await prisma.jorong.update({
      where: { id: params.id },
      data: {
        name,
        description,
        kepalaJorong,
        population,
        area
      }
    });

    return NextResponse.json(jorong);
  } catch (error) {
    console.error('Error updating jorong:', error);
    return NextResponse.json(
      { error: 'Failed to update jorong' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.jorong.delete({
      where: { id: params.id }
    });

    return NextResponse.json({ message: 'Jorong deleted successfully' });
  } catch (error) {
    console.error('Error deleting jorong:', error);
    return NextResponse.json(
      { error: 'Failed to delete jorong' },
      { status: 500 }
    );
  }
}
