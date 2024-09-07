import { NextRequest, NextResponse } from "next/server";
import { transporter } from "@/emailConfig"; // Ensure this path is correct
import FormGeneration from "@/app/Database/schema"; // Ensure this path is correct
import { connectDB } from "@/app/Database/connectDB";
export const POST = async (req: NextRequest) => {
  try {
    // Parse the request body
    await connectDB()
    const { email } = await req.json();

    // Validate email format (basic validation)
    if (!/.+@.+\..+/.test(email)) {
      return NextResponse.json({ message: 'Invalid email address' }, { status: 400 });
    }

    // Save email to database
    const data=await FormGeneration.create({ email });
    console.log(data._id);
    const link=`https://localhost:3000/${data._id}`
    await transporter.sendMail({
      from: 'kartikeymishracsjm@gmail.com',
      to: email,
      subject: 'Contact Form Link',
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
            Hello,
            <br /><br />
            This is your contact form link.
            <br /><br />
            <a href=${link}>${link}</a>
            Best regards,
            <br />
            Your Company
        </div>
      `,
      text: `Hello, this is your contact form link.`,
    });

    // Respond with success message
    return NextResponse.json({ message: 'Submitted successfully' });
  } catch (error) {
    return NextResponse.json({ message: 'An error occurred'}, { status: 500 });
  }
};
