import { NextRequest, NextResponse } from 'next/server';

interface ContactFormData {
  name: string;
  phone: string;
  email?: string;
  message: string;
  date?: string;
  time?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();

    // Validate required fields
    if (!body.name || !body.phone || !body.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Basic validation
    if (body.name.trim().length < 2) {
      return NextResponse.json(
        { error: 'Name must be at least 2 characters' },
        { status: 400 }
      );
    }

    if (!/^(\+30|0030|30)?[0-9]{10}$/.test(body.phone.replace(/\s/g, ''))) {
      return NextResponse.json(
        { error: 'Invalid phone number format' },
        { status: 400 }
      );
    }

    if (body.message.trim().length < 10) {
      return NextResponse.json(
        { error: 'Message must be at least 10 characters' },
        { status: 400 }
      );
    }

    if (body.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // In a real application, you would:
    // 1. Save to database
    // 2. Send email notification
    // 3. Send SMS to customer
    // 4. Log the submission

    // For now, we'll just log the submission
    console.log('New contact form submission:', {
      name: body.name,
      phone: body.phone,
      email: body.email || 'Not provided',
      message: body.message,
      date: body.date || 'Not specified',
      time: body.time || 'Not specified',
      timestamp: new Date().toISOString(),
    });

    // TODO: Implement actual email sending
    // Example with Nodemailer or SendGrid:
    /*
    await sendEmail({
      to: process.env.CONTACT_EMAIL || 'info@rentribathens.gr',
      subject: `Νέο μήνυμα από ${body.name}`,
      html: `
        <h2>Νέο μήνυμα από την ιστοσελίδα</h2>
        <p><strong>Όνομα:</strong> ${body.name}</p>
        <p><strong>Τηλέφωνο:</strong> ${body.phone}</p>
        <p><strong>Email:</strong> ${body.email || 'Δεν δόθηκε'}</p>
        <p><strong>Ημερομηνία:</strong> ${body.date || 'Δεν δόθηκε'}</p>
        <p><strong>Ώρα:</strong> ${body.time || 'Δεν δόθηκε'}</p>
        <p><strong>Μήνυμα:</strong></p>
        <p>${body.message}</p>
      `,
    });
    */

    // TODO: Send SMS notification to business owner
    /*
    await sendSMS({
      to: process.env.BUSINESS_PHONE || '+306978277120',
      message: `Νέο μήνυμα από ${body.name} (${body.phone}). Έλεγχος email για λεπτομέρειες.`,
    });
    */

    // TODO: Save to database
    /*
    await prisma.contactSubmission.create({
      data: {
        name: body.name,
        phone: body.phone,
        email: body.email,
        message: body.message,
        preferredDate: body.date,
        preferredTime: body.time,
        status: 'new',
      },
    });
    */

    return NextResponse.json(
      { 
        message: 'Contact form submitted successfully',
        success: true 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form submission error:', error);
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        success: false 
      },
      { status: 500 }
    );
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}
