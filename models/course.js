import { Schema, model, models } from 'mongoose';

const CourseSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    name: {
        type: String,
        required: [true, 'Name is required!'],
    },
    description: String,
    credits: {
        type: Number,
        required: [true, 'Credits are required!'],
    },
    professor: String,
    state: {
        type: String,
        enum: ['not_started', 'in_progress', 'completed'],
        default: 'in_progress',
    },
    breakdown: [
        {
            type: {
                type: String,
                required: [true, 'Type is required!'],
            },
            percentage: {
                type: Number,
                required: [true, 'Percentage is required!'],
            },
        },
    ],
});

const Course = models.Course || model('Course', CourseSchema);

export default Course;