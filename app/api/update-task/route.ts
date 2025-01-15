import { connect } from '@/utils/config/dbConfig'
import Task from '@/models/TaskModel'
import { NextRequest, NextResponse } from 'next/server'

connect()

export async function PUT(req: NextRequest) {
    try {
        const data = await req.json()
        const { _id, name, category, priority, date } = data;

        const updatedTask = await Task.findByIdAndUpdate(
            _id,
            { name, category, priority, date },
            { new: true }
        )

        if (!updatedTask) {
            return NextResponse.json({ message: 'Task not found' }, { status: 404 });
        }
        return NextResponse.json(updatedTask, { status: 200 });
    } catch (error) {
        console.error('Failed to update task', error);
        return NextResponse.json({ message: 'Failed to update task' }, { status: 500 });
    }
}