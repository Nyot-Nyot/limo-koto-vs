import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET single news
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const news = await prisma.news.findUnique({
      where: { id: params.id }
    })

    if (!news) {
      return NextResponse.json({ error: 'News not found' }, { status: 404 })
    }

    return NextResponse.json(news)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 })
  }
}

// PUT update news
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { title, content, excerpt, coverImage, tags, author, published } = body

    const news = await prisma.news.update({
      where: { id: params.id },
      data: {
        title,
        content,
        excerpt,
        coverImage,
        tags,
        author,
        published,
        publishedAt: published ? new Date() : null
      }
    })

    return NextResponse.json(news)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update news' }, { status: 500 })
  }
}

// DELETE news
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.news.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'News deleted successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete news' }, { status: 500 })
  }
}
