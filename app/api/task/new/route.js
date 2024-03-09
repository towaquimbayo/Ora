import { connectToDB } from "@/utils/database";
import Task from "@/models/task";

export const POST = async (req) => {
    const { userId, course, name, description, type, status, dueDate, file } = await req.json();

    try {
        await connectToDB();

        const newTask = new Task({
            creator: userId,
            course,
            name,
            description,
            type,
            status,
            dueDate,
            file,
        });

        console.log(newTask);

        await newTask.save();

        return new Response(JSON.stringify(newTask), { status: 201 });
    } catch (error) {
        console.log(error);
        return new Response("Failed to create new task", { status: 500 });
    }
}