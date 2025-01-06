import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const jobs = await prisma.job.findMany(); // no idea why Job doesnt work
  return NextResponse.json(jobs);
}

export async function POST(req: Request) {
  const data = await req.json();

  try {
    const newJob = await prisma.job.create({
      data,
    });
    return NextResponse.json(newJob, { status: 201 }); //Good
  } catch (error) {
    console.error('Error creating job:', error);
    return NextResponse.json({ error: 'Failed to create job' }, { status: 500 }); // Server
  }
}

export async function PUT(req: Request) {
  const data = await req.json();

  if (!data.id) {
    return NextResponse.json({ error: 'ID is required for update' }, { status: 400 }); // Client
  }

  try {
    const updatedJob = await prisma.job.update({
      where: { id: data.id },
      data,
    });
    return NextResponse.json(updatedJob);
  } catch (error) {
    console.error('Error updating job:', error);
    return NextResponse.json({ error: 'Failed to update job' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const { id } = await req.json();

  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }

  try {
    await prisma.job.delete({
      where: { id },
    });
    return NextResponse.json({ message: 'Job deleted' });
  } catch (error) {
    console.error('Error deleting job:', error);
    return NextResponse.json({ error: 'Failed to delete job' }, { status: 500 });
  }
}
