import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/utils/config/dbConfig'
import Task from "@/models/TaskModel";

connect()

export async function DELETE(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const taskId = url.searchParams.get('id')

        if (!taskId) {
            return NextResponse.json({ error: "Task ID is required" }, { status: 400 });
        }

        await Task.findByIdAndDelete(taskId);

        return NextResponse.json({ message: "Task deleted successfully" });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}