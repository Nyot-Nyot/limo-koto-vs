import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET profile
export async function GET() {
  try {
    const profile = await prisma.nagariProfile.findFirst()
    return NextResponse.json(profile)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 })
  }
}

// PUT update profile
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      name,
      description,
      history,
      vision,
      mission,
      logo,
      coverImage,
      address,
      phone,
      email,
      website,
      latitude,
      longitude
    } = body

    // Check if profile exists
    const existingProfile = await prisma.nagariProfile.findFirst()

    let profile
    if (existingProfile) {
      profile = await prisma.nagariProfile.update({
        where: { id: existingProfile.id },
        data: {
          name,
          description,
          history,
          vision,
          mission,
          logo,
          coverImage,
          address,
          phone,
          email,
          website,
          latitude: latitude ? parseFloat(latitude) : null,
          longitude: longitude ? parseFloat(longitude) : null
        }
      })
    } else {
      profile = await prisma.nagariProfile.create({
        data: {
          name: name || 'Nagari',
          description: description || '',
          history: history || '',
          vision: vision || '',
          mission: mission || '',
          logo,
          coverImage,
          address: address || '',
          phone,
          email,
          website,
          latitude: latitude ? parseFloat(latitude) : null,
          longitude: longitude ? parseFloat(longitude) : null
        }
      })
    }

    return NextResponse.json(profile)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 })
  }
}
