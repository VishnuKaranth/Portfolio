import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    const data = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: "vishnukaranth2004@gmail.com",
      subject: `New message from ${name}: ${subject}`,
      html: `
        <h2>New Message From Portfolio</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Subject:</b> ${subject}</p>
        <p><b>Message:</b><br>${message}</p>
      `,
    });

    console.log("Resend response:", data);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Resend error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
