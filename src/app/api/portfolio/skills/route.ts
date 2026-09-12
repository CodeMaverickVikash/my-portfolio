import { NextResponse } from 'next/server'
import skills from '../../../../../../../packages/my-portfolio/src/data/tech-stack.json'

export function GET() {
  return NextResponse.json({ skills })
}
