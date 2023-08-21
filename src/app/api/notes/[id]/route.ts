import { NextResponse } from 'next/server';
import { prisma } from '@/libs/prisma';
import { Prisma } from '@prisma/client';

interface Params {
  params: { id: string }
}

export async function GET(request: Request, { params }: Params) {
  try {
    const note = await prisma.note.findFirst({ where: { id: Number(params.id) } });

    if (!note) return NextResponse.json({ message: 'Note not found.' }, { status: 404 });

    return NextResponse.json(note);
  } catch (error) {
    return error instanceof Error ? NextResponse.json(error.message, { status: 500 }) : 'Something wrong.';
  }
}

export async function DELETE(request: Request, { params }: Params) {
  try {
    const deleteNote = await prisma.note.delete({ where: { id: Number(params.id) } });
    return NextResponse.json(deleteNote);
  } catch (error) {
    return error instanceof Prisma.PrismaClientKnownRequestError ? NextResponse.json(error.message, { status: 404 }) : 'Something wrong.';
  }
}

export async function PUT(request: Request, { params }: Params) {
  try {
    const { title, content } = await request.json();
    const updateNote = await prisma.note.update({ where: { id: Number(params.id) }, data: { title, content } });
    return NextResponse.json(updateNote);
  } catch (error) {
    return error instanceof Prisma.PrismaClientKnownRequestError ? NextResponse.json(error.message, { status: 404 }) : 'Something wrong.';
  }
}