import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET all gallery items
export async function GET() {
  try {
    const gallery = await prisma.gallery.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(gallery)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch gallery' }, { status: 500 })
  }
}

// POST create new gallery item
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, description, imageUrl, category, eventDate, tags } = body

    if (!title || !imageUrl) {
      return NextResponse.json({ error: 'Title and image are required' }, { status: 400 })
    }

    const gallery = await prisma.gallery.create({
      data: {
        title,
        description,
        imageUrl,
        category: category || 'kegiatan',
        eventDate: eventDate ? new Date(eventDate) : null,
        tags
      }
    })

    return NextResponse.json(gallery, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create gallery item' }, { status: 500 })
  }
}
