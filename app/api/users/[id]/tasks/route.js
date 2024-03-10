import { connectToDB } from "@/utils/database";
import Task from "@/models/task";

export const GET = async (req, { params }) => {
    try {
        await connectToDB();

        const courses = await Task.find({
            creator: params.id
        }).populate("creator");

        return new Response(JSON.stringify(courses), { status: 200 });
    } catch (error) {
        return new Response("Failed to fetch user tasks", { status: 500 });
    }
}