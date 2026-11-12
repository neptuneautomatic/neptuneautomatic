import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.json();
    const payload = rawBody.data || rawBody;
    const formSlug = rawBody.formSlug || rawBody.formCode || payload.formSlug || payload.formCode || 'contact-general';
    const name = payload.name || payload.fullName || 'Anonymous';
    const email = payload.email || payload.workEmail || '';
    const phone = payload.phone || payload.mobile || '';
    const company = payload.company || payload.organization || '';
    const subject = payload.subject || payload.interest || payload.product || 'Website Enquiry';
    const message = payload.message || payload.comments || payload.notes || '';
    const sourcePage = payload.sourcePage || rawBody.sourcePage || '/';
    const extraFields = typeof payload === 'object' ? payload : {};

    if (!email) {
      return NextResponse.json(
        { error: 'Email is a required field.' },
        { status: 400 }
      );
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    // Lookup form definition if exists
    const form = await prisma.form.findUnique({
      where: { slug: formSlug },
    });

    const fullData = {
      name,
      email,
      phone,
      company,
      subject,
      message,
      sourcePage,
      ...extraFields,
    };

    const submission = await prisma.formSubmission.create({
      data: {
        formId: form?.id || null,
        formSlug,
        dataJson: JSON.stringify(fullData),
        name,
        email,
        phone,
        company,
        subject,
        message,
        sourcePage,
        ipAddress: request.headers.get('x-forwarded-for') || '127.0.0.1',
        userAgent: request.headers.get('user-agent') || 'Browser',
        status: 'pending',
      },
    });

    // Create an in-app administrative notification
    await prisma.notification.create({
      data: {
        title: `New Enquiry from ${name}`,
        message: `${subject || 'Enquiry'} received from ${company || email}`,
        type: 'info',
        link: '/admin/submissions',
      },
    });

    const successMessage =
      form?.successMessage ||
      'Thank you for contacting Neptune Automatic. Your enquiry has been received and our engineering sales team will reach out shortly.';

    return NextResponse.json({
      success: true,
      message: successMessage,
      submissionId: submission.id,
    });
  } catch (error: any) {
    console.error('Submission error:', error);
    return NextResponse.json(
      { error: 'Failed to process enquiry. Please try again.' },
      { status: 500 }
    );
  }
}
