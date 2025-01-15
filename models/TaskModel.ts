import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: { type: String, required: true },
    category: { type: String },
    date: { type: Date, required: true },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'low'
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
})

const Task = mongoose.models.tasks || mongoose.model('tasks', taskSchema)
export default Task