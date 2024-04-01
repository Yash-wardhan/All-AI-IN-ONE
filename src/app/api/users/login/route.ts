import { connect } from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'


connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { email, password } = reqBody;

        const user = await User.findOne({ email })
        if (!user) {
            return NextResponse.json({ error: "User does not exist" }, { status: 400 })
        }
        //check if password is correct
        const vaildPassword = await bcryptjs.compare(password, user.password)
        if (!vaildPassword) {
            return NextResponse.json({ error: "Invalid Password" }, { status: 401 })
        }

        //create token data
        let tokenData = {
            _id: user._id,
            username: user.username,
            email: user.email
        };

        //create token
        const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY!, { expiresIn: "1d" })

        const response = NextResponse.json({
            message: "Login Successful",
            success: true
        })
        response.cookies.set("token", token, {
            httpOnly: true,
        })

        return response

        
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}