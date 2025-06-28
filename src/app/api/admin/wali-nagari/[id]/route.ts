import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const waliNagari = await prisma.waliNagari.findUnique({
      where: { id: params.id }
    });

    if (!waliNagari) {
      return NextResponse.json(
        { error: 'Wali Nagari not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(waliNagari);
  } catch (error) {
    console.error('Error fetching wali nagari:', error);
    return NextResponse.json(
      { error: 'Failed to fetch wali nagari' },
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
    const { name, startYear, endYear, photo, biography, achievements, order } = body;

    const waliNagari = await prisma.waliNagari.update({
      where: { id: params.id },
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
    console.error('Error updating wali nagari:', error);
    return NextResponse.json(
      { error: 'Failed to update wali nagari' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.waliNagari.delete({
      where: { id: params.id }
    });

    return NextResponse.json({ message: 'Wali Nagari deleted successfully' });
  } catch (error) {
    console.error('Error deleting wali nagari:', error);
    return NextResponse.json(
      { error: 'Failed to delete wali nagari' },
      { status: 500 }
    );
  }
}
