import { connect } from "@/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import User from '@/models/userModel'
import { sendEmail } from "@/helpers/mailer";
import jwt from 'jsonwebtoken';

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email } = reqBody;

        // Validation
        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }

        // Find user by email
        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Generate token data
        const tokenData = {
            _id: user._id,
            username: user.username,
            email: user.email
        };

        // Create token
        const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY!, { expiresIn: "1d" });

        // Send reset email
        const verifyToken = await sendEmail({ email, emailType: "RESET", userId: user._id });

        return NextResponse.json({
            message: "Reset email sent successfully",
            token: token
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
