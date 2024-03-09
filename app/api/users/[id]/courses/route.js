import { connectToDB } from "@/utils/database";
import Course from "@/models/course";

export const GET = async (req, { params }) => {
    try {
        await connectToDB();

        const courses = await Course.find({
            creator: params.id
        }).populate("creator");

        return new Response(JSON.stringify(courses), { status: 200 });
    } catch (error) {
        return new Response("Failed to fetch user courses", { status: 500 });
    }
}