import { NextRequest, NextResponse } from "next/server";
import { transporter } from "@/emailConfig"; // Ensure this path is correct
import FormGeneration from "@/app/Database/schema"; // Ensure this path is correct
import { connectDB } from "@/app/Database/connectDB";

const GET=async(req:NextRequest,res:NextResponse)=>{
    try {
        const id=req.nextUrl.searchParams.get('id');
        await connectDB()
        const data=await FormGeneration.find({id})
        console.log(data);
        return NextResponse.json({msg:'success',data})
    } catch (error) {
        return NextResponse.json({msg:'error'})
    }
}
export const POST = async (req: NextRequest) => {
    try {
        await connectDB()
        const { email } = await req.json();
        if (!/.+@.+\..+/.test(email)) {
            return NextResponse.json({ message: 'Invalid email address' }, { status: 400 });
        }
        const data = await FormGeneration.create({ email });
        console.log(data._id);
        const link = process.env.WEB_LINK + '/' + data._id;
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
            <br/>
            Best regards,
            <br />
            Your Company
        </div>
      `,
            text: `Hello, this is your contact form link.`,
        });
        return NextResponse.json({ message: ['form generated check email'], });
    } catch (error) {
        return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
    }
};
