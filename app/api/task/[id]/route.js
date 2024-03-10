import { connectToDB } from "@/utils/database";
import Task from "@/models/task";

// GET (read)
export const GET = async (req, { params }) => {
    try {
        await connectToDB();
        const task = await Task.findById(params.id);

        if (!task) return new Response("Task not found", { status: 404 });

        return new Response(JSON.stringify(task), { status: 200 });
    } catch (error) {
        return new Response("Failed to fetch the task", { status: 500 });
    }
}

// PATCH (update)
export const PATCH = async (req, { params }) => {
    const { course, name, description, type, status, dueDate, file } = await req.json();

    try {
        await connectToDB();
        const existingTask = await Task.findById(params.id);

        if (!existingTask) return new Response("Task not found", { status: 404 });

        existingTask.course = course;
        existingTask.name = name;
        existingTask.description = description;
        existingTask.type = type;
        existingTask.status = status;
        existingTask.dueDate = dueDate;
        existingTask.file = file;

        await existingTask.save();

        return new Response("Successfully updated the task", { status: 200 });
        } catch (error) {
            return new Response("Failed to update the task", { status: 500 });
        }
}