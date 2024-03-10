import { connectToDB } from "@/utils/database";
import Task from "@/models/task";

// PATCH (update)
export const PATCH = async (req, { params }) => {
    const { status } = await req.json();

    try {
        await connectToDB();
        const existingTask = await Task.findById(params.id);

        if (!existingTask) return new Response("Task not found", { status: 404 });

        existingTask.status = status;

        await existingTask.save();

        return new Response("Successfully updated the task", { status: 200 });
    } catch (error) {
        return new Response("Failed to update the task", { status: 500 });
    }
}