import { NextRequest, NextResponse } from 'next/server';
import { isAuthed } from '@/lib/auth';
import { getFAQs, saveFAQs } from '@/lib/content';
import type { FAQItem } from '@/lib/types';

const unauthorized = () => NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

export async function POST(req: NextRequest) {
  if (!(await isAuthed())) return unauthorized();
  try {
    const body = (await req.json().catch(() => ({}))) as {
      question?: string;
      answer?: string;
    };

    if (!body.question || !body.answer) {
      return NextResponse.json({ error: 'Question and answer are required' }, { status: 400 });
    }

    const list = await getFAQs();
    const newFaq: FAQItem = {
      id: crypto.randomUUID(),
      question: body.question.trim(),
      answer: body.answer.trim(),
      hidden: false,
    };

    const updatedList = [newFaq, ...list];
    await saveFAQs(updatedList);
    return NextResponse.json({ ok: true, faq: newFaq });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to create FAQ';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  if (!(await isAuthed())) return unauthorized();
  try {
    const body = (await req.json().catch(() => ({}))) as {
      id?: string;
      question?: string;
      answer?: string;
      hidden?: boolean;
    };

    if (!body.id) {
      return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    }

    const list = await getFAQs();
    const index = list.findIndex((f) => f.id === body.id);
    if (index === -1) {
      return NextResponse.json({ error: 'FAQ not found' }, { status: 404 });
    }

    const current = list[index];
    const updated: FAQItem = {
      ...current,
      question: body.question !== undefined ? body.question.trim() : current.question,
      answer: body.answer !== undefined ? body.answer.trim() : current.answer,
      hidden: body.hidden !== undefined ? body.hidden : current.hidden,
    };

    list[index] = updated;
    await saveFAQs(list);
    return NextResponse.json({ ok: true, faq: updated });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to update FAQ';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!(await isAuthed())) return unauthorized();
  try {
    const { id } = (await req.json().catch(() => ({ id: '' }))) as { id?: string };
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

    const list = await getFAQs();
    const updatedList = list.filter((f) => f.id !== id);
    await saveFAQs(updatedList);
    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to delete FAQ';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
