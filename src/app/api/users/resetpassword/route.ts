import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const {password,token} = reqBody
        // const user = await User.findOne({
        //     forgotPasswordToken: String(token), // Ensure token is converted to string for comparison
        //     forgotPasswordTokenExpiry: { $gt: new Date() }
        // });
        const user = await User.findOne({forgotPasswordToken: token , forgetPasswordTokenExpiry:{$gt : new Date()}})

        
        if (!user) {
            return NextResponse.json({ error: "Invalid token" }, { status: 400 });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        // Update user's password
        user.password = hashedPassword;
        user.forgotPasswordToken=null;
        user.forgetPasswordTokenExpiry=null;
        await user.save();

        return NextResponse.json({ success: "Password updated successfully" });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
