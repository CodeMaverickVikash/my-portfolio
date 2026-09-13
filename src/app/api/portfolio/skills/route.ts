import { NextResponse } from 'next/server'
import skills from '@/features/portfolio/data/tech-stack.json'

export function GET() {
  return NextResponse.json({ skills })
}
