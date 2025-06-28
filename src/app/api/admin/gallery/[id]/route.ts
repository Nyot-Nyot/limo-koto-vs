import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// DELETE gallery item
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.gallery.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'Gallery item deleted successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete gallery item' }, { status: 500 })
  }
}

// PUT update gallery item
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { title, description, imageUrl, category, eventDate, tags } = body

    const gallery = await prisma.gallery.update({
      where: { id: params.id },
      data: {
        title,
        description,
        imageUrl,
        category,
        eventDate: eventDate ? new Date(eventDate) : null,
        tags
      }
    })

    return NextResponse.json(gallery)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update gallery item' }, { status: 500 })
  }
}
