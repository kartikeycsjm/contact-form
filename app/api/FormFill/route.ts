import { NextRequest, NextResponse } from "next/server";
import { transporter } from "@/emailConfig"; // Ensure this path is correct
import FormGeneration from "@/app/Database/schema"; // Ensure this path is correct
import { connectDB } from "@/app/Database/connectDB";

export const GET = async (req: NextRequest, res: NextResponse) => {
    try {
        const _id = req.nextUrl.searchParams.get('id');
        console.log(_id);

        await connectDB()

        const data = await FormGeneration.findOne({ _id })
        console.log(data);
        return NextResponse.json({ msg: 'success', data })
    } catch (error) {
        return NextResponse.json({ msg: 'error' })
    }
}


export const POST = async (req: NextRequest) => {
    try {
        await connectDB()
        const { name, phone, email, message, remail } = await req.json();
        await transporter.sendMail({
            from: 'kartikeymishracsjm@gmail.com',
            to: remail,
            subject: 'Contact Form Submission',
            html: `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
            Hello,
            <br /><br />
            Someone has filled contact form.
            <br /><br />
            <p>${message}</p>
            <p>${email}</p>
            <p>${phone}</p>
            <p>${name}</p>
            <br/>
            Best regards,
            <br />
        </div>
      `,
            text: `Hello, this is your contact form.`,
        });
        return NextResponse.json({ message: ['form generated check email'], });
    } catch (error) {
        return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
    }
};
