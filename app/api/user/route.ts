import { connect } from '../../../utils/config/dbConfig'
import { NextRequest, NextResponse } from 'next/server'
import getDataFromToken from "../../../helpers/getDataFromToken"
import User from '../../../models/UserModel'

connect();

export async function GET(req: NextRequest) {
    try {
        const { userId } = getDataFromToken(req)
        const user = await User.findOne({ _id: userId }).select("-password")
        return NextResponse.json({
            message: "User Found",
            data: user
        })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 })
    }
}