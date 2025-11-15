import { NextResponse } from 'next/server';
import { getFeaturedProjects } from '@/lib/mongodb';

export async function GET() {
  try {
    const projects = await getFeaturedProjects();
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}