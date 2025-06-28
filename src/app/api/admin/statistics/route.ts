import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const statistics = await prisma.jorongStatistic.findMany({
      include: {
        jorong: true
      },
      orderBy: [
        { year: 'desc' },
        { jorong: { name: 'asc' } }
      ]
    });
    
    return NextResponse.json(statistics);
  } catch (error) {
    console.error('Error fetching statistics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch statistics' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
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

    // Validate required fields
    if (!jorongId || !year || !population || !maleCount || !femaleCount) {
      return NextResponse.json(
        { error: 'Required fields: jorongId, year, population, maleCount, femaleCount' },
        { status: 400 }
      );
    }

    const statistic = await prisma.jorongStatistic.create({
      data: {
        jorongId,
        year: parseInt(year),
        population: parseInt(population),
        maleCount: parseInt(maleCount),
        femaleCount: parseInt(femaleCount),
        childCount: parseInt(childCount) || 0,
        adultCount: parseInt(adultCount) || 0,
        elderlyCount: parseInt(elderlyCount) || 0,
        households: parseInt(households) || 0
      },
      include: {
        jorong: true
      }
    });

    return NextResponse.json(statistic);
  } catch (error) {
    console.error('Error creating statistic:', error);
    return NextResponse.json(
      { error: 'Failed to create statistic' },
      { status: 500 }
    );
  }
}
