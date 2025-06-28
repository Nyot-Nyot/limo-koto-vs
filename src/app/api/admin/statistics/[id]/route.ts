import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const statistic = await prisma.jorongStatistic.findUnique({
      where: { id: params.id },
      include: {
        jorong: true
      }
    });

    if (!statistic) {
      return NextResponse.json(
        { error: 'Statistic not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(statistic);
  } catch (error) {
    console.error('Error fetching statistic:', error);
    return NextResponse.json(
      { error: 'Failed to fetch statistic' },
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
    const { 
      jorongId, 
      year, 
      population, 
      maleCount, 
      femaleCount, 
      childCount,
      adultCount,
      elderlyCount,
      households
    } = body;

    const statistic = await prisma.jorongStatistic.update({
      where: { id: params.id },
      data: {
        jorongId,
        year,
        population,
        maleCount,
        femaleCount,
        childCount,
        adultCount,
        elderlyCount,
        households
      },
      include: {
        jorong: true
      }
    });

    return NextResponse.json(statistic);
  } catch (error) {
    console.error('Error updating statistic:', error);
    return NextResponse.json(
      { error: 'Failed to update statistic' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.jorongStatistic.delete({
      where: { id: params.id }
    });

    return NextResponse.json({ message: 'Statistic deleted successfully' });
  } catch (error) {
    console.error('Error deleting statistic:', error);
    return NextResponse.json(
      { error: 'Failed to delete statistic' },
      { status: 500 }
    );
  }
}
