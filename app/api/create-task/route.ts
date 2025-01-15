import { connect } from '@/utils/config/dbConfig'
import Task from '@/models/TaskModel'
import getDataFromToken from '@/helpers/getDataFromToken'
import { NextRequest, NextResponse } from 'next/server'

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        console.log("Received request body:", reqBody);

        //! Extract user ID from the token
        const { userId } = getDataFromToken(request);

        if (!userId) {
            throw new Error('User ID not found in token');
        }

        const { name, date, priority, category } = reqBody
        console.log(reqBody)

        const newTask = new Task({
            userId: userId, // Assign the extracted teacher ID
            name,
            category,
            date,
            priority,
        })

        const savedTask = await newTask.save()
        console.log(savedTask)

        return NextResponse.json({
            message: "Task created successfully",
            success: true,
            savedTask
        })
    } catch (error: any) {
        console.error("Error creating task:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

