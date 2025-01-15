import { NextResponse } from "next/server";
import {connect} from '@/utils/config/dbConfig'
import Task from '@/models/TaskModel'

connect()

export async function GET(){
    try {
        const taskData = await Task.find({})
        return NextResponse.json({
            message: 'Task data found',
            data: taskData
        })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return NextResponse.json({error: error.message},{status: 400})
    }
}