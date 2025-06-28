import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET all news
export async function GET() {
  try {
    const news = await prisma.news.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(news)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 })
  }
}

// POST create new news
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, content, excerpt, coverImage, tags, author } = body

    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 })
    }

    const news = await prisma.news.create({
      data: {
        title,
        content,
        excerpt: excerpt || content.substring(0, 200) + '...',
        coverImage,
        tags,
        author: author || 'Admin Nagari',
        published: true,
        publishedAt: new Date()
      }
    })

    return NextResponse.json(news, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create news' }, { status: 500 })
  }
}
