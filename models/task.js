import { Schema, model, models } from 'mongoose';

const TaskSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    course: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
    },
    name: {
        type: String,
        required: [true, 'Name is required!'],
    },
    type: {
        type: Schema.Types.ObjectId,
        ref: 'Course.breakdown',
        required: [true, 'Type is required!'],
    },
    status: {
        type: String,
        enum: ['not_started', 'in_progress', 'completed'],
        default: 'not_started',
    },
    dueDate: {
        type: Date,
        required: [true, 'Due date is required!'],
    },
    file: String,
    description: String,
});

const Task = models.Task || model('Task', TaskSchema);

export default Task;